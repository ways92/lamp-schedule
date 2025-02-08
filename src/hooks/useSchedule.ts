"use client";

import { useState, useTransition, useEffect } from "react";
import dayjs, { Dayjs } from "dayjs";
import { Schedule } from "@/types/schedule";
import { getSchedules, addSchedule, deleteSchedule, updateSchedule } from "../schedule/actions";

export const useSchedule = () => {
  const [schedule, setSchedule] = useState<Schedule[]>([]);
  const [editKey, setEditKey] = useState<string | null>(null);
  const [editDate, setEditDate] = useState<Dayjs | null>(null);
  const [errorDateEdit, setErrorDateEdit] = useState("");
  const [isPending, startTransition] = useTransition();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSchedules = async () => {
      setLoading( true );
      
      try {
        const schedules = await getSchedules();
        
        const formattedSchedules = schedules.map((schedule) => ({
          ...schedule,
          startLive: dayjs(schedule.startLive),
          endLive: dayjs(schedule.endLive),
          startOff: dayjs(schedule.startOff),
          endOff: dayjs(schedule.endOff),
          createdAt: dayjs(schedule.createdAt),
          updatedAt: dayjs(schedule.updatedAt),
        }));

        setSchedule(formattedSchedules);
      } catch (error) {
        console.error("Error fetching schedules:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSchedules();
  }, []);

  const addNewSchedule = async (startLive: Dayjs) => {
    if ( !startLive ) return;
    
    startTransition(async () => {
      await addSchedule(startLive.toISOString());
      const data = await getSchedules();

      const formattedData = data.map((schedule) => ({
        ...schedule,
        startLive: dayjs(schedule.startLive),
        endLive: dayjs(schedule.endLive),
        startOff: dayjs(schedule.startOff),
        endOff: dayjs(schedule.endOff),
        createdAt: dayjs(schedule.createdAt),
        updatedAt: dayjs(schedule.updatedAt),
      }));

      setSchedule(formattedData);
    });
  };

  const removeSchedule = async (id: string) => {
    startTransition(async () => {
      await deleteSchedule(id);
      const data = await getSchedules();

      const formattedData = data.map((schedule) => ({
        ...schedule,
        startLive: dayjs(schedule.startLive),
        endLive: dayjs(schedule.endLive),
        startOff: dayjs(schedule.startOff),
        endOff: dayjs(schedule.endOff),
        createdAt: dayjs(schedule.createdAt),
        updatedAt: dayjs(schedule.updatedAt),
      }));

      setSchedule(formattedData);
    });
  };

  const startEdit = (record: Schedule) => {
    setEditKey(record.id);
    setEditDate(dayjs(record.startLive));
  };

  const saveEdit = async (id: string, newStartLive: Dayjs) => {
    if (!newStartLive) {
      setErrorDateEdit("Tanggal harus diisi");
      return;
    }

    startTransition(async () => {
      await updateSchedule(id, newStartLive.toISOString());
      const data = await getSchedules();

      const formattedData = data.map((schedule) => ({
        ...schedule,
        startLive: dayjs(schedule.startLive),
        endLive: dayjs(schedule.endLive),
        startOff: dayjs(schedule.startOff),
        endOff: dayjs(schedule.endOff),
        createdAt: dayjs(schedule.createdAt),
        updatedAt: dayjs(schedule.updatedAt),
      }));

      setSchedule(formattedData);
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
    schedule,
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
  };
};
