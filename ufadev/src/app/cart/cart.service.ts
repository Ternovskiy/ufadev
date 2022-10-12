import { Injectable } from '@angular/core';
import {catchError, combineLatest, map, mergeWith, Observable, shareReplay, Subject, tap} from 'rxjs';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {ParadigmsService} from '../paradigms/paradigms.service';
import {IParadigm} from '../paradigms/i-paradigm';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private readonly cartApiItemsChangedSubject = new Subject<CartApiItem[]>();
  private readonly cartApiItems$ = this.http.get<CartApiItem[]>('cart');

  readonly cartItems$: Observable<CartItem[]> = combineLatest([
    this.cartApiItems$.pipe(
      mergeWith(this.cartApiItemsChangedSubject)
    ),
    this.paradigmsService.paradigms$,
  ]).pipe(
    map(([cartItems, paradigms]) => this.extendCartApiItem(cartItems, paradigms)),
    shareReplay(1),
  );

  readonly cartItemsCount$: Observable<number> = this.cartItems$.pipe(
    map((cartItems) => this.getCount(cartItems)),
  );

  constructor(
    private paradigmsService: ParadigmsService,
    private http: HttpClient) {
  }

  add(id: number) {
    return this.http.put<CartApiItem[]>('cart', id).pipe(
      catchError((response: HttpErrorResponse) => this.handleError(response)),
      tap((cartItems) => this.cartApiItemsChangedSubject.next(cartItems)),
    );
  }

  delete(id: number) {
    return this.http.delete<CartApiItem[]>('cart', {params: {id}}).pipe(
      catchError((response: HttpErrorResponse) => this.handleError(response)),
      tap((cartItems) => this.cartApiItemsChangedSubject.next(cartItems)),
    );
  }

  getCountInCart(id: number) {
    return this.cartItems$.pipe(
      map((cartItems) => cartItems.find(c => c.id === id)?.count ?? 0),
    )
  }

  private handleError(response: HttpErrorResponse) {
    alert(response.error);
    return this.cartApiItems$;
  }

  private extendCartApiItem(cartItems: CartApiItem[], paradigms: IParadigm[]): CartItem[] {
    return cartItems.map<CartItem>(cartItem => ({
      ...cartItem,
      name: paradigms.find(paradigm => paradigm.id === cartItem.id)?.name ?? '',
    }))
  }

  private getCount(cartItems: CartItem[]) {
    return cartItems.reduce((sum, cartItem) => sum + cartItem.count, 0);
  }
}

export interface CartApiItem {
  id: number;
  count: number;
}

export interface CartItem extends CartApiItem {
  name: string;
}
