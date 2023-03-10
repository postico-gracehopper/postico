import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminTablePage from "./AdminTablePage";

const AdminProductsView = () => {
    const title = "Orders"
    const apiEndpoint = "/api/orders"
    const fields = ["id", "userId", "total", "orderPaid"]
    const linkLoc = "/admin/orders"
    
    return <div><AdminTablePage
                title={title}
                apiEndpoint={apiEndpoint}
                fields={fields}
                linkLoc={linkLoc} />
            </div>
}




export default AdminProductsView