import axios  from "axios";

// backendurl
const agentapi =axios.create({
    baseURL:'http://localhost:3000/agent'
})

const token = localStorage.getItem('token')



const Configtoken= {
    headers :{
        "Content-Type":"application/json",
        Authorization :"Bearer"+token
    }

}



// agent sign up
export async function Signupdata(data){
    try {
        const Agent =await  agentapi.post('/agentsignup',data)
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


export async  function Agentlogin(data){
    console.log(data,";;;;;;;;;");
    try {   
        const Login = await agentapi.post('/loginagent',data)
        console.log(Login,"oooooooooooosdfgaaaaaaaaaaaf");
        return Login
    } catch (error) {
        console.log(error);
    }
}