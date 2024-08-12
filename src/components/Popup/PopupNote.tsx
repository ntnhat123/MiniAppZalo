import { getCategoryTask } from "api/CategoryTask";
import { postLogCalendar } from "api/LichTruc";
import { getReportStatus } from "api/ReportStatus";
import { useAuth } from "context/authContext";
import { ICalendar } from "model/Calendar";
import { ICategoryTask } from "model/CategoryTask";
import { ILichTruc } from "model/LichTruc";
import { ILogCalendar } from "model/LogCalendar";
import { IReportStatus } from "model/ReportStatus";
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { IoCloseSharp } from "react-icons/io5";
import { RiErrorWarningFill } from "react-icons/ri";
import { apiRouter } from "lib/api/apiRouter";
import Select from "react-select";

interface IProps {
    list: ICalendar;
    lichtruc: ILichTruc[];
    handleClose: () => void;
}


const PopupNote = ({ list, handleClose, lichtruc }: IProps) => {
  const [statusData, setStatusData] = useState<IReportStatus[]>([]);
  const { user } = useAuth();
  const [tasks, setTasks] = useState<ICategoryTask[]>([]);
  const [checkDay,setCheckDay] = useState<string>('');
  const [logCalendar, setLogCalendar] = useState<ILogCalendar>({
    LogID: 0,
    LichID: lichtruc.map(item => item.LichID).join(','),
    NguoiTao: user?.UserID || '',
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

  const fetchTasks = async () => {
    try {
      const res = await getCategoryTask();
      setTasks(res.data);
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  };

  const fetchStatus = async () => {
    try {
      const res = await getReportStatus();
      setStatusData(res.data);
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  };

  useEffect(() => {
    fetchStatus();
    fetchTasks();
  }, []);

  if (!user) {
    return <Navigate to="/login" />;
  }

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
  
 
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (checkDay) {
      return;
    }
    try {
        const res = await postLogCalendar(logCalendar);
        
        if(res){
          handleClose();
        }
    } catch (error) {
      console.error('Error saving log:', error);
    }
  };

  const handleChangeSelect = (selectedOption) => {
    setLogCalendar((prevLogCalendar) => ({
      ...prevLogCalendar,
      DanhMucNhiemVuID: selectedOption ? selectedOption.value : '',
    }));
  };

  const options = tasks.map((task) => ({
    value: task.DanhMucNhiemVuID,
    label: task.DanhMucNhiemVuName,
  }));

  const selectedOption = options.find(option => option.value === logCalendar.DanhMucNhiemVuID) ?? null;
  return (
    <div className="flex flex-col fixed inset-0 bg-white items-center justify-center rounded-t-2xl md:rounded-3xl max-w-4xl w-full p-10 px-3 mx-auto md:max-h-fit">
      <div className="border-b px-4 py-2 w-full flex items-center justify-between">
        <h3 className="text-lg font-semibold">NHẬT KÝ THEO DÕI HỆ THỐNG DATA CENTER</h3>
        <button className="font-bold" onClick={handleClose}>
          <IoCloseSharp />
        </button>
      </div>
      <div className="flex-grow overflow-auto px-3">
        <form onSubmit={handleSubmit}>
          <div className="mb-4 flex flex-col md:flex-row md:items-center">
            <label className="block text-gray-700 text-sm font-bold mb-2 md:mb-0 md:w-1/3">Người theo dõi hệ thống hiện tại</label>
            <input
              className="shadow appearance-none border rounded w-full md:w-2/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              readOnly
              value={list.NguoiTheoDoiHeThong}
            />
          </div>
          <div className="mb-4 flex flex-col md:flex-row md:items-center">
            <label className="block text-gray-700 text-sm font-bold mb-2 md:mb-0 md:w-1/3">Người ghi nhật ký</label>
            <input
              className="shadow appearance-none border rounded w-full md:w-2/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              readOnly
              value={user?.FullName}
            />
          </div>
          <div className="mb-4 flex flex-col md:flex-row md:items-center">
            <label className="block text-gray-700 text-sm font-bold mb-2 md:mb-0 md:w-1/3">Thời gian ghi nhật ký</label>
            <input
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full md:w-2/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              name="NgayTao"
              value={logCalendar.NgayTao}
            />
          </div>
          <div className="mb-4 flex flex-col md:flex-row md:items-start">
            <label className="block text-gray-700 text-sm font-bold mb-2 md:mb-0 md:w-1/3">Ngày sự kiện/Nhật ký</label>
            <div className="md:w-2/3">
              <input
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full max-h-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="date"
                name="NgaySuKien"
                value={logCalendar.NgaySuKien}
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
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full md:h-20 h-28 md:w-2/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  name="GhiChu"
                  required
                  value={logCalendar.GhiChu}
                />
          </div>
          <div className="mb-4 flex flex-col md:flex-row md:items-center">
                <label className="block text-gray-700 text-sm font-bold mb-2 md:mb-0 md:w-1/3">Ghi chú</label>
                <textarea
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full md:w-2/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  name="NguyenNhan"
                  placeholder="Nhập ghi chú nếu có sự cố xảy ra"
                  value={logCalendar.NguyenNhan}
                />
          </div>   
          <div className="mb-4 flex flex-col md:flex-row md:items-center">
            <label className="block text-gray-700 text-sm font-bold mb-2 md:mb-0 md:w-1/3">Thuộc nhiệm vụ</label>
            {/* <select onChange={handleChange} className="shadow appearance-none border rounded w-full md:w-2/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline overflow-auto"
              name="DanhMucNhiemVuID"
              required
              value={logCalendar.DanhMucNhiemVuID}
              style={{
                whiteSpace: 'nowrap',  
                overflow: 'hidden',   
                textOverflow: 'ellipsis', 
              }}
            >
              <option value="">--Tất cả nhiệm vụ--</option>
              {tasks.map((task, index) => (
                <option key={index} value={task.DanhMucNhiemVuID}>
                  {task.DanhMucNhiemVuName}
                </option>
              ))}
            </select> */}
    <div className="w-full md:w-2/3">
    <Select
          options={options}
          onChange={handleChangeSelect}
          value={selectedOption}
          placeholder="--Tất cả nhiệm vụ--"
          isSearchable // Đảm bảo rằng thuộc tính này đã được bật
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
          </div>
          <div className="mb-4 flex flex-col md:flex-row md:items-center">
                <label className="block text-gray-700 text-sm font-bold mb-2 md:mb-0 md:w-1/3">Tình trạng</label>
                <select
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full md:w-2/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  name="StatusID"
                  required
                  value={logCalendar.StatusID}
                >
                  <option value="">--Tất cả tình trạng--</option>
                  {statusData.map((status, index) => (
                    <option key={index} value={status.StatusID}>{status.StatusName}</option>
                  ))}
                </select>
          </div>
          <div className="mb-4 flex flex-col md:flex-row md:items-center">
                <label className="block text-gray-700 text-sm font-bold mb-2 md:mb-0 md:w-1/3">File</label>
                <input
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
              Lưu nhật ký
            </button>
            <button
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={handleClose}
            >
              Về danh sách nhật ký
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PopupNote;
