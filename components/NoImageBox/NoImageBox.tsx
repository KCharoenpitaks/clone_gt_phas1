import { Box, Icon } from "../";
import styled from "styled-components";
import { WidthProps } from "styled-system";
import { FC } from "react";

const BoxWrapper = styled.div`
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
    background: #f8f8f8;
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

interface NoImageBoxProps extends WidthProps {}

const NoImageBox: FC<NoImageBoxProps> = (props) => {
  return (
    <BoxWrapper {...props}>
      <Box className="content">
        <Icon name="noCamera" width="40px" height="40px" />
      </Box>
    </BoxWrapper>
  );
};

export default NoImageBox;
