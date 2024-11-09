// src/profile/profile.service.ts

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Profile } from './schemas/profile.schema';

@Injectable()
export class ProfileService {
  constructor(
    @InjectModel(Profile.name) private profileModel: Model<Profile>,
  ) {}

  async createProfile(
    userId: Types.ObjectId,
    profileData: Partial<Profile>,
  ): Promise<Profile> {
    const newProfile = new this.profileModel({ userId, ...profileData });
    return newProfile.save();
  }

  async getProfileByUserId(userId: Types.ObjectId): Promise<Profile | null> {
    return this.profileModel.findOne({ userId }).exec();
  }

  async updateProfile(
    userId: Types.ObjectId,
    updateData: Partial<Profile>,
  ): Promise<Profile | null> {
    return this.profileModel
      .findOneAndUpdate({ userId }, updateData, { new: true })
      .exec();
  }
}
