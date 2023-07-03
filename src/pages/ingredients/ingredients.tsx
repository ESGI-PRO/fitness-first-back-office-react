/* eslint-disable jsx-a11y/anchor-is-valid */
import {
  Breadcrumb,
  Button,
  Checkbox,
  Label,
  Modal,
  Select,
  Table,
  Textarea,
  TextInput,
} from "flowbite-react";
import type { FC } from "react";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import {
  HiCog,
  HiDocumentDownload,
  HiDotsVertical,
  HiExclamationCircle,
  HiHome,
  HiOutlineExclamationCircle,
  HiOutlinePencilAlt,
  HiPencilAlt,
  HiPlus,
  HiTrash,
  HiUpload,
} from "react-icons/hi";
import NavbarSidebarLayout from "../../layouts/navbar-sidebar";
import { Pagination } from "../users/list";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { create } from "domain";
import ingredientsAPI from "./datas";
import notifications from "../../services/notifications";

const IngredientsPage: FC = function () {
  const [search, setSearch] = useState("");

  const handleSearch = async () => {
    const ingredient = await axios.get(
      `http://localhost:8000/nutrition/ingredients`
    );
    // console.log(ingredient.data.data.nutrition);
  };
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
              <Breadcrumb.Item>All Ingredients</Breadcrumb.Item>
            </Breadcrumb>
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
              All Ingredients
            </h1>
          </div>
          <div className="sm:flex">
            <div className="mb-3 hidden items-center dark:divide-gray-700 sm:mb-0 sm:flex sm:divide-x sm:divide-gray-100">
              <form className="lg:pr-3">
                <Label htmlFor="users-search" className="sr-only">
                  Search
                </Label>
                <div className="relative mt-1 lg:w-64 xl:w-96">
                  <TextInput
                    id="users-search"
                    name="users-search"
                    placeholder="Search for ingredients"
                  />
                </div>
              </form>
              <div className="mt-3 flex space-x-1 pl-0 sm:mt-0 sm:pl-2">
                <a
                  href="#"
                  className="inline-flex cursor-pointer justify-center rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  <span className="sr-only">Configure</span>
                  <HiCog className="text-2xl" />
                </a>
                <a
                  href="#"
                  className="inline-flex cursor-pointer justify-center rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  <span className="sr-only">Delete</span>
                  <HiTrash className="text-2xl" />
                </a>
                <a
                  href="#"
                  className="inline-flex cursor-pointer justify-center rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  <span className="sr-only">Purge</span>
                  <HiExclamationCircle className="text-2xl" />
                </a>
                <a
                  href="#"
                  className="inline-flex cursor-pointer justify-center rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  <span className="sr-only">Settings</span>
                  <HiDotsVertical className="text-2xl" />
                </a>
              </div>
            </div>
            <div className="ml-auto flex items-center space-x-2 sm:space-x-3">
              <AddUserModal />
              <Button color="gray">
                <div className="flex items-center gap-x-3">
                  <HiDocumentDownload className="text-xl" />
                  <span>Export</span>
                </div>
              </Button>
            </div>
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
      <Pagination />
    </NavbarSidebarLayout>
  );
};

