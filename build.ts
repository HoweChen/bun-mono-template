import * as fs from 'node:fs';
import * as path from 'node:path';

const distPath: string = path.join(__dirname, 'dist');
const assetsPath: string = path.join(distPath, 'assets');

// Check if dist folder exists, if not create it
if (!fs.existsSync(distPath)) {
    fs.mkdirSync(distPath);
}

// Check if assets folder exists in dist, if not create it
if (!fs.existsSync(assetsPath)) {
    fs.mkdirSync(assetsPath);
    console.log('Assets folder created successfully');
} else {
    console.log('Assets folder already exists');
}

function copyEnvFiles(packageName: string): void {
    const packageAssetsPath = path.join(__dirname, `packages/${packageName}/assets`);
    
    // Copy packages/${packageName}/assets/*.env file to dist/assets folder
    const envFiles: string[] = fs.readdirSync(packageAssetsPath)
        .filter((file: string): boolean => file.endsWith('.env'));

    for (const file of envFiles) {
        const srcPath: string = path.join(packageAssetsPath, file);
        const destPath: string = path.join(assetsPath, file);
        fs.copyFileSync(srcPath, destPath);
        console.log(`Copied ${file} to assets folder`);
    }
}

// Usage example
copyEnvFiles('pkg-common');
// Get package name from command line arguments
const packageName = process.argv[2];
if (!packageName) {
    console.error('Please provide a package name as argument');
    process.exit(1);
}
copyEnvFiles(packageName);