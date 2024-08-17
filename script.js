let mouseFollowerTimerID;
const minicircle = document.querySelector("#minicircle");

const scroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true,
});

const loadLandingPage = () => {
  const elem = document.getElementById("welcomePage");
  elem.style.transform = "translateY(-100%)";
};

window.addEventListener("load", () => {
  let value = 0;
  let timerID;
  timerID = setInterval(() => {
    if (value > 100) {
      clearInterval(timerID);
      loadLandingPage();
    } else {
      const progressBas = document.getElementById("progressBar");
      const percent = document.getElementById("percent");
      progressBas.style.width = `${value}%`;
      percent.innerText = value + "%";
      value += 10;
    }
  }, 40);
});

const animateLandingPage = () => {
  let tl = gsap.timeline();

  tl.from("nav", {
    y: "10",
    opacity: 0,
    ease: Expo.easeInOut,
    duration: 1,
    delay: 1.1,
  })
    .to(".boundingElemUP", {
      y: "0%",
      duration: 1,
      ease: Power1,
      stagger: 0.2,
    })
    .from(".boundingElemDOWN", {
      y: "-100%",
      duration: 1,
      ease: Power1,
      stagger: 0.2,
      delay: -0.4,
    })
    .to("#lanPGFooter", {
      opacity: 1,
      ease: Expo.easeInOut,
      duration: 1,
      delay: -1,
    });
};
animateLandingPage();

const squezeMouseFollower = () => {
  let prevX = 0;
  let prevY = 0;
  let scaleX = 1;
  let scaleY = 1;
  window.addEventListener("mousemove", (evt) => {
    clearTimeout(mouseFollowerTimerID);
    let diffX = evt.clientX - prevX;
    let diffY = evt.clientY - prevY;
    prevX = evt.clientX;
    prevY = evt.clientY;
    let clientX = evt.clientX - 5;
    let clientY = evt.clientY - 5;
    scaleX = gsap.utils.clamp(0.8, 1.2, diffX);
    scaleY = gsap.utils.clamp(0.8, 1.2, diffY);
    circleMouseFollower(clientX, clientY, scaleX, scaleY);
    mouseFollowerTimerID = setTimeout(() => {
      minicircle.style.transform = `translate(${clientX}px,${clientY}px) scale(1,1)`;
    }, 100);
  });
};

squezeMouseFollower();

const circleMouseFollower = (clientX, clientY, scaleX, scaleY) => {
  minicircle.style.transform = `translate(${clientX}px,${clientY}px) scale(${scaleX}, ${scaleY})`;
};

document
  .querySelectorAll(
    "#landingPage a, #landingPage h4 , #landingPage span, #landingPage h1, .boundingElemUP, .boundingElemDown.lanPG-elem i, .elem, #aboutText a"
  )
  .forEach((child) => {
    child.addEventListener("mouseover", (evt) => {
      if (
        evt.target.className == "elem" ||
        evt.target.className == "elem lastElem" ||
        evt.target.parentElement.className == "elem" ||
        evt.target.parentElement.className == "elem lastElem"
      ) {
        minicircle.style.width = "80px";
        minicircle.style.height = "80px";
        minicircle.style.opacity = 0.7;
        document.querySelector("#minicircle .view").style.opacity = 1;
      } else {
        minicircle.style.mixBlendMode = "difference";
        minicircle.style.opacity = 1;
        if (
          evt.target.className == "boundingElemUP" ||
          evt.target.className == "boundingElemDOWN"
        ) {
          minicircle.style.width = "12px";
          minicircle.style.height = "12px";
        } else {
          minicircle.style.width = "20px";
          minicircle.style.height = "20px";
        }
      }
    });
    window.addEventListener("mouseout", (evt) => {
      minicircle.style.mixBlendMode = "normal";
      minicircle.style.width = "12px";
      minicircle.style.height = "12px";
      document.querySelector("#minicircle .view").style.opacity = 0;
    });
  });

