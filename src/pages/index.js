import Head from "next/head";
import { useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import PostsList from "@/components/posts/postsList";
import { Button } from "@chakra-ui/react";
import PostForm from "@/components/posts/postForm";

export default function Home() {
  const { data: session, status } = useSession();
  const [showForm, setShowForm] = useState(false);

  return (
    <main className="styles.main">
      <h1>Pleb-Post</h1>
      <Button onClick={() => setShowForm(!showForm)}>Add Post</Button>
      {showForm && <PostForm />}
      <PostsList />
    </main>
  );
}
