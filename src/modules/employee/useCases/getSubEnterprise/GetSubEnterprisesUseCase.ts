import { inject, injectable } from "tsyringe";
import { IEmployeeRepository } from "../../repositories/IEmployeeRepository";

@injectable()
export class GetSubEnterprisesUseCase {
  constructor(
    @inject("EmployeeRepository")
    private employeeRepository: IEmployeeRepository
  ) {}

  async execute(employeeId: string) {
    return this.employeeRepository.getSubEnterprises(employeeId);
  }
}
