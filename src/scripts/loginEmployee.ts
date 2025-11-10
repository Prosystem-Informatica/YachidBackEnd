import "reflect-metadata";
import { compare } from "bcryptjs";
import { Employee } from "../modules/employee/entities/Employee";
import { AppDataSource } from "../config/database";

async function loginEmployee() {
  try {
    await AppDataSource.initialize();
    console.log("Database connected successfully!");

    const employeeRepository = AppDataSource.getRepository(Employee);

    const email = "cid@example.com";
    const password = "123456";

    const employee = await employeeRepository.findOne({ where: { email } });

    if (!employee) {
      console.log("Funcionário não encontrado!");
      await AppDataSource.destroy();
      return;
    }

    const passwordMatch = await compare(password, employee.password);

    if (!passwordMatch) {
      console.log("Senha incorreta!");
    } else {
      console.log("Login bem-sucedido!");
      console.log("Funcionário autenticado:", {
        id: employee.id,
        name: employee.name,
        email: employee.email,
      });
    }

    await AppDataSource.destroy();
  } catch (err) {
    console.error("Erro ao tentar login:", err);
  }
}

loginEmployee();
