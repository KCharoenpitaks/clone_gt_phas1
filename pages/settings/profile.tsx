import { PrivateRoute } from "components";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useMoralisFile, ValidFileInput } from "react-moralis";
import styled from "styled-components";
import Image from "next/image";
import {
  BaseLayout,
  Col,
  Row,
  Box,
  TextAreaFrom,
  InputForm,
  Button,
  Card,
  Upload,
  NoImageBox,
  Spin,
  Notification,
  Avatar,
} from "components";
import { convertLegacyProps } from "antd/lib/button/button";
import { useProfileSetting } from "utils/hooks/moralis";
import { Grid } from "antd";

const UploadWrapper = styled.div`
  .ant-upload {
    width: 100%;
  }
`;

const SettingProfile = () => {
  const { profile, setProfile } = useProfileSetting();
  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();

  const { saveFile } = useMoralisFile();

  const [isAvatarUploading, setAvatarUploading] = useState(false);
  const [isCoverHover, setCoverHovering] = useState(false);
  const [isCoverUploading, setCoverUploading] = useState(false);

  const { control, errors, watch, reset, setValue, handleSubmit } = useForm({
    defaultValues: {
      avatar: null,
      cover: null,
      display_name: null,
      bio: null,
    },
  });

  const { avatar, cover } = watch();

  const onSubmit = (data: any) => {
    setProfile(data).then((result: any) => {
      Notification("success", "Updated Profile Completed");
    });
  };

  const uploadFileIPFS = useCallback(
    (file: ValidFileInput, onSuccess: (arg0: any) => void, onError: any) => {
      saveFile((file as any).name, file, {
        type: "file",
        saveIPFS: true,
        onSuccess: (result) => onSuccess((result as any).ipfs()),
        onError: onError,
      });
    },
    [saveFile]
  );

  const widgetUploadAvatarImage = useMemo(() => {
    const props = {
      name: "avatar",
      accept: ".png,.jpg,.jpeg",
      customRequest: async (options: {
        onSuccess: any;
        onError: any;
        file: any;
      }) => {
        const { onSuccess, onError, file } = options;
        setAvatarUploading(true);
        uploadFileIPFS(file, onSuccess, onError);
      },
      multiple: false,
      action: "",
      maxCount: 1,
      showUploadList: false,
      onSuccess: (result: null) => {
        setAvatarUploading(false);
        setValue("avatar", result);
      },
      onError: (error: any) => {
        setAvatarUploading(false);
      },
    };

    const renderImage = () => {
      if (isAvatarUploading) {
        return (
          <Box width="100%" p="12px" textAlign="center">
            <Spin />
          </Box>
        );
      }

      if (avatar) {
        return (
          <Box display="flex" justifyContent="center" width="100%">
            <Avatar src={avatar} size={180} alt="avatar" shape="circle" />
          </Box>
        );
      }

      return (
        <Box width="100%">
          <NoImageBox width="1000px" />
        </Box>
      );
    };

    return (
      <Card style={{ textAlign: "center" }}>
        {renderImage()}
        <UploadWrapper>
          <Upload {...props} style={{ width: "100%" }}>
            <Button
              type="primary"
              shape="round"
              width="100%"
              mt="16px"
              maxWidth={240}
            >
              Upload New Photo
            </Button>
          </Upload>
        </UploadWrapper>
        <Button
          {...convertLegacyProps("danger")}
          shape="round"
          width="100%"
          mt="16px"
          maxWidth={240}
          onClick={() => setValue("avatar", null)}
        >
          Delete
        </Button>
      </Card>
    );
  }, [avatar, isAvatarUploading, setValue, uploadFileIPFS]);

  const widgetUploadCoverImage = useMemo(() => {
    const props = {
      name: "cover",
      accept: ".png,.jpg,.jpeg",
      customRequest: async (options: {
        onSuccess: any;
        onError: any;
        file: any;
      }) => {
        const { onSuccess, onError, file } = options;
        setCoverUploading(true);
        uploadFileIPFS(file, onSuccess, onError);
      },
      multiple: false,
      action: "",
      maxCount: 1,
      showUploadList: false,
      onSuccess: (result: null) => {
        setCoverUploading(false);
        setValue("cover", result);
      },
      onError: (error: any) => {
        setCoverUploading(false);
      },
    };

    const renderImage = () => {
      if (isCoverUploading) {
        return (
          <Box width="100%" p="12px" textAlign="center">
            <Spin />
          </Box>
        );
      }

      if (cover) {
        return (
          <Box
            onMouseEnter={() => setCoverHovering(true)}
            onMouseLeave={() => setCoverHovering(false)}
            style={{ position: "relative" }}
          >
            {isCoverHover && (
              <Box
                bg="rgb(225,232,237, 0.7)"
                display="flex"
                alignItems="center"
                justifyContent="center"
                style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  left: 0,
                  bottom: 0,
                }}
              >
                <Button
                  {...convertLegacyProps("danger")}
                  onClick={() => {
                    setValue("cover", null);
                    setCoverHovering(false);
                  }}
                >
                  Delete
                </Button>
              </Box>
            )}
            <Image
              src={cover}
              alt="cover"
              width="500px"
              height="500px"
              style={{
                borderRadius: "4px",
                cursor: "pointer",
              }}
            />
          </Box>
        );
      }
    };

    return (
      <Box>
        <Box fontSize="16px" fontWeight="bold">
          Upload Your Cover Image
        </Box>
        <Box mt="8px">
          {renderImage()}
          {!isCoverUploading && !cover && (
            <Upload.Dragger {...props}>
              <>
                <p className="ant-upload-text">
                  Click or drag file to this area to upload
                </p>
                <p className="ant-upload-hint">
                  PNG, JPG, GIF, WEBP or MP4. Max 200mb.
                </p>
              </>
            </Upload.Dragger>
          )}
        </Box>
      </Box>
    );
  }, [cover, isCoverHover, isCoverUploading, setValue, uploadFileIPFS]);

  const widgetNameForm = useMemo(() => {
    return (
      <Box mt="16px">
        <InputForm
          name="display_name"
          label="Display name"
          maxCount={50}
          control={control}
          errors={errors}
        />
      </Box>
    );
  }, [control, errors]);

  const widgetBioForm = useMemo(() => {
    return (
      <Box mt="16px">
        <TextAreaFrom
          name="bio"
          label="Tell me about you (bio)"
          rules={{}}
          rows="5"
          control={control}
          errors={errors}
        />
      </Box>
    );
  }, [control, errors]);

  useEffect(() => {
    if (profile) {
      reset({ ...profile });
    }
  }, [profile, reset]);

  const span = useMemo(() => {
    if (screens.md) return 8;
    return 24;
  }, [screens.md]);

  const offset = useMemo(() => {
    if (screens.md) return 2;
    return 0;
  }, [screens.md]);

  return (
    <BaseLayout>
      <BaseLayout.Content className={"container"}>
        <form id="update-profile-form" onSubmit={handleSubmit(onSubmit)}>
          <Box pt="48px" pb="24px">
            <Row gutter={[8, 8]}>
              <Col span={span}>{widgetUploadAvatarImage}</Col>
              <Col span={span === 8 ? span + 4 : span} offset={offset}>
                {widgetUploadCoverImage}
                {widgetNameForm}
                {widgetBioForm}
                <Box mt="32px" textAlign="end">
                  <Button type="primary" htmlType="submit">
                    Update Profile
                  </Button>
                </Box>
              </Col>
            </Row>
          </Box>
        </form>
      </BaseLayout.Content>
    </BaseLayout>
  );
};

const SettingProfileWrapper = () => {
  return (
    <PrivateRoute>
      <SettingProfile />
    </PrivateRoute>
  );
};

export default SettingProfileWrapper;
