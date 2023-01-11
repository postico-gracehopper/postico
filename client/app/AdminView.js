import React, { useEffect, useState } from "react";
import axios from "axios";
import { useTable } from 'react-table'; 

const AdminView = () => {

    const data = React.useMemo(
        () => [
          {
            col1: 'Hello',
            col2: 'World',
          },
          {
            col1: 'react-table',
            col2: 'rocks',
          },
          {
            col1: 'whatever',
            col2: 'you want',
          },
        ],
        []
      )
    
      const columns = React.useMemo(
        () => [
          {
            Header: 'Column 1',
            accessor: 'col1', // accessor is the "key" in the data
          },
          {
            Header: 'Column 2',
            accessor: 'col2',
          },
        ],
        []
      )
    
      const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
      } = useTable({ columns, data })
    
      return (
        <table {...getTableProps()} style={{ border: 'solid 1px blue' }}>
          <thead>
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <th
                    {...column.getHeaderProps()}
                    style={{
                      borderBottom: 'solid 3px red',
                      background: 'aliceblue',
                      color: 'black',
                      fontWeight: 'bold',
                    }}
                  >
                    {column.render('Header')}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map(row => {
              prepareRow(row)
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map(cell => {
                    return (
                      <td
                        {...cell.getCellProps()}
                        style={{
                          padding: '10px',
                          border: 'solid 1px gray',
                          background: 'papayawhip',
                        }}
                      >
                        {cell.render('Cell')}
                      </td>
                    )
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>
      )
    // let [products, setProducts] = useState([])
    // let [users, setUsers] = useState([])

    // useEffect(() =>{
    //     axios.get('http://localhost:8080/api/products').then(response =>
    //         setProducts(response.data)
    //     )
    //     axios.get('http://localhost:8080/api/users').then(response => {
    //         setUsers(response.data)
    //     })
    // }, [])

    // return (<div>
    //     <table>
    //         <thead>
    //             <tr>
    //                 <th>Name</th>
    //                 <th>Description</th>
    //                 <th>Price</th>
    //                 <th>Category</th>
    //                 <th>Image Url</th>
    //             </tr>
    //         </thead>
    //         <tbody>
    //             {products && products.length ? products.map((p, i)=> {
    //                 return <tr key={i}>
    //                     <td>{p.name}</td>
    //                     <td>{p.description.slice(0,100)}</td>
    //                     <td>{p.price}</td>
    //                     <td>{p.category}</td>
    //                     <td><a href={p.image}>{p.image.slice(0,30)}</a></td>
    //                 </tr>
    //             }) : <tr><td>Loading...</td></tr>}
    //         </tbody>
    //     </table>
    //     <br></br>
    //     <table>
    //         <thead>
    //             <tr>
    //                 <th>Id Number</th>
    //                 <th>Username</th>
    //                 <th>FirstName</th>
    //                 <th>LastName</th>
    //                 <th>Email</th>
    //             </tr>
    //         </thead>
    //         <tbody>
    //             {users && users.length ? users.filter((u) => !u.isGuest)
    //                                         .sort((a, b) => a.id - b.id)
    //                                         .map((u, i) => {
    //                 return <tr key={i}>
    //                     <td>{u.id}</td>
    //                     <td>{u.username}</td>
    //                     <td>{u.firstName}</td>
    //                     <td>{u.lastName}</td>
    //                     <td>{u.email}</td>
    //                 </tr>
    //             }) : <tr><td>Loading...</td></tr>}
    //         </tbody>
    //     </table>
        
        
        
    //     </div>)
}



export default AdminView