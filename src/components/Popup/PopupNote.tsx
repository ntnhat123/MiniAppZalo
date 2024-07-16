import { ICalendar } from "model/Calendar";
import React, { useEffect, useState } from "react";

interface IProps{
    list: ICalendar;
    handleClose: () => void;
}
const PopupNote = ({list,handleClose}: IProps) => {
    return(
        <div className="fixed inset-0 flex items-end md:items-center justify-center " onClick={handleClose}>
            <div className="bg-white rounded-t-3xl w-full md:w-1/3 p-10 px-3" onClick={(e) => e.stopPropagation()}>
                <div className="text-center">
                    <img
                        className="w-16 h-16 mx-auto rounded-full"
                        src="https://via.placeholder.com/150"
                        alt="Profile"
                    />
                    <h2 className="mt-2 text-xl font-semibold">{list.NguoiTheoDoiHeThong}</h2>
                    <p className="text-gray-500">{list.NgayTheoDoiHeThong}/{list.ThangTheoDoiHeThong}/{list.NamTheoDoiHeThong}</p>

                    <textarea
                        className="w-full py-8 px-3 mt-2 border border-gray-300 rounded-md"
                        placeholder="Nhật kí..."
                    ></textarea>
                    <button className="w-full p-4 bg-blue-500 text-xl text-white rounded-sm">
                        Lưu
                    </button>
                </div>
            </div>
        </div>
    )
};
export default PopupNote