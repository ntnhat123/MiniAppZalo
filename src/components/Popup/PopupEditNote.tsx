import { getEditCalendarUser } from "api/EditCalendar";
import { IEditCalendar } from "model/IEditCalendar";
import { IListCalendar } from "model/IListCalendarUser";
import React, { useCallback, useEffect, useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import 'react-toastify/dist/ReactToastify.css';
import Select from "react-select";
import { toast } from 'react-toastify'
import { getCategoryTask } from "api/CategoryTask";
import { ICategoryTask } from "model/CategoryTask";
import { ILogCalendar } from "model/LogCalendar";
import { useAuth } from "context/authContext";
import { RiErrorWarningFill } from "react-icons/ri";
import { ILichTruc } from "model/LichTruc";
import { postLogCalendar } from "api/LichTruc";

interface IProps {
    handleClose: () => void;
    logID: string;
    lichtruc: ILichTruc[];
    listCalendar: IListCalendar[];
    setListCalendar: React.Dispatch<React.SetStateAction<IListCalendar[]>>;
    formatDate: (dateString: string) =>  void;
}

const PopupEditNote = ({ handleClose, logID, listCalendar, lichtruc,setListCalendar }: IProps) => {
    const [listEditCalendar, setEditCalendar] = useState<IEditCalendar[]>([]);
    const { user } = useAuth();
    const [tasks, setTasks] = useState<ICategoryTask[]>([]);
    const [checkDay,setCheckDay] = useState<string>('');
    const [logCalendar, setLogCalendar] = useState<ILogCalendar>({
        LogID: 0,
        LichID: '',
        NguoiTao: '',
        NgayTao: new Date().toISOString(),
        ThoiGian: '',
        GhiChu: '',
        NguyenNhan: '',
        NgaySuKien: '',
        FileTep: '',
        DanhMucNhiemVuID: '',
        StatusID: '',
        FileName: '',
    });

    const fetchEditCalendar = useCallback(async () => {
        try {
            const response = await getEditCalendarUser(Number(logID));
            const data = response.data;
            setEditCalendar(data);
            if (data.length > 0) {
                const initialData = data[0];
                setLogCalendar({
                    LogID: Number(logID),
                    LichID: initialData.LichID,
                    NguoiTao: user?.UserID || '',
                    NgayTao: initialData.NgayTao || '',
                    ThoiGian: initialData.ThoiGian || '',
                    GhiChu: initialData.GhiChu || '',
                    NguyenNhan: initialData.NguyenNhan || '',
                    NgaySuKien: formatDate(initialData.NgaySuKien)|| '',
                    FileTep: initialData.FileTep || '',
                    DanhMucNhiemVuID: initialData.DanhMucNhiemVuID || '',
                    StatusID: initialData.StatusID || '',
                    FileName: initialData.FileName || '',
                });
            }
        } catch (error) {
            console.error('Error fetching calendar data:', error);
        }
    }, [logID, lichtruc, user?.UserID]);

    const formatDate = (dateString: string) => {
        return dateString.split('T')[0]; 
    };
    const selectedCalendar = listCalendar.find(calendar => calendar?.LogID === logID);

    const fetchTasks = async () => {
        try {
            const res = await getCategoryTask();
            setTasks(res.data);
        } catch (error) {
            console.error('Error fetching data: ', error);
        }
    };
    useEffect(() => {
        fetchEditCalendar();
        fetchTasks();
    }, []);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        if(name === "NgaySuKien"){
            const eventDate = new Date(value);
            const today = new Date();
            if(eventDate > today){
              setCheckDay("Ngày sự kiện không thể lớn hơn ngày hiện tại.");
            }else{
              setCheckDay("");
            }
        }

        setLogCalendar({
            ...logCalendar,
            [name]: value
        });
    };
    const options = tasks.map((task) => ({
        value: task.DanhMucNhiemVuID,
        label: task.DanhMucNhiemVuName,
    }));

    const handleChangeSelect = (selectedOption) => {
        setLogCalendar((prevLogCalendar) => ({
          ...prevLogCalendar,
          DanhMucNhiemVuID: selectedOption ? selectedOption.value : '',
        }));
        
      };
    const selectedOption = options.find(option => option.value === logCalendar.DanhMucNhiemVuID) ?? null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (checkDay) {
            return;
        }
        try {
            const res = await postLogCalendar(logCalendar);
            if (res) {
                toast.success("Chỉnh sửa nhật ký thành công", { autoClose: 1000, draggable: true });
                const updatedListCalendar = listCalendar.map(item => {
                    if (item.LogID === logID) {
                        return {
                            ...item,
                            LogID: logCalendar.LogID.toString(), 
                            LichID: logCalendar.LichID,
                            NguoiTao: logCalendar.NguoiTao,
                            ThoiGian: logCalendar.ThoiGian,
                            GhiChu: logCalendar.GhiChu,
                            NguyenNhan: logCalendar.NguyenNhan,
                            NgaySuKien: logCalendar.NgaySuKien,
                            FileTep: logCalendar.FileTep,
                            DanhMucNhiemVuID: logCalendar.DanhMucNhiemVuID,
                            StatusID: logCalendar.StatusID,
                            FileName: logCalendar.FileName,
                            DanhMucNhiemVuName: options.find(option => option.value === logCalendar.DanhMucNhiemVuID)?.label, 
                        };
                    }
                    return item;
                });
                setListCalendar(updatedListCalendar as IListCalendar[]);
                
                handleClose();
                
            }
        } catch (error) {
            toast.error("Lưu dữ liệu thất bại");
        }
    };
    
      
    return (
        <div className="flex flex-col fixed inset-0 bg-white items-center justify-center rounded-t-2xl md:rounded-3xl max-w-4xl w-full p-10 px-3 md:max-h-fit">
            <div className="border-b px-4 py-2 w-full flex items-center justify-between">
                <h3 className="text-lg font-semibold">CHỈNH SỬA NHẬT KÝ </h3>
                <button className="font-bold" onClick={handleClose}>
                    <IoCloseSharp />
                </button>
            </div>
            <div className="flex-grow overflow-auto">
                {
                    listEditCalendar && selectedCalendar && (
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4 flex flex-col md:flex-row md:items-center ">
                                <label className="block text-gray-700 text-sm font-bold mb-2 md:mb-0 md:w-1/3">Ngày theo dõi</label>
                                <div className=' flex justify-between rounded-sm border p-3 font-bold'>
                                    <span>{formatDate(selectedCalendar.TuNgay)}</span>
                                    <span>{formatDate(selectedCalendar.DenNgay)}</span>
                                </div>
                            </div>
                            <div className="mb-4 flex flex-col md:flex-row md:items-center">
                                <label className="block text-gray-700 text-sm font-bold mb-2 md:mb-0 md:w-1/3">Người theo dõi hiện tại</label>
                                <input
                                    className="shadow appearance-none border rounded w-full md:w-2/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline font-bold"
                                    type="text"
                                    value={listEditCalendar[0]?.FullName || ''}
                                />
                            </div>
                            <div className="mb-4 flex flex-col md:flex-row md:items-center">
                                <label className="block text-gray-700 text-sm font-bold mb-2 md:mb-0 md:w-1/3">Người tạo nhật ký</label>
                                <input
                                    className="shadow appearance-none border rounded w-full md:w-2/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline font-bold"
                                    type="text"
                                    readOnly
                                    value={selectedCalendar?.FullName}
                                />
                            </div>
                            <div className="mb-4 flex flex-col md:flex-row md:items-center">
                                <label className="block text-gray-700 text-sm font-bold mb-2 md:mb-0 md:w-1/3">Thời gian tạo</label>
                                <input
                                    className="shadow appearance-none border rounded w-full md:w-2/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline font-bold"
                                    type="text"
                                    name="NgayTao"
                                    value={logCalendar.NgayTao}
                                />
                            </div>
                            <div className="mb-4 flex flex-col md:flex-row md:items-start">
                                <label className="block text-gray-700 text-sm font-bold mb-2 md:mb-0 md:w-1/3">Ngày sự kiện/Nhật ký</label>
                                <div className="md:w-2/3">
                                <input
                                    className="shadow appearance-none border rounded w-full max-h-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    type="date"
                                    name="NgaySuKien"
                                    value={logCalendar.NgaySuKien}
                                    onChange={handleChange}
                                />
                                {
                                    checkDay ? 
                                    <small className="flex items-center gap-1 text-red-500 font-bold">
                                        <RiErrorWarningFill />{checkDay}
                                    </small>: <small className="text-gray-500 block">(Nếu trực hôm qua mà hôm nay mới ghi nhật ký thì điền ngày đã trực)</small>

                                }
                                </div>
                            </div>
                            <div className="mb-4 flex flex-col md:flex-row md:items-center">
                                <label className="block text-gray-700 text-sm font-bold mb-2 md:mb-0 md:w-1/3">Nhật ký</label>
                                <textarea
                                    className="shadow appearance-none border rounded w-full md:h-20 h-28 md:w-2/3 py-2 px-3 text-gray-700 leading-tight font-bold focus:outline-none focus:shadow-outline"
                                    name="GhiChu"
                                    required
                                    value={logCalendar.GhiChu}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="mb-4 flex flex-col md:flex-row md:items-center">
                                <label className="block text-gray-700 text-sm font-bold mb-2 md:mb-0 md:w-1/3">Ghi chú</label>
                                    <textarea
                                    className="shadow appearance-none border rounded w-full md:w-2/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    name="NguyenNhan"
                                    placeholder="Nhập ghi chú nếu có sự cố xảy ra"
                                    value={logCalendar.NguyenNhan}
                                    onChange={handleChange}
                                    />
                            </div>   
                            <div className="mb-4 flex flex-col md:flex-row md:items-center">
                                <label className="block text-gray-700 text-sm font-bold mb-2 md:mb-0 md:w-1/3">Nhiệm vụ</label>
                                <Select
                                    className="font-bold"
                                    options={options}
                                    value={selectedOption}
                                    onChange={handleChangeSelect}
                                    placeholder="--Tất cả nhiệm vụ--"
                                    isSearchable
                                    required
                                    styles={{
                                        control: (base) => ({
                                            ...base,
                                            boxShadow: 'none',
                                        }),
                                        menu: (base) => ({
                                            ...base,
                                            whiteSpace: 'nowrap',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                        }),
                                    }}
                                />
                            </div>
                            <div className="mb-4 flex flex-col md:flex-row md:items-center">
                                <label className="block text-gray-700 text-sm font-bold mb-2 md:mb-0 md:w-1/3">File</label>
                                <input
                                    value={logCalendar.FileTep}
                                    onChange={handleChange}
                                    className="shadow appearance-none border rounded w-full md:w-2/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    type="file"
                                    name="FileTep"
                                    />
                            </div>
                            <div className="border-t px-4 py-2 flex justify-end">
                                <button
                                    type="submit"
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
                                >
                                    Lưu chỉnh sửa
                                </button>
                                <button
                                    className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                    onClick={handleClose}
                                >
                                    Về danh sách nhật ký
                                </button>
                            </div>
                        </form>
                    )
                }
            </div>
        </div>
    );
};

export default PopupEditNote;
