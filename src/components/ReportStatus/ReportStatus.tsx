import { getReportStatus } from 'api/ReportStatus';
import { IReportStatus } from 'model/ReportStatus';
import React, { useEffect, useState } from 'react';


const StatusList = () => {
  const [statusData, setStatusData] = useState<IReportStatus[]>([]);

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
    }, []);

  return (
    <div>
      <h1>Danh sách trạng thái</h1>
      <ul>
        {statusData.map(status => (
          <li key={status.StatusID}>{status.StatusName}</li>
        ))}
      </ul>
    </div>
  );
};

export default StatusList;
