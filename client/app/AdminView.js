import React, { useEffect, useState } from "react";
import axios from "axios";
import { useTable } from 'react-table'; 
import userData from "./Users"
import TableIneractive from "./TableInteractive"


const AdminView = () => {
    let [users, setUsers] = useState([])
    let [products, setProducts] = useState([])
    
    useEffect(() => {
        if (users && !users.length) {
            // wrap in thunk, send with token
            axios.get('api/users').then(response => {
                setUsers(narrowFieldsUsers(response.data))
            })
            // wrap in thunk, send with token
            axios.get('api/products').then(response => {
                setProducts(narrowFieldsProducts(response.data))
            })
        }
    }, [users])


    function narrowFieldsUsers(userArray){
        const fields = ['id', 'username', 'firstName', 'lastName', 'email', 'adminRights', 'isGuest']
        return userArray.map(o => {
            return Object.keys(o).reduce((acc, k) => fields.includes(k) ? Object.assign(acc, {[k]: o[k]}) : acc, {})
        }).sort((a, b) => a.id - b.id)
    }

    function narrowFieldsProducts(userArray){
        const fields = ['id', 'name', 'description', 'price', 'category', 'image']
        return userArray.map(o => {
            return Object.keys(o).reduce((acc, k) => fields.includes(k) ? Object.assign(acc, {[k]: o[k]}) : acc, {})
        }).sort((a, b) => a.id - b.id)
    }

    // $ placeholder for data verification
    function verifyUserFields(changedUsers){
        return changedUsers
    }

    function createUser(userData){
        axios.post("api/users/", userData, {headers: {authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OTksImlhdCI6MTY3MzQ2MjUwNH0.FZmiIJuk-vhIUs1XdhZFDrWzvauboKNugOTp9IBjQQg"}})
    }
    function updateUsers(changedData, data){
        setUsers(data)
        axios.put("api/users/", changedData, {headers: {authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OTksImlhdCI6MTY3MzQ2MjUwNH0.FZmiIJuk-vhIUs1XdhZFDrWzvauboKNugOTp9IBjQQg"}})
    }

    function deleteUser(user){
        axios.delete(`api/users/${user.id}`)
    }


    function createProduct(userData){
        axios.post("api/products/", userData, {headers: {authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OTksImlhdCI6MTY3MzQ2MjUwNH0.FZmiIJuk-vhIUs1XdhZFDrWzvauboKNugOTp9IBjQQg"}})
    }
    function updateProduct(changedData, data){
        setUsers(data)
        axios.put("api/products/", changedData, {headers: {authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OTksImlhdCI6MTY3MzQ2MjUwNH0.FZmiIJuk-vhIUs1XdhZFDrWzvauboKNugOTp9IBjQQg"}})
    }

    function deleteProduct(user){
        axios.delete(`api/products/${user.id}`)
    }

    return <div>
        {users && users.length ? 
        <TableIneractive title="Users" 
                        data={users} 
                        handleSave={updateUsers}
                        handleDelete={deleteUser}
                        handleCreate={createUser}  /> : ""}
        {products && products.length ? 
        <TableIneractive title="Products" 
                            data={products} 
                            handleSave={updateProduct} 
                            handleDelete={deleteProduct}
                            handleCreate={createProduct}/> : ""}
    </div>
    
}



export default AdminView