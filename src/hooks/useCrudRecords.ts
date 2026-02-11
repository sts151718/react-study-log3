import type { Record } from "@/domain/record";
import {
  deleteRecordById,
  getAllRecords,
  insertRecord,
  updateRecordById,
} from "@/lib/record";
import type { RecordInput } from "@/types/RecordInput";
import { useCallback, useState } from "react";
import { useToaster } from "./useToaster";

export const useCrudRecords = () => {
  const [records, setRecords] = useState<Array<Record>>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { createToaster } = useToaster();

  const getRecords = useCallback(async () => {
    try {
      const recordsData = await getAllRecords();

      setRecords(recordsData);
      setIsLoading(false);

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      createToaster({
        type: "error",
        description: "学習記録の取得に失敗しました。",
      });
    }
  }, [createToaster]);

  const addRecord = useCallback(
    async (input: RecordInput) => {
      try {
        const newRecord = await insertRecord(input);

        setRecords([...records, newRecord]);
        createToaster({ type: "success", description: "登録に成功しました。" });

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        createToaster({ type: "error", description: "登録に失敗しました。" });
      }
    },
    [records, createToaster],
  );

  const updateRecord = useCallback(
    async (id: string, input: RecordInput) => {
      try {
        const newRecord = await updateRecordById(id, input);
        const updateRecordIndex = records.findIndex(
          (record) => record.id === id,
        );
        const newRecords = records.toSpliced(updateRecordIndex, 1, newRecord);

        setRecords(newRecords);
        createToaster({ type: "success", description: "更新に成功しました。" });

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        createToaster({ type: "error", description: "更新に失敗しました。" });
      }
    },
    [records, createToaster],
  );

  const deleteRecord = useCallback(
    async (id: string) => {
      try {
        await deleteRecordById(id);

        const newRecords = records.filter((record) => record.id !== id);
        setRecords(newRecords);

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        createToaster({ type: "error", description: "削除に失敗しました。" });
      }
    },
    [records, createToaster],
  );

  return {
    records,
    isLoading,
    getRecords,
    addRecord,
    updateRecord,
    deleteRecord,
  };
};
