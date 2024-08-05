import { getCategoryTask } from 'api/CategoryTask';
import { ICategoryTask } from 'model/CategoryTask';
import React, { useEffect, useState } from 'react';


const CategoryTask = () => {
  const [tasks, setTasks] = useState<ICategoryTask[]>([]);

  const fectchTasks = async () => {
    try {
      const res = await getCategoryTask();
      setTasks(res.data);
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  };

    useEffect(() => {
        fectchTasks();
    }, []);
  return (
    <div>
      <h1>Danh sách nhiệm vụ</h1>
      <ul>
        {tasks.map(task => (
          <li key={task.DanhMucNhiemVuID}>
            {task.DanhMucNhiemVuName} - {task.ThoiGianBatDau} đến {task.ThoiGianKetThuc}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryTask;
