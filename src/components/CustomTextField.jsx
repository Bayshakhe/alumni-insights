import { TextField, Typography } from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";

const CustomTextField = ({
  name,
  control,
  type,
  label,
  marginB,
  jobStatus,
  defaultValues,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValues || ""}
      render={({ field, fieldState: { error } }) => (
        <>
          <TextField
            {...field}
            fullWidth
            type={type}
            required={jobStatus}
            variant="outlined"
            label={label}
            color="warning"
            error={!!error}
            helperText={error?.message}
            sx={{ marginBottom: marginB }}
          />
          {/* {
            error && <Typography variant="body2" color="error" align="left">{error?.message}ecrtvbyun</Typography>
          } */}
        </>
      )}
    />
  );
};

export default CustomTextField;
