import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "@/contexts/AuthContext";

export default function SignInButton() {
  const navigate = useNavigate();
  const { currentUser } = useAuthContext();

  return (
    <>
      {currentUser ? (
        <Button onClick={() => navigate("/profile")} variant="outline">
          My Profile
        </Button>
      ) : (
        <Button onClick={() => navigate("/login")}>
          Sign In
        </Button>
      )}
    </>
  );
}
