// scripts/build.js — junta a fonte modular (src/) nos arquivos de produção.
// Uso:  node scripts/build.js          → grava anamnesismed-motivos.js e anamnesismed-guide-es.js
//       require('./build').assemble()  → retorna as strings geradas (sem gravar)  [usado pelo verify.sh]
//       node scripts/build.js --rascunhos → inclui guias de enfermidade em rascunho no anamnesismed-enfermidades.js
//                                           (só para pré-visualização local; NÃO commitar: o site é estático e público)
const fs=require('fs'), path=require('path');
const ROOT=path.resolve(__dirname,'..');
const ESP_ORDER=['clinica','semiologia','cirurgia','respiratorio']; // ordem das especialidades no grid

// Lê src/ e devolve o registro (motivos, especialidades, enfermidades) sem gerar nada.
function montar(){
  const reg={motivos:{}, esp:{}, enf:{}, ras:null};
  const AM={ motivo:(id,c)=>{reg.motivos[id]=c;}, especialidade:(e,c)=>{reg.esp[e]=c;}, ras:(a)=>{reg.ras=a;}, enfermidade:(id,c)=>{reg.enf[id]=c;} };
  const run=f=>new Function('AM', fs.readFileSync(f,'utf8'))(AM);
  run(ROOT+'/src/ras.js');
  fs.readdirSync(ROOT+'/src/motivos').filter(f=>f.endsWith('.js')).sort().forEach(f=>run(ROOT+'/src/motivos/'+f));
  ESP_ORDER.forEach(e=>run(ROOT+'/src/especialidades/'+e+'.js'));
  const dirEnf=ROOT+'/src/enfermidades';
  if(fs.existsSync(dirEnf)) fs.readdirSync(dirEnf).filter(f=>f.endsWith('.js')).sort().forEach(f=>run(dirEnf+'/'+f));
  return { reg, espIds:ESP_ORDER.slice() };
}

function assemble(opts){
  const incluirRascunhos=!!(opts&&opts.rascunhos);
  const { reg }=montar();

  const MOTIVOS={};
  ESP_ORDER.forEach(esp=>{
    if(!reg.esp[esp]) throw new Error('especialidade ausente: '+esp);
    MOTIVOS[esp]=reg.esp[esp].map(c=>({
      cat:c.cat, ...(c.catEs?{catEs:c.catEs}:{}),
      items:c.items.map(id=>{
        const m=reg.motivos[id]; if(!m) throw new Error('motivo nao encontrado: '+id);
        const it={id,name:m.name,nameEs:m.nameEs,icon:m.icon,color:m.color};
        if(m.isPain)it.isPain=true;
        it.aeaGuide=m.aeaGuide||[];
        if(m.aeaGuideCir)it.aeaGuideCir=m.aeaGuideCir; // roteiro alternativo p/ cirurgia (ex.: Dor ALICIA)
        if(m.rasHighlight)it.rasHighlight=m.rasHighlight;
        if(m.ddx)it.ddx=m.ddx;
        return it;
      })
    }));
  });
  const GUIDE_CONTENT={}, aliasLines=[], GUIDE_ES={};
  Object.keys(reg.motivos).forEach(id=>{ const m=reg.motivos[id]; if(m.guidePt)GUIDE_CONTENT[id]=m.guidePt; if(m.guideEs)GUIDE_ES[id]=m.guideEs; });
  Object.keys(reg.motivos).forEach(id=>{ const m=reg.motivos[id]; if(m.guideFrom)aliasLines.push('GUIDE_CONTENT['+JSON.stringify(id)+'] = GUIDE_CONTENT['+JSON.stringify(m.guideFrom)+'];'); });

  const mergeBlock=fs.readFileSync(ROOT+'/scripts/applyGuideES.tmpl.js','utf8');
  const J=o=>JSON.stringify(o,null,2);
  const motivosSrc=
    '// ⚙️ GERADO por scripts/build.js — NÃO editar à mão. Edite src/ e rode: node scripts/build.js\n'+
    'const MOTIVOS = '+J(MOTIVOS)+';\n\n'+
    'const RAS_SYSTEMS = '+J(reg.ras)+';\n\n'+
    'const GUIDE_CONTENT = '+J(GUIDE_CONTENT)+';\n\n'+
    '// Aliases: motivos que herdam o guia clínico de outro (definido uma única vez)\n'+
    aliasLines.join('\n')+'\n';
  const esSrc=
    '// ⚙️ GERADO por scripts/build.js — NÃO editar à mão. Edite src/ (guideEs nos motivos) e rode o build.\n'+
    'var GUIDE_ES = '+J(GUIDE_ES)+';\n\n'+mergeBlock;
  // Guias de enfermidade: só as PUBLICADAS vão para o arquivo público (rascunho/revisado ficam fora).
  const ENF={};
  Object.keys(reg.enf).sort().forEach(id=>{ const e=reg.enf[id]; if(incluirRascunhos||e.status==='publicado') ENF[id]=e; });
  const enfSrc=
    '// ⚙️ GERADO por scripts/build.js — NÃO editar à mão. Edite src/enfermidades/ e rode: node scripts/build.js\n'+
    '// Só guias com status "publicado" entram aqui (o site é estático: tudo deste arquivo é público).\n'+
    'const ENFERMIDADES = '+J(ENF)+';\n';
  return { motivosSrc, esSrc, enfSrc };
}

if(require.main===module){
  const {validar}=require('./validar-enfermidades');
  const {reg, espIds}=montar();
  const v=validar(reg, espIds);
  v.avisos.forEach(a=>console.log('  AVISO '+a));
  if(v.erros.length){ v.erros.forEach(e=>console.error('  ERRO  '+e)); console.error('build ABORTADO: '+v.erros.length+' erro(s) nas guias de enfermidade'); process.exit(1); }
  const {motivosSrc, esSrc, enfSrc}=assemble({rascunhos:process.argv.includes('--rascunhos')});
  fs.writeFileSync(ROOT+'/anamnesismed-motivos.js', motivosSrc);
  fs.writeFileSync(ROOT+'/anamnesismed-guide-es.js', esSrc);
  fs.writeFileSync(ROOT+'/anamnesismed-enfermidades.js', enfSrc);
  console.log('build OK: anamnesismed-motivos.js + anamnesismed-guide-es.js + anamnesismed-enfermidades.js gerados a partir de src/');
}
module.exports={assemble, montar};
