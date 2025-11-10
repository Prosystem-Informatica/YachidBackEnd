import "reflect-metadata";
import { hash } from "bcryptjs";
import { Employee } from "../modules/employee/entities/Employee";
import { AppDataSource } from "../config/database";

async function createEmployee() {
  try {
    await AppDataSource.initialize();
    console.log("Base de dados conectada com sucesso.");

    const employeeRepository = AppDataSource.getRepository(Employee);

    const passwordHash = await hash("123456", 8);

    const employee = employeeRepository.create({
      name: "Fabio Pimenta",
      email: "fabio@prosystem.com",
      password: passwordHash,
      phone: "1199999-9999",
      cnpj_cpf: "12345678901",
      enterprise_name: "ProSystem Informática",
      status: true,
      role: "Desenvolvedor",
    });

    await employeeRepository.save(employee);
    console.log("Funcionário criado com sucesso:", employee);

    await AppDataSource.destroy();
  } catch (err) {
    console.error("Erro ao criar funcionário:", err);
  }
}

createEmployee();
