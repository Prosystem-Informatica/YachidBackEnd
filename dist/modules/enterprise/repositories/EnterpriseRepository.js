"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnterpriseRepository = void 0;
const database_1 = require("../../../config/database");
const Enterprise_1 = require("../entities/Enterprise");
class EnterpriseRepository {
    constructor() {
        this.repository = database_1.AppDataSource.getRepository(Enterprise_1.Enterprise);
    }
    async create({ name, email, password, }) {
        const enterprise = this.repository.create({ name, email, password });
        await this.repository.save(enterprise);
        return enterprise;
    }
    async findByEmail(email) {
        return this.repository.findOneBy({ email });
    }
    async list() {
        return this.repository.find();
    }
}
exports.EnterpriseRepository = EnterpriseRepository;
