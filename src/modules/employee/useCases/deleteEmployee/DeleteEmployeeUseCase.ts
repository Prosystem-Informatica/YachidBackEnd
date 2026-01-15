import { inject, injectable } from "tsyringe";
import { IEmployeeRepository } from "../../repositories/IEmployeeRepository";
import { AppError } from "../../../../shared/errors/AppError";

@injectable()
export class DeleteEmployeeUseCase {
  constructor(@inject("EmployeeRepository") private employeeRepository: IEmployeeRepository) {}

  async execute(id: string): Promise<void> {
    const employee = await this.employeeRepository.update(id, {}); // verifica se existe
    if (!employee) throw new AppError("Funcionário não encontrado", 404);
    await this.employeeRepository.delete(id);
  }
}