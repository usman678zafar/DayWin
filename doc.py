import os
from pathlib import Path

# Configuration
PROJECT_ROOT = r"D:\Nexus Nao\PROJECTS\DAY WIN"
OUTPUT_FILE = r"D:\Nexus Nao\PROJECTS\DAY WIN\PROJECT_DOCUMENTATION.md"

# File extensions to include
INCLUDE_EXTENSIONS = {
    '.tsx', '.ts', '.js', '.css', '.json'
}

# Specific files to include from root
ROOT_FILES_INCLUDE = {
    'next.config.js',
    'package.json',
    'tailwind.config.ts',
    'tsconfig.json',
    'postcss.config.js',
}

# Folders to include
INCLUDE_FOLDERS = {
    'app',
    'components',
    'hooks',
    'lib',
    'models',
    'providers',
    'types',
}

# Files and folders to skip
SKIP_FILES = {
    'package-lock.json',
    '.gitignore',
    'next-env.d.ts',
    '.env.local',  # Skip for security
}

SKIP_FOLDERS = {
    'node_modules',
    '.next',
    '.git',
    'public',  # Skip static assets
    'assets',  # Skip image assets
}

SKIP_EXTENSIONS = {
    '.png', '.jpg', '.jpeg', '.svg', '.ico', '.gif', '.webp'
}

def get_language(file_path: str) -> str:
    """Return the language identifier for markdown code blocks."""
    ext = Path(file_path).suffix.lower()
    language_map = {
        '.tsx': 'tsx',
        '.ts': 'typescript',
        '.js': 'javascript',
        '.jsx': 'jsx',
        '.css': 'css',
        '.json': 'json',
        '.md': 'markdown',
    }
    return language_map.get(ext, '')

def should_include_file(file_path: Path, relative_path: str) -> bool:
    """Determine if a file should be included in documentation."""
    file_name = file_path.name
    extension = file_path.suffix.lower()
    
    # Skip by filename
    if file_name in SKIP_FILES:
        return False
    
    # Skip by extension
    if extension in SKIP_EXTENSIONS:
        return False
    
    # Check if it's a root file we want to include
    if file_path.parent == Path(PROJECT_ROOT):
        return file_name in ROOT_FILES_INCLUDE
    
    # Check if in an included folder
    parts = Path(relative_path).parts
    if parts and parts[0] in INCLUDE_FOLDERS:
        return extension in INCLUDE_EXTENSIONS
    
    return False

def should_skip_folder(folder_name: str) -> bool:
    """Determine if a folder should be skipped entirely."""
    return folder_name in SKIP_FOLDERS

def compile_documentation():
    """Main function to compile all code into markdown."""
    project_path = Path(PROJECT_ROOT)
    
    # Collect all files
    files_content = []
    
    for root, dirs, files in os.walk(project_path):
        # Remove folders we want to skip
        dirs[:] = [d for d in dirs if not should_skip_folder(d)]
        
        for file in sorted(files):
            file_path = Path(root) / file
            relative_path = file_path.relative_to(project_path)
            
            if should_include_file(file_path, str(relative_path)):
                try:
                    with open(file_path, 'r', encoding='utf-8') as f:
                        content = f.read()
                    
                    files_content.append({
                        'path': str(relative_path).replace('\\', '/'),
                        'content': content,
                        'language': get_language(str(file_path))
                    })
                except Exception as e:
                    print(f"Error reading {file_path}: {e}")
    
    # Generate markdown
    markdown_lines = [
        "# DAY WIN - Project Documentation",
        "",
        "## Table of Contents",
        "",
    ]
    
    # Generate TOC
    for i, file_info in enumerate(files_content, 1):
        anchor = file_info['path'].replace('/', '-').replace('.', '-').lower()
        markdown_lines.append(f"{i}. [{file_info['path']}](#{anchor})")
    
    markdown_lines.extend(["", "---", ""])
    
    # Add file contents
    for file_info in files_content:
        anchor = file_info['path'].replace('/', '-').replace('.', '-').lower()
        markdown_lines.extend([
            f"## {file_info['path']}",
            "",
            f"```{file_info['language']}",
            file_info['content'],
            "```",
            "",
            "---",
            "",
        ])
    
    # Write output file
    output_content = '\n'.join(markdown_lines)
    
    with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
        f.write(output_content)
    
    print(f"✅ Documentation compiled successfully!")
    print(f"📄 Output: {OUTPUT_FILE}")
    print(f"📁 Total files documented: {len(files_content)}")

if __name__ == "__main__":
    compile_documentation()
