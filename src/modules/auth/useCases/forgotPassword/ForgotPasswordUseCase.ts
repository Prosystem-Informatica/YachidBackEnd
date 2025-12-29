import { inject, injectable } from "tsyringe";
import nodemailer from "nodemailer";
import { PasswordResetRepository } from "../../repositories/PasswordResetRepository";
import { IEnterpriseRepository } from "../../../enterprise/repositories/IEnterpriseRepository";
import { IEmployeeRepository } from "../../../employee/repositories/IEmployeeRepository";

@injectable()
export class ForgotPasswordUseCase {
  constructor(
    @inject("EnterpriseRepository")
    private enterpriseRepository: IEnterpriseRepository,

    @inject("EmployeeRepository")
    private employeeRepository: IEmployeeRepository,

    private passwordResetRepository: PasswordResetRepository = new PasswordResetRepository()
  ) {}

  async execute(identifier: string): Promise<void> {
    const normalized = identifier.includes("@")
      ? identifier
      : identifier.replace(/\D/g, "");

    const user =
      (await this.enterpriseRepository.findByEmail(normalized)) ||
      (await this.employeeRepository.findByEmail(normalized)) ||
      (await this.enterpriseRepository.findByCnpjCpf(normalized)) ||
      (await this.employeeRepository.findByCnpjCpf(normalized));

    if (!user) return;

    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

    await this.passwordResetRepository.createReset(normalized, code, expiresAt);

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: '"Yachid ERP" <no-reply@yachid.com>',
      to: user.email,
      subject: "Código de recuperação de senha",
      html: `<p>Olá ${user.name},</p><p>Seu código é <b>${code}</b> (expira em 15 minutos).</p>`,
    });
  }
}
