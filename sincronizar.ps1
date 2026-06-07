# AnamnesísMed — Script de Sincronização
# Execute este arquivo clicando duas vezes nele
# Ele copia os arquivos do Downloads para a pasta do projeto

$source = "$env:USERPROFILE\Downloads"
$dest = "D:\Claude\AnamnesisMed-site"

$files = @(
    "anamnesismed-landing.html",
    "anamnesismed-auth.html",
    "anamnesismed-dashboard.html",
    "anamnesismed-app.html"
)

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  AnamnesísMed — Sincronizando arquivos" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

$copied = 0
$missing = 0

foreach ($file in $files) {
    $srcPath = Join-Path $source $file
    $dstPath = Join-Path $dest $file
    
    if (Test-Path $srcPath) {
        Copy-Item $srcPath $dstPath -Force
        Write-Host "  OK  $file" -ForegroundColor Green
        $copied++
    } else {
        Write-Host "  --  $file (nao encontrado em Downloads)" -ForegroundColor Yellow
        $missing++
    }
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Copiados: $copied / $($files.Count)" -ForegroundColor White
if ($missing -gt 0) {
    Write-Host "  Faltando: $missing (baixe do chat primeiro)" -ForegroundColor Yellow
}
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Pasta do projeto: $dest" -ForegroundColor White
Write-Host ""
Write-Host "Pressione qualquer tecla para fechar..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
