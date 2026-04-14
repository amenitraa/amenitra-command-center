import { useState } from "react";
import { styles, HD, SB, PB, EditableList, aiBtn } from "../components/Shared";
import { callAI, PROMPTS } from "../ai";
import { CHANNELS } from "../data";

const { crd, btn, btnS, inp, h3, tag, dk, dkH, dkT, _f } = styles;

export default function AccountDetail({ accs, sA, tasks, lnch, setPg, selAcc }) {
  const a = accs.find(x => x.id === selAcc);
  const [aiLoading, setAiLoading] = useState({});
  const [aiResults, setAiResults] = useState({});
  const [editMode, setEditMode] = useState(false);

  if (!a) return <p style={{fontFamily:_f}}>Account not found</p>;

  const accLaunches = lnch.filter(l => l.acc === a.name);
  const accTasks = tasks.filter(t => t.acc === a.name && t.status !== "Complete");

  const updateField = (field, value) => {
    sA(p => p.map(x => x.id === a.id ? {...x, [field]: value} : x));
  };

  const genIntel = async () => {
    setAiLoading(p => ({...p, intel: true}));
    const { system, user } = PROMPTS.accountIntel(a);
    const r = await callAI(system, user);
    setAiResults(p => ({...p, intel: r}));
    setAiLoading(p => ({...p, intel: false}));
  };

  const genNews = async () => {
    setAiLoading(p => ({...p, news: true}));
    const { system, user } = PROMPTS.accountNews(a);
    const r = await callAI(system, user);
    updateField("newsLastRefresh", new Date().toISOString());
    setAiResults(p => ({...p, news: r}));
    setAiLoading(p => ({...p, news: false}));
  };

  return <>
    <button onClick={() => setPg("accounts")} style={{...btnS,marginBottom:12}}>← Back</button>

    {/* Header */}
    <div style={{...dk,display:"flex",justifyContent:"space-between",alignItems:"center",padding:20,flexWrap:"wrap",gap:10}}>
      <div style={{display:"flex",alignItems:"center",gap:14}}>
        <div style={{width:44,height:44,borderRadius:12,background:"rgba(255,255,255,0.1)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,fontWeight:700,color:"#fff",fontFamily:_f}}>{a.ini}</div>
        <div>
          <div style={{display:"flex",alignItems:"center",gap:8}}>
            <span style={{fontSize:20,fontWeight:600,color:"#fff",fontFamily:_f}}>{a.name}</span>
            <SB s={a.st}/>
          </div>
          <div style={{fontSize:11,color:"rgba(255,255,255,0.5)",fontFamily:_f}}>{a.ind} · {a.rev}</div>
        </div>
      </div>
      <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
        {aiBtn("Refresh Intel", aiLoading.intel, genIntel)}
        {aiBtn("Get News", aiLoading.news, genNews)}
        <button onClick={() => setEditMode(p => !p)} style={{...btnS,background:"rgba(255,255,255,0.1)",color:"#fff",border:"1px solid rgba(255,255,255,0.2)"}}>
          {editMode ? "✓ Done Editing" : "✎ Edit All Fields"}
        </button>
      </div>
    </div>

    {/* Market Position */}
    <div style={dk}>
      <h4 style={dkH}>✦ Market Position</h4>
      {editMode ?
        <textarea value={a.mp} onChange={e => updateField("mp", e.target.value)} style={{...inp,background:"rgba(255,255,255,0.05)",color:"#fff",border:"1px solid rgba(255,255,255,0.1)",minHeight:80,resize:"vertical"}}/>
        : <p style={dkT}>{a.mp}</p>
      }
    </div>

    {/* Signals + Pain Hierarchy */}
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
      <div style={dk}>
        <h4 style={{...dkH,color:"#daa520"}}>⚡ Current Signals</h4>
        {editMode ?
          <EditableList items={a.signals||[]} onChange={v => updateField("signals",v)} label="" placeholder="Add signal..."/>
          : (a.signals||[]).map((s,i) => (
            <div key={i} style={{display:"flex",gap:8,padding:"5px 0",borderBottom:"1px solid rgba(255,255,255,0.05)"}}>
              <span style={{color:"#daa520",fontSize:10}}>●</span><span style={dkT}>{s}</span>
            </div>
          ))
        }
      </div>
      <div style={dk}>
        <h4 style={{...dkH,color:"#e53935"}}>🔴 Pain Hierarchy</h4>
        {editMode ?
          <EditableList items={a.pains||[]} onChange={v => updateField("pains",v)} label="" placeholder="Add pain point..."/>
          : (a.pains||[]).map((p,i) => (
            <div key={i} style={{display:"flex",gap:8,padding:"6px 0",borderBottom:"1px solid rgba(255,255,255,0.05)"}}>
              <span style={{background:"rgba(229,57,53,0.15)",color:"#e53935",fontSize:10,fontWeight:700,padding:"2px 8px",borderRadius:8,flexShrink:0}}>#{i+1}</span>
              <span style={dkT}>{p}</span>
            </div>
          ))
        }
      </div>
    </div>

    {/* Real-Time News */}
    {aiResults.news && (
      <div style={{...dk,background:"#0a1628"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
          <h4 style={{...dkH,color:"#4caf50",margin:0}}>📰 Real-Time Account News</h4>
          <span style={{fontSize:9,color:"rgba(255,255,255,0.4)",fontFamily:_f}}>Refreshed: {a.newsLastRefresh ? new Date(a.newsLastRefresh).toLocaleString() : "Just now"}</span>
        </div>
        <div style={{...dkT,whiteSpace:"pre-wrap"}}>{aiResults.news}</div>
      </div>
    )}

    {/* Goals + Target Audience (editable) */}
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
      <div style={crd}>
        <h3 style={h3}>Business Goals</h3>
        {editMode ?
          <EditableList items={a.goals||[]} onChange={v => updateField("goals",v)} label="" placeholder="Add goal..."/>
          : (a.goals||[]).map((g,i) => <div key={i} style={{fontSize:12,color:"#1a1a1a",fontFamily:_f,padding:"3px 0"}}>✓ {g}</div>)
        }
      </div>
      <div style={crd}>
        <h3 style={h3}>Target Audience</h3>
        {editMode ?
          <EditableList items={a.audience||[]} onChange={v => updateField("audience",v)} label="" placeholder="Add audience..."/>
          : (a.audience||[]).map((t,i) => <div key={i} style={{fontSize:12,color:"#1a1a1a",fontFamily:_f,padding:"3px 0"}}>• {t}</div>)
        }
      </div>
    </div>

    {/* Services + Tactics (editable) */}
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
      <div style={crd}>
        <h3 style={h3}>Services</h3>
        {editMode ?
          <EditableList items={a.services||[]} onChange={v => updateField("services",v)} label="" placeholder="Add service..."/>
          : (a.services||[]).map((s,i) => <div key={i} style={{fontSize:12,color:"#1a1a1a",fontFamily:_f,padding:"3px 0"}}>• {s}</div>)
        }
      </div>
      <div style={crd}>
        <h3 style={h3}>Tactics</h3>
        {editMode ?
          <EditableList items={a.tactics||[]} onChange={v => updateField("tactics",v)} label="" placeholder="Add tactic..."/>
          : (a.tactics||[]).map((t,i) => <div key={i} style={{fontSize:12,color:"#1a1a1a",fontFamily:_f,padding:"3px 0"}}>• {t}</div>)
        }
      </div>
    </div>

    {/* Stakeholders + Channels (editable) */}
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
      <div style={crd}>
        <h3 style={h3}>Key Stakeholders</h3>
        {editMode ?
          <EditableList items={a.smes||[]} onChange={v => updateField("smes",v)} label="" placeholder="Add stakeholder..."/>
          : (a.smes||[]).map((s,i) => <span key={i} style={{...tag,padding:"4px 10px"}}>{s}</span>)
        }
      </div>
      <div style={crd}>
        <h3 style={h3}>Active Channels</h3>
        {editMode ?
          <EditableList items={a.channels||[]} onChange={v => updateField("channels",v)} label="" placeholder="Add channel..."/>
          : (a.channels||[]).map((c,i) => <span key={i} style={{...tag,padding:"4px 10px"}}>{c}</span>)
        }
      </div>
    </div>

    {/* Active Launches */}
    {accLaunches.length > 0 && (
      <div style={crd}>
        <h3 style={h3}>Active Launches</h3>
        {accLaunches.map(l => (
          <div key={l.id} style={{display:"flex",justifyContent:"space-between",padding:"5px 0",borderBottom:"1px solid rgba(0,0,0,0.04)"}}>
            <div>
              <div style={{fontSize:12,fontWeight:600,color:"#1a1a1a",fontFamily:_f}}>{l.name}</div>
              <div style={{fontSize:10,color:"#888",fontFamily:_f}}>{l.ch} · {l.dt}</div>
            </div>
            <SB s={l.st}/>
          </div>
        ))}
      </div>
    )}

    {/* Reminders to Bring Up Next Meeting */}
    <div style={crd}>
      <h3 style={h3}>💡 Reminders to Bring Up Next Meeting</h3>
      <EditableList
        items={a.reminders || []}
        onChange={v => updateField("reminders", v)}
        label=""
        placeholder="Add a reminder — from Teams, Outlook, or things on your mind..."
      />
    </div>

    {/* Strategy + Notes (always editable) */}
    <div style={crd}>
      <h3 style={h3}>Account Strategy</h3>
      <textarea value={a.strat||""} onChange={e => updateField("strat", e.target.value)} placeholder="Your crack-the-account strategy..." style={{...inp,minHeight:80,resize:"vertical"}}/>
    </div>
    <div style={crd}>
      <h3 style={h3}>Notes & Intel</h3>
      <textarea value={a.notes||""} onChange={e => updateField("notes", e.target.value)} placeholder="Meeting notes, stakeholder intel..." style={{...inp,minHeight:80,resize:"vertical"}}/>
    </div>

    {/* AI Strategic Intelligence */}
    {aiResults.intel && (
      <div style={{...dk,background:"#0a1628"}}>
        <h4 style={dkH}>✦ AI Strategic Intelligence</h4>
        <div style={{...dkT,whiteSpace:"pre-wrap"}}>{aiResults.intel}</div>
      </div>
    )}
  </>;
}
