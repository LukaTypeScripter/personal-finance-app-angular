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

  private navigationInformation = toSignal(this.router.events.pipe(filter(event => event instanceof NavigationEnd)));

  public currentUrl = computed(() => {
    return this.navigationInformation()?.url ?? this.router.url;
  });


  navigateTo(path: string | string[], extras?: NavigationExtras): Promise<boolean> {
    const commands = Array.isArray(path) ? path : [path];
    return this.router.navigate(commands, extras);
  }
}
