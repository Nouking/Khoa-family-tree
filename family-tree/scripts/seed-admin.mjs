#!/usr/bin/env node
/*
  Seed or update the local admin user password in data/users.json.
  Usage:
    node scripts/seed-admin.mjs --password=newpass
    node scripts/seed-admin.mjs            # defaults to 'admin'
*/

import fs from 'fs/promises';
import path from 'path';
import bcrypt from 'bcryptjs';

const __dirname = process.cwd();
const USERS_FILE = path.join(__dirname, 'family-tree', 'data', 'users.json');

async function main() {
  const args = process.argv.slice(2);
  const provided = args.find(a => a.startsWith('--password='));
  const newPassword = provided ? provided.split('=')[1] : 'admin';

  const hash = await bcrypt.hash(newPassword, 10);

  let content;
  try {
    content = JSON.parse(await fs.readFile(USERS_FILE, 'utf8'));
  } catch (e) {
    content = { users: [] };
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

  await fs.writeFile(USERS_FILE, JSON.stringify(content, null, 2), 'utf8');
  console.log('Admin password updated. Username: admin');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});


