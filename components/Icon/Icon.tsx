import React, { ComponentType, SVGProps } from "react";

import assets from "public/static";
import styled from "styled-components";
import { space, layout } from "styled-system";
import Icon from "@ant-design/icons";

const icons = assets.icons;

interface IconProps {
  name: keyof typeof icons;
  [key: string]: any;
}

const icon = ({ name, ...props }: IconProps) => {
  const component = icons?.[name];

  return <Icon component={component} {...props}></Icon>;
};

const EnchantedIcon = styled(icon)`
  ${space}
  ${layout}
`;

export default React.memo(EnchantedIcon);
