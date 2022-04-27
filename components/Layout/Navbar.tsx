import React, { Fragment, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import _ from "lodash";
import styled, { css } from "styled-components";
import { useMoralis } from "react-moralis";
import { Button as AntButton, Button, Divider, Menu } from "antd";
import { margin, MarginProps } from "styled-system";
import Logo from "public/static/images/logo.png";
import { Box, Avatar, ConnectWalletButton, Dropdown, Icon } from "components";
import { displayWallet, stringToColor } from "utils/helper";
import { getChainNameFromChainId } from "utils/provider";
import { useAccountERC20Balance, useUserProfile } from "utils/hooks/moralis";
import ChainBadge from "components/ChainBadge";
import StableCoinContract from "contracts/stablecoin";
import { formatEther } from "ethers/lib/utils";
import { BigNumber } from "ethers";
import { useRouter } from "next/router";
import { Grid } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import CustomDrawer from "../CustomDrawer";
import Text from "components/Text";

const NavbarWrapper = styled.nav`
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
  position: -webkit-sticky;
  position: sticky;
  top: 0px;
  background-color: white;
  z-index: 10;
  height: 64px;
`;

interface NavMenuButtonProps extends MarginProps {
  isSelected?: boolean;
  noBottomLine?: boolean;
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

    const selectedCssXs = css`
      background-color: #e8e8e8;
    `;

    switch (props.isSelected) {
      case true:
        if (props.noBottomLine) {
          return `${defaultCss}${selectedCssXs}`;
        }
        return `${defaultCss}${selectedCss}`;
      default:
        return `${defaultCss}`;
    }
  }}

  ${margin}
