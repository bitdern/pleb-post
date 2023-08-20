import { useEffect } from "react";
import Head from "next/head";
import { useSession, signIn, signOut } from "next-auth/react";
import axios from "axios";

export default function Home() {
  const { data: session, status } = useSession();
  const [user, setUser] = useState(null);

  useEffect(() => {
    console.log(session);
  }, [session]);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/users/${session.user.username}`)
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
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
