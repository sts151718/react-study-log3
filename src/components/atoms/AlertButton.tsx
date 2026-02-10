import { Button, type ButtonProps } from "@chakra-ui/react";
import type { FC } from "react";

type Props = {
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  children: React.ReactNode;
  buttonProps?: ButtonProps;
};
export const AlertButton: FC<Props> = (props) => {
  const { onClick, type = "button", children, buttonProps } = props;

  return (
    <Button colorPalette="red" onClick={onClick} type={type} {...buttonProps}>
      {children}
    </Button>
  );
};
