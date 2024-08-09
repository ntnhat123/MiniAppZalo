import { postRole } from 'api/Role';
import { useAuth } from 'context/authContext';
import { IRole } from 'model/Role';
import React, { useState } from 'react';

const Role = () => {
  const { user } = useAuth();
  const [checkRole, setCheckRole] = useState<IRole>({
    UserRoleID: '',
    UserID: user?.UserID || '',
    RoleID: ''
  });
  const [response, setResponse] = useState<IRole | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCheckRole({
      ...checkRole,
      [name]: value
    });
  };

  const handleClick = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await postRole(checkRole);
      setResponse(result.data); 
    } catch (error) {
      console.error('Error saving log:', error);
    }
  };

  return (
    <div>
      <h1>Danh sách role</h1>
      <input
        className="shadow appearance-none border rounded w-full md:w-2/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        type="text"
        name="UserID"
        readOnly
        value={checkRole.UserID}
        onChange={handleChange}
      />
      <button onClick={handleClick}>
        Check
      </button>
      
      {response && (
        <div>
          <h1>Role ID: {response.RoleID}</h1>
          <h1>User Role ID: {response.UserRoleID}</h1>
        </div>
      )}
    </div>
  );
};

export default Role;
