import createMiddleware from "next-intl/middleware";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const intlMiddleware = createMiddleware({
    locales: ["en", "ru"],
    defaultLocale: "en",
});

export function middleware(req: NextRequest) {
    const token = req.cookies.get("token")?.value;
    const url = req.nextUrl.pathname;

    if (!token && url.startsWith("/admin")) {
        return NextResponse.redirect(new URL("/", req.url));
    }

    return intlMiddleware(req);
}

// 3️⃣ Объединенный matcher
export const config = {
    matcher: ["/((?!api|_next|.*\\..*).*)"], // next-intl нужен для всех страниц
};
