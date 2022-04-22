import React, { useMemo } from "react";
import { Controller, ValidationRule } from "react-hook-form";

import { Box, Text, Input } from "../";

const InputForm = ({
  label,
  name,
  control,
  errors,
  rules,
  type,
  disabled,
  ...rest
}: any) => {
  const widgetErrors = useMemo(() => {
    if (errors && errors[name]) {
      return (
        <Box mt="8px" color="red">
          *{errors[name]["message"]}
        </Box>
      );
    }
  }, [errors, name]);

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
              <Input {...field} {...rest} type={type} disabled={disabled} />
            );
          }}
        />
      </Box>
      {widgetErrors}
    </>
  );
};

export default InputForm;
