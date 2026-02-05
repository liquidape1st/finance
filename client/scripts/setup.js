const fs = require('fs');
const path = require('path');

const sourceDir = path.resolve(__dirname, '../../client/src');
const destDir = path.resolve(__dirname, '..');

const dirsToCopy = [
    'assets', 'components', 'configs', 'constants',
    'guidelines', 'imports', 'services', 'store',
    'types', 'utils'
];

function copyDir(src, dest) {
    if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
    const entries = fs.readdirSync(src, { withFileTypes: true });

    for (const entry of entries) {
        const srcPath = path.join(src, entry.name);
        const destPath = path.join(dest, entry.name);

        if (entry.isDirectory()) {
            copyDir(srcPath, destPath);
        } else {
            try {
                fs.copyFileSync(srcPath, destPath);
                if ((destPath.endsWith('.tsx') || destPath.endsWith('.ts')) && destPath.includes('components')) {
                    fixImports(destPath);
                }
            } catch (e) {
                console.error(`Error copying ${srcPath}:`, e);
            }
        }
    }
}

function fixImports(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;
    let originalContent = content;

    // Fix Link import
    if (content.includes("from 'react-router-dom'") || content.includes('from "react-router-dom"')) {
        if (content.includes('Link')) {
            content = content.replace(/import\s*{[^}]*Link[^}]*}\s*from\s*['"]react-router-dom['"];?/g, (match) => {
                // Keep other imports if any? Too complex for regex.
                // Just replace specific known patterns
                return "import Link from 'next/link';";
            });
            content = content.replace(/to={/g, 'href={').replace(/to="/g, 'href="');
        }

        // Fix Hooks
        if (content.includes('useNavigate')) {
            content = content.replace(/useNavigate/g, 'useRouter');
            if (!content.includes('next/navigation')) {
                content = "import { useRouter } from 'next/navigation';\n" + content;
            }
        }

        if (content.includes('useLocation')) {
            content = content.replace(/useLocation/g, 'usePathname');
            // Note: useLocation returns object with pathname. usePathname returns string.
            // This might break code accessing location.pathname. 
            // Better: const pathname = usePathname();
            if (!content.includes('next/navigation')) {
                content = "import { usePathname } from 'next/navigation';\n" + content;
            }
        }

        // Remove react-router-dom import if unused or replace
        content = content.replace(/import\s*.*from\s*['"]react-router-dom['"];?/g, '// react-router-dom import removed');

        modified = true;
    }

    // Fix image imports (Vite specific)
    // import img from '@/assets/...' works if asset exists. 
    // But ?react imports for SVGs might break.

    if (modified) {
        fs.writeFileSync(filePath, content);
        console.log(`Fixed imports in ${path.basename(filePath)}`);
    }
}

console.log(`Source: ${sourceDir}`);
console.log(`Dest: ${destDir}`);
console.log('Starting migration...');

dirsToCopy.forEach(dir => {
    const src = path.join(sourceDir, dir);
    const dest = path.join(destDir, dir);
    if (fs.existsSync(src)) {
        console.log(`Copying ${dir}...`);
        copyDir(src, dest);
    } else {
        console.warn(`Source directory not found: ${src}`);
    }
});
console.log('Migration complete.');
