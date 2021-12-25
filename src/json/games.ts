import apex from "img/games/apex.jpg";
import csgo from "img/games/csgo.jpg";
import dota from "img/games/dota.jpg";
import fortnite from "img/games/fortnite.jpg";
import lol from "img/games/lol.jpg";
import pubg from "img/games/pubg.jpg";
import wow from "img/games/wow.jpg";

interface Game {
  img: string;
  title: string;
  href: string;
}
export type GamesInterface = Game[];

export const Games: GamesInterface = [
  {
    title: "dota",
    img: dota,
    href: "https://es.dota2.com/",
  },
  {
    title: "lol",
    img: lol,
    href: "https://na.leagueoflegends.com/",
  },
  {
    title: "apex",
    img: apex,
    href: "https://www.ea.com/es-es/titles/apex-legends",
  },
  {
    title: "wow",
    img: wow,
    href: "https://worldofwarcraft.com/es-es/",
  },
  {
    title: "pugb",
    img: pubg,
    href: "https://www.pubg.com/es/",
  },
  {
    title: "fortnite",
    img: fortnite,
    href: "https://www.epictitles.com/fortnite/es-ES/home",
  },
  {
    title: "csgo",
    img: csgo,
    href: "https://store.steampowered.com/app/730/CounterStrike_Global_Offensive/?l=spanish",
  },
];
