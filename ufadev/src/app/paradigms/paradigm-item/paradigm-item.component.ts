import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {IParadigm} from '../i-paradigm';
import {CartService} from '../../cart/cart.service';

@Component({
  selector: 'app-paradigm-item',
  templateUrl: './paradigm-item.component.html',
  styleUrls: ['./paradigm-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ParadigmItemComponent {

  @Input()
  paradigm?: IParadigm;

  constructor(private cartService: CartService) {
  }

  addToCart(event: MouseEvent) {
    const btn = event.target as HTMLButtonElement;
    btn.disabled = true;
    if (this.paradigm) {
      this.cartService.add(this.paradigm.id)
        .subscribe()
        .add(() => btn.disabled = false);
    }
  }
}
