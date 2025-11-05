import { Injectable, inject } from '@angular/core';
import {
  Router,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError,
  RouteConfigLoadStart,
  RouteConfigLoadEnd,
  ResolveStart,
  ResolveEnd
} from '@angular/router';
import { LoadingService } from './loading.service';

@Injectable({
  providedIn: 'root',
})
export class NavigationLoaderService {
  private router = inject(Router);
  private loadingService = inject(LoadingService);
  private loadingQueue = new Set<string>();

  init(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.addToQueue('navigation');
        this.loadingService.show();
      }

      if (event instanceof RouteConfigLoadStart) {
        this.addToQueue('module-loading');
      }

      if (event instanceof RouteConfigLoadEnd) {
        this.removeFromQueue('module-loading');
      }

      if (event instanceof ResolveStart) {
        this.addToQueue('resolving');
      }

      if (event instanceof ResolveEnd) {
        this.removeFromQueue('resolving');
      }

      if (
        event instanceof NavigationEnd ||
        event instanceof NavigationCancel ||
        event instanceof NavigationError
      ) {
        this.removeFromQueue('navigation');
        this.checkAndHideLoader();
      }
    });
  }

  private addToQueue(key: string): void {
    this.loadingQueue.add(key);
  }

  private removeFromQueue(key: string): void {
    this.loadingQueue.delete(key);
  }

  private checkAndHideLoader(): void {
    if (this.loadingQueue.size === 0) {
      setTimeout(() => {
        this.loadingService.hide();
      }, 600);
    }
  }

  startLoading(key: string): void {
    this.addToQueue(key);
    this.loadingService.show();
  }

  stopLoading(key: string): void {
    this.removeFromQueue(key);
    this.checkAndHideLoader();
  }
}