document.querySelectorAll(".icon").forEach((icon) => {
  const i = icon.querySelector("i");
  icon.addEventListener("mouseover", () => {
    minicircle.style.opacity = 0;
    let iconTimeline = gsap.timeline();
    iconTimeline
      .to(i, {
        y: "100%",
        duration: 0.4,
        ease: Power3,
      })
      .from(i, {
        y: "-100%",
        duration: 0.4,
        ease: Power3,
      })
      .to(i, {
        y: "0%",
        duration: 0.4,
        ease: Power3,
      });
  });
  icon.addEventListener("mouseout", () => {
    minicircle.style.opacity = 1;
    i.style.transform = `translateY(0%)`;
  });
});

document.querySelectorAll(".elem").forEach((elem) => {
  let rotate = 0;
  let diffRotate = 0;
  elem.addEventListener("mousemove", (evt) => {
    let diff = evt.clientY - elem.getBoundingClientRect().top;
    diffRotate = evt.clientX - rotate;
    rotate = evt.clientX;
    elem.querySelector("h1").style.paddingLeft = "40px";
    elem.querySelector("h1").style.opacity = "0.2";
    gsap.to(elem.querySelector("img"), {
      opacity: 1,
      ease: Power3,
      top: diff,
      left: evt.clientX,
      rotate: gsap.utils.clamp(-20, 20, diffRotate * 0.5),
    });
  });

  elem.addEventListener("mouseleave", (evt) => {
    elem.querySelector("h1").style.paddingLeft = "0px";
    elem.querySelector("h1").style.opacity = "0.7";

    gsap.to(elem.querySelector("img"), {
      opacity: 0,
      ease: Power3,
      duration: 0.5,
    });
  });
});

document
  .querySelectorAll("#menuLogo, .lanPG-elem, .container")
  .forEach((elem) => {
    const iElem = elem.querySelector("i");
    const line = elem.querySelector(".line");
    elem.addEventListener("mouseover", () => {
      gsap.to(line, {
        x: "0%",
        duration: 0.5,
        ease: Power3,
      });
      if (iElem) {
        iElem.classList.remove("ri-arrow-right-up-line");
        iElem.classList.add("ri-arrow-right-line");
      }
    });
    elem.addEventListener("mouseleave", () => {
      let tl = gsap.timeline();
      if (iElem) {
        iElem.classList.remove("ri-arrow-right-line");
        iElem.classList.add("ri-arrow-right-up-line");
      }
      tl.to(line, {
        x: "100%",
        duration: 0.5,
        ease: Power3,
        opacity: 1,
      });
      tl.to(line, {
        y: "100%",
        duration: 0.1,
        ease: Power3,
      });
      tl.to(line, {
        x: "-101%",
        duration: 0.1,
      });
      tl.to(line, {
        y: "0%",
        duration: 0.1,
      });
    });
  });

document.querySelector("#menuLogo").addEventListener("click", () => {
  if (window.innerWidth < 600) {
    document.querySelector("#menuSection").style.display = "none";
    document.querySelector("#closeMenu").style.display = "flex";
    document.querySelector("nav").setAttribute("id", "fullPage");
    document.querySelector("#menuPage").style.display = "flex";
    document.querySelector("#landingPage").style.height = "100%";
  } else {
    document.querySelector("#menuList").style.display = "inline-block";
  }
});

document.querySelector("#closeMenu").addEventListener("click", () => {
  document.querySelector("#menuSection").style.display = "flex";
  document.querySelector("#closeMenu").style.display = "none";
  document.querySelector("nav").removeAttribute("id", "fullPage");
  document.querySelector("#menuPage").style.display = "none";
  document.querySelector("#landingPage").style.height = "100vh";
  // } else {
  //   document.querySelector("#menuList").style.display = "inline-block";
  // }
});

setInterval(() => {
  let timeElem = document.querySelectorAll(".time");
  let dt = new Date();
  let currTime = dt.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  timeElem.forEach((elem) => {
    elem.innerText = currTime;
    console.log(timeElem);
  });
}, 1000);
