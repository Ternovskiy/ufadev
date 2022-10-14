import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {CartService} from "../cart.service";
import {map, Observable} from "rxjs";

@Component({
  selector: 'app-cart-actions',
  templateUrl: './cart-actions.component.html',
  styleUrls: ['./cart-actions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartActionsComponent {

  cartItem$?: Observable<{ id: number, count: number }>;
  disabled = false;

  @Input()
  set paradigmId(id: number) {
    this.cartItem$ = this.cartService.getCountInCart(id).pipe(
      map((count) => ({id, count}))
    )
  }

  constructor(private cartService: CartService) {
  }

  addToCart(id: number) {
    this.disabled = true;
    this.cartService.add(id)
      .subscribe()
      .add(() => this.disabled = false);
  }

  deleteFromCart(id: number) {
    this.disabled = true;
    this.cartService.delete(id)
      .subscribe()
      .add(() => this.disabled = false);
  }
}
