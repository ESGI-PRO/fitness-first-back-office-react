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
import {
  HiCog,
  HiDocumentDownload,
  HiDotsVertical,
  HiExclamationCircle,
  HiHome,
  HiOutlineExclamationCircle,
  HiOutlinePencilAlt,
  HiTrash,
} from "react-icons/hi";
import NavbarSidebarLayout from "../../layouts/navbar-sidebar";
// import { Pagination } from "../users/list";
import TrainingsAPI from "./datas";
import notifications from "../../services/notifications";

const trainingsPage: FC = function () {
  const [trainings, setTrainings] = useState([]);
  const [exercices, setExercices] = useState([]);

  const [muscles, setMuscles] = useState([]);

  useEffect(() => {
    fetchTrainings();
    fetchMuscles();
    fetchExercices();
  }, []);

  const fetchTrainings = async () => {
    var p: any = await TrainingsAPI.trainings;
    console.log(p);
    setTrainings(p);
  };

  const fetchExercices = async () => {
    var p: any = await TrainingsAPI.exercices;
    console.log(p);
    setExercices(p);
  };

  const fetchMuscles = async () => {
    var p: any = await TrainingsAPI.muscles;
    console.log(p);
    setMuscles(p);
  };

  // const exampleTrainingOnExercices = [
  //   { id: 15, exerciceId: 1, trainingId: 168, series: 9, repetition: 6 },
  // ];

  const example = {
    name: "",
    description: "",
    category: 0,
    userId: "admin",
    image:
      "https://randomwordgenerator.com/img/picture-generator/53e1d04a4c5aa414f1dc8460962e33791c3ad6e04e5074417c2b79d59448cc_640.jpg",
    listExercices: [],
    durationStart: "",
    durationEnd: "",
    createdAt: "",
    updatedAt: "",
    trainingOnExercices: [],
  };

  const handleInputChange = (e: any) => {
    console.log(e.target?.value);
    var word = e.target?.value;

    if (word.length === 0) fetchTrainings();

    var filtred = trainings.filter((item: any) =>
      item?.name.toLowerCase().includes(e.target.value.toLowerCase())
    );

    setTrainings(filtred);
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
              <Breadcrumb.Item href="/users/list">trainings</Breadcrumb.Item>
              <Breadcrumb.Item>All trainings</Breadcrumb.Item>
            </Breadcrumb>
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
              All trainings
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
                    placeholder="recherche par nom"
                    onChange={handleInputChange}
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
              <AddTrainingModal
                training={example}
                categories={muscles}
                exercices={exercices}
              />
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
              <AllUsersTable
                trainings={trainings}
                categories={muscles}
                exercices={exercices}
              />
            </div>
          </div>
        </div>
      </div>
      {/* <Pagination /> */}
    </NavbarSidebarLayout>
  );
};

