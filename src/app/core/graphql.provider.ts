import { InMemoryCache, WatchQueryFetchPolicy } from '@apollo/client/core';
import { HttpLink } from 'apollo-angular/http';
import { inject } from '@angular/core';
import { ApolloLink } from '@apollo/client/core';
import { HttpHeaders } from '@angular/common/http';
import { StorageService } from './service/storage.service';
import { environment } from '../../environments/environment';

export function createApollo() {
  const httpLink = inject(HttpLink);
  const storage = inject(StorageService);

  const http = httpLink.create({
    uri: environment.apiUrl,
  });

  const authMiddleware = new ApolloLink((operation, forward) => {
    const token = storage.getItem('token');

    operation.setContext(({ headers }: { headers?: HttpHeaders }) => ({
      headers: new HttpHeaders({
        ...(headers ? Object.fromEntries(headers.keys().map(key => [key, headers.get(key) || ''])) : {}),
        authorization: token ? `Bearer ${token}` : '',
      })
    }));

    return forward(operation);
  });

  return {
    link: authMiddleware.concat(http),
    cache: new InMemoryCache(),
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'network-only' as WatchQueryFetchPolicy,
      },
    },
  };
}
