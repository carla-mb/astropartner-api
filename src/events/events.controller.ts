import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { EventsService } from './events.service';
import { EventDto } from './event.dto';
import { AuthGuard } from '@nestjs/passport';
import { ValidEventIdPipe } from './pipes/valid-event-id.pipe';
import { GetUser } from '../auth/decorators/get-user.decorator';

@Controller('events')
export class EventsController {
  constructor(private eventsService: EventsService) {}

  // Get event by ID (requires authentication)
  @Get(':id')
  @ApiBearerAuth('access_token')
  @UseGuards(AuthGuard('jwt'))
  async getEventById(
    @Param('id', ValidEventIdPipe) id: string
  ): Promise<EventDto> {
    return await this.eventsService.getEventById(id);
  }

  // Create a new event (requires authentication)
  @Post()
  @ApiBearerAuth('access_token')
  @UseGuards(AuthGuard('jwt'))
  async newEvent(
    @Body() eventDto: EventDto,
    @GetUser('userId') userId: string,
  ): Promise<EventDto> {
    eventDto.userId = userId;
    return await this.eventsService.newEvent(eventDto);
  }

  // Update event by ID (requires authentication)
  @Put(':id')
  @ApiBearerAuth('access_token')
  @UseGuards(AuthGuard('jwt'))
  async updateEvent(
    @Param('id', ValidEventIdPipe) id: string,
    @Body() eventDto: EventDto,
    @GetUser('userId') userId: string,
  ): Promise<EventDto> {
    eventDto.userId = userId;
    return await this.eventsService.updateEvent(id, eventDto);
  }

  // Delete event by ID (requires authentication)
  @Delete(':id')
  @ApiBearerAuth('access_token')
  @UseGuards(AuthGuard('jwt'))
  async deleteEvent(@Param('id', ValidEventIdPipe) id: string): Promise<void> {
    return await this.eventsService.deleteEvent(id);
  }
}
