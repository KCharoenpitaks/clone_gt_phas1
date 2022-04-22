import { Dropdown as AntDropdown, DropDownProps } from "antd";
import { ReactNode } from "react";

import styled from "styled-components";

interface Props extends DropDownProps {
  children: ReactNode;
}

const Dropdown = styled(AntDropdown)<Props>``;

export default Dropdown;
