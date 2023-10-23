import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import connect from "@/utils/db";
import Archrecord from "@/models/Archrecord";
import jwt from "jsonwebtoken";
const secret = process.env.NEXTAUTH_SECRET;
export const GET = async request => {
  const url = new URL(request.url);

  try {
    const token = await getToken({
      req: request,
      secret: secret,
      raw: true,
    });
    console.log(process.env.NEXTAUTH_SECRET, token);
    const payload = jwt.verify(token, process.env.NEXTAUTH_SECRET);
    console.log(payload);

    // const token = await getToken({ request, secret });
    // console.log("JSON Web Token", token);
    await connect();

    //const res = await fetch(`https://jsonplaceholder.typicode.com/posts`);
    //const posts = await res.json();

    const items = await Archrecord.find();
    //console.log(items);
    return new NextResponse(JSON.stringify(items), { status: 200 });
  } catch (err) {
    console.log(err);
    return new NextResponse("Database Error", { status: 500 });
  }
};

export const POST = async request => {
  const body = await request.json();

  const newItem = new Archrecord(body);

  try {
    await connect();

    await newItem.save();

    return new NextResponse("Record has been created", { status: 201 });
  } catch (err) {
    console.log(err);
    return new NextResponse("Database Error", { status: 500 });
  }
};
