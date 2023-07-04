import {
  Breadcrumb,
  Button,
  Label,
  Modal,
  Table,
  TextInput,
  Select,
  Spinner,
} from "flowbite-react";
import type { FC } from "react";
import {
  HiChevronLeft,
  HiChevronRight,
  HiHome,
  HiOutlineExclamationCircle,
  HiOutlinePencilAlt,
  HiPlus,
  HiTrash,
} from "react-icons/hi";
import { Toast } from 'primereact/toast';
import NavbarSidebarLayout from "../../layouts/navbar-sidebar";
import { useForm } from "react-hook-form";
import { useState, useEffect, useRef } from "react";

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { FilterMatchMode, FilterOperator } from 'primereact/api';

import { usersService } from "../../services"; 

const UserListPage: FC = function () {
  const [globalFilterValue, setGlobalFilterValue] = useState('');
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });

  const onGlobalFilterChange = (event: any) => {
    const value = event.target.value;
    let _filters = { ...filters };

    _filters['global'].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);

    console.log('GLOBAL FILTER VALUE', value);
  }

  return (
    <NavbarSidebarLayout isFooter={false}>
      <div className="block items-center justify-between border-b border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800 sm:flex">
        <div className="mb-1 w-full">
          <div className="mb-4">
            <Breadcrumb className="mb-4">
              <Breadcrumb.Item href="#">
                <div className="flex items-center gap-x-3">
                  <HiHome className="text-xl" />
                  <span className="dark:text-white">Home</span>
                </div>
              </Breadcrumb.Item>
              <Breadcrumb.Item href="/users/list">Users</Breadcrumb.Item>
              <Breadcrumb.Item>List</Breadcrumb.Item>
            </Breadcrumb>
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
              All users
            </h1>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden shadow">
              <AllUsersTable />
            </div>
          </div>
        </div>
      </div>
    </NavbarSidebarLayout>
  );
};

