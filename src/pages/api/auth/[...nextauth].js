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
      if (!session.user.name) {
        return session;
      }

      // remove spaces in the username
      session.user.name = session.user.name.replace(/\s+/g, "");

      const exists = await userExists(session.user.name);

      if (exists) {
        session.user = exists;
        return session;
      }

      // If the user doesn't exist, create a wallet for them
      const wallet = await giveNewUserWallet(session.user.name);

      // With our wallet data we can now create the user in our database
      const user = {
        username: session.user.name,
        wallet_id: wallet.id,
        wallet_admin: wallet.admin,
        admin_key: wallet.adminkey,
        in_key: wallet.inkey,
      };

      const userCreated = await createUser(user);

      if (userCreated) {
        console.log("user created", userCreated);
        session.user = userCreated;
        return session;
      }

      return session;
    },
  },
};
export default NextAuth(authOptions);
