import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  selector: 'app-cart-badge',
  templateUrl: './cart-badge.component.html',
  styleUrls: ['./cart-badge.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartBadgeComponent {

  constructor() { }

}
