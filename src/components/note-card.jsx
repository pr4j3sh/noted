import { useState } from "react";
import { FlowbiteDotsVerticalOutline } from "../assets/icons/three-dot";
import { Link } from "react-router-dom";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../lib/firebase";

export default function NoteCard({ note }) {
  const [isOpen, setIsOpen] = useState(false);

  async function handleDelete(id) {
    try {
      await deleteDoc(doc(db, "notes", `${id}`));
    } catch (error) {
      console.error(error);
    }
  }
  function limitContentTo20Words(content) {
    const words = content?.split(" ");
    if (words?.length > 20) {
      return words.slice(0, 20).join(" ") + "...";
    }
    return content;
  }
  const toggleDropdown = () => setIsOpen(!isOpen);
  return (
    <section className="card">
      <article className="flex items-center justify-between">
        <Link to={`view/${note?.id}`}>
          <p className="font-bold">{note?.title}</p>
        </Link>
        <div className="relative inline-block text-left">
          <button onClick={toggleDropdown} className="icon">
            <FlowbiteDotsVerticalOutline />
          </button>

          {isOpen && (
            <div className=" dropdown">
              <Link to={`edit/${note?.id}`}>
                <button className="secondary w-full border-0">Edit</button>
              </Link>
              <button
                onClick={() => handleDelete(note?.id)}
                className="secondary w-full border-0"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </article>
      <p>{limitContentTo20Words(note?.content)}</p>
    </section>
  );
}
