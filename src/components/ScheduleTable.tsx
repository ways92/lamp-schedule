'use client';

import { Table, Button, DatePicker } from 'antd';
import { CloseSquareFilled, EditFilled, SaveFilled, DeleteFilled } from '@ant-design/icons';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import idID from 'antd/es/locale/id_ID';
import { Schedule, ScheduleTableProps } from '@/types/schedule';
import { DATE_FORMAT } from '@/config/dateConfig';
import Image from "next/image";

// ✅ Tambahkan plugin UTC dan Timezone agar bisa konversi ke WIB
dayjs.extend(utc);
dayjs.extend(timezone);

export const ScheduleTable = ({
  schedule,
  onEdit,
  onDelete,
  onSave,
  onCancel,
  editKey,
  editDate,
  setEditDate,
  setErrorDateEdit,
  errorDateEdit,
  loading
}: ScheduleTableProps) => {
  const columns = [
    {
      title: 'Awal Hidup',
      dataIndex: 'startLive',
      key: 'startLive',
      render: (_: any, record: Schedule) =>
        editKey === record.id ? (
          <div>
            <DatePicker
              value={editDate ? dayjs(editDate).startOf('day').hour(12).utc() : null} // ✅ Pastikan tetap di WIB
              onChange={(date) => setEditDate(date ? date.startOf('day') : null)}
              onFocus={() => setErrorDateEdit('')}
              inputReadOnly={true}
              format={DATE_FORMAT}
              locale={idID.DatePicker}
              className="border w-full"
              disabled={loading}
            />
            {errorDateEdit && <div className="text-red-500 my-0.5 -mb-3 ms-1 text-sm">{errorDateEdit}</div>}
          </div>
        ) : (
          dayjs.utc(record.startLive).tz('Asia/Jakarta').format(DATE_FORMAT) // ✅ Tampilkan dalam WIB
        ),
    },
    {
      title: 'Akhir Hidup',
      dataIndex: 'endLive',
      key: 'endLive',
      render: (date: any) => dayjs.utc(date).tz('Asia/Jakarta').format(DATE_FORMAT), // ✅ Konversi ke WIB
    },
    {
      title: 'Awal Mati',
      dataIndex: 'startOff',
      key: 'startOff',
      render: (date: any) => dayjs.utc(date).tz('Asia/Jakarta').format(DATE_FORMAT), // ✅ Konversi ke WIB
    },
    {
      title: 'Akhir Mati',
      dataIndex: 'endOff',
      key: 'endOff',
      render: (date: any) => dayjs.utc(date).tz('Asia/Jakarta').format(DATE_FORMAT), // ✅ Konversi ke WIB
    },
    {
      title: 'Aksi',
      key: 'action',
      width: 115, 
      render: (_: any, record: Schedule) =>
        editKey === record.id ? (
          <div className='flex'>
            <Button 
              onClick={() => onSave(record.id, editDate!)} 
              type="primary" 
              className="mr-2"
              loading={loading}
            >
              {!loading && <SaveFilled className='text-xl -mx-2' />}
            </Button>
            <Button 
              onClick={onCancel} 
              danger
              disabled={loading}
            >
              {!loading && <CloseSquareFilled className='text-xl -mx-2' />}
            </Button>
          </div>
        ) : (
          <div className='flex'>
            <Button 
              onClick={() => onEdit(record)} 
              type="default" 
              className="mr-2"
              disabled={loading}
            >
              {!loading && <EditFilled className='text-xl -mx-2' />}
            </Button>
            <Button 
              danger 
              onClick={() => onDelete(record.id)}
              loading={loading}
            >
              {!loading && <DeleteFilled className='text-xl -mx-2' />}
            </Button>
          </div>
        ),
    },
  ];

  return (
    <Table
      className="mt-5"
      columns={columns}
      dataSource={schedule}
      pagination={false}
      rowKey="id"
      loading={loading}
      locale={{
        emptyText: (
          <div className="flex flex-col items-center justify-center">
            <Image
              src="/images/img-dragon.png"
              alt="No Data"
              width={150}
              height={150}
              className="object-contain"
            />
            <p>Data tidak tersedia</p>
          </div>
        ),
      }}
    />
  );
};

export default ScheduleTable;
