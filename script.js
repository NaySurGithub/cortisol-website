const menu = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
menu.addEventListener('click', () => {
  const open = menu.getAttribute('aria-expanded') !== 'true';
  menu.setAttribute('aria-expanded', String(open));
  menu.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  navigation.classList.toggle('open', open);
});
function close_menu() {
  menu.setAttribute('aria-expanded', 'false');
  menu.setAttribute('aria-label', 'Open navigation');
  navigation.classList.remove('open');
}
navigation.addEventListener('click', (event) => {
  if (event.target.closest('a')) close_menu();
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') close_menu();
});
document.querySelector('#year').textContent = new Date().getFullYear();

function detect_platform() {
  const platform = navigator.userAgentData?.platform || navigator.platform || '';
  const ipad = /Mac/i.test(platform) && navigator.maxTouchPoints > 1;
  return /Mac/i.test(platform) && !ipad ? 'macos' : 'windows';
}
const downloads = {
  windows: { name: 'Windows', file: 'Cortisol-Windows.exe', architecture: 'Windows x64' },
  macos: { name: 'macOS', file: 'Cortisol-macOS.zip', architecture: 'Apple silicon' }
};
const selected_platform = detect_platform();
const selected = downloads[selected_platform];
const other = downloads[selected_platform === 'windows' ? 'macos' : 'windows'];
for (const link of document.querySelectorAll('[data-download]')) {
  link.href = `./downloads/${selected.file}`;
  link.textContent = `Download for ${selected.name}`;
}
for (const link of document.querySelectorAll('[data-other-download]')) {
  link.href = `./downloads/${other.file}`;
  link.textContent = `Looking for ${other.name}?`;
}
for (const note of document.querySelectorAll('[data-requirement]')) {
  if (selected_platform === 'macos') {
    note.replaceChildren(document.createTextNode('Minecraft for Windows 26.60, running through '));
    const link = document.createElement('a');
    link.href = 'https://blockintosh.multision.dev/';
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.textContent = 'Blockintosh';
    note.append(link, document.createTextNode('.'));
  }
}
const download_size = document.querySelector('[data-download-size]');
download_size.textContent = selected.architecture;
fetch('./downloads/manifest.json').then((response) => {
  if (!response.ok) throw new Error('Download metadata unavailable');
  return response.json();
}).then((manifest) => {
  download_size.textContent = `${selected.architecture} · ${manifest[selected_platform].size}`;
}).catch(() => {});
