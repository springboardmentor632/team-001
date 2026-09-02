const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendEmail = async (email, subject, otp) => {
  await transporter.sendMail({
    from: `"DecisionHub Team" <${process.env.EMAIL_USER}>`,
    to: email,
    subject,

    html: `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>DecisionHub Verification</title>
    </head>

    <body style="
      margin:0;
      padding:0;
      background:#0f172a;
      font-family:Arial,sans-serif;
    ">

      <table width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td align="center">

            <table width="600" cellpadding="0" cellspacing="0"
              style="
                background:#111827;
                margin:40px auto;
                border-radius:20px;
                overflow:hidden;
                border:1px solid #1e293b;
                box-shadow:0 10px 40px rgba(0,0,0,0.4);
              ">

              <!-- Header -->
              <tr>
                <td
                  style="
                    background:linear-gradient(135deg,#0ea5e9,#8b5cf6);
                    padding:35px;
                    text-align:center;
                  "
                >
                  <h1 style="
                    color:white;
                    margin:0;
                    font-size:32px;
                  ">
                    🚀 DecisionHub
                  </h1>

                  <p style="
                    color:white;
                    margin-top:10px;
                    font-size:14px;
                  ">
                    Smart Decisions. Better Collaboration.
                  </p>
                </td>
              </tr>

              <!-- Body -->
              <tr>
                <td style="padding:40px">

                  <h2 style="
                    color:#ffffff;
                    text-align:center;
                  ">
                    Verify Your Email
                  </h2>

                  <p style="
                    color:#cbd5e1;
                    text-align:center;
                    line-height:1.8;
                  ">
                    Welcome to DecisionHub.
                    Use the verification code below to activate your account.
                  </p>

                  <div style="
                    text-align:center;
                    margin:35px 0;
                  ">
                    <span style="
                      display:inline-block;
                      padding:18px 40px;
                      font-size:34px;
                      font-weight:bold;
                      letter-spacing:8px;
                      color:#38bdf8;
                      background:#0f172a;
                      border:2px dashed #38bdf8;
                      border-radius:15px;
                    ">
                      ${otp}
                    </span>
                  </div>

                  <p style="
                    color:#94a3b8;
                    text-align:center;
                  ">
                    This OTP will expire in
                    <strong style="color:#f59e0b">
                      10 minutes
                    </strong>
                  </p>

                  <p style="
                    color:#64748b;
                    text-align:center;
                    font-size:13px;
                    margin-top:30px;
                  ">
                    If you didn't create a DecisionHub account,
                    please ignore this email.
                  </p>

                </td>
              </tr>

              <!-- Footer -->
              <tr>
                <td style="
                  background:#0f172a;
                  padding:25px;
                  text-align:center;
                ">
                  <p style="
                    color:#64748b;
                    margin:0;
                    font-size:12px;
                  ">
                    © ${new Date().getFullYear()} DecisionHub
                  </p>

                  <p style="
                    color:#475569;
                    margin-top:8px;
                    font-size:11px;
                  ">
                    Empowering Teams To Make Better Decisions
                  </p>
                </td>
              </tr>

            </table>

          </td>
        </tr>
      </table>

    </body>
    </html>
    `,
  });
};

module.exports = sendEmail;