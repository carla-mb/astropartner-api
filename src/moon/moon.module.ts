import { Module } from '@nestjs/common';
import { MoonController } from './moon.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [MoonController]
})
export class MoonModule {}
