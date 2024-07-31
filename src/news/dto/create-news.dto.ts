import{ ApiProperty} from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateNewsDto {
    @ApiProperty()
    @IsString()
    title: string;

    @ApiProperty()
    @IsString()
    author: string;

    @ApiProperty()
    @IsString()
    created: string;

    @ApiProperty()
    @IsString()
    link: string;

    @ApiProperty()
    @IsString()
    visible: boolean;


}
