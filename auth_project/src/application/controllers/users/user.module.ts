import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService } from "src/application/services/user.service";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "src/domain/entities/user.schema";
import { UserRepository } from "src/domain/repositories/users/user.repository";
import { APP_GUARD } from "@nestjs/core";
import { AuthGuard } from "src/infrastructure/guard/auth.guard";

@Module({
    imports: [MongooseModule.forFeature([{ collection: "users", schema: UserSchema, name: User.name }])],
    controllers: [UserController],
    providers: [
        UserService, 
        UserRepository,
        // nest vincula o guard a todos os endpoints do module
        {
            provide: APP_GUARD,
            useClass: AuthGuard
        }
    ],
    exports: [UserService]
})
export class UserModule {}