const container = document.body;

const observer = new MutationObserver((mutationsList, observer) => {
    const shipLinks = document.getElementsByClassName("ship-card");

    if (shipLinks.length > 0) {
        Array.from(shipLinks).forEach(link => {
            link.addEventListener("click", (event) => {
                const shipCard = event.target.closest(".ship-card");
                const shipName = shipCard.dataset.ship;
                selectShip(shipName);
                console.log(shipName);
            });
        });

        observer.disconnect();
    }
});


observer.observe(container, { childList: true, subtree: true });

const MaterialData = {
    beam: {
        wood: 93,
        iron: 5
    },

    bulkhead: {
        iron: 70,
        resin: 1
    },

    canvas: {
        fabric: 10,
        resin: 1
    },

    plate: {
        coal: 15,
        resin: 4,
        iron: 30
    },

    bronze: {
        iron: 20,
        copper: 10,
        coal: 1
    }
};

const shipData = {
//fast ships
  "pickle": {
    image: "./images/ships/pickle.png",
    stats: {
      durability: 700,
      speed: 9.2,
      maneuverability: 94,
      broadsideArmor: 1.6,
      hold: 6000,
      crew: 66,
      hullSize: "24x4",
      displacement: "900t",
      lightWeapons: "0-6-0",
      swivelGuns: 4,
      integrity: 99999999
    },
    costs: {
      wood: 775,
      iron: 135,
      fabric: 30
    }
  },

  "lacerf": {
    image: "./images/ships/lacerf.png",
    stats: {
      durability: 900,
      speed: 10,
      maneuverability: 97,
      broadsideArmor: 1.8,
      hold: 8000,
      crew: 78,
      hullSize: "22x3",
      displacement: "990t",
      lightWeapons: "0-9-0",
      swivelGuns: 8,
      integrity: 6
    },
    costs: {
      iron: 460,
      beams: 23,
      canvas: 14
    }
  },
   "lacreole": {
    image: "./images/ships/lacreole.png",
    stats: {
      durability: 1400,
      speed: 11,
      maneuverability: 100,
      broadsideArmor: 2,
      hold: 11000,
      crew: 96,
      hullSize: "39x5",
      displacement: "1620t",
      lightWeapons: "4-12-0",
      swivelGuns: 8,
      integrity: 7
    },
    costs: {
      battlemarks: 11,
      beams: 151,
      bulkheads: 21,
      canvas: 184
    }
  },

  "surprise": {
    image: "./images/ships/surprise.png",
    stats: {
      durability: 1680,
      speed: 10.5,
      maneuverability: 105,
      broadsideArmor: 2.4,
      hold: 1300,
      crew: 112,
      hullSize: "45x5",
      displacement: "2025t",
      lightWeapons: "0-18-2",
      swivelGuns: 8,
      integrity: 7
    },
    costs: {
      battlemarks: 130,
      beams: 151,
      bulkheads: 54,
      canvas: 351
    }
  },

  "poltava": {
    image: "./images/ships/poltava.png",
    stats: {
      durability: 2100,
      speed: 9.6,
      maneuverability: 95,
      broadsideArmor: 2.8,
      hold: 15500,
      crew: 132,
      hullSize: "41x6",
      displacement: "2475t",
      lightWeapons: "0-23-4",
      swivelGuns: 10,
      integrity: 7
    },
    costs: {
      battlemarks: 340,
      beams: 238,
      bulkheads: 119,
      canvas: 502,
      plates: 33
    }
  },
  "ingermanland": {
    image: "./images/ships/ingermanland.png",
    stats: {
      durability: 2340,
      speed: 9,
      maneuverability: 87,
      broadsideArmor: 3.2,
      hold: 17500,
      crew: 152,
      hullSize: "48x8",
      displacement: "3060t",
      lightWeapons: "0-32-4",
      swivelGuns: 12,
      integrity: 7
    },
    costs: {
      battlemarks: 735,
      beams: 443,
      bulkheads: 259,
      canvas: 810,
      plates: 76
    }
  },
  // combat
  "horizon": {
    image: "./images/ships/horizont.png",
    stats: {
      durability: 850,
      speed: 8.4,
      maneuverability: 80,
      broadsideArmor: 3.2,
      hold: 7000,
      crew: 78,
      hullSize: "26x5",
      displacement: "1125t",
      lightWeapons: "2-8-0",
      swivelGuns: 6,
      integrity: 99999
    },
    costs: {
      wood: 766,
      iron: 219,
      fabric:31,
    }
  },
  "lasalamander": {
    image: "./images/ships/lasalamander.png",
    stats: {
      durability: 1160,
      speed: 8.8,
      maneuverability: 82,
      broadsideArmor: 3.6,
      hold: 9500,
      crew: 96,
      hullSize: "25x5",
      displacement: "1350t",
      lightWeapons: "2-10-0",
      swivelGuns: 6,
      integrity: 7
    },
    costs: {
      iron: 770,
      beams: 24,
      
    }
  },
  "blackwind": {
    image: "./images/ships/blackwind.png",
    stats: {
      durability: 1820,
      speed: 9.4,
      maneuverability: 84,
      broadsideArmor: 4,
      hold: 1300,
      crew: 116,
      hullSize: "45x8",
      displacement: "2250t",
      lightWeapons: "2-16-2",
      swivelGuns: 6,
      integrity: 6
    },
    costs: {
      battlemarks: 11,
      beams: 76,
      bulkheads: 39,
      canvas: 108,
    }
  },
  "essex": {
    image: "./images/ships/essex.png",
    stats: {
      durability: 2160,
      speed: 8.9,
      maneuverability: 88,
      broadsideArmor: 4.8,
      hold: 15500,
      crew: 136,
      hullSize: "38x6",
      displacement: "2115t",
      lightWeapons: "2-21-2",
      swivelGuns: 8,
      integrity: 6
    },
    costs: {
      battlemarks: 130,
      beams: 151,
      bulkheads: 97,
      canvas: 194,
    }
  },
  "anson": {
    image: "./images/ships/anson.png",
    stats: {
      durability: 2700,
      speed: 8.2,
      maneuverability: 80,
      broadsideArmor: 5.6,
      hold: 18500,
      crew: 160,
      hullSize: "52x9",
      displacement: "3150t",
      lightWeapons: "4-30-2",
      swivelGuns: 8,
      integrity: 6
    },
    costs: {
      battlemarks: 365,
      beams: 243,
      bulkheads: 205,
      canvas: 281,
      plates: 37
    }
  },
  "sanspareil": {
    image: "./images/ships/sanspareil.png",
    stats: {
      durability: 3000,
      speed: 7.7,
      maneuverability: 74,
      broadsideArmor: 6.4,
      hold: 21500,
      crew: 184,
      hullSize: "55x6",
      displacement: "3330t",
      lightWeapons: "4-38-2",
      swivelGuns: 10,
      integrity: 6
    },
    costs: {
      battlemarks: 740,
      beams: 454,
      bulkheads: 454,
      canvas: 459,
      plates: 76
    }
  },
  "victory": {
    image: "./images/ships/victory.png",
    stats: {
      durability: 3740,
      speed: 7.1,
      maneuverability: 66,
      broadsideArmor: 8,
      hold: 25000,
      crew: 204,
      hullSize: "61x12",
      displacement: "4500t",
      lightWeapons: "4-49-4",
      swivelGuns: 10,
      integrity: 6
    },
    costs: {
      battlemarks: 1650,
      beams: 897,
      bulkheads: 2333,
      canvas: 1392,
      plates: 178
    }
  },
  //transport
  "friede": {
    image: "./images/ships/friede.png",
    stats: {
      durability: 750,
      speed: 8.8,
      maneuverability: 86,
      broadsideArmor: 2.2,
      hold: 11000,
      crew: 72,
      hullSize: "33x6",
      displacement: "1350t",
      lightWeapons: "2-7-0",
      swivelGuns: 6,
      integrity: 9999999
    },
    costs: {
      wood: 850,
      iron: 150,
      fabric: 30
    }
  },
  "mercury": {
    image: "./images/ships/mercury.png",
    stats: {
      durability: 1040,
      speed: 9.2,
      maneuverability: 89,
      broadsideArmor: 2.5,
      hold: 15500,
      crew: 88,
      hullSize: "32x8",
      displacement: "2025t",
      lightWeapons: "2-9-0",
      swivelGuns: 6,
      integrity: 9999999
    },
    costs: {
      iron: 535,
      beam: 27
    }
  },
  "russia": {
    image: "./images/ships/russia.png",
    stats: {
      durability: 1600,
      speed: 9.9,
      maneuverability: 2.7,
      broadsideArmor: 2.7,
      hold: 22000,
      crew: 108,
      hullSize: "37x7",
      displacement: "2070t",
      lightWeapons: "2-14-0",
      swivelGuns: 6,
      integrity: 7
    },
    costs: {
      battlemarks: 25,
      beams: 86,
      bulkheads: 24,
      canvas: 110,
    }
  },
  "falmouth": {
    image: "./images/ships/falmouth.png",
    stats: {
      durability: 1920,
      speed: 9.4,
      maneuverability: 96,
      broadsideArmor: 3.3,
      hold: 27500,
      crew: 126,
      hullSize: "44x8",
      displacement: "3060t",
      lightWeapons: "4-18-0",
      swivelGuns:8,
      integrity: 7
    },
    costs: {
      battlemarks: 60,
      beams: 178,
      bulkheads: 59,
      canvas: 207,
    }
  },
  "mordaunt": {
    image: "./images/ships/mordant.png",
    stats: {
      durability: 2380,
      speed: 8.7,
      maneuverability: 87,
      broadsideArmor: 3.9,
      hold: 34000,
      crew: 148,
      hullSize: "41x7",
      displacement: "2475t",
      lightWeapons: "4-26-0",
      swivelGuns: 6,
      integrity: 7
    },
    costs: {
      battlemarks: 120,
      beams: 292,
      bulkheads: 135,
      canvas: 329,
      plates: 31
    }
  },
  "lasirene": {
    image: "./images/ships/lasirene.png",
    stats: {
      durability: 2660,
      speed: 8.1,
      maneuverability: 80,
      broadsideArmor: 4.4,
      hold: 43000,
      crew: 170,
      hullSize: "50x9",
      displacement: "3600t",
      lightWeapons: "4-32-0",
      swivelGuns: 8,
      integrity: 7
    },
    costs: {
      battlemarks: 160,
      beams: 567,
      bulkheads: 297,
      canvas: 524,
      plates: 65
    }
  },
  "lacouronne": {
    image: "./images/ships/lacouronne.png",
    stats: {
      durability: 3500,
      speed: 7.6,
      maneuverability: 72,
      broadsideArmor: 5.5,
      hold: 50000,
      crew: 188,
      hullSize: "61x9",
      displacement: "4500t",
      lightWeapons: "8-28-0",
      swivelGuns: 14,
      integrity: 7
    },
    costs: {
      battlemarks: 200,
      beams: 1199,
      bulkheads: 1555,
      canvas: 1728,
      plates: 108
    }
  },
  //heavy
  "phoenix": {
    image: "./images/ships/phoenix.png",
    stats: {
      durability: 1380,
      speed: 8.2,
      maneuverability: 75,
      broadsideArmor: 4.5,
      hold: 12500,
      crew: 104,
      hullSize: "27x6",
      displacement: "1440t",
      lightWeapons: "0-12-0",
      swivelGuns: 6,
      integrity: 99999
    },
    costs: {
      iron: 965,
      beam: 29
    }
  },
  "sanmartin": {
    image: "./images/ships/sanmartin.png",
    stats: {
      durability: 2140,
      speed: 8.5,
      maneuverability: 72,
      broadsideArmor: 5,
      hold: 17500,
      crew: 126,
      hullSize: "40x9",
      displacement: "2475t",
      lightWeapons: "0-20-0",
      swivelGuns: 6,
      integrity: 7
    },
    costs: {
      battlemarks: 11,
      beams: 92,
      bulkheads: 49,
      canvas: 86
    }
  },
  "constitution": {
    image: "./images/ships/constitution.png",
    stats: {
      durability: 2560,
      speed: 8,
      maneuverability: 68,
      broadsideArmor: 6,
      hold: 21500,
      crew: 148,
      hullSize: "53x6",
      displacement: "2565t",
      lightWeapons: "0-26-0",
      swivelGuns: 8,
      integrity: 7
    },
    costs: {
      battlemarks: 145,
      beams: 189,
      bulkheads: 119,
      canvas: 146
    }
  },
  "bellona": {
    image: "./images/ships/bellona.png",
    stats: {
      durability: 3180,
      speed: 7.5,
      maneuverability: 62,
      broadsideArmor: 7,
      hold: 26000,
      crew: 174,
      hullSize: "49x9",
      displacement: "3915t",
      lightWeapons: "0-35-0",
      swivelGuns: 10,
      integrity: 7
    },
    costs: {
      battlemarks: 385,
      beams: 302,
      bulkheads: 259,
      canvas: 221,
      plates: 39
    }
  },
  "redoutable": {
    image: "./images/ships/redoutable.png",
    stats: {
      durability: 3540,
      speed: 7,
      maneuverability: 57,
      broadsideArmor: 8,
      hold: 30500,
      crew: 198,
      hullSize: "53x7",
      displacement: "3600t",
      lightWeapons: "0-43-0",
      swivelGuns: 10,
      integrity: 7
    },
    costs: {
      battlemarks: 775,
      beams: 561,
      bulkheads: 572,
      canvas: 340,
      plates: 81
    }
  },
  "12apostolov": {
    image: "./images/ships/12apostolov.png",
    stats: {
      durability: 4400,
      speed: 6.2,
      maneuverability: 49,
      broadsideArmor: 10,
      hold: 36000,
      crew: 220,
      hullSize: "66x11",
      displacement: "4500t",
      lightWeapons: "0-59-0",
      swivelGuns: 10,
      integrity: 7
    },
    costs: {
      battlemarks: 1830,
      beams: 1112,
      bulkheads: 2916,
      canvas: 799,
      plates: 200,
      license: 1
    }
  },
  // siege
  "polacca": {
    image: "./images/ships/polacca.png",
    stats: {
      durability: 980,
      speed: 9,
      maneuverability: 102,
      broadsideArmor: 2.9,
      hold: 9000,
      crew: 74,
      hullSize: "23x5",
      displacement: "1575t",
      lightWeapons: "0-7-0",
      swivelGuns: 6,
      integrity: 9999
    },
    costs: {
      iron: 620,
      beam: 21
    }
  },
  "lerequin": {
    image: "./images/ships/lerequin.png",
    stats: {
      durability: 1520,
      speed: 9.6,
      maneuverability: 105,
      broadsideArmor: 3.2,
      hold: 12500,
      crew: 88,
      hullSize: "37x4",
      displacement: "2025t",
      lightWeapons: "2-12-0",
      swivelGuns: 6,
      integrity: 6
    },
    costs: {
      battlemarks: 11,
      beams: 65,
      bulkheads: 37,
      canvas: 119
    }
  },
  "kobukson": {
    image: "./images/ships/kobukson.png",
    stats: {
      durability: 2000,
      speed: 8,
      maneuverability: 85,
      broadsideArmor: 4.6,
      hold: 18000,
      crew: 124,
      hullSize: "37x6",
      displacement: "2250t",
      lightWeapons: "0-15-0",
      swivelGuns: 8,
      integrity: 6
    },
    costs: {
      battlemarks: 330,
      beams: 200,
      bulkheads: 205,
      canvas: 265,
      plates: 32
    }
  },
  "adventure": {
    image: "./images/ships/adventure.png",
    stats: {
      durability: 2660,
      speed: 8.2,
      maneuverability: 92,
      broadsideArmor: 5.2,
      hold: 21000,
      crew: 140,
      hullSize: "47x6",
      displacement: "2925t",
      lightWeapons: "4-19-0",
      swivelGuns: 8,
      integrity: 6
    },
    costs: {
      battlemarks: 540,
      beams: 416,
      bulkheads: 383,
      canvas: 551,
      plates: 54
    }
  },
  "laroyal": {
    image: "./images/ships/laroyale.png",
    stats: {
      durability: 2900,
      speed: 7.4,
      maneuverability: 83,
      broadsideArmor: 6.5,
      hold: 24000,
      crew: 156,
      hullSize: "60x9",
      displacement: "3870t",
      lightWeapons: "0-18-6",
      swivelGuns: 12,
      integrity: 6
    },
    costs: {
      battlemarks: 1090,
      beams: 740,
      bulkheads: 1922,
      canvas: 1598,
      plates: 113
    }
  },
  // imperial
  "balloon": {
    image: "./images/ships/balloon.png",
    stats: {
      durability: 200,
      speed: 21,
      maneuverability: 50,
      broadsideArmor: 1,
      hold: 1000,
      crew: 8,
      hullSize: "1x1",
      displacement: "1t",
      lightWeapons: "0-0-0",
      swivelGuns: 0,
      integrity: 999999
    },
    costs: {
      escudo: 1000
    }
  },
  "blackprince": {
    image: "./images/ships/blackprince.png",
    stats: {
      durability: 1700,
      speed: 9.9,
      maneuverability: 90,
      broadsideArmor: 3,
      hold: 14500,
      crew: 120,
      hullSize: "37x7",
      displacement: "1800t",
      lightWeapons: "2-15-2",
      swivelGuns: 6,
      integrity: 6
    },
    costs: {
      BlueprintFrag: 25,
      escudo: 20
    }
  },
   "devourer": {
    image: "./images/ships/devourer.png",
    stats: {
      durability: 3000,
      speed: 6.8,
      maneuverability: 66,
      broadsideArmor: 8.2,
      hold: 27000,
      crew: 166,
      hullSize: "47x11",
      displacement: "4950t",
      lightWeapons: "8-25-1",
      swivelGuns: 10,
      integrity: 7
    },
    costs: {
      ImperialBlueprint: 5,
      escudo: 400
    }
  },
   "deadfish": {
    image: "./images/ships/deadfish.png",
    stats: {
      durability: 2000,
      speed: 7,
      maneuverability: 70,
      broadsideArmor: 3.5,
      hold: 15000,
      crew: 300,
      hullSize: "40x6",
      displacement: "3200t",
      lightWeapons: "0-20-0",
      swivelGuns: 12,
      integrity: 10
    },
    costs: {
      ImperialBlueprint: 5,
      escudo: 400
    }
  },
   "octopus": {
    image: "./images/ships/octopus.png",
    stats: {
      durability: 2760,
      speed: 8.3,
      maneuverability: 75,
      broadsideArmor: 6.8,
      hold: 23000,
      crew: 176,
      hullSize: "48x7",
      displacement: "3375t",
      lightWeapons: "8-37-0",
      swivelGuns: 10,
      integrity: 4
    },
    costs: {
      ImperialBlueprint: 20,
      escudo: 5000
    }
  },
   "huracan": {
    image: "./images/ships/huracan.png",
    stats: {
      durability: 8000,
      speed: 5.5,
      maneuverability: 42,
      broadsideArmor: 11.5,
      hold: 54000,
      crew: 288,
      hullSize: "90x18",
      displacement: "5625t",
      lightWeapons: "0-85-2",
      swivelGuns: 18,
      integrity: 7
    },
    costs: {
      ImperialBlueprint: 40,
      escudo: 10000
    }
  },
};

