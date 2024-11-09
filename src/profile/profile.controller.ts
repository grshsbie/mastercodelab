// src/profile/profile.controller.ts

import { Controller, Post, Body, Param, Patch, Get } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { Types } from 'mongoose';
import { Profile } from './schemas/profile.schema'; // اضافه کردن این خط

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Post('create')
  async createProfile(
    @Body('userId') userId: string,
    @Body() profileData: Partial<Profile>,
  ) {
    return this.profileService.createProfile(new Types.ObjectId(userId), profileData);
  }

  @Get(':userId')
  async getProfile(@Param('userId') userId: string) {
    return this.profileService.getProfileByUserId(new Types.ObjectId(userId));
  }

  @Patch(':userId')
  async updateProfile(
    @Param('userId') userId: string,
    @Body() updateData: Partial<Profile>,
  ) {
    return this.profileService.updateProfile(new Types.ObjectId(userId), updateData);
  }
}
