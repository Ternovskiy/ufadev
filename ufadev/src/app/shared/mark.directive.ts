import {Directive, ElementRef, Input} from '@angular/core';

@Directive({
  selector: '[appMark]'
})
export class MarkDirective {

  private temp$ = null;

  @Input() hideWithoutMark = false;

  @Input() set appMark(text: string) {
    setTimeout(() => {
      if (this.temp$) { // что бы не искать в уже измененном доме надо вернуть как было
        this.elementRef.nativeElement.innerHTML = this.temp$;
      }

      if (!text) {
        return;
      }

      const pattern = /[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g;
      const searchWithOutRegExp = text
        .toLowerCase()
        .replace(pattern, '\\$&')
        .split(' ')
        .filter(t => t.length > 0)
        .join('|');
      this.temp$ = this.elementRef.nativeElement.innerHTML;
      const hasMark = this._recursiveReplaceNode(this.elementRef.nativeElement.childNodes, searchWithOutRegExp);
      if (this.hideWithoutMark && !hasMark) {
        this.elementRef.nativeElement.innerHTML = '';
      }
    }, 10);
  }

  constructor(private elementRef: ElementRef) {
  }

  /** Проходим по дереву, меняем при совпадении `searchWithOutRegExp`, вернем `true` если изменили */
  private _recursiveReplaceNode(nodes: NodeListOf<ChildNode>, searchWithOutRegExp: string): boolean {
    let isMatch = false;

    // при изменении дерева NodeListOf цикл начнет ходить по добавленным, нужно кэшить
    const cacheNodes: ChildNode[] = [];
    nodes.forEach((node: ChildNode) => {
      cacheNodes.push(node);
    });

    cacheNodes.forEach(node => {
      if (node.nodeType === 3) { // для текстовых нод
        if (node.nodeValue && node.nodeValue.search(new RegExp(searchWithOutRegExp, 'i')) > -1) {
          isMatch = true;
          this._wrapNode(node, searchWithOutRegExp);
        }
      } else {
        isMatch = this._recursiveReplaceNode(node.childNodes, searchWithOutRegExp) || isMatch;
      }
    });

    return isMatch;
  }

  /** Меняем дерево дома `searchWithOutRegExp` */
  private _wrapNode(textNode: ChildNode, searchWithOutRegExp: string) {
    if (!textNode || !textNode.nodeValue) {
      return;
    }
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = textNode.nodeValue
      .replace(new RegExp(searchWithOutRegExp, 'gi'), match => `<mark>${match}</mark>`);

    const parentNode = textNode.parentNode;
    if (parentNode) {
      while (tempDiv.firstChild) {
        parentNode.insertBefore(tempDiv.firstChild, textNode);
      }
      parentNode.removeChild(textNode);
    }
  }
}

export const makeSearchFunc = (searchText: string) => {
  const pattern = /[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g;
  const searchWithOutRegExp = searchText
    .toLowerCase()
    .replace(pattern, '\\$&')
    .split(' ')
    .filter(t => t.length > 0)
    .map(t => `(?=.*${t})`)
    .join('');
  const regExp = new RegExp(searchWithOutRegExp, 'i');
  return (text: string) => text.search(regExp) >= 0;
};
