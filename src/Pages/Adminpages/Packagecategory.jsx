import React, { useState } from 'react'
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
} from "@material-tailwind/react";


function Packagecategory() {

    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(!open);



    return (
        <>
            <div className="w-[100%] flex justify-end">
                <button onClick={handleOpen} className="bg-blue-gray-700 p-3 mt-5 mr-5  text-cyan-50 rounded-lg">Add Category
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
                        <label htmlFor="categoryName" className="block text-sm font-medium text-gray-700">Category Name</label>
                        <input
                            type="text"
                            id="categoryName"
                            name="categoryName"
                            // value={categoryName}
                            // onChange={(e) => setCategoryName(e.target.value)}
                            className="mt-1 p-2 block w-full shadow-sm sm:text-sm rounded-md border-gray-300 focus:border-cyan-300 focus:ring focus:ring-cyan-200 focus:ring-opacity-50"
                        />
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
                    <Button variant="gradient" color="green" onClick={handleOpen}>
                        <span>Confirm</span>
                    </Button>
                </DialogFooter>
            </Dialog>

        </>
    )
}

export default Packagecategory
