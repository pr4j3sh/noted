import { getDocs, collection } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../lib/firebase";
import { useSelector } from "react-redux";
import NoteCard from "./note-card";

export default function Read() {
  const [texts, setTexts] = useState([]);
  const user = useSelector((state) => state.user.uid);

  useEffect(() => {
    async function getTexts() {
      const res = await getDocs(collection(db, "notes"));
      const data = res.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const texts = data.filter((doc) => doc.author === user);

      setTexts(texts);
    }

    getTexts();
  }, [user]);

  return (
    <>
      <p className="font-bold">Notes</p>
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
