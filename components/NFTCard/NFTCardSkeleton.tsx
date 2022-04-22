import React from "react";
import styled from "styled-components";
import { Skeleton as AntDSkeleton } from "antd";
import Skeleton from "react-loading-skeleton";
import { Card, Box } from "components";
import { Breathing } from "react-shimmer";

const CardWrapper = styled(Card)`
  border-radius: 20px !important;

  .ant-card-body {
    padding: 0px !important;
  }
`;

const ImgWrapper = styled.div`
  background: white;
  box-sizing: border-box;
  overflow: auto;
  max-width: 100%;
`;

const NFTCardSkeleton = () => {
  return (
    <CardWrapper bordered>
      <Box>
        <ImgWrapper>
          <Box
            style={{
              width: "100%",
              paddingBottom: "100%",
              background: "#e1e2e4",
              borderTopLeftRadius: "20px",
              borderTopRightRadius: "20px",
              animation: "breathing ease-in-out infinite alternate",
              animationDuration: "1s",
            }}
          ></Box>
        </ImgWrapper>
        <Breathing />
        <Box p="12px">
          <Box display="flex" justifyContent="space-between">
            <Box fontSize="18px" fontWeight="bold" flex={1}>
              <Skeleton style={{ maxWidth: "100px" }} width="100%" />
            </Box>
            <Box fontSize="18px" fontWeight="bold" flex={1} textAlign="right">
              <Skeleton style={{ maxWidth: "40px" }} width="40%" />
            </Box>
          </Box>
          <Box display="flex" alignItems="center" mt="8px">
            <Box flex={1}>
              <AntDSkeleton.Avatar active />
            </Box>
            <Box flex={2} ml="8px">
              <Box fontSize="12px">
                <Skeleton style={{ maxWidth: "50px" }} width="100%" />
              </Box>
              <Box fontSize="14px" fontWeight="bold">
                <Skeleton style={{ maxWidth: "100px" }} width="100%" />
              </Box>
            </Box>
            <Box flex={2} ml="auto">
              <Box fontSize="12px" fontWeight="bold" textAlign="end">
                <Skeleton style={{ maxWidth: "50px" }} width="50%" />
              </Box>
              <Box fontSize="14px" fontWeight="bold" textAlign="end">
                <Skeleton style={{ maxWidth: "50px" }} width="50%" />
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </CardWrapper>
  );
};

export default NFTCardSkeleton;
