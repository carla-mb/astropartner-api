import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

@Controller('moon')
export class MoonController {
  private readonly apiUrl = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline';
  private readonly apiKey = process.env.MOON_API_KEY;

  constructor(private readonly httpService: HttpService) {}

  @Get()
  async getMoonPhase(): Promise<any> {
    const url = `${this.apiUrl}/barcelona?unitGroup=us&elements=moonphase&include=days&key=${this.apiKey}&contentType=json`;

    try {
      const response = await lastValueFrom(this.httpService.get(url));
      // Forward the API response to the frontend
      return response.data; 
    } catch (error) {
      console.error('Error fetching moon phase data:', error.message);
      throw new HttpException(
        'Failed to fetch moon phase data',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
