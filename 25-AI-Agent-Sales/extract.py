import re

with open("12-assp/assets/index-CZSZ5l6c.js", "r", encoding="utf-8") as f:
    content = f.read()

# Extract all string literals longer than 15 characters
# Match text enclosed in quotes (single, double, or backticks)
strings = re.findall(r'["\']([^"\']{15,})["\']', content)

# Filter out paths, URLs, class names, etc.
def is_valid_text(s):
    if len(s.strip()) < 15: return False
    if s.startswith('http'): return False
    if s.startswith('/'): return False
    if '_' in s and ' ' not in s: return False
    if '-' in s and ' ' not in s: return False
    if 'function(' in s or '=>' in s: return False
    return True

text_strings = [s for s in strings if is_valid_text(s)]

# Output to a file
with open("website_content.txt", "w", encoding="utf-8") as f:
    for s in text_strings:
        f.write(s + "\n\n")

print("Extracted strings to website_content.txt")
