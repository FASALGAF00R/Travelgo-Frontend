import axios from "axios";

// backend data url
const userapi=axios.create({
baseURL:'http://localhost:3000',
withCredentials: true,
})


// stored token in local
const token = localStorage.getItem('accesToken')


// Set up headers with the token
const Configtoken= {
    headers :{
        "Content-Type":"application/json",
        Authorization : "Bearer " + token
    }

}



// Attach the headers to the axios instance 
userapi.defaults.headers =Configtoken.headers




export   async function signupData(data){
    try{
 const userdata= await  userapi.post('/signup',data)
 return userdata
}catch(err){
    console.log(err);
}
}


export async function Userlogin(logindata){
    try {
       const  Data=await  userapi.post('/login',logindata)
       console.log(Data,"backend res");
       return Data
     
    } catch (error) {
        console.log(error);
    }
}


export async function UserVerify(token){
    console.log(token,"uuuuuuuuuu");
    try {
       const Data=await userapi.post(`/verify/${token}`)
       console.log(Data,"yyyyyyyrrrrrrrry");
       return Data
    } catch (error) {
        console.log(error);
    } 
}

// goole login 

export async function  Googledata(googledata){
    console.log(googledata,"frontend");
    try {
        const result = await userapi.post('/googlelogin',googledata)
        console.log(result,"backend");
        return result
    } catch (error) {
        console.log(error)
    }
}





