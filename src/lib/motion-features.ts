// Chargé à la demande par <LazyMotion> : le moteur d'animation (surtout les
// layout animations de layoutId) sort du bundle initial au lieu de bloquer
// le thread principal pendant l'hydratation sur mobile.
import { domMax } from "motion/react";

export default domMax;
