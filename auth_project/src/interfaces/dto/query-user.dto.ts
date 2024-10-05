import { IsNotEmpty, IsNumberString } from "class-validator";

export class QueryUserDTO {
    @IsNumberString()
    @IsNotEmpty()
    page: number;

    @IsNumberString()
    @IsNotEmpty()
    limit: number;
}