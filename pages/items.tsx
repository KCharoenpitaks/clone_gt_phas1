import React, { FC, useEffect, useMemo, useRef, useState } from "react";
import {
  useMoralis,
  useMoralisWeb3Api,
  useMoralisWeb3ApiCall,
} from "react-moralis";
import { BaseLayout, Box, Col, NFTCard, Row, Spin } from "components";

import NFTContract from "contracts/nft";
import { getChainFromChainId } from "utils/provider";
import { NFTCardSkeleton } from "components/NFTCard";
import { GetStaticProps } from "next/types";
import { GetAllTokenIdsRaw, GetAllTokenIdsTransformed } from "types/Moralis";

interface ItemListPageProps {
  marketData: GetAllTokenIdsTransformed[];
}
const ItemListPage: FC<ItemListPageProps> = (props) => {
  const { marketData } = props;
  const ref = useRef();

  const [page, setPage] = useState(1);

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
  return (
    <BaseLayout>
      <BaseLayout.Content className="container">
        <Box p="24px 40px">
          {widgetPageTitle}

          <Row
            gutter={[16, 16]}
            ref={ref}
            mt="24px"
            style={{ height: "auto" }}
            //   onScroll={onscroll}
          >
            {marketData.map((data) => {
              // (mintEvents as any[]).forEach((event) => {
              //   if (parseInt(event.token_id) === parseInt(data.token_id)) {
              //     data.creator = event.created_by;
              //   }
              // });

              return (
                <Col span={6} key={data.token_id}>
                  <NFTCard scaleOnHover dataSource={data} />
                </Col>
              );
            })}
          </Row>

          {/* TODO: ADD SCROLL TO LOAD BEHAVIOR */}
          {/* <Row
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
          </Row> */}
        </Box>
      </BaseLayout.Content>
    </BaseLayout>
  );
};

export default ItemListPage;

export const getStaticProps: GetStaticProps = async (context) => {
  const Moralis = require("moralis/node");

  const chainId = 0x61; // bsc testnet
  const moralisSecret =
    "7DHC9YW8lBI6i0i78Q2RBTXDrJFMdOIYGNksB5cCmXd6PCmFnu4D2qM7GJGvycF9";

  await Moralis.start({ moralisSecret });

  // Enable web3
  await Moralis.enableWeb3({
    chainId,
  });

  const options = {
    address: NFTContract.address,
    chain: getChainFromChainId(chainId) as any,
    limit: 100,
    offset: 0,
  };
  const response = await Moralis.Web3API.token.getAllTokenIds(options);
  const responseJSON: GetAllTokenIdsTransformed[] = (
    response.result as GetAllTokenIdsRaw[]
  ).map((each) => {
    return {
      ...each,
      metadata: each.metadata ? JSON.parse(each.metadata) : null,
    };
  });

  return {
    props: {
      marketData: responseJSON,
    },
    revalidate: 10,
  };
};
