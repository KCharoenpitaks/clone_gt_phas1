import { Avatar } from "components";

// Contracts
import MarketplaceContract from "contracts/marketplace";
import { ethers } from "ethers";
import { hexValue } from "ethers/lib/utils";

export const displayWallet = (wallet?: string | null) => {
  if (wallet && wallet.length > 10) {
    const len = wallet.length;
    return wallet.substring(0, 6) + "..." + wallet.substring(len - 4, len);
  }

  return "-";
};

export const stringToColor = function (str?: string | null) {
  if (!str) {
    return "#5e5e5e";
  }

  var hash = 0;
  for (var i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  var color = "#";
  for (var i = 0; i < 3; i++) {
    var value = (hash >> (i * 8)) & 0xff;
    color += ("00" + value.toString(16)).substr(-2);
  }
  return color;
};

export const getUserAvatar = (address: any) => {
  return <Avatar size={40} bg={stringToColor(address)} />;
};

export const isNullAddress = (address: string) => {
  return address === ethers.constants.AddressZero;
};

export const getWalletDisplayName = (address: any) => {
  if (isNullAddress(address)) {
    return "NullAddress";
  }

  return displayWallet(address);
};

export const isMintBlockData = (data: { from_address: string }) => {
  const fromAddress = data?.from_address?.toLowerCase();

  if (fromAddress === ethers.constants.AddressZero) {
    return true;
  }

  return false;
};

export const isListingMarketplaceBlockData = (data: { to_address: string }) => {
  const marketplaces = [MarketplaceContract.address.toLowerCase()];
  const toAddress = data?.to_address?.toLowerCase();

  if (marketplaces.includes(toAddress)) {
    // console.log(data)
    console.log(
      ethers.utils.hexValue(
        "0x361c199500000000000000000000000000000000000000000000000000000000000000080000000000000000000000000000000000000000000000000000000000000064"
      )
    );
    console.log(hexValue("0x361c1995"));
    return true;
  }
  return false;
};

export const isCancelMarketplaceBlockData = (data: { operator: string }) => {
  const marketplaces = [MarketplaceContract.address.toLowerCase()];
  const operator = data?.operator?.toLowerCase();

  if (marketplaces.includes(operator)) {
    return true;
  }

  return false;
};

export const isBuyMarketplaceBlockData = (data: any) => {
  return false;
};

export const getActorAddressFromBlockData = (data: {
  to_address: any;
  from_address: any;
}) => {
  if (isMintBlockData(data)) {
    return data.to_address;
  }

  if (isListingMarketplaceBlockData(data)) {
    return data.from_address;
  }

  if (isBuyMarketplaceBlockData(data)) {
    return data.to_address;
  }

  return data.from_address;
};

export const getActorDisplayNameFromBlockData = (data: any) => {
  const actorAddress = getActorAddressFromBlockData(data);
  return getWalletDisplayName(actorAddress);
};

export const getDescriptionFromBlockData = (data: any) => {
  if (isMintBlockData(data)) {
    return "Created";
  }

  if (isListingMarketplaceBlockData(data)) {
    return "List";
  }

  if (isBuyMarketplaceBlockData(data)) {
    return "Sale";
  }

  return "Transfer";
};
