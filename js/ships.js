function hideCannonConfig() {
  const panel = document.querySelector(".cannon-config-panel");
  const button = document.querySelector(".configure-cannons-btn");
  if (panel) panel.style.display = "none";
  if (button) button.textContent = "Configure Cannons";
}

function showCannonConfig() {
  const panel = document.querySelector(".cannon-config-panel");
  const button = document.querySelector(".configure-cannons-btn");
  if (panel) {
    panel.style.display = "block";
    const panelTop = panel.getBoundingClientRect().top + window.scrollY - 24;
    window.scrollTo({ top: panelTop, behavior: "smooth" });
  }
  if (button) button.textContent = "Hide Cannon Config";
}

const container = document.getElementById("main-section") || document.body;

const observer = new MutationObserver(() => {
    const shipLinks = document.querySelectorAll(".ship-card[data-ship]");

    shipLinks.forEach(link => {
        if (link.dataset.bound === "true") return;

        link.addEventListener("click", (event) => {
            const shipCard = event.target.closest(".ship-card");
            if (!shipCard) return;

            const shipName = shipCard.dataset.ship;
            selectShip(shipName);
        });

        link.dataset.bound = "true";
    });
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


const cannonCatalog = [
  { name: '6 pdr Rusty Cannon', class: 'Light', subtype: 'Cannon', estimatedCost: 50, damage: 13, reload: 10.5, costType: 'gold' },
  { name: '8 pdr Cannon', class: 'Light', subtype: 'Cannon', estimatedCost: 2460, damage: 14, reload: 9, costType: 'gold' },
  { name: '6 pdr Culverin', class: 'Light', subtype: 'Long Cannon', estimatedCost: 150, damage: 14, reload: 15.5, costType: 'gold' },
  { name: '8 pdr Culverin', class: 'Light', subtype: 'Long Cannon', estimatedCost: 3690, damage: 15, reload: 13, costType: 'gold' },
  { name: '12 pdr Carronade', class: 'Light', subtype: 'Carronade', estimatedCost: 200, damage: 20, reload: 22, costType: 'gold' },
  { name: '16 pdr Carronade', class: 'Light', subtype: 'Carronade', estimatedCost: 4920, damage: 21.5, reload: 19.5, costType: 'gold' },
  { name: 'Basilisk', class: 'Light', subtype: 'Bombard', estimatedCost: 45, damage: 17.5, reload: 18.5, costType: 'pirate_token' },
  { name: 'Poseidon', class: 'Light', subtype: 'Bombard', estimatedCost: 55, damage: 26, reload: 18, costType: 'pirate_token' },
  { name: 'Twin 6 pdr', class: 'Light', subtype: 'Bombard', estimatedCost: 7380, damage: 16, reload: 20, costType: 'gold' },

  { name: '16 pdr Cannon', class: 'Medium', subtype: 'Cannon', estimatedCost: 200, damage: 14, reload: 12, costType: 'gold' },
  { name: '18 pdr Cannon', class: 'Medium', subtype: 'Cannon', estimatedCost: 5806, damage: 15, reload: 10.5, costType: 'gold' },
  { name: '20 pdr Admiral', class: 'Medium', subtype: 'Cannon', estimatedCost: 40, damage: 17, reload: 13.5, costType: 'pirate_token' },
  { name: '16 pdr Culverin', class: 'Medium', subtype: 'Long Cannon', estimatedCost: 300, damage: 15, reload: 17.5, costType: 'gold' },
  { name: '18 pdr Long Cannon', class: 'Medium', subtype: 'Long Cannon', estimatedCost: 8688, damage: 15, reload: 13, costType: 'gold' },
  { name: '22 pdr Scorcher', class: 'Medium', subtype: 'Long Cannon', estimatedCost: 60, damage: 19, reload: 26, costType: 'pirate_token' },
  { name: '24 pdr Carronade', class: 'Medium', subtype: 'Carronade', estimatedCost: 400, damage: 21.5, reload: 25.5, costType: 'gold' },
  { name: '28 pdr Carronade', class: 'Medium', subtype: 'Carronade', estimatedCost: 11624, damage: 21.5, reload: 19.5, costType: 'gold' },
  { name: '32 pdr Stormbringer', class: 'Medium', subtype: 'Carronade', estimatedCost: 80, damage: 25.5, reload: 27.5, costType: 'pirate_token' },
  { name: 'Zeus', class: 'Medium', subtype: 'Bombard', estimatedCost: 120, damage: 19, reload: 21.5, costType: 'pirate_token' },
  { name: 'Onager', class: 'Medium', subtype: 'Bombard', estimatedCost: 150, damage: 28, reload: 20.5, costType: 'pirate_token' },
  { name: 'Twin 14 pdr', class: 'Medium', subtype: 'Bombard', estimatedCost: 17375, damage: 17, reload: 23.5, costType: 'gold' },
  { name: 'Triple 10 pdr', class: 'Medium', subtype: 'Bombard', estimatedCost: 21752, damage: 14, reload: 28.5, costType: 'gold' },
  { name: 'Alchemical Fire', class: 'Medium', subtype: 'Special', estimatedCost: 144806, damage: 80, reload: null, costType: 'gold' },
  { name: 'Imperial Bombard', class: 'Medium', subtype: 'Special', estimatedCost: 115874, damage: 34, reload: 22, costType: 'gold' },

  { name: '36 pdr Inrog', class: 'Heavy', subtype: 'Cannon', estimatedCost: 100, damage: 20, reload: 16, costType: 'pirate_token' },
  { name: '32 pdr Cannon', class: 'Heavy', subtype: 'Cannon', estimatedCost: 17471, damage: 17.5, reload: 12, costType: 'gold' },
  { name: '32 pdr Long Cannon', class: 'Heavy', subtype: 'Long Cannon', estimatedCost: 26356, damage: 18.5, reload: 17.5, costType: 'gold' },
  { name: '38 pdr Jericho', class: 'Heavy', subtype: 'Long Cannon', estimatedCost: 150, damage: 22, reload: 30.5, costType: 'pirate_token' },
  { name: '42 pdr Carronade', class: 'Heavy', subtype: 'Carronade', estimatedCost: 34544, damage: 27, reload: 26, costType: 'gold' },
  { name: '48 pdr Colossus', class: 'Heavy', subtype: 'Carronade', estimatedCost: 200, damage: 30, reload: 32, costType: 'pirate_token' },
  { name: 'Gilgamesh', class: 'Heavy', subtype: 'Bombard', estimatedCost: 300, damage: 22, reload: 25, costType: 'pirate_token' },
  { name: 'Mjolnir', class: 'Heavy', subtype: 'Bombard', estimatedCost: 380, damage: 32.5, reload: 24, costType: 'pirate_token' },
  { name: 'Twin 20 pdr', class: 'Heavy', subtype: 'Bombard', estimatedCost: 52265, damage: 20, reload: 27, costType: 'gold' },
  { name: 'Triple 16 pdr', class: 'Heavy', subtype: 'Bombard', estimatedCost: 65039, damage: 16.5, reload: 33, costType: 'gold' },

  { name: '6 inch Mortar', class: 'Mortar', subtype: 'Mortar', estimatedCost: 15375, damage: 100, reload: 20, costType: 'gold' },
  { name: '7 inch Mortar', class: 'Mortar', subtype: 'Mortar', estimatedCost: 38438, damage: 125, reload: 24, costType: 'gold' },
  { name: '8 inch Mortar', class: 'Mortar', subtype: 'Mortar', estimatedCost: 81451, damage: 150, reload: 31, costType: 'gold' },
  { name: '9 inch Mortar', class: 'Mortar', subtype: 'Mortar', estimatedCost: 162913, damage: 180, reload: 35, costType: 'gold' },
  { name: '10 inch Mortar', class: 'Mortar', subtype: 'Mortar', estimatedCost: 482520, damage: 210, reload: 38, costType: 'gold' },
  { name: '11 inch Mortar', class: 'Mortar', subtype: 'Mortar', estimatedCost: 730170, damage: 245, reload: 42, costType: 'gold' },
  { name: 'Heavy Mortar', class: 'Mortar', subtype: 'Mortar', estimatedCost: 670, damage: 155, reload: 34, costType: 'pirate_token' },
  { name: 'Barrel Launcher', class: 'Mortar', subtype: 'Mortar', estimatedCost: 500, damage: 90, reload: 25, costType: 'pirate_token' }
];

const shipBatteryClassMap = {
  pickle: 'Light', lacerf: 'Light', lacreole: 'Light', surprise: 'Medium', poltava: 'Medium', ingermanland: 'Heavy',
  horizon: 'Light', lasalamander: 'Light', blackwind: 'Light', essex: 'Medium', anson: 'Medium', sanspareil: 'Heavy', victory: 'Heavy',
  friede: 'Light', mercury: 'Light', russia: 'Light', falmouth: 'Medium', mordaunt: 'Medium', lasirene: 'Heavy', lacouronne: 'Heavy',
  phoenix: 'Light', sanmartin: 'Light', constitution: 'Medium', bellona: 'Medium', redoutable: 'Heavy', "12apostolov": 'Heavy',
  polacca: 'Light', lerequin: 'Light', kobukson: 'Medium', adventure: 'Heavy', laroyal: 'Heavy',
  balloon: 'Light', blackprince: 'Medium', devourer: 'Medium', deadfish: 'Medium', octopus: 'Heavy', huracan: 'Heavy'
};

let cannonUiInitialized = false;
let cannonGlobalHandlersBound = false;
let selectedShipKey = null;
let activeBattery = 'left';
let cannonHitAreas = [];
let batteryLoadouts = {
  left: {},
  right: {},
  front: {},
  rear: {}
};

function getCannonControls() {
  return {
    panel: document.querySelector(".cannon-config-panel"),
    toggleButton: document.querySelector(".configure-cannons-btn"),
    selectedShipName: document.querySelector(".cannon-selected-ship-name"),
    showGrid: document.getElementById("showGrid"),
    showLabels: document.getElementById("showLabels"),
    totalCannons: document.getElementById("totalCannons"),
    shipClass: document.getElementById("shipClass"),
    activeCannonLabel: document.getElementById("activeCannonLabel"),
    batteryTypeSelect: document.getElementById("batteryTypeSelect"),
    batteryQty: document.getElementById("batteryQty"),
    batteryQtyNum: document.getElementById("batteryQtyNum"),
    setBatteryQtyBtn: document.getElementById("setBatteryQtyBtn"),
    setBatteryAllBtn: document.getElementById("setBatteryAllBtn"),
    clearBatteryBtn: document.getElementById("clearBatteryBtn"),
    batterySlots: document.getElementById("batterySlots"),
    batteryAssigned: document.getElementById("batteryAssigned"),
    selectedTypeQty: document.getElementById("selectedTypeQty"),
    batteryRemaining: document.getElementById("batteryRemaining"),
    selectedTypeCost: document.getElementById("selectedTypeCost"),
    batteryRemainingCost: document.getElementById("batteryRemainingCost"),
    batteryLoadoutSummary: document.getElementById("batteryLoadoutSummary"),
    editCannonPricesBtn: document.getElementById("editCannonPricesBtn"),
    cannonPriceModal: document.getElementById("cannonPriceModal"),
    cannonPriceEditorList: document.getElementById("cannonPriceEditorList"),
    saveCannonPricesBtn: document.getElementById("saveCannonPricesBtn"),
    resetCannonPricesBtn: document.getElementById("resetCannonPricesBtn"),
    closeCannonPriceModalBtn: document.getElementById("closeCannonPriceModalBtn"),
    cannonPriceModalBackdrop: document.getElementById("cannonPriceModalBackdrop"),
    shipWideTypeSelect: document.getElementById("shipWideTypeSelect"),
    uniformAlready: document.getElementById("uniformAlready"),
    uniformNeeded: document.getElementById("uniformNeeded"),
    uniformPerCost: document.getElementById("uniformPerCost"),
    uniformTotalCost: document.getElementById("uniformTotalCost"),
    uniformSummary: document.getElementById("uniformSummary"),
    canvas: document.getElementById("deckCanvas")
  };
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function formatGold(value) {
  return `${Number(value || 0).toLocaleString()} G`;
}

function formatCannonCost(cannon, multiplier = 1) {
  const safeMultiplier = multiplier === undefined || multiplier === null ? 1 : Number(multiplier);
  const value = Number(cannon?.estimatedCost || 0) * (Number.isNaN(safeMultiplier) ? 1 : safeMultiplier);
  if (cannon?.costType === 'pirate_token') {
    return `${value.toLocaleString()} pirate tokens`;
  }
  return formatGold(value);
}

function formatDamageValue(value) {
  return Number(value || 0).toLocaleString(undefined, { maximumFractionDigits: 1 });
}

function formatReloadValue(value) {
  if (value == null || Number.isNaN(Number(value))) return '—';
  return `${Number(value).toLocaleString(undefined, { maximumFractionDigits: 1 })}s`;
}

function getBatteryMetrics(battery) {
  const loadout = batteryLoadouts[battery] || {};
  let totalDamage = 0;
  let totalQty = 0;
  let weightedReload = 0;

  for (const [name, qty] of Object.entries(loadout)) {
    const cannon = findCannonByName(name);
    if (!cannon || qty <= 0) continue;
    const damage = Number(cannon.damage || 0);
    const reload = cannon.reload == null ? null : Number(cannon.reload);
    totalDamage += damage * qty;
    totalQty += qty;
    if (reload != null && !Number.isNaN(reload)) {
      weightedReload += reload * qty;
    }
  }

  return {
    totalDamage,
    reload: totalQty ? (weightedReload / totalQty) : null,
    assigned: totalQty
  };
}


function drawBatteryStats(ctx, title, metrics, x, y, align = 'center') {
  ctx.save();
  ctx.font = 'bold 22px Arial';
  ctx.textAlign = align;
  ctx.fillStyle = '#ffffff';

  const damageText = `Damage: ${formatDamageValue(metrics.totalDamage)}`;
  const reloadText = `Reload: ${formatReloadValue(metrics.reload)}`;

  ctx.fillText(damageText, x, y);
  ctx.font = 'bold 22px Arial';
  ctx.fillStyle = '#cbd5e1';
  ctx.fillText(reloadText, x, y + 26);

  ctx.restore();
}


function getBatteryDisplayName(battery) {
  if (battery === 'left') return 'port cannons';
  if (battery === 'right') return 'starboard cannons';
  if (battery === 'front') return 'bow cannons';
  if (battery === 'rear') return 'stern cannons';
  return 'cannons';
}

function parseLightWeapons(lightWeapons) {
  const [front = 0, broadside = 0, rear = 0] = String(lightWeapons)
    .split('-')
    .map(v => parseInt(v, 10) || 0);

  return { front, left: broadside, right: broadside, rear };
}

function getSelectedShipState() {
  const ship = shipData[selectedShipKey];
  if (!ship?.stats?.lightWeapons) {
    return {
      leftCannons: 0,
      rightCannons: 0,
      frontCannons: 0,
      rearCannons: 0,
      enableFront: false,
      enableRear: false,
      showGrid: true,
      showLabels: true
    };
  }

  const weapons = parseLightWeapons(ship.stats.lightWeapons);
  const controls = getCannonControls();

  return {
    leftCannons: weapons.left,
    rightCannons: weapons.right,
    frontCannons: weapons.front,
    rearCannons: weapons.rear,
    enableFront: weapons.front > 0,
    enableRear: weapons.rear > 0,
    showGrid: controls.showGrid ? controls.showGrid.checked : true,
    showLabels: controls.showLabels ? controls.showLabels.checked : true
  };
}

function getBatteryClass(shipKey) {
  return shipBatteryClassMap[shipKey] || 'Light';
}

function getCompatibleCannons(shipKey) {
  const batteryClass = getBatteryClass(shipKey);
  return cannonCatalog.filter(cannon => cannon.class === batteryClass);
}

function findCannonByName(name) {
  return cannonCatalog.find(cannon => cannon.name === name) || null;
}

const CANNON_PRICE_STORAGE_KEY = 'ship-cannon-custom-prices-v1';

function slugifyCannonName(name) {
  return String(name || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

const defaultCannonPrices = Object.fromEntries(
  cannonCatalog
    .filter(cannon => cannon.costType !== 'pirate_token')
    .map(cannon => [cannon.name, Number(cannon.estimatedCost || 0)])
);

function getStoredCannonPrices() {
  try {
    const raw = localStorage.getItem(CANNON_PRICE_STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === 'object' ? parsed : {};
  } catch (error) {
    return {};
  }
}

function saveStoredCannonPrices(priceMap) {
  try {
    localStorage.setItem(CANNON_PRICE_STORAGE_KEY, JSON.stringify(priceMap));
  } catch (error) {
    console.warn('Unable to save custom cannon prices', error);
  }
}

function applyStoredCannonPrices() {
  const stored = getStoredCannonPrices();
  cannonCatalog.forEach(cannon => {
    if (cannon.costType === 'pirate_token') return;
    const nextValue = Number(stored[cannon.name]);
    cannon.estimatedCost = Number.isFinite(nextValue) && nextValue >= 0
      ? Math.round(nextValue)
      : defaultCannonPrices[cannon.name];
  });
}

function resetStoredCannonPrices() {
  cannonCatalog.forEach(cannon => {
    if (cannon.costType === 'pirate_token') return;
    cannon.estimatedCost = defaultCannonPrices[cannon.name];
  });

  try {
    localStorage.removeItem(CANNON_PRICE_STORAGE_KEY);
  } catch (error) {
    console.warn('Unable to clear custom cannon prices', error);
  }
}

function renderCannonPriceEditor() {
  const controls = getCannonControls();
  if (!controls.cannonPriceEditorList) return;

  const groups = {};
  cannonCatalog
    .filter(cannon => cannon.costType !== 'pirate_token')
    .forEach(cannon => {
      const key = cannon.class || 'Other';
      if (!groups[key]) groups[key] = [];
      groups[key].push(cannon);
    });

  const order = ['Light', 'Medium', 'Heavy', 'Mortar', 'Other'];
  const html = order
    .filter(groupName => groups[groupName]?.length)
    .map(groupName => {
      const items = groups[groupName].map(cannon => `
        <div class="cannon-price-item">
          <label for="price-${slugifyCannonName(cannon.name)}">${cannon.name}</label>
          <small>${cannon.subtype || ''}</small>
          <input
            id="price-${slugifyCannonName(cannon.name)}"
            type="number"
            min="0"
            step="1"
            data-cannon-price-name="${cannon.name}"
            value="${Number(cannon.estimatedCost || 0)}"
          />
        </div>
      `).join('');

      return `
        <section class="cannon-price-group">
          <div class="cannon-price-group-title">${groupName} Cannons</div>
          <div class="cannon-price-grid">${items}</div>
        </section>
      `;
    })
    .join('');

  controls.cannonPriceEditorList.innerHTML = html || '<div class="cannon-footer-note">No editable cannon prices found.</div>';
}

function openCannonPriceModal() {
  const controls = getCannonControls();
  if (!controls.cannonPriceModal) return;
  renderCannonPriceEditor();
  controls.cannonPriceModal.style.display = 'block';
}

function closeCannonPriceModal() {
  const controls = getCannonControls();
  if (!controls.cannonPriceModal) return;
  controls.cannonPriceModal.style.display = 'none';
}

function saveCannonPriceEditor() {
  const controls = getCannonControls();
  if (!controls.cannonPriceEditorList) return;

  const nextPrices = {};
  controls.cannonPriceEditorList
    .querySelectorAll('[data-cannon-price-name]')
    .forEach(input => {
      const name = input.dataset.cannonPriceName;
      const value = Math.max(0, Math.round(Number(input.value || 0)));
      const cannon = findCannonByName(name);
      if (!cannon || cannon.costType === 'pirate_token') return;
      cannon.estimatedCost = value;
      nextPrices[name] = value;
    });

  saveStoredCannonPrices(nextPrices);
  refreshBatteryEditor();
  refreshUniformCalculator();
  drawCannonConfigurator();
  closeCannonPriceModal();
}

applyStoredCannonPrices();

function getBatterySlotCount(state, battery) {
  if (battery === 'left') return state.leftCannons;
  if (battery === 'right') return state.rightCannons;
  if (battery === 'front') return state.enableFront ? state.frontCannons : 0;
  if (battery === 'rear') return state.enableRear ? state.rearCannons : 0;
  return 0;
}

function getBatteryAssignedCount(battery) {
  return Object.values(batteryLoadouts[battery] || {}).reduce((sum, qty) => sum + qty, 0);
}

function getSelectedTypeQtyForBattery(battery, cannonName) {
  return batteryLoadouts[battery]?.[cannonName] || 0;
}

function summarizeBatteryLoadout(battery) {
  const entries = Object.entries(batteryLoadouts[battery] || {}).filter(([, qty]) => qty > 0);
  if (!entries.length) return 'No cannon types assigned yet.';
  return entries.map(([name, qty]) => `${qty} × ${name}`).join(', ');
}

function fillSelectWithCannons(selectEl, shipKey, preferredValue = '') {
  if (!selectEl) return;

  const compatible = getCompatibleCannons(shipKey);
  const previousValue = preferredValue || selectEl.value;
  selectEl.innerHTML = '';

  compatible.forEach(cannon => {
    const option = document.createElement('option');
    option.value = cannon.name;
    option.textContent = `${cannon.name} (${cannon.subtype}) - ${formatCannonCost(cannon)}`;
    selectEl.appendChild(option);
  });

  const hasPrevious = compatible.some(cannon => cannon.name === previousValue);
  if (hasPrevious) {
    selectEl.value = previousValue;
  } else if (compatible.length) {
    selectEl.value = compatible[0].name;
  }
}

function setEntireBatteryToType(battery, cannonName) {
  const state = getSelectedShipState();
  const slots = getBatterySlotCount(state, battery);
  if (!slots) return;

  batteryLoadouts[battery] = { [cannonName]: slots };
  refreshBatteryEditor();
  drawCannonConfigurator();
}

function setBatteryTypeQuantity(battery, cannonName, qty) {
  const state = getSelectedShipState();
  const slots = getBatterySlotCount(state, battery);
  qty = clamp(parseInt(qty || 0, 10), 0, slots);

  if (!batteryLoadouts[battery]) batteryLoadouts[battery] = {};

  const current = { ...batteryLoadouts[battery] };
  current[cannonName] = qty;

  let total = Object.values(current).reduce((sum, count) => sum + count, 0);

  if (total > slots) {
    let overflow = total - slots;
    const otherTypes = Object.keys(current).filter(name => name !== cannonName);

    for (const other of otherTypes) {
      if (overflow <= 0) break;
      const removable = Math.min(current[other], overflow);
      current[other] -= removable;
      overflow -= removable;

      if (current[other] <= 0) {
        delete current[other];
      }
    }

    if (overflow > 0) {
      current[cannonName] = Math.max(0, current[cannonName] - overflow);
    }
  }

  if (current[cannonName] <= 0) {
    delete current[cannonName];
  }

  batteryLoadouts[battery] = current;
  refreshBatteryEditor();
  drawCannonConfigurator();
}

function clearBatteryLoadout(battery) {
  batteryLoadouts[battery] = {};
  refreshBatteryEditor();
  drawCannonConfigurator();
}

function resetLoadoutsForShip() {
  batteryLoadouts = {
    left: {},
    right: {},
    front: {},
    rear: {}
  };
}

function getShipWideCompatibleSlotCount(shipKey, cannonClass) {
  const state = getSelectedShipState();
  const batteries = ['left', 'right', 'front', 'rear'];

  return batteries.reduce((sum, battery) => {
    if (getBatteryClass(shipKey) !== cannonClass) return sum;
    return sum + getBatterySlotCount(state, battery);
  }, 0);
}

function getShipWideSelectedCountForType(shipKey, cannonClass, cannonName) {
  const batteries = ['left', 'right', 'front', 'rear'];

  return batteries.reduce((sum, battery) => {
    if (getBatteryClass(shipKey) !== cannonClass) return sum;
    return sum + (batteryLoadouts[battery]?.[cannonName] || 0);
  }, 0);
}

function refreshUniformCalculator() {
  const controls = getCannonControls();
  if (!controls.shipWideTypeSelect || !selectedShipKey) return;

  const currentBatteryClass = getBatteryClass(selectedShipKey);
  const compatible = cannonCatalog.filter(cannon => cannon.class === currentBatteryClass);
  const previousValue = controls.shipWideTypeSelect.value;

  controls.shipWideTypeSelect.innerHTML = '';
  compatible.forEach(cannon => {
    const option = document.createElement('option');
    option.value = cannon.name;
    option.textContent = `${cannon.name} (${cannon.subtype}) - ${formatCannonCost(cannon)}`;
    controls.shipWideTypeSelect.appendChild(option);
  });

  const hasPrevious = compatible.some(cannon => cannon.name === previousValue);
  if (hasPrevious) {
    controls.shipWideTypeSelect.value = previousValue;
  } else if (compatible.length) {
    controls.shipWideTypeSelect.value = compatible[0].name;
  }

  const selectedName = controls.shipWideTypeSelect.value;
  const cannon = findCannonByName(selectedName);

  if (!cannon) {
    controls.uniformAlready.textContent = '0';
    controls.uniformNeeded.textContent = '0';
    controls.uniformPerCost.textContent = '0 G';
    controls.uniformTotalCost.textContent = '0 G';
    controls.uniformSummary.textContent = 'Choose a cannon type to calculate the ship-wide fill cost.';
    return;
  }

  const totalCompatibleSlots = getShipWideCompatibleSlotCount(selectedShipKey, cannon.class);
  const alreadySelected = getShipWideSelectedCountForType(selectedShipKey, cannon.class, cannon.name);
  const stillNeeded = Math.max(0, totalCompatibleSlots - alreadySelected);
  const totalCost = stillNeeded * cannon.estimatedCost;

  controls.uniformAlready.textContent = alreadySelected;
  controls.uniformNeeded.textContent = stillNeeded;
  controls.uniformPerCost.textContent = formatCannonCost(cannon);
  controls.uniformTotalCost.textContent = formatCannonCost(cannon, stillNeeded);
  controls.uniformSummary.textContent =
    `${getShipDisplayName(selectedShipKey)}: ${stillNeeded} more ${cannon.name} needed to fill all ${cannon.class.toLowerCase()} cannon slots.`;
}

function refreshBatteryEditor() {
  const controls = getCannonControls();
  if (!controls.batteryTypeSelect || !selectedShipKey) return;

  const state = getSelectedShipState();
  const slots = getBatterySlotCount(state, activeBattery);
  const assigned = getBatteryAssignedCount(activeBattery);
  const remaining = Math.max(0, slots - assigned);
  const previousBatteryType = controls.batteryTypeSelect.value;

  fillSelectWithCannons(controls.batteryTypeSelect, selectedShipKey, previousBatteryType);

  controls.activeCannonLabel.textContent = getBatteryDisplayName(activeBattery);
  controls.batterySlots.textContent = slots;
  controls.batteryAssigned.textContent = assigned;
  controls.batteryQty.max = slots;
  controls.batteryQtyNum.max = slots;

  const selectedType = controls.batteryTypeSelect.value;
  const selectedTypeQty = getSelectedTypeQtyForBattery(activeBattery, selectedType || '');
  const selectedCannon = findCannonByName(selectedType);
  const selectedTypeCost = (selectedCannon?.estimatedCost || 0) * selectedTypeQty;
  const remainingFillCost = (selectedCannon?.estimatedCost || 0) * remaining;

  controls.batteryQty.value = selectedTypeQty;
  controls.batteryQtyNum.value = selectedTypeQty;
  controls.selectedTypeQty.textContent = selectedTypeQty;
  controls.batteryRemaining.textContent = remaining;
  controls.selectedTypeCost.textContent = selectedCannon ? formatCannonCost(selectedCannon, selectedTypeQty) : formatGold(0);
  controls.batteryRemainingCost.textContent = selectedCannon ? formatCannonCost(selectedCannon, remaining) : formatGold(0);
  controls.batteryLoadoutSummary.textContent =
    `${summarizeBatteryLoadout(activeBattery)} | Remaining cost to fill ${getBatteryDisplayName(activeBattery)} with ${selectedType || 'selected type'}: ${selectedCannon ? formatCannonCost(selectedCannon, remaining) : formatGold(remainingFillCost)}`;

  controls.totalCannons.textContent =
    state.leftCannons + state.rightCannons + (state.enableFront ? state.frontCannons : 0) + (state.enableRear ? state.rearCannons : 0);
  controls.shipClass.textContent = getShipDisplayName(selectedShipKey);

  refreshUniformCalculator();
}

function getShipDisplayName(shipKey) {
  const shipCard = document.querySelector(`.ship-card[data-ship="${shipKey}"] div:last-child`);
  if (shipCard?.textContent?.trim()) {
    return shipCard.textContent.trim();
  }

  return shipKey
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/^\w/, char => char.toUpperCase());
}

function syncBatteryQtyPair() {
  const controls = getCannonControls();
  if (!controls.batteryQty || controls.batteryQty.dataset.bound === 'true') return;

  const apply = value => {
    const max = parseInt(controls.batteryQty.max || '85', 10);
    const nextValue = clamp(parseInt(value || 0, 10), 0, max);
    controls.batteryQty.value = nextValue;
    controls.batteryQtyNum.value = nextValue;
  };

  controls.batteryQty.addEventListener('input', () => apply(controls.batteryQty.value));
  controls.batteryQtyNum.addEventListener('input', () => apply(controls.batteryQtyNum.value));
  controls.batteryQty.dataset.bound = 'true';
  apply(controls.batteryQty.value);
}

function roundedPath(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

function drawHull(ctx, cx, topY, deckLength, maxBeam) {
  const bottomY = topY + deckLength;
  const samples = 80;

  ctx.beginPath();
  ctx.moveTo(cx, topY - 44);

  for (let i = 0; i <= samples; i++) {
    const y = topY + (deckLength * i) / samples;
    const width = hullHalfWidthAtY(y, topY, deckLength, maxBeam);
    ctx.lineTo(cx + width, y);
  }

  ctx.quadraticCurveTo(cx + maxBeam * 0.18, bottomY + 30, cx, bottomY + 42);
  ctx.quadraticCurveTo(cx - maxBeam * 0.18, bottomY + 30, cx - hullHalfWidthAtY(bottomY, topY, deckLength, maxBeam), bottomY);

  for (let i = samples; i >= 0; i--) {
    const y = topY + (deckLength * i) / samples;
    const width = hullHalfWidthAtY(y, topY, deckLength, maxBeam);
    ctx.lineTo(cx - width, y);
  }

  ctx.quadraticCurveTo(cx - maxBeam * 0.18, topY - 8, cx, topY - 44);
  ctx.closePath();

  const hullGradient = ctx.createLinearGradient(0, topY, 0, bottomY);
  hullGradient.addColorStop(0, '#9a6735');
  hullGradient.addColorStop(0.5, '#8b5a2b');
  hullGradient.addColorStop(1, '#6e431d');
  ctx.fillStyle = hullGradient;
  ctx.fill();
  ctx.lineWidth = 12;
  ctx.strokeStyle = '#4b2e13';
  ctx.stroke();
}

function drawDeckLines(ctx, cx, topY, deckLength, maxBeam) {
  for (let i = 0; i <= 16; i++) {
    const y = topY + (deckLength / 16) * i;
    const t = (y - topY) / deckLength;
    const beam = maxBeam * (0.55 + Math.sin(t * Math.PI) * 0.45);

    ctx.beginPath();
    ctx.moveTo(cx - beam * 0.85, y);
    ctx.lineTo(cx + beam * 0.85, y);
    ctx.strokeStyle = 'rgba(255,255,255,0.08)';
    ctx.lineWidth = 2;
    ctx.stroke();
  }

  for (let i = -3; i <= 3; i++) {
    const x = cx + i * 40;
    ctx.beginPath();
    ctx.moveTo(x, topY + 40);
    ctx.lineTo(x, topY + deckLength - 40);
    ctx.strokeStyle = 'rgba(0,0,0,0.08)';
    ctx.lineWidth = 1.5;
    ctx.stroke();
  }
}

function drawCannon(ctx, x, y, angle, scale = 1) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);
  ctx.scale(scale, scale);

  roundedPath(ctx, -16, -10, 26, 20, 6);
  ctx.fillStyle = '#3f2b1b';
  ctx.fill();

  ctx.fillStyle = '#1f2937';
  roundedPath(ctx, -4, -6, 30, 12, 5);
  ctx.fill();

  ctx.beginPath();
  ctx.arc(-10, 12, 4, 0, Math.PI * 2);
  ctx.arc(4, 12, 4, 0, Math.PI * 2);
  ctx.fillStyle = '#111827';
  ctx.fill();

  ctx.restore();
}

function drawLabel(ctx, text, x, y) {
  ctx.save();
  ctx.font = 'bold 22px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  const padX = 12;
  const width = ctx.measureText(text).width + padX * 2;
  const height = 34;
  const clampedX = clamp(x, width / 2 + 12, ctx.canvas.width - width / 2 - 12);
  const clampedY = clamp(y, height / 2 + 12, ctx.canvas.height - height / 2 - 12);

  roundedPath(ctx, clampedX - width / 2, clampedY - height / 2, width, height, 10);
  ctx.fillStyle = 'rgba(11,18,32,0.82)';
  ctx.fill();
  ctx.fillStyle = '#e5e7eb';
  ctx.fillText(text, clampedX, clampedY + 1);
  ctx.restore();
}

function drawBatterySelectionBadge(ctx, text, x, y) {
  ctx.save();
  ctx.font = 'bold 22px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  const width = ctx.measureText(text).width + 22;
  const height = 32;
  const clampedX = clamp(x, width / 2 + 12, ctx.canvas.width - width / 2 - 12);
  const clampedY = clamp(y, height / 2 + 12, ctx.canvas.height - height / 2 - 12);

  roundedPath(ctx, clampedX - width / 2, clampedY - height / 2, width, height, 12);
  ctx.fillStyle = 'rgba(245, 158, 11, 0.96)';
  ctx.fill();
  ctx.fillStyle = '#111827';
  ctx.fillText(text, clampedX, clampedY + 1);
  ctx.restore();
}

function distributeAlongSide(count, startY, endY) {
  const points = [];
  if (count <= 0) return points;
  if (count === 1) return [(startY + endY) / 2];
  const span = endY - startY;
  const step = span / (count - 1);
  for (let i = 0; i < count; i++) {
    points.push(startY + i * step);
  }
  return points;
}

function hullHalfWidthAtY(y, topY, deckLength, maxBeam) {
  const t = clamp((y - topY) / deckLength, 0, 1);

  if (t < 0.14) {
    const u = t / 0.14;
    return maxBeam * (0.08 + 0.22 * Math.sin(u * Math.PI * 0.5));
  }
  if (t < 0.3) {
    const u = (t - 0.14) / 0.16;
    return maxBeam * (0.3 + 0.16 * u);
  }
  if (t < 0.68) {
    const u = (t - 0.3) / 0.38;
    return maxBeam * (0.46 + 0.12 * Math.sin(u * Math.PI));
  }
  if (t < 0.9) {
    const u = (t - 0.68) / 0.22;
    return maxBeam * (0.46 - 0.18 * u);
  }

  const u = (t - 0.9) / 0.1;
  return maxBeam * (0.28 - 0.14 * u);
}

function hullSideAngleAtY(y, topY, deckLength, maxBeam, side = 1) {
  const delta = 6;
  const y1 = Math.max(topY, y - delta);
  const y2 = Math.min(topY + deckLength, y + delta);
  const x1 = side * hullHalfWidthAtY(y1, topY, deckLength, maxBeam);
  const x2 = side * hullHalfWidthAtY(y2, topY, deckLength, maxBeam);
  return Math.atan2(y2 - y1, x2 - x1);
}

function cannonScaleForCount(count) {
  if (count <= 12) return 1;
  if (count <= 20) return 0.94;
  if (count <= 28) return 0.88;
  if (count <= 36) return 0.8;
  if (count <= 44) return 0.72;
  return 0.64;
}

function cannonBandForCount(count) {
  if (count <= 12) return { start: 120, end: 150 };
  if (count <= 24) return { start: 100, end: 132 };
  if (count <= 36) return { start: 88, end: 118 };
  return { start: 78, end: 104 };
}

function sideInsetForCount(count) {
  if (count <= 12) return 28;
  if (count <= 24) return 25;
  if (count <= 36) return 22;
  return 19;
}

function frontRearScale(count) {
  if (count <= 4) return 1;
  if (count <= 6) return 0.9;
  if (count <= 8) return 0.82;
  return 0.74;
}

function drawCannonConfigurator() {
  const controls = getCannonControls();
  const canvas = controls.canvas;
  if (!canvas || !selectedShipKey) return;

  const ctx = canvas.getContext('2d');
  const state = getSelectedShipState();

  refreshBatteryEditor();
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  cannonHitAreas = [];

  const maxSide = Math.max(state.leftCannons, state.rightCannons);
  const paddingY = 64;
  const paddingX = 140;
  const usableHeight = canvas.height - paddingY * 2;
  const usableWidth = canvas.width - paddingX * 2;

  const desiredLength = 640 + maxSide * 6.8;
  const deckLength = Math.min(desiredLength, usableHeight - 12);
  const maxBeamFromCount = 195 + Math.min(maxSide, 85) * 0.72;
  const maxBeam = Math.min(maxBeamFromCount, usableWidth * 0.31);

  const cx = canvas.width / 2;
  const topY = Math.max(44, (canvas.height - deckLength) / 2);
  const bottomY = topY + deckLength;

  drawHull(ctx, cx, topY, deckLength, maxBeam);

  if (true) {
    drawDeckLines(ctx, cx, topY, deckLength, maxBeam);
  }

  roundedPath(ctx, cx - 48, topY + 32, 96, deckLength - 64, 18);
  ctx.fillStyle = 'rgba(255,255,255,0.05)';
  ctx.fill();

  roundedPath(ctx, cx - maxBeam * 0.4, topY + 36, maxBeam * 0.8, 70, 18);
  ctx.fillStyle = 'rgba(255,255,255,0.06)';
  ctx.fill();

  roundedPath(ctx, cx - maxBeam * 0.42, bottomY - 126, maxBeam * 0.84, 76, 18);
  ctx.fillStyle = 'rgba(0,0,0,0.08)';
  ctx.fill();

  const band = cannonBandForCount(maxSide);
  const cannonStartY = topY + band.start;
  const cannonEndY = bottomY - band.end;
  const portYs = distributeAlongSide(state.leftCannons, cannonStartY, cannonEndY);
  const starboardYs = distributeAlongSide(state.rightCannons, cannonStartY, cannonEndY);
  const portScale = cannonScaleForCount(state.leftCannons);
  const starboardScale = cannonScaleForCount(state.rightCannons);
  const portInset = sideInsetForCount(state.leftCannons);
  const starboardInset = sideInsetForCount(state.rightCannons);

  portYs.forEach(y => {
    const halfWidth = hullHalfWidthAtY(y, topY, deckLength, maxBeam);
    const tangentAngle = hullSideAngleAtY(y, topY, deckLength, maxBeam, -1);
    const outwardAngle = tangentAngle - Math.PI / 2;
    const x = cx - halfWidth + portInset;
    drawCannon(ctx, x, y, outwardAngle + Math.PI, portScale);
    cannonHitAreas.push({ battery: 'left', x, y, r: 18 * portScale });
  });

  starboardYs.forEach(y => {
    const halfWidth = hullHalfWidthAtY(y, topY, deckLength, maxBeam);
    const tangentAngle = hullSideAngleAtY(y, topY, deckLength, maxBeam, 1);
    const outwardAngle = tangentAngle + Math.PI / 2;
    const x = cx + halfWidth - starboardInset;
    drawCannon(ctx, x, y, outwardAngle + Math.PI, starboardScale);
    cannonHitAreas.push({ battery: 'right', x, y, r: 18 * starboardScale });
  });

  if (state.enableFront && state.frontCannons > 0) {
    const frontScaleValue = frontRearScale(state.frontCannons);
    const spread = Math.min(maxBeam * 0.72, 38 + state.frontCannons * 15);

    for (let i = 0; i < state.frontCannons; i++) {
      const x = cx + (state.frontCannons === 1 ? 0 : (-spread / 2 + (spread / (state.frontCannons - 1)) * i));
      const y = topY + 58;
      drawCannon(ctx, x, y, -Math.PI / 2, frontScaleValue);
      cannonHitAreas.push({ battery: 'front', x, y, r: 18 * frontScaleValue });
    }
  }

  if (state.enableRear && state.rearCannons > 0) {
    const rearScaleValue = frontRearScale(state.rearCannons);
    const spread = Math.min(maxBeam * 0.78, 38 + state.rearCannons * 15);

    for (let i = 0; i < state.rearCannons; i++) {
      const x = cx + (state.rearCannons === 1 ? 0 : (-spread / 2 + (spread / (state.rearCannons - 1)) * i));
      const y = bottomY - 26;
      drawCannon(ctx, x, y, Math.PI / 2, rearScaleValue);
      cannonHitAreas.push({ battery: 'rear', x, y, r: 18 * rearScaleValue });
    }
  }

  ctx.beginPath();
  ctx.moveTo(cx - maxBeam * 0.32, topY + 18);
  ctx.lineTo(cx + maxBeam * 0.32, topY + 18);
  ctx.moveTo(cx - maxBeam * 0.36, bottomY - 22);
  ctx.lineTo(cx + maxBeam * 0.36, bottomY - 22);
  ctx.strokeStyle = 'rgba(255,255,255,0.14)';
  ctx.lineWidth = 3;
  ctx.stroke();

  const sideLabelY = topY + deckLength * 0.5 - 18;
  const sideStatsY = sideLabelY + 46;
  const portX = cx - maxBeam - 120;
  const starboardX = cx + maxBeam + 120;
  const bowLabelY = topY - 18;
  const bowStatsX = cx + 120;
  const bowStatsY = topY + 8;
  const sternLabelY = bottomY + 24;
  const sternStatsY = bottomY + 72;

  if (true) {
    drawLabel(ctx, 'Bow', cx, bowLabelY);
    drawLabel(ctx, 'Stern', cx, sternLabelY);
    drawLabel(ctx, 'Port', portX, sideLabelY);
    drawLabel(ctx, 'Starboard', starboardX, sideLabelY);
  }

  const portMetrics = getBatteryMetrics('left');
  const starboardMetrics = getBatteryMetrics('right');
  const bowMetrics = getBatteryMetrics('front');
  const sternMetrics = getBatteryMetrics('rear');

  drawBatteryStats(ctx, 'Port', portMetrics, portX, sideStatsY);
  drawBatteryStats(ctx, 'Starboard', starboardMetrics, starboardX, sideStatsY);
  drawBatteryStats(ctx, 'Bow', bowMetrics, bowStatsX, bowStatsY, 'left');
  drawBatteryStats(ctx, 'Stern', sternMetrics, cx + 120, sternStatsY - 40, 'left');

  if (activeBattery === 'left') drawBatterySelectionBadge(ctx, 'PORT CANNONS', portX, sideLabelY - 44);
  if (activeBattery === 'right') drawBatterySelectionBadge(ctx, 'STARBOARD CANNONS', starboardX, sideLabelY - 44);
  if (activeBattery === 'front') drawBatterySelectionBadge(ctx, 'BOW CANNONS', cx, bowLabelY - 34);
  if (activeBattery === 'rear') drawBatterySelectionBadge(ctx, 'STERN CANNONS', cx, sternStatsY + 52);
}

function bindCannonConfigurator() {
  const controls = getCannonControls();
  if (!controls.panel || !controls.toggleButton || !controls.canvas) return;

  const panelVisible = controls.panel.style.display === 'block';
  controls.toggleButton.textContent = panelVisible ? 'Hide Cannon Config' : 'Configure Cannons';

  if (!controls.toggleButton.dataset.bound) {
    controls.toggleButton.addEventListener('click', () => {
      const liveControls = getCannonControls();
      if (!liveControls.panel || !liveControls.toggleButton) return;

      const currentlyVisible = liveControls.panel.style.display === 'block';
      liveControls.panel.style.display = currentlyVisible ? 'none' : 'block';
      liveControls.toggleButton.textContent = currentlyVisible ? 'Configure Cannons' : 'Hide Cannon Config';

      if (!currentlyVisible) {
        drawCannonConfigurator();

        requestAnimationFrame(() => {
          const panelTop = liveControls.panel.getBoundingClientRect().top + window.scrollY - 24;
          window.scrollTo({ top: panelTop, behavior: 'smooth' });
        });
      }
    });
    controls.toggleButton.dataset.bound = 'true';
  }

  syncBatteryQtyPair();

  if (controls.showGrid && !controls.showGrid.dataset.bound) {
    controls.showGrid.addEventListener('change', drawCannonConfigurator);
    controls.showGrid.dataset.bound = 'true';
  }

  if (controls.showLabels && !controls.showLabels.dataset.bound) {
    controls.showLabels.addEventListener('change', drawCannonConfigurator);
    controls.showLabels.dataset.bound = 'true';
  }

  if (controls.batteryTypeSelect && !controls.batteryTypeSelect.dataset.bound) {
    controls.batteryTypeSelect.addEventListener('change', refreshBatteryEditor);
    controls.batteryTypeSelect.dataset.bound = 'true';
  }

  if (controls.shipWideTypeSelect && !controls.shipWideTypeSelect.dataset.bound) {
    controls.shipWideTypeSelect.addEventListener('change', refreshUniformCalculator);
    controls.shipWideTypeSelect.dataset.bound = 'true';
  }

  if (controls.editCannonPricesBtn && !controls.editCannonPricesBtn.dataset.bound) {
    controls.editCannonPricesBtn.addEventListener('click', openCannonPriceModal);
    controls.editCannonPricesBtn.dataset.bound = 'true';
  }

  if (controls.closeCannonPriceModalBtn && !controls.closeCannonPriceModalBtn.dataset.bound) {
    controls.closeCannonPriceModalBtn.addEventListener('click', closeCannonPriceModal);
    controls.closeCannonPriceModalBtn.dataset.bound = 'true';
  }

  if (controls.cannonPriceModalBackdrop && !controls.cannonPriceModalBackdrop.dataset.bound) {
    controls.cannonPriceModalBackdrop.addEventListener('click', closeCannonPriceModal);
    controls.cannonPriceModalBackdrop.dataset.bound = 'true';
  }

  if (controls.saveCannonPricesBtn && !controls.saveCannonPricesBtn.dataset.bound) {
    controls.saveCannonPricesBtn.addEventListener('click', saveCannonPriceEditor);
    controls.saveCannonPricesBtn.dataset.bound = 'true';
  }

  if (controls.resetCannonPricesBtn && !controls.resetCannonPricesBtn.dataset.bound) {
    controls.resetCannonPricesBtn.addEventListener('click', () => {
      resetStoredCannonPrices();
      renderCannonPriceEditor();
      refreshBatteryEditor();
      refreshUniformCalculator();
      drawCannonConfigurator();
    });
    controls.resetCannonPricesBtn.dataset.bound = 'true';
  }

  if (controls.setBatteryQtyBtn && !controls.setBatteryQtyBtn.dataset.bound) {
    controls.setBatteryQtyBtn.addEventListener('click', () => {
      const liveControls = getCannonControls();
      const cannonName = liveControls.batteryTypeSelect?.value;
      if (!cannonName) return;
      setBatteryTypeQuantity(activeBattery, cannonName, liveControls.batteryQty?.value);
    });
    controls.setBatteryQtyBtn.dataset.bound = 'true';
  }

  if (controls.setBatteryAllBtn && !controls.setBatteryAllBtn.dataset.bound) {
    controls.setBatteryAllBtn.addEventListener('click', () => {
      const liveControls = getCannonControls();
      const cannonName = liveControls.batteryTypeSelect?.value;
      if (!cannonName) return;
      setEntireBatteryToType(activeBattery, cannonName);
    });
    controls.setBatteryAllBtn.dataset.bound = 'true';
  }

  if (controls.clearBatteryBtn && !controls.clearBatteryBtn.dataset.bound) {
    controls.clearBatteryBtn.addEventListener('click', () => {
      clearBatteryLoadout(activeBattery);
    });
    controls.clearBatteryBtn.dataset.bound = 'true';
  }

  if (controls.canvas && !controls.canvas.dataset.bound) {
    controls.canvas.addEventListener('click', event => {
      const liveControls = getCannonControls();
      const canvas = liveControls.canvas;
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;
      const x = (event.clientX - rect.left) * scaleX;
      const y = (event.clientY - rect.top) * scaleY;

      for (const hit of cannonHitAreas) {
        const dx = x - hit.x;
        const dy = y - hit.y;

        if ((dx * dx) + (dy * dy) <= hit.r * hit.r) {
          activeBattery = hit.battery;
          refreshBatteryEditor();
          drawCannonConfigurator();
          return;
        }
      }
    });
    controls.canvas.dataset.bound = 'true';
  }

  if (!cannonGlobalHandlersBound) {
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape') closeCannonPriceModal();
    });
    cannonGlobalHandlersBound = true;
  }

  cannonUiInitialized = true;
}


function clearSelectedShipView() {
  const titleEl = document.getElementById('selected-ship-title');
  const cardEl = document.getElementById('selected-ship-card');
  if (titleEl) titleEl.textContent = '';
  if (cardEl) cardEl.style.display = 'none';
}

function initializeShipsPage() {
  clearSelectedShipView();
  bindCannonConfigurator();
}

function selectShip(shipName) {
  hideCannonConfig();
  const ship = shipData[shipName];
  if (!ship) {
    return;
  }

  const selectedCard = document.querySelector(".selected-ship-card");
  const selectedImg = document.querySelector(".selected-ship-img");
  const shipname = document.querySelector(".shipname");

  if (!selectedCard || !selectedImg || !shipname) return;

  selectedShipKey = shipName;
  activeBattery = 'left';

  selectedCard.style.display = "block";
  selectedImg.src = ship.image;
  selectedImg.alt = shipName;

  renderStats(ship.stats);
  renderCosts(ship.costs);
  renderSelfCraft(ship.costs);
  renderBuyInputs(ship.costs);

  const displayName = getShipDisplayName(shipName);
  shipname.textContent = displayName;

  const controls = getCannonControls();
  if (controls.selectedShipName) {
    controls.selectedShipName.textContent = displayName;
  }
  if (controls.shipClass) {
    controls.shipClass.textContent = displayName;
  }

  resetLoadoutsForShip();
  bindCannonConfigurator();
  refreshBatteryEditor();

  if (controls.panel && controls.panel.style.display === "block") {
    drawCannonConfigurator();
  }

  const yOffset = -100;
  const y = selectedCard.getBoundingClientRect().top + window.pageYOffset + yOffset;

  window.scrollTo({
    top: y,
    behavior: "smooth"
  });
}



window.initializeShipsPage = initializeShipsPage;
