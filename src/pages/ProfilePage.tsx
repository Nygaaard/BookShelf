import { useAuth } from "../context/AuthContext";

const ProfilePage = () => {
  const { user } = useAuth();

  return (
    <div>
      <h2>Mina sidor</h2>
      <p>Hej och välkommen {user?.firstname || "Användare"}</p>

      <section>
        <article>
          <p>Förnamn: {user?.firstname}</p>
          <p>Efternamn: {user?.lastname}</p>
          <p>Email: {user?.email}</p>
          <p>Användarnamn: {user?.username}</p>
          <p>Konto skapat: {user?.created_at}</p>
        </article>
      </section>
    </div>
  );
};

export default ProfilePage;
