import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminView = () => {
    let [products, setProducts] = useState([])
    let [users, setUsers] = useState([])

    useEffect(() =>{
        axios.get('http://localhost:8080/api/products').then(response =>
            setProducts(response.data)
        )
        axios.get('http://localhost:8080/api/users').then(response => {
            setUsers(response.data)
        })
    }, [])

    return (<div>
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Price</th>
                    <th>Category</th>
                    <th>Image Url</th>
                </tr>
            </thead>
            <tbody>
                {products && products.length ? products.map((p, i)=> {
                    return <tr key={i}>
                        <td>{p.name}</td>
                        <td>{p.description.slice(0,100)}</td>
                        <td>{p.price}</td>
                        <td>{p.category}</td>
                        <td><a href={p.image}>{p.image.slice(0,30)}</a></td>
                    </tr>
                }) : <tr><td>Loading...</td></tr>}
            </tbody>
        </table>
        <br></br>
        <table>
            <thead>
                <tr>
                    <th>Id Number</th>
                    <th>Username</th>
                    <th>FirstName</th>
                    <th>LastName</th>
                    <th>Email</th>
                </tr>
            </thead>
            <tbody>
                {users && users.length ? users.filter((u) => !u.isGuest)
                                            .sort((a, b) => a.id - b.id)
                                            .map((u, i) => {
                    return <tr key={i}>
                        <td>{u.id}</td>
                        <td>{u.username}</td>
                        <td>{u.firstName}</td>
                        <td>{u.lastName}</td>
                        <td>{u.email}</td>
                    </tr>
                }) : <tr><td>Loading...</td></tr>}
            </tbody>
        </table>
        
        
        
        </div>)
}


export default AdminView