import { Controller, useFormContext } from 'react-hook-form';
import { useCallback } from 'react';
import { TextField } from '@mui/material';
import PropTypes from 'prop-types';

const TextFieldController = ({ name, ...textFieldProps }) => {
  const { control } = useFormContext();

  const render = useCallback(
    ({ field }) => {
      return (
        <TextField
          fullWidth
          InputLabelProps={{ shrink: true }}
          name={name}
          {...field}
          {...textFieldProps}
        />
      );
    },
    [name, textFieldProps]
  );

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={textFieldProps.defaultValue}
      render={render}
    />
  );
};

TextFieldController.propTypes = {
  name: PropTypes.string.isRequired,
};

export default TextFieldController;
