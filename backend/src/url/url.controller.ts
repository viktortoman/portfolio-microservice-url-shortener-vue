import {Controller, Post, Body, InternalServerErrorException} from '@nestjs/common';
import {UrlService} from './url.service';
import {ConfigService} from "@nestjs/config";

@Controller('api/shorten')
export class UrlController {

    constructor(
        private readonly urlService: UrlService,
        private readonly configService: ConfigService,
    ) {
    }

    @Post()
    async shortenUrl(@Body('url') longUrl: string) {
        if (!longUrl || !longUrl.startsWith('http')) {
            throw new InternalServerErrorException('Invalid URL format. Must start with http(s).');
        }

        try {
            const urlEntry = await this.urlService.createShortUrl(longUrl);
            const port = this.configService.get<string>('NODE_PORT');
            const shortUrl = `http://localhost:${port}/${urlEntry.shortCode}`;

            return {
                longUrl: urlEntry.longUrl,
                shortCode: urlEntry.shortCode,
                shortUrl: shortUrl
            };
        } catch (e) {
            throw new InternalServerErrorException('Could not create short URL.');
        }
    }
}