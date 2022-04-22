import React, { useMemo, useCallback } from "react";
import { Box, Text } from "components";

import { Avatar, Table } from "antd";
import { stringToColor } from "utils/helper";

const dataSource = [
  {
    id: 1,
    name: "Mason Woodward",
    detail: "Listing on marketplace",
    time_formatted: "10 hours ago",
    price: "8 BNB",
  },
  {
    id: 2,
    name: "Normar Weard",
    detail: "was Bought",
    time_formatted: "8 hours ago",
    price: "20 BNB",
  },
  {
    id: 3,
    name: "Mason Woodward",
    detail: "Listing on marketplace",
    time_formatted: "10 hours ago",
    price: "8 BNB",
  },
  {
    id: 4,
    name: "Normar Weard",
    detail: "was Bought",
    time_formatted: "8 hours ago",
    price: "20 BNB",
  },
  {
    id: 5,
    name: "Mason Woodward",
    detail: "Listing on marketplace",
    time_formatted: "10 hours ago",
    price: "8 BNB",
  },
  {
    id: 6,
    name: "Normar Weard",
    detail: "was Bought",
    time_formatted: "8 hours ago",
    price: "20 BNB",
  },
];

const HistoryTable = () => {
  const widgetTableRow = useCallback((data: any) => {
    return (
      <Box
        borderBottom="1px solid #E1E8ED"
        display="flex"
        p="8px"
        alignItems="center"
      >
        <Avatar size={50} style={{ backgroundColor: stringToColor("a") }} />
        <Box ml="16px">
          <Box color="#000" fontWeight="bold" fontSize="12px">
            {data.name}{" "}
            <Text fontSize="12px" fontWeight={400}>
              {data.detail}
            </Text>
          </Box>
          <Box fontSize="12px">{data.time_formatted}</Box>
        </Box>
        <Box ml="auto" textAlign="end">
          <Box fontWeight="bold">{data.price}</Box>
          <Box fontSize="12px" fontWeight={400}>
            = 103.65 $
          </Box>
        </Box>
      </Box>
    );
  }, []);

  const widgetTableBody = useMemo(() => {
    return dataSource.map((data) => widgetTableRow(data));
  }, [widgetTableRow]);

  return (
    <Box maxHeight="200px" overflow="auto">
      {widgetTableBody}
    </Box>
  );
};

export default HistoryTable;