// covers every resource type you mentioned
const resourceIcons = {
  wood: `<img class="imageSizeShipCalculator" src="./images/icons/wood.png">`,
  iron: `<img class="imageSizeShipCalculator" src="./images/icons/iron.png">`,
  fabric: `<img class="imageSizeShipCalculator" src="./images/icons/fabric.png">`,
  resin: `<img class="imageSizeShipCalculator" src="./images/icons/resin.png">`,
  coal: `<img class="imageSizeShipCalculator" src="./images/icons/coal.png">`,
  copper: `<img class="imageSizeShipCalculator" src="./images/icons/copper.png">`,
  beam: `<img class="imageSizeShipCalculator" src="./images/icons/beam.png">`,
  beams: `<img class="imageSizeShipCalculator" src="./images/icons/beam.png">`,
  canvas: `<img class="imageSizeShipCalculator" src="./images/icons/canvas.png">`,
  bulkhead: `<img class="imageSizeShipCalculator" src="./images/icons/bulkhead.png">`,
  bulkheads: `<img class="imageSizeShipCalculator" src="./images/icons/bulkhead.png">`,
  plate: `<img class="imageSizeShipCalculator" src="./images/icons/plate.png">`,
  plates: `<img class="imageSizeShipCalculator" src="./images/icons/plate.png">`,
  bronze: `<img class="imageSizeShipCalculator" src="./images/icons/bronze.png">`,
  battlemarks: `<img class="imageSizeShipCalculator" src="./images/icons/battle_mark.png">`,
  license: `<img class="imageSizeShipCalculator" src="./images/icons/license.png">`,
  escudo: `<img class="imageSizeShipCalculator" src="./images/icons/escudo.png">`,
  ImperialBlueprint: `<img class="imageSizeShipCalculator" src="./images/icons/imperial_blueprint.png">`,
  BlueprintFrag: `<img class="imageSizeShipCalculator" src="./images/icons/blueprint_fragment.png">`
};

