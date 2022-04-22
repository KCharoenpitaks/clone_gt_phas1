import React from "react";
import { Box, Spin } from "../";

export default function LoadingPage() {
  return (
    <Box width="100%" textAlign="center" pt="32px">
      <Spin />
    </Box>
  );
}
