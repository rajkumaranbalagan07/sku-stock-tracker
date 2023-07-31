import {
  Body,
  Controller,
  Post,
  HttpException,
  HttpStatus,
  Get,
  Param,
  ValidationPipe,
} from '@nestjs/common';
import { SkuDto } from './dto/stock-tracker.dto';
import { StockService } from './stock.service';

@Controller('stock')
export class StockController {
  constructor(private readonly stockService: StockService) {}

  @Get('sku/:sku')
  async stock(@Param('sku') sku: string) {
    try {
      sku = decodeURIComponent(sku);
      const result = await this.stockService.getStockLevel(sku);
      return result;
    } catch (error) {
      console.error('An error occurred while processing your request: ', error);
      throw error;
    }
  }

  @Get('skus')
  async getAllSkus() {
    try {
      const skus = await this.stockService.getAllSkus();
      return skus;
    } catch (error) {
      console.error('An error occurred while fetching all SKUs: ', error);
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'An error occurred while fetching all SKUs',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
