"use client";

import { useState, useCallback } from "react";
import { Form, DatePicker, Button } from "antd";
import { FileAddTwoTone } from "@ant-design/icons";
import dayjs, { Dayjs } from "dayjs";
import idID from "antd/es/locale/id_ID";
import { ScheduleFormProps } from "@/types/schedule";
import { DATE_FORMAT } from "@/config/dateConfig";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

export const ScheduleForm = ({ addSchedule, loading, form }: ScheduleFormProps) => {
  // const [form] = Form.useForm();
  const [newDate, setNewDate] = useState<Dayjs | null>(null);

  const handleAddSchedule = useCallback(() => {
    form
      .validateFields()
      .then((values) => {
        const selectedDate = dayjs(values.date).tz("Asia/Jakarta").startOf("day");
        const utcDate = selectedDate.hour( 12 ).utc();        

        addSchedule(utcDate);
        setNewDate(null);
        form.resetFields();
      })
      .catch(() => {});
  }, [addSchedule, form]);

  return (
    <Form form={form} layout="vertical">
      <div className="flex justify-between -mb-6">
        <Form.Item
          name="date"
          rules={[{ type: "object" as const, required: true, message: "Tanggal harus diisi!" }]}
          className="w-full me-2"
        >
          <DatePicker
            value={newDate}
            onChange={(date) => setNewDate(date)}
            format={DATE_FORMAT}
            locale={idID.DatePicker}
            inputReadOnly
            placeholder="Pilih tanggal awal"
            disabled={loading}
            className="border p-2 w-full"
          />
        </Form.Item>

        <Button
          onClick={handleAddSchedule}
          className="h-10 flex justify-center"
          type="primary"
          loading={loading}
          disabled={loading}
        >
          {!loading && <FileAddTwoTone className="text-xl" />}
        </Button>
      </div>
    </Form>
  );
};

export default ScheduleForm;
