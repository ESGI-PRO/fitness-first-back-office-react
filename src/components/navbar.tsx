import type { FC } from "react";
import { DarkThemeToggle, Navbar } from "flowbite-react";
import { Link } from "react-router-dom";

const ExampleNavbar: FC = function () {
  return (
    <Navbar fluid>
      <div className="w-full p-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Navbar.Brand>
              <Link to="/" className="self-center whitespace-nowrap text-2xl font-semibold dark:text-white">
                Panel Admin
              </Link>
            </Navbar.Brand>
          </div>
          <div className="flex items-center gap-3">
            <DarkThemeToggle />
          </div>
        </div>
      </div>
    </Navbar>
  );
};

export default ExampleNavbar;
