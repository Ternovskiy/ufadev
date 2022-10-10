import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {ParadigmsService} from './paradigms.service';
import {FormControl} from '@angular/forms';
import {IParadigm} from './i-paradigm';
import {debounceTime, map, startWith, switchMap} from 'rxjs';

@Component({
  selector: 'app-paradigms',
  templateUrl: './paradigms.component.html',
  styleUrls: ['./paradigms.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ParadigmsComponent {

  readonly searchControl = new FormControl('', {nonNullable: true});

  readonly paradigms$ = this.paradigmsService.paradigms$.pipe(
    switchMap((paradigms: IParadigm[]) => this.getFilteredParadigms(paradigms)),
  );

  constructor(private paradigmsService: ParadigmsService) { }

  private getFilteredParadigms(paradigms: IParadigm[]) {
    return this.searchControl.valueChanges.pipe(
      startWith(this.searchControl.value),
      debounceTime(150),
      map((searchText: string) => this.filterParadigms(paradigms, searchText)),
    );
  }

  private filterParadigms(paradigms: IParadigm[], searchText: string) {
    if(searchText === '') {
      return paradigms;
    }

    const pattern = /[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g;
    const searchWithOutRegExp = searchText
      .toLowerCase()
      .replace(pattern, '\\$&')
      .split(' ')
      .filter(t => t.length > 0)
      .map(t => `(?=.*${t})`)
      .join('');
    const regExp = new RegExp(searchWithOutRegExp, 'i');

    return paradigms.filter(paradigm => paradigm.name.search(regExp) >= 0 || paradigm.description.search(regExp) >= 0);
  }
}
