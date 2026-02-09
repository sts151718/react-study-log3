import { Button } from "@chakra-ui/react";
import type { FC } from "react";

type Props = {
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  children: React.ReactNode;
};
export const SecondaryButton: FC<Props> = (props) => {
  const { onClick, type = "button", children } = props;

  return (
    <Button colorPalette="gray" variant="subtle" onClick={onClick} type={type}>
      {children}
    </Button>
  );
};
