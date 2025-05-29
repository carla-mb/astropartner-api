import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return `
      <p>AstroPartner is up and running!</p>
      <p>Check it out here: <a href="https://astropartner.netlify.app/" target="_blank">AstroPartner</a></p>`;
  }
}
