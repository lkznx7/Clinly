import { auth } from "@/auth"
import { NextResponse } from "next/server"

export default auth((req) => {
    const { pathname } = req.nextUrl

    if (req.auth && pathname === "/login") {
        return NextResponse.redirect(new URL("/dashboard", req.nextUrl.origin))
    }

    if (!req.auth) {
        const publicPaths = ["/login", "/register", "/forgot-password"]
        if (!publicPaths.includes(pathname)) {
            return NextResponse.redirect(new URL("/login", req.nextUrl.origin))
        }
    }
})

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
}
