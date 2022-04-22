import { Avatar as AntAvatar, AvatarProps } from "antd";
import styled from "styled-components";

import { color, ColorProps } from "styled-system";

const Avatar = styled(AntAvatar)<ColorProps | AvatarProps>`
  ${color}
`;

export default Avatar;
