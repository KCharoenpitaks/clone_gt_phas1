import { useCallback, useMemo, useState } from "react";
import { ethers } from "ethers";
import { useMoralis } from "react-moralis";

import {
  Button,
  Box,
  Text,
  Notification,
  ConnectWalletButton,
} from "components";

import MarketplaceContract from "contracts/marketplace";
import StableCoinContract from "contracts/stablecoin";
import TokenContract from "contracts/nft";

import { useNewBuyEvent, useStableCoinAllowance } from "utils/hooks/moralis";

const BuyForm = ({ tokenId, marketItem, currency, onBuy, owners }: any) => {
  const { enableWeb3, account, isAuthenticated } = useMoralis();
  const { save: createBuyEvent } = useNewBuyEvent();

  const { isStableCoinAllowance, approve } = useStableCoinAllowance(
    MarketplaceContract.address
  );

  const [isSubmitting, setSubmit] = useState(false);
  const [isApproving, setApproving] = useState(false);

  const requestApprove = useCallback(() => {
    setApproving(true);
    approve()
      .then(() => {
        Notification("success", "Approve Successfully");
      })
      .finally(() => {
        setApproving(false);
      });
  }, [approve]);

  const requestBuy = useCallback(
    async (tokenId: string, price: string) => {
      // const provider = await enableWeb3();
      // const signed = provider.getSigner();
      // const marketplaceContract = new ethers.Contract(
      //   MarketplaceContract.address,
      //   MarketplaceContract.abi,
      //   signed
      // );
      // const txn = await marketplaceContract.createMarketSale(
      //   StableCoinContract.address,
      //   tokenId
      // );
      // setSubmit(true);
      // const event = createBuyEvent(tokenId, price, account);
      // await txn
      //   .wait()
      //   .then((res: any) => {
      //     Notification("success", "Buy Successfully");
      //     if (onBuy) {
      //       onBuy(res);
      //     }
      //   })
      //   .catch((ex: any) => {
      //     (event as any).destroy();
      //     Notification(
      //       "error",
      //       "Something went wrong !!! Please try again later."
      //     );
      //   })
      //   .finally(() => {
      //     setSubmit(false);
      //   });
    },
    [account, createBuyEvent, enableWeb3, onBuy]
  );

  const widgetBuyButton = useMemo(() => {
    if (!isAuthenticated) {
      return <ConnectWalletButton />;
    }

    if (
      !account ||
      owners.length === 0 ||
      owners.filter(
        (owner: string) => owner.toLowerCase() === account?.toLowerCase()
      ).length > 0
    ) {
      return null;
    }

    if (marketItem?.price && marketItem.price > 0) {
      if (!isStableCoinAllowance) {
        return (
          <Button
            type="primary"
            mt="8px"
            width="200px"
            loading={isApproving}
            onClick={() => requestApprove()}
          >
            Approve
          </Button>
        );
      }

      return (
        <Button
          type="primary"
          mt="8px"
          width="200px"
          loading={isSubmitting}
          onClick={() => requestBuy(tokenId, marketItem?.price)}
        >
          Buy now
        </Button>
      );
    }

    return null;
  }, [
    account,
    isApproving,
    isAuthenticated,
    isStableCoinAllowance,
    isSubmitting,
    marketItem.price,
    owners,
    requestApprove,
    requestBuy,
    tokenId,
  ]);

  return (
    <Box
      border="1px solid #E1E8ED"
      borderRadius="4px"
      padding="24px"
      display="flex"
      flexDirection="column"
      backgroundColor="white"
      color="black"
      marginTop="16px"
      //   style={{ boxShadow: "0px 4px 16px -4px hsl(0deg 0% 0% / 0.2)" }}
    >
      <Text fontSize="16px">Current price</Text>
      <Text fontSize="30px" fontWeight="bold">
        {marketItem?.price && !marketItem?.sold ? marketItem.price : "-"}{" "}
        {`${currency}`}
      </Text>
      {widgetBuyButton}
    </Box>
  );
};

export default BuyForm;
