import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { UrlService } from './url.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateUrlDto } from './dto/create-url.dto';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Url')
@Controller('url')
export class UrlController {
  constructor(private readonly urlService: UrlService) { }

  @Post('shorten')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async shortenUrl(@Body() url: CreateUrlDto): Promise<{ shortUrl: string }> {
    const shortUrl = await this.urlService.shortenUrl(url.originalUrl);
    return { shortUrl };
  }

  @Get(':shortUrl')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async redirect(@Param('shortUrl') shortUrl: string): Promise<any> {
    const originalUrl = await this.urlService.getOriginalUrl(shortUrl);
    return originalUrl;
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async findAll(): Promise<any> {
    return this.urlService.findAll();
  }
}
