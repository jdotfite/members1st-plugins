const mix = require("laravel-mix");
const path = require("path");
const fs = require("fs");

function log(message, data = null) {
    console.log(`[${new Date().toISOString()}] ${message}`);
    if (data) console.log(data);
}

function processBlockFiles(blockDir, distDir) {
    log(`Processing block: ${path.basename(blockDir)}`);
    
    // Ensure dist directory exists
    if (!fs.existsSync(distDir)) {
        fs.mkdirSync(distDir, { recursive: true });
    }

    const files = fs.readdirSync(blockDir);
    
    files.forEach(file => {
        const srcFile = path.join(blockDir, file);
        const stats = fs.statSync(srcFile);
        
        if (!stats.isDirectory()) {
            const ext = path.extname(file);
            const blockName = path.basename(blockDir);
            const outputDir = `blocks/${blockName}`;

            switch (ext) {
                case ".js":
                    log(`Processing JS: ${file}`);
                    mix.js(srcFile, outputDir);
                    break;
                case ".scss":
                    log(`Processing SCSS: ${file}`);
                    mix.sass(srcFile, outputDir, {
                        sassOptions: {
                            includePaths: [
                                path.resolve(srcPath, 'shared/styles'),
                                path.resolve(srcPath)
                            ]
                        }
                    });
                    break;
                case ".json":
                    log(`Copying JSON: ${file}`);
                    fs.copyFileSync(srcFile, path.join(distDir, file));
                    break;
                default:
                    log(`Skipping unsupported file: ${file}`);
            }
        }
    });
}

function processFeatureFiles(featureDir, distDir) {
    log(`Processing feature: ${path.basename(featureDir)}`);
    
    if (!fs.existsSync(distDir)) {
        fs.mkdirSync(distDir, { recursive: true });
    }

    const files = fs.readdirSync(featureDir);
    
    files.forEach(file => {
        const srcFile = path.join(featureDir, file);
        const stats = fs.statSync(srcFile);
        
        if (stats.isDirectory()) {
            const subDistDir = path.join(distDir, file);
            processFeatureFiles(srcFile, subDistDir);
        } else {
            const ext = path.extname(file);
            const featureName = path.basename(featureDir);
            const outputDir = `features/${featureName}`;

            switch (ext) {
                case ".js":
                    log(`Processing JS: ${file}`);
                    mix.js(srcFile, outputDir);
                    break;
                case ".scss":
                    log(`Processing SCSS: ${file}`);
                    mix.sass(srcFile, outputDir);
                    break;
                case ".json":
                    log(`Copying JSON: ${file}`);
                    fs.copyFileSync(srcFile, path.join(distDir, file));
                    break;
                default:
                    log(`Skipping unsupported file: ${file}`);
            }
        }
    });
}

function processSharedFiles(componentDir, distDir) {
    log(`Processing shared component: ${path.basename(componentDir)}`);
    
    if (!fs.existsSync(distDir)) {
        fs.mkdirSync(distDir, { recursive: true });
    }

    const files = fs.readdirSync(componentDir);
    
    files.forEach(file => {
        const srcFile = path.join(componentDir, file);
        const stats = fs.statSync(srcFile);
        
        if (stats.isDirectory()) {
            const subDistDir = path.join(distDir, file);
            processSharedFiles(srcFile, subDistDir);
        } else {
            const ext = path.extname(file);
            const componentName = path.basename(componentDir);
            const outputDir = `shared/${componentName}`;

            switch (ext) {
                case ".js":
                    log(`Processing JS: ${file}`);
                    mix.js(srcFile, outputDir);
                    break;
                case ".scss":
                    log(`Processing SCSS: ${file}`);
                    mix.sass(srcFile, outputDir);
                    break;
                case ".json":
                    log(`Copying JSON: ${file}`);
                    fs.copyFileSync(srcFile, path.join(distDir, file));
                    break;
                default:
                    log(`Skipping unsupported file: ${file}`);
            }
        }
    });
}

