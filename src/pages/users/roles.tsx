import {
    Breadcrumb,
    Button,
    Label,
    Modal,
    TextInput
  } from "flowbite-react";
  import type { FC } from "react";
  import {
    HiHome,
    HiOutlineExclamationCircle,
  } from "react-icons/hi";
  import NavbarSidebarLayout from "../../layouts/navbar-sidebar";
  import { useState, useEffect } from "react";
  import toast, { Toaster } from 'react-hot-toast';
  
  import { DataTable } from 'primereact/datatable';
  import { Column } from 'primereact/column';
  import { FilterMatchMode } from 'primereact/api';
  
  import { usersService } from "../../services"; 
  import { Link } from "react-router-dom";
  
  const UserRoles = () => {
    return (
      <NavbarSidebarLayout isFooter={false}>
        <div className="block items-center justify-between border-b border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800 sm:flex">
          <div className="mb-1 w-full">
            <div className="mb-4">
              <Breadcrumb className="mb-6">
                <Breadcrumb.Item>
                  <div className="flex items-center gap-x-3">
                    <HiHome className="text-xl" />
                    <Link to="/" className="dark:text-white">Home</Link>
                  </div>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                  <Link to="/users">Users</Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>Roles</Breadcrumb.Item>
              </Breadcrumb>
              <h1 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
                Requested roles users
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
                <AllUsersTable />
              </div>
            </div>
          </div>
        </div>
      </NavbarSidebarLayout>
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
    const [users, setUsers] = useState<any[]>([]);
    const [filters, setFilters] = useState({ global: { value: null, matchMode: FilterMatchMode.CONTAINS }});
    const [globalFilterValue, setGlobalFilterValue] = useState('');
  
    const onGlobalFilterChange = (e: any) => {
      const value = e.target.value;
      let _filters = { ...filters };
  
      _filters['global'].value = value;
  
      setFilters(_filters);
      setGlobalFilterValue(value);
    };
  
    const DeleteUserModal: any = function (userId: any) {
      const [isOpen, setOpen] = useState(false);
    
      const handleDelete = () => {
        const id = userId.data;
        usersService.changeApproval(id)
          .then(() => {
            toast.success('Role user is changed.');
            setUsers(users.filter((user: any) => user.id !== id));
          })
          .catch((error: any) => {
            toast.error("Error");
            console.log(error);
          });
      };  
    
      return (
        <>
          <Button color="warning" onClick={() => setOpen(true)}>
            <div className="flex items-center gap-x-2">
              <HiOutlineExclamationCircle className="text-lg" />
            </div>
          </Button>
          {/* <Toast ref={toast} /> */}
          <Modal onClose={() => setOpen(false)} show={isOpen} size="md">
            <Modal.Header className="px-6 pt-6 pb-0">
              <span className="sr-only">Make user trainer</span>
            </Modal.Header>
            <Modal.Body className="px-6 pt-0 pb-6">
              <div className="flex flex-col items-center gap-y-6 text-center">
                <HiOutlineExclamationCircle className="text-7xl text-gray-500" />
                <p className="text-xl text-gray-500">
                  Are you sure you want to attribute role trainer to this user ?
                </p>
                <div className="flex items-center gap-x-3">
                  <Button className="bg-gray-600" onClick={() => handleDelete()}>
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
  
    const actionBodyTemplate = (user: any) => {
        return (
            <div className="flex items-center gap-x-3 whitespace-nowrap">
            {/* <Button color="primary">
                <Link to={`edit/${user.id}`} className="flex items-center gap-x-2">
                <HiOutlinePencilAlt className="text-lg" />
                </Link>
            </Button> */}
            <DeleteUserModal data={user.id} />
            </div>
        )
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
                        placeholder="Search users..." />
                    </div>
                </form>
                </div>
            </div>
        );
    };

    const header = renderHeader();
    
    useEffect(() => {
      usersService.getRoleRequest()
        .then((response) => {
          setUsers(response.data);
        })
        .catch((error) => {
          console.log(error);
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
          globalFilterFields={['userName']}
          filters={filters}
        >
          <Column header="Name" body={userBodyTemplate}></Column>
          <Column field="role" header="Role"></Column>
          <Column field="isTrainer" header="Is trainer"></Column>
          <Column header="Status" body={statusBodyTemplate}></Column>
          <Column header="Actions" body={actionBodyTemplate}></Column>
        </DataTable>
      </>
    );
  };
  
  export default UserRoles;  