import { Button, type ButtonProps } from "@chakra-ui/react";
import type { FC } from "react";

type Props = {
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  children: React.ReactNode;
  buttonProps?: ButtonProps;
};
export const SecondaryButton: FC<Props> = (props) => {
  const { onClick, type = "button", children, buttonProps } = props;

  return (
    <Button
      colorPalette="gray"
      variant="subtle"
      onClick={onClick}
      type={type}
      {...buttonProps}
      focusRing="none"
    >
      {children}
    </Button>
  );
};
