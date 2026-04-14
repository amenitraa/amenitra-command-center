import { useState } from "react";
import { styles, PB, SB, Modal, FormField } from "../components/Shared";
import { TASK_STATUSES } from "../data";

const { crd, btn, btnS, inp, h2, h3, sub, tag, _f } = styles;

const stColors = {"Not Started":"#888","In Progress":"#c9956b","Blocked":"#e53935","Complete":"#4caf50"};

export default function Tasks({ accs, tasks, sT }) {
  const [taskExp, setExp] = useState(null);
  const [showArchive, setShowArch] = useState(false);
  const [modal, sM] = useState(null);
  const [form, sF] = useState({});

  const oT = tasks.filter(t => t.status !== "Complete" && !t.archived);
  const dT = tasks.filter(t => t.status === "Complete" && !t.archived);
  const archT = tasks.filter(t => t.archived);

  const markComplete = id => sT(p => p.map(t => t.id===id ? {...t,status:"Complete"} : t));
  const archive = id => sT(p => p.map(t => t.id===id ? {...t,archived:true} : t));
  const unarchive = id => sT(p => p.map(t => t.id===id ? {...t,archived:false,status:"Complete"} : t));
  const updateStatus = (id,s) => sT(p => p.map(t => t.id===id ? {...t,status:s} : t));
  const updateNotes = (id,n) => sT(p => p.map(t => t.id===id ? {...t,notes:n} : t));
  const deleteTask = id => sT(p => p.filter(t => t.id !== id));

  const saveTask = () => {
    if (!form.text?.trim()) return;
    sT(p => [{id:`t${Date.now()}`,text:form.text,status:form.status||"Not Started",due:form.due||"",pr:form.pr||"medium",notes:form.notes||"",acc:form.acc||"",archived:false},...p]);
    sF({}); sM(null);
  };

  return <>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
      <h2 style={h2}>Tasks & Reminders</h2>
      <button onClick={() => sM("add")} style={btn}>+ Add Task</button>
    </div>

    {/* Status Counts */}
    <div style={{display:"flex",gap:8,marginBottom:14}}>
      {TASK_STATUSES.map(s => {
        const c = tasks.filter(t => t.status===s && !t.archived).length;
        return (
          <div key={s} style={{...crd,flex:1,textAlign:"center",padding:10,marginBottom:0,borderLeft:`3px solid ${stColors[s]}`}}>
            <div style={{fontSize:18,fontWeight:700,color:stColors[s],fontFamily:_f}}>{c}</div>
            <div style={{fontSize:8,color:"#888",textTransform:"uppercase",letterSpacing:1,fontFamily:_f}}>{s}</div>
          </div>
        );
      })}
    </div>

    {/* Tasks by Status */}
    {["In Progress","Not Started","Blocked"].map(status => {
      const sts = oT.filter(t => t.status === status);
      if (!sts.length) return null;
      return (
        <div key={status} style={{marginBottom:16}}>
          <h3 style={{...h3,color:stColors[status]}}>{status} ({sts.length})</h3>
          {sts.map(t => (
            <div key={t.id} style={{...crd,padding:0,overflow:"hidden",borderLeft:`3px solid ${stColors[t.status]}`}}>
              <div onClick={() => setExp(taskExp===t.id?null:t.id)} style={{padding:"12px 16px",cursor:"pointer",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <span style={{flex:1,fontSize:13,fontWeight:500,color:"#1a1a1a",fontFamily:_f}}>{t.text}</span>
                <div style={{display:"flex",alignItems:"center",gap:6}}>
                  <PB p={t.pr}/>
                  {t.acc && <span style={{...tag,margin:0,fontSize:8}}>{t.acc.split(" ")[0]}</span>}
                  {t.due && <span style={{fontSize:10,color:"#888",fontFamily:_f}}>{t.due}</span>}
                  <span style={{transform:taskExp===t.id?"rotate(90deg)":"",transition:"transform 0.2s",color:"#888"}}>›</span>
                </div>
              </div>
              {taskExp===t.id && (
                <div style={{padding:"0 16px 14px",borderTop:"1px solid rgba(0,0,0,0.04)"}}>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,marginTop:10,marginBottom:10}}>
                    <div>
                      <label style={{fontSize:9,color:"#888",textTransform:"uppercase",letterSpacing:1,fontFamily:_f,display:"block",marginBottom:4}}>Status</label>
                      <select value={t.status} onChange={e => updateStatus(t.id,e.target.value)} style={{...inp,fontSize:12,padding:"8px 10px"}}>
                        {TASK_STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                    <div>
                      <label style={{fontSize:9,color:"#888",textTransform:"uppercase",letterSpacing:1,fontFamily:_f,display:"block",marginBottom:4}}>Priority</label>
                      <select value={t.pr} onChange={e => sT(p => p.map(x => x.id===t.id?{...x,pr:e.target.value}:x))} style={{...inp,fontSize:12,padding:"8px 10px"}}>
                        {["high","medium","low"].map(p => <option key={p} value={p}>{p}</option>)}
                      </select>
                    </div>
                    <div>
                      <label style={{fontSize:9,color:"#888",textTransform:"uppercase",letterSpacing:1,fontFamily:_f,display:"block",marginBottom:4}}>Due Date</label>
                      <input type="date" value={t.due||""} onChange={e => sT(p => p.map(x => x.id===t.id?{...x,due:e.target.value}:x))} style={{...inp,fontSize:12,padding:"8px 10px"}}/>
                    </div>
                  </div>
                  <div style={{marginBottom:10}}>
                    <label style={{fontSize:9,color:"#888",textTransform:"uppercase",letterSpacing:1,fontFamily:_f,display:"block",marginBottom:4}}>Account</label>
                    <select value={t.acc||""} onChange={e => sT(p => p.map(x => x.id===t.id?{...x,acc:e.target.value}:x))} style={{...inp,fontSize:12,padding:"8px 10px"}}>
                      <option value="">None</option>
                      {accs.map(a => <option key={a.id} value={a.name}>{a.name}</option>)}
                    </select>
                  </div>
                  <div style={{marginBottom:10}}>
                    <label style={{fontSize:9,color:"#888",textTransform:"uppercase",letterSpacing:1,fontFamily:_f,display:"block",marginBottom:4}}>Notes</label>
                    <textarea value={t.notes||""} onChange={e => updateNotes(t.id,e.target.value)} placeholder="Add notes, context, links..." style={{...inp,minHeight:60,resize:"vertical",fontSize:12}}/>
                  </div>
                  <div style={{display:"flex",gap:6}}>
                    <button onClick={() => {markComplete(t.id);setExp(null)}} style={{...btn,fontSize:10,padding:"5px 12px",background:"linear-gradient(135deg,#4caf50,#66bb6a)"}}>✓ Complete</button>
                    <button onClick={() => deleteTask(t.id)} style={{...btnS,color:"#e53935"}}>🗑 Delete</button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      );
    })}

    {/* Completed */}
    {dT.length > 0 && (
      <div style={{marginBottom:16}}>
        <h3 style={{...h3,color:"#4caf50"}}>Complete ({dT.length})</h3>
        {dT.map(t => (
          <div key={t.id} style={{...crd,display:"flex",justifyContent:"space-between",alignItems:"center",opacity:0.7,borderLeft:"3px solid #4caf50"}}>
            <div>
              <div style={{fontSize:12,color:"#1a1a1a",fontFamily:_f,textDecoration:"line-through"}}>{t.text}</div>
              {t.acc && <div style={{fontSize:10,color:"#888",fontFamily:_f}}>{t.acc}</div>}
            </div>
            <div style={{display:"flex",gap:4}}>
              <button onClick={() => archive(t.id)} style={{...btnS,fontSize:10}}>Archive</button>
              <button onClick={() => updateStatus(t.id,"In Progress")} style={{...btnS,fontSize:10}}>Reopen</button>
            </div>
          </div>
        ))}
      </div>
    )}

    {/* Archive */}
    <button onClick={() => setShowArch(p => !p)} style={{...btnS,marginBottom:8}}>
      {showArchive ? "Hide" : "Show"} Archive ({archT.length})
    </button>
    {showArchive && archT.map(t => (
      <div key={t.id} style={{...crd,opacity:0.4,borderLeft:"3px solid #ddd",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <div>
          <div style={{fontSize:12,color:"#1a1a1a",fontFamily:_f,textDecoration:"line-through"}}>{t.text}</div>
          <div style={{fontSize:10,color:"#888",fontFamily:_f}}>{t.acc||"No account"} · {t.due}</div>
        </div>
        <div style={{display:"flex",gap:4}}>
          <button onClick={() => unarchive(t.id)} style={{...btnS,fontSize:10}}>Restore</button>
          <button onClick={() => deleteTask(t.id)} style={{...btnS,fontSize:10,color:"#e53935"}}>Delete</button>
        </div>
      </div>
    ))}

    {/* Add Task Modal */}
    <Modal open={modal==="add"} onClose={() => sM(null)} title="Add Task">
      <FormField label="Task" value={form.text} onChange={v => sF(p => ({...p,text:v}))}/>
      <FormField label="Status" value={form.status} onChange={v => sF(p => ({...p,status:v}))} type="select" options={TASK_STATUSES}/>
      <FormField label="Priority" value={form.pr} onChange={v => sF(p => ({...p,pr:v}))} type="select" options={["high","medium","low"]}/>
      <FormField label="Due Date" value={form.due} onChange={v => sF(p => ({...p,due:v}))} type="date"/>
      <FormField label="Account" value={form.acc} onChange={v => sF(p => ({...p,acc:v}))} type="select" options={["", ...accs.map(a => a.name)]}/>
      <FormField label="Notes" value={form.notes} onChange={v => sF(p => ({...p,notes:v}))} type="textarea"/>
      <button onClick={saveTask} style={{...btn,width:"100%",justifyContent:"center",marginTop:4}}>Add Task</button>
    </Modal>
  </>;
}
