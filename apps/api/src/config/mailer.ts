import type { MailerConfig } from '@dzangolab/fastify-mailer'

const mailerConfig: MailerConfig = {
  defaults: {
    from: {
      address: 'rcorreiagodoy@gmail.com',
      name: 'DesignerHaus',
    },
  },
  test: {
    enabled: true,
    path: '/test/email',
    to: 'user@example.com',
  },
  templating: {
    templateFolder: 'mjml/templates',
  },
  transport: {
    auth: {
      pass: 'zapq pybz vkgs hefs',
      user: 'rcorreiagodoy@gmail.com',
    },
    host: 'smtp.gmail.com',
    port: 465,
    requireTLS: true,
    secure: true,
  },
}

export default mailerConfig
