import {
  DestroyRef,
  inject,
  Injectable,
  PLATFORM_ID,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { debounceTime, fromEvent } from 'rxjs';
import { BREAKPOINTS } from '../constants/responsive.constant';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class Responsive {
  private destroyRef = inject(DestroyRef);
  private platformId = inject(PLATFORM_ID);

  private _isXs = signal(true);
  private _isSm = signal(false);
  private _isMd = signal(false);

  private _windowWidth = signal(window.innerWidth);

  readonly isXs = this._isXs.asReadonly();
  readonly isSm = this._isSm.asReadonly();
  readonly isMd = this._isMd.asReadonly();
  readonly windowWidth = this._windowWidth.asReadonly();

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      this.updateBreakpoints();

      fromEvent(window, 'resize')
        .pipe(debounceTime(100), takeUntilDestroyed(this.destroyRef))
        .subscribe(() => {
          this.updateBreakpoints();
        });
    }
  }

  private updateBreakpoints(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const width = window.innerWidth;

    this._isXs.set(width <= BREAKPOINTS.xs);
    this._isSm.set(width >= BREAKPOINTS.sm.min && width <= BREAKPOINTS.sm.max);
    this._isMd.set(width >= BREAKPOINTS.md);
  }

  getCurrentBreakpoint(): 'xs' | 'sm' | 'md' {
    if (this._isXs()) return 'xs';
    if (this._isSm()) return 'sm';
    return 'md';
  }

  isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  getWindowWidth(): number {
    return isPlatformBrowser(this.platformId) ? window.innerWidth : 0;
  }
}
