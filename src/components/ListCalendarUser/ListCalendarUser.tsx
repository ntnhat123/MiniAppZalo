
import { useAuth } from 'context/authContext';
import React, { useCallback, useEffect, useState } from 'react';
import { getListCalendarUser } from 'api/ListCalendar';
import { IListCalendar } from 'model/IListCalendarUser';
import { IRole } from 'model/Role';
import PopupEditNote from 'components/Popup/PopupEditNote';
import { ILichTruc } from 'model/LichTruc';
import { FaEdit } from "react-icons/fa";

const ListCalendarUser = () => {
    const { roles } = useAuth();
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

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('vi-VN');
    };

    return (
        <div className=''>
            <h3 className="text-lg mx-2 font-semibold">NHẬT KÝ CỦA NGƯỜI DÙNG</h3>
                {listCalendar.map((calendar) => (
                    <div key={calendar.LogID} className={"font-bold justify-between mt-2 mx-2 px-3 bg-white rounded-2xl p-4 drop-shadow-2xl mb-10"}>
                        <div className="flex flex-grow md:flex-row md:items-center justify-center items-stretch border">
                            <div className="basis-1/3 p-2 border-r border-b md:border-b-0">Người theo dõi hiện tại</div>                        
                            <div className="basis-2/3 p-2 border-b md:border-b-0">{calendar.NguoiTruc}</div>
                        </div>
                        <div className="flex flex-grow md:flex-row md:items-center justify-center items-stretch border">
                            <div className="basis-1/3 p-2 border-r border-b md:border-b-0">Người tạo nhật ký</div>                        
                            <div className="basis-2/3 p-2 border-b md:border-b-0">{calendar.FullName}</div>
                        </div>
                        <div className="flex flex-grow md:flex-row md:items-center justify-center items-stretch border">
                            <div className="basis-1/3 p-2 border-r border-b md:border-b-0">Ngày sự kiện</div> 
                            <div className="basis-2/3 p-2 border-b md:border-b-0">{formatDate(calendar.NgaySuKien)}</div>
                        </div>
                        <div className="flex flex-grow md:flex-row md:items-center justify-center items-stretch border">
                            <div className="basis-1/3 p-2 border-r border-b md:border-b-0">Nhật ký</div>                        
                            <div className="basis-2/3 p-2 border-b md:border-b-0">{calendar.GhiChu}</div>
                        </div>
                        <div className="flex flex-grow md:flex-row md:items-center justify-center items-stretch border">
                            <div className="basis-1/3 p-2 border-r">Nhiệm vụ</div>                        
                            <div className="basis-2/3 p-2">{calendar.DanhMucNhiemVuName}</div>
                        </div>
                        <div className='w-full justify-end flex mt-3'>
                            <button className='bg-gray-400 shadow-lg p-4 rounded-lg text-white ' onClick={() => handleNote(calendar?.LogID)}>
                                <FaEdit />
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