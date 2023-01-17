import React from "react";
import AdminTablePage from "./AdminTablePage"

const AdminUsersView = () => {
    const title = "Users"
    const apiEndpoint = "/api/users"
    const fields = ['id', 'username', 'firstName', 'lastName', 
        'email', 'adminRights', 'isGuest']
    return <div><AdminTablePage
                title={title}
                apiEndpoint={apiEndpoint}
                fields={fields} />
            </div>
}


export default AdminUsersView