import { inject, injectable } from "tsyringe";
import { IEmployeeRepository } from "../../repositories/IEmployeeRepository";
import { Employee } from "../../entities/Employee";
import { AppError } from "../../../../shared/errors/AppError";

@injectable()
export class UpdateEmployeeUseCase {
  constructor(
    @inject("EmployeeRepository")
    private employeeRepository: IEmployeeRepository
  ) {}

  async execute(
    id: string,
    data: Partial<Employee> & { subEnterpriseIds?: string[] | number[] }
  ): Promise<Employee> {
    let subIds: number[] | undefined = undefined;
    if (data.subEnterpriseIds) {
      subIds = data.subEnterpriseIds.map((s) => Number(s));
    }

    const updatedEmployee = await this.employeeRepository.update(id, {
      ...data,
      subEnterpriseIds: subIds,
    });

    if (!updatedEmployee) {
      throw new AppError("Funcionário não encontrado", 404);
    }

    return updatedEmployee;
  }
}
