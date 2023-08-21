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

  return response.data.wallets[0];
};

// TODO - figure out if a user already has a wallet

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
      const wallet = await giveNewUserWallet(session.user.name);
      const user = await axios.post("http://localhost:3000/api/users", {
        username: session.user.name,
        wallet_id: wallet.id,
        wallet_admin: wallet.admin,
        admin_key: wallet.adminkey,
        in_key: wallet.inkey,
      });

      if (user.status === 200) {
        // add user wallet to session
        session.user = user.data.exists;
        return session;
      } else if (user.status === 201) {
        session.user = user.data;
        return session;
      } else {
        return session;
      }
    },
  },
};
export default NextAuth(authOptions);
