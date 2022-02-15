import {
  ApolloClient,
  from,
  HttpLink,
  InMemoryCache
} from '@apollo/client/core';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { useAuth } from '@quegiro/next';

const auth = useAuth();

let client: ApolloClient<any> | null = null;

export function useGraph({ uri }: { uri?: string } = {}) {
  if (!client && uri) {
    const httpLink = new HttpLink({ uri });

    // const errorLink = onError(
    //   ({ graphQLErrors, networkError, operation, response }) => {
    //     console.error(
    //       'errorLink',
    //       operation.operationName,
    //       response,
    //       graphQLErrors,
    //       networkError
    //     );

    //     if (networkError && (networkError as any).statusCode === 401) {
    //       auth.logout();
    //     }
    //   }
    // );

    const authLink = setContext(async (operation, { headers }) => {
      const token = await auth.refresh();

      return {
        headers: {
          ...headers,
          // 'X-Force-Error': 'true',
          authorization: `Bearer ${token}`
        }
      };
    });

    client = new ApolloClient({
      cache: new InMemoryCache(),
      link: from([authLink, httpLink])
    });
  }

  return { client };
}
