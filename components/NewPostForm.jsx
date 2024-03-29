import { useForm, FormProvider, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useCallback } from 'react';
import { Button, capitalize, Stack, Typography } from '@mui/material';
import TextFieldController from './TextFieldController';
import PropType from 'prop-types';
import SentimentPicker from './SentimentPicker';

const FormValidationSchema = yup.object().shape({
  title: yup.string().required(),
  content: yup.string().required(),
  sentiment: yup.string(),
});

const NewPostForm = ({ defaultValues, onPost, onCancel }) => {
  const formMethods = useForm({
    mode: 'onChange',
    resolver: yupResolver(FormValidationSchema),
    defaultValues,
  });

  const {
    control,
    handleSubmit,
    formState: { errors, isDirty, isValid, isSubmitting },
  } = formMethods;

  const handleFormSubmit = useCallback(
    async (data) => {
      await onPost(data);
    },
    [onPost]
  );

  return (
    <FormProvider {...formMethods}>
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        noValidate
        autoComplete="off">
        <Stack direction="column" gap={2}>
          <TextFieldController
            required
            name="title"
            label="Title"
            placeholder="Title..."
            error={!!errors && !!errors.title}
            helperText={capitalize(
              !!errors && !!errors.title ? errors.title.message : ''
            )}
          />

          <TextFieldController
            required
            name="content"
            label="Content"
            placeholder="Express yourself here..."
            multiline
            rows={6}
            error={!!errors && !!errors.content}
            helperText={capitalize(
              !!errors && !!errors.content ? errors.content.message : ''
            )}
          />

          <Stack direction="column" gap={1}>
            <Typography variant="subtitle1">How are you feeling?</Typography>
            <Controller
              name="sentiment"
              control={control}
              render={({ field: { onChange, ...fieldRest } }) => (
                <SentimentPicker
                  onChange={(event, newValue) => {
                    onChange(newValue);
                  }}
                  {...fieldRest}
                />
              )}
            />
          </Stack>

          <Stack direction="row" justifyContent="flex-end" gap={1}>
            <Button onClick={onCancel}>Cancel</Button>
            <Button
              variant="contained"
              disabled={!isDirty || !isValid || isSubmitting}
              type="submit">
              Post
            </Button>
          </Stack>
        </Stack>
      </form>
    </FormProvider>
  );
};

NewPostForm.propTypes = {
  defaultValues: PropType.object.isRequired,
  onPost: PropType.func.isRequired,
  onCancel: PropType.func.isRequired,
};

export default NewPostForm;
