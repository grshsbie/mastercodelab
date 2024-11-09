// src/challenge/challenge.module.ts

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ChallengeService } from './challenge.service';
import { ChallengeController } from './challenge.controller';
import { Challenge, ChallengeSchema } from './schemas/challenge.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Challenge.name, schema: ChallengeSchema }])],
  providers: [ChallengeService],
  controllers: [ChallengeController],
})
export class ChallengeModule {}
