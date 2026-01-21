import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import Popup from './detelePopup';

const UserSettings: React.FC = () => {
  interface User {
    id: number;
    email: string;
    permission: string;
    password: string;
  }

  const permissionOptions = ['admin', 'restricted'];
  const [users, setUsers] = useState<User[]>([]);
  const [newPermission, setNewPermission] = useState<{ [key: number]: string }>({});
  const [newPassword, setNewPassword] = useState<{ [key: number]: string }>({});
  const userId = sessionStorage.getItem('idToken')
  const [popup, setPopup]= useState<boolean>(false)
  const [delteId,setDeleteId]=useState<number | undefined>()

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/allusers');
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        const data: User[] = await response.json();
        setUsers(data);

        const initialPermissions: { [key: number]: string } = {};
        const initialPasswords: { [key: number]: string } = {};
        data.forEach((user) => {
          initialPermissions[user.id] = user.permission;
          initialPasswords[user.id] = user.password;
        });
        setNewPermission(initialPermissions);
        setNewPassword(initialPasswords);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, [popup]);

  const handlePasswordChange = (userId: number, newPasswordValue: string) => {
    setNewPassword((prevState) => ({
      ...prevState,
      [userId]: newPasswordValue,
    }));
  };

  const handlePermissionChange = (userId: number, newPermissionValue: string) => {
    setNewPermission((prevState) => ({
      ...prevState,
      [userId]: newPermissionValue,
    }));
  };

  const handleSave = async () => {
    try {
      const updatedUsers = users.map((user) => ({
        id: user.id,
        permission: newPermission[user.id],
        password: newPassword[user.id],
      }));
      console.log({updatedUsers})
      const response = await fetch('http://localhost:8080/api/updateuser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({updatedUsers}),
      });

      if (!response.ok) {
        console.log('response was not ok')
      }

     
    } catch (error) {
        console.log('generic error')
    }
  };

  const handleDelete = async(deleteId:number | undefined)=>{
    console.log(deleteId);
    const response = await fetch('http://localhost:8080/api/deleteuser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({deleteId}),
    });

    if (!response.ok) {
      console.log('response was not ok')
    }
  }

  
  return (
    <div className='w-full h-screen flex justify-center items-center' >
      <Popup callPopup={popup} message='Are you sure you want to delete this user?' onDelete={()=>{handleDelete(delteId)}} onCancel={()=>{setPopup(false)}}/>
    <div className='max-h-[70%]'>
      <h1 className='text-[38px] uppercase font-itcfranklinbold tracking-[1px]'>User Settings</h1>
      <table className='table-auto overflow-scroll'>
        <thead className=''>
          <tr>
            <th className='border-[1px] text-[20px] px-[12px] py-[4px] border-black'>ID</th>
            <th className='border-[1px] text-[20px] px-[12px] py-[4px] border-black'>Email</th>
            <th className='border-[1px] text-[20px] px-[12px] py-[4px] border-black'>Password</th>
            <th className='border-[1px] text-[20px] px-[12px] py-[4px] border-black'>Permission</th>
            <th className='border-[1px] text-[20px] px-[12px] py-[4px] border-black'>Delete Users</th>

          </tr>
        </thead>
        <tbody>
          {users.map((user,index) => (
            <tr key={user.id} className={`border border-gray-900 border-[1px] border-black ${
              index % 2 === 1 ? "bg-gray-200" : ""
            }`}>
              <td className='p-[4px] font-itcfranklinnormal text-[20px]'>{user.id}</td>
              <td className='p-[4px] font-itcfranklinnormal text-[20px]'>{user.email}</td>
              <td className='p-[4px] font-itcfranklinnormal text-[20px]'>
                <input className={`focus:outline-none ${
              index % 2 === 1 ? "bg-gray-200" : ""}`}
                  type="text"
                  value={newPassword[user.id] || ''}
                  onChange={(e) => handlePasswordChange(user.id, e.target.value)}
                />
              </td>
              <td className='p-[4px] font-itcfranklinnormal text-[20px]'>
                <select className={`${
              index % 2 === 1 ? "bg-gray-200" : ""}`}
                  value={newPermission[user.id] || ''}
                  onChange={(e) => handlePermissionChange(user.id, e.target.value)}
                >
                  {permissionOptions.map((permission) => (
                    <option key={permission} value={permission}>
                      {permission}
                    </option>
                  ))}
                </select>
              </td>
              <td>
                <button onClick={()=>{setPopup(true), setDeleteId(user.id)}} className='p-[4px] font-itcfranklinnormal text-[20px] hover:text-red-600'>Delete User</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className='flex justify-between items-end'>
      <button onClick={handleSave} className='tracking-[1px] bg-black text-white uppercase font-itcfranklinnormal py-[8px] px-[24px] mt-[24px]'>
        Save Changes
      </button>
      <Link to={`/editor?userId=${userId}`} className='underline'>Cancel</Link>
      </div>
      </div>
    </div>
  );
};

export default UserSettings;
