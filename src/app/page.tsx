"use client";
// import '@ant-design/v5-patch-for-react-19';
// import { useState } from "react";
// import { Table, Button, DatePicker, ConfigProvider } from "antd";
// import { FileAddTwoTone, CloseSquareFilled, EditFilled, SaveFilled, DeleteFilled } from '@ant-design/icons';
// import "antd/dist/reset.css";
// import dayjs from "dayjs";
// import idID from "antd/es/locale/id_ID";
// import "dayjs/locale/id";

// dayjs.locale( "id" );

// interface Schedule
// {
//   key: string;
//   startLive: dayjs.Dayjs;
//   endLive: dayjs.Dayjs;
//   startOff: dayjs.Dayjs;
//   endOff: dayjs.Dayjs;
// }

export default function LampSchedule() {
  // const [schedule, setSchedule] = useState<Schedule[]>( [] );
  // const [newDate, setNewDate] = useState<dayjs.Dayjs | null>( null );
  // const [errorDate, setErrorDate] = useState( "" );
  // const [errorDateEdit, setErrorDateEdit] = useState( "" );
  // const [editKey, setEditKey] = useState<string | null>( null );
  // const [editDate, setEditDate] = useState<dayjs.Dayjs | null>( null );

  // const addSchedule = () =>
  // {
  //   if ( !newDate ) {
  //     setErrorDate( "Tanggal harus diisi" );
  //     return;
  //   }

  //   let startLive = newDate;
  //   let endLive = startLive.add( 19, "day" );
  //   let startOff = endLive.add( 1, "day" );
  //   let endOff = startOff.add( 9, "day" );

  //   const newEntry: Schedule = {
  //     key: schedule.length.toString(),
  //     startLive,
  //     endLive,
  //     startOff,
  //     endOff,
  //   };

  //   setSchedule( [...schedule, newEntry] );
  //   setNewDate( null );
  //   setErrorDate( "" );
  // };

  // const deleteSchedule = ( key: string ) =>
  // {
  //   setSchedule( schedule.filter( entry => entry.key !== key ) );
  // };

  // const startEdit = ( record: Schedule ) =>
  // {
  //   setEditKey( record.key );
  //   setEditDate( record.startLive );
  // };

  // const saveEdit = () =>
  // {
  //   if ( !editDate ) {
  //     setErrorDateEdit( "Tanggal harus diisi" );
  //     return;
  //   }

  //   const updatedSchedule = schedule.map( entry =>
  //   {
  //     if ( entry.key === editKey ) {
  //       let startLive = editDate;
  //       let endLive = startLive.add( 19, "day" );
  //       let startOff = endLive.add( 1, "day" );
  //       let endOff = startOff.add( 9, "day" );

  //       return { ...entry, startLive, endLive, startOff, endOff };
  //     }
  //     setErrorDateEdit( "" );
  //     return entry;
  //   } );

  //   setSchedule( updatedSchedule );
  //   setEditKey( null );
  //   setEditDate( null );
  // };

  // const cancelEdit = () =>
  // {
  //   setEditKey( null );
  //   setEditDate( null );
  //   setErrorDateEdit( "" );
  // };

  // const columns = [
  //   {
  //     title: "Awal Hidup",
  //     dataIndex: "startLive",
  //     key: "startLive",
  //     render: ( _: any, record: Schedule ) =>
  //       editKey === record.key ? (

  //         <div>
  //           <DatePicker
  //             value={editDate ? dayjs( editDate ) : null}
  //             onChange={( date ) => setEditDate( date )}
  //             onFocus={() => setErrorDateEdit( "" )}
  //             inputReadOnly={true}
  //             format="dddd, DD MMMM YYYY"
  //             locale={idID.DatePicker}
  //             className="border w-full"
  //           />

  //           {errorDateEdit && <div className="text-red-500 my-0.5 -mb-3 ms-1 text-sm">{errorDateEdit}</div>}
  //         </div>
  //       ) : (
  //         record.startLive.format( "dddd, DD MMMM YYYY" )
  //       ),
  //   },
  //   { title: "Akhir Hidup", dataIndex: "endLive", key: "endLive", render: ( text: any ) => text.format( "dddd, DD MMMM YYYY" ) },
  //   { title: "Awal Mati", dataIndex: "startOff", key: "startOff", render: ( text: any ) => text.format( "dddd, DD MMMM YYYY" ) },
  //   { title: "Akhir Mati", dataIndex: "endOff", key: "endOff", render: ( text: any ) => text.format( "dddd, DD MMMM YYYY" ) },
  //   {
  //     title: "Aksi",
  //     key: "action",
  //     render: ( _: any, record: Schedule ) =>
  //       editKey === record.key ? (
  //         <>
  //           <Button onClick={saveEdit} type="primary" className="mr-2">
  //             <SaveFilled className='text-xl' />
  //           </Button>
  //           <Button onClick={cancelEdit} danger>
  //             <CloseSquareFilled className='text-xl' />
  //           </Button>
  //         </>
  //       ) : (
  //         <>
  //           <Button onClick={() => startEdit( record )} type="default" className="mr-2">
  //             <EditFilled className='text-xl' />
  //           </Button>
  //           <Button danger onClick={() => deleteSchedule( record.key )}>
  //             <DeleteFilled className='text-xl' />
  //           </Button>
  //         </>
  //       ),
  //   },
  // ];

  return (
    <div className='mx-auto pt-4'>
      <h1 className="text-xl font-bold mb-4">Jadwal Lampu Hidup</h1>
    </div>
    // <ConfigProvider locale={idID}>
    //   <div className="p-2 max-w-5xl mx-auto pt-4">
    //     <h1 className="text-xl font-bold mb-4">Jadwal Lampu Hidup</h1>
    //     {/* <DatePicker
    //       value={newDate}
    //       onChange={( date ) => setNewDate( date )}
    //       onFocus={() => setErrorDate( "" )}
    //       inputReadOnly={true}
    //       format="dddd, DD MMMM YYYY"
    //       locale={idID.DatePicker}
    //       className="border p-2 w-full"
    //       placeholder="Pilih tanggal awal"
    //     /> */}
    //     {/* {errorDate && <div className="text-red-500 my-1 ms-1 text-sm">{errorDate}</div>}
    //     <Button onClick={addSchedule} className="mt-2" type="primary">
    //       <FileAddTwoTone className='text-xl' />
    //     </Button>
    //     <Table className="mt-5" columns={columns} dataSource={schedule} pagination={false} rowKey="key" /> */}
    //   </div>
    // </ConfigProvider>
  );
}


