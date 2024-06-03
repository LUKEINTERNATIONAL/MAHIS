import { promises as fs } from 'fs';
import path from 'path';
import { execSync } from 'child_process';

async function getPackageJson(packageName) {
  try {
    const packagePath = execSync(`npm explore ${packageName} -- pwd`).toString().trim();
    const packageJsonPath = path.join(packagePath, 'package.json');
    const packageJson = JSON.parse(await fs.readFile(packageJsonPath, 'utf-8'));
    return packageJson;
  } catch (err) {
    console.error(`Failed to get package.json for ${packageName}`, err);
    return null;
  }
}

async function checkEngines() {
  const packageJsonPath = path.join(process.cwd(), 'package.json');
  const packageJson = JSON.parse(await fs.readFile(packageJsonPath, 'utf-8'));

  const dependencies = { ...packageJson.dependencies, ...packageJson.devDependencies };
  for (const packageName of Object.keys(dependencies)) {
    const packageJson = await getPackageJson(packageName);
    if (packageJson && packageJson.engines) {
      console.log(`${packageName} requires engines:`, packageJson.engines);
    }
  }
}

checkEngines();
