import React, { useCallback, useEffect, useState } from "react";
import { useMoralis, useMoralisQuery, useMoralisWeb3Api } from "react-moralis";

import NFTContract from "contracts/nft";
import { getChainFromChainId } from "utils/provider";
import { Box, Avatar, Table } from "components";
import { getWalletDisplayName, stringToColor } from "utils/helper";
import moment from "moment";
import Link from "next/link";

const columns = [
  {
    title: "Event",
    dataIndex: "description",
    key: "description",
    render: (
      value: any,
      record: { is_listing: any; is_mint: any; is_buy: any }
    ) => {
      if (record?.is_listing) {
        return "Sale";
      }

      if (record?.is_mint) {
        return "Create";
      }

      if (record?.is_buy) {
        return "Buy";
      }

      return "Transfer";
    },
  },
  {
    title: "Price",
    dataIndex: "price",
    key: "price",
    render: (value: any) => {
      if (value) {
        return `${value} USD`;
      }

      return "-";
    },
  },
  {
    title: "From",
    dataIndex: "from_address",
    key: "from_address",
    render: (value: any, record: any) => {
      if (value) {
        return (
          <Link passHref href={{ pathname: `/accounts/${value}` }}>
            <Box>{getWalletDisplayName(value)}</Box>
          </Link>
        );
      }
      return "-";
    },
  },
  {
    title: "To",
    dataIndex: "to_address",
    key: "to_address",
    render: (value: any, record: any) => {
      if (value) {
        return (
          <Link passHref href={{ pathname: `/accounts/${value}` }}>
            <Box>{getWalletDisplayName(value)}</Box>
          </Link>
        );
      }
      return "-";
    },
  },
  {
    title: "Time",
    dataIndex: "block_timestamp",
    key: "block_timestamp",
    render: (value: moment.MomentInput) => moment(value).fromNow(),
  },
];

interface ActivitiesTableProps {
  tokenId: string;
}

const ActivitiesTable = ({ tokenId }: ActivitiesTableProps) => {
  const Web3Api = useMoralisWeb3Api();
  const { chainId } = useMoralis();
  const { data: listingEvents, isLoading: isListingEventsLoading } =
    useMoralisQuery("BscListingEvents", (query) =>
      query
        .equalTo("token_address", NFTContract.address)
        .equalTo("token_id", parseInt(tokenId))
    );
  const { data: mintEvents, isLoading: isMintEventsLoading } = useMoralisQuery(
    "BscMintEvents",
    (query) =>
      query
        .equalTo("token_address", NFTContract.address)
        .equalTo("token_id", parseInt(tokenId))
  );
  const { data: buyEvents, isLoading: isBuyEventsLoading } = useMoralisQuery(
    "BscBuyEvents",
    (query) =>
      query
        .equalTo("token_address", NFTContract.address)
        .equalTo("token_id", parseInt(tokenId))
  );

  // State
  const [transferEvents, setTransferEvents] = useState([]);

  const fetchTokenTransfers = useCallback(() => {
    Web3Api.token
      .getWalletTokenIdTransfers({
        chain: getChainFromChainId(chainId) as any,
        address: NFTContract.address,
        token_id: tokenId,
      })
      .then((res) => res.result)
      .then(setTransferEvents as any);
  }, [Web3Api.token, chainId, tokenId]);

  const getListingEvents = useCallback(() => {
    if (!isListingEventsLoading) {
      return JSON.parse(JSON.stringify(listingEvents ?? [])).map(
        (event: { is_listing: boolean; block_timestamp: { iso: any } }) => {
          event.is_listing = true;
          event.block_timestamp = event.block_timestamp.iso;
          return event;
        }
      );
    }

    return [];
  }, [isListingEventsLoading, listingEvents]);

  const getBuyEvents = useCallback(() => {
    if (!isBuyEventsLoading) {
      return JSON.parse(JSON.stringify(buyEvents ?? [])).map(
        (event: { is_buy: boolean; block_timestamp: { iso: any } }) => {
          event.is_buy = true;
          event.block_timestamp = event.block_timestamp.iso;
          return event;
        }
      );
    }

    return [];
  }, [buyEvents, isBuyEventsLoading]);

  const getMintEvents = useCallback(() => {
    if (!isMintEventsLoading) {
      return JSON.parse(JSON.stringify(mintEvents ?? [])).map(
        (event: { is_mint: boolean; block_timestamp: { iso: any } }) => {
          event.is_mint = true;
          event.block_timestamp = event.block_timestamp.iso;
          return event;
        }
      );
    }

    return [];
  }, [isMintEventsLoading, mintEvents]);

  const getDataSource = useCallback(() => {
    let dataSource: any[] = [];
    dataSource = dataSource.concat(transferEvents);
    dataSource = dataSource.concat(getListingEvents());
    dataSource = dataSource.concat(getMintEvents());
    dataSource = dataSource.concat(getBuyEvents());

    return dataSource.sort(
      (a, b) =>
        (moment(b.block_timestamp) as any) - (moment(a.block_timestamp) as any)
    );
  }, [getBuyEvents, getListingEvents, getMintEvents, transferEvents]);

  useEffect(() => {
    fetchTokenTransfers();
  }, [fetchTokenTransfers]);

  return (
    <Box mt="16px" border="1px solid #E1E8ED" borderRadius="4px" p="16px">
      <Box fontSize="16px" fontWeight="bold" color="black">
        Activities
      </Box>
      <Box marginTop="8px">
        <Table
          columns={columns as any}
          dataSource={getDataSource()}
          pagination={{ hideOnSinglePage: true }}
        />
      </Box>
    </Box>
  );
};

export default ActivitiesTable;
