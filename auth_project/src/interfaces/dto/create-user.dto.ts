import { Allow, IsEmail, IsNotEmpty, IsString, MaxLength,  } from "class-validator";

export class CreateUserDTO {
    @Allow()
    _id: number

    @MaxLength(20)
    @IsNotEmpty()
    @IsString()
    name: string

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    @IsString()
    role: "ADMIN" | "USER";
}