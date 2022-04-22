import React, { useCallback } from "react";
import { useMoralis } from "react-moralis";

import { Button } from "../";

interface ConnectWalletButtonProps {
  width?: string;
  height?: string;
}

const ConnectWalletButton = ({ width, height }: ConnectWalletButtonProps) => {
  const { authenticate, isAuthenticating } = useMoralis();

  const connect = useCallback(async () => {
    await authenticate({ signingMessage: "Log in" })
      .then(function (user) {
        // console.log('logged in user:', user)
        localStorage.setItem("isWalletConnected", "true");
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [authenticate]);

  return (
    <Button
      shape="round"
      onClick={() => connect()}
      loading={isAuthenticating}
      width={width}
      height={height}
    >
      Connect Wallet
    </Button>
  );
};

export default ConnectWalletButton;
