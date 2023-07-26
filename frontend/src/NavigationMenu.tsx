import { Link } from "react-router-dom";

const NavigationMenu = () => {
  return (
    <nav className="bg-transparent ">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0 dark:border-gray-700">
            <Link
              to="/transfer"
              className="text-white dark:text-gray-100 hover:text-gray-700 dark:hover:text-gray-300"
            >
              transfer
            </Link>
            <Link
              to="/allowance"
              className="text-white dark:text-gray-100 hover:text-gray-700 dark:hover:text-gray-300"
            >
              {" "}
              allowance{" "}
            </Link>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavigationMenu;
