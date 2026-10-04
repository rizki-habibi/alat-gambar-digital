"use client";
import {useEffect,useMemo,useState} from "react";
import dynamic from "next/dynamic";
import {Box,ChevronDown,Download,FolderOpen,Layers,LogOut,Palette,Redo2,Save,Settings,SlidersHorizontal,Sparkles,Undo2,Upload,UserRound,WandSparkles,Move3D,GitBranch,Smile,Brush,Eye} from "lucide-react";

const Stage=dynamic(()=>import("./stage"),{ssr:false});

type Part={id:string;name:string;kind:"head"|"hair"|"body"|"eyes"|"accessory";visible:boolean;color:string;scale:number};
type RigState={mode:boolean;head:number;neck:number;spine:number;armL:number;armR:number;legL:number;legR:number;jaw:number;blink:number};
const initial:Part[]=[
{id:"head",name:"Kepala",kind:"head",visible:true,color:"#f4c7aa",scale:1},
{id:"hair",name:"Rambut",kind:"hair",visible:true,color:"#30213f",scale:1.05},
{id:"eyes",name:"Mata",kind:"eyes",visible:true,color:"#6f55d9",scale:1},
{id:"body",name:"Badan",kind:"body",visible:true,color:"#7c4dff",scale:1},
{id:"accessory",name:"Aksesori",kind:"accessory",visible:true,color:"#ffb347",scale:1},
];
const defaultRig:RigState={mode:false,head:0,neck:0,spine:0,armL:0,armR:0,legL:0,legR:0,jaw:0,blink:0};

