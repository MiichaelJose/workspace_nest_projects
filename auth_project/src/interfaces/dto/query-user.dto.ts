import { IsNotEmpty } from "class-validator";

export class QueryUserDTO {
    @IsNotEmpty()
    page: number;

    @IsNotEmpty()
    limit: number;
}