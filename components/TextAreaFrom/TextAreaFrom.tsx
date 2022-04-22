import React from "react";
import { Controller } from "react-hook-form";

import { Box, Input } from "../";

const TextArea = ({
  label,
  name,
  rules,
  control,
  errors,
  disabled,
  ...rest
}: any) => {
  return (
    <>
      <Box style={{ fontSize: "16px", fontWeight: "bold" }}>{label}</Box>
      <Box mt="8px">
        <Controller
          {...rest}
          name={name}
          rules={rules}
          control={control}
          render={({ field }) => {
            return <Input.TextArea {...field} {...rest} disabled={disabled} />;
          }}
        />
      </Box>
    </>
  );
};

export default TextArea;
