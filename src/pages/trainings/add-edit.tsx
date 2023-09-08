import { useParams, useNavigate, Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import toast, { Toaster } from 'react-hot-toast';
import { trainingsService, usersService } from '../../services';
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

const TrainingsAddEdit = () => {
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
                                <Link to="/trainings">Trainings</Link>
                            </Breadcrumb.Item>
                            <Breadcrumb.Item>Form</Breadcrumb.Item>
                        </Breadcrumb>
                        <h1 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
                            Form training
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
    const [user, setUser] = useState([]);
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
            await trainingsService.create({ 
                exercises: [
                    {
                        user_id: data.user_id,
                        trainer_id: data.trainer_id,
                        content: {
                            bodyPart: data.bodyPart,
                            equipment: data.equipment,
                            gifUrl: data.gifUrl,
                            id: data.id,
                            name: data.name,
                            target: data.target,
                        }
                    }
                ] 
            });
            toast.success('Training created');
            // console.log({ exercises: [data] });
            reset();
            navigate('..');
        } catch (error) {
            toast.error('Error');
            console.log(error);
        }
    };

    const updateData = async (id: any, data: any) => {
        try {
            await trainingsService.update(id, {
                exercises: [
                    {
                        user_id: data.user_id,
                        trainer_id: data.trainer_id,
                        content: {
                            bodyPart: data.bodyPart,
                            equipment: data.equipment,
                            gifUrl: data.gifUrl,
                            id: data.id,
                            name: data.name,
                            target: data.target,
                        }
                    }
                ] 
            });
            navigate('..');
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (!isAddMode) {
            trainingsService.getById(id)
            .then((response: any) => {
                const fields = ['user_id', 'trainer_id'];
                const fields2 = ['name', 'bodyPart', 'equipment', 'gifUrl', 'id', 'target'];
                fields.forEach(field => setValue(field, response.data[field]));
                fields2.forEach(field => setValue(field, response.data.content[field]));
                })
                .catch((error) => {
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
                    <Label htmlFor="user_id">User</Label>
                    <Select
                        id="user_id"
                        {...register("user_id", { required: true })}
                    >
                        {user.map((user: any, index: number) => (
                            <option key={index} value={user.id}>{user.userName}</option>
                        ))}
                    </Select>
                </div>
                <div className="w-full">
                    <Label htmlFor="trainer_id">Trainer</Label>
                    <Select
                        id="trainer_id"
                        {...register("trainer_id", { required: true })}
                    >
                        {user.map((user: any, index: number) => (
                            <option key={index} value={user.id}>{user.userName}</option>
                        ))}
                    </Select>
                </div>
                <div className="w-full">
                    <Label htmlFor="bodyPart">Body part</Label>
                    <TextInput
                        id="bodyPart"
                        type="text"
                        {...register("bodyPart", { required: true })}
                    />
                </div>
                <div className="w-full">
                    <Label htmlFor="equipment">Equipment</Label>
                    <TextInput
                        id="equipment"
                        type="text"
                        {...register("equipment", { required: true })}
                    />
                </div>
                <div className="w-full">
                    <Label htmlFor="name">Name</Label>
                    <TextInput
                        id="name"
                        type="text"
                        {...register("name", { required: true })}
                    />
                </div>
                <div className="w-full">
                    <Label htmlFor="gifUrl">Gif url</Label>
                    <TextInput
                        id="gifUrl"
                        type="text"
                        {...register("gifUrl", { required: true })}
                    />
                </div>
                <div className="w-full">
                    <Label htmlFor="target">Target muscle</Label>
                    <TextInput
                        id="target"
                        type="text"
                        {...register("target", { required: true })}
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

export { TrainingsAddEdit };