import React from 'react';
import { FaUsers,FaChartBar } from 'react-icons/fa';

function Dashboard() {
    const series = [{
        data: [1, 2, 3]
    }, {
        data: [5, 7, 11]
    }, {
        data: [13, 17, 19]
    }];

    return (
        <div className="mt-7 flex flex-col items-center">
            <div className="flex justify-between w-full">
                <div className="h-32 w-64 bg-white shadow-xl text-xl font-bold pt-3 pl-3 text-center">
                    <div className="flex items-center">
                        <FaUsers style={{ fontSize: '3em', color: 'green' }} />
                        <div className="ml-4 text-lg">
                            Total Users
                            <p>4</p>
                        </div>
                    </div>
                </div>
                <div className="h-32 w-64 bg-white shadow-xl text-xl font-bold pt-3 pl-3 text-center">
                    <div className="flex items-center">
                        <FaUsers style={{ fontSize: '3em', color: 'green' }} />
                        <div className="ml-4 text-lg">
                            Partners
                            <p>hh</p>
                        </div>
                    </div>
                </div>
                <div className="h-32 w-64 bg-white shadow-xl text-xl font-bold pt-3 pl-3 text-center">
                <div className="mt-7 flex pl-7 items-center">
                        <FaChartBar style={{ fontSize: '3em', color: 'orange' }} />
                        <div className="pl-8 text-lg">
                            Total Revenue
                            <p className="text-2xl text-sky-700">₹:589632</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-center mt-16 w-full ">
     
            </div>
        </div>
    );
}

export default Dashboard;
