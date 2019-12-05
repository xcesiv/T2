import React from 'react';
import styled from 'styled-components';
import { InputLabel, Input, FormControl, FormHelperText } from '@material-ui/core';
import NumberFormat from 'react-number-format';

const Container = styled(FormControl)`
  width: 100%;
  pointer-events: ${props => (props.disabled ? 'none' : 'auto')};
`;

const InputWrapper = styled(Input)<{ right: number | undefined }>`
  &&& {
    padding-right: ${({ right }) => right}px;
    font-weight: 300;
  }
`;

const LabelWrapper = styled(InputLabel)`
  &&& {
    &.Mui-focused {
      color: ${({ theme: { colors } }) => colors.gray3};
    }
    color: rgba(0, 0, 0, 0.38);
    font-size: 16px;
    font-weight: 300;
  }
`;

const ErrorText = styled(FormHelperText)`
  &&& {
    font-size: 12px;
    margin-top: 5px;
    line-height: 18px;
    height: 18px;
  }
}`;

interface Props1 {
  inputRef: () => void;
  onChange: (val: any) => void;
}

const NumberFormatCustom: React.ComponentType<any> = (props: Props1) => {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      type="text"
      getInputRef={inputRef}
      onValueChange={values => {
        onChange({
          target: {
            value: values.value
          }
        });
      }}
      thousandSeparator={true}
    />
  );
};

interface Props {
  label: string;
  type?: string;
  errorText?: string | React.ReactNode;
  disabled?: boolean;
  right?: number;
  value?: string;
  onChange: (val: string) => void;
}

function TextField(props: Props) {
  const { label, type, onChange, errorText, disabled, right, ...other } = props;
  return (
    <Container disabled={disabled}>
      <LabelWrapper htmlFor="custom-input">{label}</LabelWrapper>
      <InputWrapper
        id="custom-input"
        key={label}
        type={type}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => onChange(event.target.value)}
        error={!!errorText}
        disabled={disabled}
        right={right}
        inputComponent={type === 'number' ? NumberFormatCustom : 'input'}
        {...other}
      />

      <ErrorText component="div">{errorText}</ErrorText>
    </Container>
  );
}
TextField.defaultProps = {
  type: 'text',
  errorText: '',
  disabled: false,
  right: 0
};

export default TextField;
