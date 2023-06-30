import { mongooseConnect } from "@/lib/mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";
import { Order } from "@/models/Order";

export default async function handle(req, res) {
  await mongooseConnect();

  const session = await getServerSession(req, res, authOptions);
  if (req.method === "GET") {
    res.json(await Order.find({ userEmail: session?.user.email }));
  }

  if (req.method === "DELETE") {
    if (req.query?.id) {
      await Order.deleteOne({ _id: req.query.id });
      res.json(true);
    }
  }
}
