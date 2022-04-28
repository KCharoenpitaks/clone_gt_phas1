import React, { FC, useCallback, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useMoralis, useMoralisWeb3Api } from "react-moralis";
import { ethers } from "ethers";
import { getProviderInstance } from "utils/provider";

import {
  BaseLayout,
  Box,
  Row,
  Col,
  Button,
  Avatar,
  Tabs,
  InputForm,
  ActivitiesTable,
  PrivateRoute,
  PublicRoute,
} from "components";

// Contracts
import MarketplaceContract from "contracts/marketplace";
import NFTContract from "contracts/nft";
import StableCoinContract from "contracts/stablecoin";

// Helpers
import {
  displayWallet,
  getWalletDisplayName,
  stringToColor,
} from "utils/helper";

import { getChainFromChainId } from "utils/provider";
import { ListingTable, ListingForm, BuyForm } from "components/complex";
import { useMarketItem, useMintEvent } from "utils/hooks/moralis";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import { GetServerSideProps, GetStaticProps } from "next";
import {
  GetAllTokenIdsTransformed,
  GetAllTokenIdsRaw,
  GetTokenIdOwnersTransformed,
  GetTokenIdOwnersRaw,
  GetTokenIdMetadataTransformed,
  GetTokenIdMetadataRaw,
} from "types/Moralis";
import { useMountEffect } from "utils/hooks/useMountEffect";

interface ItemDetailPageProps {
  tokenOwnerData: GetTokenIdOwnersTransformed[];
  tokenMetadata: GetTokenIdMetadataTransformed;
}

const ItemDetailPageWrapper: FC<ItemDetailPageProps> = (props) => {
  const { tokenOwnerData, tokenMetadata } = props;
  return (
    <PublicRoute>
      <ItemDetailPage
        tokenOwnerData={tokenOwnerData}
        tokenMetadata={tokenMetadata}
      />
    </PublicRoute>
  );
};

const ItemDetailPage: FC<ItemDetailPageProps> = (props) => {
  const { tokenOwnerData, tokenMetadata } = props;
  const router = useRouter();
  const { tokenId } = router.query;

  const { marketItem, fetch: fetchMarketItem } = useMarketItem();
  const { event: mintEvent } = useMintEvent(tokenId as string);

  const { chainId = 0x61, account, isAuthenticated } = useMoralis();
  const [dataSource, setDataSource] = useState([]);

  useMountEffect(() => {
    fetchMarketItem(tokenId, chainId);
  });

  const handleOnSale = useCallback(() => {
    fetchMarketItem(tokenId, chainId);
  }, [chainId, fetchMarketItem, tokenId]);

  const handleOnBuy = useCallback(() => {
    fetchMarketItem(tokenId, chainId);
  }, [chainId, fetchMarketItem, tokenId]);

  const widgetItemImage = useMemo(() => {
    return (
      <Box
        display="flex"
        justifyContent="center"
        width="100%"
        border="1px solid #E1E8ED"
        bg="#F8F8F8"
        borderRadius="4px"
        p="16px"
      >
        <Image
          src={tokenMetadata?.metadata?.image}
          alt="nft"
          width="1000px"
          height="1000px"
          style={{ width: "100%", height: "auto" }}
        />
      </Box>
    );
  }, [tokenMetadata?.metadata?.image]);

  const widgetItemTitle = useMemo(() => {
    return (
      <>
        <Box>{tokenMetadata?.metadata?.collection}</Box>
        <Box fontSize="26px" fontWeight="bold">
          {tokenMetadata?.metadata?.name}
        </Box>
        {mintEvent?.from_address && (
          <Box>
            Created by{" "}
            <Link href={{ pathname: `/accounts/${mintEvent.from_address}` }}>
              {getWalletDisplayName(mintEvent.from_address)}
            </Link>
          </Box>
        )}
      </>
    );
  }, [
    mintEvent.from_address,
    tokenMetadata?.metadata?.collection,
    tokenMetadata?.metadata?.name,
  ]);

  const widgetDescription = useMemo(() => {
    return (
      <Box mt="16px">
        <Box color="#000" fontWeight={500}>
          Description
        </Box>
        <Box fontSize="12px" mt="8px">
          {tokenMetadata?.metadata?.description ?? "-"}
        </Box>
      </Box>
    );
  }, [tokenMetadata?.metadata?.description]);

  const widgetListingForm = useMemo(() => {
    const ownerAddresses = tokenOwnerData.map((owner) => {
      return owner.owner_of.toLowerCase();
    });

    if (isAuthenticated && ownerAddresses.includes(account)) {
      return <ListingForm tokenId={tokenId} onSale={handleOnSale} />;
    }

    return null;
  }, [account, handleOnSale, isAuthenticated, tokenOwnerData, tokenId]);

  const widgetBuyForm = useMemo(() => {
    return (
      <BuyForm
        tokenId={tokenId}
        marketItem={marketItem}
        onBuy={handleOnBuy}
        owners={tokenOwnerData}
        currency="USD"
      />
    );
  }, [handleOnBuy, marketItem, tokenId, tokenOwnerData]);

  return (
    <BaseLayout>
      <BaseLayout.Content className="container">
        <Box mt="24px" mb="24px">
          <Row gutter={[32, 16]}>
            <Col span={12}>{widgetItemImage}</Col>
            <Col span={12}>
              <Box width="100%">
                {widgetItemTitle}
                {widgetDescription}
                {widgetBuyForm}
                {widgetListingForm}
                <ListingTable
                  marketItems={[marketItem].filter((marketItem) => {
                    return marketItem?.price > 0 && !marketItem?.sold;
                  })}
                  tokenId={tokenId}
                />
              </Box>
            </Col>
          </Row>
          <ActivitiesTable tokenId={tokenId as string} />
        </Box>
      </BaseLayout.Content>
    </BaseLayout>
  );
};

