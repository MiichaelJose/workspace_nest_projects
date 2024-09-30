import { IsNotEmpty,  } from "class-validator";

export class UpdateUserDTO {
    @IsNotEmpty()
    name: string
}