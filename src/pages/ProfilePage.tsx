import MyReviews from "../components/MyReviews";
import { useAuth } from "../context/AuthContext";

const ProfilePage = () => {
  const { user } = useAuth();

  return (
    <div className="my-page">
      <h2>Mina sidor</h2>
      <p className="welcome-text">
        Hej och välkommen {user?.firstname || "Användare"}
      </p>

      <section className="user-info">
        <article className="info-card">
          <p>
            <strong>Förnamn:</strong> {user?.firstname}
          </p>
          <p>
            <strong>Efternamn:</strong> {user?.lastname}
          </p>
          <p>
            <strong>Email:</strong> {user?.email}
          </p>
          <p>
            <strong>Användarnamn:</strong> {user?.username}
          </p>
          <p>
            <strong>Konto skapat:</strong> {user?.created_at}
          </p>
        </article>
      </section>

      <MyReviews />
    </div>
  );
};

export default ProfilePage;
