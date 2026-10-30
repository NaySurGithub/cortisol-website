# Cortisol

Website and launcher downloads for the Cortisol Minecraft Bedrock client.

**[Website](https://naysurgithub.github.io/cortisol-website/)** · **[Windows download](https://github.com/NaySurGithub/cortisol-website/raw/refs/heads/main/downloads/Cortisol-Windows.exe)** · **[macOS download](https://github.com/NaySurGithub/cortisol-website/raw/refs/heads/main/downloads/Cortisol-macOS.zip)**

## Requirements

| Platform | Requirements | Download |
| --- | --- | --- |
| Windows | Windows x64 and Minecraft for Windows 26.60 | [Cortisol-Windows.exe](https://github.com/NaySurGithub/cortisol-website/raw/refs/heads/main/downloads/Cortisol-Windows.exe) |
| macOS | Apple silicon Mac with **Minecraft for Windows 26.60** running through [Blockintosh](https://blockintosh.multision.dev/) | [Cortisol-macOS.zip](https://github.com/NaySurGithub/cortisol-website/raw/refs/heads/main/downloads/Cortisol-macOS.zip) |

These are preview builds. The macOS launcher uses the Windows edition through
Blockintosh, rather than Minecraft Java or the iOS edition.

## Getting started

1. Download the launcher for your platform.
2. On macOS, extract the ZIP and open `Cortisol.app`. On Windows, open the EXE.
3. Start Minecraft for Windows, using Blockintosh on macOS.
4. Click **Inject** in the launcher. Press **Right Shift** in-game to open Cortisol.
5. Use **Uninject** in the launcher to unload the client.

The Mac archive includes its matching Windows helper and encrypted payload. Keep
the app bundle intact; the payload and helper must come from the same build.

## Website development

The site is plain HTML, CSS and JavaScript. No package installation or build step
is required.

```sh
git clone https://github.com/NaySurGithub/cortisol-website.git
cd cortisol-website
python3 -m http.server 4173 --bind 127.0.0.1
```

Open **http://127.0.0.1:4173/**.

The download buttons detect macOS and otherwise default to Windows. Each download
area also links to the other platform. All local URLs are relative so the site
works under its GitHub Pages project path.

### Repository layout

```text
index.html          Page content
style.css           Layout and responsive styles
script.js           Platform detection and navigation
assets/             Fonts, artwork and the actual Cortisol menu render
downloads/          Launcher builds, file sizes and SHA-256 checksums
.nojekyll           Serve the static files without Jekyll processing
```

This repository contains the website and packaged launchers. The native client's
source and build tools are maintained separately.

## Updating downloads

Replace the launchers in `downloads/`, keeping the filenames used by the page.
Update the corresponding sizes and SHA-256 hashes in
[`manifest.json`](downloads/manifest.json) and
[`checksums.txt`](downloads/checksums.txt). The page reads its displayed download
sizes from the manifest.

To verify a download on macOS:

```sh
shasum -a 256 Cortisol-macOS.zip
```

On Windows PowerShell:

```powershell
Get-FileHash .\Cortisol-Windows.exe -Algorithm SHA256
```

Compare the result with [`downloads/checksums.txt`](downloads/checksums.txt).

## Deployment

GitHub Pages serves the repository root from the `main` branch at:

**https://naysurgithub.github.io/cortisol-website/**

Pushing changes to `main` triggers a new Pages deployment. Website changes do not
rebuild or update the bundled launcher binaries.

## Credits

- Inter font: SIL Open Font License 1.1, included in [`assets/Inter-OFL.txt`](assets/Inter-OFL.txt).
- Cortisol Sans, used in the menu render: SIL Open Font License 1.1, included in [`assets/FONT-LICENSE.txt`](assets/FONT-LICENSE.txt).
- The interface preview is rendered from Cortisol's actual menu code. The character illustration is original generated artwork.

Cortisol is not affiliated with Mojang or Microsoft.
