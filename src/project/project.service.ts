// src/project/project.service.ts

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Project } from './schemas/project.schema';

@Injectable()
export class ProjectService {
  constructor(
    @InjectModel(Project.name) private projectModel: Model<Project>,
  ) {}

  async createProject(
    owner: Types.ObjectId,
    title: string,
    description: string,
    image: string,
  ): Promise<Project> {
    const newProject = new this.projectModel({
      owner,
      title,
      description,
      image,
    });
    return newProject.save();
  }

  async addStep(
    projectId: string,
    stepData: {
      prompt: string;
      code: string;
      packages: string[];
      directoryStructure: string;
    },
  ): Promise<Project | null> {
    return this.projectModel.findByIdAndUpdate(
      projectId,
      { $push: { steps: stepData } },
      { new: true },
      )
      .exec();
  }

  async getProjectById(projectId: string): Promise<Project | null> {
    return this.projectModel.findById(projectId).populate('owner').exec();
  }

  async getAllProjects(): Promise<Project[]> {
    return this.projectModel.find().populate('owner').exec();
  }
}
