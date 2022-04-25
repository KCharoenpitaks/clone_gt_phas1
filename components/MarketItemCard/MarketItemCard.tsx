import React, { useCallback, useMemo } from "react";
import styled from "styled-components";
import { Card, Avatar, Box } from "components";
import { displayWallet, stringToColor } from "utils/helper";
import { useMoralisQuery } from "react-moralis";
import { useRouter } from "next/router";
import Image from "next/image";

const CardWrapper = styled(Card)`
  border-radius: 6px !important;

  .ant-card-body {
    padding: 0px !important;
  }

  &:hover {
    box-shadow: 0 0 11px rgba(33, 33, 33, 0.2);
  }
`;
const ImgWrapper = styled.div`
  position: relative;
  width: 100%;

  &:before {
    content: "";
    display: block;
    padding-top: 100%;
    /* initial ratio of 1:1*/
  }

  img {
    min-width: 100%;
    height: 100%;
  }

  .content {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    /*   display: flex;
    align-items: center; */
    line-height: 100%;
    height: 100%;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const MarketItemCard = ({ dataSource, invertedColor }) => {
  const router = useRouter();
  const { data: ownerData } = useMoralisQuery("User", (query) =>
    query.include("address", dataSource?.seller)
  );

  const handleOnClick = useCallback(() => {
    if (dataSource?.id) {
      router.push(`/marketplace/${dataSource.id}`);
    }
  }, [dataSource.id, router]);

  const widgetImage = useMemo(() => {
    return (
      <ImgWrapper>
        <Box className="content">
          <Image
            alt="nft"
            style={{
              borderRadius: "6px",
              objectFit: "cover",
            }}
            width="300px"
            height="300px"
            src={dataSource?.metadata?.image}
          />
        </Box>
      </ImgWrapper>
    );
  }, [dataSource?.metadata?.image]);

  const widgetItemName = useMemo(() => {
    return (
      <Box fontSize="18px" fontWeight="bold">
        {`"${dataSource?.metadata?.name ?? "-"}”`}
      </Box>
    );
  }, [dataSource?.metadata?.name]);

  return (
    <CardWrapper bordered hoverable onClick={handleOnClick}>
      {widgetImage}
      <Box
        p="12px"
        borderTop="1px solid #e5e5ef"
        borderColor={invertedColor ? "black" : "#e5e5ef"}
        borderRadius="0 0 6px 6px"
        color={invertedColor ? "white" : "black"}
        backgroundColor={invertedColor ? "black" : "white"}
      >
        {widgetItemName}
        <Box display="flex" alignItems="center" mt="8px">
          <Avatar
            src={ownerData[0]?.get("image")}
            bg={stringToColor(dataSource?.seller)}
            size={40}
          />
          <Box ml="8px">
            <Box fontSize="14px" fontWeight="bold">
              {displayWallet(dataSource?.seller)}
            </Box>
            <Box fontSize="10px">{dataSource?.metadata?.collection}</Box>
          </Box>
          <Box ml="auto">
            <Box fontSize="14px" fontWeight="bold" textAlign="end">
              {dataSource?.price} USD
            </Box>
            <Box fontSize="10px" textAlign="right">
              Price
            </Box>
          </Box>
        </Box>
      </Box>
    </CardWrapper>
  );
};

export default MarketItemCard;
