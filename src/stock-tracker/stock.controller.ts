import {
  Body,
  Controller,
  Post,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { SkuDto } from './dto/stock-tracker.dto';
import { StockService } from './stock.service';

@Controller('stock')
export class StockController {
  constructor(private readonly stockService: StockService) {}

  @Post()
  async stock(@Body() skuDto: SkuDto) {
    try {
      const result = await this.stockService.getStockLevel(skuDto.sku);
      return result;
    } catch (error) {
      console.error('An error occurred while processing your request: ', error);
      throw error;
    }
  }
}
