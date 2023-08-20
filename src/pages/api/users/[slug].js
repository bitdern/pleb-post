import connectMongo from "@/lib/connectMongo";
import User from "@/models/Users";

export default function handler(req, res) {
  switch (req.method) {
    case "GET": {
      return getUserById(req, res);
    }
    default: {
      return res.status(405).json({ error: "Method not allowed" });
    }
  }
}

async function getUserById(req, res) {
  try {
    await connectMongo();

    const user = await User.findOne({ username: req.query.slug });

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
