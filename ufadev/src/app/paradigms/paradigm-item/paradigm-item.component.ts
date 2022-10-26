import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {IParadigm} from '../i-paradigm';

@Component({
  selector: 'app-paradigm-item',
  templateUrl: './paradigm-item.component.html',
  styleUrls: ['./paradigm-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ParadigmItemComponent {

  @Input()
  paradigm?: IParadigm;

  constructor() { }

}
