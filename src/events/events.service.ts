import { Injectable } from '@nestjs/common';
import { EventsRepository } from './events.repository';
import { EventDto } from './event.dto';
import { EventEntity } from './event.entity';
import { EventMapper } from './event.mapper';

@Injectable()
export class EventsService {
  constructor(
    private eventsRepository: EventsRepository,
    private eventMapper: EventMapper,
  ) {}

  // Retrieve all events by a user and convert to DTOs
  async getEventsByUser(userId: string): Promise<EventDto[]> {
    const events = await this.eventsRepository.getEventsByUser(userId);
    return events.map(event => this.eventMapper.entityToDto(event));
  }

  // Retrieve an event by ID and convert to DTO
  async getEventById(id: string): Promise<EventDto> {
    const event: EventEntity = await this.eventsRepository.getEventById(id);
    return this.eventMapper.entityToDto(event);
  }

  // Create a new event and convert to DTO
  async newEvent(eventDto: EventDto): Promise<EventDto> {
    const newEvent = await this.eventsRepository.newEvent(eventDto);
    return this.eventMapper.entityToDto(newEvent);
  }

  // Update an event and convert to DTO
  async updateEvent(eventId: string, eventDto: EventDto): Promise<EventDto> {
    const updatedEvent = await this.eventsRepository.updateEvent(eventId, eventDto);
    return this.eventMapper.entityToDto(updatedEvent);
  }

  // Delete an event
  async deleteEvent(eventId: string): Promise<void> {
    await this.eventsRepository.deleteEvent(eventId);
  }
}
