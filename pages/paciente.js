import { useState } from 'react'
import { useRouter } from 'next/router'

const C = {
  teal900:'#04342C',teal800:'#085041',teal600:'#0F6E56',
  teal400:'#1D9E75',teal200:'#5DCAA5',teal100:'#9FE1CB',teal50:'#E1F5EE',
  blue800:'#0C447C',blue600:'#185FA5',blue400:'#378ADD',blue50:'#E6F1FB',
  coral800:'#712B13',coral600:'#993C1D',coral400:'#D85A30',coral50:'#FAECE7',
  purple800:'#3C3489',purple400:'#7F77DD',purple50:'#EEEDFE',
  amber800:'#633806',amber600:'#854F0B',amber400:'#EF9F27',amber50:'#FAEEDA',
  red800:'#791F1F',red400:'#E24B4A',red50:'#FCEBEB',
  gray900:'#2C2C2A',gray700:'#444441',gray600:'#5F5E5A',gray400:'#888780',
  gray200:'#B4B2A9',gray100:'#D3D1C7',gray50:'#F1EFE8',white:'#ffffff',
}

const MICKEY = {
  name:'Mickey Mouse', age:71, site:'Próstata', week:7, totalWeeks:8,
  ficha:{
    diagnostico:'Adenocarcinoma de próstata',
    estadiamento:'cT2bN0M0 — Grau ISUP 2 (Gleason 3+4=7)',
    tecnica:'VMAT — Volumetric Modulated Arc Therapy',
    dosePrescrita:'70 Gy / 35 frações',
    doseAcumulada:'62 Gy',
    fracoesTotais:35,
    fracoesRealizadas:31,
    inicioTratamento:'15/03/2026',
    terminoPrevisto:'12/05/2026',
    seguimentoAte:'12/06/2026',
    medico:'Dr. Tadeu Ludwig',
    fisico:'Dr. Bernardo Pinatti',
    servico:'HCI — Hospital de Caridade de Ijuí',
    observacoes:'Hormonioterapia concomitante (LHRH análogo). Radioterapia pélvica excluída — tumor confinado à próstata.',
  },
  fracoes: Array.from({length:35},(_,i)=>{
    const semana=Math.floor(i/5)+1
    const diaSemana=i%5
    const labels=['Seg','Ter','Qua','Qui','Sex']
    if(i<30) return {n:i+1,semana,dia:labels[diaSemana],status:'done'}
    if(i===30) return {n:31,semana:7,dia:'Seg',status:'today'}
    return {n:i+1,semana:Math.floor(i/5)+1,dia:labels[diaSemana],status:'scheduled'}
  }),
}

const ORIENTACOES = {
  prostata:{
    urinario:[
      {semanas:[1,2],titulo:'Sintomas urinários leves são esperados',texto:'Nas primeiras semanas, é normal sentir leve aumento na frequência urinária. Beba água regularmente ao longo do dia, mas evite grandes volumes de uma vez.',cor:C.teal400,bg:C.teal50,textColor:C.teal800},
      {semanas:[3,4,5],titulo:'Pico de toxicidade urinária — semanas 3 a 5',texto:'Esse é o período mais comum de sintomas urinários. Evite café, álcool e bebidas gaseificadas. Se sentir ardência intensa ou dificuldade para urinar, comunique sua equipe.',cor:C.amber400,bg:C.amber50,textColor:C.amber800},
      {semanas:[6,7,8],titulo:'Sintomas podem estar intensos — você está quase lá',texto:'É normal que os sintomas urinários piorem nas últimas semanas. Geralmente melhoram nas 4-6 semanas após o término. Não use medicamentos sem orientação médica.',cor:C.coral400,bg:C.coral50,textColor:C.coral800},
    ],
    intestinal:[
      {semanas:[1,2,3],titulo:'Intestino pode reagir ao tratamento',texto:'A radioterapia pélvica pode causar alteração do ritmo intestinal. Prefira alimentos de fácil digestão e evite fibras insolúveis em excesso.',cor:C.teal400,bg:C.teal50,textColor:C.teal800},
      {semanas:[4,5,6,7,8],titulo:'Diarreia — quando buscar atendimento',texto:'Mais de 4 evacuações líquidas por dia, sangue nas fezes ou dor intensa são sinais de que você precisa de avaliação médica. Mantenha hidratação.',cor:C.amber400,bg:C.amber50,textColor:C.amber800},
    ],
  },
}

function getOrientacao(site,dominio,semana){
  const base=ORIENTACOES[site.toLowerCase()]?.[dominio]
  if(!base) return null
  return base.find(o=>o.semanas.includes(semana))||base[base.length-1]
}

const DICAS_SEMANA = {
  7:{titulo:'Semana 7 de 8 — você está quase lá',itens:['Beba pelo menos 8 copos de água por dia, em pequenas quantidades','Evite café, álcool e bebidas com cafeína','Prefira refeições leves e fracionadas (5-6 vezes ao dia)','Use roupas folgadas e confortáveis na região pélvica','O cansaço é esperado nessa fase — descanse sem culpa'],cor:C.amber400,bg:C.amber50,textColor:C.amber800},
}

