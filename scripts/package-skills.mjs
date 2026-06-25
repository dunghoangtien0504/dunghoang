import fs from 'fs';
import path from 'path';
import os from 'os';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const workspaceRoot = path.resolve(__dirname, '..');
const agentSkillDir = path.join(workspaceRoot, '25-AI-Agent-Sales', 'Agent Skill');

// Helper to find all temp_* directories
function getSkillFolders() {
  if (!fs.existsSync(agentSkillDir)) {
    console.error(`Directory not found: ${agentSkillDir}`);
    return [];
  }
  const items = fs.readdirSync(agentSkillDir);
  const folders = [];
  for (const item of items) {
    const fullPath = path.join(agentSkillDir, item);
    if (fs.statSync(fullPath).isDirectory() && item.startsWith('temp_')) {
      // Find the subfolder inside (e.g. temp_avatar_builder/assp-avatar-builder)
      const subItems = fs.readdirSync(fullPath);
      const subFolder = subItems.find(sub => {
        const subPath = path.join(fullPath, sub);
        return fs.statSync(subPath).isDirectory() && sub !== '__MACOSX';
      });
      if (subFolder) {
        folders.push({
          tempName: item,
          tempPath: fullPath,
          skillName: subFolder,
          skillPath: path.join(fullPath, subFolder)
        });
      }
    }
  }
  return folders;
}

// Function to parse YAML frontmatter and body
function parseSkillFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split(/\r?\n/);
  
  let inFrontmatter = false;
  let frontmatterLines = [];
  let bodyLines = [];
  let fenceCount = 0;

  for (const line of lines) {
    if (line.trim() === '---') {
      fenceCount++;
      if (fenceCount === 1) {
        inFrontmatter = true;
      } else if (fenceCount === 2) {
        inFrontmatter = false;
      }
      continue;
    }

    if (inFrontmatter) {
      frontmatterLines.push(line);
    } else {
      if (fenceCount >= 2) {
        bodyLines.push(line);
      }
    }
  }

  // Parse fields
  const meta = {};
  for (const line of frontmatterLines) {
    const colonIdx = line.indexOf(':');
    if (colonIdx !== -1) {
      const key = line.slice(0, colonIdx).trim();
      const val = line.slice(colonIdx + 1).trim();
      meta[key] = val;
    }
  }

  return {
    meta,
    body: bodyLines.join('\n')
  };
}

// Function to package folders into .zip and .skill files
function packageSkills() {
  const folders = getSkillFolders();
  console.log(`🔍 Found ${folders.length} skills to package...`);

  for (const f of folders) {
    console.log(`📦 Packaging ${f.skillName}...`);
    const zipName = `${f.skillName}.zip`;
    const skillName = `${f.skillName}.skill`;
    const zipPath = path.join(agentSkillDir, zipName);
    const skillPath = path.join(agentSkillDir, skillName);

    // Delete existing archives if any
    if (fs.existsSync(zipPath)) fs.unlinkSync(zipPath);
    if (fs.existsSync(skillPath)) fs.unlinkSync(skillPath);

    // Use native tar tool to compress (works on Windows 10+ and Unix)
    try {
      execSync(`tar -a -c -f "${zipPath}" -C "${f.tempPath}" "${f.skillName}"`, { stdio: 'inherit' });
      // Copy .zip to .skill
      fs.copyFileSync(zipPath, skillPath);
      console.log(`✅ Packaged ${f.skillName} to .zip & .skill`);
    } catch (err) {
      console.error(`❌ Failed to compress ${f.skillName} using tar:`, err.message);
      console.log(`Trying PowerShell Compress-Archive as fallback...`);
      try {
        const psCommand = `powershell -Command "Compress-Archive -Path '${f.skillPath}' -DestinationPath '${zipPath}' -Force"`;
        execSync(psCommand, { stdio: 'inherit' });
        fs.copyFileSync(zipPath, skillPath);
        console.log(`✅ Packaged ${f.skillName} using PowerShell`);
      } catch (psErr) {
        console.error(`❌ Fallback failed too:`, psErr.message);
      }
    }
  }
}

// Function to generate Cursor rules (.mdc)
function installCursorRules(targetProjDir) {
  const targetDir = path.resolve(targetProjDir || workspaceRoot);
  const cursorRulesDir = path.join(targetDir, '.cursor', 'rules');

  console.log(`📂 Creating Cursor Rules directory: ${cursorRulesDir}`);
  fs.mkdirSync(cursorRulesDir, { recursive: true });

  const folders = getSkillFolders();
  let count = 0;

  for (const f of folders) {
    const skillMdPath = path.join(f.skillPath, 'SKILL.md');
    if (!fs.existsSync(skillMdPath)) {
      console.warn(`⚠️ SKILL.md not found in ${f.skillPath}`);
      continue;
    }

    try {
      const { meta, body } = parseSkillFile(skillMdPath);
      const name = meta.name || f.skillName;
      const description = meta.description || `Agent for ${name}`;

      // Write .mdc Cursor rule file
      const ruleFilePath = path.join(cursorRulesDir, `${name}.mdc`);
      
      const mdcContent = `---
description: ${description}
globs: *
---
# ${meta.name ? meta.name.toUpperCase() : name.toUpperCase()}

${body}
`;

      fs.writeFileSync(ruleFilePath, mdcContent, 'utf-8');
      console.log(`✨ Generated Cursor rule: .cursor/rules/${name}.mdc`);
      count++;
    } catch (err) {
      console.error(`❌ Failed to process ${f.skillName}:`, err.message);
    }
  }
  console.log(`\n🎉 Successfully installed ${count} Cursor Rules to ${cursorRulesDir}`);
}

