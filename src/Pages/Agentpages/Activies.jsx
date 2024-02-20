import React, { useState, useEffect } from 'react';
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Card,
    Typography
} from "@material-tailwind/react";
import { Addactivity, Fetchactivies, UpdateActivity } from '../../Api/Agentapi';

function Activities() {
    const [open, setOpen] = useState(false);
    const [form, setFormdata] = useState('');
    const [edit, setEdit] = useState([]);
    const [selectedActivity, setSelectedActivity] = useState(null);

    useEffect(() => {
        try {
            Fetchactivies().then((res) =>
                setEdit(res.data)
            );
        } catch (error) {
            console.log("error occurred while fetching activities", error);
        }
    }, []);

    const handleOpen = (activity) => {
        setSelectedActivity(activity);
        if (activity) {
            setFormdata(activity.Activity);
        } else {
            setFormdata('');
        }
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedActivity(null);
        setFormdata('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.trim()) {
            console.log('Activity name is required');
            return;
        }
        try {
            if (selectedActivity) {
                await UpdateActivity(selectedActivity._id, { form: form });
            } else {
                await Addactivity({ form: form });
            }
            Fetchactivies().then((res) => setEdit(res.data));
        } catch (error) {
            console.log('error occurred while adding/updating activities', error);
        }
        handleClose();
    };
    

    return (
        <>
        <div className='flex justify-center font-extrabold'>
        <div className='flex justify-center'>
  <span className='font-extrabold text-blue-gray-700'>ACTIVITIES</span>
  <span className='font-extrabold text-gray-600'> MANAGEMENT</span>
</div>        </div>
            <div className="w-[100%] flex justify-end">
                <button onClick={() => handleOpen(null)} className="bg-blue-gray-700 p-2  mt-10 mr-5 text-cyan-50 rounded-lg">Add activity
                </button>
            </div>
            <Dialog
                open={open}
                onClose={handleClose}
                animate={{
                    mount: { scale: 1, y: 0 },
                    unmount: { scale: 0.9, y: -100 },
                }}
            >
                <DialogHeader>{selectedActivity ? 'Edit activity' : 'Add activity'}</DialogHeader>
                <DialogBody>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="Activity" className="block text-sm font-semibold text-gray-700">Activity Name</label>
                        <input
                            type="text"
                            id="Activity"
                            name="Activity"
                            value={form}
                            onChange={(e) => setFormdata(e.target.value)}
                            className="mt-1 p-2 block w-full shadow-sm sm:text-sm rounded-md border-gray-300 focus:border-gray-800 focus:ring focus:ring-cyan-200 focus:ring-opacity-50"
                        />
                    </form>
                </DialogBody>
                <DialogFooter>
                    <Button variant="text" color="red" onClick={handleClose} className="mr-1">
                        <span>Cancel</span>
                    </Button>
                    <Button variant="gradient" color="green" onClick={handleSubmit}>
                        <span>{selectedActivity ? 'Update' : 'Confirm'}</span>
                    </Button>
                </DialogFooter>
            </Dialog>

            <Card className="h-[50%] ml-20 w-[80%] overflow-scroll shadow-lg mt-20 shadow-gray-800">
                <table className="w-full min-w-max table-auto text-left">
                    <thead>
                        <tr>
                            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                <Typography variant="small" color="blue-gray" className="font-extrabold leading-none opacity-70">
                                    Numbers
                                </Typography>
                            </th>

                            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                <Typography variant="small" color="blue-gray" className="font-extrabold leading-none opacity-70">
                                    Activities
                                </Typography>
                            </th>

                            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                <Typography variant="small" color="blue-gray" className="font-extrabold leading-none opacity-70">
                                    Action
                                </Typography>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {edit.map((act, index) => (
                            <tr key={act._id}>
                                <td className="p-4 border-b border-blue-gray-50 text-gray-700 font-bold ">
                                    {index + 1}
                                </td>
                                <td className="p-4 border-b border-blue-gray-50 text-gray-700">
                                    {act.Activity}
                                </td>

                                <td className="p-4 border-b border-blue-gray-50 text-gray-700">
                                    <button
                                        onClick={() => handleOpen(act)}
                                        className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600"
                                    >
                                        Edit
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Card>
        </>
    );
}

export default Activities;