const AddUserModal: FC = function () {
  const [isOpen, setOpen] = useState(false);
  const [name, setName] = useState();
  const [calories, setCalories] = useState();
  const [carboH, setCarboH] = useState();
  const [grammes, setGrammes] = useState();
  const [category, setCategory] = useState();
  const [cholesterol, setCholesterol] = useState();
  const [fatSatured, setFatSatured] = useState();
  const [fatTotal, setFatTotal] = useState();
  const [fiber, setFiber] = useState();
  const [potassium, setPotassium] = useState();
  const [protein, setProtein] = useState();
  const [sodium, setSodium] = useState();
  const [sugar, setSugar] = useState();
  const [allCategories, setAllCategories] = useState([]);
  

  // useEffect(() => {
    const fetchCategory = async () => {
      setOpen(true)
      const getCategory = await axios.get(
        `http://localhost:8000/nutrition/categories`
      ); //http://localhost:8000/nutrition/categories
      setAllCategories(getCategory?.data.data.nutrition);
      console.log(getCategory?.data.data.nutrition);
    };
  //   fetchCategory();
  // }, []);

  const handleSubmitIngredient = async () => {
    // Mettez ici votre logique d'envoi des données au backend, par exemple avec axios
    const createIngredient = {
      name,
      calories: parseFloat(calories),
      grammes: parseFloat(grammes),
      CategorieId: Number(category),
      cholesterol_mg: parseFloat(cholesterol),
      fat_saturated_g: parseFloat(fatSatured),
      fat_total_g: parseFloat(fatTotal),
      fiber_g: parseFloat(fiber),
      potassium_mg: parseFloat(potassium),
      protein_g: parseFloat(protein),
      sodium_mg: parseFloat(sodium),
      sugar_g: parseFloat(sugar),
      carbohydrates_total_g: parseFloat(carboH),
    };
    console.log(createIngredient);
    await axios.post(`http://localhost:8000/nutrition/ingredients`, createIngredient)
      .then(response => {
        // Gérez la réponse du backend si nécessaire
        console.log(response.data);
        // Fermez le modal après la modification
        setOpen(false);
        notifications.success("ingredients " + createIngredient.name + " created");

      })
      .catch(error => {
        // Gérez les erreurs de requête si nécessaire
        console.error(error);
      });

      // await ingredientsAPI.create(createIngredient).then((response) => {
      //   setOpen(false)
      //   notifications.success("ingredients " + createIngredient.name + " created");
      // });
  };

  // const changeCategory = async (id) => {
  //   setCategory(id);
  //   console.log(id);
  // };

  return (
    <>
      <Button color="primary" onClick={fetchCategory}>
        <div className="flex items-center gap-x-3">
          <HiPlus className="text-xl" />
          Add Ingredient
        </div>
      </Button>
      <Modal onClose={() => setOpen(false)} show={isOpen}>
        <Modal.Header className="border-b border-gray-200 !p-6 dark:border-gray-700">
          <strong>Add new ingredient</strong>
        </Modal.Header>
        <Modal.Body>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <Label htmlFor="name">Name</Label>
              <div className="mt-1">
                <TextInput
                  id="name"
                  name="name"
                  placeholder="Ingredient name"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="calories">Calories</Label>
              <div className="mt-1">
                <TextInput
                  id="calories"
                  name="calories"
                  placeholder="Calories"
                  value={calories}
                  onChange={(e) => setCalories(e.target.value)}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="email">Categories</Label>
              <div className="mt-1">
                 <Select
                onChange={(e) => setCategory(e.target.value)}>
                  <option>None</option>
                  {
                    allCategories?.map((singleCategory, id) => (
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
                  type="number"
                  id="grammes"
                  name="grammes"
                  placeholder="grammes"
                  value={grammes}
                  onChange={(e) => setGrammes(e.target.value)}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="department">Fat - Total - G</Label>
              <div className="mt-1">
                <TextInput
                  type="number"
                  id="Fatt"
                  name="Fatt"
                  placeholder="Fat Total in G"
                  value={fatTotal}
                  onChange={(e) => setFatTotal(e.target.value)}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="company">Fat - Saturated - G</Label>
              <div className="mt-1">
                <TextInput
                  type="number"
                  id="fats"
                  name="fats"
                  placeholder="Fat Saturated"
                  value={fatSatured}
                  onChange={(e) => setFatSatured(e.target.value)}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="proteins">Protein - G</Label>
              <div className="mt-1">
                <TextInput
                  type="number"
                  id="prot"
                  name="prot"
                  placeholder="proteins"
                  value={protein}
                  onChange={(e) => setProtein(e.target.value)}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="passwordNew">Sodium - MG</Label>
              <div className="mt-1">
                <TextInput
                  type="number"
                  id="sodium"
                  name="sodium"
                  placeholder="sodium"
                  value={sodium}
                  onChange={(e) => setSodium(e.target.value)}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="passwordNew">Potassium - MG</Label>
              <div className="mt-1">
                <TextInput
                  type="number"
                  id="potassium"
                  name="potassium"
                  placeholder="potassium"
                  value={potassium}
                  onChange={(e) => setPotassium(e.target.value)}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="passwordNew">Cholesterol - MG</Label>
              <div className="mt-1">
                <TextInput
                  type="number"
                  id="cholesterol"
                  name="cholesterol"
                  placeholder="cholesterol"
                  value={cholesterol}
                  onChange={(e) => setCholesterol(e.target.value)}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="passwordNew">Carbohydrates - Total - G</Label>
              <div className="mt-1">
                <TextInput
                  type="number"
                  id="carboh"
                  name="carboh"
                  placeholder="carboh"
                  value={carboH}
                  onChange={(e) => setCarboH(e.target.value)}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="passwordNew">Fiber - G</Label>
              <div className="mt-1">
                <TextInput
                  type="number"
                  id="fiber"
                  name="fiber"
                  placeholder="Fiber"
                  value={fiber}
                  onChange={(e) => setFiber(e.target.value)}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="passwordNew">Sugar - G</Label>
              <div className="mt-1">
                <TextInput
                  type="number"
                  id="sugar"
                  name="sugar"
                  placeholder="sugar"
                  value={sugar}
                  onChange={(e) => setSugar(e.target.value)}
                />
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button color="primary" onClick={handleSubmitIngredient}>
            Add ingredient
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

const AllUsersTable: FC = function () {
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    const fetchNutritions = async () => {
      const ingredients = await axios.get(
        "http://localhost:8000/nutrition/ingredients"
      );
      // console.log(ingredients.data.data.nutrition);
      setIngredients(ingredients.data.data.nutrition);
    };
    fetchNutritions();
  }, []);
  return (
    <Table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
      <Table.Head className="bg-gray-100 dark:bg-gray-700">
        <Table.HeadCell>
          <Label htmlFor="select-all" className="sr-only">
            Select all
          </Label>
          <Checkbox id="select-all" name="select-all" />
        </Table.HeadCell>
        <Table.HeadCell>Name</Table.HeadCell>
        <Table.HeadCell>Calories</Table.HeadCell>
        <Table.HeadCell>Grammes</Table.HeadCell>
        <Table.HeadCell>Categories</Table.HeadCell>
        <Table.HeadCell>Actions</Table.HeadCell>
      </Table.Head>
      <Table.Body className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
        {ingredients.map((ingredient, id) => (
          <Table.Row
            key={id}
            className="hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <Table.Cell className="w-4 p-4">
              <div className="flex items-center">
                <Checkbox aria-describedby="checkbox-1" id="checkbox-1" />
                <label htmlFor="checkbox-1" className="sr-only">
                  checkbox
                </label>
              </div>
            </Table.Cell>
            <Table.Cell className="mr-12 flex items-center space-x-6 whitespace-nowrap p-4 lg:mr-0">
              <img
                className="h-10 w-10 rounded-full"
                src="/images/users/neil-sims.png"
                alt="Neil Sims avatar"
              />
              <div className="text-sm font-normal text-gray-500 dark:text-gray-400">
                <div className="text-base font-semibold text-gray-900 dark:text-white">
                  {ingredient.name}
                </div>
                <div className="text-sm font-normal text-gray-500 dark:text-gray-400">
                  neil.sims@flowbite.com
                </div>
              </div>
            </Table.Cell>
            <Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white">
              {ingredient.calories}
            </Table.Cell>
            <Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white">
              {ingredient.grammes}
            </Table.Cell>
            <Table.Cell className="whitespace-nowrap p-4 text-base font-normal text-gray-900 dark:text-white">
              <div className="flex items-center">
                <div className="mr-2 h-2.5 w-2.5 rounded-full bg-green-400"></div>{" "}
                {ingredient?.category?.name}
              </div>
            </Table.Cell>
            <Table.Cell>
              <div className="flex items-center gap-x-3 whitespace-nowrap">
                <EditUserModal ingredient={ingredient} />
                <DeleteUserModal ingredient={ingredient} />
              </div>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};

const EditUserModal: FC = function ({ ingredient }) {
  const [isOpen, setOpen] = useState(false);
  const [name, setName] = useState(ingredient.name);
  const [calories, setCalories] = useState(ingredient.calories);
  const [carboH, setCarboH] = useState(ingredient.carbohydrates_total_g);
  const [grammes, setGrammes] = useState(ingredient.grammes);
  const [category, setCategory] = useState(ingredient.category);
  const [cholesterol, setCholesterol] = useState(ingredient.cholesterol_mg);
  const [fatSatured, setFatSatured] = useState(ingredient.fat_saturated_g);
  const [fatTotal, setFatTotal] = useState(ingredient.fat_total_g);
  const [fiber, setFiber] = useState(ingredient.fiber_g);
  const [potassium, setPotassium] = useState(ingredient.potassium_mg);
  const [protein, setProtein] = useState(ingredient.protein_g);
  const [sodium, setSodium] = useState(ingredient.sodium_mg);
  const [sugar, setSugar] = useState(ingredient.sugar_g);
  const [allCategories, setAllCategories] = useState([]);

  const fetchCategory = async () => {
    setOpen(true)
    const getCategory = await axios.get(
      `http://localhost:8000/nutrition/categories`
    ); //http://localhost:8000/nutrition/categories
    setAllCategories(getCategory?.data.data.nutrition);
    console.log(getCategory?.data.data.nutrition);
  };
  
  const handleEditUser = async () => {
    // Mettez ici votre logique d'envoi des données au backend, par exemple avec axios
    const updatedIngredient = {
      id: ingredient.id,
      name,
      calories: parseFloat(calories),
      grammes: parseFloat(grammes),
      CategorieId: Number(category),
      cholesterol_mg: parseFloat(cholesterol),
      fat_saturated_g: parseFloat(fatSatured),
      fat_total_g: parseFloat(fatTotal),
      fiber_g: parseFloat(fiber),
      potassium_mg: parseFloat(potassium),
      protein_g: parseFloat(protein),
      sodium_mg: parseFloat(sodium),
      sugar_g: parseFloat(sugar),
    };
    await axios
      .put(
        `http://localhost:8000/nutrition/ingredients/${ingredient.id}`,
        updatedIngredient
      )
      .then((response) => {
        // Gérez la réponse du backend si nécessaire
        console.log(response.data);

        // Fermez le modal après la modification
        setOpen(false);
      })
      .catch((error) => {
        // Gérez les erreurs de requête si nécessaire
        console.error(error);
      });
  };

  return (
    <>
      <Button color="primary" onClick={fetchCategory}>
        <div className="flex items-center gap-x-2">
          <HiOutlinePencilAlt className="text-lg" />
          Edit ingredient
        </div>
      </Button>
      <Modal onClose={() => setOpen(false)} show={isOpen}>
        <Modal.Header className="border-b border-gray-200 !p-6 dark:border-gray-700">
          <strong>Edit Ingredient</strong>
        </Modal.Header>
        <Modal.Body>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <Label htmlFor="name">Name</Label>
              <div className="mt-1">
                <TextInput
                  id="name"
                  name="name"
                  placeholder="Ingredient name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="calories">Calories</Label>
              <div className="mt-1">
                <TextInput
                  id="calories"
                  name="calories"
                  placeholder="Calories"
                  value={calories}
                  onChange={(e) => setCalories(e.target.value)}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="email">Categories</Label>
              <div className="mt-1">
                {/* <TextInput
                  id="categories"
                  name="categories"
                  value={category?.name}
                  placeholder="category"
                  onChange={(e) => setCategory(e.target.value)}
                /> */}
                <Select
                  onChange={(e) => setCategory(e.target.value)}>
                    <option>None</option>
                    {
                      allCategories?.map((singleCategory, id) => (
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
                  id="grammes"
                  name="grammes"
                  placeholder="grammes"
                  value={grammes}
                  onChange={(e) => setGrammes(e.target.value)}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="department">Fat - Total - G</Label>
              <div className="mt-1">
                <TextInput
                  id="Fatt"
                  name="Fatt"
                  placeholder="Fat Total in G"
                  value={fatTotal}
                  onChange={(e) => setFatTotal(e.target.value)}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="company">Fat - Saturated - G</Label>
              <div className="mt-1">
                <TextInput
                  id="fats"
                  name="fats"
                  placeholder="Fat Saturated"
                  value={fatSatured}
                  onChange={(e) => setFatSatured(e.target.value)}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="proteins">Protein - G</Label>
              <div className="mt-1">
                <TextInput
                  id="prot"
                  name="prot"
                  placeholder="proteins"
                  value={protein}
                  onChange={(e) => setProtein(e.target.value)}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="passwordNew">Sodium - MG</Label>
              <div className="mt-1">
                <TextInput
                  id="sodium"
                  name="sodium"
                  placeholder="sodium"
                  value={sodium}
                  onChange={(e) => setSodium(e.target.value)}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="passwordNew">Potassium - MG</Label>
              <div className="mt-1">
                <TextInput
                  id="potassium"
                  name="potassium"
                  placeholder="potassium"
                  value={potassium}
                  onChange={(e) => setPotassium(e.target.value)}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="passwordNew">Cholesterol - MG</Label>
              <div className="mt-1">
                <TextInput
                  id="cholesterol"
                  name="cholesterol"
                  placeholder="cholesterol"
                  value={cholesterol}
                  onChange={(e) => setCholesterol(e.target.value)}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="passwordNew">Carbohydrates - Total - G</Label>
              <div className="mt-1">
                <TextInput
                  id="carboh"
                  name="carboh"
                  placeholder="carboh"
                  value={carboH}
                  onChange={(e) => setCarboH(e.target.value)}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="passwordNew">Fiber - G</Label>
              <div className="mt-1">
                <TextInput
                  id="fiber"
                  name="fiber"
                  placeholder="Fiber"
                  value={fiber}
                  onChange={(e) => setFiber(e.target.value)}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="passwordNew">Sugar - G</Label>
              <div className="mt-1">
                <TextInput
                  id="sugar"
                  name="sugar"
                  placeholder="sugar"
                  value={sugar}
                  onChange={(e) => setSugar(e.target.value)}
                />
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button color="primary" onClick={handleEditUser}>
            Save all
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

const DeleteUserModal: FC = function ({ ingredient }) {
  const [isOpen, setOpen] = useState(false);

  const handleDelete = () => {
    // Mettez ici votre logique d'envoi des données au backend, par exemple avec axios
    axios
      .delete(`http://localhost:8000/nutrition/ingredients/${ingredient.id}`)
      .then((response) => {
        // Gérez la réponse du backend si nécessaire
        console.log(response.data);
        // Fermez le modal après la modification
        setOpen(false);
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
          Delete user
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

export default IngredientsPage;
