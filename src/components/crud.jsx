import { Link } from "react-router-dom";
import Read from "./read";
import NoteSearch from "./note-search";
import {
  collection,
  where,
  query,
  onSnapshot,
  orderBy,
  Timestamp,
  serverTimestamp,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../lib/firebase";
import { useSelector } from "react-redux";

export default function Crud() {
  const [texts, setTexts] = useState([]);
  const [filterDate, setFilterDate] = useState("");
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
        // console.log(data);
        setTexts(data);
      },
    );

    return () => unsubscribe();
  }, [user]);

  async function handleAsc() {
    try {
      onSnapshot(
        query(
          collection(db, "notes"),
          where("author", "==", user),
          orderBy("title", "asc"),
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
    } catch (error) {
      console.error(error);
    }
  }

  async function handleDesc() {
    try {
      onSnapshot(
        query(
          collection(db, "notes"),
          where("author", "==", user),
          orderBy("title", "desc"),
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
    } catch (error) {
      console.error(error);
    }
  }

  async function handleDate(e) {
    try {
      e.preventDefault();
      const newDate = new Date(filterDate);
      console.log(newDate);
      const newTexts = texts.map((text) => {
        const textDate = new Date(text?.updatedAt);
        console.log(textDate);
        if (textDate === newDate) {
          return text;
        }
      });

      console.log(newTexts);

      // setTexts(newTexts);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <nav>
        <h3>My Notes</h3>
        <Link to={"create"}>
          <button>Create</button>
        </Link>
      </nav>
      <NoteSearch />
      <div className="flex items-center gap-2">
        <button className="secondary" onClick={handleAsc}>
          Ascending
        </button>
        <button className="secondary" onClick={handleDesc}>
          Descending
        </button>
      </div>
      <div>
        <form
          className="flex flex-row items-center gap-2"
          method="post"
          onSubmit={handleDate}
        >
          <input
            type="date"
            value={filterDate}
            onChange={(e) => {
              setFilterDate(e.target.value);
            }}
          />
          <button type="submit">Filter</button>
        </form>
      </div>
      <Read texts={texts} />
    </>
  );
}
