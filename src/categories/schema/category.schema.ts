import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import mongoose from 'mongoose';

export type CategoryDocument = HydratedDocument<Category>;
@Schema()
export class Category {
  @Prop({ type: mongoose.Schema.Types.ObjectId })
  _id: string;
  @Prop({ required: true })
  name: string;
  @Prop({ required: true })
  description: string;
  @Prop({ required: true })
  image: string;
}

export const categorySchema = SchemaFactory.createForClass(Category);
