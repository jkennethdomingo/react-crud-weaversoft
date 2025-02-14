import { Box } from '@mui/material';
import { SignInPage } from '@toolpad/core/SignInPage';
import { useAuth } from "@/hooks/useAuth";

const LoginToolPad = () => {
  const { login } = useAuth();

  const signIn = async (provider, formData) => {
    if (provider.id !== "credentials") return;

    try {
      const response = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.get("email"),
          password: formData.get("password"),
        }),
      });

      if (!response.ok) throw new Error("Invalid credentials");

      const { token } = await response.json();

      login(token);
    } catch (error) {
      console.error("Login failed:", error.message);
    }
  };

  return (
    <SignInPage
      signIn={signIn}
      providers={[{ id: "credentials", name: "Email and Password" }]}
      slotProps={{ emailField: { autoFocus: false } }}
    />
  );
};

export default LoginToolPad;