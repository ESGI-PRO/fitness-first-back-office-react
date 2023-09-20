import { useParams, useNavigate, Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { usersService } from '../../services';
import {
    Button,
    Checkbox,
    Label,
    TextInput,
    Spinner,
    Breadcrumb,
} from 'flowbite-react';
import NavbarSidebarLayout from '../../layouts/navbar-sidebar';
import { HiHome } from 'react-icons/hi';

const UserAddEdit = () => {
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
                                <Link to="/users">Users</Link>
                            </Breadcrumb.Item>
                            <Breadcrumb.Item>Form</Breadcrumb.Item>
                        </Breadcrumb>
                        <h1 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
                            Form User
                        </h1>
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
    const { id } = useParams();
    const navigate = useNavigate();
    const isAddMode = !id;
    const { register, handleSubmit, reset, setValue, formState } = useForm();

    const onSubmit = (data: any) => {
        return isAddMode
            ? createUser(data)
            : updateUser(id, data);
    };

    const createUser = async (data: any) => {
        try {
            await usersService.create(data);
            reset();
            navigate('..');
        } catch (error) {
            console.log(error);
        }
    };

    const updateUser = async (id: any, data: any) => {
        try {
            await usersService.update(id, data);
            navigate('..');
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (!isAddMode) {
            usersService.getById(id)
                .then((user: any) => {
                    const fields = ['email', 'userName', 'mobileNumber', 'password', 'isAdmin', 'isTrainer', 'is_confirmed'];
                    fields.forEach(field => setValue(field, user.data[field]));
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, []);

    return (
        <div className="w-full">
            <form 
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-4 p-6"
            >
                <div className="flex space-x-6">
                    <div className="flex items-center gap-1">
                        <Label htmlFor="isAdmin">Is admin</Label>
                        <Checkbox
                            id="isAdmin"
                            {...register("isAdmin", { required: false })}
                        />
                    </div>
                    <div className="flex items-center gap-1">
                        <Label htmlFor="isTrainer">Is trainer</Label>
                        <Checkbox
                            id="isTrainer"
                            {...register("isTrainer", { required: false })}
                        />
                    </div>  
                    <div className="flex items-center gap-1">
                        <Label htmlFor="is_confirmed">Is confirmed</Label>
                        <Checkbox
                            id="is_confirmed"
                            {...register("is_confirmed", { required: false })}
                        />
                    </div>
                </div>
                <div className="w-full">
                    <Label htmlFor="email">Email</Label>
                    <TextInput
                        id="email"
                        type="email"
                        {...register("email", { required: true })}
                    />
                </div>
                <div className="w-full">
                    <Label htmlFor="userName">Username</Label>
                    <TextInput
                        id="userName"
                        type="text"
                        {...register("userName", { required: false })}
                    />
                </div>
                <div className="w-full">
                    <Label htmlFor="mobileNumber">Mobile number</Label>
                    <TextInput
                        id="mobileNumber"
                        type="text"
                        {...register("mobileNumber", { required: false })}
                    />
                </div>
                <div className="w-full">
                    <Label htmlFor="password">Password</Label>
                    <TextInput
                        id="password"
                        type="password"
                        {...register("password", { required: false })}
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

export { UserAddEdit };