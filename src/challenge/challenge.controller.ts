// src/challenge/challenge.controller.ts

import { Controller, Post, Body, Param, Get, Put } from '@nestjs/common';
import { ChallengeService } from './challenge.service';
import { Types } from 'mongoose';

@Controller('challenge')
export class ChallengeController {
  constructor(private readonly challengeService: ChallengeService) {}

  @Post('create')
  async createChallenge(
    @Body('description') description: string,
    @Body('code') code: string,
    @Body('participants') participants: string[],
  ) {
    const participantIds = participants.map(id => new Types.ObjectId(id));
    return this.challengeService.createChallenge(description, code, participantIds);
  }

  @Put(':id/add-prompt')
  async addPrompt(
    @Param('id') challengeId: string,
    @Body('prompt') prompt: string,
    @Body('score') score: number,
  ) {
    return this.challengeService.addPrompt(challengeId, prompt, score);
  }

  @Get(':id')
  async getChallengeById(@Param('id') challengeId: string) {
    return this.challengeService.getChallengeById(challengeId);
  }

  @Get()
  async getAllChallenges() {
    return this.challengeService.getAllChallenges();
  }
}
