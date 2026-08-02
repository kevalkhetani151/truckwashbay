import nodemailer from "nodemailer";
import { z } from "zod";
import { NextResponse } from "next/server";

const contactSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: z.string().email(),
  company: z.string().min(2),
  service: z.string().min(1),
  message: z.string().min(10),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const validated = contactSchema.parse(body);
    console.log("validated data");
    console.log(validated);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.email,
        pass: process.env.password,
      },
    });

    await transporter.sendMail({
      from: process.env.email,
      to: process.env.email,
      replyTo: validated.email,
      subject: `New Fleet Inquiry from ${validated.firstName} ${validated.lastName}`,
      html: `
        <div style="font-family:Arial;padding:20px">
          <h2>New Fleet Inquiry</h2>

          <p><strong>First Name:</strong> ${validated.firstName}</p>
          <p><strong>Last Name:</strong> ${validated.lastName}</p>
          <p><strong>Email:</strong> ${validated.email}</p>
          <p><strong>Company:</strong> ${validated.company}</p>
          <p><strong>Service:</strong> ${validated.service}</p>

          <div style="margin-top:20px">
            <strong>Message:</strong>
            <p>${validated.message}</p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({
      success: true,
      message: "Inquiry submitted successfully.",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong.",
      },
      { status: 500 }
    );
  }
}