import { Dayjs } from "dayjs";

export type Schedule = {
  id: string;
  startLive: Dayjs;
  endLive: Dayjs;
  startOff: Dayjs;
  endOff: Dayjs;
  createdAt: Dayjs;
  updatedAt: Dayjs;
};

export interface ScheduleFormProps {
  addSchedule: (date: Dayjs) => void;
  loading: boolean;
}

export interface ScheduleTableProps {
  schedule: Schedule[];
  onEdit: (record: Schedule) => void;
  onDelete: (key: string) => void;
  onFinish: (key: string) => void;
  onSave: (key: string, date: Dayjs) => void;
  onCancel: () => void;
  editKey: string | null;
  editDate: Dayjs | null;
  setEditDate: (date: Dayjs | null) => void;
  loading: boolean;
}