export default function Home(){
 const [locked,setLocked]=useState(true),[pw,setPw]=useState("");
 const [tab,setTab]=useState<"model"|"paint"|"rig">("model");
 const [parts,setParts]=useState(initial),[selected,setSelected]=useState("head"),[project,setProject]=useState("Karakter Baru");
 const [rig,setRig]=useState<RigState>(defaultRig);
 const [expression,setExpression]=useState("Neutral");
 const selectedPart=useMemo(()=>parts.find(p=>p.id===selected)||parts[0],[parts,selected]);

 useEffect(()=>{setLocked(localStorage.getItem("vtuber-unlocked")!=="1");const raw=localStorage.getItem("vtuber-draft");if(raw)try{const d=JSON.parse(raw);setProject(d.project||"Karakter Baru");setParts(d.parts||initial);setRig(d.rig||defaultRig)}catch{}},[]);
 const login=()=>{if(pw==="123456789"){localStorage.setItem("vtuber-unlocked","1");setLocked(false)}};
 const save=()=>{localStorage.setItem("vtuber-draft",JSON.stringify({project,parts,rig,expression}));};
 const updateRig=(key:keyof RigState,value:number)=>setRig(r=>({...r,[key]:value}));
 const resetRig=()=>setRig(defaultRig);
 const applyExpression=(name:string)=>{setExpression(name);const presets:Record<string,Partial<RigState>>={Neutral:{jaw:0,blink:0,head:0},Happy:{jaw:18,blink:0,head:3},Angry:{jaw:-4,blink:12,head:-5},Sad:{jaw:4,blink:22,head:6},Surprised:{jaw:28,blink:0,head:0},Wink:{jaw:5,blink:70,head:0}};setRig(r=>({...r,...presets[name]}))};

 if(locked)return <main className="gate"><div className="gate-orbit one"/><div className="gate-orbit two"/><div className="gate-card"><div className="logo"><Sparkles/></div><p className="eyebrow">VTUBER FORGE · STUDIO</p><h1>Bangun karakter yang terasa hidup.</h1><p className="muted">Editor karakter 3D dengan model, paint, rigging, pose, dan expression dalam satu workspace.</p><input autoFocus type="password" placeholder="Masukkan password studio" value={pw} onChange={e=>setPw(e.target.value)} onKeyDown={e=>e.key==="Enter"&&login()}/><button className="primary wide" onClick={login}>Masuk ke Studio</button><small>Studio privat · password awal: 123456789</small></div></main>;

 return <main className="app">
  <header className="topbar">
   <div className="brand"><div className="brand-mark"><Sparkles size={18}/></div><div><b>VTUBER FORGE</b><span>Digital Character Studio</span></div></div>
   <div className="project-name"><span className="project-dot"/><input value={project} onChange={e=>setProject(e.target.value)}/><ChevronDown size={15}/></div>
   <div className="actions"><button title="Undo"><Undo2/></button><button title="Redo"><Redo2/></button><i/><button title="Buka"><FolderOpen/></button><button title="Impor"><Upload/></button><button title="Simpan" onClick={save}><Save/></button><button title="Ekspor"><Download/></button><button title="Keluar" onClick={()=>{localStorage.removeItem("vtuber-unlocked");location.reload()}}><LogOut/></button></div>
  </header>
  <section className="workspace">
   <aside className="leftbar">
    <div className="tool-group"><small>CREATE</small><button className={tab==="model"?"active":""} onClick={()=>setTab("model")}><Box/><span>Model</span></button><button className={tab==="paint"?"active":""} onClick={()=>setTab("paint")}><Brush/><span>Paint</span></button><button><Move3D/><span>Transform</span></button></div>
    <div className="tool-group"><small>RIG</small><button className={tab==="rig"?"active rig-active":""} onClick={()=>setTab("rig")}><GitBranch/><span>Rigging</span></button><button><Layers/><span>Pose</span></button><button><Smile/><span>Face</span></button></div>
    <div className="spacer"/><button><Settings/><span>Pengaturan</span></button>
   </aside>
   <section className="viewport">
    <div className="viewport-tools"><div><span className="pill"><span className="dot"/> LIVE 3D</span><span className="scene-label"> {tab==="rig"?"RIG MODE":"CHARACTER MODE"}</span></div><span className="hint">Klik karakter untuk memilih · Scroll untuk zoom</span></div>
    <Stage parts={parts} selected={selected} onSelect={setSelected} rig={rig} showRig={tab==="rig"}/>
    <div className="bottom-hud"><button onClick={()=>setRig(r=>({...r,mode:!r.mode}))}>{rig.mode?"Rig ON":"Rig OFF"}</button><button>Front</button><button>Orbit</button><button onClick={resetRig}>Reset</button></div>
    <div className="viewport-card"><b>{project}</b><span>{tab==="rig"?"Skeleton & controls aktif":"Preview karakter"}</span></div>
   </section>
   <aside className="inspector">
    <div className="panel-head"><div><p className="eyebrow">{tab==="rig"?"RIGGING":"DESAIN"}</p><h2>{tab==="model"?"Model 3D":tab==="paint"?"Paint Studio":"Rig Studio"}</h2></div><WandSparkles size={20}/></div>
    {tab==="model"&&<><div className="section"><label>Bagian karakter</label><div className="parts">{parts.map(p=><button key={p.id} className={selected===p.id?"selected":""} onClick={()=>setSelected(p.id)}><span className="swatch" style={{background:p.color}}/><span>{p.name}</span><small>{p.visible?"ON":"OFF"}</small></button>)}</div></div><div className="section"><label>Properti {selectedPart.name}</label><div className="field"><span>Warna</span><input type="color" value={selectedPart.color} onChange={e=>setParts(parts.map(p=>p.id===selected?p={...p,color:e.target.value}:p))}/></div><div className="field"><span>Skala</span><input type="range" min=".7" max="1.35" step=".01" value={selectedPart.scale} onChange={e=>setParts(parts.map(p=>p.id===selected?{...p,scale:Number(e.target.value)}:p))}/></div><div className="field"><span>Terlihat</span><button className={"toggle "+(selectedPart.visible?"on":"")} onClick={()=>setParts(parts.map(p=>p.id===selected?{...p,visible:!p.visible}:p))}><i/></button></div></div></>}
    {tab==="paint"&&<><div className="section"><label>Alat gambar</label><div className="tool-grid"><button><Brush/>Brush</button><button><Brush/>Eraser</button><button><Palette/>Fill</button><button><Eye/>Picker</button></div></div><div className="section"><label>Material cepat</label><div className="chips"><button>Glossy</button><button>Matte</button><button>Cel Shade</button><button>Metal</button></div></div><div className="section"><label>Warna aksen</label><div className="palette">{["#ff5c7a","#ffb347","#6f55d9","#43d9b8","#4da3ff","#f5f5f5","#24212c","#101018"].map(c=><button key={c} style={{background:c}} onClick={()=>setParts(parts.map(p=>p.id===selected?{...p,color:c}:p))}/>)}</div></div><div className="tip"><Sparkles size={17}/><span>Fondasi paint siap dikembangkan menjadi texture painting, sticker, pattern, dan brush 3D.</span></div></>}
    {tab==="rig"&&<><div className="rig-banner"><GitBranch size={18}/><div><b>Character Rig</b><span>Skeleton kontrol karakter</span></div><button className={"toggle "+(rig.mode?"on":"")} onClick={()=>setRig(r=>({...r,mode:!r.mode}))}><i/></button></div><div className="section"><label>Bone hierarchy</label><div className="bone-tree"><button className="bone selected"><span>●</span>Root / Hips</button><button className="bone indent"><span>├</span>Spine</button><button className="bone indent"><span>├</span>Neck</button><button className="bone indent2"><span>└</span>Head</button><button className="bone indent2"><span>┌</span>Arm.L</button><button className="bone indent2"><span>┌</span>Arm.R</button><button className="bone indent2"><span>└</span>Leg.L</button><button className="bone indent2"><span>└</span>Leg.R</button></div></div><div className="section"><label>Bone controls</label>{([["head","Head"],["neck","Neck"],["spine","Spine"],["armL","Arm.L"],["armR","Arm.R"],["legL","Leg.L"],["legR","Leg.R"]] as const).map(([key,label])=><div className="field" key={key}><span>{label}</span><input type="range" min="-45" max="45" value={rig[key]} onChange={e=>updateRig(key,Number(e.target.value))}/></div>)}</div><div className="section"><label>Face rig</label><div className="field"><span>Jaw</span><input type="range" min="-30" max="45" value={rig.jaw} onChange={e=>updateRig("jaw",Number(e.target.value))}/></div><div className="field"><span>Blink</span><input type="range" min="0" max="100" value={rig.blink} onChange={e=>updateRig("blink",Number(e.target.value))}/></div></div><div className="section"><label>Expression preset</label><div className="expression-grid">{["Neutral","Happy","Angry","Sad","Surprised","Wink"].map(x=><button className={expression===x?"selected":""} key={x} onClick={()=>applyExpression(x)}><Smile size={14}/>{x}</button>)}</div><button className="reset-btn" onClick={()=>{resetRig();setExpression("Neutral")}}>Reset semua rig</button></div></>}
   </aside>
  </section>
  <footer><span><span className="status"/> Studio siap</span><span>WebGL · 3D Character Editor · Rigging Preview · Supabase Ready</span></footer>
 </main>
}