function IconBladder({size=48}){
  return(<svg width={size} height={size} viewBox="0 0 52 52"><ellipse cx="26" cy="30" rx="16" ry="14" fill={C.teal50} stroke={C.teal400} strokeWidth="1.8"/><ellipse cx="26" cy="28" rx="10" ry="8" fill={C.teal100} fillOpacity="0.5"/><path d="M20 16 Q22 10 26 8 Q30 10 32 16" fill="none" stroke={C.teal400} strokeWidth="1.8" strokeLinecap="round"/><path d="M26 44 L26 48" stroke={C.teal400} strokeWidth="2" strokeLinecap="round"/><ellipse cx="26" cy="48" rx="5" ry="2" fill={C.teal100}/></svg>)
}
function IconUrethra({size=48}){
  return(<svg width={size} height={size} viewBox="0 0 52 52"><ellipse cx="26" cy="26" rx="14" ry="10" fill={C.blue50} stroke={C.blue400} strokeWidth="1.8"/><ellipse cx="26" cy="25" rx="8" ry="5.5" fill={C.blue400} fillOpacity="0.25"/><path d="M26 36 L26 46" stroke={C.blue400} strokeWidth="2" strokeLinecap="round"/><path d="M20 14 Q26 10 32 14" fill="none" stroke={C.blue400} strokeWidth="1.5" strokeLinecap="round"/></svg>)
}
function IconRectum({size=48}){
  return(<svg width={size} height={size} viewBox="0 0 52 52"><path d="M14 10 Q12 20 16 28 Q20 36 18 44 Q22 48 26 48 Q30 48 34 44 Q32 36 36 28 Q40 20 38 10" fill={C.coral50} stroke={C.coral400} strokeWidth="1.8" strokeLinejoin="round"/><path d="M14 10 Q26 6 38 10" fill="none" stroke={C.coral400} strokeWidth="1.8" strokeLinecap="round"/></svg>)
}
function IconLumbar({size=48}){
  return(<svg width={size} height={size} viewBox="0 0 52 52"><rect x="16" y="8" width="20" height="36" rx="6" fill={C.purple50} stroke={C.purple400} strokeWidth="1.8"/><rect x="20" y="14" width="12" height="5" rx="2.5" fill={C.purple400} fillOpacity="0.5"/><rect x="20" y="22" width="12" height="5" rx="2.5" fill={C.purple400} fillOpacity="0.5"/><rect x="20" y="30" width="12" height="5" rx="2.5" fill={C.purple400} fillOpacity="0.5"/></svg>)
}

const ZONE_CFG={
  bladder:{name:'Bexiga',sub:'Vontade de urinar · frequência',Icon:IconBladder,border:C.teal400,bg:C.teal50,text:C.teal800},
  urethra:{name:'Próstata / uretra',sub:'Ardência ao urinar · jato fraco',Icon:IconUrethra,border:C.blue400,bg:C.blue50,text:C.blue800},
  rectum:{name:'Reto / intestino',sub:'Diarreia · cólica · ardência',Icon:IconRectum,border:C.coral400,bg:C.coral50,text:C.coral800},
  lumbar:{name:'Lombar / costas',sub:'Dor nas costas · região lombar',Icon:IconLumbar,border:C.purple400,bg:C.purple50,text:C.purple800},
}

function UrgencyMeter({value,onChange}){
  const segs=[{color:C.teal400,label:'Sem urgência'},{color:C.teal200,label:'Raramente'},{color:C.amber400,label:'Às vezes'},{color:C.coral400,label:'Frequentemente'},{color:C.red400,label:'Perdi o controle'}]
  return(<div><div style={{display:'flex',gap:4,marginBottom:6}}>{segs.map((s,i)=><div key={i} onClick={()=>onChange(i)} style={{flex:1,height:18,borderRadius:3,background:s.color,opacity:i<=value?1:0.18,cursor:'pointer',transition:'opacity 0.15s'}}/>)}</div><div style={{fontSize:11,color:C.gray600,textAlign:'center'}}>{segs[value]?.label}</div></div>)
}

function IntensityBars({value,onChange,labels}){
  const colors=[C.teal400,C.teal200,C.amber400,C.coral400,C.red400]
  const heights=['20%','40%','60%','80%','100%']
  return(<div><div style={{display:'flex',gap:4,alignItems:'flex-end',height:44,marginBottom:4}}>{[0,1,2,3,4].map(i=><div key={i} onClick={()=>onChange(i)} style={{flex:1,height:heights[i],borderRadius:'3px 3px 0 0',background:colors[i],opacity:value===i?1:0.22,cursor:'pointer',transition:'all 0.15s',transform:value===i?'scaleY(1.08)':'scaleY(1)',transformOrigin:'bottom'}}/>)}</div><div style={{display:'flex',justifyContent:'space-between',fontSize:9,color:C.gray400}}>{labels.map((l,i)=><span key={i}>{l}</span>)}</div></div>)
}

