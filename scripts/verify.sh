#!/bin/bash
# =============================================================
# scripts/verify.sh — Verificação de integridade do AnamnesísMed
# Rodar após QUALQUER edição antes de commitar.
# Uso: bash scripts/verify.sh
# =============================================================

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
ERRORS=0

check() {
  local label="$1"
  local result="$2"
  if [ "$result" = "ok" ]; then
    echo "  OK  $label"
  else
    echo "  ERRO  $label — $result"
    ERRORS=$((ERRORS + 1))
  fi
}

echo ""
echo "======================================================="
echo "  AnamnesísMed — Verificação de Integridade"
echo "======================================================="

# -- app.html
APP="$ROOT/anamnesismed-app.html"
echo ""
echo "> anamnesismed-app.html"

LINES=$(wc -l < "$APP")
[ "$LINES" -ge 2300 ] && check "Linhas ($LINES >= 2300)" "ok" || check "Linhas ($LINES)" "TRUNCADO — esperado >= 2300"
grep -q "</html>" "$APP" && check "Tag </html> presente" "ok" || check "Tag </html>" "AUSENTE"
grep -q "</body>" "$APP" && check "Tag </body> presente" "ok" || check "Tag </body>" "AUSENTE"
grep -q "function renderMotivoGrid" "$APP" && check "renderMotivoGrid presente" "ok" || check "renderMotivoGrid" "AUSENTE"
grep -q "function saveHC" "$APP" && check "saveHC presente" "ok" || check "saveHC" "AUSENTE"
grep -q "function showScreen" "$APP" && check "showScreen presente" "ok" || check "showScreen" "AUSENTE"
grep -q "anamnesismed-motivos.js" "$APP" && check "Referencia a motivos.js" "ok" || check "Referencia a motivos.js" "AUSENTE"
grep -q "anamnesismed-guide.js" "$APP" && check "Referencia a guide.js" "ok" || check "Referencia a guide.js" "AUSENTE"
grep -q "anamnesismed-narrativa.js" "$APP" && check "Referencia a narrativa.js" "ok" || check "Referencia a narrativa.js" "AUSENTE"
grep -q "anamnesismed-pdf.js" "$APP" && check "Referencia a pdf.js" "ok" || check "Referencia a pdf.js" "AUSENTE"
grep -q "supabase-integration.js" "$APP" && check "Referencia a supabase-integration.js" "ok" || check "Referencia a supabase-integration.js" "AUSENTE"
! grep -q "^const MOTIVOS" "$APP" && check "Dados MOTIVOS fora do app.html" "ok" || check "Dados MOTIVOS" "AINDA NO app.html"
! grep -q "^const GUIDE_CONTENT" "$APP" && check "Dados GUIDE_CONTENT fora do app.html" "ok" || check "Dados GUIDE_CONTENT" "AINDA NO app.html"
! grep -q "function exportPDF" "$APP" && check "exportPDF fora do app.html" "ok" || check "exportPDF" "AINDA NO app.html"
! grep -q "function gerarNarrativaAEA_" "$APP" && check "Geradores de narrativa fora do app.html" "ok" || check "Geradores narrativa" "AINDA NO app.html"
! grep -q "function buildAEAGuideHTML" "$APP" && check "buildAEAGuideHTML fora do app.html" "ok" || check "buildAEAGuideHTML" "AINDA NO app.html"

# -- anamnesismed-motivos.js
MOTIVOS="$ROOT/anamnesismed-motivos.js"
echo ""
echo "> anamnesismed-motivos.js"

LINES=$(wc -l < "$MOTIVOS")
[ "$LINES" -ge 1500 ] && check "Linhas ($LINES >= 1500)" "ok" || check "Linhas ($LINES)" "TRUNCADO — esperado >= 1500"
grep -q "^const MOTIVOS" "$MOTIVOS" && check "const MOTIVOS presente" "ok" || check "const MOTIVOS" "AUSENTE"
grep -q "^const RAS_SYSTEMS" "$MOTIVOS" && check "const RAS_SYSTEMS presente" "ok" || check "const RAS_SYSTEMS" "AUSENTE"
grep -q "^const GUIDE_CONTENT" "$MOTIVOS" && check "const GUIDE_CONTENT presente" "ok" || check "const GUIDE_CONTENT" "AUSENTE"
grep -q "clinica:" "$MOTIVOS" && check "Especialidade clinica presente" "ok" || check "Especialidade clinica" "AUSENTE"
grep -q "cirurgia:" "$MOTIVOS" && check "Especialidade cirurgia presente" "ok" || check "Especialidade cirurgia" "AUSENTE"
grep -q "semiologia:" "$MOTIVOS" && check "Especialidade semiologia presente" "ok" || check "Especialidade semiologia" "AUSENTE"
grep -q "id:'tosse'" "$MOTIVOS" && check "Motivo tosse presente" "ok" || check "Motivo tosse" "AUSENTE"
grep -q "id:'dor-toracica'" "$MOTIVOS" && check "Motivo dor-toracica presente" "ok" || check "Motivo dor-toracica" "AUSENTE"
grep -q "}; // end GUIDE_CONTENT" "$MOTIVOS" && check "Fechamento GUIDE_CONTENT" "ok" || check "Fechamento GUIDE_CONTENT" "AUSENTE — arquivo provavelmente truncado"

# -- anamnesismed-guide.js
GUIDE="$ROOT/anamnesismed-guide.js"
echo ""
echo "> anamnesismed-guide.js"

