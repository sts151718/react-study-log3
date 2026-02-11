import type { Record } from "@/domain/record";
import {
  deleteRecordById,
  getAllRecords,
  insertRecord,
  updateRecordById,
} from "@/lib/record";
import type { RecordInput } from "@/types/RecordInput";
import { useCallback, useState } from "react";

export const useCrudRecords = () => {
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

  const updateRecord = useCallback(
    async (id: string, input: RecordInput) => {
      const newRecord = await updateRecordById(id, input);
      const updateRecordIndex = records.findIndex((record) => record.id === id);
      const newRecords = records.toSpliced(updateRecordIndex, 1, newRecord);

      setRecords(newRecords);
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
    updateRecord,
    deleteRecord,
  };
};
