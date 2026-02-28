import { Module } from '@nestjs/common';
import { ProfilesController } from './profiles.controller';
import { ProfilesService } from './profiles.service';
import { RepositoryService } from './repository/repository.service';

@Module({
  controllers: [ProfilesController],
  providers: [ProfilesService, RepositoryService],
})
export class ProfilesModule {}
