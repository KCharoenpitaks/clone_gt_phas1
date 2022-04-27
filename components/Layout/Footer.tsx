import React, { Fragment } from "react";
import { Row, Col, Box } from "components";
import { Grid } from "antd";

const Footer = () => {
  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();
  return (
    <Box bg="black" color="white" p="24px" fontSize="16px">
      <Box className="container" padding={0}>
        <Box
          display="flex"
          flexDirection={screens.xs ? "column" : "row"}
          justifyContent={screens.xs ? "center" : "space-between"}
        >
          <Box mr="auto" margin={screens.xs ? "auto" : ""}>
            © All rights reserved · NFTGT
          </Box>
          <Box
            display="flex"
            margin={screens.xs ? "auto" : ""}
            marginTop={screens.xs ? "16px" : "0px"}
          >
            <Box mr={"16px"}>Facebook</Box>
            <Box mr={"16px"}>Discord</Box>
            <Box mr={screens.xs ? "0px" : "16px"}>Twitter</Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
