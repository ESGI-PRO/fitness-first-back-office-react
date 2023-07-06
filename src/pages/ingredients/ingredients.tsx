import {
  Breadcrumb,
  Button,
  Label,
  Modal,
  Select,
  TextInput,
  Spinner,
} from "flowbite-react";
import type { FC } from "react";
import { useEffect, useState, useRef } from "react";
import {
  HiHome,
  HiOutlineExclamationCircle,
  HiOutlinePencilAlt,
  HiPlus,
  HiTrash,
} from "react-icons/hi";
import NavbarSidebarLayout from "../../layouts/navbar-sidebar";

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { FilterMatchMode } from 'primereact/api';
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ingredientsService } from "../../services";
import { Toast } from 'primereact/toast';
        
const IngredientsPage: FC = function () {
  return (
    <NavbarSidebarLayout isFooter={false}>
      <div className="block items-center justify-between border-b border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800 sm:flex">
        <div className="mb-1 w-full">
          <div className="mb-4">
            <Breadcrumb className="mb-4">
              <Breadcrumb.Item>
                <div className="flex items-center gap-x-3">
                  <HiHome className="text-xl" />
                  <Link to="/" className="dark:text-white">Home</Link>
                </div>
              </Breadcrumb.Item>
              <Breadcrumb.Item>Ingredients</Breadcrumb.Item>
              <Breadcrumb.Item>All Ingredients</Breadcrumb.Item>
            </Breadcrumb>
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
              All Ingredients
            </h1>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden shadow">
              <AllIngredientsTable />
            </div>
          </div>
        </div>
      </div>
    </NavbarSidebarLayout>
  );
};

