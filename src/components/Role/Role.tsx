import { postRole } from 'api/Role';
import { useAuth } from 'context/authContext';
import { IRole } from 'model/Role';
import React, { useState } from 'react';

const Role = () => {
  const { user,roles } = useAuth();
  const [checkRole, setCheckRole] = useState<IRole>({
    UserRoleID: '',
    UserID:  '',
    RoleID: ''
  });
  const [response, setResponse] = useState<IRole[] | null>(null);

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
      const roleRes = await postRole(checkRole);
      if (roleRes && roleRes.data) {
          setResponse(roleRes.data);
          localStorage.setItem('@roles', JSON.stringify(roleRes.data));
      }
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
        value={checkRole.UserID}
        onChange={handleChange}
      />
      <button onClick={handleClick}>
        Check
      </button>
      
      {response && response.length > 0 && (
                        <div>
                            {response.map((res, index) => (
                                <div key={index} className=" border rounded">
                                    <div>
                                        <label className="block text-gray-600 font-semibold mb-2">RoleID</label>
                                        <input 
                                            type="email" 
                                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                                            value={res?.RoleID} 
                                            readOnly 
                                        />
                                        <label className="block text-gray-600 font-semibold mb-2">User RoleID</label>
                                        <input 
                                            type="email" 
                                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                                            value={res?.UserRoleID} 
                                            readOnly 
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
    </div>
  );
};

export default Role;
