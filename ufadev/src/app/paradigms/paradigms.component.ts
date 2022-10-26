import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {ParadigmsService} from './paradigms.service';

@Component({
  selector: 'app-paradigms',
  templateUrl: './paradigms.component.html',
  styleUrls: ['./paradigms.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ParadigmsComponent {

  readonly paradigms$ = this.paradigmsService.paradigms$;

  constructor(private paradigmsService: ParadigmsService) { }

}
