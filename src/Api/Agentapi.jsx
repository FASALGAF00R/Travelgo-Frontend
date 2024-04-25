import Agentinterceptors from '../Interceptors/Agentinterceptors.jsx'

const agentapi =Agentinterceptors
// agent sign up
export async function Signupdata(data) {
    try {
        const Agent = await agentapi.post('/agentsignup', data)
        return Agent
    } catch (error) {
        console.log(error);
    }
}

export async function Verify(token) {
    console.log(token,"llll");
    try {
        const Db = await agentapi.get(`/verify/${token}`)
        return Db
    } catch (error) {
        console.log(error);
    }
}



export async function Checking(data) {
    console.log(data,"//////////////////");
    try {
        const result = await agentapi.get(`/checkingagent/${data}`);
        return result

    } catch (error) {
        console.log(error);

    }
}








export async function Formdata(agent) {
    try {
        const Login = await agentapi.post('/login', agent)
        return Login
    } catch (error) {
        console.log(error);
    }
}


export async function agentdata(data) {
    try {
        const Google = await agentapi.post('/googlelogin', data)
        return Google

    } catch (error) {
        console.log(error);
    }

}


export async function Placedata(data) {
    console.log(data,"oooo");
    try {
        const result = await agentapi.post('/places', data, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        });
        return result
    } catch (error) {
        console.log(error);
    }
}


export async function States() {
    try {
        const result = await agentapi.get('/getstates');
        return result

    } catch (error) {
        console.log(error);

    }
}




export async function Fetchplaces(page,limit) {

    try {
        const result = await agentapi.get(`/getplaces?page=${page}&limit=${limit}`,);
        console.log(result,"lllllll");
        return result
    } catch (error) {
        console.log(error);

    }
}

export async function UpdatePlace(id, data) {
    try {
        const result = await agentapi.put(`/updateplace/${id}`, data)
        return result;
    } catch (error) {
        console.log(error);
    }
}



export async function Blockplaces(id) {
    console.log(id,"kk");
    try {
        const result = await agentapi.put(`/Blockplace/${id}`)
        return result;
    } catch (error) {
        console.log(error);
    }
}





export async function Addactivity(data) {
    try {
        const result = await agentapi.post('/addactivity', data);
        return result
    } catch (error) {
        console.log(error);
    }
}


export async function Fetchactivies() {

    try {
        const result = await agentapi.get('/activities');
        console.log(result);
        return result

    } catch (error) {
        console.log(error);

    }
}


export async function UpdateActivity(id, data) {
   
    try {
        const result = await agentapi.put(`/updateactivity/${id}`, data); 
        console.log(result);
        return result;
    } catch (error) {
        console.log(error);
    }
}



export async function Blockact(id) {   
    try {
        const result = await agentapi.put(`/blockactivity/${id}`); 
        console.log(result);
        return result;
    } catch (error) {
        console.log(error);
    }
}



export async function Addpackagedata(data) {
    console.log(data,"opopopopopopopopopop");
    try {
        const result = await agentapi.post('/addpackage', data, {
            headers : {
                "Content-Type":"multipart/form-data",
            }
            })
        console.log(result,"ll");
        return result
    } catch (error) {
        console.log(error);
    }
}



export async function fetchcatgeory() {
    try {
        const result = await agentapi.get('/getcategories');
        return result

    } catch (error) {
        console.log(error);

    }
}


export async function fetchActivities() {
    try {
        const result = await agentapi.get('/getactivites');
        return result

    } catch (error) {
        console.log(error);

    }
}



export async function fetchstate() {
    try {
        const result = await agentapi.get('/getstates');
        return result

    } catch (error) {
        console.log(error);

    }
}







