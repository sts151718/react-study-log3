import type { Record } from "@/domain/record";
import { getAllRecords, insertRecord } from "@/lib/record";
import type { StudyForm } from "@/types/StudyForm";
import { useState } from "react";

export const useAllRecords = () => {
  const [records, setRecords] = useState<Array<Record>>([]);
  const [isLoading, setIsLoading] = useState(true);

  const getRecords = async () => {
    const recordsData = await getAllRecords();
    setRecords(recordsData);
    setIsLoading(false);
  };

  const addRecord = async (form: StudyForm) => {
    setIsLoading(true);
    const newRecord = await insertRecord({
      title: form.title,
      time: Number(form.time),
    } as Omit<Record, "id">);

    setRecords([...records, newRecord]);

    setIsLoading(false);
  };

  return { records, isLoading, getRecords, addRecord };
};
