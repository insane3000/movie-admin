import img01 from "img/products/premio01.jpg";
import img02 from "img/products/premio02.jpg";
import img03 from "img/products/premio03.jpg";
import aorusMouse from "img/products/aorus-mouse.jpg";
import cargador from "img/products/cargador.jpg";
import deluxHeadphone from "img/products/delux-headphone.jpg";
// import hdmiConverter from "img/products/hdmi-converter.jpg";
// import headphone from "img/products/headphone.jpg";
import marvoMouse from "img/products/marvo-mouse.jpg";
import speaker from "img/products/speaker.jpg";
import keepCalm from "img/products/keepCalm.jpeg";

interface Product {
  img: string;
  title: string;
  description: string;
  price: number;
}
export type ProductsInterface = Product[];
const steamDescription =
  "Para reclamar las tarjetas de Steam tienes que agregar a esta cuenta de Dota 2. ID: 124814842";
export const Products: ProductsInterface = [
  {
    price: 190,
    title: "Tarjeta Steam de 25$",
    description: steamDescription,
    img: img01,
  },
  {
    price: 375,
    title: "Tarjeta Steam de 50$",
    description: steamDescription,
    img: img02,
  },
  {
    price: 750,
    title: "Tarjeta Steam de 100$",
    description: steamDescription,
    img: img03,
  },
  {
    price: 666,
    title: "PROXIMAMENTE",
    description: "Solo calmate y sigue carreando!",
    img: keepCalm,
  },
  {
    price: 250,
    title: "Auricular Delux DGH500",
    description: "Con almohadillas suaves hechas a mano de alta gama.",
    img: deluxHeadphone,
  },

  {
    price: 450,
    title: "Mouse Aourus M3",
    description: "Sensor óptico de 6400 DPI de grado entusiasta (Pixart 3988).",
    img: aorusMouse,
  },

  // {
  //   price: 60,
  //   title: "Audifonos Super bass C8",
  //   description: "Audifonos con buena calidad de sonido y fuertes bajos.",
  //   img: headphone,
  // },
  {
    price: 40,
    title: "CARGADOR SAMSUNG",
    description: "Cargador de entrada normal.",
    img: cargador,
  },
  // {
  //   price: 80,
  //   title: "Conversor de VGA a HDMI",
  //   description: "Convierte de vga a hdmi, no necesita energia externa.",
  //   img: hdmiConverter,
  // },
  {
    price: 50,
    title: "Mouse Marvo G906",
    description: "Mouse gamer de gama baja",
    img: marvoMouse,
  },
  {
    price: 120,
    title: "Parlante modelo 515",
    description: "Parlante portatil Bluethoot, acepta tarjetas micro SD.",
    img: speaker,
  },
];
