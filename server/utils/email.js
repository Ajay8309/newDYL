import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

/**
 * Send booking confirmation email to user
 * @param {string} to - User's email address
 * @param {string} name - User's name
 * @param {object} bookingDetails - Object containing service, price, duration
 */
export const sendBookingConfirmation = async (to, name, bookingDetails) => {
    const { service, price, duration } = bookingDetails;

    const mailOptions = {
        from: `"Decode Your Life Style" <${process.env.EMAIL_USER}>`,
        to,
        subject: 'Session Booking Confirmed - Decode Your Life Style',
        html: `
            <div style="font-family: 'serif', 'Georgia', serif; line-height: 1.6; color: #022C22; max-width: 600px; margin: 0 auto; padding: 40px; border: 1px solid #e5e7eb; border-radius: 20px;">
                <h2 style="color: #D4AF37; font-size: 24px; margin-bottom: 20px;">Booking Confirmed</h2>
                <p>Dear <strong>${name}</strong>,</p>
                <p>Great news! Your session booking has been verified and confirmed. We look forward to seeing you at our scheduled session.</p>
                
                <div style="background-color: #f9fafb; padding: 25px; border-radius: 15px; margin: 30px 0; border-left: 4px solid #D4AF37;">
                    <h3 style="margin-top: 0; font-size: 18px; color: #022C22;">Session Details:</h3>
                    <ul style="list-style: none; padding: 0;">
                        <li><strong>Service:</strong> ${service}</li>
                        <li><strong>Price:</strong> ${price}</li>
                        <li><strong>Duration:</strong> ${duration}</li>
                    </ul>
                </div>

                <p>If you have any questions before our session, feel free to reply to this email.</p>
                <p style="margin-top: 40px; font-size: 14px; color: #4b5563;">
                    Best regards,<br>
                    <strong>Aashna Ahuja</strong><br>
                    Decode Your Life Style
                </p>
            </div>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Confirmation email sent to ${to}`);
        return true;
    } catch (error) {
        console.error('Error sending email:', error);
        return false;
    }
};
