import React, { createContext, useContext, useCallback } from 'react';
import { ValidationError as YupValidationError } from 'yup';
import { useToast } from '@chakra-ui/react';

import IFormRef from 'Types/IFormRef';
import IObject from 'Types/IObject';

interface IErrorsContext {
  getValidationErrors(err: YupValidationError): Errors;
  handleErrors(title: string, err: IObject, formRef?: IFormRef): void;
}

interface Errors {
  [key: string]: string;
}

const ErrorsContext = createContext<IErrorsContext>({} as IErrorsContext);

export const ErrorsProvider: React.FC = ({ children }) => {
  const toast = useToast();

  const getValidationErrors = useCallback((err: YupValidationError): Errors => {
    const errors: Errors = {};

    err.inner.forEach(error => {
      if (!error.path) return;
      errors[error.path] = error.message;
    });

    return errors;
  }, []);

  const handleErrors = useCallback(
    (title: string, err: IObject, formRef?: IFormRef): void => {
      if (err instanceof YupValidationError && formRef) {
        const errors = getValidationErrors(err);
        formRef.current?.setErrors(errors);
        toast({
          title,
          description: 'Algumas informações do formulário estão inválidas!',
          status: 'error',
          duration: 5000,
          isClosable: true,
          position: 'top-right',
        });
        return;
      }

      if (!err.response) {
        toast({
          title: 'An unexpected error has ocurred',
          status: 'error',
          duration: 5000,
          isClosable: true,
          position: 'top-right',
        });
        return;
      }

      const e = err.response.data;
      let message = '';
      if (e.validation) {
        const celebrate = e.validation;
        if (celebrate.body) message = celebrate.body.message;
        else if (celebrate.query) message = celebrate.query.message;
        else if (celebrate.params) message = celebrate.params.message;
      } else {
        message = e.error;
      }

      toast({
        title,
        description: message,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
    },
    [toast, getValidationErrors],
  );

  return (
    <ErrorsContext.Provider value={{ getValidationErrors, handleErrors }}>
      {children}
    </ErrorsContext.Provider>
  );
};

export const useErrors = (): IErrorsContext => {
  const context = useContext(ErrorsContext);
  if (!context) {
    throw new Error('useErrors must be used within ErrorsProvider');
  }
  return context;
};

export default ErrorsProvider;
