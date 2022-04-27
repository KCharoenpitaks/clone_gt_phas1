import React, { useMemo, useState } from "react";
import { Controller } from "react-hook-form";
import { useMoralisFile } from "react-moralis";

import { Upload, Box, Text, Spin } from "components";
import { useCallback } from "react";

const UploadForm = ({
  label,
  name,
  control,
  errors,
  rules,
  onSuccess,
  customProps,
  ...rest
}: any) => {
  const { saveFile } = useMoralisFile();

  // States
  const [isUploading, setUploading] = useState(false);

  const widgetErrors = useMemo(() => {
    if (errors && errors[name]) {
      return (
        <Box mt="8px" color="red">
          *{errors[name]["message"]}
        </Box>
      );
    }
  }, [errors, name]);

  const customRequest = useCallback(
    async (options: { onSuccess: any; onError: any; file: any }) => {
      const { onSuccess, onError, file } = options;

      saveFile(file.name, file, {
        type: "file",
        saveIPFS: true,
        onSuccess: (result) => {
          console.log("save file success");
          onSuccess(result.ipfs());
        },
        onError: (error) => {
          console.log("save file errors");
          onError(error);
        },
      });
    },
    [saveFile]
  );

  const uploadProps = useMemo(() => {
    const defaultProps = {
      name: "file",
      accept: ".png,.jpg,.jpeg",
      customRequest: customRequest,
      multiple: false,
      action: "",
      maxCount: 1,
      showUploadList: false,
      onSuccess: (res: any) => {
        setUploading(false);
        if (onSuccess) {
          onSuccess(res);
        }
      },
      onChange: ({ file }: any) => {
        if (file.status === "uploading") {
          setUploading(true);
        }
      },
    };

    return {
      ...defaultProps,
      ...customProps,
      ...rest,
    };
  }, [customProps, customRequest, onSuccess, rest]);

  return (
    <>
      <Box fontSize="16px" fontWeight="bold">
        {label} {rules?.required && <Text color="red">*</Text>}
      </Box>
      <Box mt="8px">
        <Controller
          {...rest}
          name={name}
          rules={rules}
          control={control}
          render={({ field }) => {
            return (
              <Upload.Dragger {...uploadProps}>
                {isUploading ? (
                  <Box width="100%" size="large">
                    <Spin />
                  </Box>
                ) : (
                  <>
                    <p className="ant-upload-text">
                      Click or drag file to this area to upload
                    </p>
                    <p className="ant-upload-hint">
                      PNG, JPG, GIF, WEBP or MP4. Max 200mb.
                    </p>
                  </>
                )}
              </Upload.Dragger>
            );
          }}
        />
      </Box>
      {widgetErrors}
    </>
  );
};

export default UploadForm;
