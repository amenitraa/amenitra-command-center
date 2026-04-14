import { useState, useEffect } from "react";
import { DB } from "./storage";
import { ACCOUNTS, DEFAULT_TASKS, DEFAULT_LAUNCHES, DEFAULT_GOALS, CONTENT, QUOTES } from "./data";
import Home from "./pages/Home";
import Accounts from "./pages/Accounts";
import AccountDetail from "./pages/AccountDetail";
import Channels from "./pages/Channels";
import ContentPage from "./pages/Content";
import Tasks from "./pages/Tasks";
import { Launches, AIWarRoom, Goals, Leadership, Automation } from "./pages/OtherPages";
import MeetingPrep from "./pages/MeetingPrep";

const _f = "'Poppins',sans-serif";

export default function App() {
  const [pg, sP] = useState("home");
  const [sb, sSb] = useState(true);
  const [accs, sA] = useState(ACCOUNTS);
  const [tasks, sT] = useState(DEFAULT_TASKS);
  const [lnch, sL] = useState(DEFAULT_LAUNCHES);
  const [goals, sG] = useState(DEFAULT_GOALS);
  const [content, sC] = useState(CONTENT);
  const [loaded, sLoaded] = useState(false);
  const [welcome, sW] = useState(true);
  const [selAcc, sSA] = useState(null);
  const [aiH, sAH] = useState([]);

  const [quote] = useState(QUOTES[Math.floor(Math.random() * QUOTES.length)]);
  const hr = new Date().getHours();
  const tg = hr < 12 ? "Good morning" : hr < 17 ? "Good afternoon" : "Good evening";

  // Persistence
  useEffect(() => {
    (async () => {
      const [a, t, l, g, c, ah] = await Promise.all([
        DB.get("v6-a"), DB.get("v6-t"), DB.get("v6-l"), DB.get("v6-g"), DB.get("v6-c"), DB.get("v6-ah")
      ]);
      if (a) sA(a);
      if (t) sT(t);
      if (l) sL(l);
      if (g) sG(g);
      if (c) sC(c);
      if (ah) sAH(ah);
      sLoaded(true);
    })();
  }, []);

  useEffect(() => {
    if (loaded) {
      DB.set("v6-a", accs);
      DB.set("v6-t", tasks);
      DB.set("v6-l", lnch);
      DB.set("v6-g", goals);
      DB.set("v6-c", content);
      DB.set("v6-ah", aiH);
    }
  }, [accs, tasks, lnch, goals, content, aiH, loaded]);

  useEffect(() => {
    const t = setTimeout(() => sW(false), 3500);
    return () => clearTimeout(t);
  }, []);

  const oT = tasks.filter(t => t.status !== "Complete" && !t.archived);
  const aL = lnch.filter(l => l.st !== "launched");

  // Navigation
  const nav = [
    { id:"home", l:"Home", e:"🏠" },
    { id:"accounts", l:"Accounts", e:"📋" },
    { id:"channels", l:"Channels", e:"📡" },
    { id:"content", l:"Content", e:"📄" },
    { id:"launches", l:"Launches", e:"🚀" },
    { id:"tasks", l:"Tasks", e:"✅" },
    { id:"ai", l:"AI War Room", e:"🤖" },
    { id:"meeting-prep", l:"Meeting Prep", e:"📊" },
    { id:"goals", l:"Goals", e:"🎯" },
    { id:"leadership", l:"Leadership", e:"⭐" },
    { id:"automation", l:"Automation", e:"⚡" },
  ];

  // Welcome Screen
  if (welcome) return (
    <div onClick={() => sW(false)} style={{position:"fixed",inset:0,background:"linear-gradient(160deg,#fdf0ec,#f5ddd4)",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",zIndex:9999,cursor:"pointer",padding:24,textAlign:"center"}}>
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet"/>
      <div style={{fontSize:44,marginBottom:16}}>✨</div>
      <h1 style={{fontSize:28,fontWeight:300,color:"#1a1a1a",fontFamily:_f,margin:"0 0 16px"}}>{tg}, Amenitra</h1>
      <div style={{display:"flex",gap:14,flexWrap:"wrap",justifyContent:"center",marginBottom:24}}>
        {[{n:oT.length,l:"Tasks",cl:"#c9956b"},{n:accs.length,l:"Accounts",cl:"#d4789e"},{n:aL.length,l:"Launches",cl:"#4caf50"}].map((s,i) => (
          <div key={i} style={{background:"rgba(255,255,255,0.6)",borderRadius:14,padding:"12px 20px"}}>
            <div style={{fontSize:24,fontWeight:700,color:s.cl,fontFamily:_f}}>{s.n}</div>
            <div style={{fontSize:9,color:"#888",textTransform:"uppercase",letterSpacing:1.2,fontFamily:_f}}>{s.l}</div>
          </div>
        ))}
      </div>
      <p style={{fontSize:14,color:"#555",fontStyle:"italic",fontFamily:_f,maxWidth:400,lineHeight:1.6}}>"{quote.t}"</p>
      <p style={{fontSize:11,color:"#888",fontFamily:_f,marginTop:4}}>— {quote.a}</p>
      <p style={{fontSize:11,color:"#888",marginTop:28,fontFamily:_f,opacity:0.5}}>tap anywhere to enter</p>
    </div>
  );

  // Shared props for all pages
  const pageProps = { accs, sA, tasks, sT, lnch, sL, goals, sG, content, sC, aiH, sAH, selAcc, sSA, setPg: sP };

  // Page routing
  const renderPage = () => {
    switch(pg) {
      case "home": return <Home {...pageProps} quote={quote} tg={tg} />;
      case "accounts": return <Accounts {...pageProps} />;
      case "acc-detail": return <AccountDetail {...pageProps} />;
      case "channels": return <Channels {...pageProps} />;
      case "content": return <ContentPage {...pageProps} />;
      case "launches": return <Launches {...pageProps} />;
      case "tasks": return <Tasks {...pageProps} />;
      case "ai": return <AIWarRoom {...pageProps} />;
      case "meeting-prep": return <MeetingPrep {...pageProps} />;
      case "goals": return <Goals {...pageProps} />;
      case "leadership": return <Leadership {...pageProps} />;
      case "automation": return <Automation {...pageProps} />;
      default: return <Home {...pageProps} quote={quote} tg={tg} />;
    }
  };

  return (
    <div style={{fontFamily:_f,background:"linear-gradient(160deg,#fdf0ec 0%,#fce8e4 30%,#f9e2de 60%,#fdf0ec 100%)",minHeight:"100vh",display:"flex"}}>
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet"/>

      {/* Sidebar Toggle */}
      <button onClick={() => sSb(p => !p)} style={{position:"fixed",top:12,left:sb?218:12,zIndex:1500,background:"rgba(255,255,255,0.8)",backdropFilter:"blur(12px)",border:"1px solid rgba(0,0,0,0.06)",borderRadius:10,padding:"7px 9px",cursor:"pointer",color:"#1a1a1a",transition:"left 0.3s"}}>
        {sb ? "✕" : "☰"}
      </button>

      {/* Sidebar */}
      <aside style={{width:sb?210:0,minHeight:"100vh",background:"rgba(255,255,255,0.6)",backdropFilter:"blur(20px)",borderRight:"1px solid rgba(0,0,0,0.06)",transition:"width 0.3s",overflow:"hidden",position:"sticky",top:0,height:"100vh",flexShrink:0,zIndex:1000,display:"flex",flexDirection:"column"}}>
        <div style={{padding:sb?"50px 10px 14px":"50px 0 14px",opacity:sb?1:0,transition:"opacity 0.2s",flex:1}}>
          <div style={{marginBottom:16,paddingLeft:8}}>
            <div style={{fontSize:15,fontWeight:600,color:"#1a1a1a",fontFamily:_f}}>Amenitra's</div>
            <div style={{fontSize:9,color:"#d4789e",fontFamily:_f,fontWeight:500,letterSpacing:2,textTransform:"uppercase"}}>Command Center</div>
          </div>
          {nav.map(n => (
            <button key={n.id} onClick={() => sP(n.id)} style={{display:"flex",alignItems:"center",gap:8,width:"100%",padding:"8px 10px",borderRadius:10,border:"none",cursor:"pointer",marginBottom:1,background:pg===n.id?"rgba(201,149,107,0.12)":"transparent",color:pg===n.id?"#1a1a1a":"#555",fontWeight:pg===n.id?600:400,fontSize:12,fontFamily:_f,textAlign:"left"}}>
              <span style={{fontSize:14}}>{n.e}</span> {n.l}
            </button>
          ))}
        </div>
        <div style={{padding:sb?"10px 14px":0,borderTop:"1px solid rgba(0,0,0,0.06)",opacity:sb?1:0}}>
          <div style={{fontSize:8,color:"#888",fontFamily:_f,textTransform:"uppercase",letterSpacing:1,lineHeight:1.6}}>IG · Financial Services · Life Sciences</div>
        </div>
      </aside>

      {/* Main Content */}
      <main style={{flex:1,padding:"16px 20px",maxWidth:860,margin:"0 auto",width:"100%"}}>
        <div style={{paddingTop:36}}>
          {renderPage()}
        </div>
      </main>
    </div>
  );
}
