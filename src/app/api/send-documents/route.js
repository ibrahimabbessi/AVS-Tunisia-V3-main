import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    const formData = await request.formData();

    const files = formData.getAll("files");

    if (!files || files.length === 0) {
      return Response.json(
        { error: "No files were provided." },
        { status: 400 }
      );
    }

    // Convert files to Resend attachments
    const attachments = [];

    for (const file of files) {
      if (!(file instanceof File)) {
        continue;
      }

      // Optional: only allow PDFs
      if (file.type !== "application/pdf") {
        return Response.json(
          {
            error: `${file.name} is not a PDF.`,
          },
          { status: 400 }
        );
      }

      const arrayBuffer = await file.arrayBuffer();

      const buffer = Buffer.from(arrayBuffer);

      attachments.push({
        filename: file.name,
        content: buffer,
      });
    }

    if (attachments.length === 0) {
      return Response.json(
        { error: "No valid PDF files were provided." },
        { status: 400 }
      );
    }

    const { data, error } = await resend.emails.send({
      from: "Documents <onboarding@resend.dev>",
      to: [process.env.DOCUMENT_RECIPIENT],
      subject: "Documents from Website",
      html: `
        <h2>New Documents</h2>

        <p>
          The following documents were submitted from the website:
        </p>

        <ul>
          ${attachments
            .map((file) => `<li>${file.filename}</li>`)
            .join("")}
        </ul>

        <p>
          The PDF files are attached to this email.
        </p>
      `,
      attachments,
    });

    if (error) {
      console.error("Resend error:", error);

      return Response.json(
        {
          error: error.message || "Failed to send email.",
        },
        { status: 500 }
      );
    }

    return Response.json({
      success: true,
      message: "Documents sent successfully.",
      emailId: data?.id,
    });
  } catch (error) {
    console.error("Server error:", error);

    return Response.json(
      {
        error: "Something went wrong while sending the documents.",
      },
      { status: 500 }
    );
  }
}