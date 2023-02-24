import { useGetTokenListQuery } from '../../apollo/generated/graphql-codegen-generated';
import { tokenClient } from '../../apollo/client';
import { ApolloClient, NormalizedCacheObject } from '@apollo/client';

export function useLatestTokenList(clientOverride?: ApolloClient<NormalizedCacheObject>){
    const { data, loading } = useGetTokenListQuery({client: clientOverride ? clientOverride : tokenClient});

    return {
        tokenList: data?.tokenGetTokens,
        loading,
    };
}