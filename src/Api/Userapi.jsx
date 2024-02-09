import axios from "axios";




// backend data url
const userapi = axios.create({
    baseURL: 'http://localhost:3000',
    withCredentials: true,
})

// stored token in local
const token = localStorage.getItem("accesToken")



// Set up headers with the token
const Configtoken = {
    headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
    }

}




// Attach the headers to the axios instance 
userapi.defaults.headers = Configtoken.headers




export async function signupData(data) {
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
export async function Forgot(forgotpassdata) {
    console.log(forgotpassdata,";;;;;;;;;;;;;;;;;"); 
    try {
        const result = await userapi.post('/forgotpass', forgotpassdata)
        console.log(result,"ggggggggggggggggggggg");
        return result
    } catch (error) {
        console.log(error);
    }
}


// otpverfication 

export async function Otpdata(verifydata){
   try {
    const result = await userapi.get(`/otpverify/${verifydata}`,)
    console.log(result,"ooiiiooioo");
    return result
   } catch (error) {
    console.log(error);
   }
}

export async function Newpassword(data){
    try {
        const result =await userapi.put('/newpass',data)
        return result
    } catch (error) {
        console.log(error);
    }
}



export async function Profile(data){
    console.log(data,"/////////////////");
    try {
        const result =await userapi.post('/profile',data,{
            headers : {
                "Content-Type":"multipart/form-data",
            },
        } )
    console.log(result,"resdult");
        return result
    } catch (error) {
        console.log(error);
    }
}





