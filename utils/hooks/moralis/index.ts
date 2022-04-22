import _ from "lodash";
import { useCallback, useEffect, useState } from "react";
import {
  useMoralis,
  useMoralisQuery,
  useMoralisWeb3Api,
  useNewMoralisObject,
} from "react-moralis";
import { getChainFromChainId, getProviderInstance } from "utils/provider";

// Contracts
import MarketplaceContract from "contracts/marketplace";
import NFTContract from "contracts/nft";
import StableCoinContract from "contracts/stablecoin";
import { BigNumber, ethers } from "ethers";
import { BSC_TESTNET_CHAIN_ID } from "utils/constants";

const useProfileSetting = () => {
  const { account, enableWeb3, isWeb3Enabled } = useMoralis();

  const { save } = useNewMoralisObject("BscUserProfile");
  const { fetch } = useMoralisQuery("BscUserProfile");

  const [profile, setProfile] = useState({});
  const [profileObject, setProfileObject] = useState(null);

  const setUserProfile = (data: any) => {
    const _data = {
      ...data,
      address: account,
    };

    if (_.isEmpty(profileObject)) {
      return save(_data);
    }

    return (profileObject as any)?.save(_data);
  };

  useEffect(() => {
    if (isWeb3Enabled) {
      fetch({ address: account } as any).then((res) => {
        setProfileObject(res?.[0] ?? {});
        setProfile(JSON.parse(JSON.stringify(res?.[0] ?? {})));
      });
    }
  }, [account, fetch, isWeb3Enabled, setProfile]);

  useEffect(() => {
    if (!isWeb3Enabled) {
      enableWeb3();
    }
  }, [enableWeb3, isWeb3Enabled]);

  return {
    profile: profile,
    setProfile: setUserProfile,
  };
};

const useUserProfile = (address: string | null) => {
  const { fetch } = useMoralisQuery("BscUserProfile", (query) =>
    query.equalTo("address", address)
  );

  const [profile, setProfile] = useState<any>({});

  useEffect(() => {
    fetch().then((res) =>
      setProfile(JSON.parse(JSON.stringify(res?.[0] ?? {})))
    );
  }, [fetch]);

  return { profile };
};

const useMintEvents = () => {
  const { fetch, isFetching } = useMoralisQuery("BscMintEvents");
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch().then((res) => setEvents(JSON.parse(JSON.stringify(res))));
  }, [fetch]);

  return {
    events,
    isFetching,
  };
};

const useMarketItem = () => {
  const [marketItem, setMarketItem] = useState<any>({});

  const fetch = useCallback((tokenId: any, chainId: any) => {
    const currentChainId = chainId ?? BSC_TESTNET_CHAIN_ID;
    const provider = getProviderInstance(currentChainId);

    const marketplaceContract = new ethers.Contract(
      MarketplaceContract.address,
      MarketplaceContract.abi,
      provider
    );

    marketplaceContract
      .idToMarketItem(tokenId)
      .then(
        (res: { price: { toNumber: () => any }; seller: any; sold: any }) => {
          setMarketItem({
            price: res.price.toNumber(),
            seller: res.seller,
            sold: res.sold,
            quantity: 1,
          });
        }
      );
  }, []);

  return {
    marketItem,
    fetch,
  };
};

const useTokenOwners = () => {
  const Web3API = useMoralisWeb3Api();

  const [owners, setOwners] = useState([]);

  const fetch = useCallback(
    (tokenId: any, chainId: any) => {
      const currentChainId = chainId ?? BSC_TESTNET_CHAIN_ID;
      Web3API.token
        .getTokenIdOwners({
          chain: getChainFromChainId(parseInt(currentChainId, 16)) as any,
          address: NFTContract.address,
          token_id: tokenId,
        })
        .then((res) => res.result)
        .then(setOwners as any);
    },
    [Web3API.token]
  );

  return {
    owners,
    fetch,
  };
};

const useStableCoinAllowance = (spenderContract: unknown) => {
  const { account, chainId, enableWeb3, isWeb3Enabled, isAuthenticated } =
    useMoralis();

  const [isStableCoinAllowance, setStableCoinAllowance] = useState(false);

  const approve = useCallback(async () => {
    const provider = await enableWeb3();
    const signed = provider.getSigner();

    const stableCoinContract = new ethers.Contract(
      StableCoinContract.address,
      StableCoinContract.abi,
      signed
    );

    const txn = await stableCoinContract.approve(
      spenderContract,
      "999999999999999999999999999999"
    );

    return txn.wait();
  }, [enableWeb3, spenderContract]);

  const checkStableCoinAllowance = useCallback(async () => {
    const provider = getProviderInstance(chainId);

    const stableCoinContract = new ethers.Contract(
      StableCoinContract.address,
      StableCoinContract.abi,
      provider
    );

    stableCoinContract
      .allowance(account, spenderContract)
      .then((allowance: any) => {
        setStableCoinAllowance(BigNumber.from(allowance).gt(0));
      });
  }, [account, chainId, spenderContract]);

  useEffect(() => {
    if (isWeb3Enabled) {
      checkStableCoinAllowance();
    }
  }, [checkStableCoinAllowance, isAuthenticated, isWeb3Enabled]);

  return {
    isStableCoinAllowance,
    approve,
  };
};

