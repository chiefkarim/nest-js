import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateProfileDto } from './dto/create-profile.dto/create-profile.dto';
import { randomUUID } from 'crypto';

@Injectable()
export class RepositoryService {
  constructor(private database: DatabaseService) {}

  async findAll() {
    const profiles = await this.database.client.execute({
      sql: `SELECT id, name, description
FROM profiles;`,
    });
    return profiles.rows;
  }

  async create(submittedProfile: CreateProfileDto) {
    const newProfile = await this.database.client.execute({
      sql: `INSERT INTO profiles (id, name, description)
VALUES (?, ?, ?);`,
      args: [randomUUID(), submittedProfile.name, submittedProfile.description],
    });
    return newProfile;
  }
}
