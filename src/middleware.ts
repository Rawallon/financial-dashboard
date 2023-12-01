import { type JWTPayload, jwtVerify } from "jose";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { COOKIE_NAME } from "@/constants";

export async function verify(
  token: string,
  secret: string
): Promise<JWTPayload> {
  // `jsonwebtoken` wont run on the Edge (since it doesnt include crypto), that's why I am using jose,
  // Another way this could be done is moving this logic to an API then making a req. to that endpoint
  const { payload } = await jwtVerify(token, new TextEncoder().encode(secret));
  return payload;
}

export async function middleware(request: NextRequest, _: NextResponse) {
  const session = request.cookies.get(COOKIE_NAME);

  if (!session) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  const secret = process.env.JWT_SECRET || "";
  try {
    verify(session?.value, secret);
    return NextResponse.next();
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(`Error on auth: ${e}`);
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/dashboard/:path*"],};
