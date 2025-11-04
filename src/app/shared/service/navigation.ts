import {computed, inject, Injectable} from '@angular/core';
import {NavigationEnd, NavigationExtras, Router} from '@angular/router';
import {toSignal} from '@angular/core/rxjs-interop';
import {filter} from 'rxjs';
import {Location} from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class Navigation {
  private router = inject(Router);
  private location = inject(Location);

  private navigationInformation = toSignal(this.router.events.pipe(filter(event => event instanceof NavigationEnd)));

  public currentUrl = computed(() => {
    return this.navigationInformation()?.url ?? this.router.url;
  });

  /**
   * Navigate to a specific route
   * @param path - Route path (string or array of path segments)
   * @param extras - Optional navigation extras (query params, fragments, etc.)
   */
  navigateTo(path: string | string[], extras?: NavigationExtras): Promise<boolean> {
    const commands = Array.isArray(path) ? path : [path];
    return this.router.navigate(commands, extras);
  }

  /**
   * Navigate back to the previous page
   */
  goBack(): void {
    this.location.back();
  }

  /**
   * Navigate forward in browser history
   */
  goForward(): void {
    this.location.forward();
  }

  /**
   * Replace current URL without adding to history
   * @param path - Route path
   */
  replaceUrl(path: string): void {
    this.location.replaceState(path);
  }
}
