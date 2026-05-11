'use client';

import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink } from '@apollo/client';

const client = new ApolloClient({
  link: new HttpLink({ uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || '/api/graphql' }),
  cache: new InMemoryCache(),
});

interface Props {
  children: React.ReactNode;
}

export function ApolloWrapper({ children }: Props) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}