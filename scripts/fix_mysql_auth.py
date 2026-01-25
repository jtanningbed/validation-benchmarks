#!/usr/bin/env python3
"""Add mysql_native_password auth to MySQL 8.0 services that build from Dockerfile."""
import glob
import re

count = 0
for compose_file in glob.glob('benchmarks/*/docker-compose.yml'):
    with open(compose_file, 'r') as f:
        content = f.read()

    # Check if it builds from ./mysql and doesn't have the auth command
    if 'build: ./mysql' in content and 'default-authentication-plugin' not in content:
        # Add command after "build: ./mysql" line (may have platform after it)
        # Find the db service block and add command
        new_content = re.sub(
            r'(build: \./mysql\n(?:    platform: linux/amd64\n)?)',
            r'\1    command: --default-authentication-plugin=mysql_native_password\n',
            content
        )
        if new_content != content:
            with open(compose_file, 'w') as f:
                f.write(new_content)
            print(f"Fixed: {compose_file}")
            count += 1

print(f"\nTotal fixed: {count}")
