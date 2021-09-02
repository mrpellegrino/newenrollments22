import React, { Ref } from 'react';
import { Form as BaseForm } from '@unform/web';
import { FormProps, FormHandles } from '@unform/core';
import { Box, Stack, StackProps } from '@chakra-ui/react';

type IStackForm = Omit<StackProps, 'onSubmit'> & Omit<FormProps, 'ref'>;

interface IProps extends IStackForm {
  ref?: Ref<FormHandles>;
}

const Form: React.FC<IProps> = React.forwardRef(
  ({ children, spacing, ...rest }, ref) => {
    return (
      <Box w="100%">
        <BaseForm ref={ref} {...rest}>
          <Stack spacing={spacing}>{children}</Stack>
        </BaseForm>
      </Box>
    );
  },
);

export default Form;
