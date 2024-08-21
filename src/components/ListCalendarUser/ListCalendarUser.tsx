
import { useAuth } from 'context/authContext';
import React, { useCallback, useEffect, useState } from 'react';
import { getListCalendarUser } from 'api/ListCalendar';
import { IListCalendar } from 'model/IListCalendarUser';
import { IRole } from 'model/Role';

const ListCalendarUser = () => {
    const { user,roles } = useAuth();
    const [listCalendar,setListCalendar] = useState<IListCalendar[]>([]);
    const userIds = roles?.map((role: IRole) => role?.UserID);

    const fetchCalendar = useCallback(async () => {
        try {
            const listCalendar = await getListCalendarUser(Number(userIds));
            setListCalendar(listCalendar.data);
            console.log(listCalendar.data)
        } catch (error) {
            throw(error);
        }
    }, [userIds]);

    useEffect(() => {
        fetchCalendar();
    }, []);


    return (
        <div className=''>

            <h3 className="text-lg mx-2 font-semibold">NHẬT KÝ CỦA NGƯỜI DÙNG</h3>
                {listCalendar.map((calendar) => (
                    
                    <div className={"font-bold justify-between border mt-2 mx-2 px-3 bg-white rounded-2xl p-4 drop-shadow-2xl mb-10"}>
                        <div className="mb-4 flex flex-col md:flex-row md:items-center ">
                            <label className="block text-gray-700 text-sm font-bold mb-2 md:mb-0 md:w-1/3">Ngày theo dõi</label>
                            <div className=' flex justify-between rounded-sm border p-2'>
                                <span>{calendar.TuNgay}</span> 
                                <span>{calendar.DenNgay}</span>
                            </div>
                        </div>
                        <div className="mb-4 flex flex-col md:flex-row md:items-center">
                            <label className="block text-gray-700 text-sm font-bold mb-2 md:mb-0 md:w-1/3">Người theo dõi hiện tại</label>
                            <input
                            className="shadow appearance-none border rounded w-full md:w-2/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            readOnly
                            value={calendar.NguoiTruc}
                            />
                        </div>
                        <div className="mb-4 flex flex-col md:flex-row md:items-center">
                            <label className="block text-gray-700 text-sm font-bold mb-2 md:mb-0 md:w-1/3">Người tạo nhật ký</label>
                            <input
                            className="shadow appearance-none border rounded w-full md:w-2/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            readOnly
                            value={calendar.FullName}
                            />
                        </div>
                        <div className="mb-4 flex flex-col md:flex-row md:items-center">
                            <label className="block text-gray-700 text-sm font-bold mb-2 md:mb-0 md:w-1/3">Nhật ký</label>
                            <textarea
                            className="shadow appearance-none border rounded w-full md:h-20 h-28 md:w-2/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            name="GhiChu"
                            value={calendar.GhiChu}
                            />
                        </div>
                        <div className="mb-4 flex flex-col md:flex-row md:items-center">
                            <label className="block text-gray-700 text-sm font-bold mb-2 md:mb-0 md:w-1/3">Nhiệm vụ</label>
                            <textarea
                            className="shadow appearance-none border rounded w-full md:h-20 h-28 md:w-2/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            name="GhiChu"
                            value={calendar.DanhMucNhiemVuName}
                            />
                        </div>
                        <div className="mb-4 flex flex-col md:flex-row md:items-center">
                            <label className="block text-gray-700 text-sm font-bold mb-2 md:mb-0 md:w-1/3">Thời gian tạo</label>
                            <input
                            className="shadow appearance-none border rounded w-full md:w-2/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            name="NgayTao"
                            value={calendar.NgayTao}
                            />
                        </div>
                    </div>
                ))}

        </div>
    );
};

export default ListCalendarUser;


// import { useAuth } from 'context/authContext';
// import React, { useCallback, useEffect, useState } from 'react';
// import { getListCalendarUser } from 'api/ListCalendar';
// import { IListCalendar } from 'model/IListCalendarUser';
// import { IRole } from 'model/Role';

// const ListCalendarUser = () => {
//     const { user,roles } = useAuth();
//     const userIds = roles?.map((role: IRole) => role?.UserID);
//     const [listCalendar,setListCalendar] = useState<IListCalendar[]>([]);

//     const fetchCalendar = async () => {
//         try {
//             const listCalendar = await getListCalendarUser();
//             setListCalendar(listCalendar.data);
//         } catch(error) {
//             throw(error);
//         }
//     };

//     useEffect(() => {
//         fetchCalendar();
//     }, []);
    


//     return (
//         <div className=''>

//             <h3 className="text-lg mx-2 font-semibold">NHẬT KÝ CỦA NGƯỜI DÙNG</h3>
//                 {listCalendar.map((calendar) => (
                    
//                     <div className={"font-bold justify-between border mt-2 mx-2 px-3 bg-white rounded-2xl p-4 drop-shadow-2xl mb-10"}>
//                         <div className="mb-4 flex flex-col md:flex-row md:items-center ">
//                             <label className="block text-gray-700 text-sm font-bold mb-2 md:mb-0 md:w-1/3">Ngày theo dõi</label>
//                             <div className=' flex justify-between rounded-sm border p-2'>
//                                 <span>{calendar.TuNgay}</span> 
//                                 <span>{calendar.DenNgay}</span>
//                             </div>
//                         </div>
//                         <div className="mb-4 flex flex-col md:flex-row md:items-center">
//                             <label className="block text-gray-700 text-sm font-bold mb-2 md:mb-0 md:w-1/3">Người theo dõi hiện tại</label>
//                             <input
//                             className="shadow appearance-none border rounded w-full md:w-2/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                             type="text"
//                             readOnly
//                             value={calendar.NguoiTruc}
//                             />
//                         </div>
//                         <div className="mb-4 flex flex-col md:flex-row md:items-center">
//                             <label className="block text-gray-700 text-sm font-bold mb-2 md:mb-0 md:w-1/3">Người tạo nhật ký</label>
//                             <input
//                             className="shadow appearance-none border rounded w-full md:w-2/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                             type="text"
//                             readOnly
//                             value={calendar.FullName}
//                             />
//                         </div>
//                         <div className="mb-4 flex flex-col md:flex-row md:items-center">
//                             <label className="block text-gray-700 text-sm font-bold mb-2 md:mb-0 md:w-1/3">Nhật ký</label>
//                             <textarea
//                             className="shadow appearance-none border rounded w-full md:h-20 h-28 md:w-2/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                             name="GhiChu"
//                             value={calendar.GhiChu}
//                             />
//                         </div>
//                         <div className="mb-4 flex flex-col md:flex-row md:items-center">
//                             <label className="block text-gray-700 text-sm font-bold mb-2 md:mb-0 md:w-1/3">Nhiệm vụ</label>
//                             <textarea
//                             className="shadow appearance-none border rounded w-full md:h-20 h-28 md:w-2/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                             name="GhiChu"
//                             value={calendar.DanhMucNhiemVuName}
//                             />
//                         </div>
//                         <div className="mb-4 flex flex-col md:flex-row md:items-center">
//                             <label className="block text-gray-700 text-sm font-bold mb-2 md:mb-0 md:w-1/3">Thời gian tạo</label>
//                             <input
//                             className="shadow appearance-none border rounded w-full md:w-2/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                             type="text"
//                             name="NgayTao"
//                             value={calendar.NgayTao}
//                             />
//                         </div>
//                     </div>
//                 ))}

//         </div>
//     );
// };

// export default ListCalendarUser;
