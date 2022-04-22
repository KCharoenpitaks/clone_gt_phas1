import React from "react";
import { Row, Col, Box } from "components";

const Footer = () => {
  return (
    <Box bg="black" color="white" p="24px" fontSize="16px" height="70px">
      <Box className="container" padding={0}>
        <Box display="flex">
          <Box mr="auto">© All rights reserved · NFTGT</Box>
          <Box mr="16px">Facebook</Box>
          <Box mr="16px">Discord</Box>
          <Box mr="16px">Twitter</Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
