import { FC, ReactNode, useCallback, useState } from "react";
import { Drawer, Button, Space, Radio } from "antd";
import { DrawerProps } from "antd/es/drawer";

interface CustomDrawerProps {
  children: ReactNode;
  open: boolean;
  handleOnClose?: () => void;
}

const CustomDrawer: FC<CustomDrawerProps> = (props) => {
  const { children, open, handleOnClose } = props;

  return (
    <Drawer
      placement="top"
      style={{
        top: "56px",
      }}
      contentWrapperStyle={{
        transform: "",
        // display: open ? "block" : "none",
        visibility: open ? "visible" : "hidden",
        opacity: open ? 1 : 0,
        zIndex: open ? 2 : -10,
        transition: open
          ? "visibility 0s linear 0s, opacity 300ms"
          : "visibility 0s linear 500ms, opacity 500ms",
      }}
      width={500}
      onClose={handleOnClose}
      visible={open}
    >
      {children}
    </Drawer>
  );
};

export default CustomDrawer;
