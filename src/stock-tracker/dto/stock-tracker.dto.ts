import { IsString, Matches } from 'class-validator';

export class SkuDto {
  @IsString()
  @Matches(/^[A-Z0-9]{3}\d{6}\/\d{2}\/\d{2}$/)
  sku: string;
}
