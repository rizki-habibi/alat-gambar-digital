"use client";
import {useEffect,useMemo,useState} from "react";
import dynamic from "next/dynamic";
import {Box,ChevronDown,Download,FolderOpen,Layers,LogOut,Palette,Save,Settings,SlidersHorizontal,Sparkles,Upload,UserRound,WandSparkles} from "lucide-react";
const Stage=dynamic(()=>import("./stage"),{ssr:false});

type Part={id:string;name:string;kind:"head"|"hair"|"body"|"eyes"|"accessory";visible:boolean;color:string;scale:number};
const initial:Part[]=[
{id:"head",name:"Kepala",kind:"head",visible:true,color:"#f4c7aa",scale:1},
{id:"hair",name:"Rambut",kind:"hair",visible:true,color:"#30213f",scale:1.05},
{id:"eyes",name:"Mata",kind:"eyes",visible:true,color:"#6f55d9",scale:1},
{id:"body",name:"Badan",kind:"body",visible:true,color:"#7c4dff",scale:1},
{id:"accessory",name:"Aksesori",kind:"accessory",visible:true,color:"#ffb347",scale:1},
];

export default function Home(){
 const [locked,setLocked]=useState(true); const [pw,setPw]=useState(""); const [tab,setTab]=useState<"model"|"paint"|"rig">("model");
 const [parts,setParts]=useState(initial); const [selected,setSelected]=useState("head"); const [project,setProject]=useState("Karakter Baru");
 const selectedPart=useMemo(()=>parts.find(p=>p.id===selected)||parts[0],[parts,selected]);
 useEffect(()=>{setLocked(localStorage.getItem("vtuber-unlocked")!=="1")},[]);
 const login=()=>{if(pw==="123456789"){localStorage.setItem("vtuber-unlocked","1");setLocked(false)}};
 const save=()=>localStorage.setItem("vtuber-draft",JSON.stringify({project,parts}));
 useEffect(()=>{const raw=localStorage.getItem("vtuber-draft");if(raw){try{const d=JSON.parse(raw);setProject(d.project);setParts(d.parts)}catch{}}},[]);
 if(locked)return <main className="gate"><div className="gate-card"><div className="logo"><Sparkles/></div><p className="eyebrow">VTUBER FORGE</p><h1>Bangun karakter 3D-mu sendiri.</h1><p className="muted">Studio desain karakter bergaya kreatif untuk membuat avatar VTuber langsung dari browser.</p><input autoFocus type="password" placeholder="Masukkan password" value={pw} onChange={e=>setPw(e.target.value)} onKeyDown={e=>e.key==="Enter"&&login()}/><button className="primary wide" onClick={login}>Masuk ke Studio</button><small>Studio privat · password awal: 123456789</small></div></main>;
 return <main className="app">
  <header className="topbar"><div className="brand"><div className="brand-mark"><Sparkles size={18}/></div><div><b>VTUBER FORGE</b><span>Digital Character Studio</span></div></div><div className="project-name"><input value={project} onChange={e=>setProject(e.target.value)}/><ChevronDown size={15}/></div><div className="actions"><button title="Buka"><FolderOpen/></button><button title="Impor"><Upload/></button><button title="Simpan" onClick={save}><Save/></button><button title="Ekspor"><Download/></button><button title="Keluar" onClick={()=>{localStorage.removeItem("vtuber-unlocked");location.reload()}}><LogOut/></button></div></header>
  <section className="workspace">
   <aside className="leftbar"><button className={tab==="model"?"active":""} onClick={()=>setTab("model")}><Box/><span>Model</span></button><button className={tab==="paint"?"active":""} onClick={()=>setTab("paint")}><Palette/><span>Paint</span></button><button className={tab==="rig"?"active":""} onClick={()=>setTab("rig")}><SlidersHorizontal/><span>Rig</span></button><div className="spacer"/><button><Settings/><span>Pengaturan</span></button></aside>
   <section className="viewport"><div className="viewport-tools"><span className="pill"><span className="dot"/> LIVE 3D</span><span className="hint">Klik bagian karakter untuk memilih</span></div><Stage parts={parts} selected={selected} onSelect={setSelected}/><div className="bottom-hud"><button>Front</button><button>Orbit</button><button>Reset View</button></div></section>
   <aside className="inspector"><div className="panel-head"><div><p className="eyebrow">DESAIN</p><h2>{tab==="model"?"Model 3D":tab==="paint"?"Paint Studio":"Rig & Pose"}</h2></div><WandSparkles size={20}/></div>
    {tab==="model"&&<><div className="section"><label>Bagian karakter</label><div className="parts">{parts.map(p=><button key={p.id} className={selected===p.id?"selected":""} onClick={()=>setSelected(p.id)}><span className="swatch" style={{background:p.color}}/><span>{p.name}</span><small>{p.visible?"ON":"OFF"}</small></button>)}</div></div><div className="section"><label>Properti {selectedPart.name}</label><div className="field"><span>Warna</span><input type="color" value={selectedPart.color} onChange={e=>setParts(parts.map(p=>p.id===selected?p.id===selected?{...p,color:e.target.value}:p:p))}/></div><div className="field"><span>Skala</span><input type="range" min=".7" max="1.35" step=".01" value={selectedPart.scale} onChange={e=>setParts(parts.map(p=>p.id===selected?{...p,scale:Number(e.target.value)}:p))}/></div><div className="field"><span>Terlihat</span><button className={"toggle "+(selectedPart.visible?"on":"")} onClick={()=>setParts(parts.map(p=>p.id===selected?{...p,visible:!p.visible}:p))}><i/></button></div></div></>}
    {tab==="paint"&&<><div className="section"><label>Material cepat</label><div className="chips"><button>Glossy</button><button>Matte</button><button>Cel Shade</button><button>Metal</button></div></div><div className="section"><label>Warna aksen</label><div className="palette">{["#ff5c7a","#ffb347","#6f55d9","#43d9b8","#4da3ff","#f5f5f5","#24212c","#101018"].map(c=><button key={c} style={{background:c}} onClick={()=>setParts(parts.map(p=>p.id===selected?{...p,color:c}:p))}/>)}</div></div><div className="tip"><Sparkles size={17}/><span>Mode paint berikutnya dapat dikembangkan menjadi texture painting, pattern, sticker, dan brush 3D.</span></div></>}
    {tab==="rig"&&<><div className="section"><label>Pose</label><div className="chips"><button>Idle</button><button>Wave</button><button>Happy</button><button>Thinking</button></div></div><div className="section"><label>Parameter</label><div className="field"><span>Kepala</span><input type="range"/></div><div className="field"><span>Bahu</span><input type="range"/></div><div className="field"><span>Mata</span><input type="range"/></div></div></>}
   </aside>
  </section>
  <footer><span><span className="status"/> Studio siap</span><span>WebGL · 3D Character Editor · Supabase Ready</span></footer>
 </main>
}