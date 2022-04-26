import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import React, { useCallback } from "react";
import styled from "styled-components";
import {
  BaseLayout,
  Box,
  Row,
  Col,
  Button,
  Avatar,
  Tabs,
  InputForm,
  Text,
  MarketItemCard,
  NFTCard,
} from "components";
import { Typography } from "antd";
import { Grid } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";

const CollectionCardWrapper = styled(Box)`
  border-radius: 6px !important;
  padding: 16px;

  display: flex;

  .ant-card-body {
    padding: 0px !important;
  }

  cursor: pointer;

  &:hover {
    box-shadow: 0 0 11px rgba(33, 33, 33, 0.2);
    transition: all 0.3s ease;
    transform: scale(1.05, 1.05);
    z-index: 2;
  }

  &:hover::after {
    opacity: 1;
  }
`;

const MarketItemCardWrapper = styled(Box)`
  background: black;
  min-width: 350px;
  & > div {
    background: black;
    border: 0;
  }
`;

const HomePage = () => {
  const router = useRouter();
  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();

  const onClickHandler = useCallback(() => {
    router.push("/items");
  }, [router]);

  const onCollectionClickHandler = useCallback(() => {
    router.push("/items");
  }, [router]);

  const mockCollectionData = [
    {
      src: "https://res.cloudinary.com/crunchbase-production/image/upload/c_lpad,f_auto,q_auto:eco,dpr_1/yogq5wyczol4epynu3r9",
      title: "Meebits",
      floorPrice: 1,
    },
    {
      src: "https://res.cloudinary.com/crunchbase-production/image/upload/c_lpad,f_auto,q_auto:eco,dpr_1/yogq5wyczol4epynu3r9",
      title: "Meebits",
      floorPrice: 1,
    },
    {
      src: "https://res.cloudinary.com/crunchbase-production/image/upload/c_lpad,f_auto,q_auto:eco,dpr_1/yogq5wyczol4epynu3r9",
      title: "Meebits",
      floorPrice: 1,
    },
    {
      src: "https://res.cloudinary.com/crunchbase-production/image/upload/c_lpad,f_auto,q_auto:eco,dpr_1/yogq5wyczol4epynu3r9",
      title: "Meebits",
      floorPrice: 1,
    },
    {
      src: "https://res.cloudinary.com/crunchbase-production/image/upload/c_lpad,f_auto,q_auto:eco,dpr_1/yogq5wyczol4epynu3r9",
      title: "Meebits",
      floorPrice: 1,
    },
    {
      src: "https://res.cloudinary.com/crunchbase-production/image/upload/c_lpad,f_auto,q_auto:eco,dpr_1/yogq5wyczol4epynu3r9",
      title: "Meebits",
      floorPrice: 1,
    },
    {
      src: "https://res.cloudinary.com/crunchbase-production/image/upload/c_lpad,f_auto,q_auto:eco,dpr_1/yogq5wyczol4epynu3r9",
      title: "Meebits",
      floorPrice: 1,
    },
    {
      src: "https://res.cloudinary.com/crunchbase-production/image/upload/c_lpad,f_auto,q_auto:eco,dpr_1/yogq5wyczol4epynu3r9",
      title: "Meebits",
      floorPrice: 1,
    },
    {
      src: "https://res.cloudinary.com/crunchbase-production/image/upload/c_lpad,f_auto,q_auto:eco,dpr_1/yogq5wyczol4epynu3r9",
      title: "Meebits",
      floorPrice: 1,
    },
    {
      src: "https://res.cloudinary.com/crunchbase-production/image/upload/c_lpad,f_auto,q_auto:eco,dpr_1/yogq5wyczol4epynu3r9",
      title: "Meebits",
      floorPrice: 1,
    },
    {
      src: "https://res.cloudinary.com/crunchbase-production/image/upload/c_lpad,f_auto,q_auto:eco,dpr_1/yogq5wyczol4epynu3r9",
      title: "Meebits",
      floorPrice: 1,
    },
  ];

  const mockNftData = {
    id: 9,
    tokenId: 11,
    uri: "https://ipfs.moralis.io:2053/ipfs/QmUzWtw8D3jY6DE9sJNiq7gwSqUqeWNEExLAFNosHgtdyo",
    metadata: {
      name: "RMOA #011",
      collection: "threrwetreyrt",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500",
      image:
        "https://ipfs.moralis.io:2053/ipfs/QmS2NU2nXSrF9V1MwUEeW8BSAVRRvRg6sMRBqsRpMVYFab",
    },
    seller: "0xb43293844d9Ac921e9176fB40A723058B2d67163",
    price: 120,
  };

  return (
    <BaseLayout>
      <BaseLayout.Content>
        <Box className="container">
          <Box display="flex" flexDirection="column" justifyContent="center">
            <Box
              style={{
                display: "flex",
                justifyContent: !screens.xs ? "space-between" : "",
                flexDirection: screens.xs ? "column" : "row",
                padding: "96px 0",
              }}
            >
              <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
                maxWidth="320px"
                marginRight="8px"
              >
                <Text fontSize="34px" lineHeight="normal">
                  GROW & NURTURE THAT <b>INNOVATIVE</b> IDEA <b>YOU</b> HAVE
                </Text>
                <Button
                  type="primary"
                  size="large"
                  maxWidth="224px"
                  mt="80px"
                  onClick={onClickHandler}
                >
                  NFT Marketplace
                </Button>
              </Box>
              <MarketItemCardWrapper
                marginTop={screens.xs ? "80px" : "0px"}
                border="15px solid black"
                borderRadius="6px"
              >
                <MarketItemCard invertedColor dataSource={mockNftData} />
              </MarketItemCardWrapper>
            </Box>
          </Box>
        </Box>
        <Box
          className="container"
          backgroundColor="black"
          margin="0"
          width="100%"
          padding="144px 24px"
          display="flex"
          flexDirection="row"
          justifyContent="center"
        >
          <Box
            display="flex"
            flexDirection="column"
            width="550px"
            textAlign="center"
          >
            <Text fontWeight="bold" fontSize="24px" color="white">
              {`"We are a medium for Thai art that focuses on exchanging, sharing,
              and learning together."`}
            </Text>
            <Box mt="16px">
              <Link href="/items" passHref>
                <Text
                  width="fit-content"
                  style={{ color: "white", cursor: "pointer" }}
                >
                  See more
                </Text>
              </Link>
            </Box>
          </Box>
        </Box>
        <Box
          className="container"
          padding={screens.md ? "96px 0px" : "96px 16px"}
        >
          <Text fontWeight="bold" fontSize="32px">
            Top collections
          </Text>
          <Box mt="48px">
            <Row
              gutter={screens.xs ? [16, 16] : [16, 80]}
              style={{
                marginLeft: screens.xs ? 0 : -8,
                marginRight: screens.xs ? 0 : -8,
              }}
            >
              {mockCollectionData
                .filter((_, i) => {
                  if (screens.xl) return i < 8;
                  if (screens.sm) return i < 6;
                  if (screens.xs) return i < 4;
                  return i < 8;
                })
                .map((each, index) => {
                  const { src, title, floorPrice } = each;
                  return (
                    <Col key={index} xs={24} sm={12} lg={8} xl={6}>
                      <CollectionCardWrapper onClick={onCollectionClickHandler}>
                        <Image
                          alt={"collection_" + index}
                          src={src}
                          width="100px"
                          height="100px"
                        />

                        <Box
                          display="flex"
                          flexDirection="column"
                          marginLeft="12px"
                          flex={2}
                        >
                          <Text
                            fontSize="16px"
                            fontWeight="bold"
                            style={{ overflowWrap: "anywhere" }}
                          >
                            {title}
                          </Text>
                          <Box mt="4px">
                            <Text>${floorPrice}</Text>
                          </Box>
                        </Box>
                      </CollectionCardWrapper>
                    </Col>
                  );
                })}
            </Row>
          </Box>
          {mockCollectionData.length > 8 && (
            <Box mt="80px">
              <Text fontWeight="bold">
                <Link href="/items">View more collections</Link>
              </Text>
            </Box>
          )}
        </Box>
      </BaseLayout.Content>
    </BaseLayout>
  );
};

export default HomePage;
