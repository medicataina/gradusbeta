import { useState } from 'react'
import { useRouter } from 'next/router'

const C = {
  teal900:'#04342C',teal800:'#085041',teal600:'#0F6E56',
  teal400:'#1D9E75',teal200:'#5DCAA5',teal100:'#9FE1CB',teal50:'#E1F5EE',
  blue800:'#0C447C',blue400:'#378ADD',blue50:'#E6F1FB',
  coral800:'#712B13',coral400:'#D85A30',coral50:'#FAECE7',
  purple800:'#3C3489',purple400:'#7F77DD',purple50:'#EEEDFE',
  amber800:'#633806',amber600:'#854F0B',amber400:'#EF9F27',amber50:'#FAEEDA',
  red800:'#791F1F',red400:'#E24B4A',red50:'#FCEBEB',
  gray900:'#2C2C2A',gray700:'#444441',gray600:'#5F5E5A',gray400:'#888780',
  gray200:'#B4B2A9',gray100:'#D3D1C7',gray50:'#F1EFE8',white:'#ffffff',
}

const PATIENTS = [
  {id:1,name:'Maria A. S.',age:58,site:'Mama',week:5,totalWeeks:6,alert:'urgency',lastFill:'Hoje',silence:false,tlStart:'01/04',tlEnd:'07/05',tlFollow:'07/06',tlPct:87,tlFollowPct:100,charts:{symptoms:{labels:['Sem 1','Sem 2','Sem 3','Sem 4','Sem 5'],series:[{label:'Fadiga',data:[0,1,1,2,3],color:C.blue400},{label:'Dor local',data:[0,0,1,2,4],color:C.red400}]},domain:{label:'Pele (radiodermatite)',labels:['Sem 1','Sem 2','Sem 3','Sem 4','Sem 5'],series:[{label:'Radiodermatite',data:[0,0,1,2,4],color:C.coral400}]}},alerts:[{date:'07/05',desc:'Dor local score 4 · urgência',level:'red',ack:false},{date:'07/05',desc:'Radiodermatite score 4 · urgência',level:'red',ack:false},{date:'05/05',desc:'Radiodermatite score 3 · atenção',level:'orange',ack:true}]},
  {id:2,name:'Mickey Mouse',age:71,site:'Próstata',week:7,totalWeeks:8,alert:'urgency',lastFill:'Hoje',silence:false,tlStart:'15/03',tlEnd:'12/05',tlFollow:'12/06',tlPct:83,tlFollowPct:100,charts:{symptoms:{labels:['Sem 1','Sem 2','Sem 3','Sem 4','Sem 5','Sem 6','Sem 7'],series:[{label:'Frequência urinária',data:[1,1,2,2,3,3,4],color:C.red400},{label:'Urgência',data:[0,1,1,2,2,3,3],color:C.amber400}]},domain:{label:'Sintomas intestinais',labels:['Sem 1','Sem 2','Sem 3','Sem 4','Sem 5','Sem 6','Sem 7'],series:[{label:'Diarreia',data:[0,0,0,1,1,2,3],color:C.coral400}]}},alerts:[{date:'07/05',desc:'Frequência urinária score 4 · urgência',level:'red',ack:false},{date:'04/05',desc:'Diarreia score 3 · atenção',level:'orange',ack:true}]},
  {id:3,name:'Ana P. L.',age:45,site:'Mama',week:3,totalWeeks:6,alert:'attention',lastFill:'Ontem',silence:false,tlStart:'17/04',tlEnd:'29/05',tlFollow:'29/06',tlPct:35,tlFollowPct:75,charts:{symptoms:{labels:['Sem 1','Sem 2','Sem 3'],series:[{label:'Fadiga',data:[0,1,2],color:C.blue400},{label:'Náusea',data:[0,0,1],color:C.purple400}]},domain:{label:'Pele e linfedema',labels:['Sem 1','Sem 2','Sem 3'],series:[{label:'Radiodermatite',data:[0,1,2],color:C.coral400},{label:'Linfedema',data:[0,0,2],color:C.teal400}]}},alerts:[{date:'06/05',desc:'Linfedema score 2 · atenção precoce',level:'orange',ack:false}]},
  {id:4,name:'Carlos R. M.',age:65,site:'Próstata',week:2,totalWeeks:8,alert:'normal',lastFill:'Hoje',silence:false,tlStart:'29/04',tlEnd:'24/06',tlFollow:'24/07',tlPct:12,tlFollowPct:50,charts:{symptoms:{labels:['Sem 1','Sem 2'],series:[{label:'Frequência',data:[0,1],color:C.blue400},{label:'Urgência',data:[0,0],color:C.amber400}]},domain:{label:'Fadiga geral',labels:['Sem 1','Sem 2'],series:[{label:'Fadiga',data:[0,1],color:C.coral400}]}},alerts:[]},
  {id:5,name:'Luiza T. B.',age:62,site:'Mama',week:4,totalWeeks:6,alert:'silence',lastFill:'3 dias',silence:true,silenceDays:'3 dias',tlStart:'10/04',tlEnd:'22/05',tlFollow:'22/06',tlPct:56,tlFollowPct:85,charts:{symptoms:{labels:[],series:[]},domain:{label:'',labels:[],series:[]}},alerts:[]},
]