const AllIngredientsTable: FC = function () {
  const [ingredients, setIngredients] = useState<any>([]);
  const [allCategories, setAllCategories] = useState([]);
  const [filters, setFilters] = useState({ global: { value: null, matchMode: FilterMatchMode.CONTAINS }});
  const [globalFilterValue, setGlobalFilterValue] = useState('');
  const toast = useRef<Toast>(null);

  useEffect(() => {
    ingredientsService.getAllCategories().then((response) => {
      setAllCategories(response.data.data.nutrition);
    });

    ingredientsService.getAll()
      .then((response) => { setIngredients(response.data.data.nutrition); })
      .catch((error) => { console.log(error); });
  }, []);

  const onGlobalFilterChange = (e: any) => {
    const value = e.target.value;
    let _filters = { ...filters };

    _filters['global'].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  const AddIngredientModal: any = function () {
    const [isOpen, setOpen] = useState(false);
    const { register, handleSubmit, reset, formState } = useForm();
  
    const onSubmit = async (data: any) => {
      try {
        await ingredientsService.create(data);
        console.log(data);
        reset();
        setOpen(false);
        toast.current?.show({ severity: 'success', summary: 'Successful', detail: 'Ingredient Created', life: 3000 });
        setIngredients([...ingredients, data]);
      } catch (error) {
        console.log(error);
        toast.current?.show({ severity: 'error', summary: 'Error Message', detail: 'Ingredient Not Created', life: 3000 });
      }
    };
    
    return (
      <>
        <Toast ref={toast} />
        <Button color="primary" onClick={() => setOpen(true)}>
          <div className="flex items-center gap-x-3">
            <HiPlus className="text-xl" />
            Add ingredient
          </div>
        </Button>
        <Modal onClose={() => setOpen(false)} show={isOpen}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Modal.Header className="border-b border-gray-200 !p-6 dark:border-gray-700">
              <strong>Add new ingredient</strong>
            </Modal.Header>
            <Modal.Body>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <div className="mt-1">
                    <TextInput
                      {...register('name')}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="calories">Calories</Label>
                  <div className="mt-1">
                    <TextInput
                      {...register('calories')}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="email">Categories</Label>
                  <div className="mt-1">
                    <Select
                      {...register('CategorieId')}
                    >
                      <option>None</option>
                      {
                        allCategories?.map((singleCategory: any, id: any) => (
                          <option key={id} value={singleCategory.id ? singleCategory.id : 0}>{singleCategory.name}</option>
                        ))
                      }
                    </Select> 
                  </div>
                </div>
                <div>
                  <Label htmlFor="phone">Grammes</Label>
                  <div className="mt-1">
                    <TextInput
                      {...register('grammes')}
                      type="number"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="department">Fat - Total - G</Label>
                  <div className="mt-1">
                    <TextInput
                      {...register('fat_total_g')}
                      type="number"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="company">Fat - Saturated - G</Label>
                  <div className="mt-1">
                    <TextInput
                      {...register('fat_saturated_g')}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="proteins">Protein - G</Label>
                  <div className="mt-1">
                    <TextInput
                      {...register('protein_g')}
                      type="number"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="passwordNew">Sodium - MG</Label>
                  <div className="mt-1">
                    <TextInput
                      {...register('sodium_mg')}
                      type="number"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="passwordNew">Potassium - MG</Label>
                  <div className="mt-1">
                    <TextInput
                      {...register('potassium_mg')}
                      type="number"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="passwordNew">Cholesterol - MG</Label>
                  <div className="mt-1">
                    <TextInput
                      {...register('cholesterol_mg')}
                      type="number"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="passwordNew">Carbohydrates - Total - G</Label>
                  <div className="mt-1">
                    <TextInput
                      {...register('carbohydrates_total_g')}
                      type="number"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="passwordNew">Fiber - G</Label>
                  <div className="mt-1">
                    <TextInput
                      {...register('fiber_g')}
                      type="number"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="passwordNew">Sugar - G</Label>
                  <div className="mt-1">
                    <TextInput
                      {...register('sugar_g')}
                      type="number"
                    />
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
                Add Ingredient
              </Button>
            </Modal.Footer>
          </form>
        </Modal>
      </>
    );
  };

  const DeleteUserModal: any = function ({ id }: any) {
    const [isOpen, setOpen] = useState(false);
  
    const handleDelete = () => {
      ingredientsService.deleteById(id)
        .then(() => { 
          console.log('Ingredient deleted', id);
          setOpen(false);
          setIngredients(ingredients.filter((ingredient: any) => ingredient.id !== id));
          toast.current?.show({ severity: 'success', summary: 'Successful', detail: 'Ingredient Deleted', life: 3000 });
        })
        .catch((error) => {
          console.log(error);
          toast.current?.show({ severity: 'error', summary: 'Error Message', detail: 'Ingredient Not Deleted', life: 3000 });
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
            <span className="sr-only">Delete ingredient</span>
          </Modal.Header>
          <Modal.Body className="px-6 pt-0 pb-6">
            <div className="flex flex-col items-center gap-y-6 text-center">
              <HiOutlineExclamationCircle className="text-7xl text-red-500" />
              <p className="text-xl text-gray-500">
                Are you sure you want to delete this ingredient ?
              </p>
              <div className="flex items-center gap-x-3">
                <Button color="failure" onClick={handleDelete}>
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

  const EditUserModal: any = function ({ ingredient }: any) {
    const [isOpen, setOpen] = useState(false);
    const { register, handleSubmit, formState } = useForm({
      defaultValues: {
        name: ingredient.name,
        calories: ingredient.calories,
        CategorieId: ingredient.CategorieId,
        grammes: ingredient.grammes,
        fat_total_g: ingredient.fat_total_g,
        fat_saturated_g: ingredient.fat_saturated_g,
        protein_g: ingredient.protein_g,
        sodium_mg: ingredient.sodium_mg,
        potassium_mg: ingredient.potassium_mg,
        cholesterol_mg: ingredient.cholesterol_mg,
        carbohydrates_total_g: ingredient.carbohydrates_total_g,
        fiber_g: ingredient.fiber_g,
        sugar_g: ingredient.sugar_g,
      },
    });

    const onSubmit = async (data: any) => {
      try {
        await ingredientsService.updateById(ingredient.id, data);
        console.log('DATA', data);
        setOpen(false);
        setIngredients((ingredients: any) => ingredients.map((ingredient: any) => ingredient.id === data.id ? data : ingredient));
        toast.current?.show({ severity: 'success', summary: 'Successful', detail: 'Ingredient Updated', life: 3000 });
      } catch (error) {
        console.log(error);
        toast.current?.show({ severity: 'error', summary: 'Error Message', detail: 'Ingredient Not Updated', life: 3000 });
      }
    };

    return (
      <>
        <Button color="primary" onClick={() => setOpen(true)}>
          <div className="flex items-center gap-x-2">
            <HiOutlinePencilAlt className="text-lg" />
          </div>
        </Button>
        <Modal onClose={() => setOpen(false)} show={isOpen}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Modal.Header className="border-b border-gray-200 !p-6 dark:border-gray-700">
              <strong>Edit Ingredient</strong>
            </Modal.Header>
            <Modal.Body>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <div className="mt-1">
                    <TextInput
                      {...register('name')}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="calories">Calories</Label>
                  <div className="mt-1">
                    <TextInput
                      {...register('calories')}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="email">Categories</Label>
                  <div className="mt-1">
                    <Select
                      {...register('CategorieId')}
                    >
                        <option>None</option>
                        {
                          allCategories?.map((singleCategory: any, id: any) => (
                            <option key={id} value={singleCategory.id ? singleCategory.id : 0}>{singleCategory.name}</option>
                          ))
                        }
                    </Select> 
                  </div>
                </div>
                <div>
                  <Label htmlFor="phone">Grammes</Label>
                  <div className="mt-1">
                    <TextInput
                      {...register('grammes')}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="department">Fat - Total - G</Label>
                  <div className="mt-1">
                    <TextInput
                      {...register('fat_total_g')}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="company">Fat - Saturated - G</Label>
                  <div className="mt-1">
                    <TextInput
                      {...register('fat_saturated_g')}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="proteins">Protein - G</Label>
                  <div className="mt-1">
                    <TextInput
                      {...register('protein_g')}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="passwordNew">Sodium - MG</Label>
                  <div className="mt-1">
                    <TextInput
                      {...register('sodium_mg')}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="passwordNew">Potassium - MG</Label>
                  <div className="mt-1">
                    <TextInput
                      {...register('potassium_mg')}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="passwordNew">Cholesterol - MG</Label>
                  <div className="mt-1">
                    <TextInput
                      {...register('cholesterol_mg')} 
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="passwordNew">Carbohydrates - Total - G</Label>
                  <div className="mt-1">
                    <TextInput
                      {...register('carbohydrates_total_g')}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="passwordNew">Fiber - G</Label>
                  <div className="mt-1">
                    <TextInput
                      {...register('fiber_g')}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="passwordNew">Sugar - G</Label>
                  <div className="mt-1">
                    <TextInput
                      {...register('sugar_g')}
                    />
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

  const actionBodyTemplate = (rowData: any) => {
    return (
      <div className="flex items-center gap-x-3 whitespace-nowrap">
        <EditUserModal ingredient={rowData} />
        <DeleteUserModal ingredient={rowData.id} />
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
                placeholder="Search for ingredients..."
              />
            </div>
          </form>
        </div>
        <div className="ml-auto flex items-center space-x-2 sm:space-x-3">
          <AddIngredientModal />
        </div>
      </div>
    );
  };

  const header = renderHeader();

  return (
    <>
      <DataTable
        value={ingredients}
        size={"small"}
        paginator
        rows={10}
        rowsPerPageOptions={[5, 10, 25, 50]}
        tableStyle={{ minWidth: '50rem' }}
        header={header}
        globalFilterFields={['name', 'calories', 'grammes', 'category.name']}
        filters={filters}
      >
        <Column field="name" header="Name" style={{ width: '25%', textTransform: 'capitalize' }} sortable></Column>
        <Column field="calories" header="Calories" style={{ width: '25%' }} sortable></Column>
        <Column field="grammes" header="Grammes (g)" style={{ width: '25%' }} sortable></Column>
        <Column field="category.name" header="Category" style={{ width: '25%' }} sortable></Column>
        <Column header="Actions" body={actionBodyTemplate} style={{ width: '25%' }} sortable></Column>
      </DataTable>
    </>
  );
};

export default IngredientsPage;
