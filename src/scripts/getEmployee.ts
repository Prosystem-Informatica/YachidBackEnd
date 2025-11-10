import "reflect-metadata";
import { AppDataSource } from "../config/database";
import { Employee } from "../modules/employee/entities/Employee";

async function getEmployees() {
  try {
    await AppDataSource.initialize();
    console.log("Database connected successfully!");

    const employeeRepository = AppDataSource.getRepository(Employee);

    const employees = await employeeRepository.find();
    console.log("Employees fetched successfully:", employees);

    await AppDataSource.destroy();

    return employees;
  } catch (err) {
    console.error("Error fetching employees:", err);
    await AppDataSource.destroy();
    throw err;
  }
}

getEmployees()
  .then((employees) => {
    console.log("Returned employees:", employees);
  })
  .catch((err) => {
    console.error("Failed to fetch employees:", err);
  });
