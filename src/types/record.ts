import type { Database } from "./api/supabase";

export type StudyRecordRow =
  Database["public"]["Tables"]["study-record"]["Row"];
