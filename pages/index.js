import { useState } from 'react'
import { useRouter } from 'next/router'

const C = {
  teal600:'#0F6E56', teal400:'#1D9E75', teal100:'#9FE1CB', teal50:'#E1F5EE',
  gray900:'#2C2C2A', gray600:'#5F5E5A', gray400:'#888780', gray100:'#D3D1C7', gray50:'#F1EFE8',
  white:'#ffffff', amber50:'#FAEEDA', amber400:'#EF9F27', amber800:'#633806',
}

export default function Landing() {
  const router = useRouter()
  const [hoveredCard, setHoveredCard] = useState(null)

  return (
    <div style={{ minHeight:'100vh', background: C.white, fontFamily:"'DM Sans', system-ui, sans-serif" }}>

      {/* Hero */}
      <div style={{
        background: `linear-gradient(135deg, ${C.teal600} 0%, ${C.teal400} 100%)`,
        padding: '0 24px',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}>
        {/* Nav */}
        <nav style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'20px 0', maxWidth:1100, margin:'0 auto', width:'100%' }}>
          <div style={{ display:'flex', alignItems:'center', gap:10 }}>
            <svg width="28" height="28" viewBox="0 0 28 28">
              <circle cx="14" cy="14" r="13" fill="rgba(255,255,255,0.2)" stroke="rgba(255,255,255,0.4)" strokeWidth="1"/>
              <circle cx="14" cy="14" r="6" fill={C.white}/>
              <circle cx="14" cy="14" r="3" fill={C.teal400}/>
            </svg>
            <span style={{ fontSize:20, fontWeight:700, color:C.white, letterSpacing:'-0.5px' }}>Gradus</span>
          </div>
          <div style={{ display:'flex', gap:8 }}>
            <button onClick={() => router.push('/paciente')} style={{ padding:'8px 16px', borderRadius:20, border:'1.5px solid rgba(255,255,255,0.4)', background:'transparent', color:C.white, fontSize:13, fontWeight:500, cursor:'pointer' }}>
              Sou paciente
            </button>
            <button onClick={() => router.push('/medico')} style={{ padding:'8px 16px', borderRadius:20, border:'none', background:C.white, color:C.teal600, fontSize:13, fontWeight:600, cursor:'pointer' }}>
              Sou médico
            </button>
          </div>
        </nav>

        {/* Hero content */}
        <div style={{ flex:1, display:'flex', alignItems:'center', justifyContent:'center', maxWidth:1100, margin:'0 auto', width:'100%', padding:'60px 0' }}>
          <div style={{ maxWidth:620 }}>
            <div style={{ display:'inline-block', background:'rgba(255,255,255,0.15)', borderRadius:20, padding:'5px 14px', fontSize:12, color:C.white, fontWeight:500, marginBottom:24, letterSpacing:'0.06em' }}>
              SBRT 2026 · Protótipo funcional
            </div>
            <h1 style={{ fontSize:'clamp(36px, 6vw, 62px)', fontWeight:700, color:C.white, lineHeight:1.1, letterSpacing:'-1.5px', marginBottom:24 }}>
              O paciente<br/>não some entre<br/>as sessões.
            </h1>
            <p style={{ fontSize:'clamp(15px, 2vw, 18px)', color:'rgba(255,255,255,0.82)', lineHeight:1.7, marginBottom:40, maxWidth:480 }}>
              Gradus monitora sintomas de pacientes em radioterapia diariamente, com alertas clínicos baseados em instrumentos PRO validados — PRO-CTCAE, EPIC-26 e EORTC.
            </p>
            <div style={{ display:'flex', gap:12, flexWrap:'wrap' }}>
              <button onClick={() => router.push('/paciente')} style={{ padding:'14px 28px', borderRadius:12, border:'none', background:C.white, color:C.teal600, fontSize:15, fontWeight:600, cursor:'pointer', boxShadow:'0 4px 20px rgba(0,0,0,0.15)' }}>
                Ver como paciente →
              </button>
              <button onClick={() => router.push('/medico')} style={{ padding:'14px 28px', borderRadius:12, border:'1.5px solid rgba(255,255,255,0.5)', background:'transparent', color:C.white, fontSize:15, fontWeight:500, cursor:'pointer' }}>
                Ver como médico
              </button>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{ display:'flex', justifyContent:'center', paddingBottom:32 }}>
          <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:6, color:'rgba(255,255,255,0.5)', fontSize:11 }}>
            <span>saiba mais</span>
            <div style={{ width:1, height:32, background:'rgba(255,255,255,0.3)' }}/>
          </div>
        </div>
      </div>

      {/* Features */}
      <div style={{ padding:'80px 24px', maxWidth:1100, margin:'0 auto' }}>
        <div style={{ textAlign:'center', marginBottom:60 }}>
          <h2 style={{ fontSize:'clamp(26px, 4vw, 38px)', fontWeight:700, color:C.gray900, letterSpacing:'-0.8px', marginBottom:12 }}>
            O que o Gradus faz
          </h2>
          <p style={{ fontSize:16, color:C.gray600, maxWidth:480, margin:'0 auto', lineHeight:1.7 }}>
            Uma plataforma pensada para a realidade dos serviços de radioterapia nacionais.
          </p>
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(260px, 1fr))', gap:20 }}>
          {[
            { icon:'📋', title:'Formulário diário', desc:'O paciente registra sintomas em 5 etapas visuais, com ícones, escalas graduadas e emojis — acessível para qualquer nível de literacia digital.' },
            { icon:'⚠️', title:'Alertas automáticos', desc:'Quando sintomas atingem limiares baseados no CTCAE v5.0, o sistema notifica a equipe — urgência, atenção ou observação.' },
            { icon:'📊', title:'Dashboard médico', desc:'Evolução longitudinal por domínio sintomático, identificação de silêncio clínico e reconhecimento de alertas em tempo real.' },
            { icon:'📅', title:'Calendário de frações', desc:'Visualização completa das sessões de radioterapia — realizadas, agendadas e a realizar.' },
            { icon:'📋', title:'Ficha clínica', desc:'Diagnóstico, estadiamento, técnica, dose e equipe acessíveis para o paciente a qualquer momento.' },
            { icon:'💡', title:'Orientações contextuais', desc:'Dicas e alertas práticos ajustados automaticamente à semana do tratamento e ao sítio tumoral.' },
          ].map((f, i) => (
            <div key={i}
              onMouseEnter={() => setHoveredCard(i)}
              onMouseLeave={() => setHoveredCard(null)}
              style={{ background: hoveredCard===i ? C.teal50 : C.gray50, border:`1px solid ${hoveredCard===i ? C.teal100 : C.gray100}`, borderRadius:16, padding:'24px', transition:'all 0.2s', cursor:'default' }}>
              <div style={{ fontSize:28, marginBottom:12 }}>{f.icon}</div>
              <div style={{ fontSize:15, fontWeight:600, color:C.gray900, marginBottom:8 }}>{f.title}</div>
              <div style={{ fontSize:13, color:C.gray600, lineHeight:1.7 }}>{f.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Instrumentos */}
      <div style={{ background:C.gray50, padding:'60px 24px' }}>
        <div style={{ maxWidth:1100, margin:'0 auto', textAlign:'center' }}>
          <div style={{ fontSize:11, fontWeight:600, color:C.teal600, letterSpacing:'0.1em', marginBottom:16 }}>FUNDAMENTAÇÃO CIENTÍFICA</div>
          <h2 style={{ fontSize:'clamp(22px, 3vw, 32px)', fontWeight:700, color:C.gray900, letterSpacing:'-0.5px', marginBottom:40 }}>
            Baseado em instrumentos validados em português brasileiro
          </h2>
          <div style={{ display:'flex', flexWrap:'wrap', justifyContent:'center', gap:12 }}>
            {['PRO-CTCAE v1.0','EORTC QLQ-BR45','EORTC QLQ-C30','EPIC-26','IPSS','CTCAE v5.0'].map(inst => (
              <div key={inst} style={{ background:C.white, border:`1px solid ${C.gray100}`, borderRadius:10, padding:'10px 20px', fontSize:13, fontWeight:600, color:C.gray700 }}>
                {inst}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div style={{ padding:'80px 24px', textAlign:'center' }}>
        <div style={{ maxWidth:520, margin:'0 auto' }}>
          <h2 style={{ fontSize:'clamp(24px, 4vw, 36px)', fontWeight:700, color:C.gray900, letterSpacing:'-0.8px', marginBottom:16 }}>
            Explore o protótipo
          </h2>
          <p style={{ fontSize:15, color:C.gray600, lineHeight:1.7, marginBottom:36 }}>
            Acesse a demonstração como paciente ou como médico e explore todas as funcionalidades desenvolvidas para o congresso da SBRT 2026.
          </p>
          <div style={{ display:'flex', gap:12, justifyContent:'center', flexWrap:'wrap' }}>
            <button onClick={() => router.push('/paciente')} style={{ padding:'14px 32px', borderRadius:12, border:'none', background:C.teal600, color:C.white, fontSize:15, fontWeight:600, cursor:'pointer' }}>
              🙋 Entrar como paciente
            </button>
            <button onClick={() => router.push('/medico')} style={{ padding:'14px 32px', borderRadius:12, border:`1.5px solid ${C.gray200}`, background:'transparent', color:C.gray700, fontSize:15, fontWeight:500, cursor:'pointer' }}>
              👨‍⚕️ Entrar como médico
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{ borderTop:`1px solid ${C.gray100}`, padding:'24px', textAlign:'center' }}>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:8, marginBottom:8 }}>
          <svg width="16" height="16" viewBox="0 0 28 28">
            <circle cx="14" cy="14" r="13" fill={C.teal50} stroke={C.teal100} strokeWidth="1"/>
            <circle cx="14" cy="14" r="5" fill={C.teal400}/>
          </svg>
          <span style={{ fontSize:14, fontWeight:600, color:C.gray900 }}>Gradus</span>
        </div>
        <p style={{ fontSize:12, color:C.gray400 }}>
          Protótipo demonstrativo · SBRT 2026 · Hospital de Caridade de Ijuí
        </p>
      </div>
    </div>
  )
}
