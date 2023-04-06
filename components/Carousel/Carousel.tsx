import React, { useState, useEffect } from "react";
import Navigation from "./Navigation";
import Card from "../Card";
import { carousel as carouselData } from "@/data/carousel";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

const Carousel = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [cardsPerPage, setCardsPerPage] = useState(3);
  const {nextPrev, padding, cards : carouselCards, navigation} = carouselData || {};
  const [mobile, setMobile] = useState(false);

  // effect for detecting screen sizes
  useEffect(() => {
    function handleResize() {
      setCurrentPage(0);
      // checking window width is mobile screen or not
      if (window.innerWidth < 640) {
        setMobile(true);
        setCardsPerPage(1);
      } else {
        setMobile(false);
        setCardsPerPage(3);
      }
    }

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const previousPage = () => {
    const page =
      (currentPage - 1 + Math.ceil(carouselCards.length / cardsPerPage)) %
      Math.ceil(carouselCards.length / cardsPerPage);
    setCurrentPage(page);
  };

  const nextPage = () => {
    const page = (currentPage + 1) % Math.ceil(carouselCards.length / cardsPerPage);
    console.log(currentPage + 1, carouselCards.length, cardsPerPage, page);
    
    setCurrentPage(page);
  };

  const startIndex = currentPage * cardsPerPage;
  const endIndex = Math.min(startIndex + cardsPerPage, carouselCards.length);
  
  const totalPage = Math.ceil(carouselCards.length / cardsPerPage);

  const handleNavigate = (i: number) => {
    setCurrentPage(i);
  };

    // decide what to render
  let content = null;

  if(!mobile) content = carouselCards.map((card) => (
              <Card key={card.id} card={card} />
            ));
  
  if(mobile) content = carouselCards.slice(startIndex, endIndex).map((card) => (
              <Card key={card.id} card={card} />
            ));
      
  
  return (
    <>
      <div className="relative">
        <div className={`overflow-hidden w-full ${padding && "px-4 md:px-12"}`}>
            <div
            className={`flex columns-1 md:columns-3 gap-4 transition-all duration-500 ease-in-out`}
            style={{
              transform: `${!mobile ? `translateX(-${startIndex * (100 / carouselCards.length)}%)` : "none"}`,
              width : `${!mobile ? `${(carouselCards.length * 33.33)}%` : "100%"}`,
            }}
          >
            {content}
          </div>
        </div>
        {
          nextPrev && <><button
          onClick={previousPage}
          className={`hidden md:block absolute top-1/2 ${!padding ? "left-8" : "left-0"} transform -translate-y-1/2 z-10 p-2 rounded-full bg-gray-800 text-white hover:bg-green-500 transition-all duration-150`}
        >
          <BsChevronLeft className="w-8 h-8" />
        </button>
        <button
          onClick={nextPage}
          className={`hidden md:block absolute top-1/2  ${!padding ? "right-8" : "right-0"} transform -translate-y-1/2 z-10 p-2 rounded-full bg-gray-800 text-white  hover:bg-green-500 transition-all duration-150`}
        >
          <BsChevronRight className="w-8 h-8" />
        </button></>
        }
      </div>

      {/* navigation buttons */}
      {
        navigation.visible && <Navigation totalPage={totalPage} navigation={navigation} currentPage={currentPage} handleNavigate={handleNavigate}/>
      }
    </>
  );
};

export default Carousel;