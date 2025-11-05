import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private loadingSignal = signal<boolean>(false);
  private loadingCounter = 0;

  httpRequests = new Set<string>();

  isLoading = this.loadingSignal.asReadonly();

  show(): void {
    this.loadingCounter++;
    this.loadingSignal.set(true);
  }

  hide(): void {
    this.loadingCounter--;

    if (this.loadingCounter <= 0) {
      this.loadingCounter = 0;
      this.loadingSignal.set(false);
    }
  }

  forceHide(): void {
    this.loadingCounter = 0;
    this.httpRequests.clear();
    this.loadingSignal.set(false);
  }
}
