import { useEffect, useState } from "react";
import Head from "next/head";
import { useSession, signIn, signOut } from "next-auth/react";
import axios from "axios";

export default function Home() {
  const { data: session, status } = useSession();
  const [user, setUser] = useState(null);
  const [userBalance, setUserBalance] = useState(null);

  useEffect(() => {
    console.log(session);
  }, [session]);

  useEffect(() => {
    if (!session) return;

  useEffect(() => {
    if (!user) return;

    const headers = {
      "Content-Type": "application/json",
      "X-Api-Key": user.in_key,
    }

    axios.get(`${process.env.VOLTAGE_URL}/api/v1/wallet`, {headers}).then((res) => {
      console.log("user wallet res", res);

      setUserBalance(res.data.balance)
    })
    .catch((err) => {
      console.log(err);
    }, [user]);

    axios
      .get(`http://localhost:3000/api/users/${session.user.username}`)
      .then((res) => {
        console.log("res", req);
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