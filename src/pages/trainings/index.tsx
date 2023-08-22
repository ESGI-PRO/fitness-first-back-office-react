import { Routes, Route } from "react-router";
import { TrainingsAddEdit } from "./add-edit";
import TrainingsList from "./list";

function Trainings() {
    return (
        <Routes>
            <Route path="/" element={<TrainingsList />} />
            <Route path="add" element={<TrainingsAddEdit />} />
            <Route path="edit/:id" element={<TrainingsAddEdit />} />
        </Routes>
    );
}

export { Trainings };