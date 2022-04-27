import { FC, ReactNode, useCallback, useState } from "react";
import { Drawer, Button, Space, Radio, Divider } from "antd";
import { DrawerProps } from "antd/es/drawer";
import { CloseOutlined } from "@ant-design/icons";
import Box from "components/Box";
import Image from "next/image";
import Logo from "public/static/images/logo.png";

interface CustomDrawerProps {
  children: ReactNode;
  open: boolean;
  handleOnClose?: () => void;
}

const CustomDrawer: FC<CustomDrawerProps> = (props) => {
  const { children, open, handleOnClose } = props;

  return (
    <Drawer
      placement="right"
      // style={{
      //   top: "56px",
      // }}
      // contentWrapperStyle={{
      //   transform: "",
      //   // display: open ? "block" : "none",
      //   visibility: open ? "visible" : "hidden",
      //   opacity: open ? 1 : 0,
      //   zIndex: open ? 2 : -10,
      //   transition: open
      //     ? "visibility 0s linear 0s, opacity 300ms"
      //     : "visibility 0s linear 500ms, opacity 500ms",
      // }}
      closable={false}
      onClose={handleOnClose}
      bodyStyle={{ padding: "0px" }}
      width={260}
      visible={open}
    >
      <Box
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "16px",
        }}
        onClick={handleOnClose}
      >
        <Box
          mr="8px"
          display="flex"
          alignItems="center"
          style={{ cursor: "pointer" }}
        >
          <Box style={{ width: "40px", height: "40px" }}>
            <Image src={Logo} alt="logo" width={40} height={40} />
          </Box>
          <Box fontSize="20px" fontWeight={600} ml="18px">
            NFTGT
          </Box>
        </Box>

        <Button
          type="text"
          shape="circle"
          size="large"
          color="rgba(0, 0, 0, 0.45)"
          style={{ fontSize: "10px" }}
          icon={<CloseOutlined />}
        />
      </Box>
      <Divider style={{ margin: 0, marginBottom: 0 }} />
      {children}
    </Drawer>
  );
};

export default CustomDrawer;
