import type { Record } from "@/domain/record";
import { getAllRecords } from "@/lib/record";
import { useState } from "react";

export const useAllRecords = () => {
  const [records, setRecords] = useState<Record[]>([]);

  const getRecords = async () => {
    const recordsData = await getAllRecords();
    setRecords(recordsData);
  };

  return { records, getRecords };
};
