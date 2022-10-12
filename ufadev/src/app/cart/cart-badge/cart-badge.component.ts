import {ChangeDetectionStrategy, Component} from '@angular/core';
import {CartService} from '../cart.service';

@Component({
  selector: 'app-cart-badge',
  templateUrl: './cart-badge.component.html',
  styleUrls: ['./cart-badge.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartBadgeComponent {

  readonly count$ = this.cartService.cartItemsCount$;

  constructor(private cartService: CartService) { }

}
