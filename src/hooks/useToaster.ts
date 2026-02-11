import { toaster } from "@/components/ui/toaster";
import { useCallback } from "react";

type Props = {
  description: string;
  type: "success" | "error" | "loading" | "info";
};

export const useToaster = () => {
  const createToaster = useCallback((props: Props) => {
    const { description, type } = props;

    toaster.create({
      description,
      type,
      closable: true,
    });
  }, []);

  return { createToaster };
};
