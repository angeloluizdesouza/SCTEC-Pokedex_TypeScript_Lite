# Script para estruturar os commits e branches do projeto Pokedex TypeScript Lite

Write-Host "[+] Iniciando organizacao do repositorio Git..." -ForegroundColor Cyan

# 1. Configurar branch main com o setup inicial
git checkout -B main
git add package.json package-lock.json tsconfig.json .gitignore
git commit -m "chore: initial project setup and typescript configuration"

# 2. Criar branch develop
git checkout -B develop

# 3. Criar branch feat/pokedex e commitar o codigo da aplicacao
git checkout -B feat/pokedex
git add src/
git commit -m "feat(pokedex): implement pokemon search, box service, models, and CLI main"

# 4. Integrar feat/pokedex na develop
git checkout develop
git merge --no-ff feat/pokedex -m "merge: feat/pokedex into develop"

# 5. Criar branch docs/readme e commitar o README.md
git checkout -B docs/readme
git add README.md
git commit -m "docs: add project documentation and execution guide"

# 6. Integrar docs/readme na develop
git checkout develop
git merge --no-ff docs/readme -m "merge: docs/readme into develop"

# 7. Atualizar main com a versao final estavel (release)
git checkout main
git merge develop -m "release: v1.0.0 pokedex typescript lite"

Write-Host "[OK] Estrutura de branches e commits concluida com sucesso!" -ForegroundColor Green
Write-Host "--- Branches Criadas ---" -ForegroundColor Yellow
git branch
