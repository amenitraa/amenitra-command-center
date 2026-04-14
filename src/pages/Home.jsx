import { useState } from "react";
import { styles, GoalRing, HD, SB, PB, Modal, FormField } from "../components/Shared";
import { TASK_STATUSES } from "../data";

const { crd, btn, btnS, h2, h3, tag, _f } = styles;

export default function Home({ accs, tasks, sT, lnch, goals, sG, setPg, sSA, quote, tg }) {
  const [modal, sM] = useState(null);
  const [form, sF] = useState({});
  const oT = tasks.filter(t => t.status !== "Complete" && !t.archived);
  const aL = lnch.filter(l => l.st !== "launched");
  const dT = tasks.filter(t => t.status === "Complete" || t.archived);

  const markComplete = id => sT(p => p.map(t => t.id === id ? {...t, status:"Complete"} : t));

  return <>
    <div style={{...crd,textAlign:"center",padding:22,background:"linear-gradient(135deg,rgba(255,255,255,0.7),rgba(232,160,191,0.04))"}}>
      <p style={{fontSize:10,color:"#888",textTransform:"uppercase",letterSpacing:2.5,margin:"0 0 4px",fontFamily:_f}}>{tg}, Amenitra</p>
      <p style={{fontSize:14,color:"#555",fontStyle:"italic",margin:"0 0 2px",fontFamily:_f}}>"{quote.t}"</p>
      <p style={{fontSize:11,color:"#888",margin:0,fontFamily:_f}}>— {quote.a}</p>
    </div>

    <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:8,marginBottom:12}}>
      {[{n:oT.length,l:"Tasks",cl:"#c9956b"},{n:aL.length,l:"Launches",cl:"#d4789e"},{n:accs.length,l:"Accounts",cl:"#4caf50"},{n:dT.length,l:"Done",cl:"#555"}].map((s,i) => (
        <div key={i} style={{...crd,textAlign:"center",padding:12,marginBottom:0}}>
          <div style={{fontSize:22,fontWeight:700,color:s.cl,fontFamily:_f}}>{s.n}</div>
          <div style={{fontSize:8,color:"#888",textTransform:"uppercase",letterSpacing:1.2,fontFamily:_f}}>{s.l}</div>
        </div>
      ))}
    </div>

    <div style={crd}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
        <h3 style={{...h3,margin:0}}>Goals</h3>
        <button onClick={() => sM("addGoal")} style={btnS}>+ Add</button>
      </div>
      <div style={{display:"flex",justifyContent:"space-around",flexWrap:"wrap",gap:6}}>
        {goals.slice(0,5).map(g => <GoalRing key={g.id} g={g}/>)}
      </div>
    </div>

    <div style={crd}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
        <h3 style={{...h3,margin:0}}>Priorities</h3>
        <button onClick={() => setPg("tasks")} style={btnS}>View All</button>
      </div>
      {oT.filter(t => t.pr === "high").concat(oT.filter(t => t.pr !== "high")).slice(0,5).map(t => (
        <div key={t.id} style={{display:"flex",alignItems:"center",gap:8,padding:"6px 0",borderBottom:"1px solid rgba(0,0,0,0.04)"}}>
          <div onClick={() => markComplete(t.id)} style={{width:16,height:16,borderRadius:4,border:`1.5px solid ${t.status==="In Progress"?"#c9956b":"#ddd"}`,background:t.status==="In Progress"?"rgba(201,149,107,0.1)":"transparent",cursor:"pointer",flexShrink:0}}/>
          <span style={{flex:1,fontSize:12,color:"#1a1a1a",fontFamily:_f}}>{t.text}</span>
          <PB p={t.pr}/>
          {t.acc && <span style={{fontSize:8,color:"#888",fontFamily:_f}}>{t.acc.split(" ")[0]}</span>}
        </div>
      ))}
    </div>

    <h3 style={h3}>Accounts</h3>
    <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:8}}>
      {accs.map(a => (
        <div key={a.id} onClick={() => {sSA(a.id); setPg("acc-detail")}} style={{...crd,cursor:"pointer",padding:14,marginBottom:0}}>
          <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4}}>
            <HD h={a.hp}/><span style={{fontSize:13,fontWeight:600,color:"#1a1a1a",fontFamily:_f}}>{a.name}</span>
          </div>
          <div style={{fontSize:10,color:"#888",fontFamily:_f}}>{a.ind} · {a.rev}</div>
          <div style={{marginTop:4}}><SB s={a.st}/></div>
        </div>
      ))}
    </div>

    <Modal open={modal === "addGoal"} onClose={() => sM(null)} title="Add Goal">
      <FormField label="Name" value={form.name} onChange={v => sF(p => ({...p, name:v}))}/>
      <FormField label="Target" value={form.tgt} onChange={v => sF(p => ({...p, tgt:v}))} type="number"/>
      <FormField label="Type" value={form.tp} onChange={v => sF(p => ({...p, tp:v}))} type="select" options={["accounts","launches","tasks","strategy"]}/>
      <button onClick={() => {
        if (!form.name?.trim()) return;
        sG(p => [...p, {id:`g${Date.now()}`,name:form.name,tgt:Number(form.tgt)||1,cur:0,tp:form.tp||"tasks"}]);
        sF({}); sM(null);
      }} style={{...btn,width:"100%",justifyContent:"center",marginTop:4}}>Add Goal</button>
    </Modal>
  </>;
}
