import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  useMoralis,
  useMoralisWeb3Api,
  useMoralisWeb3ApiCall,
} from "react-moralis";
import { BaseLayout, Box, Col, NFTCard, Row, Spin } from "components";

import NFTContract from "contracts/nft";
import { getChainFromChainId } from "utils/provider";
import { useMintEvents } from "utils/hooks/moralis";
import { NFTCardSkeleton } from "components/NFTCard";

const ItemListPage = () => {
  const ref = useRef();

  const { events: mintEvents } = useMintEvents();

  const [page, setPage] = useState(1);

  const { chainId, isInitialized } = useMoralis();
  const Web3Api = useMoralisWeb3Api();
  const { fetch: fetchItems, isFetching } = useMoralisWeb3ApiCall(
    Web3Api.token.getAllTokenIds,
    {
      address: NFTContract.address,
      chain: getChainFromChainId(chainId) as any,
      limit: 100,
      offset: (page - 1) * 100,
    }
  );

  const [dataSource, setDataSource] = useState([]);

  const widgetPageTitle = useMemo(() => {
    return (
      <>
        <Box fontSize="24px" fontWeight="bold" textAlign="center">
          Marketplace
        </Box>
        <Box textAlign="center">
          Discover, collect and trade astonishing items from trending games,
          special projects and talented artists from around the world
        </Box>
      </>
    );
  }, []);

  useEffect(() => {
    if (isInitialized) {
      fetchItems()
        .then((res) => (res as any).result)
        .then((dataSource) => {
          return (dataSource as any[]).map((data) => {
            data.metadata = JSON.parse(data.metadata);
            return data;
          });
        })
        .then(setDataSource as any)
        .catch((ex) => console.log(ex));
    }
  }, [fetchItems, isInitialized]);

  return (
    <BaseLayout>
      <BaseLayout.Content className="container">
        <Box p="24px 40px">
          {widgetPageTitle}
          {!isFetching && (
            <Row
              gutter={[16, 16]}
              ref={ref}
              mt="24px"
              style={{ height: "auto" }}
              //   onScroll={onscroll}
            >
              {(dataSource as any[]).map((data) => {
                (mintEvents as any[]).forEach((event) => {
                  if (parseInt(event.token_id) === parseInt(data.token_id)) {
                    data.creator = event.created_by;
                  }
                });

                return (
                  <Col span={6} key={data.tokenId}>
                    <NFTCard scaleOnHover dataSource={data} />
                  </Col>
                );
              })}
            </Row>
          )}
          {isFetching && (
            <Row
              gutter={[16, 16]}
              ref={ref}
              mt="24px"
              style={{ height: "auto" }}
              //   onScroll={onscroll}
            >
              {Array.apply(null, Array(12)).map((_, index) => (
                <Col span={6} key={index}>
                  <NFTCardSkeleton />
                </Col>
              ))}
            </Row>
          )}
        </Box>
      </BaseLayout.Content>
    </BaseLayout>
  );
};

export default ItemListPage;
