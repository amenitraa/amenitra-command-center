import { styles, HD, SB } from "../components/Shared";
const { crd, h2, h3, sub, tag, _f } = styles;

export default function Accounts({ accs, setPg, sSA }) {
  return <>
    <h2 style={h2}>Accounts Hub</h2>
    <p style={sub}>Click any account for full strategic intelligence</p>
    {["Financial Services","Life Sciences"].map(ind => (
      <div key={ind}>
        <h3 style={{...h3,marginTop:14}}>{ind}</h3>
        {accs.filter(a => a.ind === ind).map(a => (
          <div key={a.id} onClick={() => {sSA(a.id); setPg("acc-detail")}} style={{...crd,cursor:"pointer",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <div>
              <div style={{display:"flex",alignItems:"center",gap:6}}>
                <HD h={a.hp}/>
                <span style={{fontSize:14,fontWeight:600,color:"#1a1a1a",fontFamily:_f}}>{a.name}</span>
                <SB s={a.st}/>
              </div>
              <div style={{fontSize:11,color:"#888",fontFamily:_f,marginTop:3}}>{a.rev} · Last: {a.lt}</div>
              <div style={{marginTop:5}}>
                {a.channels?.slice(0,4).map(c => <span key={c} style={tag}>{c}</span>)}
                {a.channels?.length > 4 && <span style={tag}>+{a.channels.length-4}</span>}
              </div>
            </div>
            <span style={{color:"#888"}}>›</span>
          </div>
        ))}
      </div>
    ))}
  </>;
}
