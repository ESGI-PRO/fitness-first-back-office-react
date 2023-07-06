import { Badge, Dropdown, Table } from "flowbite-react";
import { useEffect, type FC, useState } from "react";
import NavbarSidebarLayout from "../layouts/navbar-sidebar";
import { Link } from "react-router-dom";
import { nutritionsService, trainingsService, usersService, subscriptionsService } from "../services"; 

const DashboardPage: FC = function () {
  const [ingredients, setIngredients] = useState<any>([]);
  const [nutritions, setNutritions] = useState<any>([]);
  const [trainings, setTrainings] = useState<any>([]);

  useEffect(() => {
    nutritionsService.getAll().then((x: any) => setNutritions(x.data.data.nutrition));
    trainingsService.getAll().then((x: any) => setTrainings(x.data.data.training));
    nutritionsService.getIngredients().then((x: any) => setIngredients(x.data.data.nutrition));
  }, []);

  return (
    <NavbarSidebarLayout>
      <div className="px-4 pt-6">
        <div className="flex items-center justify-around">
          <SalesThisWeek count={ingredients.length} title={`Ingredients`} />
          <SalesThisWeek count={nutritions.length} title={`Nutritions`} />
          <SalesThisWeek count={trainings.length} title={`Trainings`} />
        </div>

        <div className="my-6">
          <LatestTransactions />
        </div>
        <div className="my-6">
          <LatestRegisteredUsers />
        </div>
        <div className="my-6">
          <PlanOverview />
        </div>
      </div>
    </NavbarSidebarLayout>
  );
};

const SalesThisWeek: FC<{ count: number; title: string }> = function ({
  count,
  title,
}) {
  return (
    <div className="rounded-lg w-40 bg-white p-4 shadow dark:bg-gray-800 sm:p-6 xl:p-8">
      <div className="mb-4">
        <div className="shrink-0 text-center">
          <span className="text-2xl font-bold leading-none text-gray-900 dark:text-white sm:text-3xl">
            {count}
          </span>
          <h3 className="text-base font-normal text-gray-600 dark:text-gray-400">
            {title}
          </h3>
        </div>
      </div>
    </div>
  );
};

const Datepicker: FC = function () {
  return (
    <span className="text-sm text-gray-600">
      <Dropdown inline label="Last 7 days">
        <Dropdown.Item>Last 7 days</Dropdown.Item>
        <Dropdown.Item>Last 30 days</Dropdown.Item>
        <Dropdown.Item>Last 90 days</Dropdown.Item>
      </Dropdown>
    </span>
  );
};

