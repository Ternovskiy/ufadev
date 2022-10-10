import {ChangeDetectionStrategy, Component} from '@angular/core';
import {ParadigmsService} from './paradigms.service';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-paradigms',
  templateUrl: './paradigms.component.html',
  styleUrls: ['./paradigms.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ParadigmsComponent {

  readonly searchControl = new FormControl('', {nonNullable: true});

  readonly paradigms$ = this.paradigmsService.paradigms$;

  constructor(private paradigmsService: ParadigmsService) { }
}
