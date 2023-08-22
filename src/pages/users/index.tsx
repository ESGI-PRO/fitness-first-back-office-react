import { Routes, Route } from "react-router";
import { UserAddEdit } from "./add-edit";
import UserList from "./list";
import UserRoles from "./roles";

function User() {
    return (
        <Routes>
            <Route path="/" element={<UserList />} />
            <Route path="add" element={<UserAddEdit />} />
            <Route path="edit/:id" element={<UserAddEdit />} />
            <Route path="roles" element={<UserRoles />} />
        </Routes>
    );
}

export { User };