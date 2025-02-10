import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const middleware = (req: NextRequest) => {
    const token = req.cookies.get("token")?.value;
    const url = req.nextUrl.pathname;
    if (!token && url.startsWith("/admin")) {
        return NextResponse.redirect(new URL("/", req.url));
    }
    return NextResponse.next();
}

export const config = {
    matcher: ["/admin/:path*"],
};