function EmojiSelector({value,onChange}){
  const opts=[{emoji:'😄',label:'Muito bem'},{emoji:'🙂',label:'Bem'},{emoji:'😐',label:'Mais ou menos'},{emoji:'😔',label:'Mal'},{emoji:'😞',label:'Muito mal'}]
  return(<div style={{display:'flex',gap:6}}>{opts.map((o,i)=><div key={i} onClick={()=>onChange(i)} style={{flex:1,display:'flex',flexDirection:'column',alignItems:'center',gap:4,padding:'10px 4px',borderRadius:10,border:`${value===i?'2px':'0.5px'} solid ${value===i?C.teal400:C.gray100}`,background:value===i?C.teal50:'transparent',cursor:'pointer',transition:'all 0.15s'}}><span style={{fontSize:22}}>{o.emoji}</span><span style={{fontSize:10,color:value===i?C.teal800:C.gray600,fontWeight:value===i?500:400,textAlign:'center',lineHeight:1.2}}>{o.label}</span></div>)}</div>)
}

function OrientacaoCard({titulo,texto,cor,bg,textColor}){
  return(<div style={{background:bg,border:`0.5px solid ${cor}`,borderRadius:10,padding:'12px 14px',marginBottom:14,display:'flex',gap:10}}><span style={{fontSize:18,flexShrink:0}}>💡</span><div><div style={{fontSize:12,fontWeight:600,color:textColor,marginBottom:3}}>{titulo}</div><div style={{fontSize:12,color:textColor,lineHeight:1.6,opacity:0.85}}>{texto}</div></div></div>)
}

function FichaTratamento({ficha,fracoes}){
  const realizadas=fracoes.filter(f=>f.status==='done'||f.status==='today').length
  const pct=Math.round((realizadas/fracoes.length)*100)
  return(
    <div style={{padding:16}}>
      <div style={{fontSize:15,fontWeight:600,color:C.gray900,marginBottom:2}}>Ficha de tratamento</div>
      <div style={{fontSize:12,color:C.gray400,marginBottom:16}}>Suas informações de tratamento</div>
      <div style={{background:C.white,border:`0.5px solid ${C.gray100}`,borderRadius:16,padding:16,marginBottom:14}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:10}}>
          <div style={{fontSize:13,fontWeight:500,color:C.gray900}}>Progresso das frações</div>
          <div style={{fontSize:20,fontWeight:700,color:C.teal600}}>{realizadas}/{fracoes.length}</div>
        </div>
        <div style={{background:C.gray50,borderRadius:4,height:8,marginBottom:6,overflow:'hidden'}}>
          <div style={{width:`${pct}%`,height:'100%',background:C.teal400,borderRadius:4}}/>
        </div>
        <div style={{display:'flex',justifyContent:'space-between',fontSize:10,color:C.gray400}}>
          <span>Início — {ficha.inicioTratamento}</span>
          <span style={{fontWeight:500,color:C.teal600}}>{pct}% concluído</span>
          <span>Término — {ficha.terminoPrevisto}</span>
        </div>
      </div>
      <div style={{background:C.white,border:`0.5px solid ${C.gray100}`,borderRadius:16,padding:16,marginBottom:14}}>
        <div style={{fontSize:12,fontWeight:600,color:C.gray600,marginBottom:12}}>Diagnóstico e tratamento</div>
        {[['Diagnóstico',ficha.diagnostico],['Estadiamento',ficha.estadiamento],['Técnica',ficha.tecnica],['Dose prescrita',ficha.dosePrescrita],['Dose acumulada hoje',ficha.doseAcumulada],['Início do tratamento',ficha.inicioTratamento],['Término previsto',ficha.terminoPrevisto],['Seguimento até',ficha.seguimentoAte]].map(([label,val])=>(
          <div key={label} style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',padding:'8px 0',borderBottom:`0.5px solid ${C.gray50}`,gap:12}}>
            <span style={{fontSize:12,color:C.gray400,flexShrink:0}}>{label}</span>
            <span style={{fontSize:12,color:C.gray900,fontWeight:500,textAlign:'right'}}>{val}</span>
          </div>
        ))}
      </div>
      <div style={{background:C.white,border:`0.5px solid ${C.gray100}`,borderRadius:16,padding:16,marginBottom:14}}>
        <div style={{fontSize:12,fontWeight:600,color:C.gray600,marginBottom:12}}>Sua equipe</div>
        {[['Radioterapeuta',ficha.medico,'👨‍⚕️'],['Físico médico',ficha.fisico,'🔬'],['Serviço',ficha.servico,'🏥']].map(([label,val,icon])=>(
          <div key={label} style={{display:'flex',alignItems:'center',gap:10,padding:'8px 0',borderBottom:`0.5px solid ${C.gray50}`}}>
            <span style={{fontSize:18}}>{icon}</span>
            <div><div style={{fontSize:10,color:C.gray400}}>{label}</div><div style={{fontSize:13,fontWeight:500,color:C.gray900}}>{val}</div></div>
          </div>
        ))}
      </div>
      {ficha.observacoes&&(<div style={{background:C.blue50,border:`0.5px solid ${C.blue400}`,borderRadius:12,padding:'12px 14px',display:'flex',gap:10}}><span style={{fontSize:18,flexShrink:0}}>📋</span><div><div style={{fontSize:11,fontWeight:600,color:C.blue800,marginBottom:3}}>Observações da equipe</div><div style={{fontSize:12,color:C.blue800,lineHeight:1.6,opacity:0.85}}>{ficha.observacoes}</div></div></div>)}
    </div>
  )
}

