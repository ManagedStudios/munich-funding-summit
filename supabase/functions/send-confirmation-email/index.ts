import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ConfirmationEmailRequest {
  email: string;
  firstName: string;
  lastName?: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, firstName, lastName }: ConfirmationEmailRequest = await req.json();

    console.log(`Sending confirmation email to: ${email}`);

    const fullName = lastName ? `${firstName} ${lastName}` : firstName;

    const emailResponse = await resend.emails.send({
      from: "Munich Funding Summit <onboarding@resend.dev>",
      to: [email],
      subject: "Willkommen beim Munich Funding Summit - Anmeldung bestätigt!",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #333; text-align: center;">Willkommen beim Munich Funding Summit!</h1>
          
          <p>Hallo ${fullName},</p>
          
          <p>vielen Dank für Ihre Anmeldung zum Munich Funding Summit! Wir freuen uns sehr, Sie bald bei unserem Event begrüßen zu dürfen.</p>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #333; margin-top: 0;">Was passiert als nächstes?</h3>
            <ul style="color: #666;">
              <li>Sie erhalten regelmäßige Updates zum Event</li>
              <li>Weitere Details zum Programm und den Speakern</li>
              <li>Informationen zu Networking-Möglichkeiten</li>
            </ul>
          </div>
          
          <p>Falls Sie Fragen haben, können Sie uns jederzeit kontaktieren.</p>
          
          <p>Beste Grüße,<br>
          Das Munich Funding Summit Team</p>
          
          <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
          <p style="font-size: 12px; color: #999; text-align: center;">
            Diese E-Mail wurde automatisch generiert. Bitte antworten Sie nicht auf diese E-Mail.
          </p>
        </div>
      `,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true, messageId: emailResponse.data?.id }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-confirmation-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);