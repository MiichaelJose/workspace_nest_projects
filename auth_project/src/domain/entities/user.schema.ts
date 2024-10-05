import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({
    type: String,
    required: true,
  })
  email: string;

  @Prop({
    type: String,
    required: true
  })
  name: string;

  @Prop({
    type: String,
    required: true
  })
  password: string;

  @Prop({
    type: String,
    required: true
  })
  role: string;

  @Prop({
    type: Date,
    default: new Date()
  })
  createAt: Date;

  @Prop({
    type: Date,
    default: new Date()
  })
  updateAt: Date;

  @Prop({
    type: Date,
  })
  deletedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);