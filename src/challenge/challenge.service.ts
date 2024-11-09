// src/challenge/challenge.service.ts

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Challenge } from './schemas/challenge.schema';

@Injectable()
export class ChallengeService {
  constructor(@InjectModel(Challenge.name) private challengeModel: Model<Challenge>) {}

  async createChallenge(description: string, code: string, participants: Types.ObjectId[]): Promise<Challenge> {
    const newChallenge = new this.challengeModel({
      description,
      code,
      participants,
    });
    return newChallenge.save();
  }

  async addPrompt(challengeId: string, prompt: string, score: number): Promise<Challenge | null> {
    return this.challengeModel.findByIdAndUpdate(
      challengeId,
      { $push: { prompts: { prompt, score } } },
      { new: true },
    ).exec();
  }

  async getChallengeById(challengeId: string): Promise<Challenge | null> {
    return this.challengeModel.findById(challengeId).populate('participants').exec();
  }

  async getAllChallenges(): Promise<Challenge[]> {
    return this.challengeModel.find().populate('participants').exec();
  }
}
