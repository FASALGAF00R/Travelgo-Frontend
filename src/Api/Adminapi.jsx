import axios from "axios";

// baseurl 
const Adminapi = axios.create({
    baseURL: 'http://localhost:3000/admin'
})


export async function Admindata(data) {
    console.log(data);
    try {
        const Data = await Adminapi.post('/login', data)
        console.log(Data,"..");
        return Data
    } catch (error) {
        console.log(error);
    }
}

export async function Loadusers(data) {
    try {
        const Users = await Adminapi.get('/users', data)
        return Users
    } catch (error) {
        console.log(error);
    }
}

export async function Loadagents(data) {
    try {
        const agents = await Adminapi.get('/agents', data)
        return agents
    } catch (error) {
        console.log(error);
    }
}


export async function Blockuser(id) {
    try {
        const Res = await Adminapi.put("/blockuser", id);
        return Res;
    } catch (error) {
        console.log(error);
    }
}



export async function Blockagent(id) {
    try {
        const Res = await Adminapi.put("/blockagent", id);
        return Res;
    } catch (error) {
        console.log(error);
    }
}


export async function Agentapprovallisting() {
    try {
        const result = await Adminapi.get('/agentapproval');
        return result
    } catch (error) {
        console.log(error);
    }

}

export async function approveAgent(data) {

    try {
        const result = await Adminapi.put('/accept', data)
        return result

    } catch (error) {
        console.log(error);

    }
}



export async function Addcatgeory(data) {
    try {
        const Result = await Adminapi.post('/catgeory', data)
        console.log(Result);
        return Result
    } catch (error) {
        console.log(error);
    }

}

export async function Fetchcategory() {
    try {
        const Result = await Adminapi.get('/getcatgeory')
        console.log(Result);
        return Result
    } catch (error) {
        console.log(error);
    }

}