const LatestRegisteredUsers: FC = function () {
  const [users, setUsers] = useState<any>([]);

  useEffect(() => {
    usersService.getAll().then((x: any) => setUsers(x.data));
  }, []);

  return (
    <div className="mb-4 h-full rounded-lg bg-white p-4 shadow dark:bg-gray-800 sm:p-6">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
          Latest Registered Users
        </h3>
        <Link
          to="/users/list"
          className="inline-flex items-center rounded-lg p-2 text-sm font-medium text-primary-700 hover:bg-gray-100 dark:text-primary-500 dark:hover:bg-gray-700"
        >
          View all
        </Link>
      </div>
      <div className="flow-root">
        <ul className="divide-y divide-gray-200 dark:divide-gray-700 mb-2">
          {users.slice(-5).map((user: any) => (
          <li className="py-3 sm:py-4">
            <div className="flex items-center space-x-4">
              <div className="shrink-0">
                <span
                    className="bg-gray-400 h-2 w-2 p-5 rounded-full font-bold text-white text-xl uppercase flex items-center justify-center"
                    aria-hidden="true">
                    {user.userName[0]}
                </span>
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate capitalize text-sm font-medium text-gray-900 dark:text-white">
                  {user.userName}
                </p>
                <p className="truncate lowercase text-sm text-gray-500 dark:text-gray-400">
                  {user.email}
                </p>
              </div>
              <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                {user.is_confirmed ? ( 
                  <div className="mr-2 h-2.5 w-2.5 rounded-full bg-green-500"></div>
                ) : ( 
                  <div className="mr-2 h-2.5 w-2.5 rounded-full bg-red-600"></div>
                )}
              </div>
            </div>
          </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const LatestTransactions: FC = function () {
  const [invoices, setInvoices] = useState<any>([]);

  useEffect(() => {
    subscriptionsService.getAllInvoices()
      .then((x: any) => setInvoices(x.data))
      .catch((error: any) => console.log(error));
  }, []);

  return (
    <div className="rounded-lg bg-white p-4 shadow dark:bg-gray-800 sm:p-6 xl:p-8">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
            Latest Transactions
          </h3>
          <span className="text-base font-normal text-gray-600 dark:text-gray-400">
            This is a list of latest transactions to plan
          </span>
        </div>
      </div>
      <div className="mt-8 flex flex-col">
        <div className="overflow-x-auto rounded-lg">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden shadow sm:rounded-lg">
              <Table
                striped
                className="min-w-full divide-y divide-gray-200 dark:divide-gray-600"
              >
                <Table.Head className="bg-gray-50 dark:bg-gray-700">
                  <Table.HeadCell>Transaction</Table.HeadCell>
                  <Table.HeadCell>Date &amp; Time</Table.HeadCell>
                  <Table.HeadCell>Amount</Table.HeadCell>
                  <Table.HeadCell>Status</Table.HeadCell>
                </Table.Head>
                <Table.Body className="bg-white dark:bg-gray-800">
                  {invoices.slice(0, 10).map((invoice: any, index: number) => (
                    <Table.Row key={index}>
                      <Table.Cell className="whitespace-nowrap p-4 text-sm font-normal text-gray-900 dark:text-white">
                        Payment from{" "}
                        <span className="font-semibold">
                          #{invoice.userId}
                        </span>
                      </Table.Cell>
                      <Table.Cell className="whitespace-nowrap p-4 text-sm font-normal text-gray-500 dark:text-gray-400">
                        {invoice.createdAt.slice(0, 10)}
                      </Table.Cell>
                      <Table.Cell className="whitespace-nowrap p-4 text-sm font-semibold text-gray-900 dark:text-white">
                        {invoice.amountPaid} $
                      </Table.Cell>
                      <Table.Cell className="flex whitespace-nowrap p-4">
                        <Badge color="success">Completed</Badge>
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between pt-3 sm:pt-6">
        <Datepicker />
      </div>
    </div>
  );
};

const PlanOverview: FC = function () {
  const [plans, setPlans] = useState<any>([]);

  useEffect(() => {
    subscriptionsService.getAllPlans()
      .then((x: any) => setPlans(x.data))
      .catch((error: any) => console.log(error));
  }, []);

  console.log(plans);
  return (
    <div className="rounded-lg bg-white p-4 shadow dark:bg-gray-800 sm:p-6 xl:p-8">
      <h3 className="mb-6 text-xl font-bold leading-none text-gray-900 dark:text-white">
        Plan Overview
      </h3>
      <div className="flex flex-col">
        <div className="overflow-x-auto rounded-lg">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden shadow sm:rounded-lg">
              <Table className="min-w-full table-fixed">
                <Table.Head>
                  <Table.HeadCell className="whitespace-nowrap rounded-l border-x-0 bg-gray-50 py-3 px-4 text-left align-middle text-xs font-semibold uppercase text-gray-700 dark:bg-gray-700 dark:text-white">
                    Plan
                  </Table.HeadCell>
                  <Table.HeadCell className="whitespace-nowrap border-x-0 bg-gray-50 py-3 px-4 text-left align-middle text-xs font-semibold uppercase text-gray-700 dark:bg-gray-700 dark:text-white">
                    Users Subscribed
                  </Table.HeadCell>
                  <Table.HeadCell className="min-w-[140px] whitespace-nowrap rounded-r border-x-0 bg-gray-50 py-3 px-4 text-left align-middle text-xs font-semibold uppercase text-gray-700 dark:bg-gray-700 dark:text-white">
                    Acquisition
                  </Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y divide-gray-100 dark:divide-gray-700">
                  {plans.map((plan: any, index: number) => (
                  <Table.Row className="text-gray-500 dark:text-gray-400" key={index}>
                    <Table.Cell className="whitespace-nowrap border-t-0 p-4 text-left align-middle text-sm font-normal">
                      {plan.name}
                    </Table.Cell>
                    <Table.Cell className="whitespace-nowrap border-t-0 p-4 align-middle text-xs font-medium text-gray-900 dark:text-white">
                      5,649
                    </Table.Cell>
                    <Table.Cell className="whitespace-nowrap border-t-0 p-4 align-middle text-xs">
                      <div className="flex items-center">
                        <span className="mr-2 text-xs font-medium">30%</span>
                        <div className="relative w-full">
                          <div className="h-2 w-full rounded-sm bg-gray-200 dark:bg-gray-700">
                            <div
                              className="h-2 rounded-sm bg-primary-700"
                              style={{ width: "30%" }}
                            />
                          </div>
                        </div>
                      </div>
                    </Table.Cell>
                  </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
