import { deleteDoc, doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { db } from "../lib/firebase";
import { MaterialSymbolsLightEditDocumentOutlineRounded } from "../assets/icons/edit-icon";
import { MaterialSymbolsLightDeleteForeverOutlineRounded } from "../assets/icons/delete-icon";
import moment from "moment";

export default function View() {
  const nav = useNavigate();
  const { id } = useParams();
  const [note, setNote] = useState({});

  useEffect(() => {
    async function getNote() {
      const data = await getDoc(doc(db, "notes", `${id}`));
      if (data.exists()) {
        setNote(data.data());
      } else {
        setNote({ title: "Note not found" });
      }
    }
    getNote();
  }, [id]);

  async function handleDelete(id) {
    try {
      await deleteDoc(doc(db, "notes", `${id}`));
      nav("/dashboard");
    } catch (error) {
      console.error(error);
    }
  }

  console.log({ id });
  return (
    <section>
      <h1>{note?.title}</h1>
      <p>{moment(note?.updatedAt?.toDate()).format("MMM D, YYYY")}</p>

      <div className="flex items-center gap-2">
        <Link to={`/dashboard/edit/${id}`}>
          <button className="icon">
            <MaterialSymbolsLightEditDocumentOutlineRounded />
          </button>
        </Link>
        <button className="icon" onClick={() => handleDelete(id)}>
          <MaterialSymbolsLightDeleteForeverOutlineRounded />
        </button>
      </div>
      <p>{note?.content}</p>
    </section>
  );
}
