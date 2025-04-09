import { ApiProperty } from '@nestjs/swagger';

export class EventDto {
  @ApiProperty({ required: false })
  readonly eventId?: string;

  @ApiProperty({ required: false })
  userId?: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  start: Date;

  @ApiProperty()
  end: Date;
}
