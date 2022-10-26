import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {IParadigm} from "./i-paradigm";

@Injectable({
  providedIn: 'root'
})
export class ParadigmsService {

  readonly paradigms$ = this.http.get<IParadigm[]>('paradigms');

  constructor(private http: HttpClient) { }
}
