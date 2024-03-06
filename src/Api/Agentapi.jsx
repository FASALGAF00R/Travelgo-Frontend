import axios from "axios";

// backendurl
const agentapi = axios.create({
    baseURL: 'http://localhost:3000/agent',
    withCredentials: true,

})

const token = localStorage.getItem('token')



const Configtoken = {
    headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer" + token
    }

}


// Attach the headers to the axios instance
agentapi.defaults.headers = Configtoken.headers




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
    console.log(data,"ll");
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

export async function Fetchplaces() {

    try {
        const result = await agentapi.get('/getplaces');
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
        const result = await agentapi.put(`/updateactivity/${id}`, data); // Adjusted URL
        console.log(result);
        return result;
    } catch (error) {
        console.log(error);
    }
}


export async function Addpackagedata(data) {
    console.log(data,'iiiiiiiiiiiiiiiiii');
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






export async function Checking(data) {
    console.log(data,"//////////////////");
    try {
        const result = await agentapi.get(`/checkingagent/${data}`);
        return result

    } catch (error) {
        console.log(error);

    }
}