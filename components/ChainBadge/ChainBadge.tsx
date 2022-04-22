import React, { FC } from "react";
import { Box } from "../";

// Helpers
import { getChainNameFromChainId } from "utils/provider";

interface ChainBadgeProps {
  chainId: string;
}
const ChainBadge: FC<ChainBadgeProps> = ({ chainId }) => {
  return (
    <Box fontSize="12px" bg="#E1E8ED" ml="auto" p="0px 8px" borderRadius="8px">
      {getChainNameFromChainId(parseInt(chainId))}
    </Box>
  );
};

export default ChainBadge;
