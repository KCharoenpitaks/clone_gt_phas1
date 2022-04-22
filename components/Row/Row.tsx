import { Row as AntRow, RowProps } from "antd";
import { MutableRefObject } from "react";
import styled from "styled-components";
import { padding, margin, MarginProps, PaddingProps } from "styled-system";

interface Props extends RowProps, PaddingProps, MarginProps {
  ref?: any;
}

const Row = styled(AntRow)<Props>`
  ${padding}
  ${margin}
`;

export default Row;
