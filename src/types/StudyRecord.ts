import type { Database } from "./api/Supabase";

export type StudyRecordRow =
  Database["public"]["Tables"]["study-record"]["Row"];
