import { Field, Input } from "@chakra-ui/react";
import { memo, type FC } from "react";

type Props = {
  label: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const TextField: FC<Props> = memo((props) => {
  const { label, placeholder, value, onChange } = props;

  return (
    <Field.Root>
      <Field.Label>{label}</Field.Label>
      <Input placeholder={placeholder} value={value} onChange={onChange} />
    </Field.Root>
  );
});
