"use client";
import { useState, useTransition, useEffect, useCallback } from "react";
import dayjs, { Dayjs } from "dayjs";
import { Schedule } from "@/types/schedule";
import { getSchedules, addSchedule, deleteSchedule, updateSchedule } from "../actions/schedule-actions";
import toast from "react-hot-toast";

export const useSchedule = () => {
  const [schedule, setSchedule] = useState<Schedule[]>([]); 
  const [editKey, setEditKey] = useState<string | null>(null);
  const [editDate, setEditDate] = useState<Dayjs | null>(null);
  const [errorDateEdit, setErrorDateEdit] = useState("");
  const [isPending, startTransition] = useTransition();
  const [loading, setLoading] = useState(true);
  const [searchYear, setSearchYear] = useState<number | null>(null);

  const fetchSchedules = useCallback(async (giveLoading: boolean) => {
    if (giveLoading) setLoading(true);

    try {
      const schedules = await getSchedules()

      const formattedSchedules = schedules.map((schedule) => ({
          ...schedule,
          startLive: dayjs(schedule.startLive),
          endLive: dayjs(schedule.endLive),
          startOff: dayjs(schedule.startOff),
          endOff: dayjs(schedule.endOff),
          createdAt: dayjs(schedule.createdAt),
          updatedAt: dayjs(schedule.updatedAt),
        } ) );
        setSchedule(formattedSchedules);
    } catch (error) {
      toast.error("Gagal memuat jadwal, silahkan coba lagi.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSchedules(true);
  }, [fetchSchedules]);

  const filterByYear = (scheduleList: Schedule[], year: number | null) => {
    if (!year) return scheduleList;
    return scheduleList.filter((schedule) => dayjs(schedule.startLive).year() === year);
  };

  const filteredSchedule = filterByYear(schedule, searchYear);

  const addNewSchedule = async (startLive: Dayjs) => {
    if (!startLive) return;

    startTransition(async () => {
      await addSchedule(startLive.toISOString());
      await fetchSchedules(false);
    });
  };

  const removeSchedule = async (id: string) => {
    startTransition(async () => {
      await deleteSchedule(id);
      await fetchSchedules(false);
    });
  };

  const startEdit = (record: Schedule) => {
    setEditKey(record.id);
    setEditDate(dayjs(record.startLive));
  };

  const saveEdit = async (id: string, newStartLive: Dayjs) => {
    startTransition(async () => {
      await updateSchedule(id, newStartLive.toISOString());
      await fetchSchedules(false);

      setEditKey(null);
      setEditDate(null);
      setErrorDateEdit("");
    });
  };

  const cancelEdit = () => {
    setEditKey(null);
    setEditDate(null);
    setErrorDateEdit("");
  };

  return {
    schedule: filteredSchedule,
    editKey,
    editDate,
    errorDateEdit,
    loading,
    isPending,
    setErrorDateEdit,
    setEditDate,
    addNewSchedule,
    removeSchedule,
    startEdit,
    saveEdit,
    cancelEdit,
    searchYear,
    setSearchYear,
  };
};
