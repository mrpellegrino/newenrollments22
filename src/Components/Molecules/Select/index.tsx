import React, { useEffect, useRef } from 'react';
import { IconType } from 'react-icons';
import { useField } from '@unform/core';
import {
  FormControl,
  FormLabel,
  Icon,
  InputGroup,
  InputLeftAddon,
  InputRightElement,
  Select as BaseSelect,
  SelectProps,
  Skeleton,
} from '@chakra-ui/react';

import InputError from 'Components/Atoms/InputError';

export interface ISelectOption {
  text: string;
  value: string;
}

interface IProps extends Omit<SelectProps, 'icon'> {
  name: string;
  label?: string;
  icon?: IconType;
  isLoading?: boolean;
  options: ISelectOption[];
}

const Select: React.FC<IProps> = ({
  name,
  label,
  icon,
  options,
  isLoading,
  ...rest
}) => {
  const { defaultValue, error, fieldName, registerField } = useField(name);

  const selectRef = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      path: 'value',
    });
  }, [registerField, fieldName]);

  return (
    <Skeleton isLoaded={!isLoading} w="100%">
      <FormControl>
        {label && <FormLabel mb="5px">{label}</FormLabel>}

        <InputGroup>
          {icon && (
            <InputLeftAddon>
              <Icon as={icon} boxSize="20px" />
            </InputLeftAddon>
          )}
          <BaseSelect
            name={name}
            ref={selectRef}
            colorScheme="blue"
            defaultValue={defaultValue}
            {...rest}
          >
            {options.map((option, i) => (
              <option key={i} value={option.value}>
                {option.text}
              </option>
            ))}
          </BaseSelect>

          {error && (
            <InputRightElement mr="25px">
              <InputError error={error} />
            </InputRightElement>
          )}
        </InputGroup>
      </FormControl>
    </Skeleton>
  );
};

export default Select;
