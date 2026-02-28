import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID, UUID } from 'crypto';
import { CreateProfileDto } from './dto/create-profile.dto/create-profile.dto';
import { RepositoryService } from './repository.service';

@Injectable()
export class ProfilesService {
  constructor(readonly repository: RepositoryService) {}
  private profiles = [
    {
      id: randomUUID(),
      name: 'Brianna Watts',
      description: `Looking for someone to merge with my heart. I’m a full-stack romantic who
refactors my feelings until they pass all tests. Bonus points if you can debug my issues
while we pair program over coffee. Let’s commit to something beautiful together. `,
    },

    {
      id: randomUUID(),
      name: 'Jasper Quinn',
      description: `Seeking a partner in crime to compile my heart. Must be comfortable with the
terminal because I only speak fluent bash. Swipe right if you can appreciate a good kernel
panic every now and then. `,
    },
    {
      id: randomUUID(),
      name: 'Leo Park',
      description: `You think you know VIM? Try Neovim. I'll make your modal dreams come true. Want 
to escape the matrix and explore the perfect keyboard shortcut for love?`,
    },
  ];

  async findAll() {
    return await this.repository.findAll();
  }

  getById(id: UUID) {
    const matchingProfile = this.profiles.filter((profile) => id == profile.id);
    if (matchingProfile.length < 1) {
      throw new NotFoundException(`No profile found with the id: ${id}`);
    }

    return matchingProfile;
  }

  async create(submitedProfile: CreateProfileDto) {
    const newProfile = { ...submitedProfile, id: randomUUID() };
    return await this.repository.create(newProfile);
  }

  update(submittedProfile: CreateProfileDto, id: UUID) {
    const matchingProfile = this.profiles.find((profile) => profile.id == id);
    if (!matchingProfile) {
      throw new NotFoundException(`No profile found with the id: ${id}`);
    }

    matchingProfile.name = submittedProfile.name;
    matchingProfile.description = submittedProfile.description;
    return matchingProfile;
  }

  delete(id: UUID) {
    const matchingProfile = this.profiles.findIndex(
      (profile) => profile.id == id,
    );
    if (matchingProfile == -1) {
      throw new NotFoundException(`No profile found with the id: ${id}`);
    }

    this.profiles.splice(matchingProfile, 1);
  }
}
