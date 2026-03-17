  "use strict";

/**
 * This would have been much simpler in AE, but I wanted to mix it up and see what animating paths was like
 */
const ballName = "ball";

const KrakenNames = [
    "kraken1",
    //"kraken2",
    //"kraken3",
];
const smokeNames = ["smoke0", "smoke1", "smoke2"];
const cannonNames = ["cannon0", "cannon1", "cannon2", "cannon3", "cannon4"];
const createBallTarget = (cannonIndex) => `[data-name="${cannonNames[cannonIndex]}${ballName}"]`;
const createSmokeTarget = (cannonIndex, smokeIndex) => `[data-name="${cannonNames[cannonIndex]}${smokeNames[smokeIndex]}"]`;
const createKrakenTarget = (KrakenNames) => `[data-name="${KrakenNames[KrakenNames]}"]`

const randomIntFromInterval = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
const randomDoubleFromInterval = (min, max) => (Math.random() * (max - min + 1) + min).toFixed(2);
const test = (i, maxDelta) => {
    var anim_me = anime.random(-1 * maxDelta, maxDelta);
anime({
  targets: ".kraken1",
  translateX: () => anim_me,
  translateY: () => anim_me,
  duration: randomIntFromInterval(1000, 3000),
  easing: 'easeInOutSine',
  begin: function() {
    
  },
  complete: function() {
    
    test(i, maxDelta)
  }
  
});

};

const test2 = (i, maxDelta) => {
    var anim_me = anime.random(-1 * maxDelta, maxDelta);
anime({
  targets: ".kraken2",
  translateX: () => anim_me,
  translateY: () => anim_me,
  duration: randomIntFromInterval(1000, 3000),
  easing: 'easeInOutSine',
  begin: function() {
   
  },
  complete: function() {
    test2(i, maxDelta)
  }
  
});

};

const test3 = (i, maxDelta) => {
    var anim_me = anime.random(-1 * maxDelta, maxDelta);
anime({
  targets: ".kraken3",
  translateX: () => anim_me,
  translateY: () => anim_me,
  duration: randomIntFromInterval(1000, 3000),
  easing: 'easeInOutSine',
  begin: function() {
  
  },
  complete: function() {
    test3(i, maxDelta)
  }
  
});

};
// used to make transformOrigin be center in reference to the path rather than the entire SVG
const setTransformOrigin = (target) => {
    const path = document.querySelectorAll(target)[0];
    const { x, y, height, width } = path.getBBox();
    path.style.transformOrigin = `${x + width / 2}px ${y + height / 2}px`;
};
const resetCannon = (cannonIndex) => {
    anime.set(createBallTarget(cannonIndex), {
        opacity: 0,
        translateX: 0,
        translateY: 0
    });
    smokeNames.forEach((st, i) => {
        setTransformOrigin(createSmokeTarget(cannonIndex, i));
        anime.set(createSmokeTarget(cannonIndex, i), {
            opacity: 0,
            translateX: 0,
            translateY: 0
        });
    });
};
const fireCannon = (cannonIndex) => {
    const smokeIndex = randomIntFromInterval(0, 2);
    const smokeTarget = createSmokeTarget(cannonIndex, smokeIndex);
    const ballTarget = createBallTarget(cannonIndex);
    const { height, width, x, y } = document
        .querySelectorAll(smokeTarget)[0]
        .getBBox();
    let smokeTimeLine = anime.timeline({
        easing: "easeOutElastic(1, .8)"
    });
    smokeTimeLine.set({
        targets: smokeTarget,
        rotate: `${randomIntFromInterval(0, 180)}deg`,
        transformOrigin: `${x}px ${y}px 0`
    });
    smokeTimeLine
        .add({
        targets: smokeTarget,
        opacity: [0.0, 1],
        scale: [1, randomDoubleFromInterval(2.5, 4)],
        duration: 1000
    })
        .add({
        targets: smokeTarget,
        opacity: [1, 0],
        duration: 2000
    }, "-=700");
    let cannonBallTimeLine = anime.timeline({ easing: "linear" });
    cannonBallTimeLine
        .add({
        targets: ballTarget,
        opacity: [0.0, 1],
        duration: 20
    })
        .add({
        targets: ballTarget,
        translateX: `-${randomIntFromInterval(31, 33)}%`,
        translateY: [
            {
                value: -1 * randomIntFromInterval(20, 30),
                easing: "easeOutCubic"
            },
            {
                value: randomIntFromInterval(62, 64),
                easing: "easeInCirc"
            }
        ],
        complete: () => anime({
            
        })
    })
        .add({
        targets: ballTarget,
        opacity: [1, 0.0],
        duration: 20
    });
};
const resetCannons = () => {
    resetCannon(0);
    resetCannon(1);
    resetCannon(2);
    resetCannon(3);
    resetCannon(4);
};
resetCannons();


const staggerFire = (i) => {
    setTimeout(() => fireCannon(i), i * 200);
};
const setupReoccuringFire = (i) => {
    setTimeout(() => {
        resetCannon(i);
        fireCannon(i);
        setupReoccuringFire(i);
    }, randomIntFromInterval(3000, 5000));
};
setTimeout(() => {
    resetCannons();
    staggerFire(0);
    staggerFire(1);
    staggerFire(2);
    staggerFire(3);
    staggerFire(4);
    setupReoccuringFire(0);
    setupReoccuringFire(1);
    setupReoccuringFire(2);
    setupReoccuringFire(3);
    setupReoccuringFire(4);
    test(0,100);
    test2(0,130);
    test3(0,200);
}, 3000);


const sky = document.querySelector(".sky");
const template = document.querySelector("#boltTemplate");

function createBolt(){

  const bolt = template.cloneNode(true);
  bolt.removeAttribute("id");
  bolt.classList.add("bolt");

  // random horizontal position
  bolt.style.left = Math.random() * window.innerWidth + "px";

  // random vertical position (80-100px)
  bolt.style.top = 100 + Math.random()*20 + "px";

  // random bolt length
  const length = 200 + Math.random()*250;
  bolt.style.height = length + "px";

  // slight random rotation
  const tilt = (Math.random()*20)-10;
  bolt.style.transform = `scaleY(0) rotate(${tilt}deg)`;

  sky.appendChild(bolt);

  // remove after animation
  setTimeout(()=>{
    bolt.remove();
  },700);
}

function lightningStorm(){

  const boltCount = 1 + Math.floor(Math.random()*3);

  for(let i=0;i<boltCount;i++){
    setTimeout(createBolt, i*60);
  }

  const nextStrike = 2000 + Math.random()*6000;
  setTimeout(lightningStorm, nextStrike);
}

lightningStorm();