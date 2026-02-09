import type { Record } from "@/domain/record";
import { getAllRecords, insertRecord } from "@/lib/record";
import type { StudyForm } from "@/types/StudyForm";
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
    async (form: StudyForm) => {
      setIsLoading(true);
      const newRecord = await insertRecord({
        title: form.title,
        time: Number(form.time),
      } as Omit<Record, "id">);

      setRecords([...records, newRecord]);

      setIsLoading(false);
    },
    [records],
  );

  return { records, isLoading, getRecords, addRecord };
};
