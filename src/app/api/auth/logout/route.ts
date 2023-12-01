import { serialize } from "cookie";

import { COOKIE_NAME } from "@/constants";

export async function POST(_: Request) {
  const seralized = serialize(COOKIE_NAME, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: -1,
    path: "/",
  });

  const response = {
    message: "succesful",
  };

  return new Response(JSON.stringify(response), {
    status: 200,
    headers: { "Set-Cookie": seralized },
  });
}