function CalendarioFracoes({fracoes,week}){
  const [selectedWeek,setSelectedWeek]=useState(week)
  const semanas=[...new Set(fracoes.map(f=>f.semana))]
  const fracoesSemana=fracoes.filter(f=>f.semana===selectedWeek)
  const realizadas=fracoes.filter(f=>f.status==='done'||f.status==='today').length
  const statusCfg={done:{bg:C.teal50,border:C.teal200,text:C.teal800,label:'✓'},today:{bg:C.teal400,border:C.teal600,text:C.white,label:'Hoje'},scheduled:{bg:C.gray50,border:C.gray100,text:C.gray400,label:''},missed:{bg:C.red50,border:C.red400,text:C.red800,label:'✗'}}
  return(
    <div style={{padding:16}}>
      <div style={{fontSize:15,fontWeight:600,color:C.gray900,marginBottom:2}}>Calendário de sessões</div>
      <div style={{fontSize:12,color:C.gray400,marginBottom:16}}>Acompanhe suas frações de radioterapia</div>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:10,marginBottom:14}}>
        {[{label:'Realizadas',value:realizadas,color:C.teal600,bg:C.teal50},{label:'Restantes',value:fracoes.length-realizadas,color:C.gray600,bg:C.gray50},{label:'Total',value:fracoes.length,color:C.gray900,bg:C.gray50}].map(m=>(
          <div key={m.label} style={{background:m.bg,borderRadius:10,padding:'12px 10px',textAlign:'center'}}>
            <div style={{fontSize:22,fontWeight:700,color:m.color}}>{m.value}</div>
            <div style={{fontSize:10,color:C.gray400,marginTop:2}}>{m.label}</div>
          </div>
        ))}
      </div>
      <div style={{background:C.white,border:`0.5px solid ${C.gray100}`,borderRadius:16,padding:16,marginBottom:14}}>
        <div style={{fontSize:12,fontWeight:600,color:C.gray600,marginBottom:10}}>Semana</div>
        <div style={{display:'flex',gap:6,flexWrap:'wrap',marginBottom:14}}>
          {semanas.map(s=>(
            <button key={s} onClick={()=>setSelectedWeek(s)} style={{padding:'5px 12px',borderRadius:20,border:`0.5px solid ${selectedWeek===s?C.teal400:C.gray100}`,background:selectedWeek===s?C.teal50:'transparent',color:selectedWeek===s?C.teal800:C.gray600,fontSize:12,fontWeight:selectedWeek===s?600:400,cursor:'pointer'}}>Sem. {s}</button>
          ))}
        </div>
        <div style={{display:'flex',gap:8}}>
          {fracoesSemana.map(f=>{
            const cfg=statusCfg[f.status]
            return(<div key={f.n} style={{flex:1,display:'flex',flexDirection:'column',alignItems:'center',gap:6}}><div style={{fontSize:10,color:C.gray400}}>{f.dia}</div><div style={{width:'100%',aspectRatio:'1',borderRadius:10,background:cfg.bg,border:`1.5px solid ${cfg.border}`,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:2}}><div style={{fontSize:10,fontWeight:700,color:cfg.text}}>#{f.n}</div><div style={{fontSize:10,color:cfg.text}}>{cfg.label}</div></div></div>)
          })}
        </div>
      </div>
      <div style={{background:C.white,border:`0.5px solid ${C.gray100}`,borderRadius:16,padding:16}}>
        <div style={{fontSize:12,fontWeight:600,color:C.gray600,marginBottom:10}}>Visão geral</div>
        <div style={{display:'flex',flexWrap:'wrap',gap:4}}>
          {fracoes.map(f=>{
            const cfg=statusCfg[f.status]
            return(<div key={f.n} title={`Fração ${f.n}`} style={{width:20,height:20,borderRadius:4,background:cfg.bg,border:`1px solid ${cfg.border}`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:7,color:cfg.text,fontWeight:600}}>{f.status==='done'?'✓':f.status==='today'?'●':f.status==='missed'?'✗':''}</div>)
          })}
        </div>
      </div>
    </div>
  )
}

