
import { useAuth } from 'context/authContext';
import React, { useCallback, useEffect, useState } from 'react';
import { getListCalendarUser } from 'api/ListCalendar';
import { IListCalendar } from 'model/IListCalendarUser';
import { IRole } from 'model/Role';
import PopupEditNote from 'components/Popup/PopupEditNote';
import { ILichTruc } from 'model/LichTruc';

const ListCalendarUser = () => {
    const { user,roles } = useAuth();
    const [listCalendar,setListCalendar] = useState<IListCalendar[]>([]);
    const [selectedLogID, setSelectedLogID] = useState<string>(''); 
    const [lichtruc, setLichtruc] = useState<ILichTruc[]>([]);
    const [openNote, setOpenNote] = useState<boolean>(false);
    const userIds = roles?.map((role: IRole) => role?.UserID);

    const fetchCalendar = useCallback(async () => {
        try {
            if (userIds && userIds.length > 0) {
                const userId = Number(userIds[0]);
                const listCalendar = await getListCalendarUser(userId);
                setListCalendar(listCalendar.data);
            }
        } catch (error) {
            throw(error);
        }
    }, [userIds]);
    
    useEffect(() => {
        fetchCalendar();
    }, []);

    const handleNote = (logID: string) => {
        setSelectedLogID(logID)
        setOpenNote(true);
    };

    const handleClose = () => {
        setOpenNote(false);
    };

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
                            name="GhiChu" readOnly
                            value={calendar.GhiChu}
                            />
                        </div>
                        <div className="mb-4 flex flex-col md:flex-row md:items-center">
                            <label className="block text-gray-700 text-sm font-bold mb-2 md:mb-0 md:w-1/3">Nhiệm vụ</label>
                            <textarea
                            className="shadow appearance-none border rounded w-full md:h-20 h-28 md:w-2/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            name="GhiChu" readOnly
                            value={calendar.DanhMucNhiemVuName}
                            />
                        </div>
                        <div className="mb-4 flex flex-col md:flex-row md:items-center">
                            <label className="block text-gray-700 text-sm font-bold mb-2 md:mb-0 md:w-1/3">Thời gian tạo</label>
                            <input
                            className="shadow appearance-none border rounded w-full md:w-2/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="text" readOnly
                            name="NgayTao"
                            value={calendar.NgayTao}
                            />
                        </div>
                        <div className='w-full '>
                            <button className='bg-blue-500 w-full p-4 rounded-lg text-white' onClick={() => handleNote(calendar?.LogID)}>
                                Chỉnh sửa nhật ký
                            </button>
                        </div>
                    </div>
                ))}
                {openNote && (
                    <PopupEditNote  lichtruc={lichtruc}  listCalendar={listCalendar} logID={selectedLogID} handleClose={handleClose} setListCalendar={setListCalendar} />
                )}

        </div>
    );
};

export default ListCalendarUser;