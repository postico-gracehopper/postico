import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminTablePage from "./AdminTablePage";

const AdminProductsView = () => {
    const title = "Products"
    const apiEndpoint = "/api/products/"
    const fields = ['id', 'name', 'description', 'price', 'category', 'image']
    return <div><AdminTablePage
                title={title}
                apiEndpoint={apiEndpoint}
                fields={fields} />
            </div>
}




export default AdminProductsView