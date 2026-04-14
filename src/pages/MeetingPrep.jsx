import { useState } from "react";
import { styles, SB, aiBtn } from "../components/Shared";
import { callAI, PROMPTS } from "../ai";

const { crd, btn, btnS, inp, h2, h3, sub, dk, dkH, dkT, _f } = styles;

export default function MeetingPrep({ accs, tasks, lnch }) {
  const [selAcc, setSelAcc] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [customNotes, setCustomNotes] = useState("");

  const generatePrep = async () => {
    if (!selAcc) return;
    setLoading(true);
    const account = accs.find(a => a.name === selAcc);
    if (!account) { setLoading(false); return; }

    const accLaunches = lnch.filter(l => l.acc === selAcc);
    const accTasks = tasks.filter(t => t.acc === selAcc);
    const recentWins = tasks.filter(t => t.acc === selAcc && (t.status === "Complete" || t.archived)).map(t => t.text);

    const { system, user } = PROMPTS.meetingPrep(account, accLaunches, accTasks, recentWins);

    // Add custom notes if any
    const finalUser = customNotes.trim()
      ? `${user}\n\nADDITIONAL CONTEXT FROM AMENITRA:\n${customNotes}`
      : user;

    const r = await callAI(system, finalUser);
    setResult(r);
    setLoading(false);
  };

  const account = accs.find(a => a.name === selAcc);

  return <>
    <h2 style={h2}>Meeting Prep</h2>
    <p style={sub}>Generate a performance snapshot deck, agenda, and Teams message for your next stakeholder meeting</p>

    {/* Account Selection */}
    <div style={crd}>
      <h3 style={h3}>Select Account</h3>
      <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:6,marginBottom:12}}>
        {accs.map(a => (
          <button key={a.id} onClick={() => setSelAcc(a.name)} style={{
            padding:"10px 8px",borderRadius:12,border:`2px solid ${selAcc===a.name?"#c9956b":"rgba(0,0,0,0.06)"}`,
            background:selAcc===a.name?"rgba(201,149,107,0.08)":"rgba(255,255,255,0.5)",
            cursor:"pointer",fontFamily:_f,textAlign:"center",transition:"all 0.15s"
          }}>
            <div style={{fontSize:18,fontWeight:700,color:selAcc===a.name?"#c9956b":"#888",fontFamily:_f}}>{a.ini}</div>
            <div style={{fontSize:9,color:selAcc===a.name?"#1a1a1a":"#888",fontFamily:_f,marginTop:2}}>{a.name.split(" ")[0]}</div>
          </button>
        ))}
      </div>

      {/* Custom context */}
      <h3 style={h3}>Additional Context (Optional)</h3>
      <p style={{fontSize:11,color:"#888",fontFamily:_f,marginBottom:6}}>Add anything from Teams conversations, Outlook emails, HubSpot data, or things on your mind</p>
      <textarea
        value={customNotes}
        onChange={e => setCustomNotes(e.target.value)}
        placeholder="Paste notes from Teams, Outlook, HubSpot — or add talking points, wins, concerns..."
        style={{...inp,minHeight:80,resize:"vertical",marginBottom:12}}
      />

      {/* Generate Button */}
      <div style={{display:"flex",gap:8,alignItems:"center"}}>
        {aiBtn("Generate Meeting Prep", loading, generatePrep)}
        {!selAcc && <span style={{fontSize:11,color:"#888",fontFamily:_f}}>← Select an account first</span>}
      </div>
    </div>

    {/* Account Quick Stats */}
    {account && (
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,marginBottom:12}}>
        <div style={{...crd,textAlign:"center",padding:12,marginBottom:0}}>
          <div style={{fontSize:18,fontWeight:700,color:"#c9956b",fontFamily:_f}}>{lnch.filter(l=>l.acc===selAcc&&l.st!=="launched").length}</div>
          <div style={{fontSize:8,color:"#888",textTransform:"uppercase",letterSpacing:1,fontFamily:_f}}>Active Launches</div>
        </div>
        <div style={{...crd,textAlign:"center",padding:12,marginBottom:0}}>
          <div style={{fontSize:18,fontWeight:700,color:"#d4789e",fontFamily:_f}}>{tasks.filter(t=>t.acc===selAcc&&t.status!=="Complete"&&!t.archived).length}</div>
          <div style={{fontSize:8,color:"#888",textTransform:"uppercase",letterSpacing:1,fontFamily:_f}}>Open Tasks</div>
        </div>
        <div style={{...crd,textAlign:"center",padding:12,marginBottom:0}}>
          <div style={{fontSize:18,fontWeight:700,color:"#4caf50",fontFamily:_f}}>{tasks.filter(t=>t.acc===selAcc&&(t.status==="Complete"||t.archived)).length}</div>
          <div style={{fontSize:8,color:"#888",textTransform:"uppercase",letterSpacing:1,fontFamily:_f}}>Wins</div>
        </div>
      </div>
    )}

    {/* Generated Result */}
    {result && (
      <>
        {/* Slide 1: Performance Snapshot */}
        <div style={{...dk,background:"linear-gradient(135deg,#0d1b2a,#1a2d45)",padding:24}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
            <h4 style={{...dkH,margin:0,fontSize:12}}>SLIDE 1</h4>
            <span style={{fontSize:9,color:"rgba(255,255,255,0.4)",fontFamily:_f}}>Performance Snapshot: {selAcc}</span>
          </div>
          <div style={{...dkT,whiteSpace:"pre-wrap",lineHeight:1.8}}>{result.split("SLIDE 2")[0]}</div>
        </div>

        {/* Slide 2: Strategic POV */}
        {result.includes("SLIDE 2") && (
          <div style={{...dk,background:"linear-gradient(135deg,#1a2d45,#0d1b2a)",padding:24}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
              <h4 style={{...dkH,margin:0,fontSize:12}}>SLIDE 2</h4>
              <span style={{fontSize:9,color:"rgba(255,255,255,0.4)",fontFamily:_f}}>Strategic POV: Where We Win Next</span>
            </div>
            <div style={{...dkT,whiteSpace:"pre-wrap",lineHeight:1.8}}>
              {result.split("SLIDE 2")[1]?.split("MEETING AGENDA")[0]}
            </div>
          </div>
        )}

        {/* Agenda + Teams Message */}
        {result.includes("MEETING AGENDA") && (
          <div style={crd}>
            <h3 style={h3}>Meeting Agenda</h3>
            <div style={{fontSize:12,color:"#1a1a1a",fontFamily:_f,lineHeight:1.8,whiteSpace:"pre-wrap"}}>
              {result.split("MEETING AGENDA")[1]?.split("TEAMS MESSAGE")[0]}
            </div>
          </div>
        )}

        {result.includes("TEAMS MESSAGE") && (
          <div style={crd}>
            <h3 style={h3}>Teams Message (Copy & Send)</h3>
            <div style={{background:"rgba(0,0,0,0.02)",borderRadius:12,padding:14,fontSize:12,color:"#1a1a1a",fontFamily:_f,lineHeight:1.7,whiteSpace:"pre-wrap",border:"1px solid rgba(0,0,0,0.06)"}}>
              {result.split("TEAMS MESSAGE")[1]?.split("REMINDERS")[0]}
            </div>
            <button onClick={() => {
              const text = result.split("TEAMS MESSAGE")[1]?.split("REMINDERS")[0];
              if (text) navigator.clipboard.writeText(text.trim());
            }} style={{...btnS,marginTop:8}}>📋 Copy to Clipboard</button>
          </div>
        )}

        {result.includes("REMINDERS") && (
          <div style={crd}>
            <h3 style={h3}>💡 Reminders to Bring Up</h3>
            <div style={{fontSize:12,color:"#1a1a1a",fontFamily:_f,lineHeight:1.8,whiteSpace:"pre-wrap"}}>
              {result.split("REMINDERS")[1]}
            </div>
          </div>
        )}
      </>
    )}
  </>;
}
