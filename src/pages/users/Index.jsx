import React from "react";
import { Routes, Route } from "react-router-dom";

import { ListUsers } from "./List";
import { AddEditUsers } from "./AddEdit"; 

function Users() {
    
    return (
        <div>
            <Routes>
                <Route path="/" element={<ListUsers />} />
                <Route path="add" element={<AddEditUsers />} />
                <Route path="edit/:id" element={<AddEditUsers />} />
            </Routes>
        </div>
    );
}

export { Users };