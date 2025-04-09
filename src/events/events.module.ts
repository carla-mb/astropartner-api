import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';
import { EventMapper } from './event.mapper';
import { EventEntity } from './event.entity';
import { EventsRepository } from './events.repository';

@Module({
  imports: [TypeOrmModule.forFeature([EventEntity])],
  controllers: [EventsController],
  providers: [
    EventsService,
    EventMapper,
    EventsRepository
  ],
  exports: [EventsModule]
})
export class EventsModule {}
