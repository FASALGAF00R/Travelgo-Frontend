import React, { useState, useEffect } from 'react'
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
} from "@material-tailwind/react";
import { Card, Typography } from "@material-tailwind/react";
import { Addcatgeory, Fetchcategory, Editcategory, Blockcat } from '../../Api/Adminapi';



function Packagecategory() {
    const [categoryName, setCategoryName] = useState('');
    const [category, setcategory] = useState([]);
    const [open, setOpen] = useState(false);
    const [mode, setMode] = useState('add');
    const [editCategoryId, setEditCategoryId] = useState(null);
    const [existingCategories, setExistingCategories] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    const handleOpen = () => {
        setOpen(!open);
        setMode('add');
        setCategoryName('')
        setErrorMessage('')
    }



    useEffect(() => {
        Fetchcategory()
            .then((response) => {
                setcategory(response.data.Category);
                setExistingCategories(response.data.Category.map(cat => cat.Name));

            })
            .catch((error) => {
                console.error('Error fetching categories:', error);
            });
    }, [])



    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const trimmedCategoryName = categoryName.trim();
    
        if (!trimmedCategoryName) {
            setErrorMessage('Category name cannot be empty!');
            return;
        }
        setErrorMessage('');
    
        if (existingCategories.includes(trimmedCategoryName)) {
            setErrorMessage('Category already exists!');
            return;
        }
        setErrorMessage('');
    
        try {
            if (mode === 'add') {
                const response = await Addcatgeory({ categoryName: trimmedCategoryName });
                setcategory((prev) => [...prev, response.data.newCategory]);
            } else if (mode === 'edit') {
                const response = await Editcategory(editCategoryId, trimmedCategoryName);
                if (response.status === 201) {
                    setcategory((prevcat) =>
                        prevcat.map((catry) =>
                            catry._id === editCategoryId ? { ...catry, Name: trimmedCategoryName } : catry
                        )
                    );
                } else {
                    console.log('Error editing category');
                }
            }
        } catch (error) {
            console.log('error got on adding/editing category', error);
        }
    
        setCategoryName('');
        setEditCategoryId(null);
        setMode('add');
        setOpen(false);
    
        try {
            const updatedCategories = await Fetchcategory();
            setcategory(updatedCategories.data.Category);
            setExistingCategories(updatedCategories.data.Category.map(cat => cat.Name));
        } catch (error) {
            console.error('Error fetching updated categories:', error);
        }
    };
    



    const Handleblock = async (catid) => {
        try {
            const res = await Blockcat({ _id: catid }).then((res) => {
                console.log(res, "ooo");
                if (res.status) {
                    setcategory((prevcat) =>
                        prevcat.map((catry) =>
                            catry._id === catid ?
                                { ...catry, isBlock: !catry.isBlock } : catry
                        )
                    )
                }
            });


        } catch (error) {
            console.error('Error blocking user:', error);
        }

    }



    const handleEdit = (catId) => {
        const categoryToEdit = category.find(cat => cat._id === catId);
        if (categoryToEdit) {
            setCategoryName(categoryToEdit.Name);
            setEditCategoryId(catId);
            setMode('edit');
            setOpen(true);
        }
    };





    return (
        <>

            <div className="flex justify-center font-extrabold">
                <span className='text-gray-800 '>Category</span>
                <span className='font-extrabold text-gray-600'>management</span>
            </div>

            <div className="w-[100%] flex justify-end">
                <button onClick={handleOpen} className="bg-blue-gray-700 p-2 hover:scale-y-110 mt-10 mr-5 text-cyan-50 rounded-lg">Add Category
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
                <DialogHeader>{mode === 'add' ? 'Add category' : 'Edit category'}</DialogHeader>
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
                        {errorMessage && (
                            <div className="text-red-600">{errorMessage}</div>
                        )}
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
                    <Button  className=' bg-blue-gray-700' onClick={handleSubmit}>
                        <span>{mode === 'add' ? 'Add' : 'Save'}</span>
                    </Button>
                </DialogFooter>
            </Dialog>
            <br />
            <br />



                <Card className="h-[50%] ml-20 w-[80%] overflow-scroll shadow-lg shadow-gray-900 ">
                    {category.length > 0 ? (
                        <table className="w-full min-w-max table-auto text-left  ">
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
                                    <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                        <Typography variant="small" color="blue-gray" className="font-extrabold leading-none opacity-70">
                                            Action
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
                                        <td className="p-4  bg-white" >
                                            {cat.isBlock ? (
                                                <Button className='   bg-red-600 hover:scale-y-110'
                                                    onClick={() => Handleblock(cat._id)}
                                                >
                                                    block
                                                </Button>
                                            ) : (
                                                <Button className='  bg-green-600 hover:scale-y-110'

                                                    onClick={() => Handleblock(cat._id)}
                                                >
                                                    UnBlock
                                                </Button>
                                            )}
                                            <Button className='ml-5 bg-blue-600 hover:scale-y-110 text-white'
                                                onClick={() => handleEdit(cat._id)}
                                            >
                                                Edit
                                            </Button>


                                        </td>


                                    </tr>
                                ))}
                            </tbody>

                        </table>
                    ) : (
                        <p className=' text-red-700 flex  justify-center'>No categorys available !</p>

                    )}
                </Card>

        </>
    )
}

export default Packagecategory
