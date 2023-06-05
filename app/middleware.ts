import { NextRequest, NextResponse } from "next/server"

export const middleware = (request: NextRequest) => {
  if (request.method == "POST") {
    const authorization = request.headers.get("Authorization");
    if (!authorization) return NextResponse.json({}, { status: 401 });

    const [type, slug] = authorization?.split(" ")!;
    if (type != "Bearer" || slug != process.env["BEARER_TOKEN"])
      return NextResponse.json({}, { status: 401 });
  }
}

export const config = {
  matcher: "/api/:function*"
}
