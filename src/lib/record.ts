import { Record } from "@/domain/record";
import { supabase } from "@/utils/supabase";

export const getAllRecords = async (): Promise<Array<Record>> => {
  const response = await supabase.from("study-record").select("*");

  if (response.error) {
    throw new Error(response.error.message);
  }

  const recordsData = response.data.map((record) => Record.fromObject(record));

  return recordsData;
};
