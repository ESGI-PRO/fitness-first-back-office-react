import { useParams, useNavigate, Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import toast, { Toaster } from 'react-hot-toast';
import { ingredientsService } from '../../services';
import {
    Button,
    Select,
    Label,
    TextInput,
    Spinner,
    Breadcrumb,
} from 'flowbite-react';
import NavbarSidebarLayout from '../../layouts/navbar-sidebar';
import { HiHome } from 'react-icons/hi';

const IngredientsAddEdit = () => {
    return (
        <NavbarSidebarLayout isFooter={false}>
            <div
                className="block items-center justify-between border-b border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800 sm:flex">
                <div className="mb-1 w-full">
                    <div className="mb-4">
                        <Breadcrumb className="mb-6">
                            <Breadcrumb.Item>
                                <div className="flex items-center gap-x-3">
                                    <HiHome className="text-xl"/>
                                    <Link to="/" className="dark:text-white">Home</Link>
                                </div>
                            </Breadcrumb.Item>
                            <Breadcrumb.Item>
                                <Link to="/ingredients">Ingredients</Link>
                            </Breadcrumb.Item>
                            <Breadcrumb.Item>Form</Breadcrumb.Item>
                        </Breadcrumb>
                        <h1 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
                            Form ingredient
                        </h1>
                        <Toaster
                            position="top-center"
                            reverseOrder={false}
                        />
                    </div>
                </div>
            </div>
            <div className="flex flex-col">
                <div className="overflow-x-auto">
                    <div className="inline-block min-w-full align-middle">
                        <div className="overflow-hidden shadow">
                            <Form/>
                        </div>
                    </div>
                </div>
            </div>
        </NavbarSidebarLayout>
    );
};

const Form = () => {
    const [category, setCategory] = useState<any>([]);
    const { id } = useParams();
    const navigate = useNavigate();
    const isAddMode = !id;
    const { register, handleSubmit, reset, setValue, formState } = useForm();

    const onSubmit = (data: any) => {
        return isAddMode
            ? createData(data)
            : updateData(id, data);
    };

    const createData = async (data: any) => {
        try {
            const form = {
                name: data.name,
                calories: parseInt(data.calories),
                CategorieId: parseInt(data.CategorieId),
                grammes: parseInt(data.grammes),
                fat_total_g: parseInt(data.fat_total_g),
                fat_saturated_g: parseInt(data.fat_saturated_g),
                protein_g: parseInt(data.protein_g),
                sodium_mg: parseInt(data.sodium_mg),
                potassium_mg: parseInt(data.potassium_mg),
                cholesterol_mg: parseInt(data.cholesterol_mg),
                carbohydrates_total_g: parseInt(data.carbohydrates_total_g),
                fiber_g: parseInt(data.fiber_g),
                sugar_g: parseInt(data.sugar_g),
            };

            await ingredientsService.create(form);
            toast.success('Ingredient created');
            reset();
            navigate('..');
        } catch (error) {
            toast.error('Error');
            console.log(error);
        }
    };

    const updateData = async (id: any, data: any) => {
        try {
            const form = {
                name: data.name,
                calories: parseInt(data.calories),
                CategorieId: parseInt(data.CategorieId),
                grammes: parseInt(data.grammes),
                fat_total_g: parseInt(data.fat_total_g),
                fat_saturated_g: parseInt(data.fat_saturated_g),
                protein_g: parseInt(data.protein_g),
                sodium_mg: parseInt(data.sodium_mg),
                potassium_mg: parseInt(data.potassium_mg),
                cholesterol_mg: parseInt(data.cholesterol_mg),
                carbohydrates_total_g: parseInt(data.carbohydrates_total_g),
                fiber_g: parseInt(data.fiber_g),
                sugar_g: parseInt(data.sugar_g),
            };
            await ingredientsService.update(id, form);
            navigate('..');
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (!isAddMode) {
            ingredientsService.getById(id)
                .then((response: any) => {
                    const fields = ['name', 'calories', 'CategorieId', 'grammes', 'fat_total_g', 'fat_saturated_g', 'protein_g', 'sodium_mg', 'potassium_mg', 'cholesterol_mg', 'carbohydrates_total_g', 'fiber_g', 'sugar_g'];
                    fields.forEach(field => setValue(field, response.data.data.nutrition[field]));
                })
                .catch((error: any) => {
                    console.log(error);
                });
        }

        ingredientsService.getAllCategories()
            .then((response: any) => {
                setCategory(response.data.data.nutrition);
            })
    }, []);

    return (
        <div className="w-full">
            <form 
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-4 p-6"
            >
                <div className="w-full">
                    <Label htmlFor="name">Name</Label>
                    <TextInput
                        id="name"
                        type="text"
                        {...register("name", { required: true })}
                    />
                </div>
                <div className="w-full">
                    <Label htmlFor="calories">Calories</Label>
                    <TextInput
                        id="calories"
                        type="number"
                        step="0.1"
                        {...register("calories", { required: true })}
                    />
                </div>
                <div className="w-full">
                    <Label htmlFor="CategorieId">CategorieId</Label>
                    <Select
                        id="CategorieId"
                        {...register("CategorieId", { required: true })}
                    >
                        {category.map((category: any, index: number) => (
                            <option key={index} value={category.id}>{category.name}</option>
                        ))}
                    </Select>
                </div>
                <div className="w-full">
                    <Label htmlFor="grammes">Grammes</Label>
                    <TextInput
                        id="grammes"
                        type="number"
                        step="0.1"
                        {...register("grammes", { required: true })}
                    />
                </div>
                <div className="w-full">
                    <Label htmlFor="fat_total_g">Fat total g</Label>
                    <TextInput
                        id="fat_total_g"
                        type="number"
                        step="0.1"
                        {...register("fat_total_g", { required: true })}
                    />
                </div>
                <div className="w-full">
                    <Label htmlFor="fat_saturated_g">Fat saturated g</Label>
                    <TextInput
                        id="fat_saturated_g"
                        type="number"
                        step="0.1"
                        {...register("fat_saturated_g", { required: true })}
                    />
                </div>
                <div className="w-full">
                    <Label htmlFor="protein_g">Protein g</Label>
                    <TextInput
                        id="protein_g"
                        type="number"
                        step="0.1"
                        {...register("protein_g", { required: true })}
                    />
                </div>
                <div className="w-full">
                    <Label htmlFor="sodium_mg">Sodium mg</Label>
                    <TextInput
                        id="sodium_mg"
                        type="number"
                        step="0.1"
                        {...register("sodium_mg", { required: true })}
                    />
                </div>
                <div className="w-full">
                    <Label htmlFor="potassium_mg">Potassium mg</Label>
                    <TextInput
                        id="potassium_mg"
                        type="number"
                        step="0.1"
                        {...register("potassium_mg", { required: true })}
                    />
                </div>
                <div className="w-full">
                    <Label htmlFor="cholesterol_mg">Cholesterol mg</Label>
                    <TextInput
                        id="cholesterol_mg"
                        type="number"
                        step="0.1"
                        {...register("cholesterol_mg", { required: true })}
                    />
                </div>
                <div className="w-full">
                    <Label htmlFor="carbohydrates_total_g">Carbohydrates total g</Label>
                    <TextInput
                        id="carbohydrates_total_g"
                        type="number"
                        step="0.1"
                        {...register("carbohydrates_total_g", { required: true })}
                    />
                </div>
                <div className="w-full">
                    <Label htmlFor="fiber_g">Fiber g</Label>
                    <TextInput
                        id="fiber_g"
                        type="number"
                        step="0.1"
                        {...register("fiber_g", { required: true })}
                    />
                </div>
                <div className="w-full">
                    <Label htmlFor="sugar_g">Sugar g</Label>
                    <TextInput
                        id="sugar_g"
                        type="number"
                        step="0.1"
                        {...register("sugar_g", { required: true })}
                    />
                </div>
                <div className="w-full flex items-center gap-3 pt-6">
                    <Button size="sm" type="submit" disabled={formState.isSubmitting}>
                        {formState.isSubmitting && <Spinner />} Save
                    </Button>
                    <Link to='..' className="text-sm">Cancel</Link>
                </div>
            </form>
        </div>
    );
}

export { IngredientsAddEdit };