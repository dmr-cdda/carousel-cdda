export type CardsStyleTypes = {
    className: string;
    desktopCard: number;
    mobileCard: number;
    tabletCard: number;
    style: {};
    styleMob: {};
    styleTab: {};
}

export const cardsStyle : CardsStyleTypes = {
  className : "flex transition-all duration-500 md:duration-1000 ease-in-out gap-10 px-6 my-10",
  desktopCard : 100/4,
  mobileCard : 100/1,
  tabletCard : 100/2,
  style : {},
  styleMob : {}, 
  styleTab : {}
};