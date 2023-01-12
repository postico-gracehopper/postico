import React, { useEffect, useState } from "react";
import axios from "axios";
import { useTable } from 'react-table'; 
import userData from "./Users"
import TableIneractive from "./TableInteractive"


const AdminView = () => {
    let [users, setUsers] = useState([])
    let [products, setProducts] = useState([])
    
    useEffect(() => {
        // wrap in thunk, send with token
        axios.get('api/users').then(response => {
            setUsers(narrowFieldsUsers(response.data))
        })
        // wrap in thunk, send with token
        axios.get('api/products').then(response => {
            setProducts(narrowFieldsProducts(response.data))
        })

    }, [])

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

    return <div>
        {users && users.length ? <TableIneractive title="Users" data={users} handleSave={console.log} /> : ""}
        {products && products.length ? <TableIneractive title="Products" data={products} handleSave={console.log} /> : ""}
    </div>
    
}



export default AdminView