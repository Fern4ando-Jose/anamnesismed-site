function applyGuideES(){
  if(typeof GUIDE_CONTENT === 'undefined' || typeof GUIDE_ES === 'undefined') return;
  Object.keys(GUIDE_ES).forEach(function(id){
    var pt = GUIDE_CONTENT[id], es = GUIDE_ES[id];
    if(!pt || !es) return;

    if(es.mnemonics && pt.mnemonics) es.mnemonics.forEach(function(me, i){
      var mp = pt.mnemonics[i]; if(!mp || !me) return;
      if(me.name) mp.nameEs = me.name;
      if(me.kw) mp.kwEs = me.kw;
      if(me.rows && mp.rows) me.rows.forEach(function(re, j){
        var rp = mp.rows[j]; if(!rp || !re) return;
        if(re[0] != null) rp[3] = re[0];
        if(re[1] != null) rp[4] = re[1];
        if(re[2] != null) rp[5] = re[2];
      });
    });

    if(es.manobras && pt.manobras) es.manobras.forEach(function(xe, i){
      var xp = pt.manobras[i]; if(!xp || !xe) return;
      if(xe.title)    xp.titleEs = xe.title;
      if(xe.subtitle) xp.subtitleEs = xe.subtitle;
      if(xe.normal)   xp.normalEs = xe.normal;
      if(xe.abnormal) xp.abnormalEs = xe.abnormal;
      if(xe.steps)    xp.stepsEs = xe.steps;
    });

    if(es.sinais && pt.sinais) es.sinais.forEach(function(se, i){
      var sp = pt.sinais[i]; if(!sp || !se) return;
      if(se.name)   sp.nameEs = se.name;
      if(se.eponym) sp.eponymEs = se.eponym;
      if(se.how)    sp.howEs = se.how;
      if(se.means)  sp.meansEs = se.means;
    });

    if(es.ddx && pt.ddx) es.ddx.forEach(function(de, i){
      var dp = pt.ddx[i]; if(!dp || !de) return;
      if(de[0] != null) dp[3] = de[0];
      if(de[1] != null) dp[4] = de[1];
      if(de[2] != null) dp[5] = de[2];
    });

    if(es.escalas && pt.escalas) es.escalas.forEach(function(ee, i){
      var ep = pt.escalas[i]; if(!ep || !ee) return;
      if(ee.title)   ep.titleEs = ee.title;
      if(ee.headers) ep.headersEs = ee.headers;
      if(ee.rows)    ep.rowsEs = ee.rows;
      if(ee.note)    ep.noteEs = ee.note;
    });

    if(es.conduta && pt.conduta){
      if(es.conduta.exames) pt.conduta.examesEs = es.conduta.exames;
      if(es.conduta.drugs)  pt.conduta.drugsEs = es.conduta.drugs;
      if(es.conduta.steps)  pt.conduta.stepsEs = es.conduta.steps;
    }
  });
}
applyGuideES();
