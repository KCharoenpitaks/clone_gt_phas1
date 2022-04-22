import Link from "next/link";
import { FC, ReactNode, useEffect } from "react";
import { useMoralis } from "react-moralis";
import { Spin, Box } from "components";

interface RouteProps {
  children: ReactNode;
}
const PrivateRoute: FC<RouteProps> = (props) => {
  const { children } = props;
  const { isAuthenticated, isInitialized, isWeb3Enabled, enableWeb3 } =
    useMoralis();

  useEffect(() => {
    if (!isWeb3Enabled) {
      enableWeb3();
    }
  }, [enableWeb3, isWeb3Enabled]);

  return (
    <>
      {!isInitialized || !isWeb3Enabled ? (
        <Box
          width="100%"
          height="100vh"
          display="flex"
          alignItems="center"
          justifyContent="center"
          bg="#E1E8ED"
        >
          <Spin size="large" />
        </Box>
      ) : isAuthenticated ? (
        children
      ) : (
        <Link href={{ pathname: "/connect-wallet" }} />
      )}
    </>
  );
};

const PublicRoute: FC<RouteProps> = (props) => {
  const { children } = props;
  const { isInitialized } = useMoralis();

  return (
    <>
      {!isInitialized ? (
        <Box
          width="100%"
          height="100vh"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Spin />
        </Box>
      ) : (
        children
      )}
    </>
  );
};

export { PrivateRoute, PublicRoute };
