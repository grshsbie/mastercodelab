// src/project/project.service.ts

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Project } from './schemas/project.schema';
import OpenAI from 'openai';

/*
To test this service with Postman:

1. First create a project:
POST http://localhost:3000/projects
Headers:
  Content-Type: application/json
Body:
{
  "owner": "6507f6650thh8920ab123456", // Replace with valid ObjectId
  "title": "Test Project",
  "description": "A test project description",
  "image": "https://example.com/image.jpg"
}

2. Add steps to the project (use project ID from step 1):
POST http://localhost:3000/projects/6507f6650thh8920ab123456/steps
Headers:
  Content-Type: application/json
Body:
{
  "prompt": "Create a hello world app",
  "code": "console.log('Hello World')",
  "packages": ["express", "dotenv"],
  "directoryStructure": "./src\n  index.js"
}

3. Get a specific project:
GET http://localhost:3000/projects/6507f6650thh8920ab123456

4. Get all projects:
GET http://localhost:3000/projects

5. Search projects:
GET http://localhost:3000/projects/search?query=test
*/

@Injectable()
export class ProjectService {
  private openai: OpenAI;

  constructor(@InjectModel(Project.name) private projectModel: Model<Project>) {
    this.openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  }

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
    return this.projectModel
      .findByIdAndUpdate(
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

  async searchProjects(query: string): Promise<Project[]> {
    const projects = await this.projectModel
      .find({
        title: { $regex: query, $options: 'i' },
      })
      .exec();

    const response = await this.openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: 'You are a project similarity assistant.' },
        {
          role: 'user',
          content: `Find projects similar to "${query}" in the database.`,
        },
      ],
    });

    const similarProjectsContent = response.choices[0].message.content;

    return similarProjectsContent
      ? JSON.parse(similarProjectsContent)
      : projects;
  }
}
