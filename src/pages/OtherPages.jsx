// This file exports all remaining page components

import { useState } from "react";
import { styles, SB, GoalRing, Modal, FormField, aiBtn } from "../components/Shared";
import { callAI, PROMPTS } from "../ai";

const { crd, btn, btnS, inp, h2, h3, sub, tag, _f } = styles;

// ═══ LAUNCHES ═══
export function Launches({ lnch }) {
  return <>
    <h2 style={h2}>Launch Tracker</h2>
    <p style={sub}>All campaigns across accounts</p>
    {["upcoming","in-progress","launched"].map(st => (
      <div key={st} style={{marginTop:12}}>
        <h3 style={h3}>{st==="in-progress"?"In Progress":st.charAt(0).toUpperCase()+st.slice(1)}</h3>
        {lnch.filter(l => l.st===st).map(l => (
          <div key={l.id} style={{...crd,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <div>
              <div style={{fontSize:13,fontWeight:600,color:"#1a1a1a",fontFamily:_f}}>{l.name}</div>
              <div style={{fontSize:11,color:"#888",fontFamily:_f}}>{l.acc} · {l.ch} · {l.dt}</div>
            </div>
            <SB s={st}/>
          </div>
        ))}
        {lnch.filter(l => l.st===st).length===0 && <p style={{fontSize:11,color:"#888",fontFamily:_f}}>None</p>}
      </div>
    ))}
  </>;
}

// ═══ AI WAR ROOM ═══
export function AIWarRoom({ accs, tasks, lnch, aiH, sAH }) {
  const [chat, setChat] = useState("");
  const [loading, setLoading] = useState(false);
  const [mtgAcc, setMtgAcc] = useState("");
  const [mtgRes, setMtgRes] = useState(null);
  const [mtgLoading, setMtgLoading] = useState(false);

  const askAI = async () => {
    if (!chat.trim()) return;
    const q = chat;
    setChat("");
    sAH(p => [...p, {r:"u",t:q}]);
    setLoading(true);
    const { system, user } = PROMPTS.strategist(q, accs, tasks, lnch);
    const r = await callAI(system, user);
    sAH(p => [...p, {r:"ai",t:r}]);
    setLoading(false);
  };

  const genMtg = async () => {
    if (!mtgAcc) return;
    setMtgLoading(true);
    const acc = accs.find(a => a.name === mtgAcc);
    const accL = lnch.filter(l => l.acc === mtgAcc);
    const accT = tasks.filter(t => t.acc === mtgAcc);
    const wins = tasks.filter(t => t.acc === mtgAcc && (t.status==="Complete"||t.archived)).map(t => t.text);
    const { system, user } = PROMPTS.meetingPrep(acc, accL, accT, wins);
    const r = await callAI(system, user);
    setMtgRes(r);
    setMtgLoading(false);
  };

  return <>
    <h2 style={h2}>AI War Room</h2>
    <p style={sub}>Meeting prep, strategist, and agents</p>

    <div style={crd}>
      <h3 style={h3}>Quick Meeting Prep</h3>
      <div style={{display:"flex",gap:8}}>
        <select value={mtgAcc} onChange={e => setMtgAcc(e.target.value)} style={{...inp,flex:1}}>
          <option value="">Select account...</option>
          {accs.map(a => <option key={a.id} value={a.name}>{a.name}</option>)}
        </select>
        {aiBtn("Generate", mtgLoading, genMtg)}
      </div>
      {mtgRes && <div style={{marginTop:12,padding:14,background:"rgba(0,0,0,0.02)",borderRadius:12,fontSize:12,color:"#1a1a1a",lineHeight:1.7,fontFamily:_f,whiteSpace:"pre-wrap"}}>{mtgRes}</div>}
      <p style={{fontSize:10,color:"#888",fontFamily:_f,marginTop:8}}>For the full 2-slide deck + agenda + Teams message, use the <strong>Meeting Prep</strong> page →</p>
    </div>

    <div style={crd}>
      <h3 style={h3}>Ask AI Strategist</h3>
      <div style={{display:"flex",gap:8}}>
        <input value={chat} onChange={e => setChat(e.target.value)} onKeyDown={e => e.key==="Enter" && askAI()} placeholder="Ask about strategy, accounts, optimizations..." style={{...inp,flex:1}}/>
        <button onClick={askAI} disabled={loading} style={{...btn,opacity:loading?0.6:1}}>{loading?"...":"Ask"}</button>
      </div>
      <div style={{marginTop:10,maxHeight:400,overflow:"auto"}}>
        {aiH.map((m,i) => (
          <div key={i} style={{padding:10,marginBottom:6,borderRadius:12,background:m.r==="u"?"rgba(0,0,0,0.02)":"rgba(212,120,158,0.04)",fontSize:12,color:"#1a1a1a",fontFamily:_f,lineHeight:1.6,whiteSpace:"pre-wrap"}}>
            <span style={{fontSize:9,fontWeight:700,textTransform:"uppercase",letterSpacing:1,color:m.r==="u"?"#c9956b":"#d4789e",marginRight:6}}>{m.r==="u"?"You":"AI"}</span>{m.t}
          </div>
        ))}
      </div>
    </div>

    <h3 style={h3}>Cowork Agents</h3>
    <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:8}}>
      {[{n:"Outlook",d:"Emails → action items"},{n:"Teams",d:"Chat context"},{n:"Airtable",d:"Two-way sync"},{n:"HubSpot",d:"CRM deals"},{n:"Competitor Intel",d:"Moves by channel"}].map((a,i) => (
        <div key={i} style={{...crd,padding:14,marginBottom:0}}>
          <div style={{fontSize:12,fontWeight:600,color:"#1a1a1a",fontFamily:_f}}>🤖 {a.n}</div>
          <div style={{fontSize:10,color:"#888",fontFamily:_f}}>{a.d}</div>
          <span style={{...tag,marginTop:6,display:"inline-block",background:"rgba(76,175,80,0.1)",color:"#4caf50"}}>Ready</span>
        </div>
      ))}
    </div>
  </>;
}

