// middleware.js
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import { auth } from "./app/_Lib/auth";

export async function middleware(req) {
  const session = await auth();

  console.log("Session:", session);

   const restrictedRoutesForStudents = ["/orders", "/terms"];
   const restrictedRoutesForTeachers = ["/", "/product","/timetable"]; // Example routes

   const url = req.nextUrl.clone();

   // Check if the user is authenticated
   if (!session) {
     return NextResponse.redirect(new URL("/login", req.url));
   }

   // Log designation to debug
   const userDesignation = session.user?.Designation;
   console.log("User Designation:", userDesignation);

   // Block routes for students
   if (
     userDesignation === "Student" &&
     restrictedRoutesForStudents.includes(url.pathname)
   ) {
     return NextResponse.redirect(new URL("/", req.url));
   }

   // Block routes for teachers
   if (
     userDesignation === "Teacher" &&
     restrictedRoutesForTeachers.includes(url.pathname)
   ) {
     return NextResponse.redirect(new URL("/orders", req.url));
   }

   return NextResponse.next();
}

export const config = {
  matcher: ["/store", "/", "/terms", "/product", "/timetable", "/orders"],
};
