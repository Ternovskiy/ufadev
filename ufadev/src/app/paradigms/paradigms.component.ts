import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ParadigmsService} from './paradigms.service';
import {IParadigm} from './i-paradigm';

@Component({
  selector: 'app-paradigms',
  templateUrl: './paradigms.component.html',
  styleUrls: ['./paradigms.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ParadigmsComponent implements OnInit {

  private timer?: NodeJS.Timer = undefined;
  private paradigmsAll: IParadigm[] = [];
  paradigms?: IParadigm[];
  searchText = '';

  constructor(
    private cdr: ChangeDetectorRef,
    private paradigmsService: ParadigmsService) { }

  ngOnInit() {
    this.paradigmsService.paradigms$.subscribe((paradigms) => {
      this.paradigms = this.paradigmsAll = paradigms;
      this.cdr.markForCheck();
    });
  }

  runSearch() {
    clearTimeout(this.timer);

    this.timer = setTimeout(() => {
      this.paradigms = this.filterParadigms(this.paradigmsAll, this.searchText);
      this.cdr.markForCheck();
    }, 150);
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
