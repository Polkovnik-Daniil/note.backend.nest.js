import { Controller, OnModuleInit } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices'; // 32 high severity vulnerabilities

@Controller()
export class EmailController {
  @EventPattern('send-email')
  async handleSendEmail(@Payload() data: any) {
    console.log(data);
    return data;
  }
}
