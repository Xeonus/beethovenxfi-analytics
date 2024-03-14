import {GqlChain, useGetTokenListQuery} from '../../apollo/generated/graphql-codegen-generated';
import { tokenClient } from '../../apollo/client';
import { ApolloClient, NormalizedCacheObject } from '@apollo/client';


export function useLatestTokenList(clientOverride?: ApolloClient<NormalizedCacheObject>, chainInIds?: GqlChain[]){
    const { data, loading } = useGetTokenListQuery(
        {
            client: clientOverride ? clientOverride : tokenClient,
            variables: {
                chains: chainInIds ? chainInIds : ['FANTOM']
            }
        }
        );

    return {
        tokenList: data?.tokenGetTokens,
        loading,
    };
}
