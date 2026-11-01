import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { AuthModule } from '../auth/auth.module.js';
import { UsersModule } from '../users/users.module.js';
import { MembersModule } from '../members/members.module.js';
import { PaymentsModule } from '../payments/payments.module.js';
import { NewsModule } from '../news/news.module.js';
import { DisciplinesModule } from '../disciplines/disciplines.module.js';
import { EventsModule } from '../events/events.module.js';
import { StaffModule } from '../staff/staff.module.js';
import { MessagesModule } from '../messages/messages.module.js';
import { AuditLogsModule } from '../audit-logs/audit-logs.module.js';
import { FilesModule } from '../files/files.module.js';
import { AiModule } from '../ai/ai.module.js';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    MembersModule,
    PaymentsModule,
    NewsModule,
    DisciplinesModule,
    EventsModule,
    StaffModule,
    MessagesModule,
    AuditLogsModule,
    FilesModule,
    AiModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
