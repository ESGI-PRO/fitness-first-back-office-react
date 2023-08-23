import { Sidebar, TextInput } from "flowbite-react";
import type { FC } from "react";
import { useEffect, useState, useRef } from "react";
import {
  HiSearch,
  HiShoppingBag,
  HiUsers,
  HiOutlineLogout,
  HiOutlineViewGrid,
} from "react-icons/hi";
import { IoFitnessSharp, IoNutritionSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import { Toast } from 'primereact/toast';

import { authService } from "../services"; 

const ExampleSidebar: FC = function () {
  const [currentPage, setCurrentPage] = useState("");
  const toast = useRef<Toast>(null);

  const handleLogout = () => {
    authService.logout()
      .then((response: any) => {
        if (response) {
          console.log('USER IS LOGGED OUT', response);
          localStorage.removeItem('token');
          toast.current?.show({ severity: 'success', summary: 'Success', detail: 'User is logged out', life: 3000 });
          window.location.href = '/authentication/sign-in';
        }
      }
    );
  }

  useEffect(() => {
    const newPage = window.location.pathname;

    setCurrentPage(newPage);
  }, [setCurrentPage]);

  return (
    <Sidebar aria-label="Sidebar with multi-level dropdown example">
      <Toast ref={toast} />
      <div className="flex h-full flex-col justify-between py-2">
        <div>
          <form className="pb-3 md:hidden">
            <TextInput
              icon={HiSearch}
              type="search"
              placeholder="Search"
              required
              size={32}
            />
          </form>
          <Sidebar.Items>
            <Sidebar.ItemGroup>
            <Link to="/">
              <Sidebar.Item
                icon={HiOutlineViewGrid}
                className={
                  "/" === currentPage ? "bg-gray-100 dark:bg-gray-700" : ""
                }
              >
                <Link to="/">Dashboard</Link>
              </Sidebar.Item>
              </Link>
              <Sidebar.Item
                icon={IoNutritionSharp}
                className={
                  "/nutritions" === currentPage
                    ? "bg-gray-100 dark:bg-gray-700"
                    : ""
                }
              >
                <Link to="/nutritions">Nutritions</Link>
              </Sidebar.Item>



              <Link to="/ingredients">
              <Sidebar.Item
                icon={HiShoppingBag}
                className={
                  "/ingredients" === currentPage
                    ? "bg-gray-100 dark:bg-gray-700"
                    : ""
                }
              >
                <Link to="/ingredients">Ingredients</Link>
              </Sidebar.Item>
              </Link>


                
              
              <Sidebar.Item
                icon={HiUsers}
                className={
                  "/users/list" === currentPage
                    ? "bg-gray-100 dark:bg-gray-700"
                    : ""
                }
              >
                <Link to="/users/list">Users list</Link>
              </Sidebar.Item>
              <Sidebar.Item
                icon={IoFitnessSharp}
                className={
                  "/trainings" === currentPage
                    ? "bg-gray-100 dark:bg-gray-700"
                    : ""
                }
              >
                <Link to="/trainings">Trainings</Link>
              </Sidebar.Item>
              {/* <Sidebar.Item
                icon={BiMessageDetail}
                className={
                  "/comments" === currentPage
                    ? "bg-gray-100 dark:bg-gray-700"
                    : ""
                }
              >
                <Link to="/messengers">Messengers</Link>
              </Sidebar.Item> */}
            </Sidebar.ItemGroup>
            <Sidebar.ItemGroup>
              <Sidebar.Item
                icon={HiOutlineLogout}
                className="cursor-pointer"
                onClick={() => { handleLogout() }}
              >
                Logout
              </Sidebar.Item>
            </Sidebar.ItemGroup>
          </Sidebar.Items>
        </div>
      </div>
    </Sidebar>
  );
};

export default ExampleSidebar;
