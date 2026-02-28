import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto/create-profile.dto';
import { ProfilesService } from './profiles.service';
import { UUID } from 'crypto';
import { ProfilesGuard } from './profiles.guard';

@Controller('profiles')
export class ProfilesController {
  constructor(private profileService: ProfilesService) {}
  @Get()
  findAll() {
    return this.profileService.findAll();
  }

  @Get('/:id')
  findById(@Param('id', ParseUUIDPipe) id: UUID) {
    return this.profileService.getById(id);
  }

  @Post()
  createProfile(@Body(new ValidationPipe()) profile: CreateProfileDto) {
    const newProfile = this.profileService.create(profile);
    return {
      message: 'new profile created successfuly!',
      profile: newProfile,
    };
  }

  @Put('/:id')
  updateProfile(
    @Body(new ValidationPipe()) profile: CreateProfileDto,
    @Param('id', ParseUUIDPipe) id: UUID,
  ) {
    const newProfile = this.profileService.update(profile, id);
    return newProfile;
  }

  @Delete('/:id')
  @UseGuards(ProfilesGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', ParseUUIDPipe) id: UUID) {
    this.profileService.delete(id);
  }
}
