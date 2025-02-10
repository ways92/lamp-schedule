'use client';

import { Table, Button, DatePicker, Form, Space } from 'antd';
import { CloseSquareFilled, EditFilled, SaveFilled, DeleteFilled } from '@ant-design/icons';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import idID from 'antd/es/locale/id_ID';
import { Schedule, ScheduleTableProps } from '@/types/schedule';
import { DATE_FORMAT } from '@/config/dateConfig';
import Image from "next/image";
import { useEffect } from 'react';
import ColumnGroup from 'antd/es/table/ColumnGroup';
import Column from 'antd/es/table/Column';
import { alignCenterFormat } from '@/utils/ComponentUtils';

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
      return;
    }
  }; 

  return (
    <Table
      className="mt-5"
      size="small"
      dataSource={schedule}
      pagination={false}
      rowKey="id"
      loading={loading}
      scroll={{ x: 1200 }}
      bordered
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
    >
      <Column align="center" title="No" dataIndex="index" key="index" render={(_, __, index) => index + 1} />
      
      <ColumnGroup title="Hidup (20 Hari)">
        <Column title={alignCenterFormat( "Awal" )} dataIndex="startLive" key="startLive" render={(_, record: Schedule) =>
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
                  onChange={(date) => setEditDate(date ? dayjs(date).startOf("day").hour(12).utc() : null)}
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
          )
        } />
        <Column title={alignCenterFormat( "Ujung" )} dataIndex="endLive" key="endLive" render={(date) => dayjs.utc(date).tz("Asia/Jakarta").format(DATE_FORMAT)} />
      </ColumnGroup>
      
      <ColumnGroup title="Istirahat (10 Hari)">
        <Column title={alignCenterFormat( "Awal" )} dataIndex="startOff" key="startOff" render={(date) => dayjs.utc(date).tz("Asia/Jakarta").format(DATE_FORMAT)} />
        <Column title={alignCenterFormat( "Ujung" )} dataIndex="endOff" key="endOff" render={(date) => dayjs.utc(date).tz("Asia/Jakarta").format(DATE_FORMAT)} />
      </ColumnGroup>

      <ColumnGroup title="Perkiraan Panen (50-55 Hari)">
        <Column title={alignCenterFormat( "Awal" )} dataIndex="endOff" key="endOff" render={(date) => dayjs.utc(date).tz("Asia/Jakarta").add(50, "days").format(DATE_FORMAT)} />
        <Column title={alignCenterFormat( "Ujung" )}  dataIndex="endOff" key="endOff" render={( date ) => dayjs.utc( date ).tz( "Asia/Jakarta" ).add( 55, "days" ).format( DATE_FORMAT )} />
      </ColumnGroup>
      
      <Column
        align="center"
        title="Aksi"
        key="action"
        width={95}
        render={(_, record: Schedule) =>
          editKey === record.id ? (
            <Space>
              <Button onClick={() => handleSave(record.id)} type="primary" loading={loading}>
                {!loading && <SaveFilled className='text-xl -mx-2' />}
              </Button>
              <Button onClick={onCancel} danger disabled={loading}>
                {!loading && <CloseSquareFilled className='text-xl -mx-2' />}
              </Button>
            </Space>
          ) : (
            <Space>
              <Button onClick={() => onEdit(record)} type="default" disabled={loading}>
                {!loading && <EditFilled className='text-xl -mx-2' />}
              </Button>
              <Button danger onClick={() => onDelete(record.id)} loading={loading}>
                {!loading && <DeleteFilled className='text-xl -mx-2' />}
              </Button>
            </Space>
          )
        }
      />
    </Table>
  );
};

export default ScheduleTable;