const ALERT_CFG = {
  urgency:{label:'Urgência',bg:C.red50,border:C.red400,text:C.red800,dot:C.red400},
  attention:{label:'Atenção',bg:C.amber50,border:C.amber400,text:C.amber800,dot:C.amber400},
  normal:{label:'Normal',bg:C.teal50,border:C.teal400,text:C.teal800,dot:C.teal400},
  silence:{label:'Silêncio',bg:C.gray50,border:C.gray400,text:C.gray600,dot:C.gray400},
}

function AlertBadge({level}){
  const c=ALERT_CFG[level]
  return(<span style={{display:'inline-flex',alignItems:'center',gap:5,fontSize:11,fontWeight:500,padding:'3px 9px',borderRadius:20,background:c.bg,color:c.text,border:`0.5px solid ${c.border}`}}><span style={{width:6,height:6,borderRadius:'50%',background:c.dot,flexShrink:0}}/>{c.label}</span>)
}

function MiniChart({labels,series,height=140}){
  if(!labels.length) return <div style={{height,display:'flex',alignItems:'center',justifyContent:'center',color:C.gray400,fontSize:12}}>Sem dados</div>
  const W=300,H=height,pad={t:10,r:10,b:28,l:28}
  const iW=W-pad.l-pad.r,iH=H-pad.t-pad.b
  const n=labels.length
  const xS=i=>pad.l+(i/(n-1))*iW
  const yS=v=>pad.t+iH-(v/4)*iH
  return(
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{display:'block'}}>
      {[0,1,2,3,4].map(v=><line key={v} x1={pad.l} y1={yS(v)} x2={W-pad.r} y2={yS(v)} stroke={C.gray100} strokeWidth="0.5"/>)}
      {[0,1,2,3,4].map(v=><text key={v} x={pad.l-4} y={yS(v)+4} textAnchor="end" fontSize="9" fill={C.gray400}>{v}</text>)}
      {labels.map((l,i)=><text key={i} x={xS(i)} y={H-6} textAnchor="middle" fontSize="9" fill={C.gray400}>{l}</text>)}
      {series.map((s,si)=>{
        const pts=s.data.map((v,i)=>`${xS(i)},${yS(v)}`).join(' ')
        const area=`M${xS(0)},${yS(s.data[0])} `+s.data.map((v,i)=>`L${xS(i)},${yS(v)}`).join(' ')+` L${xS(n-1)},${yS(0)} L${xS(0)},${yS(0)} Z`
        return(<g key={si}><path d={area} fill={s.color} fillOpacity="0.08"/><polyline points={pts} fill="none" stroke={s.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeDasharray={si===1?'5 3':undefined}/>{s.data.map((v,i)=><circle key={i} cx={xS(i)} cy={yS(v)} r="3" fill={s.color} stroke={C.white} strokeWidth="1.5"/>)}</g>)
      })}
    </svg>
  )
}

