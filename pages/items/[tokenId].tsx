import React, { useCallback, useEffect, useMemo, useState } from "react";
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
import {
  useMarketItem,
  useNewBuyEvent,
  useMintEvent,
  useTokenOwners,
} from "utils/hooks/moralis";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";

const ItemDetailPage = () => {
  const router = useRouter();
  const { tokenId } = router.query;

  const { marketItem, fetch: fetchMarketItem } = useMarketItem();
  const { owners, fetch: fetchTokenOwners } = useTokenOwners();
  const { event: mintEvent } = useMintEvent(tokenId as string);

  const Web3API = useMoralisWeb3Api();
  const { enableWeb3, user, chainId, account, isAuthenticated } = useMoralis();
  const [dataSource, setDataSource] = useState([]);

  // States
  const [token, setToken] = useState<any>({});

  const fetchItem = useCallback(async () => {
    Web3API.token
      .getTokenIdMetadata({
        chain: getChainFromChainId(chainId && parseInt(chainId, 16)) as any,
        address: NFTContract.address,
        token_id: (tokenId as string) || "",
      })
      .then((res) => {
        res.metadata = res.metadata && JSON.parse(res.metadata);
        return res;
      })
      .then(setToken);
  }, [Web3API.token, chainId, tokenId]);

  useEffect(() => {
    fetchItem();
    fetchTokenOwners(tokenId, chainId);
    fetchMarketItem(tokenId, chainId);
  }, [chainId, fetchItem, fetchMarketItem, fetchTokenOwners, tokenId]);

  const handleOnSale = useCallback(
    (data: any) => {
      fetchMarketItem(tokenId, chainId);
    },
    [chainId, fetchMarketItem, tokenId]
  );

  const handleOnBuy = useCallback(
    (data: any) => {
      fetchMarketItem(tokenId, chainId);
    },
    [chainId, fetchMarketItem, tokenId]
  );

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
          src={token?.metadata?.image}
          alt="nft"
          width="300px"
          height="400px"
          style={{ width: "100%", height: "auto" }}
        />
      </Box>
    );
  }, [token?.metadata?.image]);

  const widgetItemTitle = useMemo(() => {
    return (
      <>
        <Box>{token?.metadata?.collection}</Box>
        <Box fontSize="26px" fontWeight="bold">
          {`"${token?.metadata?.name}"`}
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
  }, [mintEvent, token?.metadata?.collection, token?.metadata?.name]);

  const widgetOwnedBy = useMemo(() => {
    return (
      <Box
        p="8px"
        mt="8px"
        display="flex"
        alignItems="center"
        bg="#F8F8F8"
        borderRadius="4px !important"
        border="1px solid #E1E8ED"
      >
        <Avatar size={40} bg={stringToColor(token?.owner_by)} />
        <Box ml="8px">
          <Box fontSize="10px">Owner By</Box>
          <Box color="#000" fontWeight="bold" fontSize="12px">
            {displayWallet(token?.owner_by)}
          </Box>
        </Box>
      </Box>
    );
  }, [token?.owner_by]);

  const widgetDescription = useMemo(() => {
    return (
      <Box mt="16px">
        <Box color="#000" fontWeight={500}>
          Description
        </Box>
        <Box fontSize="12px" mt="8px">
          {token?.metadata?.description ?? "-"}
        </Box>
      </Box>
    );
  }, [token?.metadata?.description]);

  const widgetListingForm = useMemo(() => {
    const ownerAddresses = (owners as any[]).map((owner) => {
      return owner.owner_of.toLowerCase();
    });

    if (isAuthenticated && ownerAddresses.includes(account)) {
      return <ListingForm tokenId={tokenId} onSale={handleOnSale} />;
    }

    return null;
  }, [account, handleOnSale, isAuthenticated, owners, tokenId]);

  const widgetBuyForm = useMemo(() => {
    return (
      <BuyForm
        tokenId={tokenId}
        marketItem={marketItem}
        onBuy={handleOnBuy}
        owners={owners}
        currency="USD"
      />
    );
  }, [handleOnBuy, marketItem, owners, tokenId]);

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

const ItemDetailPageWrapper = () => {
  return (
    <PublicRoute>
      <ItemDetailPage />
    </PublicRoute>
  );
};

export default ItemDetailPageWrapper;
