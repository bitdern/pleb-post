import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { FormControl, Input, FormLabel } from "@chakra-ui/react";
import axios from "axios";

const PostForm = () => {
  const { data: session, status } = useSession();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    author: "",
  });

  const handleSubmit = () => {
    return;
  };

  return <form onSubmit={handleSubmit}></form>;
};

export default PostForm;