function PatientDetail({patient,onBack,onAck}){
  return(
    <div style={{padding:16}}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:16}}>
        <div>
          <div style={{fontSize:16,fontWeight:600,color:C.gray900}}>{patient.name}</div>
          <div style={{fontSize:12,color:C.gray600,marginTop:2}}>{patient.site} · {patient.age} anos · Sem. {patient.week} de {patient.totalWeeks}</div>
        </div>
        <button onClick={onBack} style={{background:'none',border:'none',cursor:'pointer',fontSize:12,color:C.gray600,display:'flex',alignItems:'center',gap:4}}>← Voltar</button>
      </div>
      {patient.silence&&<div style={{background:C.red50,border:`0.5px solid ${C.red400}`,borderRadius:10,padding:'10px 14px',marginBottom:14,fontSize:12,color:C.red800,display:'flex',gap:8}}>⚠️ Paciente sem registro há <strong>{patient.silenceDays}</strong>. Considere contato ativo.</div>}
      <div style={{background:C.white,border:`0.5px solid ${C.gray100}`,borderRadius:16,padding:16,marginBottom:14}}>
        <div style={{fontSize:11,color:C.gray400,marginBottom:6}}>Tratamento: {patient.tlStart} → {patient.tlEnd} · Seguimento até {patient.tlFollow}</div>
        <div style={{background:C.gray50,borderRadius:4,height:6,position:'relative',marginBottom:4}}>
          <div style={{position:'absolute',left:0,width:`${patient.tlPct}%`,height:'100%',background:C.teal400,borderRadius:'4px 0 0 4px'}}/>
          <div style={{position:'absolute',left:`${patient.tlPct}%`,width:`${patient.tlFollowPct-patient.tlPct}%`,height:'100%',background:C.teal100}}/>
          <div style={{position:'absolute',left:`${patient.tlPct}%`,top:-3,width:2,height:12,background:C.red400,borderRadius:1}}/>
        </div>
        <div style={{display:'flex',justifyContent:'space-between',fontSize:10,color:C.gray400}}><span>{patient.tlStart}</span><span style={{color:C.red400}}>Hoje</span><span>{patient.tlFollow}</span></div>
      </div>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12,marginBottom:14}}>
        {[{title:'Sintomas gerais',chart:patient.charts.symptoms},{title:patient.charts.domain.label,chart:patient.charts.domain}].map(({title,chart},ci)=>(
          <div key={ci} style={{background:C.white,border:`0.5px solid ${C.gray100}`,borderRadius:12,padding:14}}>
            <div style={{fontSize:11,fontWeight:500,color:C.gray600,marginBottom:8}}>{title}</div>
            <MiniChart labels={chart.labels} series={chart.series} height={130}/>
            <div style={{display:'flex',gap:8,flexWrap:'wrap',marginTop:6}}>
              {chart.series.map((s,i)=><span key={i} style={{fontSize:10,color:C.gray400,display:'flex',alignItems:'center',gap:3}}><span style={{width:10,height:10,borderRadius:2,background:s.color,display:'inline-block'}}/>{s.label}</span>)}
            </div>
          </div>
        ))}
      </div>
      <div style={{background:C.white,border:`0.5px solid ${C.gray100}`,borderRadius:16,padding:16}}>
        <div style={{fontSize:12,fontWeight:500,color:C.gray600,marginBottom:10}}>Histórico de alertas</div>
        {patient.alerts.length===0&&<div style={{fontSize:12,color:C.gray400}}>Nenhum alerta registrado.</div>}
        {patient.alerts.map((a,i)=>(
          <div key={i} style={{display:'flex',alignItems:'center',gap:8,padding:'8px 0',borderBottom:i<patient.alerts.length-1?`0.5px solid ${C.gray50}`:'none',fontSize:12}}>
            <span style={{width:8,height:8,borderRadius:'50%',background:a.level==='red'?C.red400:C.amber400,flexShrink:0}}/>
            <span style={{color:C.gray400,minWidth:44}}>{a.date}</span>
            <span style={{flex:1,color:C.gray900}}>{a.desc}</span>
            {a.ack?<span style={{fontSize:11,color:C.gray400}}>✓ Reconhecido</span>:<button onClick={()=>onAck(patient.id,i)} style={{fontSize:11,padding:'3px 10px',borderRadius:20,border:`0.5px solid ${C.gray100}`,background:'transparent',cursor:'pointer',color:C.gray600}}>Reconhecer</button>}
          </div>
        ))}
      </div>
    </div>
  )
}

