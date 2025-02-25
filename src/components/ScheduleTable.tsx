'use client';

import { Table, Button, DatePicker, Form, Space, Tabs, Tooltip } from 'antd';
import { CloseSquareFilled, EditFilled, SaveFilled, DeleteFilled } from '@ant-design/icons';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import idID from 'antd/es/locale/id_ID';
import { Schedule, ScheduleTableProps } from '@/types/schedule';
import { DATE_FORMAT } from '@/config/dateConfig';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import ColumnGroup from 'antd/es/table/ColumnGroup';
import Column from 'antd/es/table/Column';
import { alignCenterFormat } from '@/utils/ComponentUtils';
import toast from 'react-hot-toast';

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
  loading,
  resetFormError
}: ScheduleTableProps) => {
  const [form] = Form.useForm();
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const [selectedYear, setSelectedYear] = useState<number | null>(null);

  useEffect(() => {
    const years = Array.from(new Set(schedule.map((record) => dayjs(record.startLive).year())));
    if (!selectedYear || !years.includes(selectedYear)) {
      setSelectedYear(years[0]);
    }
  }, [schedule, selectedYear]);

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
      toast.error('Kesalahan simpan data, silahkan coba lagi.');
    }
  };

  const handleTabChange = (key: string) => {
    setSelectedYear(Number(key));
    setCurrentPage(1);
  };

  const filteredSchedule = selectedYear
    ? schedule.filter((record) => dayjs(record.startLive).year() === selectedYear)
    : schedule;

  const years = Array.from(new Set(schedule.map((record) => dayjs(record.startLive).year())));

  const tabItems = years
    .sort((a, b) => b - a)
    .map((year) => ({
      label: String(year),
      key: String(year),
  }));


  return (
    <>
      <Tabs
        className={filteredSchedule.length === 0 ? "mt-6" : "mt-2"}
        activeKey={String(selectedYear)}
        onChange={handleTabChange}
        centered
        items={tabItems}
      />

      <Table
        className="-mt-3"
        size="small"
        dataSource={filteredSchedule}
        pagination={{
          current: currentPage,
          pageSize,
          onChange: (page) => setCurrentPage(page),
          showSizeChanger: false,
          showTotal: (total) => `Total ${total} Jadwal`,
        }}
        rowKey="id"
        loading={loading}
        scroll={{ x: 'max-content' }}
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
        <Column
          align="center"
          title="No"
          dataIndex="index"
          key="index"
          render={(_, __, index) => (currentPage - 1) * pageSize + index + 1}
        />

        <ColumnGroup title="Hidup (20 Hari)">
          <Column
            title={alignCenterFormat("Awal")}
            dataIndex="startLive"
            key="startLive"
            render={(_, record: Schedule) =>
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
            }
          />
          <Column
            title={alignCenterFormat("Ujung")}
            dataIndex="endLive"
            key="endLive"
            render={(date) => dayjs.utc(date).tz("Asia/Jakarta").format(DATE_FORMAT)}
          />
        </ColumnGroup>

        <ColumnGroup title="Istirahat (10 Hari)" >
          <Column
            title={alignCenterFormat("Awal")}
            dataIndex="startOff"
            key="startOff"
            render={(date) => dayjs.utc(date).tz("Asia/Jakarta").format(DATE_FORMAT)}
          />
          <Column
            className='bg-cyan-200 hover:bg-cyan-600'
            title={alignCenterFormat("Ujung")}
            dataIndex="endOff"
            key="endOff"
            render={(date) => dayjs.utc(date).tz("Asia/Jakarta").format(DATE_FORMAT)}
          />
        </ColumnGroup>

        <ColumnGroup title="Perkiraan Panen (50-55 Hari)">
          <Column
            className='bg-orange-200'
            title={alignCenterFormat("Awal")}
            dataIndex="endOff"
            key="endOff"
            render={(date) => dayjs.utc(date).tz("Asia/Jakarta").add(50, "days").format(DATE_FORMAT)}
          />
          <Column
            className='bg-orange-400'
            title={alignCenterFormat("Ujung")}
            dataIndex="endOff"
            key="endOff"
            render={(date) => dayjs.utc(date).tz("Asia/Jakarta").add(55, "days").format(DATE_FORMAT)}
          />
        </ColumnGroup>

        <Column
          align="center"
          title="Aksi"
          fixed="right"
          key="action"
          width={95}
          render={(_, record: Schedule) =>
            editKey === record.id ? (
              <Space className="flex justify-items-center">
                <Tooltip title="Simpan" color="blue">
                  <Button
                    onClick={() => { 
                      handleSave( record.id ) 
                      resetFormError()
                    }}
                    type="primary"
                    loading={loading}
                  >
                    {!loading && <SaveFilled className="text-xl -mx-2" />}
                  </Button>
                </Tooltip>
                <Tooltip title="Batal" color="red">
                  <Button
                    danger
                    onClick={() => { 
                      onCancel(); 
                      resetFormError()
                      }}
                    loading={loading}
                  >
                    {!loading && <CloseSquareFilled className="text-xl -mx-2" />}
                  </Button>
                </Tooltip>
              </Space>
            ) : (
                <Space className="flex justify-items-center">
                  <Tooltip
                    title="Edit" 
                    color="cyan">
                    <Button
                      onClick={() => { 
                        onEdit( record ); 
                        resetFormError()
                      }}
                      loading={loading}
                      color="cyan"
                      variant="outlined"
                    >
                      {!loading && <EditFilled className="text-xl -mx-2" />}
                    </Button>
                  </Tooltip>
                  <Tooltip
                    title="Hapus"
                    color="red">
                    <Button
                      danger
                      onClick={() => {
                        onDelete( record.id )
                        resetFormError()
                      }}
                      loading={loading}
                    >
                      {!loading && <DeleteFilled className="text-xl -mx-2" />}
                    </Button>
                  </Tooltip>
                </Space>
            )
          }
        />
      </Table>
    </>
  );
};

export default ScheduleTable;
