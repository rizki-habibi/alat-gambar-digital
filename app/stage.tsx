"use client";
import {Canvas} from "@react-three/fiber";
import {OrbitControls,Environment,ContactShadows,Float} from "@react-three/drei";
import {useMemo} from "react";
import * as THREE from "three";

type Part={id:string;name:string;kind:string;visible:boolean;color:string;scale:number};
type Rig={mode:boolean;head:number;neck:number;spine:number;armL:number;armR:number;legL:number;legR:number;jaw:number;blink:number};

function Bone({a,b,rotation=0,color="#b98cff"}:{a:[number,number,number];b:[number,number,number];rotation?:number;color?:string}){
 const start=new THREE.Vector3(...a),end=new THREE.Vector3(...b),mid=start.clone().add(end).multiplyScalar(.5),len=start.distanceTo(end);
 return <group position={mid} rotation={[0,0,rotation]}><mesh><cylinderGeometry args={[.035,.05,len,10]}/><meshBasicMaterial color={color}/></mesh><mesh position={[0,len/2,0]}><sphereGeometry args={[.09,12,12]}/><meshBasicMaterial color={color}/></mesh></group>;
}

function RigOverlay({rig}:{rig:Rig}){
 const rad=(n:number)=>n*Math.PI/180;
 return <group>
  <Bone a={[0,.9,0]} b={[0,1.55,0]} rotation={rad(rig.spine)}/>
  <Bone a={[0,1.55,0]} b={[0,2.0,0]} rotation={rad(rig.neck)}/>
  <Bone a={[0,2.0,0]} b={[0,2.55,0]} rotation={rad(rig.head)} color="#ff6fb5"/>
  <Bone a={[-.05,1.62,0]} b={[-.72,1.35,0]} rotation={rad(rig.armL)} />
  <Bone a={[.05,1.62,0]} b={[.72,1.35,0]} rotation={rad(-rig.armR)} />
  <Bone a={[-.28,.7,0]} b={[-.48,-.05,0]} rotation={rad(rig.legL)} />
  <Bone a={[.28,.7,0]} b={[.48,-.05,0]} rotation={rad(-rig.legR)} />
  <mesh position={[0,1.62,.06]}><sphereGeometry args={[.11,16,16]}/><meshBasicMaterial color="#7df7cf"/></mesh>
 </group>;
}

export default function Stage({parts,selected,onSelect,rig,showRig}:{parts:Part[];selected:string;onSelect:(id:string)=>void;rig:Rig;showRig:boolean}){
 const get=(id:string)=>parts.find(p=>p.id===id);
 const jaw=1+rig.jaw/180, blink=Math.max(.08,1-rig.blink/100);
 return <Canvas camera={{position:[0,1.35,5],fov:34}} shadows gl={{antialias:true}}>
  <color attach="background" args={["#09080f"]}/><ambientLight intensity={1.8}/><directionalLight position={[3,5,4]} intensity={3} castShadow/><Environment preset="city"/>
  <Float speed={1.2} rotationIntensity={.05} floatIntensity={.08}>
   <group position={[0,-1.2,0]} rotation={[0,0,rig.spine*Math.PI/180]}>
    {get("body")?.visible&&<mesh position={[0,.85,0]} scale={get("body")!.scale} onClick={()=>onSelect("body")}><capsuleGeometry args={[.68,.95,8,24]}/><meshStandardMaterial color={get("body")!.color} roughness={.55}/></mesh>}
    {get("head")?.visible&&<mesh position={[0,2.35,0]} scale={[get("head")!.scale*jaw,get("head")!.scale,get("head")!.scale]} rotation={[0,0,rig.head*Math.PI/180]} onClick={()=>onSelect("head")}><sphereGeometry args={[1,48,32]}/><meshStandardMaterial color={get("head")!.color} roughness={.5}/></mesh>}
    {get("hair")?.visible&&<mesh position={[0,2.65,-.08]} scale={[1.03*get("hair")!.scale,1.02*get("hair")!.scale,.9*get("hair")!.scale]} onClick={()=>onSelect("hair")}><sphereGeometry args={[1.03,48,24,0,Math.PI*2,0,Math.PI*.65]}/><meshStandardMaterial color={get("hair")!.color} roughness={.65}/></mesh>}
    {get("eyes")?.visible&&<><mesh position={[-.34,2.38,.91]} scale={[.22,.34*blink,.08]} onClick={()=>onSelect("eyes")}><sphereGeometry args={[1,32,20]}/><meshStandardMaterial color={get("eyes")!.color} emissive={get("eyes")!.color} emissiveIntensity={.12}/></mesh><mesh position={[.34,2.38,.91]} scale={[.22,.34*blink,.08]} onClick={()=>onSelect("eyes")}><sphereGeometry args={[1,32,20]}/><meshStandardMaterial color={get("eyes")!.color} emissive={get("eyes")!.color} emissiveIntensity={.12}/></mesh></>}
    {get("accessory")?.visible&&<mesh position={[0,3.28,.05]} rotation={[0,0,.18]} scale={get("accessory")!.scale} onClick={()=>onSelect("accessory")}><torusGeometry args={[.55,.1,16,48]}/><meshStandardMaterial color={get("accessory")!.color} metalness={.5} roughness={.25}/></mesh>}
    {showRig&&<RigOverlay rig={rig}/>}
   </group>
  </Float>
  <ContactShadows position={[0,-1.22,0]} opacity={.45} scale={6} blur={2}/><OrbitControls enablePan={false} minDistance={3.2} maxDistance={7}/>
 </Canvas>;
}