function Dashboard({patients,onSelect}){
  const urgCount=patients.filter(p=>p.alert==='urgency').length
  const attCount=patients.filter(p=>p.alert==='attention').length
  const silCount=patients.filter(p=>p.silence).length
  const activeCount=patients.filter(p=>p.alert!=='silence').length
  const alertOrder={urgency:0,attention:1,silence:2,normal:3}
  const sorted=[...patients].sort((a,b)=>alertOrder[a.alert]-alertOrder[b.alert])
  return(
    <div style={{padding:16}}>
      <div style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:10,marginBottom:20}}>
        {[{label:'Em tratamento',value:activeCount,sub:'pacientes ativos',color:C.gray900},{label:'Em seguimento',value:3,sub:'até 30 dias pós-RT',color:C.gray900},{label:'Alertas hoje',value:urgCount+attCount,sub:`${urgCount} urgência · ${attCount} atenção`,color:urgCount>0?C.red400:C.amber400},{label:'Silêncio clínico',value:silCount,sub:'sem registro há 2+ dias',color:C.amber600}].map(({label,value,sub,color})=>(
          <div key={label} style={{background:C.gray50,borderRadius:10,padding:'12px 14px'}}>
            <div style={{fontSize:11,color:C.gray400,marginBottom:4}}>{label}</div>
            <div style={{fontSize:22,fontWeight:600,color,lineHeight:1}}>{value}</div>
            <div style={{fontSize:10,color:C.gray400,marginTop:4}}>{sub}</div>
          </div>
        ))}
      </div>
      <div style={{fontSize:13,fontWeight:500,color:C.gray600,marginBottom:10}}>Pacientes — ordenados por gravidade</div>
      <div style={{background:C.white,border:`0.5px solid ${C.gray100}`,borderRadius:16,overflow:'hidden'}}>
        <div style={{display:'grid',gridTemplateColumns:'2fr 70px 70px 90px 60px',padding:'8px 16px',background:C.gray50,borderBottom:`0.5px solid ${C.gray100}`}}>
          {['Paciente','Sítio','Semana','Alerta','Último'].map(h=><div key={h} style={{fontSize:11,color:C.gray400,fontWeight:500}}>{h}</div>)}
        </div>
        {sorted.map((p,i)=>(
          <div key={p.id} onClick={()=>onSelect(p.id)} style={{display:'grid',gridTemplateColumns:'2fr 70px 70px 90px 60px',alignItems:'center',padding:'12px 16px',borderBottom:i<sorted.length-1?`0.5px solid ${C.gray50}`:'none',cursor:'pointer',opacity:p.silence?0.65:1,transition:'background 0.15s'}}
            onMouseEnter={e=>e.currentTarget.style.background=C.gray50}
            onMouseLeave={e=>e.currentTarget.style.background='transparent'}>
            <div><div style={{fontSize:13,fontWeight:500,color:C.gray900}}>{p.name}</div><div style={{fontSize:11,color:C.gray400,marginTop:2}}>{p.site} · {p.age} anos</div></div>
            <div><span style={{fontSize:11,padding:'2px 7px',borderRadius:20,background:C.gray50,color:C.gray600,border:`0.5px solid ${C.gray100}`}}>{p.site}</span></div>
            <div style={{fontSize:13,color:C.gray900}}>Sem. {p.week}</div>
            <div><AlertBadge level={p.alert}/></div>
            <div style={{fontSize:12,color:p.silence?C.amber600:C.gray400}}>{p.lastFill}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function MedicoPage(){
  const router=useRouter()
  const [screen,setScreen]=useState('list')
  const [selectedId,setSelectedId]=useState(null)
  const [patients,setPatients]=useState(PATIENTS)
  const selectedPatient=patients.find(p=>p.id===selectedId)
  const ackAlert=(pid,aidx)=>setPatients(prev=>prev.map(p=>{
    if(p.id!==pid) return p
    return{...p,alerts:p.alerts.map((a,i)=>i===aidx?{...a,ack:true}:a)}
  }))
  return(
    <div style={{fontFamily:"'DM Sans', system-ui, sans-serif",background:C.gray50,minHeight:'100vh'}}>
      <div style={{background:C.white,borderBottom:`0.5px solid ${C.gray100}`,padding:'12px 20px',display:'flex',alignItems:'center',justifyContent:'space-between',position:'sticky',top:0,zIndex:10}}>
        <div style={{display:'flex',alignItems:'center',gap:10}}>
          <button onClick={()=>router.push('/')} style={{background:'none',border:'none',cursor:'pointer',display:'flex',alignItems:'center',gap:8,padding:0}}>
            <svg width="20" height="20" viewBox="0 0 28 28"><circle cx="14" cy="14" r="13" fill={C.teal50} stroke={C.teal100} strokeWidth="1"/><circle cx="14" cy="14" r="5" fill={C.teal400}/></svg>
            <span style={{fontSize:15,fontWeight:600,color:C.gray900,letterSpacing:'-0.3px'}}>Gradus</span>
          </button>
          <span style={{fontSize:11,color:C.gray400}}>/ HCI Ijuí</span>
        </div>
        <div style={{display:'flex',alignItems:'center',gap:8}}>
          <div style={{width:26,height:26,borderRadius:'50%',background:C.teal50,display:'flex',alignItems:'center',justifyContent:'center',fontSize:10,fontWeight:500,color:C.teal800}}>TL</div>
          <span style={{fontSize:12,color:C.gray600}}>Dr. Tadeu Ludwig</span>
        </div>
      </div>
      {screen==='list'
        ?<Dashboard patients={patients} onSelect={id=>{setSelectedId(id);setScreen('detail')}}/>
        :<PatientDetail patient={selectedPatient} onBack={()=>setScreen('list')} onAck={ackAlert}/>
      }
    </div>
  )
}
