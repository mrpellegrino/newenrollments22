import React, { useCallback, useEffect, useState } from 'react';
import { useField } from '@unform/core';
import {
  FormControl,
  FormLabel,
  InputGroup,
  Radio as BaseRadio,
  InputRightElement,
  RadioGroup,
  RadioGroupProps,
  Stack,
} from '@chakra-ui/react';

import InputError from 'Components/Atoms/InputError';

export interface IRadioOption {
  text: string;
  value: string;
}

interface IProps extends Omit<RadioGroupProps, 'children'> {
  name: string;
  label?: string;
  options: IRadioOption[];
}

const Radio: React.FC<IProps> = ({
  name,
  label,
  options,
  onChange,
  ...rest
}) => {
  const { defaultValue, error, fieldName, registerField } = useField(name);

  const [value, setValue] = useState('');

  const handleChange = useCallback(
    (nextValue: string) => {
      if (onChange) onChange(nextValue);
      setValue(nextValue);
    },
    [onChange],
  );

  useEffect(() => {
    registerField({
      name: fieldName,
      getValue() {
        return value;
      },
      setValue(_: HTMLInputElement, newValue: string) {
        setValue(newValue);
      },
    });
  }, [registerField, fieldName, value]);

  useEffect(() => {
    if (typeof defaultValue === 'boolean' || defaultValue) {
      setValue(defaultValue.toString());
    }
  }, [defaultValue]);

  return (
    <FormControl>
      {label && <FormLabel mb="5px">{label}</FormLabel>}

      <InputGroup>
        <RadioGroup
          name={name}
          colorScheme="blue"
          value={value}
          onChange={nextValue => handleChange(nextValue)}
          {...rest}
        >
          <Stack direction="row">
            {options.map((option, i) => (
              <BaseRadio isInvalid={!!error} key={i} value={option.value}>
                {option.text}
              </BaseRadio>
            ))}
          </Stack>
        </RadioGroup>

        {error && (
          <InputRightElement mr="25px">
            <InputError error={error} />
          </InputRightElement>
        )}
      </InputGroup>
    </FormControl>
  );
};

export default Radio;
