import { inject, injectable } from "tsyringe";
import nodemailer from "nodemailer";
import { PasswordResetRepository } from "../../repositories/PasswordResetRepository";
import { IEmployeeRepository } from "../../../employee/repositories/IEmployeeRepository";
import { AppError } from "../../../../shared/errors/AppError";

@injectable()
export class ForgotPasswordUseCase {
  constructor(
    @inject("EmployeeRepository")
    private employeeRepository: IEmployeeRepository,

    private passwordResetRepository: PasswordResetRepository = new PasswordResetRepository()
  ) {}

  async execute(identifier: string): Promise<void> {
    const normalized = identifier.includes("@")
      ? identifier
      : identifier.replace(/\D/g, "");

    const user = identifier.includes("@")
      ? await this.employeeRepository.findByEmail(normalized)
      : await this.employeeRepository.findByCnpjCpf(normalized);

    if (!user) {
      throw new AppError("Usuário não encontrado", 404);
    }

    if (!user.email) {
      throw new AppError(
        "Usuário não possui e-mail cadastrado para recuperação",
        400
      );
    }

    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

    await this.passwordResetRepository.createReset(user.email, code, expiresAt);

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
      html: `
        <p>Olá <strong>${user.name}</strong>,</p>
        <p>Seu código de recuperação é: <b>${code}</b></p>
        <p>Ele expira em 15 minutos.</p>
      `,
    });
  }
}
