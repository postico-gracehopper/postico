import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import SingleUser from "../users/singleUserComponent";

const DetailEditUser = () => {
    const { id } = useParams()
    const [singleUserData, setSingleUserData] = useState(null)

    useEffect(()=> {
        if (!singleUserData) {
            axios.get(`/api/users/${id}`, {headers: {authorization: window.localStorage.getItem("token")}})
                .then((response) => setSingleUserData(response.data))
        }
    }, [singleUserData])
    return <div>
        <SingleUser />
        
    </div>
}



export default DetailEditUser; 