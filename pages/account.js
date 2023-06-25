import Header from "@/components/Header";
import Title from "@/components/Title";
import Center from "@/components/Center";
import { signIn, signOut, useSession } from "next-auth/react";
import Button from "@/components/Button";

export default function AccountPage() {
  const { data: session } = useSession();
  async function logout() {
    await signOut({ callbackUrl: process.env.NEXT_PUBLIC_URL });
  }

  async function login() {
    await signIn("google", {
      callbackUrl: process.env.NEXT_PUBLIC_URL,
    });
  }
  return (
    <>
      <Header />
      <Center>
        <Title>Account</Title>
        {session ? (
          <Button primary="true" onClick={logout}>
            Logout
          </Button>
        ) : (
          <Button primary="true" onClick={login}>
            Login
          </Button>
        )}
      </Center>
    </>
  );
}
