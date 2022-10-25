import React, { useState } from "react";
import { ControlSection } from "./components/ControlSection";
import { ListImage } from "./components/ListImages";
import { ImgAPI, useFetchImages } from "./hooks/useFetchImages";
import Imgix from "react-imgix";
import { ImgixListProvider } from "./components/Imgix";
import "./App.css";

export function App() {
  const imgList = useFetchImages();
  const [imgixProps, setImgixProps] = useState<any>();
  const [currentItem, setCurrentItem] = useState<ImgAPI | undefined>();

  return (
    <>
      <header className="header">
        <h1 className="header__h1">Challenge Imgix</h1>
      </header>
      <section className="section">
        <ListImage
          list={imgList}
          onSelectItem={(item) => setCurrentItem(item)}
        />
      </section>

      <main className="main">
        <ImgixListProvider
          updateUrl={(paramsProps) => setImgixProps(paramsProps)}
        >
          <ControlSection />
        </ImgixListProvider>

        {currentItem ? (
          <Imgix src={currentItem.url} sizes="50vw" imgixParams={imgixProps} />
        ) : null}
        {currentItem?.name}
      </main>

      <footer></footer>
    </>
  );
}
