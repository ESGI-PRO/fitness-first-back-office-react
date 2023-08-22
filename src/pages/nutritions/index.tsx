import { Routes, Route } from "react-router";
import { NutritionsAddEdit } from "./add-edit";
import NutritionsList from "./list";

function Nutritions() {
    return (
        <Routes>
            <Route path="/" element={<NutritionsList />} />
            <Route path="add" element={<NutritionsAddEdit />} />
            <Route path="edit/:id" element={<NutritionsAddEdit />} />
        </Routes>
    );
}

export { Nutritions };