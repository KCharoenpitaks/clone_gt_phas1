import React, { FC, ReactNode } from "react";

import styled from "styled-components";
import Footer from "./Footer";

import Navbar from "./Navbar";

const Content = styled.div`
  min-height: calc(100vh - 56px - 70px);
`;

const BaseLayout = (props: any) => {
  return (
    <div>
      <Navbar />
      <div>{props.children}</div>
      <Footer />
    </div>
  );
};

const BaseLayoutContent = ({ className, children }: any) => {
  return <Content className={className}>{children}</Content>;
};

BaseLayout.Content = BaseLayoutContent;

export default BaseLayout;
