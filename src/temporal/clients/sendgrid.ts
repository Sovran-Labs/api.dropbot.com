import sgMail from '@sendgrid/mail';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

export { sgMail };
