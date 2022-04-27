import { PublicRoute } from "components";
import React, { useMemo } from "react";
import styled from "styled-components";
import Image from "next/image";
import { Avatar, BaseLayout, Box, Col, Row, Tabs } from "components";
import { stringToColor } from "utils/helper";
import AccountDetailCollectedTable from "components/complex/AccountDetailCollectedTable";
import { useUserProfile } from "utils/hooks/moralis";
import { useRouter } from "next/router";
import { Divider, Grid } from "antd";

const AvatarWrapper = styled.div`
  .ant-avatar {
    border: 8px solid #ffffff;
  }
`;

const AccountDetailPage = () => {
  const router = useRouter();
  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();
  const { address } = router.query;
  const { profile } = useUserProfile(address as string);

  const widgetAccountTabs = useMemo(() => {
    return (
      <Tabs defaultActiveKey="1" size="large">
        <Tabs.TabPane tab="Collections" key="1">
          <AccountDetailCollectedTable />
        </Tabs.TabPane>
      </Tabs>
    );
  }, []);

  const widgetCoverImage = useMemo(() => {
    const cover = profile?.cover;

    if (cover) {
      return (
        <Image src={profile?.cover} alt="cover" width="100%" height="225px" />
      );
    }

    return (
      <Box width="100%" height="225px" bg={stringToColor(`${address}_cover`)} />
    );
  }, [profile?.cover, address]);

  const widgetAvatar = useMemo(() => {
    let avatar = profile?.avatar;

    return (
      <AvatarWrapper>
        <Avatar
          bg={stringToColor(address as string)}
          size={170}
          src={avatar}
          style={{ position: "absolute", top: -180, left: 16 }}
        />
      </AvatarWrapper>
    );
  }, [address, profile?.avatar]);

  const widgetUserBio = useMemo(() => {
    let bio = profile?.bio;

    return (
      <Box>
        <Box fontSize="16px" fontWeight={600} padding="16px 0px">
          Bio
        </Box>
        <Divider style={{ margin: 0 }} />
        <Box mt="16px">{bio ?? "-"}</Box>
      </Box>
    );
  }, [profile?.bio]);

  return (
    <BaseLayout>
      <BaseLayout.Content>
        {widgetCoverImage}
        <Box className="container" style={{ position: "relative" }} pb="24px">
          {widgetAvatar}
          <Row mt="80px" gutter={64}>
            <Col span={screens.xs ? 24 : 8}>{widgetUserBio}</Col>
            <Col
              span={screens.xs ? 24 : 16}
              style={{ paddingTop: screens.xs ? "16px" : "0px" }}
            >
              <Box>{widgetAccountTabs}</Box>
            </Col>
          </Row>
        </Box>
      </BaseLayout.Content>
    </BaseLayout>
  );
};

const AccountDetailPageWrapper = () => {
  return (
    <PublicRoute>
      <AccountDetailPage />
    </PublicRoute>
  );
};

export default AccountDetailPageWrapper;
