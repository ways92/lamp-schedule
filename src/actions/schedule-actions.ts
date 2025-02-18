"use server";

import { prisma } from "@/lib/prisma";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from 'dayjs/plugin/timezone';
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";
dayjs.extend(utc);
dayjs.extend(timezone);


// Ambil semua data schedule
export const getSchedules = async () => {
  const session = await getServerSession( authOptions );
  if ( !session?.user ) throw new Error( "Unauthorized" );

  const schedules = await prisma.schedule.findMany( {
    where: {
      authorId: session?.user.id
    },
    orderBy: {
      createdAt: 'asc', 
    },
  });
  
  return schedules.map((schedule) => ({
    ...schedule,
    startLive: schedule.startLive,
    endLive: schedule.endLive,
    startOff: schedule.startOff,
    endOff: schedule.endOff,
    createdAt: schedule.createdAt,
    updatedAt: schedule.updatedAt,
  }));
};


// Tambah schedule baru
export async function addSchedule(startLive: string) {
  const session = await getServerSession( authOptions );
  if ( !session?.user ) throw new Error( "Unauthorized" );
  
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
      authorId: session.user.id
    },
  });
}


// Hapus schedule
export async function deleteSchedule(id: string) {
  const session = await getServerSession( authOptions );
  if ( !session?.user ) throw new Error( "Unauthorized" );

  await prisma.schedule.delete({ where: { id } });
}


// Update schedule
export async function updateSchedule(id: string, startLive: string) {
  const session = await getServerSession( authOptions );
  if ( !session?.user ) throw new Error( "Unauthorized" );

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

