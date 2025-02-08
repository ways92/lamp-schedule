'use client';

import { Table, Button, DatePicker, Form } from 'antd';
import { CloseSquareFilled, EditFilled, SaveFilled, DeleteFilled } from '@ant-design/icons';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import idID from 'antd/es/locale/id_ID';
import { Schedule, ScheduleTableProps } from '@/types/schedule';
import { DATE_FORMAT } from '@/config/dateConfig';
import Image from "next/image";
import { useEffect } from 'react';

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
  loading
}: ScheduleTableProps) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (editKey) {
      const currentRecord = schedule.find((item) => item.id === editKey);
      if (currentRecord) {
        setEditDate(dayjs(currentRecord.startLive));
        form.setFieldsValue({ date: dayjs(currentRecord.startLive) });
      }
    }
  }, [editKey, form, schedule]);

  const handleSave = async (id: string) => {
    try {
      await form.validateFields();
      onSave(id, editDate!);
    } catch (error) {
      return
    }
  };
    
  const columns = [
    {
      title: 'No',
      dataIndex: 'index',
      key: 'index',
      render: (_: any, __: any, index: number) => index + 1,
    },
    {
      title: 'Awal Hidup',
      dataIndex: 'startLive',
      key: 'startLive',
      render: (_: any, record: Schedule) =>
        editKey === record.id ? (
          <Form form={form}>
            <Form.Item
              name="date"
              rules={[{ type: "object" as const, required: true, message: "Tanggal harus diisi!" }]}
              validateTrigger={["onChange", "onBlur"]}
              className="mb-0"
            >
              <DatePicker
                value={editDate ?? dayjs(editDate).startOf("day").hour(12).utc()}
                onChange={(date) => setEditDate(date ? dayjs(date).startOf("day").hour(12).utc(): null)}
                inputReadOnly
                format={DATE_FORMAT}
                locale={idID.DatePicker}
                className="border w-full"
                disabled={loading}
              />
            </Form.Item>
          </Form>
        ) : (
          dayjs.utc(record.startLive).tz("Asia/Jakarta").format(DATE_FORMAT)
        ),
    },
    {
      title: 'Akhir Hidup',
      dataIndex: 'endLive',
      key: 'endLive',
      render: (date: any) => dayjs.utc(date).tz('Asia/Jakarta').format(DATE_FORMAT),
    },
    {
      title: 'Awal Mati',
      dataIndex: 'startOff',
      key: 'startOff',
      render: (date: any) => dayjs.utc(date).tz('Asia/Jakarta').format(DATE_FORMAT),
    },
    {
      title: 'Akhir Mati',
      dataIndex: 'endOff',
      key: 'endOff',
      render: (date: any) => dayjs.utc(date).tz('Asia/Jakarta').format(DATE_FORMAT),
    },
    {
      title: 'Aksi',
      key: 'action',
      width: 115, 
      render: (_: any, record: Schedule) =>
        editKey === record.id ? (
          <div className='flex'>
            <Button 
              onClick={() => handleSave( record.id )}
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
      scroll={{ x: 800 }}
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
