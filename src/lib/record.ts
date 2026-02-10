import { Record } from "@/domain/record";
import type { StudyRecordRow } from "@/types/StudyRecord";
import { supabase } from "@/utils/supabase";

export const getAllRecords = async (): Promise<Array<Record>> => {
  const response = await supabase.from("study-record").select("*");

  if (response.error) {
    throw new Error(response.error.message);
  }

  const studyRecordRows: StudyRecordRow[] = response.data;
  const recordsData = studyRecordRows.map((record) => Record.fromRow(record));

  return recordsData;
};

export const insertRecord = async (
  record: Omit<Record, "id">,
): Promise<Record> => {
  const response = await await supabase
    .from("study-record")
    .insert(record)
    .select();

  if (response.error) {
    throw new Error(response.error.message);
  }

  const insertedRow: StudyRecordRow = response.data[0];
  return Record.fromRow(insertedRow);
};

export const deleteRecordById = async (id: string): Promise<void> => {
  const response = await supabase.from("study-record").delete().eq("id", id);

  if (response.error) {
    throw new Error(response.error.message);
  }
};
