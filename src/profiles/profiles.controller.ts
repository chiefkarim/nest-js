import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto/create-profile.dto';

@Controller('profiles')
export class ProfilesController {
  @Get()
  findAll(@Query('location') location: string) {
    return [{ location: location }];
  }

  @Get('/:id')
  findById(@Param('id') id: string) {
    return { id };
  }

  @Post()
  createProfile(@Body() createProfileDto: CreateProfileDto) {
    return { createProfileDto };
  }

  @Put('/:id')
  updateProfile(
    @Body() createProfileDto: CreateProfileDto,
    @Param('id') id: string,
  ) {
    return { id, profile: createProfileDto };
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id') id: string) {}
}
