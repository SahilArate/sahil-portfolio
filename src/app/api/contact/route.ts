import { NextRequest, NextResponse } from "next/server";
import { sendContactEmail } from "@/lib/resend";
import type { ContactFormData, ApiResponse } from "@/types";

export async function POST(req: NextRequest): Promise<NextResponse<ApiResponse>> {
  try {
    const body: ContactFormData = await req.json();

    // Validate all required fields
    const { name, email, projectType, message } = body;

    if (!name || !email || !projectType || !message) {
      return NextResponse.json(
        { success: false, message: "All fields are required." },
        { status: 400 }
      );
    }

    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    // Basic length validation
    if (name.length < 2 || name.length > 100) {
      return NextResponse.json(
        { success: false, message: "Name must be between 2 and 100 characters." },
        { status: 400 }
      );
    }

    if (message.length < 10 || message.length > 2000) {
      return NextResponse.json(
        { success: false, message: "Message must be between 10 and 2000 characters." },
        { status: 400 }
      );
    }

    // Send the email
    await sendContactEmail({ name, email, projectType, message });

    return NextResponse.json(
      { success: true, message: "Message sent successfully! I will get back to you within 24 hours." },
      { status: 200 }
    );

  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { success: false, message: "Something went wrong. Please try again later." },
      { status: 500 }
    );
  }
}