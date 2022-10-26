import {FormControl} from "@angular/forms";
import {debounceTime, map, MonoTypeOperatorFunction, Observable, startWith, switchMap} from "rxjs";

/**
 * Для фильтрации массивов
 * @param formControl Контрол ввода текста фильтрации
 * @param predicate Метод получения значения по которому делается фильтрация
 */
export function filterByControl<T>(formControl: FormControl, predicate: (value: T) => string)
  : MonoTypeOperatorFunction<Array<T>> {

  return (source: Observable<Array<T>>) => source.pipe(
    switchMap((items: Array<T>) => formControl.valueChanges.pipe(

      startWith(formControl.value),

      debounceTime(150),

      map((searchText: string) => {
        const pattern = /[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g;
        const searchWithOutRegExp = searchText
          .toLowerCase()
          .replace(pattern, '\\$&')
          .split(' ')
          .filter(t => t.length > 0)
          .map(t => `(?=.*${t})`)
          .join('');
        const regExp = new RegExp(searchWithOutRegExp, 'i');

        return items.filter(item => predicate(item).search(regExp) >= 0)
      }),

    )),
  )
}