function OrientacoesPage({site,week}){
  const dicas=DICAS_SEMANA[week]||DICAS_SEMANA[7]
  const orUrin=getOrientacao(site,'urinario',week)||{titulo:'Sintomas urinários',texto:'Mantenha boa hidratação e comunique qualquer piora à sua equipe.',cor:C.teal400,bg:C.teal50,textColor:C.teal800}
  const orInt=getOrientacao(site,'intestinal',week)||{titulo:'Cuidados intestinais',texto:'Prefira alimentação leve e fracionada durante o tratamento.',cor:C.teal400,bg:C.teal50,textColor:C.teal800}
  return(
    <div style={{padding:16}}>
      <div style={{fontSize:15,fontWeight:600,color:C.gray900,marginBottom:2}}>Orientações</div>
      <div style={{fontSize:12,color:C.gray400,marginBottom:16}}>Dicas práticas para o seu tratamento</div>
      <div style={{background:dicas.bg,border:`0.5px solid ${dicas.cor}`,borderRadius:16,padding:16,marginBottom:14}}>
        <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:10}}><span style={{fontSize:20}}>🌟</span><div style={{fontSize:13,fontWeight:600,color:dicas.textColor}}>{dicas.titulo}</div></div>
        {dicas.itens.map((item,i)=>(<div key={i} style={{display:'flex',gap:8,padding:'5px 0',borderBottom:i<dicas.itens.length-1?`0.5px solid ${dicas.cor}22`:'none'}}><span style={{color:dicas.cor,flexShrink:0,fontSize:14}}>→</span><span style={{fontSize:12,color:dicas.textColor,lineHeight:1.6}}>{item}</span></div>))}
      </div>
      <div style={{fontSize:12,fontWeight:600,color:C.gray600,marginBottom:10}}>Orientações por sintoma</div>
      <OrientacaoCard {...orUrin}/>
      <OrientacaoCard {...orInt}/>
      <div style={{background:C.red50,border:`0.5px solid ${C.red400}`,borderRadius:16,padding:16,marginBottom:14}}>
        <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:10}}><span style={{fontSize:20}}>🚨</span><div style={{fontSize:13,fontWeight:600,color:C.red800}}>Quando buscar pronto-atendimento</div></div>
        {['Febre acima de 38°C','Sangramento urinário intenso','Incapacidade de urinar (retenção urinária)','Dor intensa que não passa com analgésicos comuns','Mais de 6 evacuações líquidas em 24 horas'].map((item,i)=>(<div key={i} style={{display:'flex',gap:8,padding:'5px 0',borderBottom:i<4?`0.5px solid ${C.red400}22`:'none'}}><span style={{color:C.red400,flexShrink:0}}>⚠</span><span style={{fontSize:12,color:C.red800,lineHeight:1.6}}>{item}</span></div>))}
        <div style={{marginTop:10,padding:'8px 12px',background:C.white,borderRadius:8,fontSize:12,color:C.red800,fontWeight:500}}>Em caso de urgência, procure o HCI ou o pronto-socorro mais próximo e informe que está em tratamento de radioterapia.</div>
      </div>
    </div>
  )
}

