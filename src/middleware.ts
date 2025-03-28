import { handleLocaleMiddleware } from "./middleware/locale";
import { handleAuthMiddleware } from "./middleware/auth";
import {NextRequest, NextResponse} from "next/server";

export function middleware(req: NextRequest) {

    const authResponse = handleAuthMiddleware(req);
    if (authResponse && authResponse.status !== 200) return authResponse;


    if (
        !req.nextUrl.pathname.startsWith("/admin") &&
        !req.nextUrl.pathname.startsWith("/profile") &&
        !req.nextUrl.pathname.startsWith("/members")
    ) {
        return handleLocaleMiddleware(req);
    }



    return NextResponse.next();
}


export const config = {
    matcher: ["/((?!api|_next|.*\\..*).*)"],
};
