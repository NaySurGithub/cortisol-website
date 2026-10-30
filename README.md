# Cortisol website

Standalone static landing page and launcher downloads. Source repository:
https://github.com/NaySurGithub/cortisol-website (private). GitHub Pages deployment
has not been enabled; the site has only been previewed locally.

From this folder:

```sh
python3 -m http.server 4173 --bind 127.0.0.1
```

Open http://127.0.0.1:4173. No frontend dependencies or build step are needed.
All assets and download links are relative, including for a GitHub Pages project
subdirectory. Copy the **contents** of `website/` into the new website repository
when ready; the native client source and build directories are not needed.

## Downloads

- `downloads/Cortisol-Windows.exe`: Windows launcher with encrypted client payload.
- `downloads/Cortisol-macOS.zip`: the complete Mac app, including its matching Wine
  helper and encrypted payload. Requires Minecraft **for Windows** through
  https://blockintosh.multision.dev/. This is not the Java or iOS edition.
- `downloads/manifest.json` and `checksums.txt`: sizes and SHA-256 hashes.

These are snapshots of the existing launcher builds, not automatic update links.
In the native project, refresh them after rebuilding both launchers with:

```sh
python3 .dev/tools/website/prepare.py
```

Do not replace the Mac app's encrypted payload independently of its helper; their
keys must match. The website does not contain a raw client DLL, game binaries,
credentials or signing material. The Mac archive is checked for plaintext DLLs.
The existing build's code-signing and shader-material installation limitations
still apply; this page does not add an installer or change the launchers.

## Design and assets

The layout follows the supplied vape.gg homepage reference, using Cortisol's
cyan and graphite palette. Downloads detect macOS, otherwise default to Windows;
each download area also offers a small link to the other platform. The macOS
requirements explicitly name Minecraft for Windows and Blockintosh.

`assets/character.png` was generated with the built-in imagegen tool as an
original 3D voxel character on a transparent background. The prompt is recorded
in `.dev/tools/website/character-prompt.txt` in the native project.

`assets/cortisol-ui.png` is an offscreen rendering of the production
`src/rendering/ui/ClickGui.cpp` with the actual registered modules, fonts, icons
and settings. It is not an HTML recreation or a screenshot of a running game.
Its export sets a solid cyan theme and cyan Chams color in an isolated temporary
profile. It does not change the user's real profile, inject, or install hooks.
To refresh it after building the Windows client:

```sh
uv run --with pillow python .dev/tools/website/render_menu.py --wine <wine> --wine-prefix <prefix>
```

The page uses the locally bundled Inter font (SIL OFL 1.1,
`assets/Inter-OFL.txt`). The menu rendering uses Cortisol Sans; its license is
retained in `assets/FONT-LICENSE.txt`. No Vape artwork, account forms, analytics
or remote runtime scripts are bundled. The older hand-drawn character and mock
settings panel have been removed.
