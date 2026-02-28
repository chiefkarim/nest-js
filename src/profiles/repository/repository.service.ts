import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class RepositoryService {
  constructor(private database: DatabaseService) {}
}
