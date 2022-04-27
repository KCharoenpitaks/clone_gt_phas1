import React, { useCallback, useEffect, useMemo, FC } from "react";
import styled, { css } from "styled-components";
import Image from "next/image";
import { Card, Avatar, Box } from "../";
import { displayWallet, stringToColor } from "utils/helper";
import Icon from "components/Icon";
import { useMarketItem, useUserProfile } from "utils/hooks/moralis";
import Link from "next/link";
import { useRouter } from "next/router";
import { GetAllTokenIdsTransformed } from "types/Moralis";

interface CardWrapperProps {
  scaleOnHover?: boolean;
}

const CardWrapper = styled(Card)<CardWrapperProps>`
  ${(props) => {
    const defaultCss = css`
      border-radius: 20px !important;

      .ant-card-body {
        padding: 0px !important;
      }
    `;

    const hoverEffect = css`
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

    switch (props.scaleOnHover) {
      case true:
        return `${defaultCss}${hoverEffect}`;
      default:
        return defaultCss;
    }
  }}
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
    background-color: #c2c2c2;
    color: #fff;
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

interface NFTCardProps {
  clickable?: boolean;
  creator: string;
  metadata?: Record<string, any> | null;
  tokenId?: string;
  scaleOnHover?: boolean;
}

const NFTCard: FC<NFTCardProps> = (props) => {
  const { creator, metadata, tokenId, scaleOnHover, clickable } = props;
  const router = useRouter();
  const { profile: creatorProfile } = useUserProfile(creator);
  const { marketItem } = useMarketItem();

  const handleOnClick = useCallback(() => {
    if (tokenId) {
      router.push(`/items/${tokenId}`);
    }
  }, [router, tokenId]);

  const widgetImage = useMemo(() => {
    if (metadata?.image) {
      return (
        <ImgWrapper>
          <Box
            className="content"
            style={{
              borderTopLeftRadius: "20px",
              borderTopRightRadius: "20px",
            }}
          >
            <Image
              alt="example"
              style={{
                objectFit: "cover",
                borderTopLeftRadius: "20px",
                borderTopRightRadius: "20px",
              }}
              width={1000}
              height={1000}
              src={metadata?.image}
            />
          </Box>
        </ImgWrapper>
      );
    }

    return (
      <ImgWrapper>
        <Box
          className="content"
          borderTopLeftRadius="20px"
          borderTopRightRadius="20px"
        >
          <Icon name="noCamera" width="40px" height="40px" />
        </Box>
      </ImgWrapper>
    );
  }, [metadata?.image]);

  return (
    <CardWrapper
      bordered
      hoverable={clickable}
      scaleOnHover={scaleOnHover}
      onClick={clickable ? handleOnClick : () => {}}
    >
      <Box>
        {widgetImage}
        <Box
          p="12px"
          borderBottomLeftRadius="20px"
          borderBottomRightRadius="20px"
          backgroundColor="black"
          color="white"
        >
          <Box display="flex" alignItems="center">
            <Box
              fontSize="16px"
              fontWeight="bold"
              style={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {`${metadata?.name ?? "-"}`}
            </Box>
            <Box ml="auto">BSC</Box>
          </Box>
          <Box display="flex" alignItems="center" mt="8px">
            <Avatar
              size={35}
              src={creatorProfile?.avatar}
              bg={stringToColor(creator)}
            />
            <Box ml="8px">
              <Box fontSize="12px" textAlign="left">
                Creator
              </Box>
              <Box fontSize="14px" fontWeight="bold">
                {creatorProfile?.display_name
                  ? `@${creatorProfile?.display_name}`
                  : displayWallet(creator)}
              </Box>
            </Box>
            {marketItem?.price > 0 && (
              <>
                <Box ml="auto">
                  <Box fontSize="12px" textAlign="right">
                    Price
                  </Box>
                  <Box fontSize="14px" fontWeight="bold" textAlign="end">
                    {marketItem.price} USD
                  </Box>
                </Box>
              </>
            )}
          </Box>
        </Box>
      </Box>
    </CardWrapper>
  );
};

export default NFTCard;
