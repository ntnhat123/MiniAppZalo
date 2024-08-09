import React, { useCallback, useEffect, useMemo, useState } from "react";
import { getCalendar } from "api/Calendar";
import { ICalendar } from "model/Calendar";
import { FaRegStickyNote } from "react-icons/fa";
import PopupNote from "components/Popup/PopupNote";
import { getLichTruc } from "api/LichTruc";
import { ILichTruc } from "model/LichTruc";
import { useNavigate } from "react-router-dom";
import LogoImage from 'logo.jpg'
import { FaSearch } from "react-icons/fa";
import { FiUser } from "react-icons/fi";
import { useAuth } from "context/authContext";

const CalendarPage = () => {
    const navigate = useNavigate();
    const {user} = useAuth();
    const [list, setList] = useState<ICalendar[]>([]);
    const [lichtruc, setLichtruc] = useState<ILichTruc[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedDay, setSelectedDay] = useState<string | null>(null);
    const [selectedMonth, setSelectedMonth] = useState<string>((new Date().getMonth() + 1).toString());
    const [selectedYear, setSelectedYear] = useState<string>(new Date().getFullYear().toString());
    const [showToday, setShowToday] = useState<boolean>(true);
    const [searchList, setSearchList] = useState<string>("");
    const [openNote, setOpenNote] = useState<boolean>(false);
    const [selectedItem, setSelectedItem] = useState<ICalendar | null>(null);

    useEffect(() => {
        fetchCalendar();
        fetchLichTruc();
    }, []);

    const fetchCalendar = useCallback(async () => {
        try {
            const listCalendar = await getCalendar();
            setList(listCalendar.data);
        } catch (error) {
            setError('Error fetching data');
        } finally {
            setLoading(false);
        }
    }, []);

    const fetchLichTruc = useCallback(async () => {
        try {
            const res = await getLichTruc();
            setLichtruc(res.data);
        } catch (error) {
            setError('Error fetching lichtruc data');
        }
    }, []);

    const handleDayChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedDay(e.target.value || null);
    };

    const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedMonth(e.target.value);
    };

    const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedYear(e.target.value);
    };

    const handleCheckboxChange = () => {
        const newShowToday = !showToday;
        setShowToday(newShowToday);
        if (newShowToday) {
            setSelectedMonth((new Date().getMonth() + 1).toString());
            setSelectedYear(new Date().getFullYear().toString());
        }
    };

    const handleInputChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchList(e.target.value);
    };

    const handleNote = (item: ICalendar) => {
        setOpenNote(true);
        setSelectedItem(item);
    };

    const handleClose = () => {
        setOpenNote(false);
        setSelectedItem(null);
    };

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const term = searchList.trim();
        setSearchList(term);
        setShowToday(false);
    };

    const today = new Date();
    const getWeek = () => {
        const startOfWeek = new Date(today);
        startOfWeek.setDate(today.getDate() - (today.getDay() + 6) % 7 - 1);
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 7);
        return { startOfWeek, endOfWeek };
    };

    const isWithinWeek = (date: Date, startOfWeek: Date, endOfWeek: Date) => {
        return date >= startOfWeek && date <= endOfWeek;
    };

    const filteredList = useMemo(() => {
        return list.filter(item => {
            const matchesDay = selectedDay ? item.NgayTheoDoiHeThong === selectedDay : true;
            const matchesMonth = selectedMonth ? item.ThangTheoDoiHeThong === selectedMonth : true;
            const matchesYear = selectedYear ? item.NamTheoDoiHeThong === selectedYear : true;

            const itemDate = new Date(parseInt(item.NamTheoDoiHeThong), parseInt(item.ThangTheoDoiHeThong) - 1, parseInt(item.NgayTheoDoiHeThong));

            const { startOfWeek, endOfWeek } = getWeek();
            const isThisWeek = showToday && isWithinWeek(itemDate, startOfWeek, endOfWeek);

            const matchesSearch = searchList ? item.NguoiTheoDoiHeThong.toLowerCase().includes(searchList.toLowerCase()) : true;

            return matchesDay && matchesMonth && matchesYear && (showToday ? isThisWeek : true) && matchesSearch;
        });
    }, [list, selectedDay, selectedMonth, selectedYear, showToday, searchList]);

    if (loading) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>
    }

    if (error) {
        return <div>{error}</div>
    }

    return (
        <div className="min-h-screen flex flex-col items-center p-4 ">
            <div className="flex w-full justify-between items-center xl:px-[250px] pb-5">
                <div className="flex items-center">
                    <h1 className="text-xl font-serif">{user ? user?.FullName : 'LỊCH THEO DÕI DC'}</h1>
                </div>
                
                <div className="flex items-center justify-center" onClick={() => user ? navigate('/profile') : navigate('/login')}>
                    <FiUser className="text-2xl" />
                </div>
            </div>
            <div className="bg-white px-10 py-5 mb-5 rounded-xl">
                <div className="relative mb-5">
                    <form onSubmit={handleSearch} >
                        <input placeholder="Tìm kiếm . . ."  type="text"  value={searchList} onChange={handleInputChangeSearch}
                            className="w-full px-3 py-2 bg-transparent border-gray-300 focus:outline-none 
                            focus:ring-2 focus:ring-transparent pr-10 border-b-2" />
                        <button role="presentation" className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer" type="submit">
                            <FaSearch />
                        </button>
                    </form>
                </div> 
                <div className="w-full max-w-md items-center justify-center flex space-x-2 rounded-md">
                    <select onChange={handleDayChange} className="bg-white p-2 border text-xl shadow-lg rounded-lg">
                        <option value="">Ngày</option>
                        {[...new Set(list.map(item => item.NgayTheoDoiHeThong))].map((day, index) => (
                            <option key={index} value={day}>{day}</option>
                        ))}
                    </select>
                    <select onChange={handleMonthChange} className="bg-white p-2 border text-xl shadow-lg rounded-lg" value={selectedMonth || ""}>
                        <option value="">Tháng</option>
                        {[...new Set(list.map(item => item.ThangTheoDoiHeThong))].map((month, index) => (
                            <option key={index} value={month}>{month}</option>
                        ))}
                    </select>
                    <select onChange={handleYearChange} className="bg-white p-2 border text-xl shadow-lg rounded-lg" value={selectedYear || ""} >
                        <option value="">Năm</option>
                        {[...new Set(list.map(item => item.NamTheoDoiHeThong))].map((year, index) => (
                            <option key={index} value={year}>{year}</option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="w-full max-w-4xl">
                <div className="flex justify-between items-center md:text-2xl font-bold">
                    <div className="">
                        <h1>Người trực</h1>
                    </div>
                    <div className="justify-center items-center flex gap-2">
                        <input type="checkbox" className="md:w-5 md:h-5" checked={showToday} onChange={handleCheckboxChange} />
                        <label htmlFor="">Tuần này</label>
                    </div>
                </div>
                {filteredList.map((item, index) => {
                    const itemDate = new Date(parseInt(item.NamTheoDoiHeThong), parseInt(item.ThangTheoDoiHeThong) - 1, parseInt(item.NgayTheoDoiHeThong));
                    const isToday = itemDate.toDateString() === today.toDateString();
                    return (
                        <div key={index} className={`flex ${isToday ? "font-bold justify-between border mt-4 px-5 bg-white rounded-2xl p-4 drop-shadow-2xl" : "justify-between border mt-4 px-5 bg-white rounded-2xl p-4"}`}>
                            <div className="flex-1 ">
                                <div>{item.NguoiTheoDoiHeThong}</div>
                                <div>{item.NgayTheoDoiHeThong}/{item.ThangTheoDoiHeThong}/{item.NamTheoDoiHeThong}</div>
                            </div>
                            <div className="flex justify-center items-center cursor-pointer" onClick={() => handleNote(item)}>
                                <FaRegStickyNote />
                            </div>
                        </div>
                    );
                })}
            </div>
            {openNote && selectedItem && (
                <PopupNote lichtruc={lichtruc} handleClose={handleClose} list={selectedItem} />
            )}
            <button className="bg-gray-700 text-white px-4 py-2 rounded-lg mt-4" onClick={() => {navigate('/role')}}>
                Role
            </button>
        </div>
    );
};

export default CalendarPage;
