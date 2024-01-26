import axios from "axios";

// baseurl 
const Adminapi =axios.create({
    baseURL:'http://localhost:3000/admin'
})


export async function Admindata(data){
    try {
 const Data = await Adminapi.post('/login',data)
return Data
    } catch (error) {
        console.log(error);
    }
}

export async function Loadusers(data){
    try {
        const Users= await Adminapi.get('/users',data)
        return Users
    } catch (error) {
        console.log(error);
    }
}

export async function Loadagents(data){
    try {
        const agents= await Adminapi.get('/agents',data)
        return agents
    } catch (error) {
        console.log(error);
    }
}


export async function Blockuser(id) {
    try {
        const Res = await Adminapi.put("/blockuser",id);
        return Res;
    } catch (error) {
        console.log(error);
    }
}



export async function Blockagent(id) {
    try {
        const Res = await Adminapi.put("/blockagent",id);
        return Res;
    } catch (error) {
        console.log(error);
    }
}


export async function Agentapprovallisting(){
    try {
        const result =await Adminapi.get('/agentapproval');
            return result
    } catch (error) {
        console.log(error);
    }

}

export async function approveAgent(userid){
 
    try {
        const id =await Adminapi.put('/reject',userid)
        console.log(id,"idd");
        return id
        
    } catch (error) {
        
    }
}