import {z} from "zod";

export const UserSchema = z.object({
    id: z.string(),
    name: z.string(),
    age: z.number(),
    email: z.string().email(),
    address: z.object({
        street: z.string(),
        city: z.string(),
        zip: z.string(),
    }),
});

export class User {
    id: string;
    name: string;
    age: number;
    email: string;
    address: {
        street: string;
        city: string;
        zip: string;
    };

    constructor(data: z.infer<typeof UserSchema>) {
        this.id = data.id;
        this.name = data.name;
        this.age = data.age;
        this.email = data.email;
        this.address = data.address;
    }
}
