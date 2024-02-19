import React, { useState, useEffect } from 'react'
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
} from "@material-tailwind/react";
import { Card, Typography } from "@material-tailwind/react";
import { Addcatgeory } from '../../Api/Adminapi';
import { Fetchcategory } from '../../Api/Adminapi';



function Packagecategory() {
    const [categoryName, setCategoryName] = useState('');
    const [category, setcategory] = useState([]);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(!open);



    useEffect(() => {
        Fetchcategory()
            .then((response) => {
                console.log(response.data, "success");
                setcategory(response.data.Category);
            })
            .catch((error) => {
                console.error('Error fetching categories:', error);
            });
    }, [])



    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await Addcatgeory({ categoryName: categoryName })
        } catch (error) {
            console.log('error got on adding category', error);
        }
        setCategoryName('');
        setOpen(false);
    };


    return (
        <>

            <div className="w-[100%] flex justify-end">
                <button onClick={handleOpen} className="bg-blue-gray-700 p-2  mt-10 mr-5 text-cyan-50 rounded-lg">Add Category
                </button>
            </div>
            <Dialog
                open={open}
                handler={handleOpen}
                animate={{
                    mount: { scale: 1, y: 0 },
                    unmount: { scale: 0.9, y: -100 },
                }}
            >
                <DialogHeader>Add category </DialogHeader>
                <DialogBody>
                    <div>
                        <form onSubmit={handleSubmit}>
                            <label htmlFor="categoryName" className="block text-sm font-light text-gray-700">Category Name</label>
                            <input
                                type="text"
                                id="categoryName"
                                name="categoryName"
                                value={categoryName}
                                onChange={(e) => setCategoryName(e.target.value)}
                                className="mt-1 p-2 block w-full shadow-sm sm:text-sm rounded-md border-gray-300 focus:border-gray-800 focus:ring focus:ring-cyan-200 focus:ring-opacity-50"
                            />
                        </form>

                    </div>
                </DialogBody>
                <DialogFooter>
                    <Button
                        variant="text"
                        color="red"
                        onClick={handleOpen}
                        className="mr-1"
                    >
                        <span>Cancel</span>
                    </Button>
                    <Button variant="gradient" color="green" onClick={handleSubmit}>
                        <span>Confirm</span>
                    </Button>
                </DialogFooter>
            </Dialog>
            <br />
            <br />

            <Card className="h-[50%] ml-20 w-[80%] overflow-scroll shadow-lg shadow-gray-800">
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
                                    Category
                                </Typography>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {category.map((cat, index) => (
                            <tr key={cat._id}>
                                <td className="p-4 border-b border-blue-gray-50 text-gray-700 font-bold ">
                                    {index + 1}
                                </td>

                                <td className="p-4 border-b border-blue-gray-50 text-gray-700">
                                    {cat.Name}
                                </td>

                            </tr>
                        ))}
                    </tbody>

                </table>
            </Card>

        </>
    )
}

export default Packagecategory
