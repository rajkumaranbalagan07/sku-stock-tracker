import { Test } from '@nestjs/testing';
import { StockService } from './stock.service';

describe('StockService', () => {
  let stockService: StockService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [StockService],
    }).compile();

    stockService = moduleRef.get<StockService>(StockService);
  });

  it('should return stock level for a given SKU', async () => {
    const result = await stockService.getStockLevel('LTV719449/39/39');
    expect(result).toEqual({ sku: 'LTV719449/39/39', qty: expect.any(Number) });
  });

  it('should throw NotFoundException for a non-existing SKU', async () => {
    await expect(
      stockService.getStockLevel('NON_EXISTING_SKU'),
    ).rejects.toThrow('SKU not found');
  });

  it('should throw InternalServerErrorException when something unexpected happens', async () => {
    // Mock the `find` method to throw an error when called.
    jest.spyOn(Array.prototype, 'find').mockImplementationOnce(() => {
      throw new Error();
    });

    await expect(stockService.getStockLevel('LTV719449/39/39')).rejects.toThrow(
      'An error occurred while fetching stock level',
    );
  });
});
