import { Test, TestingModule } from '@nestjs/testing';
import { RevenueTaxDetailsService } from './revenue-tax-details.service';

describe('RevenueTaxDetailsService', () => {
  let service: RevenueTaxDetailsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RevenueTaxDetailsService],
    }).compile();

    service = module.get<RevenueTaxDetailsService>(RevenueTaxDetailsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
