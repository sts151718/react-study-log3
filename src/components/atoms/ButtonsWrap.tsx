import { Flex } from "@chakra-ui/react";
import type { FC } from "react";

type Props = {
  children: React.ReactNode;
  justifyContent?: string;
  gap?: string;
};
export const ButtonsWrap: FC<Props> = (props) => {
  const { children, justifyContent = "center", gap = "4" } = props;

  return (
    <Flex justifyContent={justifyContent} alignItems="center" gap={gap}>
      {children}
    </Flex>
  );
};
