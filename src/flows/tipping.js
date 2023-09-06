import axios from "axios";

export const createInvoice = async (user) => {
  try {
    const header = {
      "Content-Type": "application/json",
      "X-Api-Key": user.in_key,
    };

    const body = {
      memo: "tip",
      out: false,
      amount: 1,
    };

    const response = await axios.post(
      `https://2866be8917.d.voltageapp.io/api/v1/payments`,
      body,
      { headers: header }
    );

    return response.data.payment_request;
  } catch (error) {
    console.error("An error occured in createInvoice", error);
    throw error;
  }
};

export const payInvoice = async (invoice, session) => {
  try {
    const header = {
      "Content-Type": "application/json",
      "X-Api-Key": user.admin_key,
    };

    const body = {
      out: true,
      bolt11: invoice,
    };

    const response = await axios.post(
      `https://2866be8917.d.voltageapp.io/api/v1/payments`,
      body,
      { headers: header }
    );

    return response.data.payment_request;
  } catch (error) {
    console.error("An error occured in createInvoice", error);
    throw error;
  }
};

export const tipAction = async (username, session) => {
  try {
    const response = await axios.get(
      `http://localhost3000/api/users/${username}`
    );

    if (response.data) {
      const invoice = await createInvoice(response.data);

      if (invoice) {
        const tip = await payInvoice(invoice, session);
        console.log(tip);

        if (tip) {
          return true;
        }
      }
    }
  } catch (error) {
    console.error("An error occured in tipAction", error);
    throw error;
  }
};
