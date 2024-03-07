import Userinterception from '../Interceptors/Userinterceptors.jsx'
const userapi = Userinterception




export async function signupData(data) {
    console.log(data);
    try {
        const userdata = await userapi.post('/signup', data)
        console.log(userdata, ";");
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
export async function Forgot(forgotpassdata) {
    try {
        const result = await userapi.post('/forgotpass', forgotpassdata)
        console.log(result, "ggggggggggggggggggggg");
        return result
    } catch (error) {
        console.log(error);
    }
}


// otpverfication 

export async function Otpdata(verifydata) {
    console.log(verifydata,"...");
    try {
        const result = await userapi.get('/otpverify',{params:verifydata },)
        console.log(result, "ooiiiooioo");
        return result
    } catch (error) {
        console.log(error);
    }
}


export async function Otpresend(data) {
    console.log("ethii", data);
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
    console.log(data, "opp33333333333333333p");
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
    console.log("okkkkkkkkkkkkkkkkk", data);
    try {
        console.log("ethii");
        const response = await userapi.post('/resetpass', data)
        console.log(response, "....");
        return response

    } catch (error) {
        console.log(error);
    }
}


export async function getuser(data) {
    console.log(data);
    try {
        const result = await userapi.get(`/user/${data}`)
        console.log(result);
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

UserChecking

export async function UserChecking(data) {
    console.log(data,"///////////fdf///////");
    try {
        const result = await userapi.get(`/checkinguser/${data}`);
        return result

    } catch (error) {
        console.log(error);

    }
}