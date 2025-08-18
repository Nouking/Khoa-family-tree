#!/usr/bin/env node
/*
  Seed or update the local admin user password in data/users.json.
  Usage:
    node scripts/seed-admin.mjs --password=newpass
    node scripts/seed-admin.mjs            # defaults to 'admin'
*/

import fs from 'fs/promises';
import path from 'path';
// Import bcrypt from the family-tree subdirectory where it's installed
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const bcrypt = require('../family-tree/node_modules/bcryptjs');

const __dirname = process.cwd();

async function main() {
  // The script should always be run from project root, so target family-tree/data/users.json
  const USERS_FILE = path.join(__dirname, 'family-tree', 'data', 'users.json');
  
  const args = process.argv.slice(2);
  const provided = args.find(a => a.startsWith('--password='));
  const newPassword = provided ? provided.split('=')[1] : 'admin';

  // Validate password parameter
  if (!newPassword || newPassword.trim().length === 0) {
    console.error('Error: Password cannot be empty');
    process.exit(1);
  }

  if (newPassword.length < 3) {
    console.error('Error: Password must be at least 3 characters long');
    process.exit(1);
  }

  console.log(`Setting admin password...`);
  console.log(`Target file: ${USERS_FILE}`);

  const hash = await bcrypt.hash(newPassword, 10);

  // Ensure data directory exists
  const dataDir = path.dirname(USERS_FILE);
  try {
    await fs.mkdir(dataDir, { recursive: true });
  } catch (e) {
    console.error(`Error creating data directory: ${e.message}`);
    process.exit(1);
  }

  let content;
  try {
    content = JSON.parse(await fs.readFile(USERS_FILE, 'utf8'));
  } catch (e) {
    if (e.code === 'ENOENT') {
      console.log('Creating new users.json file...');
      content = { users: [] };
    } else {
      console.error(`Error reading users file: ${e.message}`);
      process.exit(1);
    }
  }

  const now = new Date().toISOString();
  const idx = content.users.findIndex(u => u.username === 'admin');
  if (idx >= 0) {
    content.users[idx] = {
      ...content.users[idx],
      password: hash,
      role: content.users[idx].role || 'editor',
      lastLogin: content.users[idx].lastLogin || now,
    };
  } else {
    content.users.push({
      id: 'user-1',
      username: 'admin',
      password: hash,
      role: 'editor',
      createdAt: now,
      lastLogin: now,
    });
  }

  try {
    await fs.writeFile(USERS_FILE, JSON.stringify(content, null, 2), 'utf8');
    console.log('✓ Admin password updated successfully. Username: admin');
    console.log(`✓ Users file updated: ${USERS_FILE}`);
  } catch (e) {
    console.error(`Error writing users file: ${e.message}`);
    process.exit(1);
  }
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});