LINES=$(wc -l < "$GUIDE")
[ "$LINES" -ge 150 ] && check "Linhas ($LINES >= 150)" "ok" || check "Linhas ($LINES)" "TRUNCADO — esperado >= 150"
grep -q "function buildAEAGuideHTML" "$GUIDE" && check "buildAEAGuideHTML presente" "ok" || check "buildAEAGuideHTML" "AUSENTE"
grep -q "function buildMnemonicsHTML" "$GUIDE" && check "buildMnemonicsHTML presente" "ok" || check "buildMnemonicsHTML" "AUSENTE"
grep -q "function renderGuideContent" "$GUIDE" && check "renderGuideContent presente" "ok" || check "renderGuideContent" "AUSENTE"

# -- anamnesismed-narrativa.js
NARRATIVA="$ROOT/anamnesismed-narrativa.js"
echo ""
echo "> anamnesismed-narrativa.js"

LINES=$(wc -l < "$NARRATIVA")
[ "$LINES" -ge 380 ] && check "Linhas ($LINES >= 380)" "ok" || check "Linhas ($LINES)" "TRUNCADO — esperado >= 380"
grep -q "function gerarNarrativaAEA_cefaleia" "$NARRATIVA" && check "gerador cefaleia presente" "ok" || check "gerador cefaleia" "AUSENTE"
grep -q "function gerarNarrativaAEA_generica" "$NARRATIVA" && check "gerador generico presente" "ok" || check "gerador generico" "AUSENTE"
grep -q "function gerarNarrativaAEA_tosse" "$NARRATIVA" && check "gerador tosse presente" "ok" || check "gerador tosse" "AUSENTE"
grep -q "function gerarNarrativaAEA(" "$NARRATIVA" && check "dispatch gerarNarrativaAEA presente" "ok" || check "dispatch gerarNarrativaAEA" "AUSENTE"

# -- anamnesismed-pdf.js
PDF="$ROOT/anamnesismed-pdf.js"
echo ""
echo "> anamnesismed-pdf.js"
LINES=$(wc -l < "$PDF")
[ "$LINES" -ge 250 ] && check "Linhas ($LINES >= 250)" "ok" || check "Linhas ($LINES)" "TRUNCADO"
grep -q "function exportPDF" "$PDF" && check "exportPDF presente" "ok" || check "exportPDF" "AUSENTE"
grep -q "w.document.write" "$PDF" && check "Geracao HTML do PDF" "ok" || check "Geracao HTML do PDF" "AUSENTE"
grep -q "w.document.close" "$PDF" && check "Fechamento PDF" "ok" || check "Fechamento PDF" "AUSENTE"

# -- supabase-integration.js
SUPA="$ROOT/supabase-integration.js"
echo ""
echo "> supabase-integration.js"
LINES=$(wc -l < "$SUPA")
[ "$LINES" -ge 1200 ] && check "Linhas ($LINES >= 1200)" "ok" || check "Linhas ($LINES)" "TRUNCADO"
grep -q "window.hcSave" "$SUPA" && check "hcSave presente" "ok" || check "hcSave" "AUSENTE"
grep -q "guardCheckAccess" "$SUPA" && check "guardCheckAccess presente" "ok" || check "guardCheckAccess" "AUSENTE"

# -- anamnesismed-dashboard.html
DASH="$ROOT/anamnesismed-dashboard.html"
echo ""
echo "> anamnesismed-dashboard.html"
LINES=$(wc -l < "$DASH")
[ "$LINES" -ge 600 ] && check "Linhas ($LINES >= 600)" "ok" || check "Linhas ($LINES)" "TRUNCADO"
grep -q "</html>" "$DASH" && check "Tag </html> presente" "ok" || check "Tag </html>" "AUSENTE"
grep -q "function setView" "$DASH" && check "setView presente" "ok" || check "setView" "AUSENTE"
grep -q "URLSearchParams" "$DASH" && check "URLSearchParams presente" "ok" || check "URLSearchParams" "AUSENTE"

# -- vercel.json
VERCEL="$ROOT/vercel.json"
echo ""
echo "> vercel.json"
grep -q "maxDuration" "$VERCEL" && check "maxDuration presente" "ok" || check "maxDuration" "AUSENTE"
grep -q "}" "$VERCEL" && check "JSON fechado" "ok" || check "JSON fechado" "TRUNCADO"

# -- Bytes nulos (corrupção Linux-Windows)
echo ""
echo "> Verificacao de bytes nulos (corrupcao Linux-Windows)"
NULLCHECK=$(mktemp /tmp/nullcheck_XXXXXX.py)
cat > "$NULLCHECK" << 'PYEOF2'
import sys
data = open(sys.argv[1], 'rb').read()
sys.exit(1 if b'\x00' in data else 0)
PYEOF2
for f in \
  "$ROOT/supabase-integration.js" \
  "$ROOT/anamnesismed-motivos.js" \
  "$ROOT/anamnesismed-narrativa.js" \
  "$ROOT/anamnesismed-guide.js" \
  "$ROOT/anamnesismed-pdf.js" \
  "$ROOT/anamnesismed-app.html" \
  "$ROOT/anamnesismed-dashboard.html"
do
  fname=$(basename "$f")
  if python3 "$NULLCHECK" "$f" 2>/dev/null; then
    check "Sem bytes nulos: $fname" "ok"
  else
    check "Sem bytes nulos: $fname" "BYTES NULOS DETECTADOS — arquivo corrompido"
  fi
done
rm -f "$NULLCHECK"

# -- Resultado
echo ""
echo "======================================================="
if [ "$ERRORS" -eq 0 ]; then
  echo "  OK  TUDO OK - seguro para commitar"
else
  echo "  FALHOU  $ERRORS ERRO(S) - NAO commitar"
  echo "  Restaure: git checkout HEAD -- <arquivo>"
fi
echo "======================================================="
echo ""
exit $ERRORS
