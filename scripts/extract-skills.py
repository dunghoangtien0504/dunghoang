import zipfile
import os

skills = [
    "agent-10x-content-system.skill",
    "agent-meta-post.skill",
    "assp-ad-copy-machine.skill"
]

base_dir = "25-AI-Agent-Sales/Agent Skill"

for skill in skills:
    skill_path = os.path.join(base_dir, skill)
    extract_path = os.path.join(base_dir, "temp_" + skill.replace(".skill", ""))
    
    if os.path.exists(skill_path):
        print(f"Extracting {skill_path} to {extract_path}...")
        with zipfile.ZipFile(skill_path, 'r') as zip_ref:
            zip_ref.extractall(extract_path)
        print("Done.")
    else:
        print(f"File not found: {skill_path}")
