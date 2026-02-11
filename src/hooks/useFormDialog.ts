import { useCallback, useState } from "react";
import { useSelectedRecord } from "./useSelectedRecord";
import type { Record } from "@/domain/record";

type Props = {
  records: Array<Record>;
};

export const useFormDialog = (props: Props) => {
  const { records } = props;

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const { selectedRecord, selectRecord, clearSelectedRecord } =
    useSelectedRecord();

  const openDialog = useCallback(
    (isEdit: boolean, id: string = "") => {
      setIsEdit(isEdit);

      if (isEdit) {
        selectRecord(records, id);
      } else {
        clearSelectedRecord();
      }

      setIsDialogOpen(true);
    },
    [records, selectRecord, clearSelectedRecord],
  );

  const closeDialog = useCallback(() => {
    setIsDialogOpen(false);
  }, []);

  const openEditDialog = (id: string) => {
    openDialog(true, id);
  };
  const openAddDialog = () => {
    openDialog(false);
  };

  return {
    isDialogOpen,
    isEdit,
    selectedRecord,
    openDialog,
    openEditDialog,
    openAddDialog,
    closeDialog,
  };
};
