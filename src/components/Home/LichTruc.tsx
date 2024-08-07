import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ILichTruc } from 'model/LichTruc';
import { getLichTruc } from 'api/LichTruc';

const LichTruc = () => {
  const [lichtruc, setLichtruc] = useState<ILichTruc[]>([]);

    const fetchLichTruc = async () => {
        try{
            const res = await getLichTruc();
            setLichtruc(res.data);
        }catch (error) {
            console.error('Error fetching data: ', error);
          }
    };
    useEffect(() => {
        fetchLichTruc();
    }, []);
  return (
    <div>
      <h1>Lịch Trực</h1>
      <ul>
        {lichtruc.map(item => (
          <li key={item.LichID}>
             -{item.LichID}-{item.FullName}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LichTruc;
