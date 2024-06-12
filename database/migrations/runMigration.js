

import { up } from './202412062309_create_users_collection.js';

const runMigration = async () => {
  try {
    await up();
    console.log('Migration applied successfully');
  } catch (error) {
    console.error('Error applying migration:', error);
  }
};


runMigration();
