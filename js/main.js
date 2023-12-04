import { getTimeByZone } from "./utils/getTimeByZone.js";

const hideMarqueeTime = 30000;

const marqueeWrapper = document.querySelector(".marquee-wrapper");
const marquee = document.querySelector(".marquee");
const messageAuthor = document.querySelector(".message__author");
const timeEl = document.querySelector(".info__time");

let marqueeIndex = 0;

const allowMarquee = (messages) => {
  console.log(marqueeIndex);
  marqueeWrapper.style.opacity = 1;
  messageAuthor.style.opacity = 1;
  marquee.innerText = messages[marqueeIndex++];

  if (marqueeIndex >= messages.length) {
    marqueeIndex = 0;
  }

  const wrapperWidth = marqueeWrapper.offsetWidth;
  const marqueeWidth = marquee.offsetWidth;
  const animationTime = (marqueeWidth / 40) * 1000;

  console.log(animationTime);

  const animation = marquee.animate(
    [
      {
        transform: `translateX(${wrapperWidth}px)`,
      },
      {
        transform: `translateX(-${marqueeWidth}px)`,
      },
    ],
    {
      duration: animationTime,
    }
  );

  animation.addEventListener("finish", () => {
    marqueeWrapper.style.opacity = 0;
    messageAuthor.style.opacity = 0;
    setTimeout(() => allowMarquee(messages), hideMarqueeTime);
  });
};

const allowCurrentInfo = () => {
  timeEl.innerText = `Moscow - ${getTimeByZone("Europe/Moscow")}`;

  setInterval(
    () => (timeEl.innerText = `Moscow - ${getTimeByZone("Europe/Moscow")}`),
    60000
  );
};

const start = async () => {
  const res = await fetch("data.json");
  const data = await res.json();

  if (data) {
    allowMarquee(data.messages);
    allowCurrentInfo();
  }
};

start();
