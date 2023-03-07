import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Media } from '../entities/media.entity';
import { CreateMediaDto } from '../dto/create-media.dto';
import { UpdateMediaStatusDto } from '../dto/update-media-status.dto';

@Injectable()
export class MediaService {
  constructor(
    @InjectRepository(Media)
    private readonly mediaRepository: Repository<Media>,
  ) {}

  async create(createMediaDto: CreateMediaDto): Promise<Media> {
    const media = new Media();
    media.id = uuidv4();
    media.type = createMediaDto.type;
    media.name = createMediaDto.name;
    media.description = createMediaDto.description;
    media.url = createMediaDto.url;
    media.status = createMediaDto.status;
    media.createdAt = new Date();
    media.updatedAt = new Date();

    return this.mediaRepository.save(media);
  }

  async findAll(page = 1, perPage = 12): Promise<Media[]> {
    const skip = (page - 1) * perPage;
    const take = perPage;
    return this.mediaRepository.find({
      skip,
      take,
      order: { updatedAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<Media> {
    return this.mediaRepository.findOne(id);
  }

  async search(query: string): Promise<Media[]> {
    return this.mediaRepository
      .createQueryBuilder('media')
      .where('media.name LIKE :query OR media.description LIKE :query', { query: `%${query}%` })
      .getMany();
  }

  async update(id: string, updateMediaStatusDto: UpdateMediaStatusDto): Promise<Media> {
    const media = await this.mediaRepository.findOne(id);
    media.status = updateMediaStatusDto.status;
    media.updatedAt = new Date();

    return this.mediaRepository.save(media);
  }

  async remove(id: string): Promise<void> {
    await this.mediaRepository.softDelete(id);
  }
}
