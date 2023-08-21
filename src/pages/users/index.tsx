import { Routes, Route } from "react-router";
import { UserAddEdit } from "./add-edit";
import UserList from "./list";

function User() {
    return (
        <Routes>
            <Route path="/" element={<UserList />} />
            <Route path="add" element={<UserAddEdit />} />
            <Route path="edit/:id" element={<UserAddEdit />} />
        </Routes>
    );
}

export { User };