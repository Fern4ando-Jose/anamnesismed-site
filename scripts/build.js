// scripts/build.js — junta a fonte modular (src/) nos arquivos de produção.
// Uso:  node scripts/build.js          → grava anamnesismed-motivos.js e anamnesismed-guide-es.js
//       require('./build').assemble()  → retorna as strings geradas (sem gravar)  [usado pelo verify.sh]
const fs=require('fs'), path=require('path');
const ROOT=path.resolve(__dirname,'..');
const ESP_ORDER=['clinica','semiologia','cirurgia','respiratorio']; // ordem das especialidades no grid

function assemble(){
  const reg={motivos:{}, esp:{}, ras:null};
  const AM={ motivo:(id,c)=>{reg.motivos[id]=c;}, especialidade:(e,c)=>{reg.esp[e]=c;}, ras:(a)=>{reg.ras=a;} };
  const run=f=>new Function('AM', fs.readFileSync(f,'utf8'))(AM);
  run(ROOT+'/src/ras.js');
  fs.readdirSync(ROOT+'/src/motivos').filter(f=>f.endsWith('.js')).sort().forEach(f=>run(ROOT+'/src/motivos/'+f));
  ESP_ORDER.forEach(e=>run(ROOT+'/src/especialidades/'+e+'.js'));

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
  return { motivosSrc, esSrc };
}

if(require.main===module){
  const {motivosSrc, esSrc}=assemble();
  fs.writeFileSync(ROOT+'/anamnesismed-motivos.js', motivosSrc);
  fs.writeFileSync(ROOT+'/anamnesismed-guide-es.js', esSrc);
  console.log('build OK: anamnesismed-motivos.js + anamnesismed-guide-es.js gerados a partir de src/');
}
module.exports={assemble};
