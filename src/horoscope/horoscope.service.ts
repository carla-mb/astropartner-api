import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class HoroscopeService {
  private readonly horoscopeData: any[];

  constructor() {
    // Construct absolute path to horoscope data file
    const filePath = path.join(process.cwd(), 'dist', 'data', 'horoscope-data.json');
    
    // Read and parse the JSON file
    try {
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      this.horoscopeData = JSON.parse(fileContent);
    } 
    catch (error) {
      throw new Error('Horoscope data not found');
    }
  }

  // Retrieve horoscope data based on specific zodiac sign
  getHoroscopeByZodiacSign(zodiacSign: string): string[] {
    const signData = this.horoscopeData.find(
      element => element.zodiacSign === zodiacSign
    );
    if (!signData) {
      throw new Error('Horoscope data not found');
    }
    return signData;  
  }
}