// 'use client';

// import '@ant-design/v5-patch-for-react-19';
// import { ConfigProvider } from 'antd';
// import idID from 'antd/es/locale/id_ID';
// import { useSchedule } from '../hooks/useSchedule';
// import ScheduleForm from '../components/ScheduleForm';
// import ScheduleTable from '../components/ScheduleTable';

// export default function LampSchedule() {
//   const {
//     schedule,
//     editKey,
//     editDate,
//     errorDateEdit,
//     setEditDate,
//     addSchedule,
//     deleteSchedule,
//     startEdit,
//     saveEdit,
//     cancelEdit,
//   } = useSchedule();

//   return (
//     <ConfigProvider locale={idID}>
//       <div className="p-2 max-w-5xl mx-auto pt-4">
//         <h1 className="text-xl font-bold mb-4">Jadwal Lampu Hidup</h1>
//         <ScheduleForm addSchedule={addSchedule} />
//         <ScheduleTable
//           schedule={schedule}
//           onEdit={startEdit}
//           onDelete={deleteSchedule}
//           onSave={saveEdit}
//           onCancel={cancelEdit}
//           editKey={editKey}
//           editDate={editDate}
//           setEditDate={setEditDate}
//           errorDateEdit={errorDateEdit}
//         />
//       </div>
//     </ConfigProvider>
//   );
// }