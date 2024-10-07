
import { Exclude, Transform, } from 'class-transformer';

export class ResponseUserDTO {
    // convertendo em Buffer para String
    @Transform(({ value }) => value.toString())
    _id: string

    name: string
    email: string;
    role: string;

    @Exclude()
    password: string;

    @Exclude()
    __v: string

    // Partial transforma todas as propriedades de um tipo T em opcionais.
    constructor(partial: Partial<ResponseUserDTO>) {
        Object.assign(this, partial);
    }
}