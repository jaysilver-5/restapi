import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

enum MediaType {
  Audio = 'audio',
  Image = 'image',
}

export class CreateMediaDto {
  @IsNotEmpty()
  @IsEnum(MediaType)
  type: MediaType;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  url: string;

  @IsNotEmpty()
  @IsEnum(['Active', 'Inactive'])
  status: string;
}
