import { ISession } from "@auth0/nextjs-auth0/dist/session/session";
import * as React from "react";

interface Props {
  session: ISession | null | undefined
}

const Navbar: React.FC<Props> = (props) => {
  return (
    <nav className="flex justify-between items-center py-4">
      <p className="navbar text-2xl font-bold text-grey-800">Aufgaben</p>
      <div className="flex">
      
        {
          props.session ? (
            <a
            href="/api/logout"
            className=" rounded bg-blue-500 hover:bg-blue-600 text-white py-2 px-4"
          >
            Logout
          </a>
          ) : (
          <div>
            <a
            href="/api/login"
            className=" rounded bg-blue-500 hover:bg-blue-600 text-white py-2 px-4"
          >
            Login / Signup
          </a>
          </div>
          )
        }

      </div>
    </nav>
  );
};

export default Navbar;
