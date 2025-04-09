import { Injectable, PipeTransform, BadRequestException } from '@nestjs/common';
import { EventsService } from '../events.service';

@Injectable()
// Check if an event exists given an ID
export class ValidEventIdPipe implements PipeTransform {
  constructor(private eventsService: EventsService) {}
  async transform(value: any) {
    try {
      await this.eventsService.getEventById(value);
    } catch (err) {
      throw new BadRequestException("Event ID doesn't exist");
    }
    return value;
  }
}