import React, { useEffect, useMemo, useState, useCallback } from "react";
import { useMoralisFile, useMoralis } from "react-moralis";
import { ethers } from "ethers";
import { useForm } from "react-hook-form";

import {
  BaseLayout,
  Box,
  Row,
  Col,
  Button,
  InputForm,
  TextAreaFrom,
  NFTCard,
  Notification,
  UploadForm,
  ConnectWalletButton,
  PrivateRoute,
} from "components";

// Contracts
import NFTContract from "contracts/nft";
import StableCoinContract from "contracts/stablecoin";
import MarketplaceContract from "contracts/marketplace";

// Helper
import { displayWallet } from "utils/helper";
import { useNewMintEvent, useStableCoinAllowance } from "utils/hooks/moralis";
import { Divider, Grid } from "antd";
import { UploadFile } from "antd/lib/upload/interface";

const ItemCreatePage = () => {
  const { saveFile } = useMoralisFile();
  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();
  const [uploadedFile, setUploadedFile] = useState<UploadFile>();

  const { save: createMintEvent } = useNewMintEvent();
  const { isStableCoinAllowance, approve: approveStableCoin } =
    useStableCoinAllowance(MarketplaceContract.address);

  const { account, isAuthenticated, enableWeb3, isWeb3Enabled, isInitialized } =
    useMoralis();

  const {
    control,
    reset,
    watch,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      image: "",
      description: "",
    },
  });

  const { name, image } = watch();

  const [isSubmitting, setSubmitting] = useState(false);
  const [isStableCoinApproving, setStableCoinApproving] =
    useState<boolean>(false);

  const clearForm = useCallback(() => {
    reset();
  }, [reset]);

  const onSubmit = async (data: any) => {
    if (isAuthenticated) {
      mint(data);
    }
  };

  const requestApproveStableCoin = useCallback(() => {
    setStableCoinApproving(true);
    approveStableCoin()
      .then(() => {
        Notification("success", "Approved Successfully");
      })
      .finally(() => setStableCoinApproving(false));
  }, [approveStableCoin]);

  const widgetNameForm = useMemo(() => {
    return (
      <Box mt="16px">
        <InputForm
          label="Name"
          name="name"
          control={control}
          disabled={isSubmitting}
          rules={{ required: "This field is required" }}
          errors={errors}
          size="large"
          maxLength={20}
          placeholder="eg. This is limited (max 20 characters)"
        />
      </Box>
    );
  }, [control, errors, isSubmitting]);

  const widgetDescriptionForm = useMemo(() => {
    return (
      <Box mt="16px">
        <TextAreaFrom
          label="Description"
          name="description"
          control={control}
          disabled={isSubmitting}
          rules={{ required: false }}
          rows={4}
          maxLength={150}
          size="large"
          placeholder="eg. This is Limited (max 150 characters)"
        />
      </Box>
    );
  }, [control, isSubmitting]);

  const widgetUploadImageForm = useMemo(() => {
    const onSuccess = (imgUrl: string) => {
      console.log("RES");
      console.log(imgUrl);
      setUploadedFile({
        uid: "-1",
        name: "xxx.png",
        status: "done",
        url: imgUrl,
        thumbUrl: imgUrl,
      });
      setValue("image", imgUrl);
    };

    return (
      <UploadForm
        name="image"
        label="Upload File"
        control={control}
        rules={{ required: "This field is required" }}
        errors={errors}
        setValue={setValue}
        onSuccess={onSuccess}
        fileList={uploadedFile && [uploadedFile]}
      />
    );
  }, [control, errors, setValue, uploadedFile]);

  const widgetPreviewCard = useMemo(() => {
    return (
      <NFTCard
        creator={displayWallet(account)}
        metadata={{ name: name ?? "Best Seller #001", image: image }}
      />
    );
  }, [account, image, name]);

  const widgetActions = useMemo(() => {
    if (!isAuthenticated) {
      return (
        <Box mt="16px" textAlign="right">
          <ConnectWalletButton />
        </Box>
      );
    }

    if (!isStableCoinAllowance) {
      return (
        <Box display="flex" mt="16px">
          <Button
            type="primary"
            ml="auto"
            loading={isStableCoinApproving}
            onClick={() => requestApproveStableCoin()}
          >
            Approve
          </Button>
        </Box>
      );
    }

    return (
      <Box display="flex" mt="16px">
        <Button
          type="primary"
          ml="auto"
          mr="16px"
          fontWeight="bold"
          htmlType="submit"
          disabled={!name || !image}
          loading={isSubmitting}
        >
          Create
        </Button>
        <Button
          onClick={() => clearForm()}
          disabled={isSubmitting}
          fontWeight="bold"
        >
          Discard
        </Button>
      </Box>
    );
  }, [
    clearForm,
    image,
    isStableCoinApproving,
    isAuthenticated,
    isStableCoinAllowance,
    isSubmitting,
    name,
    requestApproveStableCoin,
  ]);

  const mint = async (data: { name: any; description: any }) => {
    setSubmitting(true);

    const object = {
      name: data.name,
      description: data.description,
      image: image,
    };

    const metadata = await saveFile(
      `${account}_items_${data.name}.json`,
      { base64: btoa(JSON.stringify(object)) },
      {
        type: "base64",
        saveIPFS: true,
        onSuccess: (result) => console.log(result?.ipfs()),
        onError: (error) => console.log(error),
      }
    );

    const provider = await enableWeb3();
    const signed = provider?.getSigner();
    const contract = new ethers.Contract(
      NFTContract.address,
      NFTContract.abi,
      signed
    );

    const NFTCounter = await contract.NFTcounter();
    const tokenId = NFTCounter.toNumber() + 1;

    const event = await createMintEvent(tokenId, account);

    try {
      const txn = await contract.mint(
        StableCoinContract.address,
        tokenId,
        metadata?.ipfs(),
        data.name
      );

      await txn.wait().then((res: any) => {
        clearForm();
        Notification("success", "Asset already minted");
      });
    } catch (ex) {
      event.destroy();
      Notification("error", (ex as any).data.message);
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    if (!isWeb3Enabled) {
      enableWeb3();
    }
  }, [enableWeb3, isWeb3Enabled]);

  const boxPadding = useMemo(() => {
    if (screens.xl) return "24px 128px";
    if (screens.lg) return "24px 12px";
    if (screens.sm) return "24px 0px";
    return "24px 0px";
  }, [screens.lg, screens.sm, screens.xl]);

  return (
    <BaseLayout>
      <BaseLayout.Content className="container">
        <Box p={boxPadding}>
          <form id="crate-item" onSubmit={handleSubmit(onSubmit)}>
            <Row gutter={[{ xs: 8, sm: 16, md: 24, lg: 48 }, 24]}>
              <Col
                span={screens.md ? 8 : 24}
                style={{ textAlign: "-webkit-center" } as any}
              >
                <Box maxWidth={260}>{widgetPreviewCard}</Box>
              </Col>
              <Col span={screens.md ? 16 : 24}>
                {widgetUploadImageForm}
                {widgetNameForm}
                {widgetDescriptionForm}
                {widgetActions}
              </Col>
            </Row>
          </form>
        </Box>
      </BaseLayout.Content>
    </BaseLayout>
  );
};

const ItemCreatePageWrapper = () => {
  return (
    <PrivateRoute>
      <ItemCreatePage />
    </PrivateRoute>
  );
};

export default ItemCreatePageWrapper;
