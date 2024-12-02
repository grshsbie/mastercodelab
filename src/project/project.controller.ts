// src/project/project.controller.ts

import {
  Controller,
  Post,
  Body,
  Param,
  Get,
  Patch,
  Query,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { Types } from 'mongoose';

@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post('create')
  async createProject(
    @Body('owner') owner: string,
    @Body('title') title: string,
    @Body('description') description: string,
    @Body('image') image: string,
  ) {
    return this.projectService.createProject(new Types.ObjectId(owner), title, description, image);
  }

  @Get('/searchByName')
  async searchProjects(@Query('query') query: string) {
    return this.projectService.searchProjects(query);
  }

  @Patch(':id/add-step')
  async addStep(
    @Param('id') projectId: string,
    @Body() stepData: { prompt: string; code: string; packages: string[]; directoryStructure: string },
  ) {
    return this.projectService.addStep(projectId, stepData);
  }

  @Get(':id')
  async getProjectById(@Param('id') projectId: string) {
    return this.projectService.getProjectById(projectId);
  }

  @Get()
  async getAllProjects() {
    return this.projectService.getAllProjects();
  }


}