// ═══ GOALS ═══
export function Goals({ tasks, lnch, goals, sG }) {
  const [modal, sM] = useState(null);
  const [form, sF] = useState({});
  const dT = tasks.filter(t => t.status === "Complete" || t.archived);

  return <>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4}}>
      <h2 style={h2}>Goals & Wins</h2>
      <button onClick={() => sM("add")} style={btn}>+ Add</button>
    </div>
    <p style={sub}>Auto-tracked from your work</p>

    <div style={crd}>
      <div style={{display:"flex",justifyContent:"space-around",flexWrap:"wrap",gap:10}}>
        {goals.map(g => <GoalRing key={g.id} g={g} sz={78}/>)}
      </div>
    </div>

    {goals.map(g => (
      <div key={g.id} style={{...crd,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <div>
          <div style={{fontSize:13,fontWeight:600,color:"#1a1a1a",fontFamily:_f}}>{g.name}</div>
          <div style={{fontSize:11,color:"#888",fontFamily:_f}}>{g.cur}/{g.tgt}</div>
        </div>
        <button onClick={() => {sF(g); sM("edit")}} style={{...btnS,padding:"4px 8px"}}>✎</button>
      </div>
    ))}

    <div style={crd}>
      <h3 style={h3}>Win Journal</h3>
      {dT.map(t => (
        <div key={t.id} style={{display:"flex",alignItems:"center",gap:6,padding:"4px 0",borderBottom:"1px solid rgba(0,0,0,0.04)"}}>
          <span style={{color:"#4caf50"}}>✓</span>
          <span style={{flex:1,fontSize:11,color:"#1a1a1a",fontFamily:_f}}>{t.text}</span>
          {t.acc && <span style={{fontSize:9,color:"#888",fontFamily:_f}}>{t.acc.split(" ")[0]}</span>}
        </div>
      ))}
      {lnch.filter(l => l.st === "launched").map(l => (
        <div key={l.id} style={{display:"flex",alignItems:"center",gap:6,padding:"4px 0"}}>
          <span>🚀</span>
          <span style={{flex:1,fontSize:11,color:"#1a1a1a",fontFamily:_f}}>Launched: {l.name}</span>
        </div>
      ))}
    </div>

    <Modal open={!!modal} onClose={() => {sM(null);sF({})}} title={modal==="edit"?"Edit Goal":"Add Goal"}>
      <FormField label="Name" value={form.name} onChange={v => sF(p => ({...p,name:v}))}/>
      <FormField label="Target" value={form.tgt} onChange={v => sF(p => ({...p,tgt:v}))} type="number"/>
      <FormField label="Current" value={form.cur} onChange={v => sF(p => ({...p,cur:v}))} type="number"/>
      <FormField label="Type" value={form.tp} onChange={v => sF(p => ({...p,tp:v}))} type="select" options={["accounts","launches","tasks","strategy"]}/>
      <button onClick={() => {
        if (!form.name?.trim()) return;
        if (modal==="edit") sG(p => p.map(g => g.id===form.id ? {...g,...form,tgt:Number(form.tgt)||1,cur:Number(form.cur)||0} : g));
        else sG(p => [...p,{id:`g${Date.now()}`,name:form.name,tgt:Number(form.tgt)||1,cur:Number(form.cur)||0,tp:form.tp||"tasks"}]);
        sF({}); sM(null);
      }} style={{...btn,width:"100%",justifyContent:"center",marginTop:4}}>{modal==="edit"?"Save":"Add"}</button>
    </Modal>
  </>;
}

// ═══ LEADERSHIP ═══
export function Leadership({ lnch }) {
  return <>
    <h2 style={h2}>Leadership Corner</h2>
    <p style={sub}>Coaching and follow-through</p>
    <div style={{...crd,background:"linear-gradient(135deg,rgba(255,255,255,0.8),rgba(218,165,32,0.03))"}}>
      <h3 style={h3}>Daily Prompt</h3>
      <p style={{fontSize:14,color:"#1a1a1a",lineHeight:1.6,fontStyle:"italic",fontFamily:_f,margin:0}}>
        "What's one thing you can do today that will make next month's stakeholder meeting easier?"
      </p>
    </div>
    <div style={crd}>
      <h3 style={h3}>Post-Launch Follow-Ups</h3>
      {lnch.filter(l => l.st === "launched").map(l => (
        <div key={l.id} style={{padding:"6px 0",borderBottom:"1px solid rgba(0,0,0,0.04)"}}>
          <div style={{fontSize:12,fontWeight:600,color:"#1a1a1a",fontFamily:_f}}>{l.name}</div>
          <div style={{fontSize:10,color:"#888",fontFamily:_f}}>{l.acc} · {l.dt}</div>
          <div style={{marginTop:4,display:"flex",gap:4}}>
            {["1-Week","2-Week","30-Day"].map(p => <span key={p} style={tag}>☐ {p}</span>)}
          </div>
        </div>
      ))}
    </div>
  </>;
}

// ═══ AUTOMATION ═══
export function Automation() {
  return <>
    <h2 style={h2}>Automation</h2>
    <p style={sub}>Scan tools via Cowork</p>
    <div style={{...crd,background:"linear-gradient(135deg,rgba(255,255,255,0.8),rgba(76,175,80,0.03))"}}>
      <h3 style={h3}>Weekly Monday Refresh</h3>
      <p style={{fontSize:12,color:"#555",fontFamily:_f}}>Auto-refreshes competitor intel + positioning for every account Mondays at 7am EST.</p>
    </div>
    <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:8}}>
      {[{n:"Outlook",d:"Emails → action items",e:"📧"},{n:"Teams",d:"Chat decisions",e:"💬"},{n:"Airtable",d:"Two-way sync",e:"📊"},{n:"HubSpot",d:"CRM deals",e:"🔗"}].map((s,i) => (
        <div key={i} style={{...crd,padding:16,marginBottom:0}}>
          <div style={{display:"flex",alignItems:"center",gap:8}}>
            <span style={{fontSize:20}}>{s.e}</span>
            <div>
              <div style={{fontSize:13,fontWeight:600,color:"#1a1a1a",fontFamily:_f}}>{s.n}</div>
              <div style={{fontSize:10,color:"#888",fontFamily:_f}}>{s.d}</div>
            </div>
          </div>
          <span style={{...tag,marginTop:8,display:"inline-block",background:"rgba(76,175,80,0.1)",color:"#4caf50"}}>Ready for Cowork</span>
        </div>
      ))}
    </div>
  </>;
}
