import { useState } from "react";
import type { Record } from "@/domain/record";

export const useSelectedRecord = () => {
  const [selectedRecord, setSelectedRecord] = useState<Record | null>(null);

  const selectRecord = (records: Record[], id: string) => {
    const record = records.find((record) => record.id === id) ?? null;

    setSelectedRecord(record);
  };

  const clearSelectedRecord = () => {
    setSelectedRecord(null);
  };

  return { selectedRecord, selectRecord, clearSelectedRecord };
};
