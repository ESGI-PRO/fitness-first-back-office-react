import { Sidebar, TextInput } from "flowbite-react";
import type { FC } from "react";
import { useEffect, useState, useRef } from "react";
import {
  HiChartPie,
  HiClipboard,
  HiCollection,
  HiInformationCircle,
  HiLogin,
  HiPencil,
  HiSearch,
  HiShoppingBag,
  HiUsers,
  HiOutlineLogout,
} from "react-icons/hi";
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
                icon={HiChartPie}
                className={
                  "/" === currentPage ? "bg-gray-100 dark:bg-gray-700" : ""
                }
              >
                <Link to="/">Dashboard</Link>
              </Sidebar.Item>
              <Sidebar.Item
                href="/e-commerce/products"
                icon={HiShoppingBag}
                className={
                  "/e-commerce/products" === currentPage
                    ? "bg-gray-100 dark:bg-gray-700"
                    : ""
                }
              >
                Products
              </Sidebar.Item>
              <Sidebar.Item
                href="/nutritions"
                icon={HiShoppingBag}
                className={
                  "/nutritions" === currentPage
                    ? "bg-gray-100 dark:bg-gray-700"
                    : ""
                }
              >
                Nutritions
              </Sidebar.Item>
              <Sidebar.Item
                href="/ingredients"
                icon={HiShoppingBag}
                className={
                  "/ingredients" === currentPage
                    ? "bg-gray-100 dark:bg-gray-700"
                    : ""
                }
              >
                Ingredients
              </Sidebar.Item>
              <Sidebar.Item
                href="/users/list"
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
                href="/trainings"
                icon={HiShoppingBag}
                className={
                  "/trainings" === currentPage
                    ? "bg-gray-100 dark:bg-gray-700"
                    : ""
                }
              >
                Trainings
              </Sidebar.Item>
              <Sidebar.Item href="/authentication/sign-in" icon={HiLogin}>
                Sign in
              </Sidebar.Item>
              <Sidebar.Item href="/authentication/sign-up" icon={HiPencil}>
                Sign up
              </Sidebar.Item> */}
            </Sidebar.ItemGroup>
            <Sidebar.ItemGroup>
              <Sidebar.Item
                icon={HiOutlineLogout}
                onClick={() => { handleLogout() }}
              >
                <Link to="/authentication/sign-in">Logout</Link>
              </Sidebar.Item>
            </Sidebar.ItemGroup>
          </Sidebar.Items>
        </div>
      </div>
    </Sidebar>
  );
};

export default ExampleSidebar;
