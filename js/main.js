import { getTimeByZone } from "./utils/getTimeByZone.js";

const hideHudTime = 300000;

const container = document.querySelector(".container");
const marqueeWrapper = document.querySelector(".marquee-wrapper");
const marquee = document.querySelector(".marquee");
const messageAuthor = document.querySelector(".message__author");
const timeEl = document.querySelector(".info__time");

let marqueeIndex = 0;

const hideMarquee = () => {
  marqueeWrapper.style.opacity = 0;
  messageAuthor.style.opacity = 0;
};

const allowMarquee = (messages) => {
  marqueeWrapper.style.opacity = 1;
  messageAuthor.style.opacity = 1;
  marquee.innerText = messages[marqueeIndex++];

  if (marqueeIndex >= messages.length) {
    marqueeIndex = 0;
  }

  const wrapperWidth = marqueeWrapper.offsetWidth;
  const marqueeWidth = marquee.offsetWidth;
  const animationTime = (marqueeWidth / 40) * 1000;

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

  return new Promise((res) =>
    animation.addEventListener("finish", () => {
      hideMarquee();
      res();
    })
  );
};

const allowCurrentInfo = () => {
  timeEl.innerText = `Moscow - ${getTimeByZone("Europe/Moscow")}`;

  setInterval(
    () => (timeEl.innerText = `Moscow - ${getTimeByZone("Europe/Moscow")}`),
    60000
  );
};

const showHud = async (messages) => {
  container.style.opacity = 1;

  allowCurrentInfo();
  await allowMarquee(messages);

  container.style.opacity = 0;

  return Promise.resolve();
};

const hudLoop = async (messages) => {
  await showHud(messages);

  setTimeout(() => hudLoop(messages), hideHudTime);
};

const start = async () => {
  const res = await fetch("data.json");
  const data = await res.json();

  if (data) {
    setTimeout(() => hudLoop(data.messages), hideHudTime);
  }
};

start();
