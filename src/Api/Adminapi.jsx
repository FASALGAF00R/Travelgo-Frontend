import axios from "axios";

// baseurl 
const Adminapi =axios.create({
    baseURL:'http://localhost:3000/admin'
})


export async function Admindata(data){
    console.log("oooooooooo");
    try {
 const Data = await Adminapi.post('/login',data)
 console.log(Data,"uuuuuuuuuuuuuuuuuu");
return Data
    } catch (error) {
        console.log(error);
    }
}

export async function Loadusers(data){
    try {
        const Users= await Adminapi.get('/users',data)
        console.log(Users,"yyyy");
        return Users
    } catch (error) {
        console.log(error);
    }
}

export async function Loadagents(data){
    try {
        const agents= await Adminapi.get('/agents',data)
        console.log(agents,"yyyy");
        return agents
    } catch (error) {
        console.log(error);
    }
}


export async function Blockuser(id) {
    console.log(id, "yes");
    try {
        const Res = await Adminapi.put("/blockuser",id);
        console.log(Res,"ppppppp");
        return Res;
    } catch (error) {
        console.log(error);
    }
}



export async function Blockagent(id) {
    console.log(id, "yes");
    try {
        const Res = await Adminapi.put("/blockagent",id);
        console.log(Res,"ppppppp");
        return Res;
    } catch (error) {
        console.log(error);
    }
}