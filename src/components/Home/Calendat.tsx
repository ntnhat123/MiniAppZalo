import { getCalendar } from "api/Calendar";
import { ICalendar } from "model/Calendar";
import React, { useEffect, useState } from "react";
import { BsChevronContract } from "react-icons/bs";

const CalendarPage = () => {
    const [list, setList] = useState<ICalendar[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedDay, setSelectedDay] = useState<string | null>(null);
    const [selectedMonth, setSelectedMonth] = useState<string | null>(null);
    const [selectedYear, setSelectedYear] = useState<string | null>(null);
    const [showToday,setShowtoday] = useState<boolean>(false) ;

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

    useEffect(() => {
        fetchCalendar();
    }, []);

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
        setShowtoday(!showToday)
    };

    const filteredList = list.filter(item => {
        const matchesDay = selectedDay ? item.NgayTheoDoiHeThong === selectedDay : true;
        const matchesMonth = selectedMonth ? item.ThangTheoDoiHeThong === selectedMonth : true;
        const matchesYear = selectedYear ? item.NamTheoDoiHeThong === selectedYear : true;

        const istoday = new Date().getDate().toString() === item.NgayTheoDoiHeThong && (new Date().getMonth() + 1).toString() === item.ThangTheoDoiHeThong && new Date().getFullYear().toString() === item.NamTheoDoiHeThong

        return matchesDay && matchesMonth && matchesYear && (!showToday || istoday);
    });

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="min-h-screen flex flex-col items-center p-4">
            <h1 className="text-2xl font-bold mb-4">Lịch Theo Dõi Hệ Thống</h1>
            <div className="mb-4 w-full h-full max-w-md items-center justify-center flex space-x-2">
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
                <div className="flex justify-between items-center text-2xl font-bold">
                    <div>
                        <h1>Người trực</h1>
                    </div>
                    <div className="justify-center items-center flex gap-2">
                        <input type="checkbox" className="w-5 h-5" name="" id="" checked={showToday} onClick={handleCheckboxChange} />
                        <label htmlFor="">Hôm nay</label>
                    </div>
                </div>
                {filteredList.map((item, index) => (
                    <div className="flex justify-between border mt-4 px-5 bg-white rounded-2xl p-4">
                        <div className="flex flex-col">
                            <h1 className="text-xl font-medium">{item.NguoiTheoDoiHeThong}</h1>
                            <h1 className="">{item.NgayTheoDoiHeThong}/{item.ThangTheoDoiHeThong}/{item.NamTheoDoiHeThong}</h1>
                        </div>
                        <div className="flex justify-center items-center">
                            <BsChevronContract />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default CalendarPage;
