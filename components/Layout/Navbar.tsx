import React, { useEffect, useMemo } from "react";
import Image from "next/image";
import _ from "lodash";
import styled, { css } from "styled-components";

import { useMoralis } from "react-moralis";

import { Button as AntButton, Menu } from "antd";
import { margin, MarginProps } from "styled-system";
import Logo from "public/static/images/logo.png";

import { Box, Avatar, ConnectWalletButton, Dropdown, Icon } from "components";

import { stringToColor } from "utils/helper";
import { getChainNameFromChainId } from "utils/provider";
import { useAccountERC20Balance, useUserProfile } from "utils/hooks/moralis";
import ChainBadge from "components/ChainBadge";
import StableCoinContract from "contracts/stablecoin";
import { formatEther } from "ethers/lib/utils";
import { BigNumber } from "ethers";
import { useRouter } from "next/router";

const NavbarWrapper = styled.nav`
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
  position: -webkit-sticky;
  position: sticky;
  top: 0px;
  background-color: white;
  z-index: 10;
`;

interface NavMenuButtonProps extends MarginProps {
  isSelected?: boolean;
}

const NavMenuButton = styled.div<NavMenuButtonProps>`
  ${(props) => {
    const defaultCss = css`
      border: none !important;
      border-radius: 4px;
      height: 64px;
      position: relative;
      padding: 4px 24px;
      display: flex;
      flex-direction: column;
      justify-content: center;

      cursor: pointer;

      font-size: 16px;
      font-weight: bold;

      &:hover {
        transition: opacity 0.4s ease 0s;
        opacity: 0.5;
      }
    `;

    const selectedCss = css`
      &::after {
        transition: background-color 0.4s ease 0s;
        background-color: black;
        bottom: 0%;
        content: "";
        display: block;
        height: 4px;
        left: 0px;
        position: absolute;
        width: 100%;
        border-top-left-radius: 4px;
        border-top-right-radius: 4px;
      }
    `;
    switch (props.isSelected) {
      case true:
        return `${defaultCss}${selectedCss}`;
      default:
        return `${defaultCss}`;
    }
  }}

  ${margin}
`;

const Navbar = () => {
  const router = useRouter();
  const { pathname } = router;
  const { user, account, chainId, isAuthenticated, logout } = useMoralis();

  const { balance } = useAccountERC20Balance();
  const { profile: userProfile } = useUserProfile(account);

  const styledAfter = useMemo(
    () => ({
      backgroundColor: "black",
      transition: "background-color 0.4s ease 0s",
      bottom: "0%",
      content: "",
      display: "block",
      height: "4px",
      left: "0px",
      position: "absolute",
      width: "100%",
      borderTopLeftRadius: "4px",
      borderTopRightRadius: "4px",
    }),
    []
  );

  const widgetAccountMenu = useMemo(() => {
    const stableCoinBalance: any = _.find(balance, {
      token_address: StableCoinContract.address,
    });

    const _balance = stableCoinBalance?.balance
      ? parseFloat(formatEther(stableCoinBalance.balance))
      : 0;

    return (
      <Menu>
        <Box p="4px 8px">
          <Box border="1px solid #E1E8ED" p="8px" borderRadius="8px">
            <Box display="flex" alignItems="center">
              <Box fontWeight="bold">Balance</Box>
              <ChainBadge chainId={chainId as string} />
            </Box>
            <Box>{_balance.toFixed(2)} USD</Box>
          </Box>
        </Box>
        <Menu.Item key="profile">
          <Box
            p="8px"
            display="flex"
            minWidth="200px"
            onClick={() => router.push(`/accounts/${account}`)}
          >
            <Icon name="profile" width="24px" />
            <Box ml="8px" fontSize="16px" fontWeight="bold">
              Profile
            </Box>
            <Icon name="rightArrow" width="24px" ml="auto" />
          </Box>
        </Menu.Item>
        <Menu.Item key="profile-setting">
          <Box
            p="8px"
            display="flex"
            minWidth="200px"
            onClick={() => router.push("/settings/profile")}
          >
            <Icon name="setting" width="24px" />
            <Box ml="8px" fontSize="16px" fontWeight="bold">
              Setting
            </Box>
            <Icon name="rightArrow" width="24px" ml="auto" />
          </Box>
        </Menu.Item>
        <Menu.Item key="logout">
          <Box p="8px" display="flex" minWidth="200px" onClick={() => logout()}>
            <Icon name="logout" width="24px" />
            <Box ml="8px" fontSize="16px" fontWeight="bold">
              Logout
            </Box>
            <Icon name="rightArrow" width="24px" ml="auto" />
          </Box>
        </Menu.Item>
      </Menu>
    );
  }, [account, balance, chainId, logout, router]);

  const widgetAccount = useMemo(() => {
    if (isAuthenticated) {
      return (
        <Dropdown
          overlay={widgetAccountMenu}
          placement="bottomRight"
          trigger={["click"]}
        >
          <Box style={{ cursor: "pointer" }}>
            <Avatar
              src={userProfile?.avatar}
              bg={stringToColor(account)}
              size={40}
            />
          </Box>
        </Dropdown>
      );
    }

    return <ConnectWalletButton />;
  }, [account, isAuthenticated, userProfile?.avatar, widgetAccountMenu]);

  const widgetCreateButton = useMemo(() => {
    return (
      <NavMenuButton
        isSelected={
          pathname === "/items/create" || pathname === "/connect-wallet"
        }
        onClick={() => router.push("/items/create")}
        mr="16px"
      >
        Create
      </NavMenuButton>
    );
  }, [pathname, router]);

  return (
    <NavbarWrapper>
      <Box
        display="flex"
        padding="0px 16px"
        margin="0px 16px"
        alignItems="center"
      >
        <Box
          mr="8px"
          padding="8px 0px"
          display="flex"
          alignItems="center"
          style={{ cursor: "pointer" }}
          onClick={() => router.push("/")}
        >
          <Image src={Logo} alt="logo" width="40px" height="40px" />
          <Box fontSize="20px" fontWeight={600} ml="18px">
            NFTGT
          </Box>
        </Box>
        <Box ml="auto" display="flex" alignItems="center" height="100%">
          <NavMenuButton
            isSelected={pathname === "/"}
            onClick={() => {
              router.push("/");
            }}
          >
            Home
          </NavMenuButton>
          <NavMenuButton
            isSelected={pathname === "/items"}
            onClick={() => router.push("/items")}
          >
            Explore
          </NavMenuButton>
          {widgetCreateButton}
          {widgetAccount}
        </Box>
      </Box>
    </NavbarWrapper>
  );
};

export default Navbar;
