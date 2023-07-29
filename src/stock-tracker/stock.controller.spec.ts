import { Test, TestingModule } from '@nestjs/testing';
import { StockController } from './stock.controller';
import { StockService } from './stock.service';

describe('StockController', () => {
  let stockController: StockController;
  let stockService: StockService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StockController],
      providers: [
        {
          provide: StockService,
          useValue: {
            getStockLevel: jest.fn(),
          },
        },
      ],
    }).compile();

    stockController = module.get<StockController>(StockController);
    stockService = module.get<StockService>(StockService);
  });

  it('should return the stock level for the given SKU', async () => {
    const dto = { sku: 'LTV719449/39/39' };
    const serviceResponse = { sku: 'LTV719449/39/39', qty: 10 };

    jest
      .spyOn(stockService, 'getStockLevel')
      .mockResolvedValue(serviceResponse);

    expect(await stockController.stock(dto)).toBe(serviceResponse);
  });

  it('should throw an exception if the service fails', async () => {
    const dto = { sku: 'LTV719449/39/39' };

    jest
      .spyOn(stockService, 'getStockLevel')
      .mockRejectedValue(new Error('Service failure'));

    try {
      await stockController.stock(dto);
    } catch (error) {
      expect(error.response.error).toBe(
        'An error occurred while processing your request',
      );
    }
  });
});
