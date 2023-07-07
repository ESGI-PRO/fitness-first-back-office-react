import {
  Breadcrumb,
  Button,
  Label,
  Modal,
  TextInput,
  Textarea,
} from "flowbite-react";
import type { FC } from "react";
import { useEffect, useState } from "react";
import {
  HiHome,
  HiOutlineExclamationCircle,
  HiOutlinePencilAlt,
  HiPlus,
  HiTrash,
} from "react-icons/hi";
import NavbarSidebarLayout from "../../layouts/navbar-sidebar";
import axios from "axios";
import { FilterMatchMode } from 'primereact/api';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
        
const NutritionPage: FC = function () {
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
              <Breadcrumb.Item href="/users/list">Nutritions</Breadcrumb.Item>
              <Breadcrumb.Item>All Nutritions</Breadcrumb.Item>
            </Breadcrumb>
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
              All nutritions
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
}

const AddRecipeModal: FC = function () {

  const [isOpen, setOpen] = useState(false);
  const [recipe, setRecipe] = useState<any>({
    title: '',
    UserId: 0,
    instructions: [
      {
        order: 0,
        produits: [
          {
            quantite: 0,
            ingredients: 0
          }
        ],
        description: ''
      }
    ]
  });

  const headers = {
    "Authorization": `Bearer ${localStorage.getItem("token")}`
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = event.target;

    if (name.includes('instructions')) {
      const [index, subFieldName]: any = name.split('.');
      setRecipe((prevRecipe: any) => ({
        ...prevRecipe,
        instructions: prevRecipe.instructions.map((instruction: any, i: any) => {
          if (i === Number(index)) {
            return {
              ...instruction,
              [subFieldName]: value
            };
          }
          return instruction;
        })
      }));
    } else if (name.includes('produits')) {
      const [index, produitsIndex, subFieldName]: any = name.split('.');
      setRecipe((prevRecipe: any) => ({
        ...prevRecipe,
        instructions: prevRecipe.instructions.map((instruction: any, i: any) => {
          if (i === Number(index)) {
            return {
              ...instruction,
              produits: instruction.produits.map((produit: any, j: any) => {
                if (j === Number(produitsIndex)) {
                  return {
                    ...produit,
                    [subFieldName]: value
                  };
                }
                return produit;
              })
            };
          }
          return instruction;
        })
      }));
    } else {
      setRecipe((prevRecipe: any) => ({
        ...prevRecipe,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
      // Convertir la valeur de UserId en entier
  const userId = parseInt(recipe.UserId);

  // Vérifier si la conversion a réussi
  if (isNaN(userId)) {
    console.error('Invalid UserId');
    return;
  }

  // Créer un nouvel objet recipe avec la valeur convertie de UserId
  const newRecipe = {
    ...recipe,
    UserId: userId
  };
    // Effectuez ici la requête front-end avec la recette ajoutée
    await axios.post(
      // `http://localhost:8000/nutrition`
      import.meta.env["VITE_URL_BACKEND"] + `nutrition`, { headers }
      
      , newRecipe)
    console.log(recipe);
    setOpen(false);
  };

  return (
    <>
      {/* <Button color="primary" onClick={() => setOpen(true)}>
        <div className="flex items-center gap-x-3">
          <HiPlus className="text-xl" />
          Add Recipe
        </div>
      </Button> */}
      <Modal onClose={() => setOpen(false)} show={isOpen}>
        <Modal.Header className="border-b border-gray-200 !p-6 dark:border-gray-700">
          <strong>Add New Recipe</strong>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <Label htmlFor="title">Recipe Title</Label>
                <div className="mt-1">
                  <TextInput
                    id="title"
                    name="title"
                    value={recipe.title}
                    onChange={handleChange}
                    placeholder="Delicious Chocolate Cake"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="UserId">User ID</Label>
                <div className="mt-1">
                  <TextInput
                    id="UserId"
                    name="UserId"
                    value={recipe.UserId}
                    onChange={handleChange}
                    type="number"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="instructions.0.order">Order</Label>
                <div className="mt-1">
                  <TextInput
                    id="instructions.0.order"
                    name="instructions.0.order"
                    value={recipe.instructions[0].order}
                    onChange={handleChange}
                    type="number"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="instructions.0.description">Description</Label>
                <div className="mt-1">
                  <Textarea
                    id="instructions.0.description"
                    name="instructions.0.description"
                    value={recipe.instructions[0].description}
                    onChange={handleChange}
                    placeholder="Prepare the batter by mixing all the ingredients together. Bake in the oven for 30 minutes. Let it cool before serving."
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="instructions.0.produits.0.quantite">Quantity</Label>
                <div className="mt-1">
                  <TextInput
                    id="instructions.0.produits.0.quantite"
                    name="instructions.0.produits.0.quantite"
                    value={recipe.instructions[0].produits[0].quantite}
                    onChange={handleChange}
                    type="number"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="instructions.0.produits.0.ingredients">Ingredients</Label>
                <div className="mt-1">
                  <TextInput
                    id="instructions.0.produits.0.ingredients"
                    name="instructions.0.produits.0.ingredients"
                    value={recipe.instructions[0].produits[0].ingredients}
                    onChange={handleChange}
                    type="number"
                  />
                </div>
              </div>
            </div>
            <Modal.Footer>
              <Button color="primary" type="submit">
                Add Recipe
              </Button>
            </Modal.Footer>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};


const AllUsersTable: FC = function () {
  const [nutritions, setNutritions] = useState([])
  // const [instructions, setInstructions] = useState([])
  const [filters, setFilters] = useState({ global: { value: null, matchMode: FilterMatchMode.CONTAINS }});
  const [globalFilterValue, setGlobalFilterValue] = useState('');

  const onGlobalFilterChange = (e: any) => {
    const value = e.target.value;
    let _filters = { ...filters };

    _filters['global'].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };

    
  const headers = {
    "Authorization": `Bearer ${localStorage.getItem("token")}`
  };


  useEffect(() => {
    try {
      const fetchNutritions = async () => {
        const getNutritions = await axios.get(
          // 'http://localhost:8000/nutrition'
        import.meta.env["VITE_URL_BACKEND"] + `nutrition`, { headers }
          )
        // console.log(getNutritions.data.data.nutrition);
        setNutritions(getNutritions.data.data.nutrition);
        // console.log(nutritions)
      }
      fetchNutritions()
    } catch(err) {
      // console.log(err);
    }
    // fetchNutritions()
  }, [])

  const actionBodyTemplate = (rowData: any) => {
    return (
      <div className="flex items-center gap-x-3 whitespace-nowrap">
        <EditRecipeModal nutrition={rowData} />
        <DeleteRecipeModal nutrition={rowData.id} />
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
                placeholder="Search nutrition..."
              />
            </div>
          </form>
        </div>
        <div className="ml-auto flex items-center space-x-2 sm:space-x-3">
          <AddRecipeModal />
        </div>
      </div>
    );
  };

  const header = renderHeader();

  return (
    <>
    <DataTable
      value={nutritions}
      size={"small"}
      paginator
      rows={10}
      rowsPerPageOptions={[5, 10, 25, 50]}
      tableStyle={{ minWidth: '50rem' }}
      header={header}
      globalFilterFields={['title', 'UserId']}
      filters={filters}
    >
      <Column field="title" header="Title" sortable></Column>
      <Column field="UserId" header="User ID" sortable></Column>
      <Column header="Actions" body={actionBodyTemplate} sortable></Column>
    </DataTable>
    </>
  )
}

const EditRecipeModal: any = function ({ nutrition }: any) {
  const [isOpen, setOpen] = useState(false);
  const [title, setTitle] = useState(nutrition.title);
  // const [description, setDescription] = useState(nutrition.description);

  return (
    <>
      <Button color="primary" onClick={() => setOpen(true)}>
        <div className="flex items-center gap-x-2">
          <HiOutlinePencilAlt className="text-lg" />
        </div>
      </Button>
      <Modal onClose={() => setOpen(false)} show={isOpen}>
        <Modal.Header className="border-b border-gray-200 !p-6 dark:border-gray-700">
          <strong>Details</strong>
        </Modal.Header>
        <Modal.Body>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <Label htmlFor="firstName">Name</Label>
              <div className="mt-1">
                 <TextInput
                  id="firstName"
                  name="firstName"
                  placeholder="Bonnie"
                 value={title}
                 onChange={(e) => setTitle(e.target.value)}
                /> 
                
              </div>
            </div>
            <div>
              <Label htmlFor="lastName">Author</Label>
              <div className="mt-1">
                {/* <TextInput id="lastName" name="lastName" placeholder="Green"/> */}
                {nutrition.UserId}
              </div>
            </div>
            {/* <div>
              <Label htmlFor="email">Email</Label>
              <div className="mt-1">
                <TextInput
                  id="email"
                  name="email"
                  placeholder="example@company.com"
                  type="email"
                />
              </div>
            </div> */}

            {
              nutrition.instructions.map((details: any) => (

                <>

                  <div>
                    <Label htmlFor="email">Order</Label>
                    <div className="mt-1">
                      {details.order}
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="email">Description</Label>
                    <div className="mt-1">
                      {details.description}
                    </div>
                  </div>




                  {
                    details.produits.map((lastdetails: any) => (
                      <>
                        <div>
                          <Label htmlFor="email">Quantité(G)</Label>
                          <div className="mt-1">
                            {lastdetails.quantite}
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="email">Ingredients</Label>
                          <div className="mt-1">
                            {lastdetails.ingredients}
                          </div>
                        </div>
                      </>
                    ))
                  }

                </>

              ))
            }

          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button color="primary" onClick={() => setOpen(false)}>
            Save all
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};


const DeleteRecipeModal: any = function ({nutrition}: any) {
  const [isOpen, setOpen] = useState(false);

  const headers = {
    "Authorization": `Bearer ${localStorage.getItem("token")}`
  };

  const handleDelete = () => {
    // Mettez ici votre logique d'envoi des données au backend, par exemple avec axios
    axios
      .delete(
        // `http://localhost:8000/nutrition/${nutrition.id}`
        import.meta.env["VITE_URL_BACKEND"] + `nutrition/${nutrition}`, { headers }
        )
      .then((response) => {
        // Gérez la réponse du backend si nécessaire
        console.log(response.data);
        // Fermez le modal après la modification
        setOpen(false);
        window.location.href = '/nutritions';
      })
      .catch((error) => {
        // Gérez les erreurs de requête si nécessaire
        console.error(error);
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
          <span className="sr-only">Delete user</span>
        </Modal.Header>
        <Modal.Body className="px-6 pt-0 pb-6">
          <div className="flex flex-col items-center gap-y-6 text-center">
            <HiOutlineExclamationCircle className="text-7xl text-red-500" />
            <p className="text-xl text-gray-500">
              Are you sure you want to delete this user?
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

export default NutritionPage;