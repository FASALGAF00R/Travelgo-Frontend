import React from 'react'
import { useState,useEffect } from 'react'
import { Loadusers } from '../../Api/Adminapi';
function Users() {
    const [users, setUsers] = useState([]);


useEffect(()=>{
    Loadusers()
    .then((res)=>{
        console.log("done n");
        const Res=res.data.User;
        setUsers(Res)
    }).catch((err)=>{
        console.log(err);
    })
},[])

  return (
   <>
   <div className="overflow-x-auto">
  <table className="min-w-full border border-gray-300">
    <thead>
      <tr>
        <th className="border border-gray-300 px-4 py-2">#</th>
        <th className="border border-gray-300 px-4 py-2">Name</th>
        <th className="border border-gray-300 px-4 py-2">Email</th>
        <th className="border border-gray-300 px-4 py-2">Status</th>
      </tr>
    </thead>
    <tbody>
        {users.map(Res=>(

      <tr key={Res.id}>
        <td className="border border-gray-300 px-4 py-2">{Res.id}</td>
        <td className="border border-gray-300 px-4 py-2">{Res.userName}</td>
        <td className="border border-gray-300 px-4 py-2">{Res.email}</td>
        <td className="border border-gray-300 px-4 py-2">Status</td>
      </tr>
              ))}

    </tbody>
  </table>
</div>

   
   </>
  )
}

export default Users
