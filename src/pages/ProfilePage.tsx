import { useEffect, useState } from "react";
import MyReviews from "../components/MyReviews";
import { useAuth } from "../context/AuthContext";
import { User } from "../types/auth.types";

const ProfilePage = () => {
  const [userInformation, setUserInformation] = useState<User>();
  const { user } = useAuth();
  const token = localStorage.getItem("token");

  const fetchUser = async () => {
    const response = await fetch(
      `http://localhost:3002/users/${user?.userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error();
    }

    const data = await response.json();

    setUserInformation(data);
    return data;
  };

  useEffect(() => {
    fetchUser();
  }, [user]);

  return (
    <div className="my-page">
      <h2>Mina sidor</h2>
      <p className="welcome-text">
        Hej och välkommen {userInformation?.firstname || "Användare"}
      </p>

      <section className="user-info">
        <article className="info-card">
          <p>
            <strong>Förnamn:</strong> {userInformation?.firstname}
          </p>
          <p>
            <strong>Efternamn:</strong> {userInformation?.lastname}
          </p>
          <p>
            <strong>Email:</strong> {userInformation?.email}
          </p>
          <p>
            <strong>Användarnamn:</strong> {userInformation?.username}
          </p>
          <p>
            <strong>Konto skapat:</strong> {userInformation?.created_at}
          </p>
        </article>
      </section>

      <MyReviews />
    </div>
  );
};

export default ProfilePage;
