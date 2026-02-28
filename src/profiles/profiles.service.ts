import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CreateProfileDto } from './dto/create-profile.dto/create-profile.dto';

@Injectable()
export class ProfilesService {
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

  findAll() {
    return this.profiles;
  }

  getById(id: string) {
    const matchingProfile = this.profiles.filter((profile) => id == profile.id);
    if (matchingProfile.length < 1) {
      throw new NotFoundException(`No profile found with the id: ${id}`);
    }

    return matchingProfile;
  }

  create(submitedProfile: CreateProfileDto) {
    const newProfile = { ...submitedProfile, id: randomUUID() };
    this.profiles.push(newProfile);
    return newProfile;
  }

  update(submittedProfile: CreateProfileDto, id: string) {
    const matchingProfile = this.profiles.find((profile) => profile.id == id);
    if (!matchingProfile) {
      throw new NotFoundException(`No profile found with the id: ${id}`);
    }

    matchingProfile.name = submittedProfile.name;
    matchingProfile.description = submittedProfile.description;
    return matchingProfile;
  }

  delete(id: string) {
    const matchingProfile = this.profiles.findIndex(
      (profile) => profile.id == id,
    );
    if (matchingProfile == -1) {
      throw new NotFoundException(`No profile found with the id: ${id}`);
    }

    this.profiles.splice(matchingProfile, 1);
  }
}
