import { signOut } from "firebase/auth";
import { auth } from "../lib/firebase";
import { useDispatch, useSelector } from "react-redux";
import { resetUser } from "../features/user/userSlice";

export default function Profile() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  async function handleLogout() {
    try {
      await signOut(auth);
      dispatch(resetUser());
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <section>
      <section className="card">
        <p className="font-bold">Hey {user?.displayName || user?.email},</p>
        <p>Welcome to your Profile.</p>
      </section>
      <span>
        <button className="danger" onClick={handleLogout}>
          Logout
        </button>
      </span>
    </section>
  );
}
