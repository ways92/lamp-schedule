'use client';

import '@ant-design/v5-patch-for-react-19';
import { ConfigProvider } from 'antd';
import idID from 'antd/es/locale/id_ID';
import { useSchedule } from '@/hooks/useSchedule';
import FinishTable from '@/components/FinishTable';
import SkeletonLoading from '@/components/SkeletonLoading';
import { Suspense } from 'react';
import '@/config/dateConfig';
import Image from 'next/image';

export default function FinishPage()
{
  const {
    finishSchedule,
    editKey,
    editDate,
    loading,
    isPending,
    setEditDate,
    saveFinish,
    saveUnfinish,
    removeSchedule,
    startEdit,
    saveEdit,
    cancelEdit,
  } = useSchedule();

  if ( loading ) {
    return (
      <ConfigProvider locale={idID}>
        <SkeletonLoading />
      </ConfigProvider>
    );
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-200 via-gray-300 to-gray-100 text-black">
      <div className="absolute top-[-100px] right-[-100px] w-[250px] h-[250px] bg-gray-400 rounded-full shadow-[10px_10px_30px_rgba(0,0,0,0.3)]"></div>
      <div className="absolute top-[-40px] right-[-50px] w-[200px] h-[200px] flex items-center justify-center overflow-hidden">
        <div className="w-full h-full animate-[spin_30s_linear_infinite]">
          <Image
            priority
            src="/images/img-dragon.png"
            alt="Dragon"
            width={150}
            height={150}
            className="object-contain w-full h-full"
          />
        </div>
      </div>

      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-white opacity-30 blur-3xl rounded-full"></div>
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gray-400 opacity-30 blur-3xl rounded-full"></div>
      <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-gray-300 opacity-20 blur-3xl rounded-full"></div>
      
      <ConfigProvider locale={idID}>
        <Suspense fallback={<SkeletonLoading />}>
          <div className="p-2 max-w-7xl mx-auto pt-4">
            <h1 className="relative text-xl font-bold mb-2">Jadwal Lampu Naga Yang Selesai</h1>
            <FinishTable
              schedule={finishSchedule}
              onEdit={startEdit}
              onFinish={saveUnfinish}
              onDelete={removeSchedule}
              onSave={saveEdit}
              onCancel={cancelEdit}
              editKey={editKey}
              editDate={editDate}
              setEditDate={setEditDate}
              loading={isPending}
            />
          </div>
        </Suspense>
      </ConfigProvider>
    </div>
  );
}