function PatientForm({onBack,week,site}){
  const [step,setStep]=useState(0)
  const [zones,setZones]=useState({bladder:false,urethra:false,rectum:false,lumbar:false})
  const [freq,setFreq]=useState(0)
  const [urgency,setUrgency]=useState(0)
  const [pain,setPain]=useState(0)
  const [diarrhea,setDiarrhea]=useState(0)
  const [wellbeing,setWellbeing]=useState(null)
  const [fatigue,setFatigue]=useState(0)
  const [done,setDone]=useState(false)
  const toggleZone=id=>setZones(z=>({...z,[id]:!z[id]}))
  const anyZone=Object.values(zones).some(Boolean)
  const freqOpts=['Normal','Um pouco mais','Bem mais','Muito mais','Quase não paro']
  const severityLabels=['Ausente','Leve','Moderado','Grave','Muito grave']
  const emojiLabels=['Muito bem 😄','Bem 🙂','Mais ou menos 😐','Mal 😔','Muito mal 😞']
  const maxScore=Math.max(freq,urgency,Math.round(pain/2.5),diarrhea,wellbeing??0,fatigue)
  const orUrin=getOrientacao(site,'urinario',week)
  const orInt=getOrientacao(site,'intestinal',week)
  if(done){
    return(<div style={{padding:24}}><div style={{background:C.white,border:`0.5px solid ${C.gray100}`,borderRadius:16,padding:28,textAlign:'center'}}><div style={{fontSize:48,marginBottom:12}}>✅</div><div style={{fontSize:17,fontWeight:500,color:C.gray900,marginBottom:6}}>Registro enviado, Mickey.</div><div style={{fontSize:13,color:C.gray600,lineHeight:1.6}}>Sua equipe acompanha sua evolução.<br/>Até amanhã.</div>{maxScore>=3&&(<div style={{background:C.amber50,border:`0.5px solid ${C.amber400}`,borderRadius:10,padding:'12px 14px',marginTop:16,textAlign:'left',fontSize:12,color:C.amber800,display:'flex',gap:8}}><span>⚠️</span><div><strong>Sua equipe foi avisada.</strong> Os sintomas de hoje indicam que você pode precisar de atenção.</div></div>)}<button onClick={onBack} style={{marginTop:20,width:'100%',padding:11,background:C.teal600,color:C.white,border:'none',borderRadius:10,fontSize:13,fontWeight:500,cursor:'pointer'}}>Voltar ao início</button></div></div>)
  }
  const steps=[
    {title:'Onde você está sentindo desconforto?',sub:'Toque em todas as regiões que incomodam hoje',content:(<div><div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10,marginBottom:14}}>{Object.entries(ZONE_CFG).map(([id,cfg])=>{const on=zones[id];const dim=anyZone&&!on;return(<div key={id} onClick={()=>toggleZone(id)} style={{border:`${on?'2px':'1.5px'} ${on?'solid':'dashed'} ${on?cfg.border:C.gray100}`,borderRadius:12,padding:'14px 10px',cursor:'pointer',background:on?cfg.bg:'transparent',opacity:dim?0.28:1,display:'flex',flexDirection:'column',alignItems:'center',gap:8,textAlign:'center',transition:'all 0.2s'}}><cfg.Icon size={48}/><div style={{fontSize:12,fontWeight:500,color:on?cfg.text:C.gray900}}>{cfg.name}</div><div style={{fontSize:10,color:on?cfg.text:C.gray400,lineHeight:1.4}}>{cfg.sub}</div></div>)})}</div><div onClick={()=>setZones({bladder:false,urethra:false,rectum:false,lumbar:false})} style={{border:`0.5px solid ${C.gray100}`,borderRadius:10,padding:'10px 14px',cursor:'pointer',display:'flex',alignItems:'center',gap:10,fontSize:12,color:C.gray600}}><span style={{fontSize:16}}>—</span> Sem desconforto hoje</div></div>)},
    {title:'Sintomas urinários',sub:'Como foi hoje para urinar?',content:(<div style={{display:'flex',flexDirection:'column',gap:18}}>{orUrin&&<OrientacaoCard {...orUrin}/>}<div><div style={{fontSize:13,fontWeight:500,color:C.gray900,marginBottom:10}}>Com que frequência foi ao banheiro?</div><div style={{display:'grid',gridTemplateColumns:'repeat(5,1fr)',gap:6}}>{freqOpts.map((l,i)=>(<div key={i} onClick={()=>setFreq(i)} style={{display:'flex',flexDirection:'column',alignItems:'center',gap:5,padding:'10px 4px',borderRadius:10,border:`${freq===i?'2px':'0.5px'} solid ${freq===i?C.teal400:C.gray100}`,background:freq===i?C.teal50:'transparent',cursor:'pointer',textAlign:'center'}}><span style={{fontSize:16,fontWeight:500,color:freq===i?C.teal600:C.gray600}}>{['1×','2×','5×','8×','∞'][i]}</span><span style={{fontSize:9,color:freq===i?C.teal800:C.gray400,lineHeight:1.3}}>{l}</span></div>))}</div></div><div><div style={{fontSize:13,fontWeight:500,color:C.gray900,marginBottom:10}}>Urgência — conseguiu segurar?</div><UrgencyMeter value={urgency} onChange={setUrgency}/></div></div>)},
    {title:'Dor, ardência e intestino',sub:'Indique a intensidade de cada sintoma',content:(<div style={{display:'flex',flexDirection:'column',gap:20}}>{orInt&&<OrientacaoCard {...orInt}/>}<div><div style={{fontSize:13,fontWeight:500,color:C.gray900,marginBottom:6}}>Dor ou ardência ao urinar</div><div style={{fontSize:28,fontWeight:500,textAlign:'center',color:pain<=3?C.teal600:pain<=6?C.amber600:C.red400,marginBottom:8}}>{pain}/10</div><div style={{height:6,borderRadius:4,background:`linear-gradient(to right, ${C.teal400}, ${C.amber400}, ${C.red400})`,marginBottom:8}}/><input type="range" min={0} max={10} step={1} value={pain} onChange={e=>setPain(parseInt(e.target.value))} style={{width:'100%',accentColor:C.teal600}}/><div style={{display:'flex',justifyContent:'space-between',fontSize:9,color:C.gray400}}><span>0 — Sem dor</span><span>5 — Moderada</span><span>10 — Insuportável</span></div></div><div><div style={{fontSize:13,fontWeight:500,color:C.gray900,marginBottom:10}}>Diarreia hoje</div><IntensityBars value={diarrhea} onChange={setDiarrhea} labels={['Não','Amolecidas','Leve','Intensa','Grave']}/></div></div>)},
    {title:'Cansaço e bem-estar',sub:'Como você se sentiu hoje de modo geral?',content:(<div style={{display:'flex',flexDirection:'column',gap:20}}><div><div style={{fontSize:13,fontWeight:500,color:C.gray900,marginBottom:10}}>Como você está se sentindo?</div><EmojiSelector value={wellbeing} onChange={setWellbeing}/></div><div><div style={{fontSize:13,fontWeight:500,color:C.gray900,marginBottom:10}}>Cansaço hoje</div><IntensityBars value={fatigue} onChange={setFatigue} labels={['Nenhum','Leve','Moderado','Intenso','Extremo']}/></div></div>)},
    {title:'Revisão do registro',sub:'Confirme antes de enviar',content:(<div>{[['Regiões',Object.entries(zones).filter(([,v])=>v).map(([k])=>ZONE_CFG[k].name).join(', ')||'Nenhuma'],['Frequência urinária',freqOpts[freq]],['Urgência',['Sem urgência','Raramente','Às vezes','Frequentemente','Perdi o controle'][urgency]],['Dor/ardência',`${pain}/10`],['Diarreia',severityLabels[diarrhea]],['Bem-estar',wellbeing!==null?emojiLabels[wellbeing]:'—'],['Cansaço',severityLabels[fatigue]]].map(([label,val])=>(<div key={label} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'9px 0',borderBottom:`0.5px solid ${C.gray100}`,fontSize:12}}><span style={{color:C.gray600}}>{label}</span><span style={{fontWeight:500,color:C.gray900}}>{val}</span></div>))}<div style={{background:C.gray50,borderRadius:8,padding:'10px 12px',marginTop:14,fontSize:11,color:C.gray600,display:'flex',gap:6,alignItems:'center'}}>🔒 Seus dados são vistos apenas pela sua equipe de saúde.</div></div>)},
  ]
  const isLast=step===steps.length-1
  return(<div style={{padding:16}}><div style={{display:'flex',alignItems:'center',gap:8,marginBottom:16}}><button onClick={step===0?onBack:()=>setStep(s=>s-1)} style={{background:'none',border:'none',cursor:'pointer',color:C.gray600,fontSize:13,display:'flex',alignItems:'center',gap:4,padding:0}}>← {step===0?'Início':'Voltar'}</button><span style={{fontSize:12,color:C.gray400}}>/ Registro de hoje — 07/05</span></div><div style={{display:'flex',gap:6,justifyContent:'center',marginBottom:16}}>{steps.map((_,i)=><div key={i} style={{height:6,borderRadius:3,background:i<=step?C.teal400:C.gray100,width:i===step?20:6,transition:'all 0.2s'}}/>)}</div><div style={{background:C.white,border:`0.5px solid ${C.gray100}`,borderRadius:16,padding:18,marginBottom:14}}><div style={{fontSize:13,fontWeight:500,color:C.gray600,marginBottom:2}}>{steps[step].title}</div><div style={{fontSize:11,color:C.gray400,marginBottom:16}}>{steps[step].sub}</div>{steps[step].content}</div><button onClick={()=>isLast?setDone(true):setStep(s=>s+1)} style={{width:'100%',padding:12,background:C.teal600,color:C.white,border:'none',borderRadius:10,fontSize:13,fontWeight:500,cursor:'pointer'}}>{isLast?'✉ Enviar registro':'Próximo →'}</button></div>)
}

