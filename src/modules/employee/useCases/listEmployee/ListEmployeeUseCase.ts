import { inject, injectable } from "tsyringe";
import { IEmployeeRepository } from "../../repositories/IEmployeeRepository";
import { Employee } from "../../entities/Employee";

@injectable()
export class ListEmployeesUseCase {
  constructor(
    @inject("EmployeeRepository")
    private employeeRepository: IEmployeeRepository
  ) {}

  async execute(): Promise<Employee[]> {
    const employees = await this.employeeRepository.list();
    return employees;
  }
}
