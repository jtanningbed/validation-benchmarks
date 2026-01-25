#!/usr/bin/env python3
"""Add platform: linux/amd64 to MySQL services in docker-compose files."""
import glob
import re

count = 0
for compose_file in glob.glob('benchmarks/*/docker-compose.yml'):
    with open(compose_file, 'r') as f:
        content = f.read()

    # Check if it has a db service building from ./mysql and doesn't already have platform directive
    if 'build: ./mysql' in content and 'platform: linux' not in content:
        # Add platform after "build: ./mysql"
        new_content = content.replace(
            'build: ./mysql',
            'build: ./mysql\n    platform: linux/amd64'
        )
        with open(compose_file, 'w') as f:
            f.write(new_content)
        print(f"Fixed: {compose_file}")
        count += 1

print(f"\nTotal fixed: {count}")
