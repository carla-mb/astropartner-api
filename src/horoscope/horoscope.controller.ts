import { Controller, Get, Param } from '@nestjs/common';
import { HoroscopeService } from './horoscope.service';

@Controller('horoscope')
export class HoroscopeController {
  constructor(private readonly horoscopeService: HoroscopeService) {}

  // Get all horoscope data for a specific zodiac sign
  @Get(':zodiacSign')
  getHoroscopeByZodiacSign(@Param('zodiacSign') zodiacSign: string) {
    return this.horoscopeService.getHoroscopeByZodiacSign(zodiacSign);
  }
}
