import Head from "next/head";
import { useSession, signIn, signOut } from "next-auth/react";
import PostsList from "@/components/posts/postsList";

export default function Home() {
  const { data: session, status } = useSession();

  return (
    <main className="styles.main">
      <h1 className="styles.title">Pleb-Post</h1>
      <PostsList />
    </main>
  );
}
