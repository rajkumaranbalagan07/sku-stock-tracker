import { Injectable, NotFoundException } from '@nestjs/common';
import * as stockData from '../constants/stock.json';
import * as transactionsData from '../constants/transactions.json';
import { InternalServerErrorException } from '@nestjs/common';

@Injectable()
export class StockService {
  async getStockLevel(sku: string): Promise<{ sku: string; qty: number }> {
    let initialStock: number;
    let transactions: any[];

    try {
      let stockJSONData = stockData['default'];
      initialStock = stockJSONData.find((item) => item.sku === sku)?.stock || 0;
      let transactionJSONData = transactionsData['default'];
      transactions = transactionJSONData.filter((item) => item.sku === sku);
    } catch (error) {
      console.error('An error occurred while fetching stock level: ', error);
      throw new InternalServerErrorException(
        'An error occurred while fetching stock level',
      );
    }

    if (!initialStock && transactions.length === 0) {
      throw new NotFoundException('SKU not found');
    }

    let qty = initialStock;

    transactions.forEach((transaction) => {
      if (transaction.type === 'order') {
        qty -= transaction.qty;
      } else if (transaction.type === 'refund') {
        qty += transaction.qty;
      }
    });

    return { sku, qty };
  }

  async getAllSkus(): Promise<{ sku: string; qty: number }[]> {
    try {
      let stockJSONData = stockData['default'];
      const skus = stockJSONData.map((item) => ({
        sku: item.sku,
        qty: item.stock,
      }));
      return skus;
    } catch (error) {
      console.error('An error occurred while fetching all SKUs: ', error);
      throw new InternalServerErrorException(
        'An error occurred while fetching all SKUs',
      );
    }
  }
}
