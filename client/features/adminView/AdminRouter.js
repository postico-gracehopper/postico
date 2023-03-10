import { Routes, Route, Link, useLocation } from "react-router-dom"
import React, { useEffect, useState } from "react";
import AdminProductsView from "./AdminProductsView";
import AdminUsersView from "./AdminUsersView";
import AdminOrdersView from "./AdminOrdersView"
import SingleProduct from "../products/singleProductComponent"
import SingleUser from "../users/singleUserComponent"
import DetailEditUser from "./DetailEditUser";
import AdminLanding from "./AdminLanding";
import DetailOrderView from "./DetailOrderView"

const AdminRouter = () => {
    const current = useLocation().pathname.split('/').slice(2,)[0]
    const navBarLocs = ["products", "users", "orders"]
    
    return <div id="admin-router-container">
        <nav className="secondary-nav">
            {navBarLocs.map((loc, i) => {
                return <Link key={i} className={current === loc ? "secondary-nav-link sec-nav-chosen": "secondary-nav-link"} to={loc}>
                    {loc[0].toUpperCase() + loc.slice(1,)}</Link>
            })}
        </nav>
        <Routes>
            <Route path="/*" element={<p>ADMIN ROUTE COULD NOT BE FOUND</p>} />
            <Route path="/" element={<AdminLanding />} />
            <Route path="/products" element={<AdminProductsView />} />
            <Route path="/users" element={<AdminUsersView />} />
            <Route path="/orders" element={<AdminOrdersView />} />
            <Route path="/orders/:id" element={<DetailOrderView />} />
            <Route path="/products/:id" element={<SingleProduct />} />
            <Route path="/users/:id" element={<DetailEditUser />} />
        </Routes>
    </div>
}


export default AdminRouter