import { Link } from "react-router-dom";
import ModeToggle from "./mode-toggle";
import { MaterialSymbolsLightPerson2OutlineRounded } from "../assets/icons/user";

export default function Navbar({ site, user }) {
  return (
    <nav>
      <a href="/" className="font-semibold">
        {site?.REPO}
      </a>
      <ul className="flex items-center gap-2">
        <li>
          <ModeToggle />
        </li>
        {user?.uid && (
          <li>
            <Link to={"/dashboard/profile"}>
              <button className="icon">
                <MaterialSymbolsLightPerson2OutlineRounded />
              </button>
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}