const AddUserModal: FC = function () {
  const toast = useRef<Toast>(null);
  const [isOpen, setOpen] = useState(false);
  const { register, handleSubmit, reset, formState } = useForm();

  const onSubmit = async (data: any) => {
    try {
      await usersService.create(data);
      console.log(data);
      toast.current?.show({ severity: 'success', summary: 'Success', detail: 'User created', life: 3000 });
      reset();
      setOpen(false);
    } catch (error) {
      toast.current?.show({ severity: 'error', summary: 'Error', detail: 'User not created', life: 3000 });
    }
  };

  return (
    <>
      <Toast ref={toast} />
      <Button color="primary" onClick={() => setOpen(true)}>
        <div className="flex items-center gap-x-3">
          <HiPlus className="text-xl" />
          Add user
        </div>
      </Button>
      <Modal onClose={() => setOpen(false)} show={isOpen}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Modal.Header className="border-b border-gray-200 !p-6 dark:border-gray-700">
            <strong>Add new user</strong>
          </Modal.Header>
          <Modal.Body>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
                <Label htmlFor="Email">Email</Label>
                <div className="mt-1">
                  <TextInput 
                    {...register("email")}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="userName">Username</Label>
                <div className="mt-1">
                  <TextInput
                    {...register("userName")}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="mobileNumber">Mobile Number</Label>
                <div className="mt-1">
                  <TextInput
                    {...register("mobileNumber")}
                    type="tel"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="role">Role</Label>
                <div className="mt-1">
                  <Select
                    {...register("role")}
                  >
                    <option value="ADMIN">ADMIN</option>
                    <option value="USER">USER</option>
                  </Select>
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              type="submit" 
              color="primary"
              disabled={formState.isSubmitting}
            >
              {formState.isSubmitting && <Spinner className="mr-2" />}
              Add user
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
};

const statusBodyTemplate = (rowData: any) => {
  return (
    <div className="flex items-center">
      {rowData.is_confirmed ? (
        <>
          <div className="mr-2 h-2.5 w-2.5 rounded-full bg-green-400"></div>
          <span>Active</span>
        </>
      ) : (
        <>
          <div className="mr-2 h-2.5 w-2.5 rounded-full bg-red-400"></div>
          <span>Inactive</span>
        </>
      )}
    </div>  
  )
};

const actionBodyTemplate = (user: any) => {
  return (
    <div className="flex items-center gap-x-3 whitespace-nowrap">
      <EditUserModal data={user} />
      <DeleteUserModal data={user} />
    </div>
  )
}

const userBodyTemplate = (user: any) => {
  return (
    <div className="mr-12 flex items-center space-x-6 whitespace-nowrap p-4 lg:mr-0">
      <span
          className="bg-gray-400 h-2 w-2 p-5 rounded-full font-bold text-white text-xl uppercase flex items-center justify-center"
          aria-hidden="true">
          {user.userName[0]}
      </span>
      <div className="text-sm font-normal text-gray-500 dark:text-gray-400">
          <div className="text-base font-semibold text-gray-900 dark:text-white">
              {user.userName}
          </div>
          <div className="text-sm font-normal text-gray-500 dark:text-gray-400">
              {user.email}
          </div>
      </div>
    </div>
  )
}

const AllUsersTable: FC = function () {
  const [users, setUsers] = useState([]);
  const [filters, setFilters] = useState({ global: { value: null, matchMode: FilterMatchMode.CONTAINS }});
  const [globalFilterValue, setGlobalFilterValue] = useState('');

  const onGlobalFilterChange = (e: any) => {
    const value = e.target.value;
    let _filters = { ...filters };

    _filters['global'].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
};

  const renderHeader = () => {
      return (
        <div className="sm:flex m-2">
          <div className="mb-3 hidden items-center dark:divide-gray-700 sm:mb-0 sm:flex sm:divide-x sm:divide-gray-100">
            <form className="lg:pr-3">
              <Label htmlFor="users-search" className="sr-only">
                Search
              </Label>
              <div className="relative mt-1 lg:w-64 xl:w-96">
                <TextInput
                  value={globalFilterValue}
                  onChange={onGlobalFilterChange}
                  placeholder="Search for users" />
              </div>
            </form>
          </div>
          <div className="ml-auto flex items-center space-x-2 sm:space-x-3">
            <AddUserModal />
          </div>
        </div>
      );
  };

  const header = renderHeader();
  
  useEffect(() => {
    usersService.getAll()
      .then((response) => {
        setUsers(response.data);
      });
  }, []);

  return (
    <>
      <DataTable 
        value={users} 
        size={"small"} 
        paginator 
        rows={10} 
        rowsPerPageOptions={[5, 10, 25, 50]} 
        tableStyle={{ minWidth: '50rem' }}
        header={header}
        globalFilterFields={['userName', 'mobileNumber', 'role']}
        filters={filters}
      >
        <Column header="Name" style={{ width: '25%' }} body={userBodyTemplate}></Column>
        <Column field="mobileNumber" header="Phone number" style={{ width: '25%' }}></Column>
        <Column field="role" header="Role" style={{ width: '25%' }}></Column>
        <Column header="Status" style={{ width: '25%' }} body={statusBodyTemplate}></Column>
        <Column header="Actions" style={{ width: '25%' }} body={actionBodyTemplate}></Column>
      </DataTable>
    </>
  );
};

const EditUserModal: any = function (data: any) {
  const [isOpen, setOpen] = useState(false);
  const { register, handleSubmit, reset, setValue, formState } = useForm({
    defaultValues: { 
      userName: '',
      email: '',
      mobileNumber: '',
      role: '',
    } 
  });
  const toast = useRef<Toast>(null);
  const id = data.data.id;

  const onSubmit = async (data: any) => {
    try {
      await usersService.update(id, data);
      toast.current?.show({severity:'success', summary: 'Success', detail:'User updated', life: 3000});
      setOpen(false);
      reset();
    } catch (error) {
      toast.current?.show({severity:'error', summary: 'Error', detail:'User not found', life: 3000});
    }
  };

  const handleClick = async () => {
    try {
      const response = await usersService.get(id);
      setOpen(true);
      setValue('userName', response.data.userName);
      setValue('email', response.data.email);
      setValue('mobileNumber', response.data.mobileNumber);
      setValue('role', response.data.role);
    } catch (error) {
      toast.current?.show({severity:'error', summary: 'Error', detail:'User not found', life: 3000});
    }
  };

  return (
    <>
      <Button color="primary" onClick={() => handleClick()}>
        <div className="flex items-center gap-x-2">
          <HiOutlinePencilAlt className="text-lg" />
        </div>
      </Button>
      <Toast ref={toast} />
      <Modal onClose={() => setOpen(false)} show={isOpen}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Modal.Header className="border-b border-gray-200 !p-6 dark:border-gray-700">
            <strong>Edit user</strong>
          </Modal.Header>
          <Modal.Body>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                    <Label htmlFor="email">Email</Label>
                    <div className="mt-1">
                        <TextInput {...register("email")}/>
                    </div>
                </div>
                <div>
                    <Label htmlFor="userName">Username</Label>
                    <div className="mt-1">
                        <TextInput {...register("userName")}/>
                    </div>
                </div>
                <div>
                    <Label htmlFor="mobileNumber">Phone number</Label>
                    <div className="mt-1">
                        <TextInput type="tel" {...register("mobileNumber")}/>
                    </div>
                </div>
                <div>
                    <Label htmlFor="role">Role</Label>
                    <div className="mt-1">
                        <Select {...register("role")}>
                            <option value="ADMIN">ADMIN</option>
                            <option value="USER">USER</option>
                        </Select>
                    </div>
                </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              type="submit"
              disabled={formState.isSubmitting}
              color="primary"
              >
              {formState.isSubmitting && (
                <Spinner className="mr-2" />
                )}
              Save all
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
};

const DeleteUserModal: any = function (userId: any) {
  const toast = useRef<Toast>(null);
  const [isOpen, setOpen] = useState(false);

  function handleDelete(id: number) {
    usersService.remove(id);
    toast.current?.show({severity:'success', summary: 'Success', detail:'Deleted successfully', life: 3000});
    console.log('delete user', id);
    setOpen(false);
  }

  return (
    <>
      <Button color="failure" onClick={() => setOpen(true)}>
        <div className="flex items-center gap-x-2">
          <HiTrash className="text-lg" />
        </div>
      </Button>
      <Toast ref={toast} />
      <Modal onClose={() => setOpen(false)} show={isOpen} size="md">
        <Modal.Header className="px-6 pt-6 pb-0">
          <span className="sr-only">Delete user</span>
        </Modal.Header>
        <Modal.Body className="px-6 pt-0 pb-6">
          <div className="flex flex-col items-center gap-y-6 text-center">
            <HiOutlineExclamationCircle className="text-7xl text-red-500" />
            <p className="text-xl text-gray-500">
              Are you sure you want to delete this user?
            </p>
            <div className="flex items-center gap-x-3">
              <Button color="failure" onClick={() => handleDelete(userId)}>
                Yes, I'm sure
              </Button>
              <Button color="gray" onClick={() => setOpen(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export const Pagination: FC = function () {
  return (
    <div className="sticky right-0 bottom-0 w-full items-center border-t border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800 sm:flex sm:justify-between">
      <div className="mb-4 flex items-center sm:mb-0">
        <a
          href="#"
          className="inline-flex cursor-pointer justify-center rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        >
          <span className="sr-only">Previous page</span>
          <HiChevronLeft className="text-2xl" />
        </a>
        <a
          href="#"
          className="mr-2 inline-flex cursor-pointer justify-center rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        >
          <span className="sr-only">Next page</span>
          <HiChevronRight className="text-2xl" />
        </a>
        <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
          Showing&nbsp;
          <span className="font-semibold text-gray-900 dark:text-white">
            1-20
          </span>
          &nbsp;of&nbsp;
          <span className="font-semibold text-gray-900 dark:text-white">
            2290
          </span>
        </span>
      </div>
      <div className="flex items-center space-x-3">
        <a
          href="#"
          className="inline-flex flex-1 items-center justify-center rounded-lg bg-primary-700 py-2 px-3 text-center text-sm font-medium text-white hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        >
          <HiChevronLeft className="mr-1 text-base" />
          Previous
        </a>
        <a
          href="#"
          className="inline-flex flex-1 items-center justify-center rounded-lg bg-primary-700 py-2 px-3 text-center text-sm font-medium text-white hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        >
          Next
          <HiChevronRight className="ml-1 text-base" />
        </a>
      </div>
    </div>
  );
};

export default UserListPage;
