"use client";
import {useEffect,useRef,useState} from "react";
import {Eraser,Grid3X3,ImagePlus,Trash2} from "lucide-react";

export default function SketchStudio(){
 const canvasRef=useRef<HTMLCanvasElement>(null);
 const drawing=useRef(false);
 const [tool,setTool]=useState<"brush"|"eraser">("brush");
 const [size,setSize]=useState(5);
 const [opacity,setOpacity]=useState(70);
 const [grid,setGrid]=useState(true);
 const [reference,setReference]=useState<string|null>(null);
 useEffect(()=>{const c=canvasRef.current;if(!c)return;const ctx=c.getContext("2d");if(!ctx)return;const resize=()=>{const r=c.getBoundingClientRect();const d=window.devicePixelRatio||1;c.width=r.width*d;c.height=r.height*d;ctx.setTransform(d,0,0,d,0,0);ctx.lineCap="round";ctx.lineJoin="round"};resize();window.addEventListener("resize",resize);return()=>window.removeEventListener("resize",resize)},[]);
 const point=(e:React.PointerEvent<HTMLCanvasElement>)=>{const c=canvasRef.current;if(!c)return;const r=c.getBoundingClientRect();return{x:e.clientX-r.left,y:e.clientY-r.top}};
 const down=(e:React.PointerEvent<HTMLCanvasElement>)=>{const p=point(e);if(!p)return;drawing.current=true;const ctx=canvasRef.current?.getContext("2d");if(!ctx)return;ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.strokeStyle=tool==="eraser"?"#000":"#f7f3ff";ctx.globalCompositeOperation=tool==="eraser"?"destination-out":"source-over";ctx.globalAlpha=opacity/100;ctx.lineWidth=size};
 const move=(e:React.PointerEvent<HTMLCanvasElement>)=>{if(!drawing.current)return;const p=point(e);const ctx=canvasRef.current?.getContext("2d");if(!p||!ctx)return;ctx.lineTo(p.x,p.y);ctx.stroke()};
 const clear=()=>{const c=canvasRef.current;if(c)c.getContext("2d")?.clearRect(0,0,c.width,c.height)};
 const refChange=(e:React.ChangeEvent<HTMLInputElement>)=>{const f=e.target.files?.[0];if(!f)return;const u=URL.createObjectURL(f);setReference(u)};
 return <div className="sketch-wrap"><div className="sketch-toolbar"><button className={tool==="brush"?"selected":""} onClick={()=>setTool("brush")}>Brush</button><button className={tool==="eraser"?"selected":""} onClick={()=>setTool("eraser")}><Eraser/> Eraser</button><label className="range-mini">Size <input type="range" min="1" max="40" value={size} onChange={e=>setSize(+e.target.value)}/></label><label className="range-mini">Opacity <input type="range" min="10" max="100" value={opacity} onChange={e=>setOpacity(+e.target.value)}/></label><button onClick={()=>setGrid(v=>!v)} className={grid?"selected":""}><Grid3X3/> Grid</button><label className="file-btn"><ImagePlus/> Referensi<input type="file" accept="image/*" onChange={refChange}/></label><button onClick={clear}><Trash2/> Bersihkan</button></div><div className={"sketch-board "+(grid?"show-grid":"")}>{reference&&<img src={reference} className="reference-image" style={{opacity:opacity/100}}/>}<canvas ref={canvasRef} onPointerDown={down} onPointerMove={move} onPointerUp={()=>drawing.current=false} onPointerLeave={()=>drawing.current=false}/><div className="sketch-hint">Sketsa konsep · gambar langsung di atas canvas</div></div></div>
}