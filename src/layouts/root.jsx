import { Outlet } from "react-router-dom";
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import { SITE, AUTHOR } from "../lib/consts";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../lib/firebase";
import { useDispatch } from "react-redux";
import { setUser } from "../features/user/userSlice";

export default function Root() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user);
        setCurrentUser(user);
        dispatch(
          setUser({
            uid: user.uid,
            displayName: user.displayName,
            email: user.email,
            accessToken: user.accessToken,
          }),
        );
        navigate("/dashboard");
      }
    });
  }, [dispatch, navigate]);

  return (
    <div className="container">
      <Navbar site={SITE} user={currentUser} />
      <main>
        <Outlet />
      </main>
      <Footer author={AUTHOR} />
    </div>
  );
}
