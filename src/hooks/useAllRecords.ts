import type { Record } from "@/domain/record";
import { deleteRecordById, getAllRecords, insertRecord } from "@/lib/record";
import type { RecordInput } from "@/types/RecordInput";
import { useCallback, useState } from "react";

export const useAllRecords = () => {
  const [records, setRecords] = useState<Array<Record>>([]);
  const [isLoading, setIsLoading] = useState(true);

  const getRecords = useCallback(async () => {
    const recordsData = await getAllRecords();

    setRecords(recordsData);
    setIsLoading(false);
  }, []);

  const addRecord = useCallback(
    async (input: RecordInput) => {
      setIsLoading(true);
      const newRecord = await insertRecord(input);

      setRecords([...records, newRecord]);

      setIsLoading(false);
    },
    [records],
  );

  const deleteRecord = useCallback(
    async (id: string) => {
      await deleteRecordById(id);

      const newRecords = records.filter((record) => record.id !== id);
      setRecords(newRecords);
    },
    [records],
  );

  return {
    records,
    isLoading,
    getRecords,
    addRecord,
    deleteRecord,
  };
};
