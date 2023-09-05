import axios from "axios";

export const createInvoice = async (user) => {
  try {
    const header = {
      "Content-Type": "application/json",
      "X-Api-Key": user.in_key,
    };

    const body = {
      memo: data.memo,
      amount: data.amount,
      description_hash: data.description_hash,
    };

    const response = await axios.post(
      `${process.env.LN_BITS_USER_MANAGER_URL}`,
      body,
      { headers: header }
    );

    return response.data;
  } catch (error) {
    console.error("An error occured in createInvoice", error);
    throw error;
  }
};
