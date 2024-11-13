import { Link } from "react-router-dom";
import Read from "./read";
import NoteSearch from "./note-search";

export default function Crud() {
  return (
    <>
      <nav>
        <h3>My Notes</h3>
        <Link to={"create"}>
          <button>Create</button>
        </Link>
      </nav>
      <NoteSearch />
      <Read />
    </>
  );
}
