import { Button } from "@chakra-ui/react";
import type { FC } from "react";

type Props = {
  onClick?: () => void;
  children: React.ReactNode;
};
export const SecondaryButton: FC<Props> = (props) => {
  const { onClick, children } = props;

  return (
    <Button colorPalette="gray" variant="subtle" onClick={onClick}>
      {children}
    </Button>
  );
};
