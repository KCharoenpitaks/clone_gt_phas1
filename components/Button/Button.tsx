import {
  Button as AntButton,
  ButtonProps,
  LayoutProps,
  TypographyProps,
} from "antd";
import { BaseButtonProps } from "antd/lib/button/button";
import styled from "styled-components";
import {
  margin,
  layout,
  typography,
  MarginProps,
  WidthProps,
  HeightProps,
  FontWeightProps,
  MaxWidthProps,
} from "styled-system";

type Props =
  | ButtonProps
  | BaseButtonProps
  | MarginProps
  | LayoutProps
  | TypographyProps
  | HeightProps
  | WidthProps
  | FontWeightProps
  | MaxWidthProps;

const Button = styled(AntButton)<Props>`
  border-radius: 4px;
  padding: 8px 16px;
  height: auto;
  font-weight: bold;
  ${margin};
  ${layout};
  ${typography}
`;

export default Button;
