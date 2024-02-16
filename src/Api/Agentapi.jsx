import axios  from "axios";




// backendurl
const agentapi =axios.create({
    baseURL:'http://localhost:3000/agent',
    withCredentials: true,

})

const token = localStorage.getItem('token')



const Configtoken= {
    headers :{
        "Content-Type":"application/json",
        Authorization :"Bearer"+token
    }

}


// Attach the headers to the axios instance
agentapi.defaults.headers =Configtoken.headers




// agent sign up
export async function Signupdata(data){
    console.log(data,"yyyyyyyyyyyyyyyyyyyy");
    try {
        const Agent =await  agentapi.post('/agentsignup',data)
        console.log(Agent,"agentttttttt");
        return Agent
    } catch (error) {
        console.log(error);
    }
}

export async function  Verify(token) {
    
    try {
        const Db = await agentapi.get(`/verify/${token}`)
         return Db
    } catch (error) {
        console.log(error);
    }
}


export async  function Formdata(agent){
    console.log(agent,";;;;;;;;;");
    try {   
        const Login = await agentapi.post('/login',agent)
        console.log(Login,"oooooooooooosdfgaaaaaaaaaaaf");
        return Login
    } catch (error) {
        console.log(error);
    }
}


export async function agentdata(data){
try {
    const Google =await agentapi.post('/googlelogin',data)
    console.log(Google,"zzzzzzzzzzzzzzzzzz");
    return Google
    
} catch (error) {
    console.log(error);
}

}

console.log("fufufufffu");
export async function Placedata(data){
    console.log(data,"//./././././");
    try {
        const result = await agentapi.post('/places',data);
        console.log(result,"LOLOLO");
        return result
    } catch (error) {
        console.log(error);
    }
}