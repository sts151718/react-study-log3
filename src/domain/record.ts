import type { StudyRecordRow } from "@/types/StudyRecord";

export class Record {
  public readonly id: string;
  public readonly title: string;
  public readonly time: number;

  constructor(id: string, title: string, time: number) {
    this.id = id;
    this.title = title;
    this.time = time;
  }

  public static fromRow(row: StudyRecordRow): Record {
    return new Record(row.id, row.title, row.time);
  }

  public toListItemText(): string {
    return `${this.title} ${this.time}時間`;
  }
}
