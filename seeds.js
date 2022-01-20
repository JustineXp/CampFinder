const mongoose = require("mongoose");
const Camp = require("./models/camp");
const Comment = require("./models/comment");

var seedData = [
  {
    name: "Encounter Mara",
    image:
      "https://www.asiliaafrica.com/media/otep2mta/6-encounter-mara-afternoon-tea-lounge.jpg?anchor=center&mode=crop&quality=80&width=720&height=405&rnd=132253779482500000",
  },
  {
    name: "Jabali Ridge",
    image:
      "https://www.asiliaafrica.com/media/yaydag4z/1-exterior-room-view-jabali.jpg?center=0.59753974501140494,0.47987632160532895&mode=crop&quality=80&width=720&height=405&rnd=132361817081070000",
  },
  {
    name: "Mara Bush Camp",
    image:
      "https://www.asiliaafrica.com/media/0bfe0wam/mara-bush-houses-lunch-at-the-pool-mr.jpg?anchor=center&mode=crop&quality=80&width=720&height=405&rnd=132207026069130000",
  },
  {
    name: "Naboisho Camp",
    image:
      "https://www.asiliaafrica.com/media/34zbww40/option-2-featured-propery-image-1920x558-option-1.jpg?anchor=center&mode=crop&quality=80&width=720&height=405&rnd=132200797983370000",
  },
  {
    name: "Oliver's Camp",
    image:
      "https://www.asiliaafrica.com/media/ixedqsri/1-oliver-s-exteriror-shot.jpg?anchor=center&mode=crop&quality=80&width=720&height=405&rnd=132272718675600000",
  },
  {
    name: "Legendary Lodge",
    image:
      "https://www.asiliaafrica.com/media/1erpnrqw/9-ll-veranda-dining-1.jpg?anchor=center&mode=crop&quality=80&width=720&height=405&rnd=132207025976200000",
  },
  {
    name: "Acacia Farm Lodge",
    image:
      "https://www.asiliaafrica.com/media/gvwgdspe/aerial-pool_-5mb.jpg?center=0.623710274873826,0.51438078102363227&mode=crop&quality=80&width=720&height=405&rnd=132757238267900000",
  },
  {
    name: "Fanjove Island",
    image:
      "https://www.asiliaafrica.com/media/fvwfofmv/fanjove-island-aerial-view-over-island_-5mb.jpg?anchor=center&mode=crop&quality=80&width=720&height=405&rnd=132759793593530000",
  },
  {
    name: "Eka Hotel",
    image:
      "https://www.asiliaafrica.com/media/ufjepwif/exterior-view.jpg?anchor=center&mode=crop&quality=80&width=720&height=405&rnd=132773557197030000",
  },
  {
    name: "Elephant Bedroom",
    image:
      "https://www.asiliaafrica.com/media/tgfnprwg/elephant-bedroom-camp-samburu-23.jpg?anchor=center&mode=crop&quality=80&width=720&height=405&rnd=132291710216770000",
    description:
      "Elephant Bedroom Camp provides a rustic yet stylish experience along the banks of the Ewaso Nyiro River, in Samburu National Reserve. The classic safari camp is easily accessible all year round",
  },
  {
    name: "Gibb's Farm Lodge",
    image:
      "https://www.asiliaafrica.com/media/wqbcdrkb/gibb-s-farm-cottages-scott-ramsay-13.jpg?anchor=center&mode=crop&quality=80&width=720&height=405&rnd=132207001458300000",
    description:
      "Considered one of the oldest guest houses in northern Tanzania, this beautiful farm of more than 75 acres was established in the late 1920s.",
  },
  {
    name: "Olakira Camp",
    location: "Serengeti, Tanzania",
    price: 20,
    image:
      "https://www.asiliaafrica.com/media/wbckbjrk/olakira-camp-star-gazing-tent-under-the-milkyway.jpg?anchor=center&mode=crop&quality=80&width=720&height=405&rnd=132272860952270000",
    description:
      "A classic Tanzanian mobile camp that follows the Great Migration across the Serengeti. See it all from dramatic river crossings to incredible calving on the grassy plains.",
  },
];

const cleanDB = () => {
  Camp.remove({}, (error) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Database Cleared");
      seedData.forEach((seed) => {
        Camp.create(seed, (error, Data1) => {
          if (error) {
            console.log(error);
          } else {
            console.log("Seed Planted");
            console.log(Data1);
            Comment.create(
              {
                text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
                author: "Sauro",
              },
              (error, Data2) => {
                if (error) {
                  console.log(error);
                } else {
                  console.log(Data2);
                  Data1.comments.push(Data2);
                  Data1.save();
                }
              }
            );
          }
        });
      });
    }
  });
};

module.exports = cleanDB;
