import React from 'react'
import { useState,useEffect } from 'react'
import { Loadusers } from '../../Api/Adminapi';
import { Blockuser } from '../../Api/Adminapi';
function Users() {
    const [users, setUsers] = useState([]);

useEffect(()=>{
    Loadusers()
    .then((res)=>{
        const Res=res.data.User;
          setUsers(Res)
    }).catch((err)=>{
        console.log(err);
    })
},[])

const HandleClick =async (usersid)=>{
  try {
 await Blockuser({_id:usersid}).then((res)=>{
  if (res.status === 200) {
    setUsers((prevUsers)=>
    prevUsers.map((users)=>
    users._id === usersid ? {...users ,block :!users.block}:users
    )
    )
 }
});

  } catch (error) {
    console.error('Error blocking user:', error);
  }

}



  return (
   <>
   <div className="overflow-x-auto">
  <table className="min-w-full border border-gray-300">
    <thead>
      <tr>
        <th className="border border-gray-300 px-4 py-2">#</th>
        <th className="border border-gray-300 px-4 py-2">Name</th>
        <th className="border border-gray-300 px-4 py-2">Email</th>
        <th className="border border-gray-300 px-4 py-2">Action</th>
      </tr>
    </thead>
    <tbody>
        {users.map((user,index)=>(

      <tr key={user.id}>
        <td className="border border-gray-300 px-4 py-2">{index +1}</td>
        <td className="border border-gray-300 px-4 py-2">{user.userName}</td>
        <td className="border border-gray-300 px-4 py-2">{user.email}</td>
        <td className="border border-gray-300 px-4 py-2">{!user.block ?(
      <button onClick={()=>HandleClick(user._id)}> 
      <span>Block</span>
      </button>
        ):(
          <button onClick={()=>HandleClick(user._id)}> 
          <span>UnBlock</span>
          </button>
        )}
      </td>
      </tr>
              ))}

    </tbody>
  </table>
</div>

   
   </>
  )
}

export default Users
