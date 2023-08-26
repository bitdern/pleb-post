import Head from "next/head";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Home() {
  const { data: session, status } = useSession();

  return (
    <main>
      <h1>Pleb-Post</h1>
    </main>
  );
}
