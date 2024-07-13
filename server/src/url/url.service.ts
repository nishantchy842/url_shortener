import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Url } from './entities/url.entity';
import { v4 as uuidv4 } from 'uuid'; // Import the uuid package
import { Repository } from 'typeorm';
import { generateShortId } from 'src/utils/generateId';

@Injectable()
export class UrlService {
  constructor(
    @InjectRepository(Url)
    private readonly urlRepository: Repository<Url>,
  ) { }

  async shortenUrl(originalUrl: string): Promise<string> {
    const shortUrl = generateShortId();
    const newUrl = this.urlRepository.create({ originalUrl, shortUrl });
    await this.urlRepository.save(newUrl);
    return shortUrl;
  }

  async getOriginalUrl(shortUrl: string): Promise<string> {
    const url = await this.urlRepository.findOne({ where: { shortUrl } });
    if (url) {
      return url.originalUrl;
    }
    throw new Error('URL not found');
  }

  async findAll(): Promise<Url[]> {
    const url = await this.urlRepository.find();

    return url;
  }
}
