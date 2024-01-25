import axios from "axios";



// backend data url
const userapi=axios.create({
baseURL:'http://localhost:3000'
})


const token = localStorage.getItem('token')




const Configtoken= {
    headers :{
        "Content-Type":"application/json",
        Authorization :"Bearer"+token
    }

}


export   async function signupData(data){
    console.log("5");
    try{
 const userdata=await  userapi.post('/signup',data)
 console.log(userdata,"kkkkkkkkkk");
 return userdata
}catch(err){
    console.log(err);
}
}


export async function Userlogin(logindata){
    try {
        console.log("5888888888888");
       const  Data=await  userapi.post('/login',logindata)
       console.log(Data,"yyyyyyyy");
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





