import styled from "styled-components";
import {
  color,
  ColorProps,
  OverflowProps,
  typography,
  TypographyProps,
  WidthProps,
} from "styled-system";

type Props = TypographyProps | ColorProps | OverflowProps | WidthProps;

const Text = styled.span<Props>`
  ${typography}
  ${color}
`;

export default Text;
