import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {IParadigm} from "./i-paradigm";
import {shareReplay} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ParadigmsService {

  readonly paradigms$ = this.http.get<IParadigm[]>('paradigms').pipe(
    shareReplay(),
  );

  constructor(private http: HttpClient) { }
}
