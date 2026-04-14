import { styles, SB } from "../components/Shared";
import { CHANNELS } from "../data";

const { crd, h2, h3, sub, tag, _f } = styles;

export default function ContentPage({ content, sC }) {
  const toggleActivation = (cId, channel) => {
    sC(p => p.map(c => {
      if (c.id !== cId) return c;
      const act = c.activated.includes(channel) ? c.activated.filter(x => x !== channel) : [...c.activated, channel];
      return {...c, activated: act};
    }));
  };

  return <>
    <h2 style={h2}>Content & Activation</h2>
    <p style={sub}>Track all content and where it's been activated across channels. Click links to view live content.</p>

    {/* Stats */}
    <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8,marginBottom:14}}>
      {[{s:"live",l:"Live",c:"#4caf50"},{s:"in-progress",l:"In Progress",c:"#c9956b"},{s:"needed",l:"Needed",c:"#e53935"}].map(st => (
        <div key={st.s} style={{...crd,textAlign:"center",padding:12,marginBottom:0,borderLeft:`3px solid ${st.c}`}}>
          <div style={{fontSize:20,fontWeight:700,color:st.c,fontFamily:_f}}>{content.filter(c=>c.status===st.s).length}</div>
          <div style={{fontSize:8,color:"#888",textTransform:"uppercase",letterSpacing:1,fontFamily:_f}}>{st.l}</div>
        </div>
      ))}
    </div>

    {["live","in-progress","needed"].map(status => (
      <div key={status}>
        <h3 style={{...h3,marginTop:14}}>
          {status === "in-progress" ? "In Progress" : status.charAt(0).toUpperCase() + status.slice(1)} ({content.filter(c => c.status === status).length})
        </h3>
        {content.filter(c => c.status === status).map(c => (
          <div key={c.id} style={crd}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:8}}>
              <div>
                <div style={{fontSize:13,fontWeight:600,color:"#1a1a1a",fontFamily:_f}}>
                  {c.url ? (
                    <a href={c.url} target="_blank" rel="noopener noreferrer" style={{color:"#1a1a1a",textDecoration:"none",borderBottom:"1px dashed #c9956b"}}>
                      {c.title} ↗
                    </a>
                  ) : c.title}
                </div>
                <div style={{fontSize:10,color:"#888",fontFamily:_f,marginTop:2}}>{c.type} · {c.ind} · {c.ch}</div>
              </div>
              <SB s={c.status}/>
            </div>

            <h4 style={{...h3,margin:"0 0 6px",fontSize:9}}>Activation — click to toggle channels</h4>
            <div style={{display:"flex",flexWrap:"wrap",gap:4}}>
              {CHANNELS.map(ch => {
                const active = c.activated.includes(ch);
                return (
                  <button key={ch} onClick={() => toggleActivation(c.id, ch)} style={{
                    fontSize:9,padding:"3px 10px",borderRadius:10,
                    border:`1px solid ${active?"#4caf50":"rgba(0,0,0,0.08)"}`,
                    background:active?"rgba(76,175,80,0.1)":"rgba(0,0,0,0.02)",
                    color:active?"#2d7a2d":"#888",cursor:"pointer",fontFamily:_f,fontWeight:active?600:400
                  }}>
                    {active ? "✓ " : ""}{ch}
                  </button>
                );
              })}
            </div>

            {c.activated.length > 0 && (
              <div style={{fontSize:10,color:"#4caf50",fontFamily:_f,marginTop:6}}>
                Activated on {c.activated.length}/{CHANNELS.length} channels
              </div>
            )}
            {c.activated.length === 0 && c.status === "live" && (
              <div style={{fontSize:10,color:"#e53935",fontFamily:_f,marginTop:6}}>
                ⚠ Not yet activated beyond original channel
              </div>
            )}
          </div>
        ))}
      </div>
    ))}
  </>;
}
