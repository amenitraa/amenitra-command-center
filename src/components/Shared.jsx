import { useState } from "react";

const _f = "'Poppins',sans-serif";

// ═══ STATUS BADGE ═══
export function SB({ s }) {
  const m = {
    key:{b:"#dcf5dc",c:"#2d7a2d"},
    "new-logo":{b:"#fff3d6",c:"#a07000"},
    "re-entry":{b:"#fde8f0",c:"#b5567a"},
    growth:{b:"#e3f2fd",c:"#1565c0"},
    active:{b:"#dcf5dc",c:"#2d7a2d"},
    upcoming:{b:"#f0e6d6",c:"#8a7060"},
    "in-progress":{b:"#fde8f0",c:"#d4789e"},
    launched:{b:"#dcf5dc",c:"#2d7a2d"},
    live:{b:"#dcf5dc",c:"#2d7a2d"},
    needed:{b:"#fff3d6",c:"#a07000"},
    "Not Started":{b:"#f5f5f5",c:"#888"},
    "In Progress":{b:"#fff3d6",c:"#c9956b"},
    "Blocked":{b:"#fde8e8",c:"#e53935"},
    "Complete":{b:"#dcf5dc",c:"#4caf50"},
  };
  const v = m[s] || m.active;
  return <span style={{fontSize:8,fontWeight:700,textTransform:"uppercase",letterSpacing:1,color:v.c,background:v.b,padding:"2px 8px",borderRadius:10,whiteSpace:"nowrap"}}>{s}</span>;
}

// ═══ PRIORITY BADGE ═══
export function PB({ p }) {
  const m = {high:"#d4789e",medium:"#c9956b",low:"#aaa"};
  return <span style={{fontSize:8,fontWeight:600,textTransform:"uppercase",letterSpacing:0.8,color:m[p],background:`${m[p]}15`,padding:"2px 8px",borderRadius:10}}>{p}</span>;
}

// ═══ HEALTH DOT ═══
export function HD({ h }) {
  return <span style={{display:"inline-block",width:8,height:8,borderRadius:"50%",background:h>=80?"#4caf50":h>=50?"#ff9800":"#e53935"}}/>;
}

// ═══ GOAL RING ═══
export function GoalRing({ g, sz = 60 }) {
  const r = (sz - 5) / 2;
  const c = 2 * Math.PI * r;
  const p = Math.min(g.cur / g.tgt, 1);
  const o = c - p * c;
  const cl = { accounts:"#c9956b", launches:"#d4789e", tasks:"#555", strategy:"#b5906f" };

  return (
    <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:3}}>
      <svg width={sz} height={sz} style={{transform:"rotate(-90deg)"}}>
        <circle cx={sz/2} cy={sz/2} r={r} fill="none" stroke="#f0e6e0" strokeWidth={5}/>
        <circle cx={sz/2} cy={sz/2} r={r} fill="none" stroke={cl[g.tp]||"#c9956b"} strokeWidth={5} strokeDasharray={c} strokeDashoffset={o} strokeLinecap="round" style={{transition:"stroke-dashoffset 0.8s"}}/>
      </svg>
      <span style={{fontSize:10,fontWeight:600,color:"#1a1a1a"}}>{g.cur}/{g.tgt}</span>
      <span style={{fontSize:8,color:"#888",textAlign:"center",maxWidth:70,lineHeight:1.2}}>{g.name}</span>
    </div>
  );
}

