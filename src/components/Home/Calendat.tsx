import { getCalendar } from "api/Calendar";
import { ICalendar } from "model/Calendar";
import React, { useEffect, useState } from "react";
import { FaRegStickyNote } from "react-icons/fa";
import PopupNote from "components/Popup/PopupNote";

const CalendarPage = () => {
    const [list, setList] = useState<ICalendar[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedDay, setSelectedDay] = useState<string | null>(null);
    const [selectedMonth, setSelectedMonth] = useState<string | null>(null);
    const [selectedYear, setSelectedYear] = useState<string | null>(null);
    const [showToday, setShowToday] = useState<boolean>(true);
    const [searchList, setSearchList] = useState<string>("");
    const [openNote, setOpenNote] = useState<boolean>(false);
    const [selectedItem, setSelectedItem] = useState<ICalendar | null>(null);

    useEffect(() => {
        fetchCalendar();
    }, []);

    const fetchCalendar = async () => {
        try {
            const listCalendar = await getCalendar();
            setList(listCalendar.data);
        } catch (error) {
            setError('Error fetching data');
        } finally {
            setLoading(false);
        }
    };

    const handleDayChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedDay(e.target.value || null);
    };

    const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedMonth(e.target.value || null);
    };

    const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedYear(e.target.value || null);
    };

    const handleCheckboxChange = () => {
        setShowToday(!showToday);
    };

    const handleInputChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchList(e.target.value);
    };

    const handleNote = (item) => {
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
    };

    const getWeek =() => {
        const today = new Date();
        const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));
        const endOfWeek = new Date(today.setDate(today.getDate() + 7));
        return {startOfWeek,endOfWeek}; 
    };

    const isWithinWeek = (date: Date, startOfWeek: Date, endOfWeek: Date) => {
        return date >= startOfWeek && date <= endOfWeek;
    };

    const filteredList = list.filter(item => {
        const matchesDay = selectedDay ? item.NgayTheoDoiHeThong === selectedDay : true;
        const matchesMonth = selectedMonth ? item.ThangTheoDoiHeThong === selectedMonth : true;
        const matchesYear = selectedYear ? item.NamTheoDoiHeThong === selectedYear : true;

        const itemDate = new Date(`${item.NamTheoDoiHeThong}-${item.ThangTheoDoiHeThong}-${item.NgayTheoDoiHeThong}`);
        const { startOfWeek, endOfWeek } = getWeek();
        const isThisWeek = showToday && isWithinWeek(itemDate,startOfWeek,endOfWeek);
        
        const matchesSearch = searchList ? item.NguoiTheoDoiHeThong.toLowerCase().includes(searchList.toLowerCase()) : true;
        
        return matchesDay && matchesMonth && matchesYear && (showToday ? isThisWeek : true) && matchesSearch;
    });
    
    const today = new Date();

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="min-h-screen flex flex-col items-center p-4">
            <h1 className="text-2xl font-bold mb-4">Lịch Theo Dõi Hệ Thống</h1>
            <div className="flex justify-between mb-4">
                <form onSubmit={handleSearch} className="flex justify-between items-center gap-4">
                    <input type="text" value={searchList} onChange={handleInputChangeSearch} className="rounded-lg px-4 py-2 h-full outline-none" placeholder="Tìm kiếm..." />
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg focus:outline-none hover:from-green-500 hover:via-blue-600 hover:to-purple-700 transition duration-300">
                        Tìm kiếm
                    </button>
                </form>
            </div>
            <div className="mb-4 w-full max-w-md items-center justify-center flex space-x-2">
                <select onChange={handleDayChange} className="p-2 border text-xl shadow-lg rounded-lg">
                    <option value="">Ngày</option>
                    {Array.from({ length: 31 }, (_, i) => (
                        <option key={i + 1} value={(i + 1).toString()}>{i + 1}</option>
                    ))}
                </select>
                <select onChange={handleMonthChange} className="p-2 border text-xl shadow-lg rounded-lg">
                    <option value="">Tháng</option>
                    {Array.from({ length: 12 }, (_, i) => (
                        <option key={i + 1} value={(i + 1).toString()}>{i + 1}</option>
                    ))}
                </select>
                <select onChange={handleYearChange} className="p-2 border text-xl shadow-lg rounded-lg">
                    <option value="">Năm</option>
                    {Array.from({ length: 50 }, (_, i) => (
                        <option key={i + 2000} value={(i + 2000).toString()}>{i + 2000}</option>
                    ))}
                </select>
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
                    const itemDate = new Date(`${item.NamTheoDoiHeThong}-${item.ThangTheoDoiHeThong}-${item.NgayTheoDoiHeThong}`);
                    const isToday = itemDate.toDateString() === today.toDateString();
                    return (
                        <div key={index} className={`flex ${isToday ? "font-bold justify-between border mt-4 px-5 bg-white rounded-2xl p-4 drop-shadow-2xl" : "justify-between border mt-4 px-5 bg-white rounded-2xl p-4"}`}>
                            <div className="flex-1 ">
                                <div>{item.NgayTheoDoiHeThong}/{item.ThangTheoDoiHeThong}/{item.NamTheoDoiHeThong}</div>
                                <div>{item.NguoiTheoDoiHeThong}</div>
                            </div>
                            <div className="flex justify-center items-center cursor-pointer" onClick={() => handleNote(item)}>
                                <FaRegStickyNote />
                            </div>
                        </div>
                    );
                })}
            </div>
            {openNote && selectedItem && (
                <PopupNote handleClose={handleClose} list={selectedItem}/>
            )}
        </div>
    );
};

export default CalendarPage;