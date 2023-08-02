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
