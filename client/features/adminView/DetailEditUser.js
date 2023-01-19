import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import SingleUser from "../users/singleUserComponent";

const DetailEditUser = () => {
    const { id } = useParams()
    const [singleUserData, setSingleUserData] = useState({})
    let [currentUser, setCurrentUser] = useState({})
    const PUBLIC_USER_FIELDS = [
        'username',
        'firstName',
        'lastName',
        'email',
        'addressLine1',
        'addressLine2',
        'city',
        'zipCode',
        'adminRights',
      ];

    useEffect(()=> {
        if (JSON.stringify(singleUserData) === '{}') {
            axios.get(`/api/users/${id}`, {headers: {authorization: window.localStorage.getItem("token")}})
                .then((response) => {
                    const user = response.data
                    setSingleUserData(user)
                    setCurrentUser(user)
                })
        }
    }, [singleUserData])

    function handleSubmit(ev){
        ev.preventDefault()
        axios.put(`/api/users/${id}`, currentUser, {headers: {authorization: window.localStorage.getItem("token")}})
            .then(() => alert(`User: ${currentUser.username} updated successfully`))
            .catch(err => alert(err.message))
    }


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
                {PUBLIC_USER_FIELDS.map((attr, index)=> {
                    return <tr key={index}>
                        <td>{attr}</td>
                        <td>{singleUserData[attr] || ""}</td>
                        <td><input value={String(currentUser[attr] === null ? "" : currentUser[attr])} onChange={ev => {
                            console.log(currentUser)
                            setCurrentUser({...currentUser, [attr]: ev.target.value })}} /></td>
                    </tr>
                })}
            </tbody>
        </table>
        : <p>Loading user data</p>}
        <button   onClick={handleSubmit}
                  className="bg-pool hover:bg-tahiti text-white font-bold py-2 px-8 rounded text-center uppercase tracking-widest"
                  style={{marginLeft: "55%"}}
        >
        Save
        </button>
    </div>
}

// <button onClick={handleSubmit}>Save</button> 

export default DetailEditUser; 