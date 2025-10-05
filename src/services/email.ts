// /src/services/email.ts
import { SendMailClient } from "zeptomail";

const client = new SendMailClient({
  url: "api.zeptomail.com/",
  token: process.env.ZOHO_API_KEY!,
  // token: "Zoho-enczapikey wSsVR60gqUb5Bvp0nT2rL708mwwHBluiFRt521Sg4iSvGPqW8sdvl0KdAgX1T/hMFGQ4FDZAou0sykoA2jsHjY4uyF5WCCiF9mqRe1U4J3x17qnvhDzDWWlUlRaPJIIMzwlqmmFoF8kk+g==",
});

export const sendEmail = async ({
  to,
  subject,
  htmlBody,
  from = { address: "noreply@briankaine.com", name: "noreply" },
}: {
  to: string;
  subject: string;
  htmlBody?: string;
  from?: { address: string; name: string };
}) => {
  try {
    const response = await client.sendMail({
      from,
      to: [
        {
          email_address: {
            address: to,
            name: to.split("@")[0],
          },
        },
      ],
      subject,
      htmlbody: htmlBody || "",
    });

    console.log("Email sent successfully:", response);
    return response;
  } catch (error) {
    console.error("Email sending failed:", error);
    // Log the full error details
    if (error instanceof Error) {
      console.error("Error message:", error.message);
      console.error("Error stack:", error.stack);
    }
    throw error;
  }
};
