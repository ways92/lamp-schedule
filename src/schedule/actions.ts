"use server";

import { prisma } from "@/lib/prisma";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

// Ambil semua data schedule
export const getSchedules = async () => {
  const schedules = await prisma.schedule.findMany();
  
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
  console.log('Received startLive from frontend:', startLive);

  // Konversi ke UTC (pastikan waktu tetap akurat)
  const startDateUTC = dayjs.utc(startLive);

  // Konversi ke WIB tanpa kehilangan zona waktu
  const startDateWIB = startDateUTC.tz('Asia/Jakarta');

  console.log('Parsed startLive (WIB):', startDateWIB.format());
  console.log('Parsed startLive (UTC):', startDateWIB.utc().format());

  const endLive = startDateWIB.add(19, 'days').utc();
  const startOff = endLive.add(1, 'day').utc();
  const endOff = startOff.add(9, 'days').utc();

  await prisma.schedule.create({
    data: {
      startLive: startDateWIB.toDate(), // Simpan sebagai UTC
      endLive: endLive.toDate(),
      startOff: startOff.toDate(),
      endOff: endOff.toDate(),
    },
  });
}

// Hapus schedule
export async function deleteSchedule(id: string) {
  await prisma.schedule.delete({ where: { id } });
}

// Update schedule
export async function updateSchedule(id: string, startLive: string) {
  console.log('Received startLive from frontend:', startLive);

  // Konversi ke UTC (pastikan waktu tetap akurat)
  const startDateUTC = dayjs.utc(startLive);

  // Konversi ke WIB tanpa kehilangan zona waktu
  const startDateWIB = startDateUTC.tz('Asia/Jakarta');

  console.log('Parsed startLive (WIB):', startDateWIB.format());
  console.log('Parsed startLive (UTC):', startDateWIB.utc().format());

  // Hitung tanggal lainnya berdasarkan startDateWIB
  const endLive = startDateWIB.add(19, 'days').utc();
  const startOff = endLive.add(1, 'day').utc();
  const endOff = startOff.add(9, 'days').utc();

  await prisma.schedule.update({
    where: { id },
    data: {
      startLive: startDateWIB.toDate(), // Simpan sebagai UTC
      endLive: endLive.toDate(),
      startOff: startOff.toDate(),
      endOff: endOff.toDate(),
    },
  });
}

