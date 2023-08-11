import { Link, useLocation } from "react-router-dom";

const Navigation = () => {
  const location = useLocation();

  return (
    <nav className="bg-transparent">
      <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0 dark:border-gray-700">
            <NavItem
              to="/transfer"
              text="TRANSFER"
              currentPath={location.pathname}
            />
            <NavItem to="/swap" text="SWAP" currentPath={location.pathname} />
          </ul>
        </div>
      </div>
    </nav>
  );
};

const NavItem = ({
  to,
  text,
  currentPath,
}: {
  to: string;
  text: string;
  currentPath: string;
}) => {
  const isActive = currentPath === to;

  return (
    <li>
      <Link
        to={to}
        className={`text-white dark:text-gray-100 hover:text-gray-700 dark:hover:text-gray-300 ${
          isActive ? "font-bold text-rainbow" : ""
        }`}
      >
        <h3 className="text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
          {text}
        </h3>
      </Link>
    </li>
  );
};

export default Navigation;