// Function to install Claude Code agents
function installClaudeAgents() {
  const homeDir = os.homedir();
  const claudeAgentsDir = path.join(homeDir, '.claude', 'agents');
  
  console.log(`📂 Creating Claude Code Agents directory: ${claudeAgentsDir}`);
  fs.mkdirSync(claudeAgentsDir, { recursive: true });

  const folders = getSkillFolders();
  let count = 0;

  for (const f of folders) {
    const skillMdPath = path.join(f.skillPath, 'SKILL.md');
    if (!fs.existsSync(skillMdPath)) {
      console.warn(`⚠️ SKILL.md not found in ${f.skillPath}`);
      continue;
    }

    try {
      const { meta } = parseSkillFile(skillMdPath);
      const name = meta.name || f.skillName;
      const targetFilePath = path.join(claudeAgentsDir, `${name}.md`);

      // Claude Code can read YAML frontmatter directly. So we just copy the raw SKILL.md.
      fs.copyFileSync(skillMdPath, targetFilePath);
      console.log(`✨ Copied Claude Agent: ${targetFilePath}`);
      count++;
    } catch (err) {
      console.error(`❌ Failed to copy to Claude Code: ${f.skillName}:`, err.message);
    }
  }
  console.log(`\n🎉 Successfully installed ${count} Claude Code Agents to ${claudeAgentsDir}`);
}

// Function to install Antigravity workspace skills
function installAntigravitySkills(targetProjDir) {
  const targetDir = path.resolve(targetProjDir || workspaceRoot);
  const antigravitySkillsDir = path.join(targetDir, '.agents', 'skills');

  console.log(`📂 Creating Antigravity Skills directory: ${antigravitySkillsDir}`);
  fs.mkdirSync(antigravitySkillsDir, { recursive: true });

  const folders = getSkillFolders();
  let count = 0;

  for (const f of folders) {
    const skillMdPath = path.join(f.skillPath, 'SKILL.md');
    if (!fs.existsSync(skillMdPath)) {
      console.warn(`⚠️ SKILL.md not found in ${f.skillPath}`);
      continue;
    }

    try {
      const { meta } = parseSkillFile(skillMdPath);
      const name = meta.name || f.skillName;
      const skillDestFolder = path.join(antigravitySkillsDir, name);

      // Clean existing skill folder if it exists
      if (fs.existsSync(skillDestFolder)) {
        fs.rmSync(skillDestFolder, { recursive: true, force: true });
      }

      // Copy the entire skill folder recursively (requires Node 16.7+)
      fs.cpSync(f.skillPath, skillDestFolder, { recursive: true });
      console.log(`✨ Copied Antigravity Skill: .agents/skills/${name}/`);
      count++;
    } catch (err) {
      console.error(`❌ Failed to copy to Antigravity: ${f.skillName}:`, err.message);
    }
  }
  console.log(`\n🎉 Successfully installed ${count} Antigravity Skills to ${antigravitySkillsDir}`);
}

// Main execution CLI
const args = process.argv.slice(2);
const isPack = args.includes('--pack');
const isInstall = args.includes('--install');
const isInstallClaude = args.includes('--install-claude');
const isInstallAntigravity = args.includes('--install-antigravity');

if (isPack) {
  packageSkills();
} else if (isInstall) {
  const targetIndex = args.indexOf('--install') + 1;
  const targetDir = args[targetIndex] || '';
  installCursorRules(targetDir);
} else if (isInstallClaude) {
  installClaudeAgents();
} else if (isInstallAntigravity) {
  const targetIndex = args.indexOf('--install-antigravity') + 1;
  const targetDir = args[targetIndex] || '';
  installAntigravitySkills(targetDir);
} else {
  console.log(`
Usage:
  node scripts/package-skills.mjs --pack                 - Package temp_* folders into .zip & .skill files
  node scripts/package-skills.mjs --install [path]       - Generate Cursor rules (.mdc) into .cursor/rules/
  node scripts/package-skills.mjs --install-claude       - Install agents for Claude Code (~/.claude/agents/)
  node scripts/package-skills.mjs --install-antigravity  - Install workspace skills for Antigravity (.agents/skills/)
`);
}
