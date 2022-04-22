import { Box, Table } from "components";

import { getWalletDisplayName } from "utils/helper";
import Link from "next/link";

const ListingTable = ({ marketItems }: any) => {
  const columns = [
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Owner",
      dataIndex: "seller",
      key: "seller",
      render: (value: any) => (
        <Link href={{ pathname: `/accounts/${value}` }}>
          {getWalletDisplayName(value)}
        </Link>
      ),
    },
  ];

  return (
    <Box
      mt="16px"
      border="1px solid #E1E8ED"
      p="16px"
      height="100%"
      borderRadius="4px"
    >
      <Box fontSize="16px" fontWeight="bold" color="black">
        Listing
      </Box>
      <Table
        mt="8px"
        dataSource={marketItems}
        columns={columns}
        pagination={{ hideOnSinglePage: true }}
      />
    </Box>
  );
};

export default ListingTable;
