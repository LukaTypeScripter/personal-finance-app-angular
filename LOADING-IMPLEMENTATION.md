# Global Loading Implementation - Big Tech Approach

## How Big Tech Companies Track Loading

Instead of hardcoded timeouts, they use **event-driven tracking** across multiple layers:

### 1. **Router Events Tracking** (What we implemented)
Angular Router emits events that tell us exactly when things happen:

- `NavigationStart` → User navigates to new route
- `RouteConfigLoadStart` → Lazy module starts loading
- `RouteConfigLoadEnd` → Lazy module finished loading
- `ResolveStart` → Route data resolver starts (pre-loading data)
- `ResolveEnd` → Route data resolver finishes
- `NavigationEnd` → Navigation complete

Our implementation tracks ALL these events in a queue and only hides the spinner when ALL are complete.

### 2. **HTTP Request Tracking** (Interceptor pattern)
Every API call is tracked automatically:

```typescript
// loadingInterceptor tracks:
- Request starts → Add to queue + show loading
- Request finishes → Remove from queue
- All requests done → Hide loading
```

### 3. **Route Resolvers** (Pre-load data before showing page)
```typescript
// Example: Fetch user data BEFORE showing dashboard
{
  path: 'dashboard',
  resolve: { user: userDataResolver },
  component: DashboardComponent
}
```

The router won't complete navigation until the resolver finishes!

### 4. **Component-Level Tracking** (Manual control when needed)
```typescript
// In your component
navigationLoader.startLoading('my-unique-key');
// ... do work ...
navigationLoader.stopLoading('my-unique-key');
```

## Implementation Details

### Current Implementation (src/app/core/service/navigation-loader.service.ts)

```typescript
private loadingQueue = new Set<string>();

// Tracks multiple loading operations:
- 'navigation' → Route navigation
- 'module-loading' → Lazy modules
- 'resolving' → Data resolvers
- 'http-request-123' → API calls
- 'custom-operation' → Your manual tracking

// Only hides when queue is empty (ALL operations done)
```

### Loading Service (src/app/core/service/loading.service.ts)

Uses a **counter pattern**:
- Each `show()` increments counter
- Each `hide()` decrements counter
- Only hides UI when counter reaches 0

This prevents race conditions when multiple operations happen simultaneously!

## How to Use

### Option 1: Automatic (Recommended)
Just navigate normally - it works automatically for:
- Route navigation ✓
- Lazy module loading ✓
- Route resolvers ✓

### Option 2: HTTP Interceptor (For API calls)
Add to `app.config.ts`:

```typescript
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { loadingInterceptor } from './core/interceptors/loading.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(
      withInterceptors([loadingInterceptor])
    ),
    // ... other providers
  ]
};
```

Now ALL HTTP requests show loading automatically!

**Skip loading for specific requests:**
```typescript
this.http.get('/api/data', {
  headers: { 'X-Skip-Loading': 'true' }
});
```

### Option 3: Route Resolver (Pre-load data)
```typescript
// In routes
{
  path: 'dashboard',
  resolve: { user: userDataResolver },
  loadComponent: () => import('./dashboard').then(m => m.Dashboard)
}

// In component - data is already loaded!
constructor(private route: ActivatedRoute) {
  const user = this.route.snapshot.data['user'];
}
```

### Option 4: Manual Control
```typescript
import { NavigationLoaderService } from '@/app/core/service/navigation-loader.service';

export class MyComponent {
  private loader = inject(NavigationLoaderService);

  async loadData() {
    this.loader.startLoading('fetch-data');

    try {
      await this.fetchData();
    } finally {
      this.loader.stopLoading('fetch-data');
    }
  }
}
```

## Real-World Examples

### Google/YouTube Approach
- Track route navigation ✓
- Track API calls via interceptor ✓
- Pre-load critical data with resolvers ✓
- Manual tracking for video buffering

### Facebook/Meta Approach
- Optimistic UI (show page immediately)
- Track API calls in background
- Show skeleton screens while loading
- Manual tracking for infinite scroll

### Netflix Approach
- Pre-load data with resolvers
- Track video manifest loading manually
- Separate spinners for different content types

## Why This is Better Than Timeouts

❌ **Timeout Approach:**
```typescript
setTimeout(() => hide(), 800); // What if loading takes 1200ms? or 400ms?
```

✅ **Event-Driven Approach:**
```typescript
// Hides exactly when everything is done
if (loadingQueue.size === 0) {
  hide(); // Perfect timing every time!
}
```

## Benefits

1. **Accurate**: Knows exactly when loading is done
2. **No flickering**: Handles multiple simultaneous operations
3. **Scalable**: Add more tracking as app grows
4. **Performant**: Minimal overhead
5. **User-friendly**: Shows loading only when needed

## Testing

```typescript
// Mock the service in tests
const mockLoader = jasmine.createSpyObj('NavigationLoaderService',
  ['startLoading', 'stopLoading']
);

// Verify loading was tracked
expect(mockLoader.startLoading).toHaveBeenCalledWith('my-operation');
expect(mockLoader.stopLoading).toHaveBeenCalledWith('my-operation');
```
