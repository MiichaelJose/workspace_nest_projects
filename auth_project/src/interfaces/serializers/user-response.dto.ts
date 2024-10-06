
import { Exclude } from 'class-transformer';

export class UserResponseDTO {
    _id: number
    name: string
    email: string;
    role: string;

    @Exclude()
    password: string;

    constructor(partial: Partial<UserResponseDTO>) {
        Object.assign(this, partial);
    }
}