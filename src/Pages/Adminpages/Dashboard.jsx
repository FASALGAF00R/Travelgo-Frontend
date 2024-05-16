import React, { useEffect, useState } from 'react';
import { FaUsers, FaCashRegister } from 'react-icons/fa';
import { IoBag } from "react-icons/io5";
import ReactApexChart from 'react-apexcharts';
import { adminAgentscount, adminMonthlyAmount, adminPackagescount, adminUserscount, adminpaymenttypes } from '../../Api/Adminapi';


function Dashboard() {

    const [Usercount, setUserCount] = useState(0)
    const [Agentcount, setAgentCount] = useState(0)
    const [packCount, setpackCount] = useState(0)
    const [totalRevenue, setTotalRevenue] = useState(0); // State to store the total revenue

    // const [paymentData, setPaymentData] = useState({
    //     stripe: 0,
    //     wallet: 0
    // });

    const [monthlyRevenue, setMonthlyRevenue] = useState({
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const responseUsers = await adminUserscount();
                setUserCount(responseUsers.data.userCount);

                const responseAgents = await adminAgentscount();
                setAgentCount(responseAgents.data.agentCount);

                const responsePackages = await adminPackagescount();
                setpackCount(responsePackages.data.packagesCount);

                const responseMonthly = await adminMonthlyAmount();
                const totalAmount = responseMonthly.data.monthlyCount[0]?.totalamount || 0;
                const monthlyData = responseMonthly.data.monthlyCount;
                setTotalRevenue(totalAmount);

            
                // Initialize an array to hold monthly revenue data for all months
                const updatedData = Array.from({ length: 12 }, () => 0);

                // Map through the monthly data and update the corresponding month's revenue
                monthlyData.forEach(item => {
                    updatedData[item.month - 1] = item.totalamount;
                });

                setMonthlyRevenue(prevState => ({
                    ...prevState,
                    data: updatedData
                }));
                setMonthlyRevenue(prevState => ({
                    ...prevState,
                    data: updatedData
                }));

                //   const responsePayment = await adminpaymenttypes();
                //   setPaymentData(responsePayment.data.paymenttypes);


            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [Usercount, Agentcount, packCount]);














    return (
        <>
            <div className="container mx-auto">
                <div className="flex flex-wrap justify-between mt-7">
                    <div className="w-full sm:w-auto mb-4 sm:mb-0 sm:mr-4">
                        <div className="h-28 bg-blue-gray-100 shadow-xl text-xl font-bold ml-5 text-center rounded-2xl">
                            <div className="mt-7 flex pl-7 items-center">
                                <FaUsers className='text-gray-800 size-14' />
                                <div className=" p-6 text-lg">
                                    Total users
                                    <p>{Usercount}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full sm:w-auto mb-4 sm:mb-0 sm:mr-4">
                        <div className="h-28 bg-blue-gray-100 shadow-xl text-xl font-bold pl-1 text-center rounded-2xl">
                            <div className="mt-7 flex pl-7 items-center ">
                                <IoBag className='text-gray-800 size-14 ' />
                                <div className="p-6 text-lg">
                                    Total packages
                                    <p className="text-2xl text-sky-700">{packCount}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full sm:w-auto mb-4 sm:mb-0 sm:mr-4">
                        <div className="h-28 bg-blue-gray-100 shadow-xl text-xl font-bold pl-1 text-center rounded-2xl">
                            <div className="mt-7 flex pl-7 items-center">
                                <FaCashRegister className='text-green-900 size-14' />
                                <div className="p-6 text-lg">
                                    Total Revenue
                                    <p className="text-2xl text-sky-700">{Number(totalRevenue)}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full sm:w-auto mb-4 sm:mb-0 sm:mr-4">
                        <div className="h-28 bg-blue-gray-100 shadow-xl text-xl font-bold pl-1 text-center rounded-2xl">
                            <div className="mt-7 flex pl-7 items-center">
                                <FaUsers className='text-green-900 size-14' />
                                <div className="p-6 text-lg">
                                    Total agents
                                    <p className="text-2xl text-sky-700">{Agentcount}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-center font-semibold mt-10">Monthly revenues</div>

                <br />
                <div className="bg-blue-gray-50 shadow-xl p-5 py-12 relative" style={{ maxWidth: '80%', margin: '0 auto' }}>
                    <ReactApexChart
                        options={{
                            chart: {
                                id: 'line-chart',
                                toolbar: {
                                    show: false
                                }
                            },
                            xaxis: {
                                categories: monthlyRevenue.categories
                            }
                        }}
                        series={[{
                            name: 'Monthly Revenue',
                            data: monthlyRevenue.data
                        }]}
                        type="line"
                        height={350}
                    />
                </div>


                {/* <div className="flex justify-center font-semibold mt-10">Payment Distribution</div>

                <div className="bg-blue-gray-50 shadow-xl p-5 py-12 relative" style={{ maxWidth: '80%', margin: '0 auto' }}>
                    <ReactApexChart
                        options={{
                            chart: {
                                type: 'donut',
                                id: 'donut-chart',
                            },
                            labels: ['Stripe', 'Wallet'],
                            dataLabels: {
                                enabled: true,
                                formatter: function (val, opts) {
                                    return `${opts.seriesName}: ${opts.value}%`;
                                }
                            },
                            plotOptions: {
                                pie: {
                                    donut: {
                                        labels: {
                                            show: true,
                                            total: {
                                                show: true
                                            }
                                        }
                                    }
                                }
                            },
                            legend: {
                                position: 'bottom'
                            }
                        }}
                        series={[paymentData.stripe, paymentData.wallet]}
                        type="donut"
                        height={350}
                    />
                </div> */}






            </div>
        </>
    );
}

export default Dashboard;