// Main build script
const pluginPath = process.cwd();
const srcPath = path.join(pluginPath, "src");
const blocksPath = path.join(srcPath, "blocks");
const featuresPath = path.join(srcPath, "features");
const sharedPath = path.join(srcPath, "shared");
const distPath = path.join(pluginPath, "dist");

log("Build configuration:", {
    pluginPath,
    srcPath,
    blocksPath,
    featuresPath,
    sharedPath,
    distPath
});

// Clean dist directory
if (fs.existsSync(distPath)) {
    log("Cleaning dist directory...");
    fs.rmSync(distPath, { recursive: true, force: true });
}

// Set Mix configuration
mix.setResourceRoot("./");
mix.setPublicPath("./");

// Configure webpack
mix.webpackConfig({
    output: {
        path: path.resolve(distPath),
        publicPath: "",
        filename: "[name].js",
        clean: true,
    },
    module: {
        rules: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            use: {
                loader: "babel-loader",
                options: {
                    presets: ["@babel/preset-env", "@babel/preset-react"]
                }
            }
        }]
    },
    externals: {
        "@wordpress/blocks": "wp.blocks",
        "@wordpress/element": "wp.element",
        "@wordpress/components": "wp.components",
        "@wordpress/block-editor": "wp.blockEditor",
        "@wordpress/i18n": "wp.i18n",
        "@wordpress/data": "wp.data",
        "@wordpress/plugins": "wp.plugins",
    },
    resolve: {
        modules: [srcPath, "node_modules"],
        alias: {
            "@shared": path.resolve(srcPath, "shared"),
            "@blocks": path.resolve(srcPath, "blocks"),
            "@styles": path.resolve(srcPath, "shared/styles")
        }
    },
});

// Disable CSS URL processing and manifest
mix.options({
    processCssUrls: false,
    manifest: false,
    sassOptions: {
        includePaths: [
            path.resolve(srcPath, 'shared/styles'),
            path.resolve(srcPath)
        ]
    }
});

// Process all blocks
if (fs.existsSync(blocksPath)) {
    log("Processing blocks...");
    const blocks = fs.readdirSync(blocksPath, { withFileTypes: true });
    blocks.forEach(block => {
        if (block.isDirectory()) {
            const blockDir = path.join(blocksPath, block.name);
            const blockDistDir = path.join(distPath, "blocks", block.name);
            processBlockFiles(blockDir, blockDistDir);
        }
    });
}

// Process shared components
if (fs.existsSync(sharedPath)) {
    log("Processing shared components...");
    const components = fs.readdirSync(sharedPath, { withFileTypes: true });
    components.forEach(component => {
        if (component.isDirectory()) {
            const componentDir = path.join(sharedPath, component.name);
            const componentDistDir = path.join(distPath, "shared", component.name);
            processSharedFiles(componentDir, componentDistDir);
        }
    });
}

// Process features
if (fs.existsSync(featuresPath)) {
    log("Processing features...");
    const features = fs.readdirSync(featuresPath, { withFileTypes: true });
    features.forEach(feature => {
        if (feature.isDirectory()) {
            const featureDir = path.join(featuresPath, feature.name);
            const featureDistDir = path.join(distPath, "features", feature.name);
            processFeatureFiles(featureDir, featureDistDir);
        }
    });
}

// Development settings
if (!mix.inProduction()) {
    mix.sourceMaps();
}

// Log completion
mix.then(() => {
    log("Build completed!");
    
    function listFiles(dir, prefix = "") {
        const items = fs.readdirSync(dir, { withFileTypes: true });
        items.forEach(item => {
            const fullPath = path.join(dir, item.name);
            if (item.isDirectory()) {
                log(`${prefix}${item.name}/`);
                listFiles(fullPath, `${prefix}  `);
            } else {
                const stats = fs.statSync(fullPath);
                log(`${prefix}${item.name} (${stats.size} bytes)`);
            }
        });
    }
    
    log("Dist directory contents:");
    listFiles(distPath);
});