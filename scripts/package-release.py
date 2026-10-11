from pathlib import Path
import hashlib
import json
import zipfile

root = Path(__file__).resolve().parent.parent
version = json.loads((root / 'package.json').read_text())['version']
release = root / 'release'
release.mkdir(exist_ok=True)
files = sorted(p for p in (root / 'dist').rglob('*') if p.is_file())
checksums = {str(p.relative_to(root / 'dist')): hashlib.sha256(p.read_bytes()).hexdigest() for p in files}
archive = release / f'iDesign-{version}-static.zip'
with zipfile.ZipFile(archive, 'w', zipfile.ZIP_DEFLATED) as package:
    for file in files:
        package.write(file, str(file.relative_to(root / 'dist')))
    package.writestr('SHA256SUMS.json', json.dumps(checksums, indent=2))
(release / f'{archive.name}.sha256').write_text(hashlib.sha256(archive.read_bytes()).hexdigest() + '  ' + archive.name + '\n')
print(archive)
