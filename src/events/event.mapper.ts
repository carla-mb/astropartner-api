// event.mapper.ts
import { Injectable } from '@nestjs/common';
import { EventEntity } from './event.entity';
import { EventDto } from './event.dto';

@Injectable()
export class EventMapper {
  // Convert an EventEntity to an EventDto
  entityToDto(eventEntity: EventEntity): EventDto {
    return {
      eventId: eventEntity.eventId,
      userId: eventEntity.userId,
      title: eventEntity.title,
      start: eventEntity.start,
      end: eventEntity.end,
      color: eventEntity.color,
    };
  }

  // Convert an EventDto to an EventEntity
  dtoToEntity(eventDto: EventDto): EventEntity {
    const event = new EventEntity();
    event.userId = eventDto.userId!; 
    event.title = eventDto.title;
    event.start = new Date(eventDto.start);
    event.end = new Date(eventDto.end);
    event.color = eventDto.color;
    return event;
  }
}
