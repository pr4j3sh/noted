import { Link } from "react-router-dom";
import Read from "./read";

export default function Crud() {
  return (
    <>
      <nav>
        <h3>My Notes</h3>
        <Link to={"create"}>
          <button>Create</button>
        </Link>
      </nav>

      <Read />
    </>
  );
}
