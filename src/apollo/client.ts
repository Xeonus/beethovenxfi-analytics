import { ApolloClient, InMemoryCache } from '@apollo/client';

export const healthClient = new ApolloClient({
    uri: 'https://api.thegraph.com/index-node/graphql',
    cache: new InMemoryCache(),
});

export const client = new ApolloClient({
    uri: process.env.REACT_APP_SUBGRAPH_URL_STELLATE,
    cache: new InMemoryCache({
        typePolicies: {
            Token: {
                // Singleton types that have no identifying field can use an empty
                // array for their keyFields.
                keyFields: false,
            },
            Pool: {
                // Singleton types that have no identifying field can use an empty
                // array for their keyFields.
                keyFields: false,
            },
        },
    }),
    queryDeduplication: true,
    defaultOptions: {
        watchQuery: {
            fetchPolicy: 'no-cache',
        },
        query: {
            fetchPolicy: 'no-cache',
            errorPolicy: 'all',
        },
    },
});

export const blockClient = new ApolloClient({
    uri: process.env.REACT_APP_BLOCKS_SUBGRAPH_URL,
    cache: new InMemoryCache(),
    queryDeduplication: true,
    defaultOptions: {
        watchQuery: {
            fetchPolicy: 'no-cache',
        },
        query: {
            fetchPolicy: 'no-cache',
            errorPolicy: 'all',
        },
    },
});

export const tokenClient = new ApolloClient({
  uri: process.env.REACT_APP_FTM_TOKEN_CLIENT,
  cache: new InMemoryCache(),
  queryDeduplication: true,
  defaultOptions: {
      watchQuery: {
          fetchPolicy: 'no-cache',
      },
      query: {
          fetchPolicy: 'no-cache',
          errorPolicy: 'all',
      },
  },
});

export const optimismClient = new ApolloClient({
    uri: process.env.REACT_APP_SUBGRAPH_URL_STELLATE,
    cache: new InMemoryCache({
      typePolicies: {
        Token: {
          // Singleton types that have no identifying field can use an empty
          // array for their keyFields.
          keyFields: false,
        },
        Pool: {
          // Singleton types that have no identifying field can use an empty
          // array for their keyFields.
          keyFields: false,
        },
      },
    }),
    queryDeduplication: true,
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'no-cache',
      },
      query: {
        fetchPolicy: 'no-cache',
        errorPolicy: 'all',
      },
    },
  })
  
  export const optimismBlockClient = new ApolloClient({
    uri: process.env.REACT_APP_OP_BLOCKS_SUBGRAPH_URL,
    cache: new InMemoryCache(),
    queryDeduplication: true,
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'cache-first',
      },
      query: {
        fetchPolicy: 'cache-first',
        errorPolicy: 'all',
      },
    },
  })

  export const tokenClientOptimism = new ApolloClient({
    uri: process.env.REACT_APP_OP_TOKEN_CLIENT,
    cache: new InMemoryCache(),
    queryDeduplication: true,
    defaultOptions: {
        watchQuery: {
            fetchPolicy: 'no-cache',
        },
        query: {
            fetchPolicy: 'no-cache',
            errorPolicy: 'all',
        },
    },
  });