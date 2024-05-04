import React from 'react'
import { FaUsers } from "react-icons/fa6";
import { FaChartBar } from "react-icons/fa";
import ReactApexChart from "react-apexcharts";

function Dashboard() {
    return (
        <>
            <div className="flex justify-between mt-7 ">
                <div className=" h-32 w-64 bg-white shadow-xl text-xl font-bold pt-3 pl-3 text-center">
                    <div className="mt-7 flex pl-7 items-center ">
                        <FaUsers style={{ fontSize: "3em", color: "green" }} />
                        <div className="pl-14 text-lg">
                            Total Users
                            <p>4</p>
                        </div>
                    </div>
                </div>
                <div className=" h-32 w-64 bg-white shadow-xl text-xl font-bold pt-3 pl-3 text-center">
                    <div className="mt-7 flex pl-7 items-center ">
                        <FaUsers style={{ fontSize: "3em", color: "green" }} />
                        <div className="pl-14 text-lg">
                            {" "}
                            Partners
                            <p>hh</p>
                        </div>
                    </div>
                </div>

                <div className=" h-32 w-64 bg-white shadow-xl text-xl  font-bold pt-3  text-center">
                    <div className="mt-7 flex pl-7 items-center ">
                        <FaChartBar style={{ fontSize: "3em", color: "orange" }} />
                        <div className="pl-8 text-lg">
                            {" "}
                            Total Revenue
                            <p className="text-2xl text-sky-700">₹:589632</p>
                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}

export default Dashboard
