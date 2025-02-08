import * as fs from 'node:fs';
import * as path from 'node:path';

const distPath: string = path.join(__dirname, 'dist');
const confPath: string = path.join(distPath, 'conf');

// Check if dist folder exists, if not create it
if (!fs.existsSync(distPath)) {
    fs.mkdirSync(distPath);
}

// Check if conf folder exists in dist, if not create it
if (!fs.existsSync(confPath)) {
    fs.mkdirSync(confPath);
    console.log('`conf` folder created successfully');
} else {
    console.log('`conf` folder already exists');
}

function copyEnvFiles(packageName: string): void {
    const packageConfPath = path.join(__dirname, `packages/${packageName}/conf`);
    
    // Copy all files from packages/${packageName}/conf to dist/conf folder
    const envFiles: string[] = fs.readdirSync(packageConfPath);

    for (const file of envFiles) {
        const srcPath: string = path.join(packageConfPath, file);
        const destPath: string = path.join(confPath, file);
        fs.copyFileSync(srcPath, destPath);
        console.log(`Copied ${file} to conf folder`);
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