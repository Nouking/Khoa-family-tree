#!/usr/bin/env node
/* eslint-disable no-console */
const { execSync } = require('node:child_process');
const { existsSync, readdirSync } = require('node:fs');
const { join } = require('node:path');

function assert(condition, message) {
  if (!condition) {
    console.error(`✖ ${message}`);
    process.exitCode = 1;
  } else {
    console.log(`✔ ${message}`);
  }
}

function hasGitTag(tagName) {
  try {
    const out = execSync(`git tag -l ${tagName}`, { stdio: ['ignore', 'pipe', 'ignore'] }).toString().trim();
    return out === tagName;
  } catch {
    return false;
  }
}

(function main() {
  const repoRoot = process.cwd();
  const tagName = 'ui-pre-e12-backup';
  // Running from family-tree/ as CWD
  const archiveDir = join(repoRoot, 'docs/archive/ui-backups');
  const baselinesDir = join(repoRoot, 'docs/assets/ui-baselines/pre-e12');

  // Validate tag exists
  assert(hasGitTag(tagName), `Git tag '${tagName}' exists`);

  // Validate archive directory and at least one zip present
  assert(existsSync(archiveDir), `Archive directory exists: ${archiveDir}`);
  if (existsSync(archiveDir)) {
    const zips = readdirSync(archiveDir).filter(f => f.endsWith('.zip'));
    assert(zips.length > 0, `At least one backup zip present in ${archiveDir}`);
  }

  // Validate baseline screenshots presence (at least one PNG present)
  assert(existsSync(baselinesDir), `Baselines directory exists: ${baselinesDir}`);
  if (existsSync(baselinesDir)) {
    const shots = readdirSync(baselinesDir).filter(f => f.toLowerCase().endsWith('.png'));
    assert(shots.length > 0, `At least one baseline screenshot present in ${baselinesDir}`);
  }

  if (process.exitCode) {
    console.error('Validation failed.');
    process.exit(process.exitCode);
  } else {
    console.log('All validations passed.');
  }
})();


