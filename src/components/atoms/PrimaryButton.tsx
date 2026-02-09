import { Button } from "@chakra-ui/react";
import type { FC } from "react";

type Props = {
  onClick?: () => void;
  children: React.ReactNode;
};
export const PrimaryButton: FC<Props> = (props) => {
  const { onClick, children } = props;

  return (
    <Button colorPalette="blue" onClick={onClick}>
      {children}
    </Button>
  );
};
