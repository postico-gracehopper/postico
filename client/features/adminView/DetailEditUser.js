import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import SingleUser from "../users/singleUserComponent";

const DetailEditUser = () => {
    const { id } = useParams()
    const [singleUserData, setSingleUserData] = useState({})
    let [formData, setFormData] = useState([])
    useEffect(()=> {
        if (!singleUserData) {
            axios.get(`/api/users/${id}`, {headers: {authorization: window.localStorage.getItem("token")}})
                .then((response) => {
                    setFormData(

                    )
                    setSingleUserData(response.data)
                })
        }
    }, [singleUserData])


    return <div>
        <SingleUser />
        {singleUserData && Object.keys(singleUserData).length > 0 ? 
        <table>
            <thead>
                <tr>
                    <th>Field</th>
                    <th>Current</th>
                    <th>New</th>
                </tr>
            </thead>
            <tbody>
                {Object.keys(singleUserData).map((attr, index)=> {
                    return <tr>
                        <td>{attr}</td>
                        <td>{singleUserData[attr]}</td>
                        <td><input value={formData[index]} onChange={ev => setFormData()} /></td>
                    </tr>
                })}
            </tbody>
        </table>
        : <p>Loading user data</p>}
    </div>
}



export default DetailEditUser; 