import React from "react";
import AdminTablePage from "./AdminTablePage"

const AdminUsersView = () => {
    const title = "Users"
    const apiEndpoint = "/api/users"
    const fields = ['id', 'username', 'email', 'adminRights', 'isGuest']
    const linkLoc = "/admin/users"
    return <div><AdminTablePage
                title={title}
                apiEndpoint={apiEndpoint}
                fields={fields}
                linkLoc={linkLoc} />
            </div>
}


export default AdminUsersView