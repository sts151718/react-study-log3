import { Field, Input } from "@chakra-ui/react";
import { memo, type FC, type Ref } from "react";

type Props = {
  label: string;
  placeholder: string;
  name: string;
  inputRef: Ref<HTMLInputElement>;
  errorMessage?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
};

export const TextField: FC<Props> = memo((props) => {
  const {
    label,
    placeholder,
    name,
    inputRef,
    errorMessage = "",
    onChange,
    onBlur,
  } = props;

  return (
    <Field.Root invalid={!!errorMessage}>
      <Field.Label>{label}</Field.Label>
      <Input
        placeholder={placeholder}
        name={name}
        ref={inputRef}
        onChange={onChange}
        onBlur={onBlur}
      />
      <Field.ErrorText>{errorMessage}</Field.ErrorText>
    </Field.Root>
  );
});
