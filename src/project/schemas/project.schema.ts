// src/project/schemas/project.schema.ts

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Project extends Document {
  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop()
  image: string;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  owner: Types.ObjectId;

  @Prop({
    type: [
      {
        prompt: String,
        code: String,
        packages: [String],
        directoryStructure: String,
      },
    ],
    default: [],
  })
  steps: {
    prompt: string;
    code: string;
    packages: string[];
    directoryStructure: string;
  }[];
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
