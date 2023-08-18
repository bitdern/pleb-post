import { useEffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { data: session, status } = useSession();

  useEffect(() => {
    console.log(session);
  }, [session]);

  return (
    <main>
      <h1>Hello World</h1>
      <h1>{status}</h1>

      <button onClick={() => signIn()}>login</button>
      <button onClick={() => signOut()}>logout</button>
    </main>
  );
}
