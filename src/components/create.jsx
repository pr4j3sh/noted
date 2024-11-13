import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useState } from "react";
import { db } from "../lib/firebase";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Create() {
  const nav = useNavigate();

  const values = {
    author: "",
    title: "",
    content: "",
  };
  const [formData, setFormData] = useState(values);
  const user = useSelector((state) => state.user.uid);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      formData.author = user;
      formData.createdAt = serverTimestamp();
      formData.updatedAt = serverTimestamp();
      console.log(formData);

      await addDoc(collection(db, "notes"), formData);

      setFormData(values);
      nav("/dashboard");
    } catch (error) {
      console.error(error);
    }
  }

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  return (
    <>
      <p className="font-bold">Create</p>
      <form onSubmit={handleSubmit} method="post" className="w-full">
        <input
          type="text"
          name="title"
          placeholder="Note title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <textarea
          type="text"
          name="content"
          placeholder="Write anything..."
          value={formData.content}
          onChange={handleChange}
          rows={4}
          required
        ></textarea>
        <div>
          <button type="submit">Create</button>
        </div>
      </form>
    </>
  );
}
