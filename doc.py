import os
from pathlib import Path

# Configuration
PROJECT_ROOT = r"D:\Nexus Nao\PROJECTS\DayWin"
OUTPUT_FILE = r"D:\Nexus Nao\PROJECTS\DayWin\PROJECT_DOCUMENTATION.md"

# Files and folders to skip
SKIP_FOLDERS = {
    'node_modules',
    '.next',
    '.git',
    'public',  # Contains only images/icons
    'assets',  # Contains only images
}

SKIP_FILES = {
    'package-lock.json',
    'next-env.d.ts',
    '.gitignore',
    '.env.local',  # Skip for security
}

SKIP_EXTENSIONS = {
    '.jpg', '.jpeg', '.png', '.svg', '.ico', '.gif', '.webp',
    '.woff', '.woff2', '.ttf', '.eot',
    '.lock',
}

# File extensions to include with their markdown language identifiers
EXTENSION_MAP = {
    '.ts': 'typescript',
    '.tsx': 'tsx',
    '.js': 'javascript',
    '.jsx': 'jsx',
    '.css': 'css',
    '.json': 'json',
    '.md': 'markdown',
}


def should_skip_file(file_path: Path) -> bool:
    """Check if a file should be skipped."""
    if file_path.name in SKIP_FILES:
        return True
    if file_path.suffix.lower() in SKIP_EXTENSIONS:
        return True
    if file_path.suffix.lower() not in EXTENSION_MAP:
        return True
    return False


def should_skip_folder(folder_name: str) -> bool:
    """Check if a folder should be skipped."""
    return folder_name in SKIP_FOLDERS


def get_language(file_path: Path) -> str:
    """Get the markdown language identifier for syntax highlighting."""
    return EXTENSION_MAP.get(file_path.suffix.lower(), '')


def get_relative_path(file_path: Path, root: Path) -> str:
    """Get the relative path from the project root."""
    return str(file_path.relative_to(root))


def compile_documentation(project_root: str, output_file: str):
    """Compile all code files into a single markdown document."""
    root_path = Path(project_root)
    
    # Collect all files organized by directory
    files_by_dir = {}
    
    for dirpath, dirnames, filenames in os.walk(root_path):
        # Filter out folders to skip
        dirnames[:] = [d for d in dirnames if not should_skip_folder(d)]
        
        current_path = Path(dirpath)
        
        for filename in sorted(filenames):
            file_path = current_path / filename
            
            if should_skip_file(file_path):
                continue
            
            relative_dir = get_relative_path(current_path, root_path)
            if relative_dir == '.':
                relative_dir = 'Root'
            
            if relative_dir not in files_by_dir:
                files_by_dir[relative_dir] = []
            
            files_by_dir[relative_dir].append(file_path)
    
    # Generate markdown content
    md_content = []
    md_content.append("# DayWin Project Documentation\n")
    md_content.append("**Auto-generated project documentation**\n")
    md_content.append("---\n")
    
    # Table of Contents
    md_content.append("## Table of Contents\n")
    for idx, dir_name in enumerate(sorted(files_by_dir.keys()), 1):
        anchor = dir_name.lower().replace('\\', '-').replace('/', '-').replace('.', '')
        md_content.append(f"{idx}. [{dir_name}](#{anchor})\n")
    md_content.append("\n---\n")
    
    # File contents
    for dir_name in sorted(files_by_dir.keys()):
        anchor = dir_name.lower().replace('\\', '-').replace('/', '-').replace('.', '')
        md_content.append(f"## {dir_name}\n")
        
        for file_path in sorted(files_by_dir[dir_name]):
            relative_file = get_relative_path(file_path, root_path)
            language = get_language(file_path)
            
            md_content.append(f"### `{relative_file}`\n")
            
            try:
                with open(file_path, 'r', encoding='utf-8') as f:
                    content = f.read()
                
                md_content.append(f"```{language}\n{content}\n```\n")
            except Exception as e:
                md_content.append(f"*Error reading file: {e}*\n")
            
            md_content.append("\n")
        
        md_content.append("---\n")
    
    # Write to output file
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write('\n'.join(md_content))
    
    print(f"✅ Documentation generated successfully!")
    print(f"📄 Output: {output_file}")
    print(f"📁 Total directories processed: {len(files_by_dir)}")
    total_files = sum(len(files) for files in files_by_dir.values())
    print(f"📝 Total files documented: {total_files}")


if __name__ == "__main__":
    compile_documentation(PROJECT_ROOT, OUTPUT_FILE)