`;

const Navbar = () => {
  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();
  const router = useRouter();
  const { pathname } = router;
  const { user, account, chainId, isAuthenticated, logout } = useMoralis();

  const { balance } = useAccountERC20Balance();
  const { profile: userProfile } = useUserProfile(account);

  const [profileMenuOpen, setProfileMenuOpen] = useState<boolean>(false);
  const [navigationDrawerOpen, setNavigationDrawerOpen] =
    useState<boolean>(false);

  const widgetAccountMenu = useMemo(() => {
    const stableCoinBalance: any = _.find(balance, {
      token_address: StableCoinContract.address,
    });

    const _balance = stableCoinBalance?.balance
      ? parseFloat(formatEther(stableCoinBalance.balance))
      : 0;

    return (
      <Menu style={{ border: 0 }}>
        {screens.xs && (
          <Box
            style={{
              margin: "16px 0px",
              display: "flex",
              alignItems: "center",
              padding: screens.xs ? "0px 16px" : "0px",
            }}
          >
            <Avatar
              src={userProfile?.avatar}
              bg={stringToColor(account)}
              style={{
                marginRight: "8px",
              }}
              size={40}
            />
            <Box>
              <Text fontSize="20px" fontWeight="bold">
                {displayWallet(account)}
              </Text>
            </Box>
          </Box>
        )}
        <Box style={{ padding: screens.xs ? "0px 16px" : "4px 8px" }}>
          <Box
            border="1px solid #E1E8ED"
            borderRadius="8px"
            style={{
              padding: screens.xs ? "20px" : "16px",
              lineHeight: "normal",
            }}
          >
            <Box display="flex" alignItems="center">
              <Box fontWeight="bold">Balance</Box>
              <ChainBadge chainId={chainId as string} />
            </Box>
            <Box>{_balance.toFixed(2)} USD</Box>
          </Box>
        </Box>

        <NavMenuButton
          noBottomLine
          isSelected={pathname === `/accounts/[address]`}
          onClick={() => router.push(`/accounts/${account}`)}
          style={{ padding: "0px 16px" }}
        >
          <Box display="flex" alignItems="center">
            <Icon name="profile" style={{ fontSize: "24px" }} width="24px" />
            <Box ml="8px" fontSize="16px" fontWeight="bold">
              Profile
            </Box>
            <Icon
              name="rightArrow"
              style={{ fontSize: "24px" }}
              width="24px"
              ml="auto"
            />
          </Box>
        </NavMenuButton>
        <Divider style={{ margin: 0 }} />

        <NavMenuButton
          noBottomLine
          isSelected={pathname === "/settings/profile"}
          onClick={() => router.push("/settings/profile")}
          style={{ padding: "0px 16px" }}
        >
          <Box display="flex" alignItems="center">
            <Icon name="setting" width="24px" style={{ fontSize: "24px" }} />
            <Box ml="8px" fontSize="16px" fontWeight="bold">
              Setting
            </Box>
            <Icon
              name="rightArrow"
              width="24px"
              ml="auto"
              style={{ fontSize: "24px" }}
            />
          </Box>
        </NavMenuButton>
        <Divider style={{ margin: 0 }} />
        <NavMenuButton
          noBottomLine
          onClick={() => {
            logout();
            setProfileMenuOpen(false);
          }}
          style={{ padding: "0px 16px" }}
        >
          <Box display="flex" alignItems="center">
            <Icon name="logout" width="24px" style={{ fontSize: "24px" }} />
            <Box ml="8px" fontSize="16px" fontWeight="bold">
              Logout
            </Box>
            <Icon
              name="rightArrow"
              width="24px"
              ml="auto"
              style={{ fontSize: "24px" }}
            />
          </Box>
        </NavMenuButton>
      </Menu>
    );
  }, [
    account,
    balance,
    chainId,
    logout,
    pathname,
    router,
    screens.xs,
    userProfile?.avatar,
  ]);

  const widgetAccount = useMemo(() => {
    if (isAuthenticated) {
      return (
        <Dropdown
          overlay={!screens.xs ? widgetAccountMenu : <></>}
          placement="bottomRight"
          visible={profileMenuOpen}
          trigger={["click"]}
        >
          <Box
            style={{ cursor: "pointer" }}
            onClick={() => {
              setProfileMenuOpen((prev) => !prev);
            }}
          >
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
  }, [
    account,
    isAuthenticated,
    profileMenuOpen,
    screens.xs,
    userProfile?.avatar,
    widgetAccountMenu,
  ]);

  const navigationMenu = useMemo(() => {
    return (
      <Fragment>
        <NavMenuButton
          isSelected={pathname === "/"}
          noBottomLine={screens.xs}
          onClick={() => {
            router.push("/");
          }}
        >
          <Box display="flex">
            <Text>Home</Text>
            {screens.xs && (
              <Icon
                name="rightArrow"
                width="24px"
                ml="auto"
                style={{ fontSize: "24px" }}
              />
            )}
          </Box>
        </NavMenuButton>
        {screens.xs && <Divider style={{ margin: 0 }} />}
        <NavMenuButton
          isSelected={pathname === "/items"}
          noBottomLine={screens.xs}
          onClick={() => router.push("/items")}
        >
          <Box display="flex">
            <Text>Explore</Text>
            {screens.xs && (
              <Icon
                name="rightArrow"
                width="24px"
                ml="auto"
                style={{ fontSize: "24px" }}
              />
            )}
          </Box>
        </NavMenuButton>
        {screens.xs && <Divider style={{ margin: 0 }} />}
        <NavMenuButton
          isSelected={
            pathname === "/items/create" || pathname === "/connect-wallet"
          }
          noBottomLine={screens.xs}
          onClick={() => router.push("/items/create")}
          mr={screens.xs ? "0px" : "16px"}
        >
          <Box display="flex">
            <Text>Create</Text>
            {screens.xs && (
              <Icon
                name="rightArrow"
                width="24px"
                ml="auto"
                style={{ fontSize: "24px" }}
              />
            )}
          </Box>
        </NavMenuButton>
      </Fragment>
    );
  }, [pathname, router, screens.xs]);

  return (
    <NavbarWrapper>
      <Box
        display="flex"
        height="64px"
        padding="0px 16px"
        paddingRight={screens.xs ? "6px" : "16px"}
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
          <Box style={{ width: "40px", height: "40px" }}>
            <Image src={Logo} alt="logo" width={40} height={40} />
          </Box>
          <Box fontSize="20px" fontWeight={600} ml="18px">
            NFTGT
          </Box>
        </Box>
        <Box ml="auto" display="flex" alignItems="center" height="100%">
          {!screens.xs && navigationMenu}
          {widgetAccount}
          {screens.xs && (
            <Button
              type="text"
              icon={<MenuOutlined />}
              shape="circle"
              size="large"
              style={{
                marginLeft: "16px",
                cursor: "pointer",
              }}
              onClick={() => {
                setNavigationDrawerOpen(true);
              }}
            />
          )}
          {screens.xs && (
            <CustomDrawer
              open={profileMenuOpen}
              handleOnClose={() => setProfileMenuOpen(false)}
            >
              {widgetAccountMenu}
            </CustomDrawer>
          )}
          {screens.xs && (
            <CustomDrawer
              open={navigationDrawerOpen}
              handleOnClose={() => setNavigationDrawerOpen(false)}
            >
              {navigationMenu}
            </CustomDrawer>
          )}
        </Box>
      </Box>
    </NavbarWrapper>
  );
};

export default Navbar;
