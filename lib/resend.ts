import { Resend } from 'resend'

export const resend = new Resend(process.env.RESEND_API_KEY)

export const FROM_EMAIL = 'Dũng Hoàng <dung@dunghoang.com>'
export const REPLY_TO   = 'nhamha240587@gmail.com'

// Gửi 1 email đơn giản
export async function sendEmail({
  to, subject, html
}: { to: string; subject: string; html: string }) {
  return resend.emails.send({
    from:     FROM_EMAIL,
    replyTo: REPLY_TO,
    to,
    subject,
    html,
  })
}
