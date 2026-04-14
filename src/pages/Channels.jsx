import { useState } from "react";
import { styles, SB, aiBtn } from "../components/Shared";
import { callAI, PROMPTS } from "../ai";
import { CHANNEL_STRATEGIES } from "../data";

const { crd, h2, h3, sub, tag, _f } = styles;

export default function Channels({ accs, lnch }) {
  const [expanded, setExp] = useState(null);
  const [aiLoading, setAL] = useState({});
  const [aiResults, setAR] = useState({});

  const genRecs = async (ch) => {
    setAL(p => ({...p,[ch]:true}));
    const d = CHANNEL_STRATEGIES[ch];
    const chA = accs.filter(a => a.channels?.includes(ch));
    const chL = lnch.filter(l => l.ch === ch);
    const { system, user } = PROMPTS.channelRecs(ch, chA, chL);
    const r = await callAI(system, user);
    setAR(p => ({...p,[ch]:r}));
    setAL(p => ({...p,[ch]:false}));
  };

  return <>
    <h2 style={h2}>Channel Command</h2>
    <p style={sub}>Strategy, optimizations, news, and account plays — click to expand</p>
    {Object.entries(CHANNEL_STRATEGIES).map(([ch, d]) => {
      const chA = accs.filter(a => a.channels?.includes(ch));
      const chL = lnch.filter(l => l.ch === ch);
      const ex = expanded === ch;
      return (
        <div key={ch} style={{...crd,padding:0,overflow:"hidden"}}>
          <div onClick={() => setExp(ex?null:ch)} style={{padding:"14px 18px",cursor:"pointer",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <div style={{display:"flex",alignItems:"center",gap:10}}>
              <span style={{fontSize:20}}>{d.e}</span>
              <div>
                <div style={{fontSize:14,fontWeight:600,color:"#1a1a1a",fontFamily:_f}}>{ch}</div>
                <div style={{fontSize:11,color:"#888",fontFamily:_f}}>{chL.length} campaigns · {chA.length} accounts</div>
              </div>
            </div>
            <div style={{display:"flex",alignItems:"center",gap:6}}>
              {chA.slice(0,3).map(a => <span key={a.id} style={{...tag,margin:0}}>{a.name.split(" ")[0]}</span>)}
              <span style={{transform:ex?"rotate(90deg)":"",transition:"transform 0.2s",color:"#888"}}>›</span>
            </div>
          </div>
          {ex && (
            <div style={{padding:"0 18px 18px"}}>
              <div style={{background:"rgba(0,0,0,0.02)",borderRadius:12,padding:14,marginBottom:10}}>
                <h4 style={{...h3,margin:"0 0 6px",color:"#c9956b"}}>Strategy</h4>
                <p style={{fontSize:12,color:"#1a1a1a",fontFamily:_f,lineHeight:1.6,margin:0}}>{d.s}</p>
              </div>
              <div style={{marginBottom:10,display:"flex",gap:8,alignItems:"center"}}>
                {aiBtn("Fresh AI Recs",aiLoading[ch],() => genRecs(ch))}
              </div>
              {aiResults[ch] && (
                <div style={{background:"linear-gradient(135deg,rgba(201,149,107,0.06),rgba(212,120,158,0.04))",borderRadius:12,padding:14,marginBottom:10,fontSize:12,color:"#1a1a1a",fontFamily:_f,lineHeight:1.7,whiteSpace:"pre-wrap",border:"1px solid rgba(201,149,107,0.12)"}}>
                  <h4 style={{...h3,margin:"0 0 8px",color:"#d4789e"}}>AI Recs</h4>{aiResults[ch]}
                </div>
              )}
              <h4 style={{...h3,margin:"0 0 8px"}}>Optimizations</h4>
              {d.opts.map((o,i) => <div key={i} style={{display:"flex",gap:8,padding:"4px 0",borderBottom:"1px solid rgba(0,0,0,0.03)"}}><span style={{color:"#c9956b",fontSize:10,fontWeight:700}}>→</span><span style={{fontSize:11,color:"#1a1a1a",fontFamily:_f,lineHeight:1.5}}>{o}</span></div>)}
              <h4 style={{...h3,margin:"12px 0 8px",color:"#1565c0"}}>📰 News</h4>
              {d.news.map((n,i) => <div key={i} style={{display:"flex",gap:8,padding:"4px 0",borderBottom:"1px solid rgba(0,0,0,0.03)"}}><span style={{color:"#1565c0",fontSize:10}}>●</span><span style={{fontSize:11,color:"#1a1a1a",fontFamily:_f,lineHeight:1.5}}>{n}</span></div>)}
              <h4 style={{...h3,margin:"12px 0 8px",color:"#d4789e"}}>Account Plays</h4>
              {d.plays.map((p,i) => <div key={i} style={{fontSize:11,color:"#1a1a1a",fontFamily:_f,lineHeight:1.5,padding:"4px 0",borderBottom:"1px solid rgba(0,0,0,0.03)"}}>{p}</div>)}
              {chL.length>0 && <>
                <h4 style={{...h3,margin:"12px 0 8px"}}>Active Campaigns</h4>
                {chL.map(l => <div key={l.id} style={{display:"flex",justifyContent:"space-between",padding:"4px 0"}}><div><span style={{fontSize:12,fontWeight:600,color:"#1a1a1a",fontFamily:_f}}>{l.name}</span><span style={{fontSize:10,color:"#888",fontFamily:_f,marginLeft:8}}>{l.acc}</span></div><SB s={l.st}/></div>)}
              </>}
            </div>
          )}
        </div>
      );
    })}
  </>;
}
