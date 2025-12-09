import {Point} from "pixi.js";
import {lerp, randomElementFromArray, randomIntFromInterval} from "../../Utils";
import {Scene} from "../Scene";
import {Card} from "./components/Card";
import gsap from 'gsap';

const NUMBER_CARDS_TO_SHOW = 144;
const START_RANK = 2;
const END_RANK = 14;
const CARD_TYPES = ["s", "h", "d", "c"];

const CARDS_POSITION_Y = 400;
const CARD_FIRST_PILE_OFFSET = { x: -200, y: 0 };
const CARD_SECOND_PILE_OFFSET = { x: 200, y: 0 };
const CARD_COVERING_OFFSET = 10;

const MOVE_DELAY_IN_SECOND = 1;
const MOVE_DURATION_IN_SECOND = 2;

export class AceOfShadowScene extends Scene {

    private cards: Card[] = [];
    private firstPileTopCardIndex = NUMBER_CARDS_TO_SHOW - 1;
    private currentFirstPilePoint: Point;
    private currentSecondPilePoint: Point;

    public override start() {
        this.createCards();
        this.initLayout();
        this.startMovingCards();
    }

    private createCards(){
        for(let i = 0; i < NUMBER_CARDS_TO_SHOW; i++) {
            const card = new Card({
                textureBack: "card_back.png",
                textureFront: this.pickRandomCard()
            });

            this.addChild(card);
            this.cards.push(card);
        }
    }

    private pickRandomCard() {
        const rank = randomIntFromInterval(START_RANK, END_RANK);
        const type = randomElementFromArray(CARD_TYPES);
        return `card_${type}_${rank}.png`;
    }
    
    public override updateLayout(width: number, height: number) {

        // update reference points
        const middlePoint = new Point(width / 2, CARDS_POSITION_Y);
        this.currentFirstPilePoint = new Point(middlePoint.x + CARD_FIRST_PILE_OFFSET.x, middlePoint.y + CARD_FIRST_PILE_OFFSET.y);
        this.currentSecondPilePoint = new Point(middlePoint.x + CARD_SECOND_PILE_OFFSET.x, middlePoint.y + CARD_SECOND_PILE_OFFSET.y);

        this.cards.forEach(card => {

            // let the card translation animation handle the layout update
            if (card.isMoving) {
                return;
            }

            const positionX = card.isDrawn ? this.currentSecondPilePoint.x : this.currentFirstPilePoint.x;
            const positionY = card.isDrawn ? this.currentSecondPilePoint.y : this.currentFirstPilePoint.y;

            card.position.set(positionX, positionY);
        });

        const topCard: Card = this.cards[this.firstPileTopCardIndex];
        topCard.position.y += CARD_COVERING_OFFSET;
    }

    private startMovingCards() {
        this.drawCard();
    }

    /** Call recursively until all cards are drawn */
    private drawCard(){

        if (this.firstPileTopCardIndex < 0) {
            // end of the draw
            return;
        }

        this.moveCard(this.cards[this.firstPileTopCardIndex]);

        // prepare the next draw
        setTimeout(() => this.drawCard(), MOVE_DELAY_IN_SECOND * 1000);
    }

    private moveCard (card: Card) {

        this.firstPileTopCardIndex--;
        card.isMoving = true;
        card.isDrawn = true;

        // place the card above the others
        this.addChild(card);

        // update the position by handling layout changes during the animation
        const timeline = gsap.to(card, {
                duration: MOVE_DURATION_IN_SECOND,
                onUpdate: () => {
                    const timelineProgress = timeline.progress();
                    const easeProgress = this.easeInOutSine(timelineProgress);

                    if (timelineProgress == 1) {
                        // end of the animation
                        card.isMoving = false;
                        card.position.set(this.currentSecondPilePoint.x, this.currentSecondPilePoint.y);
                    } else {
                        const positionX = lerp(this.currentFirstPilePoint.x, this.currentSecondPilePoint.x, easeProgress);
                        const positionY = lerp(this.currentFirstPilePoint.y, this.currentSecondPilePoint.y, easeProgress);
                        card.position.set(positionX, positionY);
                    }
                }
            })
        ;
    }

    private easeInOutSine(x: number): number {
        return -(Math.cos(Math.PI * x) - 1) / 2;
    }

}