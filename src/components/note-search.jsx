import {
  query,
  collectionGroup,
  where,
  onSnapshot,
  orderBy,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../lib/firebase";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function NoteSearch() {
  const user = useSelector((state) => state.user.uid);
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    const searchNotesRealTime = () => {
      let q = query(
        collectionGroup(db, "notes"),
        where("author", "==", user),
        orderBy("updatedAt", "desc"), // Ordering by updatedAt
      );

      if (searchTerm.trim() !== "") {
        // Search by title
        const titleQuery = query(
          q,
          where("title", ">=", searchTerm),
          where("title", "<=", searchTerm + "\uf8ff"),
        );

        const unsubscribeTitle = onSnapshot(titleQuery, (snapshot) => {
          const resultsData = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setResults(resultsData);
        });

        return () => unsubscribeTitle();
      } else {
        setResults([]);
      }
    };

    if (searchTerm.trim() !== "") {
      searchNotesRealTime();
    } else {
      setResults([]);
    }
  }, [user, searchTerm]);

  return (
    <div className="flex flex-col gap-1">
      <input
        type="text"
        placeholder="Search notes by title..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)} // Update searchTerm as user types
        autoFocus
      />
      <ul className="flex flex-col gap-1">
        {results.length > 0
          ? results.map((note) => (
              <li key={note.id}>
                <Link to={`view/${note?.id}`}>
                  <p>{note?.title}</p>
                </Link>
              </li>
            ))
          : null}
      </ul>
    </div>
  );
}
