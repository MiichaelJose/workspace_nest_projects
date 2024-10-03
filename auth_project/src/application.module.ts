import { Module } from "@nestjs/common";
import { UserModule } from "./application/controllers/users/user.module";
import { ProductModule } from "./application/controllers/products/product.module";
import { ConfigModule } from '@nestjs/config'; // .env raiz
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from "./application/controllers/auth/auth.module";

// module is singleton
@Module({
    imports: [
        MongooseModule.forRoot('mongodb://localhost:27017/auth-nest'),
        ConfigModule.forRoot({ isGlobal: true }),
        AuthModule,
        UserModule, 
        ProductModule,
    ],
})
export class ApplicationModule {}