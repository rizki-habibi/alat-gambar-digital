"use client";
import {Canvas} from "@react-three/fiber"; import {OrbitControls,Environment,ContactShadows,Float} from "@react-three/drei"; import {useMemo} from "react"; import * as THREE from "three";
type Part={id:string;name:string;kind:string;visible:boolean;color:string;scale:number};
export default function Stage({parts,selected,onSelect}:{parts:Part[];selected:string;onSelect:(id:string)=>void}){
 const get=(id:string)=>parts.find(p=>p.id===id);
 return <Canvas camera={{position:[0,1.35,5],fov:34}} shadows gl={{antialias:true}}><color attach="background" args={["#0b0a11"]}/><ambientLight intensity={1.8}/><directionalLight position={[3,5,4]} intensity={3} castShadow/><Environment preset="city"/>
  <Float speed={1.2} rotationIntensity={.08} floatIntensity={.12}>
   <group position={[0,-1.2,0]}>
    {get("body")?.visible&&<mesh position={[0,.85,0]} scale={get("body")!.scale} onClick={()=>onSelect("body")}><capsuleGeometry args={[.68,.95,8,24]}/><meshStandardMaterial color={get("body")!.color} roughness={.55}/></mesh>}
    {get("head")?.visible&&<mesh position={[0,2.35,0]} scale={get("head")!.scale} onClick={()=>onSelect("head")}><sphereGeometry args={[1,48,32]}/><meshStandardMaterial color={get("head")!.color} roughness={.5}/></mesh>}
    {get("hair")?.visible&&<mesh position={[0,2.65,-.08]} scale={[1.03*get("hair")!.scale,1.02*get("hair")!.scale,.9*get("hair")!.scale]} onClick={()=>onSelect("hair")}><sphereGeometry args={[1.03,48,24,0,Math.PI*2,0,Math.PI*.65]}/><meshStandardMaterial color={get("hair")!.color} roughness={.65}/></mesh>}
    {get("eyes")?.visible&&<><mesh position={[-.34,2.38,.91]} scale={[.22,.34,.08]} onClick={()=>onSelect("eyes")}><sphereGeometry args={[1,32,20]}/><meshStandardMaterial color={get("eyes")!.color} emissive={get("eyes")!.color} emissiveIntensity={.12}/></mesh><mesh position={[.34,2.38,.91]} scale={[.22,.34,.08]} onClick={()=>onSelect("eyes")}><sphereGeometry args={[1,32,20]}/><meshStandardMaterial color={get("eyes")!.color} emissive={get("eyes")!.color} emissiveIntensity={.12}/></mesh></>}
    {get("accessory")?.visible&&<mesh position={[0,3.28,.05]} rotation={[0,0,.18]} scale={get("accessory")!.scale} onClick={()=>onSelect("accessory")}><torusGeometry args={[.55,.1,16,48]}/><meshStandardMaterial color={get("accessory")!.color} metalness={.5} roughness={.25}/></mesh>}
   </group>
  </Float><ContactShadows position={[0,-1.22,0]} opacity={.45} scale={6} blur={2}/><OrbitControls enablePan={false} minDistance={3.2} maxDistance={7}/>
 </Canvas>
}