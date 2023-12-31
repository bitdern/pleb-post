import connectMongo from "@/lib/connectMongo";
import User from "@/models/Users";

export default function handler(req, res) {
  switch (req.method) {
    case "GET": {
      return getUsers(req, res);
    }
    case "POST": {
      return addUser(req, res);
    }
    default: {
      return res.status(405).json({ error: "Method not allowed" });
    }
  }
}

async function getUsers(req, res) {
  try {
    await connectMongo();

    const users = await User.find();

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function addUser(req, res) {
  try {
    await connectMongo();

    const name = req.body.username.replace(/\s+/g, "");

    const newUserObject = {
      username: name,
      ...req.body,
    };

    const userExists = await User.findOne({ username: name });

    if (userExists) {
      return res.status(200).json({ exists: userExists });
    }

    const user = await User.create(newUserObject);

    res.status(201).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
