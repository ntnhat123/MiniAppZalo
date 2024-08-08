import { getCategoryTask } from "api/CategoryTask";
import { getLichTruc, postLogCalendar } from "api/LichTruc";
import { getReportStatus } from "api/ReportStatus";
import { useAuth } from "context/authContext";
import { ICalendar } from "model/Calendar";
import { ICategoryTask } from "model/CategoryTask";
import { ILichTruc } from "model/LichTruc";
import { ILogCalendar } from "model/LogCalendar";
import { IReportStatus } from "model/ReportStatus";
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

interface IProps {
    list: ICalendar;
    // lichtruc: ILichTruc;
    lichtruc: ILichTruc[];
    handleClose: () => void;
}

const PopupNote = ({ list,handleClose,lichtruc }: IProps) => {
  const [statusData, setStatusData] = useState<IReportStatus[]>([]);
  const { user } = useAuth();
  const [tasks, setTasks] = useState<ICategoryTask[]>([]);

  const [logCalendar,setLogCalendar] = useState<ILogCalendar>({
    LogID: 0,
    LichID: lichtruc.map(item => item.LichID).join(','),
    NguoiTao: user?.UserID || '',
    NgayTao:  new Date().toISOString(),
    ThoiGian: '',
    GhiChu: '',
    NguyenNhan: '',
    NgaySuKien: '',
    FileTep: '',
    DanhMucNhiemVuID: '',
    StatusID: '',
    FileName: '',
  })
  

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

  useEffect(()=>{
    fetchStatus()
    fetchTasks()
  },[])


  if(!user){
    return <Navigate to="/login" />
  }
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setLogCalendar({
      ...logCalendar,
      [name]: value
    });
  };

  const handleSubmit = async () => {
    try {
      await postLogCalendar(logCalendar);
      console.log(postLogCalendar)
      handleClose();
    } catch (error) {
      console.error('Error saving log:', error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl">
        <div className="border-b px-4 py-2 flex justify-between items-center">
          <h3 className="text-lg font-semibold">NHẬT KÝ THEO DÕI HỆ THỐNG DATA CENTER</h3>
          <button className="text-black" onClick={handleClose}>
            &times;
          </button>
        </div>

        <form action="">
          <div className="p-4 max-h-96 overflow-y-auto">
            <div className="min-w-full">
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
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    name="NgaySuKien"
                    value={logCalendar.NgaySuKien}
                  />
                  <small className="text-gray-500 block mt-1">(Nếu trực hôm qua mà hôm nay mới ghi nhật ký thì điền ngày đã trực)</small>
                </div>
              </div>
              <div className="mb-4 flex flex-col md:flex-row md:items-center">
                <label className="block text-gray-700 text-sm font-bold mb-2 md:mb-0 md:w-1/3">Nhật ký</label>
                <textarea
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full md:w-2/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
                <select
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full md:w-2/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  name="DanhMucNhiemVuID"
                  required
                  value={logCalendar.DanhMucNhiemVuID}
                >
                  <option value="">--Tất cả nhiệm vụ--</option>
                  {tasks.map((task, index) => (
                    <option key={index} value={task.DanhMucNhiemVuID}>{task.DanhMucNhiemVuName}</option>
                  ))}
                </select>
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
            </div>
          </div>
          <div className="border-t px-4 py-2 flex justify-end">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
              onSubmit={handleSubmit}
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
