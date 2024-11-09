// src/challenge/schemas/challenge.schema.ts

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Challenge extends Document {
  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  code: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }] })
  participants: Types.ObjectId[];

  @Prop({ type: [{ prompt: String, score: Number }], default: [] })
  prompts: { prompt: string; score: number }[];
}

export const ChallengeSchema = SchemaFactory.createForClass(Challenge);
