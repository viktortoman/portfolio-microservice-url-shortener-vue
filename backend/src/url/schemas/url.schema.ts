import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UrlDocument = Url & Document;

@Schema({ timestamps: true })
export class Url {
    @Prop({ required: true })
    longUrl: string;

    @Prop({ required: true, unique: true })
    shortCode: string;

    @Prop({ default: 0 })
    clickCount: number;
}

export const UrlSchema = SchemaFactory.createForClass(Url);