const useMarketplaceAllowance = () => {
  const { enableWeb3, isWeb3Enabled, chainId, account } = useMoralis();
  const [isMarketplaceAllowance, setMarketplaceAllowance] = useState(false);

  const approve = useCallback(async () => {
    const provider = await enableWeb3();
    const signed = provider.getSigner();

    const tokenContract = new ethers.Contract(
      NFTContract.address,
      NFTContract.abi,
      signed
    );

    const txn = await tokenContract.setApprovalForAll(
      MarketplaceContract.address,
      true
    );

    return txn.wait();
  }, [enableWeb3]);

  const checkMarketplaceAllowance = useCallback(() => {
    const provider = getProviderInstance(chainId ?? BSC_TESTNET_CHAIN_ID);

    const tokenContract = new ethers.Contract(
      NFTContract.address,
      NFTContract.abi,
      provider
    );

    tokenContract
      .isApprovedForAll(account, MarketplaceContract.address)
      .then((res: boolean | ((prevState: boolean) => boolean)) =>
        setMarketplaceAllowance(res)
      );
  }, [account, chainId]);

  useEffect(() => {
    if (isWeb3Enabled) {
      checkMarketplaceAllowance();
    }
  }, [checkMarketplaceAllowance, isWeb3Enabled]);

  return {
    isMarketplaceAllowance,
    approve,
  };
};

const useNewBuyEvent = () => {
  const { save } = useNewMoralisObject("BscBuyEvents");

  const createEvent = useCallback(
    (tokenId: string, price: string, buyerAddress: any) => {
      return save({
        token_id: parseInt(tokenId),
        block_timestamp: new Date(),
        price: parseFloat(price),
        token_address: NFTContract.address,
        from_address: buyerAddress,
        created_by: buyerAddress,
      });
    },
    [save]
  );

  return {
    save: createEvent,
  };
};

const useNewMintEvent = () => {
  const { save } = useNewMoralisObject("BscMintEvents");

  const createEvent = useCallback(
    (tokenId: string, mintedAddress: any) => {
      return save({
        token_id: parseInt(tokenId),
        block_timestamp: new Date(),
        token_address: NFTContract.address,
        from_address: mintedAddress,
        created_by: mintedAddress,
      });
    },
    [save]
  );

  return {
    save: createEvent,
  };
};

const useMintEvent = (tokenId: string) => {
  const [event, setEvent] = useState<any>({});
  const { fetch } = useMoralisQuery("BscMintEvents", (query) =>
    query
      .equalTo("token_address", NFTContract.address)
      .equalTo("token_id", parseInt(tokenId))
  );

  useEffect(() => {
    fetch().then((res) => setEvent(JSON.parse(JSON.stringify(res?.[0] ?? {}))));
  }, [fetch]);

  return {
    event,
    fetch,
  };
};

const useNewListingEvent = () => {
  const { save } = useNewMoralisObject("BscListingEvents");

  const createEvent = useCallback(
    (tokenId: string, price: string, sellerAddress: any) => {
      return save({
        token_id: parseInt(tokenId),
        block_timestamp: new Date(),
        price: parseFloat(price),
        token_address: NFTContract.address,
        from_address: sellerAddress,
        created_by: sellerAddress,
      });
    },
    [save]
  );

  return {
    save: createEvent,
  };
};

const useAccountERC20Balance = () => {
  const Web3Api = useMoralisWeb3Api();
  const { account, isAuthenticated, chainId } = useMoralis();

  const [balance, setBalance] = useState([]);

  const fetch = useCallback(() => {
    const currentChainId = chainId ?? BSC_TESTNET_CHAIN_ID;
    Web3Api.account
      .getTokenBalances({
        chain: getChainFromChainId(currentChainId) as any,
        address: account || "",
        // format: "decimal",
      })
      .then((res) => setBalance(res as any));
  }, [Web3Api.account, account, chainId]);

  useEffect(() => {
    if (isAuthenticated) {
      fetch();
    }
  }, [account, fetch, isAuthenticated]);

  return {
    balance,
  };
};

export {
  useProfileSetting,
  useUserProfile,
  useMintEvents,
  useMarketItem,
  useStableCoinAllowance,
  useMarketplaceAllowance,
  useNewBuyEvent,
  useNewMintEvent,
  useMintEvent,
  useNewListingEvent,
  useTokenOwners,
  useAccountERC20Balance,
};
