import {Controller, Get, Param, Redirect} from '@nestjs/common';
import {UrlService} from "./url/url.service";

@Controller()
export class AppController {
    constructor(private readonly urlService: UrlService) {
    }

    @Get(':code')
    @Redirect('url', 302)
    async redirect(@Param('code') shortCode: string) {
        const urlEntry = await this.urlService.getLongUrl(shortCode);
        return {url: urlEntry.longUrl};
    }
}
