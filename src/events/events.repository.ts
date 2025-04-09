// events.repository.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventEntity } from './event.entity';
import { EventDto } from './event.dto';

@Injectable()
export class EventsRepository {
  constructor(
    @InjectRepository(EventEntity)
    private eventsRepository: Repository<EventEntity>,
  ) {}

  // Retrieve all events by a user
  async getEventsByUser(userId: string): Promise<EventEntity[]> {
    return this.eventsRepository.find({ where: { userId } });
  }

  // Find an event by ID
  async getEventById(eventId: string): Promise<EventEntity> {
    const event = await this.eventsRepository.findOne({ where: { eventId } });
    if (!event) {
      throw new Error('Event not found');
    }
    return event;
  }

  // Create a new event
  async newEvent(eventDto: EventDto): Promise<EventEntity> {
    const event = this.eventsRepository.create(eventDto);
    return this.eventsRepository.save(event);
  }

  // Update an event
  async updateEvent(eventId: string, eventDto: EventDto): Promise<EventEntity> {
    await this.eventsRepository.update(eventId, eventDto);
    return this.getEventById(eventId);
  }

  // Delete an event
  async deleteEvent(eventId: string): Promise<void> {
    await this.eventsRepository.delete(eventId);
  }
}
