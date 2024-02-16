import React from 'react'
import { useState, useEffect } from 'react'
import { Loadusers } from '../../Api/Adminapi';
import { Blockuser } from '../../Api/Adminapi';
function Users() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    Loadusers()
      .then((res) => {
        const Res = res.data.User;
        setUsers(Res)
      }).catch((err) => {
        console.log(err);
      })
  }, [])

  const HandleClick = async (usersid) => {
    try {
      await Blockuser({ _id: usersid }).then((res) => {
        if (res.status === 200) {
          setUsers((prevUsers) =>
            prevUsers.map((user) =>
              user._id === usersid ? { ...user, isBlock: !user.isBlock } : user
            )
          )
        }
      });

    } catch (error) {
      console.error('Error blocking user:', error);
    }

  }



  return (

    <div className='bg-blue-gray-800  w-[100%] h-[10%] border-t-8 mr-40  p-8 shadow-lg rounded-md'  >

      <div className="flex  justify-center mt-40 mx-60 ">
        <table className=" border border-gray-300 rounded-md overflow-hidden shadow-gray-800 shadow-md" style={{ height: '200px', width: '100p%' }}>
          <thead className='bg-blue-gray-700 text-white'>
            <tr>
              <th className="border border-gray-500 px-4 py-2">#</th>
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Email</th>
              <th className="border border-gray-300 px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (

              <tr key={user.id}>
                <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
                <td className="border border-gray-300 px-4 py-2">{user.userName}</td>
                <td className="border border-gray-300 px-4 py-2">{user.email}</td>
                <td className="border border-gray-300 px-4 py-2">
                  {!user.isBlock ? (
                  <button onClick={() => HandleClick(user._id)}
                    className="bg-red-500 text-white px-2 py-1 rounded-md"

                  >
                    <span>Block</span>
                  </button>
                ) : (
                  <button onClick={() => HandleClick(user._id)}
                    className="bg-green-500 text-white px-2 py-1 rounded-md"

                  >
                    <span>UnBlock</span>
                  </button>
                )}
                </td>
              </tr>
            ))}

          </tbody>
        </table>
      </div>
    </div>


  )
}

export default Users
