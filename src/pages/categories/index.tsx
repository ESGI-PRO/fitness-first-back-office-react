import { Routes, Route } from "react-router";
import { CategoriesAddEdit } from "./add-edit";
import CategoriesList from "./list";

function Categories() {
    return (
        <Routes>
            <Route path="/" element={<CategoriesList />} />
            <Route path="add" element={<CategoriesAddEdit />} />
            <Route path="edit/:id" element={<CategoriesAddEdit />} />
        </Routes>
    );
}

export { Categories };