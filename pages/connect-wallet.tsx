import { PrivateRoute } from "components";
import React, { useCallback } from "react";
import { useMoralis } from "react-moralis";
import styled from "styled-components";

import { BaseLayout, Box, Icon } from "components";
import { useRouter } from "next/router";

const ButtonWrapper = styled.div`
  border: none !important;
  border-radius: 4px;

  font-size: 16px;
  font-weight: 600;

  width: 100%;
  height: 100%;

  padding: 8px;
  cursor: pointer;

  &:hover {
    color: #000000;
    background-color: #dfdfde;
  }
`;

const ConnectWallet = () => {
  const router = useRouter();
  const { authenticate } = useMoralis();

  const connect = useCallback(async () => {
    await authenticate({ signingMessage: "Log in" })
      .then(function (user) {
        // console.log('logged in user:', user)
        localStorage.setItem("isWalletConnected", "true");
        router.push("/");
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [authenticate, router]);

  return (
    <BaseLayout>
      <BaseLayout.Content className={"container"}>
        <Box fontSize="18px" fontWeight="bold" mt="32px">
          Connect your wallet.
        </Box>
        <Box mt="16px" border="1px solid #E1E8ED" borderRadius="4px">
          <ButtonWrapper>
            <Box
              display="flex"
              alignItems="center"
              width="100%"
              onClick={() => connect()}
            >
              <Icon name="metamask" width="28px" height="28px" />
              <Box fontSize="16px" fontWeight="bold" ml="16px">
                MetaMask
              </Box>
            </Box>
          </ButtonWrapper>
        </Box>
      </BaseLayout.Content>
    </BaseLayout>
  );
};

const ConnectWalletWrapper = () => {
  return (
    <PrivateRoute>
      <ConnectWallet />
    </PrivateRoute>
  );
};

export default ConnectWalletWrapper;
