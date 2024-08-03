import { PartialType } from "@nestjs/swagger";
import { CreateStoryDto } from "./create-news.dto";

export class UpdateStoryDto extends PartialType(CreateStoryDto){}