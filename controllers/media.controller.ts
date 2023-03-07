import { Controller, Get, Post, Patch, Delete, Param, Query, Body } from '@nestjs/common';
import { MediaService } from '../service/media.service';
import { CreateMediaDto } from '../dto/create-media.dto';
import { UpdateMediaStatusDto } from '../dto/update-media-status.dto';

@Controller('media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @Post()
  async create(@Body() createMediaDto: CreateMediaDto) {
    const media = await this.mediaService.create(createMediaDto);
    return {
      status: 'success',
      message: 'Media created successfully',
      data: media,
    };
  }

  @Get()
  async findAll(@Query('page') page: number, @Query('perPage') perPage: number) {
    const media = await this.mediaService.findAll(page, perPage);
    return {
      status: 'success',
      message: 'Media fetched successfully',
      data: media,
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const media = await this.mediaService.findOne(id);
    return {
      status: 'success',
      message: 'Media fetched successfully',
      data: media,
    };
  }

  @Get('search')
  async search(@Query('query') query: string) {
    const media = await this.mediaService.search(query);
    return {
      status: 'success',
      message: 'Media fetched successfully',
      data: media,
    };
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateMediaStatusDto: UpdateMediaStatusDto) {
    const media = await this.mediaService.update(id, updateMediaStatusDto);
    return {
      status: 'success',
      message: 'Media updated successfully',
      data: media,
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.mediaService.remove(id);
    return {
      status: 'success',
      message: 'Media deleted successfully',
    };
  }
}
