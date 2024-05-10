import Userinterception from '../Interceptors/Userinterceptors.jsx'
const userapi = Userinterception




export async function signupData(data) {
    console.log(data);
    try {
        const userdata = await userapi.post('/signup', data)
        return userdata
    } catch (err) {
        console.log(err);
    }
}


export async function Userlogin(logindata) {
    try {
        const Data = await userapi.post('/login', logindata)
        return Data
    } catch (error) {
        console.log(error);
    }
}


export async function UserVerify(token) {
    try {
        const Data = await userapi.post(`/verify/${token}`)
        return Data
    } catch (error) {
        console.log(error);
    }
}

// goole login 

export async function Googledata(googledata) {
    try {
        const result = await userapi.post('/googlelogin', googledata)
        return result
    } catch (error) {
        console.log(error)
    }
}



// forgot pass
export async function Forgot(forgotpassdata,role) {
    console.log(forgotpassdata,role);
    try {
        const result = await userapi.post('/forgotpass', {data:forgotpassdata,role:role})
        return result
    } catch (error) {
        console.log(error);
    }
}


// otpverfication 

export async function Otpdata(verifydata) {
    try {
        const result = await userapi.get('/otpverify',{params:verifydata },)
        return result
    } catch (error) {
        console.log(error);
    }
}


export async function Otpresend(data) {
    try {
        const result = await userapi.post('/otpresend', data)
        return result
    } catch (error) {
        console.log(error);
    }
}



export async function Newpassword(data) {
    try {
        const result = await userapi.put('/newpass', data)
        return result
    } catch (error) {
        console.log(error);
    }
}



export async function Profile(data) {
    try {
        const result = await userapi.post('/profile', data, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
        return result
    } catch (error) {
        console.log(error);
    }
}


export async function resetPassword(data) {
    try {
        const response = await userapi.post('/resetpass', data)
        return response

    } catch (error) {
        console.log(error);
    }
}


export async function getuser(data) {
    console.log(data);
    try {
        const result = await userapi.get(`/user/${data}`)
        return result
    } catch (error) {
        console.log(error);
    }
}

export async function getaddress(id) {
    console.log(id,"id");
    try {
        const result = await userapi.get(`/getaddress/${id}`)
        return result
    } catch (error) {
        console.log(error);
    }
}








export async function Placedata(page,limit) {
    try {
        const result = await userapi.get('/getplaces',{params:{page,limit}})
        return result
    } catch (error) {
        console.log(error);
    }
}



export async function Searchplaces(data) {
    try {
        const result = await userapi.post('/searchplaces',data)
        return result
    } catch (error) {
        console.log(error);
    }
}

export async function UserChecking(data) {
    try {
        const result = await userapi.get(`/checkinguser/${data}`);
        return result

    } catch (error) {
        console.log(error);

    }
}


export async function fetchpackages(id) {
    try {
        const result = await userapi.get(`/packages/${id}`)
        return result
    } catch (error) {
        console.log(error);
    }
}




export async function fetchdata(id) {
    try {
        const result = await userapi.get(`/packagesdetails/${id}`)
        return result
    } catch (error) {
        console.log(error);
    }
}



export async function FetchCategory() {
    try {
        const result = await userapi.get('/categories')
        return result
    } catch (error) {
        console.log(error);
    }
}


export async function fetchpackagescat(placeId,categoryname) {
    try {
        const result = await userapi.get(`/catpackages/${placeId}/${categoryname}`)
        return result
    } catch (error) {
        console.log(error);
    }
}



export async function paymentRequest(packId) {
    try {
        const result = await userapi.get(`/paymentreq/${packId}`)
        return result
    } catch (error) {
        console.log(error);
    }
}


export async function Userbookingdata(form,totalAmount,userid,agentid,packageId,paymentDate) {
    try {
        const requestData = {
            formData: form,
            totalAmount: totalAmount,
            userId: userid,
            agentId: agentid,
            packageId: packageId,
            paymentDate:paymentDate
          };
        const result = await userapi.post('/bookingdata',requestData)
        return result
    } catch (error) {
        console.log(error);
    }
}




export async function fetchBookings() {
    try {
        const result = await userapi.get('/fetchbookings')
        return result
    } catch (error) {
        console.log(error);
    }
}


export async function CancelBookPayment(bookingid,userid,agentid) {
    try {
        const result = await userapi.put('/cancelbookings',{userid,bookingid,agentid})
        return result
    } catch (error) {
        console.log(error);
    }
}

// forwallet

export async function fetchuserdata(id) {
    try {
        const result = await userapi.get(`/userwallet/${id}`)
        console.log(result);
        return result
    } catch (error) {
        console.log(error);
    }
}





export async function walletPayment(contact, address, state,totalAmount, packageId, userid, agentid, country, city, paymentDate) {
    try {
        const requestData = {
            contact: contact,
            address: address,
            totalAmount: totalAmount,
            packageId: packageId,
            userid: userid,
            agentid: agentid,
            country: country,
            city: city,
            state:state,
            paymentDate: paymentDate
        };

        const result = await userapi.post('/walletpayment', requestData);
        return result;
    } catch (error) {
        console.log(error);
    }
}


export async function fetchallBookings() {
    try {
        const result = await userapi.get('/fetchallbookings')
        return result
    } catch (error) {
        console.log(error);
    }
}





export async function displayPackageDetails(packageId) {
    try {
        const result = await userapi.get(`/fetchpackagedetails/${packageId}`)
        return result
    } catch (error) {
        console.log(error);
    }
}



export async function submitReview(packageId,agentId, userId, reviewText, rating) {
    try {
        const result = await userapi.post('/submitReview', {
            packageId: packageId,
            agentId:agentId,
            userId: userId,
            reviewText: reviewText,
            rating: rating
        });
        return result;
    } catch (error) {
        console.log(error);
        throw error; 
    }
}