const AddTrainingModal: FC<{ training: any; categories: any; exercices: any }> =
  function ({ training, exercices, categories }) {
    const [isOpen, setOpen] = useState(false);
    const [formData, setFormData] = useState(training);

    const [exo, setExo] = useState<any>("");
    const [series, setSeries] = useState("");
    const [rep, setRep] = useState("");

    var exercicesList: any = [];

    const handleChange = (e: any, key: any) => {
      const { value } = e.target;
      if (key === "trainingOnExercices") {
        exercicesList.push(value?.id);
        console.log(
          "🚀 ~ file: trainings.tsx:210 ~ handleChange ~ exercicesList:",
          exercicesList
        );
        setExo(value);
        setFormData((prevData: any) => ({
          ...prevData,
          [key]: value?.id,
        }));
        return;
      }

      setFormData((prevData: any) => ({
        ...prevData,
        [key]: value,
      }));
    };

    const generateInputs = () => {
      const keysToDisplay = Object.keys(formData).filter(
        (key) =>
          ![
            "listExercices",
            "createdAt",
            "updatedAt",
            "muscle",
            "_count",
            "category",
            "trainingOnExercices",
          ].includes(key)
      );

      return keysToDisplay.map((key) => {
        const value = formData[key];
        const inputType =
          typeof value === "number"
            ? "number"
            : typeof value === "object"
            ? "object"
            : "text";

        return (
          <div key={key}>
            <div className="mt-1">
              {key === "durationStart" || key === "durationEnd" ? (
                <>
                  <Label htmlFor={key}>{key}</Label>

                  <TextInput
                    type="date"
                    id={key}
                    name={key}
                    value={value}
                    onChange={(e) => handleChange(e, key)}
                  />
                </>
              ) : inputType === "object" || key === "category" ? (
                <>
                  <Label htmlFor={key}>{key}</Label>

                  <Select
                    id={key}
                    name={key}
                    value={value}
                    onChange={(e) => handleChange(e, key)}
                  >
                    {key === "trainingOnExercices"
                      ? exercices.map((exercice: any) => (
                          <option value={exercice}>{exercice?.name}</option>
                        ))
                      : ""}

                    {key === "category"
                      ? categories.map((category: any) => (
                          <option value={Number(category?.id)}>
                            {category?.name}
                          </option>
                        ))
                      : ""}
                  </Select>
                </>
              ) : key === "description" ? (
                <>
                  <Label htmlFor={key}>{key}</Label>

                  <Textarea
                    id={key}
                    name={key}
                    value={value}
                    onChange={(e) => handleChange(e, key)}
                  />
                </>
              ) : (
                <>
                  <Label htmlFor={key}>{key}</Label>

                  <TextInput
                    type={inputType}
                    id={key}
                    name={key}
                    value={value}
                    onChange={(e) => handleChange(e, key)}
                    disabled={key === "userId"}
                  />
                </>
              )}
            </div>
          </div>
        );
      });
    };

    const addTraining = async () => {
      console.log(formData);

      var p = {
        name: formData.name,
        description: formData.description,
        // category: formData.category,
        userId: "admin",
        image:
          "https://randomwordgenerator.com/img/picture-generator/53e1d04a4c5aa414f1dc8460962e33791c3ad6e04e5074417c2b79d59448cc_640.jpg",
        listExercices: [],
        durationStart: new Date(formData.durationStart).toISOString(),
        durationEnd: new Date(formData.durationEnd).toISOString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      await TrainingsAPI.create(p).then((data) => {
        console.log(data);
        notifications.success("Training ajouté");
        setOpen(false);
      });
      // console.log({
      //   name: "",
      //   description: "",
      //   category: 0,
      //   userId: "admin",
      //   image:
      //     "https://randomwordgenerator.com/img/picture-generator/53e1d04a4c5aa414f1dc8460962e33791c3ad6e04e5074417c2b79d59448cc_640.jpg",
      //   listExercices: [],
      //   durationStart: "",
      //   durationEnd: "",
      //   createdAt: "",
      //   updatedAt: "",
      //   trainingOnExercices: [],
      // });
    };

    const exercicesStep = () => {
      const handleExercice = () => {
        console.log({
          exerciceId: 1,
          trainingId: 168,
          series: 9,
          repetition: 6,
        });
      };
      return (
        <div className={exo.length === 0 ? "hidden" : ""}>
          series : {series} <br />
          rep : {rep} <br />
          {JSON.stringify(exo)}
          {exo?.name}
          <div className="flex flex-row my-4 justify-between items-center">
            <div>
              <Label> Series : </Label>
              <TextInput
                type="number"
                id={exo?.id}
                name={exo?.id}
                value={series}
                onChange={(e) => setSeries(e.target.value)}
              />
            </div>

            <div>
              <Label> Repetitions : </Label>
              <TextInput
                type="number"
                id={"repetitions"}
                name={"Repetitions"}
                value={rep}
                onChange={(e) => setRep(e.target.value)}
              />
            </div>

            <Button color="primary" onClick={() => setExo("")}>
              close
            </Button>
          </div>
          <Button color="primary" onClick={handleExercice}>
            add exercice
          </Button>
        </div>
      );
    };

    return (
      <>
        <Button color="primary" onClick={() => setOpen(true)}>
          <div className="flex items-center gap-x-2">
            <HiOutlinePencilAlt className="text-lg" />
            Add a new training
          </div>
        </Button>
        <Modal onClose={() => setOpen(false)} show={isOpen}>
          <Modal.Header className="border-b border-gray-200 !p-6 dark:border-gray-700">
            <strong>Add a new training</strong>
          </Modal.Header>
          {JSON.stringify(formData)}

          <Modal.Body>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {generateInputs()}
            </div>

            {exercicesStep()}

            {/* {JSON.stringify(categories)} */}
          </Modal.Body>
          <Modal.Footer>
            <Button color="primary" onClick={() => addTraining()}>
              Add
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  };

const AllUsersTable: FC<{ trainings: any; categories: any; exercices: any }> =
  function ({ trainings, exercices, categories }) {
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
          <Table.HeadCell>Muscle</Table.HeadCell>
          <Table.HeadCell>Num de Exercices </Table.HeadCell>
          <Table.HeadCell>Status</Table.HeadCell>
          <Table.HeadCell>Actions</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
          {trainings.map((training: any) => (
            <Table.Row
              className="hover:bg-gray-100 dark:hover:bg-gray-700"
              key={training?.id}
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
                    {training?.name}
                  </div>
                  <div className="text-sm font-normal text-gray-500 dark:text-gray-400">
                    {training?.userId}
                  </div>
                </div>
              </Table.Cell>
              <Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white">
                {training?.muscle?.name}
              </Table.Cell>
              <Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white">
                {training?._count?.trainingOnExercices}
              </Table.Cell>
              <Table.Cell className="whitespace-nowrap p-4 text-base font-normal text-gray-900 dark:text-white">
                <div className="flex items-center">
                  <div className="mr-2 h-2.5 w-2.5 rounded-full bg-green-400"></div>{" "}
                  Active
                </div>
              </Table.Cell>
              <Table.Cell>
                <div className="flex items-center gap-x-3 whitespace-nowrap">
                  <EditUserModal
                    training={training}
                    categories={categories}
                    exercices={exercices}
                  />
                  <DeleteUserModal id={training?.id} />
                </div>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    );
  };

const EditUserModal: FC<{ training: any; categories: any; exercices: any }> =
  function ({ training, exercices, categories }) {
    const [isOpen, setOpen] = useState(false);
    const [formData, setFormData] = useState(training);

    const handleChange = (e: any, key: any) => {
      const { value } = e.target;
      setFormData((prevData: any) => ({
        ...prevData,
        [key]: value,
      }));
    };

    const generateInputs = () => {
      const keysToDisplay = Object.keys(formData).filter(
        (key) =>
          ![
            "listExercices",
            "createdAt",
            "updatedAt",
            "muscle",
            "_count",
          ].includes(key)
      );

      return keysToDisplay.map((key) => {
        const value = formData[key];
        const inputType =
          typeof value === "number"
            ? "number"
            : typeof value === "object"
            ? "object"
            : "text";

        return (
          <div key={key}>
            <div className="mt-1">
              {key === "durationStart" || key === "durationEnd" ? (
                <>
                  <Label htmlFor={key}>{key}</Label>

                  <TextInput
                    type="date"
                    id={key}
                    name={key}
                    value={new Date(value).toISOString().split("T")[0]}
                    onChange={(e) => handleChange(e, key)}
                  />
                </>
              ) : inputType === "object" || key === "category" ? (
                <>
                  <Label htmlFor={key}>{key}</Label>

                  <Select
                    id={key}
                    name={key}
                    value={value}
                    onChange={(e) => handleChange(e, key)}
                  >
                    {key === "trainingOnExercices"
                      ? exercices.map((exercice: any) => (
                          <option value={exercice?.name}>
                            {exercice?.name}
                          </option>
                        ))
                      : ""}

                    {key === "category"
                      ? categories.map((category: any) => (
                          <option value={category?.id}>{category?.name}</option>
                        ))
                      : ""}
                  </Select>
                </>
              ) : key === "description" ? (
                <>
                  <Label htmlFor={key}>{key}</Label>

                  <Textarea
                    id={key}
                    name={key}
                    value={value}
                    onChange={(e) => handleChange(e, key)}
                  />
                </>
              ) : (
                <>
                  <Label htmlFor={key}>{key}</Label>

                  <TextInput
                    type={inputType}
                    id={key}
                    name={key}
                    value={value}
                    onChange={(e) => handleChange(e, key)}
                    disabled={key === "userId"}
                  />
                </>
              )}
            </div>
          </div>
        );
      });
    };

    const editTraining = () => {
      console.log(formData);
      console.log({
        name: "",
        description: "",
        category: 0,
        userId: "admin",
        image:
          "https://randomwordgenerator.com/img/picture-generator/53e1d04a4c5aa414f1dc8460962e33791c3ad6e04e5074417c2b79d59448cc_640.jpg",
        listExercices: [],
        durationStart: "",
        durationEnd: "",
        createdAt: "",
        updatedAt: "",
        trainingOnExercices: [],
      });
    };

    return (
      <>
        <Button color="primary" onClick={() => setOpen(true)}>
          <div className="flex items-center gap-x-2">
            <HiOutlinePencilAlt className="text-lg" />
            Edit user
          </div>
        </Button>
        <Modal onClose={() => setOpen(false)} show={isOpen}>
          <Modal.Header className="border-b border-gray-200 !p-6 dark:border-gray-700">
            <strong>Edit user</strong>
          </Modal.Header>
          {JSON.stringify(formData)}

          <Modal.Body>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {generateInputs()}
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button color="primary" onClick={() => editTraining()}>
              Save all
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  };

const DeleteUserModal: FC<{ id: number }> = function ({ id }) {
  const [isOpen, setOpen] = useState(false);

  console.log(id);
  console.log(id);
  console.log(id);
  const deleteTraining = async () => {
    await TrainingsAPI.delete(Number(id)).then((res) => {
      console.log(res);
      notifications.success("le training n° " + id + " a ete supprimée ! ");
      setOpen(false);
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
              <Button color="failure" onClick={() => deleteTraining()}>
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

export default trainingsPage;