const craftedItemMap = {
  beam: "beam",
  beams: "beam",
  bulkhead: "bulkhead",
  bulkheads: "bulkhead",
  canvas: "canvas",
  plate: "plate",
  plates: "plate",
  bronze: "bronze"
};

const craftedItemCosts = {
  beam: 419,
  bulkhead: 894,
  canvas: 89,
  plate: 959,
  bronze: 916
};

function formatLabel(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function renderCosts(costs) {
  const costItemsContainer = document.querySelector(".cost-items");
  if (!costItemsContainer) return;

  costItemsContainer.innerHTML = "";

  Object.entries(costs).forEach(([resource, amount]) => {
    const costItem = document.createElement("div");
    costItem.className = "cost-item";

    costItem.innerHTML = `
      <div class="icon-box">
        ${resourceIcons[resource] || ""}
      </div>
      <div class="cost-value">${amount}</div>
      <div class="cost-label">${formatLabel(resource)}</div>
    `;

    costItemsContainer.appendChild(costItem);
  });
}

function getCraftingBreakdown(itemName, amount) {
  const normalizedItem = craftedItemMap[itemName];

  if (!normalizedItem || !MaterialData[normalizedItem]) {
    return null;
  }

  const recipe = MaterialData[normalizedItem];
  const resources = Object.entries(recipe).map(([resource, resourceAmount]) => ({
    resource,
    amount: resourceAmount * amount
  }));

  return {
    item: normalizedItem,
    itemAmount: amount,
    resources
  };
}

function renderSelfCraft(costs) {
  const container = document.querySelector(".self-craft-list");

  if (!container) return;

  container.innerHTML = "";

  let hasCraftableItems = false;

  Object.entries(costs).forEach(([itemName, amount]) => {
    const normalizedItem = craftedItemMap[itemName];
    const breakdown = getCraftingBreakdown(itemName, amount);

    if (!normalizedItem || !breakdown) return;

    hasCraftableItems = true;

    const group = document.createElement("div");
    group.className = "self-craft-group";

    const headerRow = document.createElement("div");
    headerRow.className = "cost-row";
    headerRow.innerHTML = `
      <div class="cost-row-left">
        <span class="icon-box">${resourceIcons[itemName] || resourceIcons[normalizedItem] || ""}</span>
        <span>${formatLabel(itemName)} x ${amount.toLocaleString()}</span>
      </div>
      <div class="cost-row-right"></div>
    `;

    group.appendChild(headerRow);

    breakdown.resources.forEach(({ resource, amount: resourceAmount }) => {
      const resourceRow = document.createElement("div");
      resourceRow.className = "cost-row craft-resource-row";
      resourceRow.innerHTML = `
        <div class="cost-row-left">
          <span>${formatLabel(resource)} x ${resourceAmount.toLocaleString()}</span>
          <span class="icon-box">${resourceIcons[resource] || ""}</span>
        </div>
        <div class="cost-row-right"></div>
      `;

      group.appendChild(resourceRow);
    });

    container.appendChild(group);
  });

  if (!hasCraftableItems) {
    container.innerHTML = `<div class="cost-row"><div class="cost-row-left">No craftable items</div></div>`;
  }
}

function renderBuyInputs(costs) {
  const inputsContainer = document.querySelector(".buy-price-inputs");
  const totalEl = document.querySelector(".buy-total");

  if (!inputsContainer || !totalEl) return;

  inputsContainer.innerHTML = "";

  Object.entries(costs).forEach(([resource, amount]) => {
    const row = document.createElement("div");
    row.className = "buy-input-row";
    row.innerHTML = `
      <div class="cost-row-left">
        <span class="icon-box">${resourceIcons[resource] || resourceIcons[craftedItemMap[resource]] || ""}</span>
        <span>${formatLabel(resource)} x ${amount.toLocaleString()}</span>
      </div>
      <div class="cost-row-right">
        <input
          type="number"
          min="0"
          step="1"
          class="resource-price-input"
          data-resource="${resource}"
          data-amount="${amount}"
          placeholder="Price"
        />
      </div>
    `;

    inputsContainer.appendChild(row);
  });

  const recalc = () => {
    let total = 0;

    document.querySelectorAll(".resource-price-input").forEach((input) => {
      const amount = Number(input.dataset.amount || 0);
      const price = Number(input.value || 0);
      total += amount * price;
    });

    totalEl.textContent = total.toLocaleString();
  };

  document.querySelectorAll(".resource-price-input").forEach((input) => {
    input.addEventListener("input", recalc);
  });

  recalc();
}

function renderStats(stats) {
  const statsList = document.querySelector(".stats-list");
  if (!statsList) return;

  statsList.innerHTML = `
    <li><span class="label">Durability</span><span class="dots"></span><span class="value">${stats.durability}</span></li>
    <li><span class="label">Speed</span><span class="dots"></span><span class="value">${stats.speed}</span></li>
    <li><span class="label">Maneuverability</span><span class="dots"></span><span class="value">${stats.maneuverability}</span></li>
    <li><span class="label">Broadside armor</span><span class="dots"></span><span class="value">${stats.broadsideArmor}</span></li>
    <li><span class="label">Hold</span><span class="dots"></span><span class="value">${stats.hold}</span></li>
    <li><span class="label">Crew</span><span class="dots"></span><span class="value">${stats.crew}</span></li>
    <li><span class="label">Length x height of the hull</span><span class="dots"></span><span class="value">${stats.hullSize}</span></li>
    <li><span class="label">Displacement</span><span class="dots"></span><span class="value">${stats.displacement}</span></li>
    <li><span class="label">Light weapons</span><span class="dots"></span><span class="value">${stats.lightWeapons}</span></li>
    <li><span class="label">Swivel guns</span><span class="dots"></span><span class="value">${stats.swivelGuns}</span></li>
    <li><span class="label">Integrity</span><span class="dots"></span><span class="value">${stats.integrity}</span></li>
  `;
}

function selectShip(shipName) {
  console.log("hello")
  const ship = shipData[shipName];
  if (!ship) {
    console.log("not found");
    return;
  }

  const selectedCard = document.querySelector(".selected-ship-card");
  const selectedImg = document.querySelector(".selected-ship-img");
  const shipname = document.querySelector(".shipname");

  if (!selectedCard || !selectedImg) return;

  selectedCard.style.display = "block";
  selectedImg.src = ship.image;
  selectedImg.alt = shipName;

  renderStats(ship.stats);
  renderCosts(ship.costs);
  renderSelfCraft(ship.costs);
  renderBuyInputs(ship.costs);
  
  shipname.textContent = shipName;
  
  const yOffset = -100; // adjust if you have a fixed header
  const y = selectedCard.getBoundingClientRect().top + window.pageYOffset + yOffset;

  window.scrollTo({
    top: y,
    behavior: "smooth"
  });
}
