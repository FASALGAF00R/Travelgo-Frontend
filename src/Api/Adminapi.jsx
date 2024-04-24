import Admininterceptors from'../Interceptors/Admininterceptors.jsx'
const Adminapi=Admininterceptors



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

export async function Loadusers() {
    try {
        const Users = await Adminapi.get('/users')
        console.log(Users);
        return Users
    } catch (error) {
        console.log(error);
    }
}

export async function Loadagents() {
    try {
        const agents = await Adminapi.get('/agents')
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
    console.log(id);
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
        console.log(Result,"oo");
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


export async function Blockcat(id) {
    try {
        const Result = await Adminapi.put('/blockcat',id)
        return Result
    } catch (error) {
        console.log(error);
    }

}



export async function Editcategory(id,categoryName) {
    try {
        const Result = await Adminapi.put(`/editcat/${id}`,{ editedcat: categoryName })
        console.log(Result,"ii");
        return Result
    } catch (error) {
        console.log(error);
    }

}



export async function Placedata(data) {
    console.log(data);
    try {
        const result = await Adminapi.post('/destination', data);
        return result
    } catch (error) {
        console.log(error);
    }
}