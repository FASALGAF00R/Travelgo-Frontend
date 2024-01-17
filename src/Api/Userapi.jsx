import axios from "axios";



// backend data url
const userapi=axios.create({
baseURL:'http://localhost:3000'
})



export   async function signupData(data){
    console.log("5");
    try{
 const userdata= userapi.post('/signup',data)
 console.log(userdata,"kkkkkkkkkk");
 return userdata
}catch(err){
    console.log(err);
}
}


export async function Userlogin(logindata){
    try {
        console.log("5");
       const  Data= userapi.post('/login',logindata)
       console.log(Data,"yyyyyyyy");
       return Data
    } catch (error) {
        console.log(error);
    }
}


export async function UserVerify(token){
    console.log(token,"uuuuuuuuuu");
    try {
       const Data=userapi.post(`/verify/${token}`)
       console.log(Data,"yyyyyyyrrrrrrrry");
       return Data
    } catch (error) {
        console.log(error);
    } 
}


