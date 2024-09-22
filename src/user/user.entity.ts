import { ApiProperty } from "@nestjs/swagger";
import { Exclude } from "class-transformer";

export class User{
    @ApiProperty()
    id:number;
    
    @ApiProperty()
    name:string;

    @ApiProperty()
    email:string;
    
    @Exclude()
    password:string;
    
    constructor(partial: Partial<User>){
        Object.assign(this, partial);
    }
}
