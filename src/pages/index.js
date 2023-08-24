import { useEffect, useState } from "react";
import Head from "next/head";
import { useSession, signIn, signOut } from "next-auth/react";
import axios from "axios";

export default function Home() {
  const { data: session, status } = useSession();
  const [userBalance, setUserBalance] = useState(null);

  useEffect(() => {
    if (!session?.user) return;

    const headers = {
      "Content-Type": "application/json",
      "X-Api-Key": session.user.in_key,
    };

    axios
      .get(`https://2866be8917.d.voltageapp.io/usermanager/api/v1/wallets`, {
        headers,
      })
      .then((res) => {
        console.log("user wallet res", res);

        setUserBalance(res.data.balance / 1000);
      })
      .catch(
        (err) => {
          console.log(err);
        },
        [user]
      );

    axios
      .get(`http://localhost:3000/api/users/${session.user.username}`)
      .then((res) => {
        console.log("res", req);
        setUser(res.data);
      })
      .catch((err) => {
        console.log("user wallet err");
        console.log(err);
      });
  }, [session]);

  return (
    <main>
      <h1>Pleb-Post</h1>
      <h2>
        {status} / Balance {userBalance}
      </h2>

      <button onClick={() => signIn()}>login</button>
      <button onClick={() => signOut()}>logout</button>
    </main>
  );
}
