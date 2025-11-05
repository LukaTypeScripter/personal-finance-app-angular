import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { LoadingService } from '../service/loading.service';

/**
 * HTTP Interceptor that automatically shows/hides loading spinner for API calls
 * This tracks all HTTP requests and shows loading indicator
 *
 * Big tech companies use this pattern to automatically track API calls
 *
 * To enable: Add to app.config.ts providers:
 * provideHttpClient(withInterceptors([loadingInterceptor]))
 */
export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingService = inject(LoadingService);

  const skipLoading = req.headers.has('X-Skip-Loading');
  if (skipLoading) {
    return next(req);
  }

  const requestKey = `http-${req.url}-${Date.now()}`;

  loadingService.httpRequests.add(requestKey);
  loadingService.show();

  return next(req).pipe(
    finalize(() => {
      loadingService.httpRequests.delete(requestKey);

      if (loadingService.httpRequests.size === 0) {
        loadingService.hide();
      }
    })
  );
};
