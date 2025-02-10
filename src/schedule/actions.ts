"use server";

import { prisma } from "@/lib/prisma";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

// Ambil semua data schedule
export const getSchedules = async () => {
  const schedules = await prisma.schedule.findMany({
    orderBy: {
      createdAt: 'asc', 
    },
  });
  
  return schedules.map((schedule) => ({
    ...schedule,
    startLive: schedule.startLive.toISOString(),
    endLive: schedule.endLive.toISOString(),
    startOff: schedule.startOff.toISOString(),
    endOff: schedule.endOff.toISOString(),
    createdAt: schedule.createdAt.toISOString(),
    updatedAt: schedule.updatedAt.toISOString(),
  }));
};


// Tambah schedule baru
export async function addSchedule(startLive: string) {
  const startDateWIB = dayjs.tz(startLive, "Asia/Jakarta");
  
  const endLiveWIB = startDateWIB.add(19, "days");
  const startOffWIB = endLiveWIB.add(1, "day");
  const endOffWIB = startOffWIB.add(9, "days");

  const startDateUTC = startDateWIB.utc();
  const endLiveUTC = endLiveWIB.utc();
  const startOffUTC = startOffWIB.utc();
  const endOffUTC = endOffWIB.utc();

  await prisma.schedule.create({
    data: {
      startLive: startDateUTC.toDate(),
      endLive: endLiveUTC.toDate(),
      startOff: startOffUTC.toDate(),
      endOff: endOffUTC.toDate(),
    },
  });
}

// Hapus schedule
export async function deleteSchedule(id: string) {
  await prisma.schedule.delete({ where: { id } });
}

// Update schedule
export async function updateSchedule(id: string, startLive: string) {
  const startDateUTC = dayjs.utc(startLive);

  const startDateWIB = startDateUTC.tz('Asia/Jakarta');
  const endLive = startDateWIB.add(19, 'days').utc();
  const startOff = endLive.add(1, 'day').utc();
  const endOff = startOff.add(9, 'days').utc();

  await prisma.schedule.update({
    where: { id },
    data: {
      startLive: startDateWIB.toDate(),
      endLive: endLive.toDate(),
      startOff: startOff.toDate(),
      endOff: endOff.toDate(),
    },
  });
}

