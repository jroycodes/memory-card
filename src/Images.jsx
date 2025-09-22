import { useState } from "react";
import "./styles.css";

export default function Images() {
  const allImages = [
    "/images/Aang.jpg",
    "/images/Appa.jpg",
    "/images/Azula.jpg",
    "/images/Bumi.jpg",
    "/images/Cabbage-man.jpg",
    "/images/Iroh.jpg",
    "/images/Jet.jpg",
    "/images/Katara.jpg",
    "/images/Mai.jpg",
    "/images/Momo.jpg",
    "/images/Ozai.jpg",
    "/images/Roku.jpg",
    "/images/Sokka.jpg",
    "/images/Suki.jpg",
    "/images/Toph.jpg",
    "/images/tyLee.jpg",
    "/images/Yue.jpg",
    "/images/Zuko.jpg",
    "/images/Kyoshi.jpg",
    "/images/Zhao.jpg",
  ];

  const [images, setImages] = useState(allImages);
  const [clickedImages, setClickedImages] = useState(new Set());
  const [currentScore, setCurrentScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);

  function shuffleArray(arr) {
    const shuffled = [...arr];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  function handleClick(image) {
    if (clickedImages.has(image)) {
      if (currentScore > bestScore) setBestScore(currentScore);
      setCurrentScore(0);
      setClickedImages(new Set());
    } else {
      setCurrentScore((prev) => prev + 1);
      setClickedImages((prev) => new Set(prev).add(image));
    }
    setImages(shuffleArray(images));
  }

  return (
    <>
      <div className="font-avatar text-xl flex justify-between m-4 p-8 sticky top-0 bg-white/50 backdrop-blur-md z-50 shadow">
        <div>
          <h1 className="text-4xl mb-4">Avatar Memory Game</h1>
          <p>
            Get points by clicking on an image but don't click on any more than
            once!
          </p>
        </div>
        <div>
          <p>Current Score {currentScore}</p>
          <p>Best Score {bestScore}</p>
        </div>
      </div>
      <div className="flex flex-col items-center">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {images.map((src, index) => {
            const name = src.split("/").pop().replace(".jpg", "");
            return (
              <div
                key={index}
                className="relative w-40 h-40 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-50 lg:h-50 mx-auto bg-center bg-no-repeat bg-contain rounded cursor-pointer"
                style={{ backgroundImage: `url(${src})` }}
                onClick={() => handleClick(src)}
              >
                <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-md text-center py-1 rounded-b">
                  {name}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
