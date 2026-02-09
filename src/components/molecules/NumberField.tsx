import { Field, NumberInput } from "@chakra-ui/react";
import { memo, type FC } from "react";

type Props = {
  label: string;
  placeholder: string;
  min?: number;
  max?: number;
  w?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const NumberField: FC<Props> = memo((props) => {
  const {
    label,
    placeholder,
    min = 0,
    max = Infinity,
    w = "full",
    value,
    onChange,
  } = props;

  return (
    <Field.Root>
      <Field.Label>{label}</Field.Label>
      <NumberInput.Root w={w} min={min} max={max}>
        <NumberInput.Input
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
        <NumberInput.Control>
          <NumberInput.IncrementTrigger />
          <NumberInput.DecrementTrigger />
        </NumberInput.Control>
      </NumberInput.Root>
    </Field.Root>
  );
});
