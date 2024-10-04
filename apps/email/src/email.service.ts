import { Injectable } from '@nestjs/common';
import { EmailConsumerDto } from '@validation-core/email';

@Injectable()
export class EmailService {
  async sendMail(emailConsumerDto: EmailConsumerDto) {}
}
