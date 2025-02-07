'use client';

import { useState } from 'react';
import { DatePicker, Button } from 'antd';
import { FileAddTwoTone } from '@ant-design/icons';
import dayjs, { Dayjs } from 'dayjs';
import idID from 'antd/es/locale/id_ID';
import { ScheduleFormProps } from '@/types/schedule';
import { DATE_FORMAT } from '@/config/dateConfig';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import moment from 'moment';
dayjs.extend(utc);
dayjs.extend(timezone);

export const ScheduleForm = ({ addSchedule, loading }: ScheduleFormProps) => {
  const [newDate, setNewDate] = useState<Dayjs | null>(null);
  const [errorDate, setErrorDate] = useState('');


  const handleAddSchedule = () => {
  if (!newDate) {
    setErrorDate('Tanggal harus diisi');
    return;
  }

  // Pastikan newDate bertipe Dayjs
  const selectedDate: Dayjs = dayjs(newDate).startOf('day');

  // Konversi ke UTC tetapi tetapkan waktu ke tengah hari untuk menghindari pergeseran
  const utcDate: Dayjs = selectedDate.hour(12).utc();

  console.log('Frontend newDate (WIB):', selectedDate.format()); // Debug
  console.log('Frontend UTC Date:', utcDate.format()); // Debug

  addSchedule(utcDate); // Kirim sebagai Day.js agar backend tetap membaca dengan benar
  setNewDate(null);
  setErrorDate('');
};




  return (
    <div className='flex justify-between -mb-4'>
      <div className='w-full me-2'>
        <DatePicker
          value={newDate}
          onChange={(date) => setNewDate(date)}
          onFocus={() => setErrorDate('')}
          inputReadOnly={true}
          format={DATE_FORMAT}
          locale={idID.DatePicker}
          className="border p-2 w-full"
          placeholder="Pilih tanggal awal"
          disabled={loading}
          />
        {errorDate && <div className="text-red-500 my-0.5 ms-1 text-sm">{errorDate}</div>}
      </div>
      <Button 
        onClick={handleAddSchedule} 
        className="h-10" 
        type="primary"
        loading={loading}
      >
        {!loading && <FileAddTwoTone className='text-xl' />}
      </Button>
    </div>
  );
};

export default ScheduleForm;