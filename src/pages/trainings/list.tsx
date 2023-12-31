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
    // HiOutlinePencilAlt,
    HiPlus,
    HiTrash,
  } from "react-icons/hi";
  import NavbarSidebarLayout from "../../layouts/navbar-sidebar";
  import { useState, useEffect } from "react";
  import toast, { Toaster } from 'react-hot-toast';
  
  import { DataTable } from 'primereact/datatable';
  import { Column } from 'primereact/column';
  import { FilterMatchMode } from 'primereact/api';
  
  import { trainingsService } from "../../services"; 
  import { Link } from "react-router-dom";

  
  
  const TrainingsList = () => {
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
                  <Link to="/trainings">Trainings</Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>List</Breadcrumb.Item>
              </Breadcrumb>
              <h1 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
                All trainings
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
                <AllTrainingsTable />
              </div>
            </div>
          </div>
        </div>
      </NavbarSidebarLayout>
    );
  };

  const AllTrainingsTable: FC = function () {
    const [data, setData] = useState<any[]>([]);
    const [filters, setFilters] = useState({ global: { value: null, matchMode: FilterMatchMode.CONTAINS }});
    const [globalFilterValue, setGlobalFilterValue] = useState('');
  
    const onGlobalFilterChange = (e: any) => {
      const value = e.target.value;
      let _filters = { ...filters };
  
      _filters['global'].value = value;
  
      setFilters(_filters);
      setGlobalFilterValue(value);
    };
  
    const DeleteTrainingsModal: any = function (itemId: any) {
      const [isOpen, setOpen] = useState(false);
    
      const handleDelete = () => {
        const id = itemId.data;
        trainingsService.remove(id)
          .then(() => {
            toast.success('Item deleted');
            trainingsService.getAll()
            .then((response) => {
              setData(response.data.data.exercises);
            })
          })
          .catch((error: any) => {
            toast.error('Error');
            console.log(error);
          });
      };  
    
      return (
        <>
          <Button color="failure" onClick={() => setOpen(true)}>
            <div className="flex items-center gap-x-2">
              <HiTrash className="text-lg" />
            </div>
          </Button>
          <Modal onClose={() => setOpen(false)} show={isOpen} size="md">
            <Modal.Header className="px-6 pt-6 pb-0">
              <span className="sr-only">Deleted item</span>
            </Modal.Header>
            <Modal.Body className="px-6 pt-0 pb-6">
              <div className="flex flex-col items-center gap-y-6 text-center">
                <HiOutlineExclamationCircle className="text-7xl text-red-500" />
                <p className="text-xl text-gray-500">
                  Are you sure you want to delete this item ?
                </p>
                <div className="flex items-center gap-x-3">
                  <Button color="failure" onClick={() => handleDelete()}>
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

    const contentBodyTemplate = (data: any) => {
        return (
            <div className="flex flex-col items-start gap-x-3 whitespace-nowrap">
                <span className="font-semibold text-gray-800 capitalize">{data.content.bodyPart}</span>
                <span className="text-gray-500 text-sm">{data.content.name}</span>
            </div>
            )
    };

    const actionBodyTemplate = (data: any) => {
        return (
            <div className="flex items-center gap-x-3 whitespace-nowrap">
              {/* <Link to={`edit/${data._id}`} className="flex items-center gap-x-2">
                <Button color="primary">
                    <HiOutlinePencilAlt className="text-lg" />
                </Button>
              </Link> */}
            <DeleteTrainingsModal data={data._id} />
            </div>
        )
    };

    const imageBodyTemplate = (data: any) => {
      return (
        <img src={data.content.gifUrl} alt="Image" style={{ width: '100px' }} />
      );
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
                    placeholder="Search trainings..." />
                </div>
              </form>
            </div>
            <div className="ml-auto flex items-center space-x-2 sm:space-x-3">
              <Button color="primary">
                <Link to="add" className="flex items-center gap-x-3">
                  <HiPlus className="text-xl" />
                  Add training
                </Link>
              </Button>
            </div>
          </div>
        );
    };

    const header = renderHeader();
    
    useEffect(() => {
      trainingsService.getAll()
        .then((response) => {
          setData(response.data.data.exercises);
          // console.log(response.data.data.exercises)
        })
        .catch((error) => {
          toast.error('Error', error);
          // console.log(error);
        });
    }, []);
  
    return (
    <>
        <DataTable 
            value={data} 
            size={"small"} 
            paginator 
            rows={10} 
            rowsPerPageOptions={[5, 10, 25, 50]} 
            tableStyle={{ minWidth: '50rem' }}
            header={header}
            globalFilterFields={['user_id', 'trainer_id', 'content.name']}
            filters={filters}
        >
            <Column field="content.gifUrl" header="Image" style={{ width: '25%' }} body={imageBodyTemplate}></Column>
            <Column field="user_id" header="User ID" style={{ width: '25%' }} sortable></Column>
            <Column field="trainer_id" header="Trainer ID" style={{ width: '25%' }} sortable></Column>
            <Column header="Training" style={{ width: '25%' }} body={contentBodyTemplate}></Column>
            <Column header="Actions" style={{ width: '25%' }} body={actionBodyTemplate}></Column>
        </DataTable>
      </>
    );
  };

export default TrainingsList;  