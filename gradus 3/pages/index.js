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

      {/* Referências científicas */}
      <div style={{ padding:'60px 24px', background: C.white }}>
        <div style={{ maxWidth:1100, margin:'0 auto' }}>
          <div style={{ fontSize:11, fontWeight:600, color:C.teal600, letterSpacing:'0.1em', marginBottom:16, textAlign:'center' }}>EVIDÊNCIA CIENTÍFICA</div>
          <h2 style={{ fontSize:'clamp(22px, 3vw, 32px)', fontWeight:700, color:C.gray900, letterSpacing:'-0.5px', marginBottom:8, textAlign:'center' }}>
            PROs em oncologia e radioterapia
          </h2>
          <p style={{ fontSize:14, color:C.gray600, textAlign:'center', maxWidth:600, margin:'0 auto 40px', lineHeight:1.7 }}>
            O Gradus é fundamentado em uma base robusta de evidências que sustenta o uso de instrumentos PRO no cuidado oncológico.
          </p>

          <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
            {[
              {
                badge:'NEJM · 2016',
                authors:'Basch E et al.',
                title:'Symptom Monitoring with Patient-Reported Outcomes During Routine Cancer Treatment.',
                journal:'N Engl J Med. 2016;374(9):809-820.',
                doi:'10.1056/NEJMoa1510364',
                destaque:'Ensaio clínico randomizado demonstrando melhora significativa na qualidade de vida e redução de visitas à emergência com monitoramento eletrônico de PROs durante quimioterapia.',
                cor: C.teal400, bg: C.teal50,
              },
              {
                badge:'JAMA · 2017',
                authors:'Basch E et al.',
                title:'Overall Survival Results of a Trial Assessing Patient-Reported Outcomes for Symptom Monitoring During Routine Cancer Treatment.',
                journal:'JAMA. 2017;318(2):197-198.',
                doi:'10.1001/jama.2017.7156',
                destaque:'Seguimento de 7 anos demonstrou ganho de 5 meses em sobrevida global no grupo com monitoramento por PROs (31,2 vs. 26,0 meses; p=0,03).',
                cor: C.blue400, bg: C.blue50,
              },
              {
                badge:'J Natl Cancer Inst · 2014',
                authors:'Basch E, Reeve BB, Mitchell SA et al.',
                title:'Development of the National Cancer Institute\'s Patient-Reported Outcomes Version of the Common Terminology Criteria for Adverse Events (PRO-CTCAE).',
                journal:'J Natl Cancer Inst. 2014;106(9):dju244.',
                doi:'10.1093/jnci/dju244',
                destaque:'Artigo seminal que descreve o desenvolvimento e validação do PRO-CTCAE — instrumento central utilizado no Gradus para graduação de toxicidade relatada pelo paciente.',
                cor: C.purple400, bg: C.purple50,
              },
              {
                badge:'Radiother Oncol · 2025',
                authors:'Voong KR, Li S, Hu C et al.',
                title:'Routine Review of Patient-Reported Outcome Data Influences Radiotherapy Care: IMPROVE Study Results.',
                journal:'Radiother Oncol. 2025;203:110688.',
                doi:'10.1016/j.radonc.2024.110688',
                destaque:'Ensaio multicêntrico prospectivo demonstrando que a revisão rotineira de PROMs durante a radioterapia alterou a avaliação de toxicidade em 75% e o manejo clínico em 50% dos pacientes.',
                cor: C.coral400, bg: C.coral50,
              },
              {
                badge:'Front Oncol · 2022',
                authors:'Laughlin BS et al.',
                title:'Patient-Reported Outcomes for Patients with Breast Cancer Undergoing Radiotherapy: A Single-Center Registry Experience.',
                journal:'Front Oncol. 2022;12:920739.',
                doi:'10.3389/fonc.2022.920739',
                destaque:'Uma das primeiras experiências clínicas utilizando múltiplos itens do PRO-CTCAE em pacientes com câncer de mama em radioterapia, com análise por esquema de fracionamento.',
                cor: C.amber400, bg: C.amber50,
              },
              {
                badge:'N Engl J Med · 2008',
                authors:'Sanda MG, Dunn RL, Michalski J et al.',
                title:'Quality of Life and Satisfaction with Outcome among Prostate-Cancer Survivors.',
                journal:'N Engl J Med. 2008;358(12):1250-1261.',
                doi:'10.1056/NEJMoa074311',
                destaque:'Validação do EPIC-26 como instrumento de referência para avaliação de qualidade de vida em câncer de próstata — base do módulo prostático do Gradus.',
                cor: C.gray400, bg: C.gray50,
              },
            ].map((ref, i) => (
              <div key={i} style={{ background:ref.bg, border:`0.5px solid ${ref.cor}22`, borderLeft:`3px solid ${ref.cor}`, borderRadius:10, padding:'16px 18px' }}>
                <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', gap:12, flexWrap:'wrap' }}>
                  <div style={{ flex:1 }}>
                    <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:6, flexWrap:'wrap' }}>
                      <span style={{ fontSize:10, fontWeight:700, padding:'2px 8px', borderRadius:20, background:ref.cor, color:C.white, letterSpacing:'0.04em' }}>{ref.badge}</span>
                      <span style={{ fontSize:12, fontWeight:600, color:C.gray700 }}>{ref.authors}</span>
                    </div>
                    <div style={{ fontSize:13, fontWeight:500, color:C.gray900, marginBottom:4, lineHeight:1.5 }}>{ref.title}</div>
                    <div style={{ fontSize:11, color:C.gray600, marginBottom:8 }}>{ref.journal}</div>
                    <div style={{ fontSize:12, color:C.gray700, lineHeight:1.6, background:`${ref.cor}11`, borderRadius:6, padding:'8px 10px' }}>
                      {ref.destaque}
                    </div>
                  </div>
                </div>
                <div style={{ marginTop:10 }}>
                  <a href={`https://doi.org/${ref.doi}`} target="_blank" rel="noopener noreferrer"
                    style={{ fontSize:11, color:ref.cor, textDecoration:'none', fontWeight:500, fontFamily:'monospace' }}>
                    DOI: {ref.doi} ↗
                  </a>
                </div>
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
          Protótipo demonstrativo · SBRT 2026 · HCI Ijuí
        </p>
      </div>
    </div>
  )
}
