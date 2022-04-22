import React, { useCallback, useEffect, useState } from "react";
import {
  useMoralisWeb3Api,
  useMoralis,
  useMoralisWeb3ApiCall,
} from "react-moralis";

import { Box, Col, NFTCard, Row, Spin } from "components";

import NFTContract from "contracts/nft";
import { getChainFromChainId } from "utils/provider";
import { useMintEvents } from "utils/hooks/moralis";
import { useRouter } from "next/router";

const CollectedTable = () => {
  const router = useRouter();
  const { address } = router.query;
  const { chainId, isInitialized } = useMoralis();
  const { events: mintEvents } = useMintEvents();

  const Web3Api = useMoralisWeb3Api();
  const { fetch: fetchDataSource, isFetching } = useMoralisWeb3ApiCall(
    Web3Api.account.getNFTs,
    {
      address: address as string,
      chain: getChainFromChainId(parseInt(chainId as string, 16)) as any,
      token_addresses: [NFTContract.address],
    }
  );

  // States
  const [dataSource, setDataSource] = useState<any[]>();

  useEffect(() => {
    if (address) {
      fetchDataSource()
        .then((res) => res?.result)
        .then((dataSource) => {
          return dataSource?.map((data) => {
            data.metadata = JSON.parse(data?.metadata as string);
            return data;
          });
        })
        .then(setDataSource);
    }
  }, [address, fetchDataSource, isInitialized]);

  return (
    <Box className="container">
      <Row gutter={[16, 16]}>
        {dataSource?.map((data) => {
          (mintEvents as any[]).forEach((event) => {
            if (parseInt(event.token_id) === parseInt(data.token_id)) {
              data.creator = event.created_by;
            }
          });
          return (
            <Col span={8} key={(data as any).tokenId}>
              <NFTCard dataSource={data} />
            </Col>
          );
        })}
      </Row>
      {isFetching && (
        <Box mt="48px" textAlign="center">
          <Spin />
        </Box>
      )}
    </Box>
  );
};

export default CollectedTable;
