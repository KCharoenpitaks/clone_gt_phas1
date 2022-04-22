import React, { useCallback, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { ethers } from 'ethers'
import { useMoralis } from 'react-moralis'

import { Box, InputForm, Button, Notification } from 'components'

// Contracts
import MarketplaceContract from 'contracts/marketplace'
import NFTContract from 'contracts/nft'
import {
  useMarketplaceAllowance,
  useNewListingEvent,
  useStableCoinAllowance,
} from 'utils/hooks/moralis'

const ListingForm = ({ tokenId, onSale }) => {
  const { save: createListingEvent } = useNewListingEvent('BscListingEvents')
  const { isStableCoinAllowance, approve } = useStableCoinAllowance(
    MarketplaceContract.address
  )
  const { isMarketplaceAllowance, approve: approveMarketplace } =
    useMarketplaceAllowance()

  const { control, errors, handleSubmit } = useForm()

  const { account, enableWeb3 } = useMoralis()

  // States
  const [isListing, setListing] = useState(false)
  const [isMarketplaceApproving, setMarketplaceApproving] = useState(false)
  const [isStableCoinApproving, setStableCoinApproving] = useState(false)

  const requestApproveStableCoin = useCallback(() => {
    setStableCoinApproving(true)
    approve()
      .then(() => {
        Notification('success', 'Approve Successfully')
      })
      .finally(() => setStableCoinApproving(false))
  }, [approve])

  const requestApproveMarketplace = useCallback(() => {
    setMarketplaceApproving(true)
    approveMarketplace()
      .then(() => {
        Notification('success', 'Approve Successfully')
      })
      .finally(() => setMarketplaceApproving(false))
  }, [approveMarketplace])

  const createMarketSale = useCallback(
    async (data) => {
      const provider = await enableWeb3()
      const signed = provider.getSigner()

      const marketplaceContract = new ethers.Contract(
        MarketplaceContract.address,
        MarketplaceContract.abi,
        signed
      )

      const txn = await marketplaceContract.createMarketItem(
        tokenId,
        data.price
      )

      setListing(true)
      await txn
        .wait()
        .then((res) => {
          Notification('success', 'Sale Successfully')
          if (onSale) {
            onSale(res)
          }
          createListingEvent(tokenId, data.price, account)
        })
        .finally(() => {
          setListing(false)
        })
    },
    [account, createListingEvent, enableWeb3, onSale, tokenId]
  )

  const onSubmit = (data) => {
    createMarketSale(data)
  }

  const widgetAction = useMemo(() => {
    if (!isMarketplaceAllowance) {
      return (
        <Button
          block={1}
          type="primary"
          size="large"
          mt="8px"
          loading={isMarketplaceApproving}
          onClick={() => requestApproveMarketplace()}
        >
          Approve Marketplace
        </Button>
      )
    }

    if (!isStableCoinAllowance) {
      return (
        <Button
          block={1}
          type="primary"
          size="large"
          mt="8px"
          loading={isStableCoinApproving}
          onClick={() => requestApproveStableCoin()}
        >
          Approve
        </Button>
      )
    }

    return (
      <Button
        block={1}
        type="primary"
        size="large"
        mt="8px"
        htmlType="submit"
        loading={isListing}
      >
        Listing
      </Button>
    )
  }, [
    isListing,
    isMarketplaceAllowance,
    isMarketplaceApproving,
    isStableCoinAllowance,
    isStableCoinApproving,
    requestApproveMarketplace,
    requestApproveStableCoin,
  ])

  return (
    <form id="listing-form" onSubmit={handleSubmit(onSubmit)}>
      <Box mt="16px">
        <Box border="1px solid #E1E8ED" p="8px">
          <InputForm
            name="price"
            label="Price"
            control={control}
            type="number"
            min={0}
            rules={{ required: 'This field is required' }}
            disabled={
              !isStableCoinAllowance || !isMarketplaceAllowance || isListing
            }
            errors={errors}
          />
        </Box>
        {widgetAction}
      </Box>
    </form>
  )
}

export default ListingForm
