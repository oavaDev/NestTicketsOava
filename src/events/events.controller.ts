import { Controller, Get, Post, Body, Param } from "@nestjs/common";
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  create(@Body() createEventDto: CreateEventDto) {
    return this.eventsService.create(createEventDto);
  }
  @Get()
  findAll() {
    return this.eventsService.findAll();
  }
  @Get('/category/:category')
  findByCategory(@Param() params: any) {
    return this.eventsService.findByCategory(params.category);
  }
}