function PatientHome({onFill}){
  const dicas=DICAS_SEMANA[7]
  const histDots=[[4,3,2,1],[3,3,2,1],[3,2,1,1],[2,2,0,1],[2,1,0,0]]
  const dotColor=v=>[C.teal50,C.teal100,C.amber400,C.coral400,C.red400][v]||C.gray100
  const dotBorder=v=>[C.teal100,C.teal200,C.amber600,C.coral600,C.red400][v]||C.gray100
  const weekDays=['S','T','Q','Q','S','S','H']
  const filled=[true,true,true,true,true,false,true]
  return(<div style={{padding:16}}><div style={{fontSize:18,fontWeight:500,color:C.gray900,marginBottom:2}}>Boa tarde, Mickey.</div><div style={{fontSize:12,color:C.gray600,marginBottom:16}}>Semana 7 de 8 · Próstata · HCI Ijuí</div><div style={{background:C.amber50,border:`0.5px solid ${C.amber400}`,borderRadius:12,padding:'13px 14px',marginBottom:14,display:'flex',gap:10,alignItems:'flex-start'}}><span style={{fontSize:16}}>⚠️</span><div style={{fontSize:12,color:C.amber800,lineHeight:1.5}}><strong>Sua equipe foi notificada.</strong><br/>Seus sintomas urinários dos últimos 2 dias indicam que você pode precisar de atenção.</div></div><div style={{background:C.white,border:`0.5px solid ${C.gray100}`,borderRadius:16,padding:16,marginBottom:14}}><div style={{fontSize:12,fontWeight:500,color:C.gray600,marginBottom:10}}>Progresso do tratamento</div><div style={{background:C.gray50,borderRadius:4,height:6,marginBottom:6,overflow:'hidden'}}><div style={{width:'87%',height:'100%',background:C.teal400,borderRadius:4}}/></div><div style={{display:'flex',justifyContent:'space-between',fontSize:10,color:C.gray400,marginBottom:14}}><span>Início — 15/03</span><span style={{fontWeight:500,color:C.teal600}}>87% · 31/35 frações</span><span>Término — 12/05</span></div><div style={{fontSize:11,color:C.gray400,marginBottom:6}}>Registros nesta semana</div><div style={{display:'flex',gap:5}}>{weekDays.map((d,i)=>(<div key={i} style={{width:28,height:28,borderRadius:5,display:'flex',alignItems:'center',justifyContent:'center',fontSize:10,fontWeight:500,background:i===6?C.teal400:filled[i]?C.teal50:C.gray50,color:i===6?C.white:filled[i]?C.teal800:C.gray400,border:`0.5px solid ${i===6?C.teal400:filled[i]?C.teal100:C.gray100}`}}>{d}</div>))}</div></div><div style={{background:dicas.bg,border:`0.5px solid ${dicas.cor}`,borderRadius:12,padding:'12px 14px',marginBottom:14}}><div style={{display:'flex',alignItems:'center',gap:6,marginBottom:6}}><span>🌟</span><span style={{fontSize:12,fontWeight:600,color:dicas.textColor}}>{dicas.titulo}</span></div><div style={{fontSize:12,color:dicas.textColor,opacity:0.85}}>→ {dicas.itens[0]}</div><div style={{fontSize:12,color:dicas.textColor,opacity:0.85,marginTop:3}}>→ {dicas.itens[1]}</div></div><div style={{background:C.white,border:`0.5px solid ${C.gray100}`,borderRadius:16,padding:16,marginBottom:14}}><div style={{fontSize:12,fontWeight:500,color:C.gray600,marginBottom:12}}>Histórico recente</div>{['07/05','06/05','05/05','04/05','03/05'].map((date,ri)=>(<div key={ri} style={{display:'flex',alignItems:'center',gap:8,padding:'7px 0',borderBottom:ri<4?`0.5px solid ${C.gray50}`:'none',fontSize:12}}><span style={{color:C.gray400,minWidth:44}}>{date}</span><div style={{display:'flex',gap:4,flex:1}}>{histDots[ri].map((v,i)=><div key={i} style={{width:12,height:12,borderRadius:'50%',background:dotColor(v),border:`1px solid ${dotBorder(v)}`}}/>)}</div>{ri===0&&<span style={{fontSize:10,color:C.gray400}}>hoje</span>}</div>))}</div><button onClick={onFill} style={{width:'100%',padding:12,background:C.teal600,color:C.white,border:'none',borderRadius:10,fontSize:14,fontWeight:500,cursor:'pointer'}}>📋 Registrar sintomas de hoje</button></div>)
}

