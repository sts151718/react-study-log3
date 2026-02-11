import { Field, NumberInput } from "@chakra-ui/react";
import { memo, type FC, type Ref } from "react";

type Props = {
  label: string;
  placeholder: string;
  min?: number;
  max?: number;
  w?: string;
  defaultValue?: number;
  name: string;
  inputRef: Ref<HTMLInputElement>;
  errorMessage?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
};

export const NumberField: FC<Props> = memo((props) => {
  const {
    label,
    placeholder,
    min = 0,
    max = Infinity,
    w = "full",
    defaultValue = 0,
    name,
    inputRef,
    errorMessage = "",
    onChange,
    onBlur,
  } = props;

  return (
    <Field.Root invalid={!!errorMessage}>
      <Field.Label>{label}</Field.Label>
      <NumberInput.Root w={w} min={min} max={max}>
        <NumberInput.Input
          defaultValue={defaultValue}
          placeholder={placeholder}
          name={name}
          ref={inputRef}
          onChange={onChange}
          onBlur={onBlur}
        />
        <NumberInput.Control>
          <NumberInput.IncrementTrigger />
          <NumberInput.DecrementTrigger />
        </NumberInput.Control>
      </NumberInput.Root>
      <Field.ErrorText>{errorMessage}</Field.ErrorText>
    </Field.Root>
  );
});
