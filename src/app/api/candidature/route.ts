import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB
const MAX_TOTAL_SIZE = 20 * 1024 * 1024; // 20 MB
const MAX_FILES = 10;

const ALLOWED_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "text/plain",
  "image/jpeg",
  "image/png",
];

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const firstName = String(formData.get("firstName") || "");
    const lastName = String(formData.get("lastName") || "");
    const birthDate = String(formData.get("birthDate") || "");
    const phone = String(formData.get("phone") || "");
    const email = String(formData.get("email") || "");
    const city = String(formData.get("city") || "");
    const message = String(formData.get("message") || "");
    const sector = String(formData.get("sector") || "");

    const files = formData
      .getAll("files")
      .filter((item): item is File => item instanceof File);

    // --------------------------------------------------
    // Validation
    // --------------------------------------------------

    if (!firstName || !lastName || !email || !phone || !city) {
      return Response.json(
        {
          success: false,
          error: "Les informations personnelles sont incomplètes.",
        },
        { status: 400 }
      );
    }

    if (files.length === 0) {
      return Response.json(
        {
          success: false,
          error: "Veuillez joindre au moins un document.",
        },
        { status: 400 }
      );
    }

    if (files.length > MAX_FILES) {
      return Response.json(
        {
          success: false,
          error: `Maximum ${MAX_FILES} fichiers autorisés.`,
        },
        { status: 400 }
      );
    }

    // --------------------------------------------------
    // Validate files
    // --------------------------------------------------

    let totalSize = 0;

    const attachments = [];

    for (const file of files) {
      if (!ALLOWED_TYPES.includes(file.type)) {
        return Response.json(
          {
            success: false,
            error: `Type de fichier non autorisé : ${file.name}`,
          },
          { status: 400 }
        );
      }

      if (file.size > MAX_FILE_SIZE) {
        return Response.json(
          {
            success: false,
            error: `${file.name} dépasse la limite de 10 MB.`,
          },
          { status: 400 }
        );
      }

      totalSize += file.size;

      const buffer = Buffer.from(await file.arrayBuffer());

      attachments.push({
        filename: file.name,
        content: buffer,
      });
    }

    if (totalSize > MAX_TOTAL_SIZE) {
      return Response.json(
        {
          success: false,
          error: "La taille totale des fichiers dépasse 20 MB.",
        },
        { status: 400 }
      );
    }

    // --------------------------------------------------
    // Send email
    // --------------------------------------------------

    const recipient = process.env.CANDIDATURE_RECIPIENT;

    if (!recipient) {
      console.error("CANDIDATURE_RECIPIENT is not configured.");

      return Response.json(
        {
          success: false,
          error: "Configuration email manquante.",
        },
        { status: 500 }
      );
    }

    const { data, error } = await resend.emails.send({
      from: "Candidature <onboarding@resend.dev>",
      to: [recipient],

      subject: `Nouvelle candidature - ${firstName} ${lastName}`,

      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          
          <h2>Nouvelle candidature</h2>

          <h3>Informations personnelles</h3>

          <table style="border-collapse: collapse;">
            <tr>
              <td style="padding: 6px 15px 6px 0;"><strong>Prénom :</strong></td>
              <td>${firstName}</td>
            </tr>

            <tr>
              <td style="padding: 6px 15px 6px 0;"><strong>Nom :</strong></td>
              <td>${lastName}</td>
            </tr>

            <tr>
              <td style="padding: 6px 15px 6px 0;"><strong>Email :</strong></td>
              <td>${email}</td>
            </tr>

            <tr>
              <td style="padding: 6px 15px 6px 0;"><strong>Téléphone :</strong></td>
              <td>${phone}</td>
            </tr>

            <tr>
              <td style="padding: 6px 15px 6px 0;"><strong>Date de naissance :</strong></td>
              <td>${birthDate}</td>
            </tr>

            <tr>
              <td style="padding: 6px 15px 6px 0;"><strong>Ville :</strong></td>
              <td>${city}</td>
            </tr>

            <tr>
              <td style="padding: 6px 15px 6px 0;"><strong>Secteur :</strong></td>
              <td>${sector || "Non renseigné"}</td>
            </tr>
          </table>

          <h3>Message</h3>

          <p>
            ${message || "Aucun message"}
          </p>

          <h3>Documents</h3>

          <ul>
            ${files
              .map((file) => `<li>${file.name}</li>`)
              .join("")}
          </ul>

          <hr />

          <p style="color: #777; font-size: 12px;">
            Cette candidature a été envoyée depuis le site web.
          </p>

        </div>
      `,

      attachments,
    });

    if (error) {
      console.error("Resend error:", error);

      return Response.json(
        {
          success: false,
          error: "Impossible d'envoyer la candidature.",
        },
        { status: 500 }
      );
    }

    return Response.json({
      success: true,
      message: "Candidature envoyée avec succès.",
      emailId: data?.id,
    });

  } catch (error) {
    console.error("Candidature API error:", error);

    return Response.json(
      {
        success: false,
        error: "Une erreur est survenue lors de l'envoi.",
      },
      { status: 500 }
    );
  }
}