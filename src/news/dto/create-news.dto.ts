import{ ApiProperty} from '@nestjs/swagger';
import { IsBoolean, isNumber, IsNumber, IsString, IsUrl } from 'class-validator';

export class CreateNewsDto {

    @ApiProperty()
    @IsNumber()
    story_id: number

    @ApiProperty()
    @IsString()
    title: string;

    @ApiProperty()
    @IsString()
    author: string;

    @ApiProperty()
    @IsNumber()
    created: number;

    @ApiProperty()
    @IsUrl()
    link: string;

    @ApiProperty()
    @IsBoolean()
    visible: boolean;


}
