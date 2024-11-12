import { useState } from "react";
import { FlowbiteDotsVerticalOutline } from "../assets/icons/three-dot";

export default function NoteCard({ note }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);
  return (
    <section className="card">
      <article className="flex items-center justify-between">
        <p className="font-bold">{note?.title}</p>
        <div className="relative inline-block text-left">
          <button onClick={toggleDropdown} className="icon">
            <FlowbiteDotsVerticalOutline />
          </button>

          {/* Dropdown Menu */}
          {isOpen && (
            <div className="absolute right-0 mt-2 w-32 p-2 rounded card">
              <button className="secondary w-full">Edit</button>
              <button className="secondary w-full">Delete</button>
            </div>
          )}
        </div>
      </article>
      <p>{note?.content}</p>
    </section>
  );
}