// ═══ MODAL ═══
export function Modal({ open, onClose, title, children }) {
  if (!open) return null;
  return (
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.35)",backdropFilter:"blur(6px)",zIndex:2000,display:"flex",alignItems:"center",justifyContent:"center",padding:16}} onClick={onClose}>
      <div onClick={e => e.stopPropagation()} style={{background:"#fff",borderRadius:20,padding:24,width:"100%",maxWidth:520,maxHeight:"85vh",overflow:"auto",boxShadow:"0 24px 64px rgba(0,0,0,0.12)"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
          <h3 style={{fontSize:16,fontWeight:600,color:"#1a1a1a",margin:0,fontFamily:_f}}>{title}</h3>
          <button onClick={onClose} style={{background:"none",border:"none",cursor:"pointer",color:"#999",padding:4,fontSize:18}}>✕</button>
        </div>
        {children}
      </div>
    </div>
  );
}

// ═══ FORM FIELD HELPER ═══
export function FormField({ label, value, onChange, type = "text", options, placeholder }) {
  const inp = {width:"100%",padding:"10px 14px",borderRadius:12,border:"1px solid rgba(0,0,0,0.08)",background:"rgba(255,255,255,0.8)",fontFamily:_f,fontSize:13,color:"#1a1a1a",outline:"none",boxSizing:"border-box"};

  return (
    <div style={{marginBottom:10}}>
      <label style={{fontSize:10,fontWeight:600,color:"#888",display:"block",marginBottom:4,fontFamily:_f,textTransform:"uppercase",letterSpacing:1.2}}>{label}</label>
      {type === "select" ? (
        <select value={value || ""} onChange={e => onChange(e.target.value)} style={inp}>
          {options.map(o => <option key={o} value={o}>{o}</option>)}
        </select>
      ) : type === "textarea" ? (
        <textarea value={value || ""} onChange={e => onChange(e.target.value)} placeholder={placeholder} style={{...inp,minHeight:70,resize:"vertical"}}/>
      ) : (
        <input type={type} value={value || ""} onChange={e => onChange(e.target.value)} placeholder={placeholder} style={inp}/>
      )}
    </div>
  );
}

// ═══ EDITABLE LIST ═══
// For editing arrays of strings (goals, services, tactics, etc.)
export function EditableList({ items, onChange, label, placeholder }) {
  const [newItem, setNewItem] = useState("");

  const addItem = () => {
    if (!newItem.trim()) return;
    onChange([...items, newItem.trim()]);
    setNewItem("");
  };

  const removeItem = (idx) => {
    onChange(items.filter((_, i) => i !== idx));
  };

  const updateItem = (idx, val) => {
    const updated = [...items];
    updated[idx] = val;
    onChange(updated);
  };

  return (
    <div style={{marginBottom:14}}>
      <label style={{fontSize:10,fontWeight:600,color:"#888",display:"block",marginBottom:6,fontFamily:_f,textTransform:"uppercase",letterSpacing:1.2}}>{label}</label>
      {items.map((item, i) => (
        <div key={i} style={{display:"flex",gap:6,marginBottom:4,alignItems:"center"}}>
          <input
            value={item}
            onChange={e => updateItem(i, e.target.value)}
            style={{flex:1,padding:"8px 12px",borderRadius:10,border:"1px solid rgba(0,0,0,0.08)",fontFamily:_f,fontSize:12,color:"#1a1a1a",outline:"none"}}
          />
          <button onClick={() => removeItem(i)} style={{background:"none",border:"none",color:"#e53935",cursor:"pointer",fontSize:14,padding:"4px 8px"}}>✕</button>
        </div>
      ))}
      <div style={{display:"flex",gap:6}}>
        <input
          value={newItem}
          onChange={e => setNewItem(e.target.value)}
          onKeyDown={e => e.key === "Enter" && addItem()}
          placeholder={placeholder || `Add ${label.toLowerCase()}...`}
          style={{flex:1,padding:"8px 12px",borderRadius:10,border:"1px solid rgba(0,0,0,0.08)",fontFamily:_f,fontSize:12,color:"#1a1a1a",outline:"none"}}
        />
        <button onClick={addItem} style={{padding:"6px 14px",borderRadius:10,border:"none",background:"linear-gradient(135deg,#c9956b,#d4a574)",color:"#fff",fontSize:11,fontWeight:600,cursor:"pointer",fontFamily:_f}}>+ Add</button>
      </div>
    </div>
  );
}

// ═══ COMMON STYLES ═══
export const styles = {
  _f,
  crd: {background:"rgba(255,255,255,0.6)",backdropFilter:"blur(16px)",borderRadius:16,padding:18,border:"1px solid rgba(0,0,0,0.06)",marginBottom:12},
  btn: {padding:"8px 18px",borderRadius:20,border:"none",background:"linear-gradient(135deg,#c9956b,#d4a574)",color:"#fff",fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:_f,display:"inline-flex",alignItems:"center",gap:5},
  btnS: {padding:"6px 12px",borderRadius:12,border:"1px solid rgba(0,0,0,0.08)",background:"rgba(255,255,255,0.6)",color:"#555",fontSize:11,cursor:"pointer",fontFamily:_f,display:"inline-flex",alignItems:"center",gap:4},
  inp: {width:"100%",padding:"10px 14px",borderRadius:12,border:"1px solid rgba(0,0,0,0.08)",background:"rgba(255,255,255,0.8)",fontFamily:_f,fontSize:13,color:"#1a1a1a",outline:"none",boxSizing:"border-box"},
  tag: {display:"inline-block",fontSize:8,padding:"2px 8px",borderRadius:10,background:"rgba(0,0,0,0.04)",color:"#555",marginRight:4,marginBottom:4,fontFamily:_f},
  h2: {fontSize:20,fontWeight:600,color:"#1a1a1a",margin:"0 0 4px",fontFamily:_f},
  h3: {fontSize:10,fontWeight:600,color:"#888",margin:"0 0 10px",textTransform:"uppercase",letterSpacing:1.8,fontFamily:_f},
  sub: {fontSize:13,color:"#555",margin:"0 0 16px",fontFamily:_f},
  dk: {background:"#0d1b2a",borderRadius:14,padding:16,marginBottom:10,border:"1px solid rgba(255,255,255,0.06)"},
  dkH: {fontSize:10,fontWeight:600,color:"#e8a0bf",textTransform:"uppercase",letterSpacing:1.8,margin:"0 0 10px",fontFamily:_f},
  dkT: {fontSize:12,color:"rgba(255,255,255,0.85)",fontFamily:_f,lineHeight:1.7},
};

export function aiBtn(label, loading, onClick) {
  return (
    <button onClick={onClick} disabled={loading} style={{...styles.btn,fontSize:10,padding:"5px 12px",opacity:loading?0.6:1}}>
      ✦ {loading ? "Working..." : label}
    </button>
  );
}
