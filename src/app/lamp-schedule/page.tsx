'use client';

import '@ant-design/v5-patch-for-react-19';
import { ConfigProvider } from 'antd';
import idID from 'antd/es/locale/id_ID';
import { useSchedule } from '@/hooks/useSchedule';
import ScheduleForm from '@/components/ScheduleForm';
import ScheduleTable from '@/components/ScheduleTable';
import SkeletonLoading from '@/components/SkeletonLoading';
import { Suspense, useEffect, useState } from 'react';
import '@/config/dateConfig';

export default function LampSchedule() {
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const {
    schedule,
    editKey,
    editDate,
    errorDateEdit,
    loading,
    setErrorDateEdit,
    setEditDate,
    addNewSchedule,
    removeSchedule,
    startEdit,
    saveEdit,
    cancelEdit,
  } = useSchedule();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitialLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isInitialLoading) {
    return (
      <ConfigProvider locale={idID}>
        <SkeletonLoading />
      </ConfigProvider>
    );
  }

  return (
    <ConfigProvider locale={idID}>
      <Suspense fallback={<SkeletonLoading />}>
        <div className="p-2 max-w-5xl mx-auto pt-4">
          <h1 className="text-xl font-bold mb-2">Jadwal Lampu Naga</h1>
          <ScheduleForm addSchedule={addNewSchedule} loading={loading} />
          <ScheduleTable
            schedule={schedule}
            onEdit={startEdit}
            onDelete={removeSchedule}
            onSave={saveEdit}
            onCancel={cancelEdit}
            editKey={editKey}
            editDate={editDate}
            setEditDate={setEditDate}
            setErrorDateEdit={setErrorDateEdit}
            errorDateEdit={errorDateEdit}
            loading={loading}
          />
        </div>
      </Suspense>
    </ConfigProvider>
  );
}