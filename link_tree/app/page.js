import { Poppins } from "next/font/google";
import Image from "next/image";
import { poppins } from "./layout";
import Page1 from "./components/pages/Page_1"
import Page2 from "./components/pages/page_2"
import styles from "../Carousel.module.css"

export default function Home() {
  return (
    <main className={`flex flex-col gap-2.5 }`}>
      <Page1/>
      <Page2/>
    </main>

  );
}

export const metadata = {
  title: "BitTree - Your Favourite Link Sharing Site",
  description: "We Brought A Revolution In Link Sharing",
};
