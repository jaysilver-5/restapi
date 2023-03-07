import { IsEnum, IsNotEmpty } from 'class-validator';

export class UpdateMediaStatusDto {
  @IsNotEmpty()
  @IsEnum(['Active', 'Inactive'])
  status: string;
}
