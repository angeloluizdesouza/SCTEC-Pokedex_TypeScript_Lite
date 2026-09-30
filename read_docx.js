const fs = require('fs');
const { execSync } = require('child_process');

const psScript = `
Add-Type -AssemblyName System.IO.Compression.FileSystem
$file = Get-ChildItem -Filter "*.docx" | Select-Object -First 1
$zip = [System.IO.Compression.ZipFile]::OpenRead($file.FullName)
$entry = $zip.Entries | Where-Object { $_.FullName -eq 'word/document.xml' }
$stream = $entry.Open()
$reader = New-Object System.IO.StreamReader($stream, [System.Text.Encoding]::UTF8)
$xmlText = $reader.ReadToEnd()
$reader.Close()
$stream.Close()
$zip.Dispose()

$xml = [xml]$xmlText
$nodes = $xml.SelectNodes('//*[local-name()="p"]')
$lines = @()
foreach ($node in $nodes) {
    $tNodes = $node.SelectNodes('.//*[local-name()="t"]')
    $line = ""
    foreach ($t in $tNodes) {
        $line += $t.InnerText
    }
    if ($line.Trim() -ne "") {
        $lines += $line
    }
}
$lines | Out-File -FilePath "docx_full_text.txt" -Encoding utf8
`;

fs.writeFileSync('read_docx.ps1', psScript, 'utf8');
execSync('C:\\Windows\\System32\\WindowsPowerShell\\v1.0\\powershell.exe -ExecutionPolicy Bypass -File read_docx.ps1', { encoding: 'utf8' });
const fullText = fs.readFileSync('docx_full_text.txt', 'utf8');
console.log("TOTAL LENGTH:", fullText.length);
console.log(fullText);
