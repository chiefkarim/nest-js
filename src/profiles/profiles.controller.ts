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
} from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto/create-profile.dto';
import { ProfilesService } from './profiles.service';

@Controller('profiles')
export class ProfilesController {
  constructor(private profileService: ProfilesService) {}
  @Get()
  findAll() {
    return this.profileService.findAll();
  }

  @Get('/:id')
  findById(@Param('id') id: string) {
    return this.profileService.getById(id);
  }

  @Post()
  createProfile(@Body() profile: CreateProfileDto) {
    const newProfile = this.profileService.create(profile);
    return {
      message: 'new profile created successfuly!',
      profile: newProfile,
    };
  }

  @Put('/:id')
  updateProfile(@Body() profile: CreateProfileDto, @Param('id') id: string) {
    const newProfile = this.profileService.update(profile, id);
    return newProfile;
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id') id: string) {
    this.profileService.delete(id);
  }
}
