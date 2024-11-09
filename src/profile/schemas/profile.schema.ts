// src/profile/schemas/profile.schema.ts

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Profile extends Document {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true, unique: true })
  userId: Types.ObjectId;

  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop()
  profilePicture: string;

  @Prop()
  githubUrl: string;

  @Prop()
  linkedInUrl: string;

  @Prop()
  orcid: string;
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);
