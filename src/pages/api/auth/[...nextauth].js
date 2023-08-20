import axios from "axios";
import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

const giveNewUserWallet = async (username) => {
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
    `${process.env.VOLTAGE_URL}/usermanager/api/v1/users`,
    body,
    { headers: header }
  );

  console.log("response from lnbits", response);

  console.log(response.data);

  return response.data;
};

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  callbacks: {
    async session({ session }) {
      const user = await axios.post("http://localhost:3000/api/users", {
        username: session.user.name,
      });

      if (user.status === 200) {
        // add user wallet to session
        session.user = user.data.exists;
        return session;
      } else if (user.status === 201) {
        const wallet = giveNewUserWallet(user.data.username);

        user.data.wallet = wallet;

        session.user = user.data;
        return session;
      } else {
        return session;
      }
    },
  },
};
export default NextAuth(authOptions);
