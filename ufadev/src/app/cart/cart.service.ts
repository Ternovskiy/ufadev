import { Injectable } from '@angular/core';
import {combineLatest, map, Observable, shareReplay} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {ParadigmsService} from '../paradigms/paradigms.service';
import {IParadigm} from '../paradigms/i-paradigm';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private readonly cartApiItems$ = this.http.get<CartApiItem[]>('cart');

  readonly cartItems$: Observable<CartItem[]> = combineLatest([
    this.cartApiItems$,
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
    return this.http.put('cart', id);
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
