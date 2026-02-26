import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);

  constructor(private readonly configService: ConfigService) {}

  private getTransporter() {
    const host = this.configService.get('SMTP_HOST', 'smtp.gmail.com');
    const port = this.configService.get('SMTP_PORT', '587');
    const user = this.configService.get('SMTP_USER', 'giovanni@prosysteminformatica.com');
    const pass = this.configService.get('SMTP_PASS', 'Vanniz@11');

    if (!user || !pass) {
      this.logger.warn('SMTP_USER ou SMTP_PASS não configurados. E-mails não serão enviados.');
      return null;
    }

    return nodemailer.createTransport({
      host,
      port: parseInt(port, 10),
      secure: port === '465',
      auth: { user, pass },
    });
  }

  async sendPasswordResetCode(to: string, code: string): Promise<boolean> {
    const transporter = this.getTransporter();
    if (!transporter) {
      this.logger.log(`[DEV] Código de redefinição para ${to}: ${code}`);
      return false;
    }

    try {
      await transporter.sendMail({
        from: this.configService.get('SMTP_FROM', this.configService.get('SMTP_USER')),
        to,
        subject: 'Código para redefinir sua senha - Yachid',
        text: `Seu código para redefinir a senha é: ${code}\n\nEste código expira em 15 minutos.\n\nSe você não solicitou esta redefinição, ignore este e-mail.`,
        html: `
          <p>Seu código para redefinir a senha é: <strong>${code}</strong></p>
          <p>Este código expira em 15 minutos.</p>
          <p>Se você não solicitou esta redefinição, ignore este e-mail.</p>
        `,
      });
      this.logger.log(`E-mail de redefinição enviado para: ${to}`);
      return true;
    } catch (error) {
      this.logger.error(`Erro ao enviar e-mail: ${error}`);
      throw error;
    }
  }
}
