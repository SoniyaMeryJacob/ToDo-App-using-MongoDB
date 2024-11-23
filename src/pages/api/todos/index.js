import connectMongo from "@/api/connect";
import Todo from "@/models/Todo";

export default async function handler(req, res) {
  await connectMongo();

  if (req.method === "GET") {
    const todos = await Todo.find({});
    return res.status(200).json(todos);
  } else if (req.method === "POST") {
    const { title, completed } = req.body;
    const newTodo = await Todo.create({ title, completed });
    return res.status(201).json(newTodo);
  } else {
    return res.status(405).send("Method Not Allowed");
  }
}
