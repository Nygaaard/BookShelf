import { useAuth } from "../context/AuthContext";

const ProfilePage = () => {
  const { user } = useAuth();

  return (
    <div>
      <h2>Mina sidor</h2>
      <p>Hej och välkommen {user?.firstname || "Användare"}</p>
    </div>
  );
};

export default ProfilePage;
