import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';
export type EventDocument = HydratedDocument<Event>;
@Schema()
export class Event {
  @Prop({ type: mongoose.Schema.Types.ObjectId, auto: true })
  _id: string;
  @Prop({ required: true })
  name: string;
  @Prop({ required: true })
  description: string;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Category' })
  category: string;
  @Prop({ required: true })
  artists: string[];
  @Prop()
  participants: number;
  @Prop()
  date: string;
  @Prop()
  city: string;
  @Prop()
  country: string;
  @Prop()
  location: string;
  @Prop()
  price: string;
  @Prop()
  image: string;
  @Prop()
  user: string;
}
export const eventSchema = SchemaFactory.createForClass(Event);
