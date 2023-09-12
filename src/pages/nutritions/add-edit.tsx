import { useParams, useNavigate, Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import toast, { Toaster } from 'react-hot-toast';
import { nutritionsService, usersService } from '../../services';
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

const NutritionsAddEdit = () => {
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
                                <Link to="/nutritions">Nutritions</Link>
                            </Breadcrumb.Item>
                            <Breadcrumb.Item>Form</Breadcrumb.Item>
                        </Breadcrumb>
                        <h1 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
                            Form nutrition
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
    const [user, setUser] = useState<any>([]);
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
            await nutritionsService.create(data);
            toast.success('Nutrition added');
            reset();
            navigate('..');
        } catch (error) {
            toast.error('Error');
            console.log(error);
        }
    };

    const updateData = async (id: any, data: any) => {
        try {
            await nutritionsService.update(id, data);
            navigate('..');
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (!isAddMode) {
            nutritionsService.getById(id)
                .then((response: any) => {
                    const fields = ['title', 'UserId', 'instructions'];
                    fields.forEach(field => setValue(field, response.data.data.nutrition[field]));
                })
                .catch((error: any) => {
                    console.log(error);
                });
        }

        usersService.getAll()
            .then((response: any) => {
                setUser(response.data);
            })
    }, []);

    return (
        <div className="w-full">
            <form 
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-4 p-6"
            >
                <div className="w-full">
                    <Label htmlFor="title">Title</Label>
                    <TextInput
                        id="title"
                        {...register("title", { required: true })}
                    />
                </div>
                <div className="w-full">
                    <Label htmlFor="UserId">User</Label>
                    <Select
                        id="UserId"
                        {...register("UserId", { required: true })}
                    >
                        {user.map((item: any) => (
                            <option key={item.id} value={item.id}>{item.userName}</option>
                        ))}
                    </Select>
                </div>
                <div className="w-full">
                    <Label htmlFor="instructions">Instructions</Label>
                    <TextInput
                        id="instructions"
                        {...register("instructions", { required: true })}
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

export { NutritionsAddEdit };