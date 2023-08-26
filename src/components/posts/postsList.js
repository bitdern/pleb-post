import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./styles.module.css";

const PostsList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/posts")
      .then((res) => {
        setPosts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className={styles.posList}>
      {posts.map((post) => {
        <div className={styles.post} key={post._id}>
          <h3>{post.title}</h3>
          <p>{post.description}</p>
          <span>{post.author}</span>
        </div>;
      })}
    </div>
  );
};

export default PostsList;
