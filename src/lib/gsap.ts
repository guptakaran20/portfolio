import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";
import { useGSAP } from "@gsap/react";

// Register plugins immediately
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, TextPlugin);
}
gsap.registerPlugin(ScrollTrigger, TextPlugin);
export { gsap, ScrollTrigger, TextPlugin, useGSAP };
export default gsap;
