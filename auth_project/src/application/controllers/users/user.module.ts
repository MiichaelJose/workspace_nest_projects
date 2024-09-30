import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService } from "src/application/services/user.service";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "src/domain/entities/user.schema";

@Module({
    imports: [MongooseModule.forFeature([{ collection: "users", schema: UserSchema, name: User.name }])],
    controllers: [UserController],
    providers: [UserService],
})
export class UserModule {}