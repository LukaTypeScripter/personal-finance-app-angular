import {Directive, ElementRef, inject, OnInit} from '@angular/core';

@Directive({
  selector: '[appLazyAttribute]'
})
export class LazyAttribute implements OnInit{
  private readonly el = inject(ElementRef);

  ngOnInit() {
    const elNative = this.el.nativeElement;
    const isLazyLoadingSupported= 'loading' in HTMLImageElement.prototype

    if(isLazyLoadingSupported) {
      elNative.setAttribute('loading', 'lazy');
    }
  }
}
