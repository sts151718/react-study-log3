export class Record {
  public id: string;
  public title: string;
  public time: number;

  constructor(id: string, title: string, time: number) {
    this.id = id;
    this.title = title;
    this.time = time;
  }

  public static fromObject(init?: Partial<Record>): Record {
    return new Record(init?.id || "", init?.title || "", init?.time || 0);
  }

  public toListItemText(): string {
    return `${this.title} ${this.time}時間`;
  }
}
