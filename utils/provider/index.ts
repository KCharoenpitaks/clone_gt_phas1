import { ethers } from 'ethers'
import {
  BSC_TESTNET_CHAIN_ID,
  BSC_TESTNET_CHAIN_NAME,
  DEFAULT_CHAIN_NAME,
  PROVIDER_MORALIS_BSC_TESTNET,
} from 'utils/constants'

const getProviderRpcEndpoint = (chainId) => {
  return PROVIDER_MORALIS_BSC_TESTNET
}

export const getProviderInstance = (chainId) => {
  const rpcEndpoint = getProviderRpcEndpoint(chainId)
  return new ethers.providers.JsonRpcProvider(rpcEndpoint)
}

export const getChainFromChainId = (chainId) => {
  return DEFAULT_CHAIN_NAME
}

export const getChainNameFromChainId = (chainId) => {
  if (chainId == BSC_TESTNET_CHAIN_ID) {
    return BSC_TESTNET_CHAIN_NAME
  }

  return 'Wrong network'
}
