import zipfile
import xml.etree.ElementTree as ET
import os

docx_filename = "MiniProjeto-contextualização IA.docx"

with zipfile.ZipFile(docx_filename) as z:
    xml_content = z.read('word/document.xml')
    # Check if there are images or other files inside
    namelist = z.namelist()
    print("Files in docx archive:", namelist)

tree = ET.fromstring(xml_content)
ns = {'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'}

paragraphs = []
for p in tree.iter('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}p'):
    texts = [t.text for t in p.iter('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}t') if t.text]
    if texts:
        paragraphs.append(''.join(texts))

print("\n--- DOCUMENT TEXT ---")
print('\n'.join(paragraphs))
