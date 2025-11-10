import "reflect-metadata";
import { hash } from "bcryptjs";
import { AppDataSource } from "../config/database";
import { Enterprise } from "../modules/enterprise/entities/Enterprise";

async function createEnterprise() {
  try {
    await AppDataSource.initialize();
    console.log("Base de dados conectada com sucesso.");

    const enterpriseRepository = AppDataSource.getRepository(Enterprise);

    const passwordHash = await hash("123456", 8);

    const enterprise = enterpriseRepository.create({
      name: "Prosystem Informática",
      email: "prosystem@prosystem.com",
      password: passwordHash,
      phone: "1199999-9999",
      cnpj_cpf: "12345678901112",
      status: true,
      logo: "https://example.com/logo.png",
      branches: ["Desenvolvimento", "Suporte"],
    });

    await enterpriseRepository.save(enterprise);
    console.log("Empresa criada com sucesso:", enterprise);

    await AppDataSource.destroy();
  } catch (err) {
    console.error("Erro ao criar empresa:", err);
  }
}

createEnterprise();
