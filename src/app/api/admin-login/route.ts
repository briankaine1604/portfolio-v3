import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { password } = await req.json();

  if (password === process.env.ADMIN_SECRET) {
    const res = NextResponse.json({ success: true });
    res.cookies.set("admin_auth", password, {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24, // 1 day
    });
    return res;
  }

  return NextResponse.json({ success: false }, { status: 401 });
}
