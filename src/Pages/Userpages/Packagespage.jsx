import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { fetchpackages } from '../../Api/Userapi';

function Packagespage() {
    const location = useLocation()
    const placeId = location.state
    const [packages,setpackages]=useState([])


    useEffect(() => {
        const fetchdata = async () => {
            const res = await fetchpackages(placeId).then((response) => {
                console.log(response, 'pppppppppp');
                setpackages(response.data.fullpackage)

            })
                .catch((error) => {
                    console.error('Error fetching categories:', error);
                });

        }
        fetchdata()
    }, [])
    console.log(packages,'ppppppppppppppppppppe');


    return (
        <div>
            
            {packages[0].State}
       
        </div>
    )
}

export default Packagespage
