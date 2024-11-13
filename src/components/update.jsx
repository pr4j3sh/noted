import { doc, getDoc, serverTimestamp, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../lib/firebase";
import { useNavigate, useParams } from "react-router-dom";

export default function Update() {
  const nav = useNavigate();
  const { id } = useParams();

  const values = {
    title: "",
    content: "",
  };
  const [formData, setFormData] = useState(values);

  useEffect(() => {
    async function getNote() {
      const data = await getDoc(doc(db, "notes", `${id}`));
      if (data.exists()) {
        setFormData(data.data());
      }
    }
    getNote();
  }, [id]);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      console.log(formData);

      await updateDoc(doc(db, "notes", `${id}`), {
        title: formData.title,
        content: formData.content,
        updatedAt: serverTimestamp(),
      });

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
      <p className="font-bold">Update</p>
      <form className="w-full" onSubmit={handleSubmit} method="post">
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
          <button type="submit">Update</button>
        </div>
      </form>
    </>
  );
}
