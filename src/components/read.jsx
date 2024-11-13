import {
  collection,
  where,
  query,
  onSnapshot,
  orderBy,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../lib/firebase";
import { useSelector } from "react-redux";
import NoteCard from "./note-card";

export default function Read() {
  const [texts, setTexts] = useState([]);
  const user = useSelector((state) => state.user.uid);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(
        collection(db, "notes"),
        where("author", "==", user),
        orderBy("updatedAt", "desc"),
      ),
      (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log(data);
        setTexts(data);
      },
    );

    return () => unsubscribe();
  }, [user]);

  return (
    <>
      {texts.length > 0 ? (
        texts.map((text) => <NoteCard key={text?.id} note={text} />)
      ) : (
        <section className="card">
          <p className="font-bold">No notes to display</p>
        </section>
      )}
    </>
  );
}
