import { CardProps } from '@/data/cards';
import React, { useEffect, useState } from 'react';

export type CardTypes = {
    card : CardProps
};

const style = {
  card : {
    id: "card",
    className : "card w-full md:w-1/3 shadow-lg",
    style : {marginTop : "20px", marginBottom : "20px", marginLeft : "40px", marginRight : "40px", overflow : "hidden", border: "1px solid gray", borderRadius: "5px"},
    styleMob : {marginTop : "20px", marginBottom : "20px", marginLeft : "10px", marginRight : "10px", overflow : "hidden", border: "1px solid gray", borderRadius: "5px"},
    styleTab : {marginTop : "20px", marginBottom : "20px", marginLeft : "10px", marginRight : "10px", overflow : "hidden", border: "1px solid gray", borderRadius: "5px"},
  
    body : {
      id: "card-body",
      className : "card-body",
      style : {padding : "1.5rem 1rem"},
      styleMob : {padding : "1.5rem 1rem"},
      styleTab : {padding : "1.5rem 1rem"},

      thumbnail : {
      id: "card-image",
      className : "card-image",
      style : { width : "100%", height : "15rem"},
      styleMob : { width : "100%", height : "15rem"},
      styleTab : { width : "100%", height : "15rem"}
      },

      title : {
        id: "card-title",
        className : "card-title",
        style: {marginBottom : "0.5rem", fontWeight : "500", fontSize: "1.25rem"},
        styleMob : {marginBottom : "0.5rem", fontWeight : "500", fontSize: "1.25rem"},
        styleTab : {marginBottom : "0.5rem", fontWeight : "500", fontSize: "1.25rem"},
      },
  
      description : {
        id: "card-description",
        className : "card-description text-gray-700 text-base",
        style : {},
        styleMob : {},
        styleTab : {}
      },
  
      tags : {
        id: "card-tags",
        className : "",
        style : {paddingRight : "1.5rem", paddingLeft: "1.5rem", paddingTop : "1rem", paddingBottom : "0.5rem"},
        styleMob : {paddingRight : "1.5rem", paddingLeft: "1.5rem", paddingTop : "1rem", paddingBottom : "0.5rem"},
        styleTab : {paddingRight : "1.5rem", paddingLeft: "1.5rem", paddingTop : "1rem", paddingBottom : "0.5rem"},

        tag : {
          id: "card-tag",
          className : "card-tags inline-block cursor-pointer bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 hover:bg-green-600 hover:text-white transition-all duration-150",
          style : {},
          styleMob : {},
          styleTab : {}
        }
      }
  }
  },
};

const Card = ({card} : CardTypes) => {
  const {id, image, title, description, tags} = card || {};

  // styles states
  const [cardStyleState, setCardStyleState] = useState({});
  const [cardBodyStyleState, setCardBodyStyleState] = useState({});
  const [thumbnailStyleState, setThumbnailStyleState] = useState({});
  const [titleStyleState, setTitleStyleState] = useState({});
  const [descriptionStyleState, setDescriptionStyleState] = useState({});
  const [tagsStyleState, setTagsStyleState]  = useState({});
  const [tagStyleState, setTagStyleState] = useState({});


  // styles
  const { card : cardStyle } = style || {};
  const {body : bodyStyle, style : cardStylePc, styleMob : cardStyleMob, styleTab:cardStyleTab} = cardStyle || {};
  const {thumbnail, title: bodyTitleStyle, description : bodyDescriptionStyle, tags : tagsStyle} = bodyStyle || {};
  const {style : bodySectionStyle, className : bodyClassName, styleMob : bodyStyleMob, styleTab : bodyStyleTab} = bodyStyle || {};
  const {className: thumbnailClassName, style : thumbnailStyle, styleMob : thumbnailStyleMob, styleTab : thumbnailStyleTab} = thumbnail || {};
  const {className: titleClassName, style : titleStyle, styleMob : titleStyleMob, styleTab : titleStyleTab} = bodyTitleStyle || {};
  const {className: descriptionClassName, style : descriptionStyle, styleMob : descriptionStyleMob, styleTab : descriptionStyleTab} = bodyDescriptionStyle || {};
  const {className : tagsContainerClassName, style : tagsContainerStyle, tag, styleMob : tagsStyleMob, styleTab : tagsStyleTab } = tagsStyle || {};
  const {className : tagClassName, style : tagStyle, styleMob : tagStyleMob, styleTab : tagStyleTab} = tag || {};

  // style handlers
    const defaultScreenView = () =>{
        setCardStyleState(cardStylePc)
        setCardBodyStyleState(bodySectionStyle);
        setThumbnailStyleState(thumbnailStyle);
        setTitleStyleState(titleStyle);
        setDescriptionStyleState(descriptionStyle);
        setTagsStyleState(tagsContainerStyle);
        setTagStyleState(tagStyle);
    };

    const mobileScrrenView = () =>{
      setCardStyleState(cardStyleMob);
        setCardBodyStyleState(bodyStyleMob);
        setThumbnailStyleState(thumbnailStyleMob);
        setTitleStyleState(titleStyleMob);
        setDescriptionStyleState(descriptionStyleMob);
        setTagsStyleState(tagsStyleMob);
        setTagStyleState(tagStyleMob);
    }

    const tabScreenView = () =>{
        setCardStyleState(cardStyleTab);
        setCardBodyStyleState(bodyStyleTab);
        setThumbnailStyleState(thumbnailStyleTab);
        setTitleStyleState(titleStyleTab);
        setDescriptionStyleState(descriptionStyleTab);
        setTagsStyleState(tagsStyleTab);
        setTagStyleState(tagStyleTab);
    };


  // effect for styles state depending on device screen
  useEffect(() => {
    function handleResize() {
      // checking window width is mobile screen or not
      if (window.innerWidth < 640) {
        mobileScrrenView();
      }else if(window.innerWidth < 1048){
        // checking window width is tab screen or not
        tabScreenView();
      } 
      else {
        defaultScreenView();
      }
    }

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);


  return (
      <div className={cardStyle.className} style={cardStyleState}>
        <img className={thumbnailClassName} src={image} alt={title} style={thumbnailStyleState}/>
        <div className={bodyClassName} style={cardBodyStyleState}>
          <div className={titleClassName} style={titleStyleState}>{title}</div>
          <p className={descriptionClassName} style={descriptionStyleState}>
            {description}
          </p>
        </div>
        <div className={tagsContainerClassName} style={tagsStyleState}>
          {
            tags.map((tag, i)=><span key={i} className={tagClassName} style={tagStyleState}>#{tag}</span>)
          }
        </div>
      </div>
  )
}

export default Card