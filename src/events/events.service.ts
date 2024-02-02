import { HttpException, Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Event } from './schema/event.schema';

@Injectable()
export class EventsService {
  constructor(@InjectModel(Event.name) private eventModel: Model<Event>) {}
  async create(createEventDto: CreateEventDto) {
    return await this.eventModel.create(createEventDto);
  }
  async findAll() {
    return await this.eventModel.find().populate('category').exec();
  }
  async findByCategory(category: string) {
    try {
      return await this.eventModel
        .find({ category })
        .populate('category')
        .exec();
    } catch (error) {
      throw new HttpException('Category not found', 404);
    }
  }
}
