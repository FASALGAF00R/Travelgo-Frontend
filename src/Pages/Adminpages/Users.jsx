import React from 'react'
import { useState, useEffect } from 'react'
import { Loadusers } from '../../Api/Adminapi';
import { Blockuser } from '../../Api/Adminapi';
function Users() {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(2);
  
  useEffect(() => {
    const fetchData=async()=>{
      console.log("page loaded");
      try {
        const Response =await Loadusers()
        const Res = Response.data.User;
        setUsers(Res)
      } catch (error) {
        console.error('Error fetching users:', error);

      }
    }
    fetchData()
      
  }, [])

  const HandleClick = async (usersid) => {
    try {
      await Blockuser({ _id: usersid }).then((res) => {
        if (res.status === 200) {
          setUsers((prevUsers) =>
            prevUsers.map((user) =>
              user._id === usersid ?
                { ...user, isBlock: !user.isBlock } : user
            )
          )
        }
      });

    } catch (error) {
      console.error('Error blocking user:', error);
    }

  }


  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser)


  const paginate = (pageNumber) => setCurrentPage(pageNumber);



  return (
    <>

      <div className="flex justify-center font-extrabold">
        <span className='text-gray-800'>Users</span>
        <span className='font-extrabold text-gray-600'>management</span>
      </div>
      <br />
      <div className="flex justify-center ">
        {users.length > 0 ? (
          <table className=" border  border-gray-300 font-thin   shadow-gray-800 shadow-md" style={{ maxHeight: '300px', overflowY: 'auto' }}>
            <thead className='bg-blue-gray-700 text-white'>
              <tr>
                <th className="border border-gray-500 px-4 py-2">No</th>
                <th className="border border-gray-300 px-4 py-2">Name</th>
                <th className="border border-gray-300 px-4 py-2">Email</th>
                <th className="border border-gray-300 px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.map((user, index) => (
                <tr key={user.id}>


                  <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
                  <td className="border border-gray-300 px-4 py-2">{user.userName}</td>
                  <td className="border border-gray-300 px-4 py-2">{user.email}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    {!user.isBlock ? (
                      <button onClick={() => HandleClick(user._id)}
                        className="bg-green-700 text-white px-2 py-1 rounded-md"

                      >
                        <span>Unblock</span>
                      </button>
                    ) : (
                      <button onClick={() => HandleClick(user._id)}
                        className="bg-red-700 text-white px-2 py-1 rounded-md"

                      >
                        <span>Block</span>
                      </button>
                    )}
                  </td>
                </tr>
              ))}

            </tbody>
          </table>

        ) : (
          <p className='text-red-700'>No users available !</p>
        )}
      </div>
      <div className="flex justify-center mt-96">
        <ul className="flex">
          {Array.from({ length: Math.ceil(users.length / usersPerPage) }).map((_, index) => (
            <li key={index} className="mr-3">
              <button onClick={() => paginate(index + 1)} className="bg-blue-gray-800 hover:bg-blue-gray-600 px-5 py-1 text-white rounded-md">{index + 1}</button>
            </li>
          ))}
        </ul>
      </div>

    </>



  )
}

export default Users


