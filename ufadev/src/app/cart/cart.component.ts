import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {CartService} from './cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartComponent {

  readonly cartItems$ = this.cartService.cartItems$;

  constructor(private cartService: CartService) { }

}
