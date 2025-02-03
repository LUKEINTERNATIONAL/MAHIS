node 20 or above
npm i
npm run dev

Build for All Platforms
Run this command to build for your current OS:

npm run electron:build
Or build for specific platforms:

Windows (NSIS installer)
npm run electron:build -- --win

Linux (AppImage, DEB, RPM, etc.)
npm run electron:build -- --linux

macOS (DMG + ZIP)
npm run electron:build -- --mac