export default ItemDetailPageWrapper;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const Moralis = require("moralis/node");

  const { params } = context;

  const chainId = 0x61; // bsc testnet
  const moralisSecret =
    "7DHC9YW8lBI6i0i78Q2RBTXDrJFMdOIYGNksB5cCmXd6PCmFnu4D2qM7GJGvycF9"; // TODO: USE ENV VARIABLE INSTEAD.

  await Moralis.start({ moralisSecret });

  // Enable web3
  await Moralis.enableWeb3({
    chainId,
  });

  const getTokenIdOwnersOptions = {
    address: NFTContract.address,
    token_id: params?.tokenId,
    chain: getChainFromChainId(chainId) as any,
    limit: 100,
    offset: 0,
  };
  const getTokenIdOwnersResponse = await Moralis.Web3API.token.getTokenIdOwners(
    getTokenIdOwnersOptions
  );
  const getTokenIdOwnersResponseJSON: GetTokenIdOwnersTransformed[] = (
    getTokenIdOwnersResponse.result as GetTokenIdOwnersRaw[]
  ).map((each) => {
    return {
      ...each,
      metadata: each.metadata ? JSON.parse(each.metadata) : null,
    };
  });

  const getTokenIdMetadataOptions = {
    address: NFTContract.address,
    token_id: params?.tokenId,
    chain: getChainFromChainId(chainId) as any,
    limit: 100,
    offset: 0,
  };
  const getTokenIdMetadataResponse =
    await Moralis.Web3API.token.getTokenIdMetadata(getTokenIdMetadataOptions);

  const getTokenIdMetadataResponseJSON: GetTokenIdMetadataTransformed = {
    ...getTokenIdMetadataResponse,
    metadata: JSON.parse(getTokenIdMetadataResponse.metadata),
  };

  return {
    props: {
      tokenOwnerData: getTokenIdOwnersResponseJSON || [],
      tokenMetadata: getTokenIdMetadataResponseJSON,
    },
  };
};
