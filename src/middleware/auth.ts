import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function handleAuthMiddleware(req: NextRequest) {
    const token = req.cookies.get("token")?.value;
    const role = req.cookies.get("role")?.value;
    const url = req.nextUrl.pathname;


    if (url.startsWith("/admin")) {

        if (!token || role !== "admin") {

            return NextResponse.redirect(new URL("/", req.url));
        }

    }

    if (url.startsWith("/profile")) {

        if (!token) {

            return NextResponse.redirect(new URL("/", req.url));
        }

    }

    return NextResponse.next();
}
