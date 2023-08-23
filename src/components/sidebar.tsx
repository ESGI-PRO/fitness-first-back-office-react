import { Sidebar, TextInput } from "flowbite-react";
import type { FC } from "react";
import { useEffect, useState, useRef } from "react";
import {
  HiSearch,
  HiOutlineLogout,
  HiOutlineViewGrid,
  HiOutlineHeart,
  HiOutlineUser
} from "react-icons/hi";
import { IoIosFitness } from "react-icons/io";
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
              <Sidebar.Item
                icon={HiOutlineViewGrid}
                className={
                  "/" === currentPage ? "bg-gray-100 dark:bg-gray-700" : ""
                }
              >
                <Link to="/">Dashboard</Link>
              </Sidebar.Item>
            </Sidebar.ItemGroup>
            <Sidebar.ItemGroup>
              <Sidebar.Item icon={IoIosFitness} className="hover:bg-transparent">
                <span className="text-sm font-extrabold text-gray-500 dark:text-gray-400">
                  Trainings
                </span>
              </Sidebar.Item>
              <div className="pl-6">
                <Sidebar.Item
                  className={
                    "/trainings" === currentPage
                      ? "bg-gray-100 dark:bg-gray-700 my-1"
                      : "my-1"
                  }
                >
                  <Link to="/trainings">Trainings</Link>
                </Sidebar.Item>
              </div>
            </Sidebar.ItemGroup>
            <Sidebar.ItemGroup>
              <Sidebar.Item icon={HiOutlineHeart} className="hover:bg-transparent">
                <span className="text-sm font-extrabold text-gray-500 dark:text-gray-400">
                  Nutrition
                </span>
              </Sidebar.Item>
              <div className="pl-6">
                <Sidebar.Item
                  className={
                    "/nutritions" === currentPage
                      ? "bg-gray-100 dark:bg-gray-700 my-1"
                      : "my-1"
                  }
                >
                  <Link to="/nutritions">Recipes</Link>
                </Sidebar.Item>
                <Sidebar.Item
                  className={
                    "/ingredients" === currentPage
                      ? "bg-gray-100 dark:bg-gray-700 my-1"
                      : "my-1"
                  }
                >
                  <Link to="/ingredients">Ingredients</Link>
                </Sidebar.Item>
                <Sidebar.Item
                  className={
                    "/categories" === currentPage
                      ? "bg-gray-100 dark:bg-gray-700 my-1"
                      : "my-1"
                  }
                >
                  <Link to="/categories">Categories</Link>
                </Sidebar.Item>
              </div>
            </Sidebar.ItemGroup>
            <Sidebar.ItemGroup>
              <Sidebar.Item icon={HiOutlineUser} className="hover:bg-transparent">
                <span className="text-sm font-extrabold text-gray-500 dark:text-gray-400">
                  User
                </span>
              </Sidebar.Item>
              <div className="pl-6">
                <Sidebar.Item className={
                    "/users" === currentPage
                      ? "bg-gray-100 dark:bg-gray-700 my-1"
                      : "my-1"
                }>
                  <Link to="/users">Users list</Link>
                </Sidebar.Item>
                <Sidebar.Item  className={
                    "/users/roles" === currentPage
                      ? "bg-gray-100 dark:bg-gray-700 my-1"
                      : "my-1"
                }>
                  <Link to="/users/roles">Role list</Link>
                </Sidebar.Item>
              </div>
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
