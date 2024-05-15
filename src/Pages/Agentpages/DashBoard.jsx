import React, { useEffect, useState } from 'react';
import { FaUsers, FaChartBar, FaCashRegister } from 'react-icons/fa';
import ReactApexChart from 'react-apexcharts';
import { MonthlyAmount, Packagescount, Userscount } from '../../Api/Agentapi';
import { useSelector } from 'react-redux';
import { IoBag } from "react-icons/io5";




function Dashboard() {
    const agentselector = useSelector(state => state.agent.agentInfo)
    const agentid = agentselector.id;


    const [userCount, setUserCount] = useState(0);
    const [packCount, setpackCount] = useState(0);
    const [monthlyAmounts, setMonthlyAmounts] = useState([]);


    const chartOptions = {
        chart: {
            id: 'basic-bar',
            toolbar: {
                show: false // Hides the chart toolbar
            }
        },
        xaxis: {
            categories: [
                'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
            ], // Categories for all months
        },
        tooltip: {
            enabled: true,
            shared: true,
            intersect: false,
            y: {
                formatter: function (value) {
                    return "₹ " + value.toFixed(2);
                }
            }
        },
    };

    // Ensure monthlyAmounts includes data for all months
    const chartSeries = [{
        name: 'Monthly Revenue',
        data: Array.from({ length: 12 }, (_, index) => {
            const monthData = monthlyAmounts.find(month => month.month === index + 1);
            return monthData ? monthData.totalamount : 0;
        })
    }];

    useEffect(() => {

        const fetchUserCount = async () => {
            try {
                const response = await Userscount(agentid);
                setUserCount(response.data.count);
                const Response = await Packagescount(agentid);
                setpackCount(Response.data)
                const Montlyresponse = await MonthlyAmount(agentid);
                setMonthlyAmounts(Montlyresponse.data.monthlyAmounts);

            } catch (error) {
                console.error('Error fetching user count:', error);
            }
        };

        fetchUserCount();
    }, [agentid]);

    console.log(packCount, "packCount");

    console.log(monthlyAmounts, "monthlyAmounts");

    return (
        <>
            <div className="flex justify-between mt-7">
                <div className="h-28 ml-10 w-64 bg-blue-gray-100 shadow-xl text-xl font-bold  pl-1 text-center rounded-2xl">
                    <div className=" mt-7 flex pl-7 items-center">
                        <FaUsers className='text-gray-800 size-14' />
                        <div className="pl-10    text-lg">
                            Total users
                            {userCount > 0 ? (
                                <p className="text-2xl text-sky-700"> {userCount} </p>
                            ) : (
                                <p className="text-2xl text-sky-700">₹: 0 </p>
                            )}

                        </div>
                    </div>
                </div>
                <div className="h-28 ml-10 w-64 bg-blue-gray-100 shadow-xl text-xl font-bold  pl-1 text-center rounded-2xl">
                    <div className="mt-7 flex pl-7 items-center">
                        <IoBag className='text-gray-800 size-14' />
                        <div className="pl-6 text-lg">
                            Total packages
                            {packCount === 0 ? (
                                <p className="text-2xl text-sky-700">₹: 0 </p>

                            ) : (
                                <p className="text-2xl text-sky-700">₹: {packCount.packagesCount} </p>
                            )}

                        </div>
                    </div>
                </div>
                <div className="h-28 ml-10 w-64 bg-blue-gray-100 shadow-xl text-xl font-bold  mr-7 text-center rounded-2xl">
                    <div className="mt-7 flex pl-7 items-center">
                        <FaCashRegister className='text-green-900 size-14' />
                        <div className="pl-8 text-lg">
                            Total Revenue
                            {packCount === 0 ? (
                                <p className="text-2xl text-sky-700">₹: 0 </p>

                            ) : (
                                <p className="text-2xl text-sky-700">₹: {packCount.Amount} </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-10"></div>

            <div className=" bg-blue-gray-50  shadow-xl p-5 py-12" style={{ maxWidth: '80%', margin: '0 auto' }}>

                {monthlyAmounts.length > 0 ? (
                    <ReactApexChart options={chartOptions} series={chartSeries} type="bar" height={350} />
                ) : (
                    <div className="text-center text-red-600 font-bold">No monthly revenues available!</div>
                )}            </div>

        </>
    );
}

export default Dashboard;
