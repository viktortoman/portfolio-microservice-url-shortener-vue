import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import * as shortid from 'shortid';
import {Url, UrlDocument} from './schemas/url.schema';

@Injectable()
export class UrlService {
    constructor(
        @InjectModel(Url.name) private urlModel: Model<UrlDocument>,
    ) {
    }

    async createShortUrl(longUrl: string): Promise<Url> {
        const existingUrl = await this.urlModel.findOne({longUrl});

        if (existingUrl) {
            return existingUrl;
        }

        const shortCode = shortid.generate();
        const newUrl = new this.urlModel({longUrl, shortCode});
        return newUrl.save();
    }

    async getLongUrl(shortCode: string): Promise<Url> {
        const url = await this.urlModel.findOneAndUpdate(
            {shortCode},
            {$inc: {clickCount: 1}},
            {new: true}
        ).exec();

        if (!url) {
            throw new NotFoundException(`Short code '${shortCode}' not found`);
        }

        return url;
    }
}