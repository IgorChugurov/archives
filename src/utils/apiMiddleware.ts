import { NextRequest, NextResponse } from "next/server";
import { verifyJwt } from "./jwt";

export function checkAuthorization(request: NextRequest, next: () => NextResponse) {
  const accessToken = request.headers.get("authorization")?.split(" ")[1];

  if (!accessToken || !verifyJwt(accessToken)) {
    return NextResponse.json(
      {
        message: "Unauthorized",
      },
      {
        status: 401,
      },
    );
  }

  return next();
}