const PATIENT_TABS=[{id:'home',icon:'🏠',label:'Início'},{id:'calendar',icon:'📅',label:'Sessões'},{id:'ficha',icon:'📋',label:'Ficha'},{id:'orientacoes',icon:'💡',label:'Orientações'}]

export default function PacientePage(){
  const router=useRouter()
  const [tab,setTab]=useState('home')
  const [showForm,setShowForm]=useState(false)
  return(
    <div style={{fontFamily:"'DM Sans', system-ui, sans-serif",background:C.gray50,minHeight:'100vh',display:'flex',flexDirection:'column'}}>
      <div style={{background:C.white,borderBottom:`0.5px solid ${C.gray100}`,padding:'12px 20px',display:'flex',alignItems:'center',justifyContent:'space-between',position:'sticky',top:0,zIndex:10}}>
        <div style={{display:'flex',alignItems:'center',gap:10}}>
          <button onClick={()=>router.push('/')} style={{background:'none',border:'none',cursor:'pointer',display:'flex',alignItems:'center',gap:8,padding:0}}>
            <svg width="20" height="20" viewBox="0 0 28 28"><circle cx="14" cy="14" r="13" fill={C.teal50} stroke={C.teal100} strokeWidth="1"/><circle cx="14" cy="14" r="5" fill={C.teal400}/></svg>
            <span style={{fontSize:15,fontWeight:600,color:C.gray900,letterSpacing:'-0.3px'}}>Gradus</span>
          </button>
          <span style={{fontSize:11,color:C.gray400}}>/ HCI Ijuí</span>
        </div>
        <div style={{display:'flex',alignItems:'center',gap:8}}>
          <div style={{width:26,height:26,borderRadius:'50%',background:C.teal50,display:'flex',alignItems:'center',justifyContent:'center',fontSize:10,fontWeight:500,color:C.teal800}}>MM</div>
          <span style={{fontSize:12,color:C.gray600}}>Mickey Mouse</span>
        </div>
      </div>
      <div style={{flex:1,overflowY:'auto',paddingBottom:showForm?0:70}}>
        {showForm?<PatientForm onBack={()=>setShowForm(false)} week={MICKEY.week} site={MICKEY.site}/>:(
          <>
            {tab==='home'&&<PatientHome onFill={()=>setShowForm(true)}/>}
            {tab==='calendar'&&<CalendarioFracoes fracoes={MICKEY.fracoes} week={MICKEY.week}/>}
            {tab==='ficha'&&<FichaTratamento ficha={MICKEY.ficha} fracoes={MICKEY.fracoes}/>}
            {tab==='orientacoes'&&<OrientacoesPage site={MICKEY.site} week={MICKEY.week}/>}
          </>
        )}
      </div>
      {!showForm&&(
        <div style={{position:'fixed',bottom:0,left:0,right:0,background:C.white,borderTop:`0.5px solid ${C.gray100}`,display:'flex',zIndex:10}}>
          {PATIENT_TABS.map(t=>(<button key={t.id} onClick={()=>setTab(t.id)} style={{flex:1,display:'flex',flexDirection:'column',alignItems:'center',gap:3,padding:'10px 4px',background:'none',border:'none',cursor:'pointer',borderTop:`2px solid ${tab===t.id?C.teal400:'transparent'}`}}><span style={{fontSize:18}}>{t.icon}</span><span style={{fontSize:10,color:tab===t.id?C.teal600:C.gray400,fontWeight:tab===t.id?600:400}}>{t.label}</span></button>))}
        </div>
      )}
    </div>
  )
}
