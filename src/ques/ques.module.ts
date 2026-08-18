import { Module } from '@nestjs/common';
import { QuesService } from './ques.service';
import { QuesController } from './ques.controller';
import { PrismaService } from '../../prisma/prisma.service'

@Module({
  controllers: [QuesController],
  providers: [QuesService,PrismaService],
})
export class QuesModule {}
