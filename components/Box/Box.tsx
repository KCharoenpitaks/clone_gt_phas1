import styled from "styled-components";
import {
  display,
  padding,
  overflow,
  margin,
  border,
  layout,
  flexbox,
  typography,
  color,
  PositionProps,
  LayoutProps,
  OverflowProps,
  DisplayProps,
  MarginProps,
  BorderProps,
  ColorProps,
  FlexboxProps,
  TypographyProps,
  PaddingProps,
} from "styled-system";

interface Props
  extends PositionProps,
    LayoutProps,
    DisplayProps,
    OverflowProps,
    MarginProps,
    BorderProps,
    FlexboxProps,
    TypographyProps,
    PaddingProps,
    ColorProps {
  children?: React.ReactNode;
}

const Box = styled.div<Props>`
  ${display}
  ${padding}
  ${overflow}
  ${margin}
  ${border}
  ${layout}
  ${flexbox}
  ${typography}
  ${color}
`;

export default Box;
