import {GqlChain, useGetDynamicTokenPricesQuery} from "../../apollo/generated/graphql-codegen-generated";
import { balancerV3APIClient } from "../../apollo/client";
import { TokenPrices } from "./balancerUnifiedTypes";

export default function useGetSimpleTokenPrices(addresses: string[], chainId: GqlChain) {
    const { data, loading, error } = useGetDynamicTokenPricesQuery({
        client: balancerV3APIClient,
        variables: {
            addresses: addresses,
            chain: chainId,
        },
    });

    // Transform the array of token data into an object indexed by tokenAddress
    const tokenPrices: TokenPrices = data?.tokenGetTokensDynamicData.reduce((acc, tokenData) => {
        const { tokenAddress, price, priceChange24h } = tokenData;
        // Calculate the price 24 hours ago
        const price24hAgo = price - priceChange24h;
        // Calculate the price change in percentage terms, ensuring we don't divide by zero
        const priceChangePercentage24h = price24hAgo !== 0 ? (priceChange24h / price24hAgo) * 100 : 0;
        acc[tokenAddress] = { price, priceChange24h, priceChangePercentage24h };
        return acc;
    }, {} as TokenPrices) ?? {};

    return {
        loading,
        error,
        data: tokenPrices, // Return the mapped data
    };
}
