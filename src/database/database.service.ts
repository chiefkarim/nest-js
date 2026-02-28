import { Client, createClient } from '@libsql/client';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DatabaseService {
  private readonly authToken: string | undefined;
  private readonly databaseUrl: string | undefined;
  readonly client: Client;
  constructor() {
    this.authToken = process.env.TURSO_DATABASE_AUTH_TOKEN;
    this.databaseUrl = process.env.TURSO_DATABASE_URL;
    if (this.databaseUrl == undefined || this.authToken == undefined) {
      throw new Error(
        'Missing TURSO_DATABASE_URL or TURSO_DATABASE_AUTH_TOKEN',
      );
    }

    this.client = createClient({
      url: this.databaseUrl,
      authToken: this.authToken,
    });
  }
}
