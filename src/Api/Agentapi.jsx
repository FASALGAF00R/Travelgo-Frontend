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


export async function Placedata(data,agentid) {
    try {
        const result = await agentapi.post('/places',{ ...data, agentid }, {
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
        const result = await agentapi.get(`/getplaces?page=${page}&limit=${limit}&`,);
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





export async function Addactivity(data,id) {
    try {
        const result = await agentapi.post('/addactivity', {data,id});
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



export async function Addpackagedata(data,id) {
    console.log(data,"opopopopopopopopopop");
    try {
        const result = await agentapi.post('/addpackage', {...data,id}, {
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




export async function fetchpackage() {
    try {
        const result = await agentapi.get('/listpackages');
        return result
    } catch (error) {
        console.log(error);

    }
}


export async function Blockpackages(id) {
    try {
        const result = await agentapi.put(`/blockpackages/${id}`);
        return result
    } catch (error) {
        console.log(error);

    }
}



export async function allBookings() {
    try {
        const result = await agentapi.get('/listbookings');
        return result
    } catch (error) {
        console.log(error);

    }
}


export async function Userscount(agentid) {
    try {
        const result = await agentapi.get(`/numberofusers/${agentid}`);
        return result
    } catch (error) {
        console.log(error);

    }
}




export async function Packagescount(agentid) {
    try {
        const result = await agentapi.get(`/numberofpackages/${agentid}`);
        return result
    } catch (error) {
        console.log(error);

    }
}



export async function MonthlyAmount(agentid) {
    try {
        const result = await agentapi.get(`/montlyamount/${agentid}`);
        return result
    } catch (error) {
        console.log(error);

    }
}



export async function displayagentPackageDetails(packageId) {
    console.log(packageId,"packageId");
    try {
        const result = await agentapi.get(`/fetchagentpackagedetails/${packageId}`)
        return result
    } catch (error) {
        console.log(error);
    }
}


