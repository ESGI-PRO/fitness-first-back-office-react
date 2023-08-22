import { Routes, Route } from "react-router";
import { IngredientsAddEdit } from "./add-edit";
import IngredientsList from "./list";

function Ingredients() {
    return (
        <Routes>
            <Route path="/" element={<IngredientsList />} />
            <Route path="add" element={<IngredientsAddEdit />} />
            <Route path="edit/:id" element={<IngredientsAddEdit />} />
        </Routes>
    );
}

export { Ingredients };