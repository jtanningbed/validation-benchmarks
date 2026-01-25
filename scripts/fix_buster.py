#!/usr/bin/env python3
"""Fix Debian Buster apt sources in Python 2.7 Dockerfiles."""
import glob

FIX_LINES = '''RUN sed -i 's/deb.debian.org/archive.debian.org/g' /etc/apt/sources.list && \\
    sed -i 's|security.debian.org/debian-security|archive.debian.org/debian-security|g' /etc/apt/sources.list && \\
    sed -i '/buster-updates/d' /etc/apt/sources.list && \\
    apt-get update'''

count = 0
for dockerfile in glob.glob('benchmarks/*/src/Dockerfile'):
    with open(dockerfile, 'r') as f:
        content = f.read()

    if 'python:2.7.18-slim' in content and 'archive.debian.org' not in content:
        new_content = content.replace('RUN apt-get update', FIX_LINES)
        with open(dockerfile, 'w') as f:
            f.write(new_content)
        print(f"Fixed: {dockerfile}")
        count += 1

print(f"\nTotal fixed: {count}")
