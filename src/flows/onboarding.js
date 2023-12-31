import React from "react";
import User from "../models/Users";
import axios from "axios";
import connectMongo from "@/lib/connectMongo";

export const userExists = async (username) => {
  await connectMongo();

  const exists = await User.find({ username: username });

  if (exists.length > 0) {
    return exists[0];
  }
  return false;
};

export const giveNewUserWallet = async (username) => {
  try {
    const header = {
      "Content-Type": "application/json",
      "X-Api-Key": process.env.LNBITS_KEY,
    };

    const body = {
      user_name: username,
      wallet_name: `${username}-wallet`,
      admin_id: process.env.LNBITS_ADMIN_ID,
    };

    const response = await axios.post(
      `${process.env.LN_BITS_USER_MANAGER_URL}`,
      body,
      { headers: header }
    );

    return response.data.wallets[0];
  } catch (error) {
    console.error("An error occured in giveNewUserWallet", error);
    throw error;
  }
};

export const createUser = async (user) => {
  try {
    await connectMongo();

    const created = await User.create(user);

    if (created) {
      return created;
    }
    return false;
  } catch (error) {
    console.error("An error occured in createUser", error);
    throw error;
  }
};
