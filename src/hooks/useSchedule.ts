"use client";

import { useState, useTransition, useEffect } from "react";
import dayjs, { Dayjs } from "dayjs";
import { Schedule } from "@/types/schedule";
import { getSchedules, addSchedule, deleteSchedule, updateSchedule, changeFinish, changeUnfinish, getFinishSchedules } from "../actions/schedule-actions";

export const useSchedule = () => {
  const [schedule, setSchedule] = useState<Schedule[]>([]);
  const [finishSchedule, setFinishSchedule] = useState<Schedule[]>([]);
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
        } ) );
        setSchedule(formattedSchedules);
        
        const finishSchedules = await getFinishSchedules();
        const formattedFinishSchedules = finishSchedules.map((schedule) => ({
          ...schedule,
          startLive: dayjs(schedule.startLive),
          endLive: dayjs(schedule.endLive),
          startOff: dayjs(schedule.startOff),
          endOff: dayjs(schedule.endOff),
          createdAt: dayjs(schedule.createdAt),
          updatedAt: dayjs(schedule.updatedAt),
        }));
        setFinishSchedule(formattedFinishSchedules);
      } catch (error) {
        console.error("Error fetching schedules:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchFinishSchedules = async () => {
      setLoading( true );
      
      try {
        const finishSchedules = await getFinishSchedules();
        const formattedFinishSchedules = finishSchedules.map((schedule) => ({
          ...schedule,
          startLive: dayjs(schedule.startLive),
          endLive: dayjs(schedule.endLive),
          startOff: dayjs(schedule.startOff),
          endOff: dayjs(schedule.endOff),
          createdAt: dayjs(schedule.createdAt),
          updatedAt: dayjs(schedule.updatedAt),
        }));
        setFinishSchedule(formattedFinishSchedules);
      } catch (error) {
        console.error("Error fetching finish schedules:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchFinishSchedules()

    fetchSchedules();
  }, []);
  
  const fetchAllSchedules = async () => {
    startTransition( async () => { 
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
    })
  }

  const fetchFinishSchedules = async () => {
    startTransition( async () => { 
      const data = await getFinishSchedules();
      const formattedData = data.map((schedule) => ({
        ...schedule,
         startLive: dayjs(schedule.startLive),
        endLive: dayjs(schedule.endLive),
        startOff: dayjs(schedule.startOff),
        endOff: dayjs(schedule.endOff),
        createdAt: dayjs(schedule.createdAt),
        updatedAt: dayjs(schedule.updatedAt),
      }));
      
      setFinishSchedule(formattedData);
    })
  }

  const addNewSchedule = async (startLive: Dayjs) => {
    if ( !startLive ) return;
    
    startTransition(async () => {
      await addSchedule(startLive.toISOString());
      await fetchAllSchedules()
    });
  };

  const removeSchedule = async (id: string) => {
    startTransition(async () => {
      await deleteSchedule( id );
      await fetchFinishSchedules()
      await fetchAllSchedules()
    });
  };

  const startEdit = (record: Schedule) => {
    setEditKey(record.id);
    setEditDate(dayjs(record.startLive));
  };

  const saveEdit = async (id: string, newStartLive: Dayjs) => {

    startTransition(async () => {
      await updateSchedule(id, newStartLive.toISOString());
      await fetchFinishSchedules()
      await fetchAllSchedules()

      setEditKey(null);
      setEditDate(null);
      setErrorDateEdit("");
    });
  };


  const saveFinish = async (id :string) => { 
    startTransition( async () => { 
      await changeFinish( id )
      await fetchFinishSchedules()
      await fetchAllSchedules()
    })
  }

  const saveUnfinish = async (id : string) => { 
    await changeUnfinish( id )
      await fetchFinishSchedules()
      await fetchAllSchedules()
  }

  const cancelEdit = () => {
    setEditKey(null);
    setEditDate(null);
    setErrorDateEdit("");
  };

  return {
    schedule,
    finishSchedule,
    editKey,
    editDate,
    errorDateEdit,
    loading,
    isPending,
    setErrorDateEdit,
    setEditDate,
    addNewSchedule,
    saveFinish,
    saveUnfinish,
    removeSchedule,
    startEdit,
    saveEdit,
    cancelEdit,
  };
};
