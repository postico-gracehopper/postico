import React, { useEffect, useState } from "react";
import axios from "axios";
import CRUDTable from "./CRUDTable";

const AdminTablePage = ({apiEndpoint, fields, title}) => {
    let [entries, setEntries] = useState([])
    const authHeader = {headers: {authorization: window.localStorage.token || 0}}

    function createEntry(userData){
        axios.post(apiEndpoint, userData, authHeader)
    }
    function updateEntry(changedData){
        axios.put(apiEndpoint, changedData, authHeader)
    }
    function deleteEntry(user){
        axios.delete(`${apiEndpoint}${user.id}`, authHeader)
    }

    function narrowFieldsEntries(userArray){
        return userArray.map(o => {
            return Object.keys(o).reduce((acc, k) => fields.includes(k) ? Object.assign(acc, {[k]: o[k]}) : acc, {})
        }).sort((a, b) => a.id - b.id)
    }


    useEffect(() => {
        if (entries && !entries.length){
            axios.get(apiEndpoint, authHeader).then(response => {
                setEntries(narrowFieldsEntries(response.data))
            })
        }
    }, [entries])



    return <div>{entries && entries.length ? 
        <CRUDTable title={title} 
                    data={entries} 
                    handleSave={updateEntry} 
                    handleDelete={deleteEntry}
                    handleCreate={createEntry}
        /> : "Loading..."}
    </div>
    
}

export default AdminTablePage