import input from "./input.js";

const cardOrder = "J23456789TQKA";

/**
 * @type {Array<(str: string) => number | undefined>}
 * */
const rankChecks = [
  // five of a kind
  (str) => {
    const firstNotJChar = str.match(/[^J]/)?.[0] ?? "J";
    if (new RegExp(`[${firstNotJChar}J]{5}`).test(str)) {
      return 6;
    }
  },
  // four of a kind
  (str) => {
    const charCounts = str.split("").reduce((acc, char) => {
      acc[char] = acc[char] ? acc[char] + 1 : 1;
      return acc;
    }, {});
    if (Object.values(charCounts).includes(4)) {
      return 5;
    }
    const Jcount = charCounts["J"] || 0;
    if (Jcount > 0) {
      const otherChars = str.match(/[^J]/g);
      if (otherChars?.some((char) => charCounts[char] + Jcount > 3)) {
        return 5;
      }
    }
  },
  // full house
  (str) => {
    const check = (str) => {
      const charCounts = str.split("").reduce((acc, char) => {
        acc[char] = acc[char] ? acc[char] + 1 : 1;
        return acc;
      }, {});
      return (
        Object.values(charCounts).includes(3) &&
        Object.values(charCounts).includes(2)
      );
    };
    if (check(str)) {
      return 4;
    }
    const Jnumber = str.match(/J/g)?.length || 0;
    if (Jnumber > 0) {
      const otherChars = str.match(/[^J]/g);
      if (otherChars?.some((char) => check(str.replace(/J/g, char)))) {
        return 4;
      }
    }
  },
  // three of a kind
  (str) => {
    const charCounts = str.split("").reduce((acc, char) => {
      acc[char] = acc[char] ? acc[char] + 1 : 1;
      return acc;
    }, {});
    if (Object.values(charCounts).includes(3)) {
      return 3;
    }
    const Jcount = charCounts["J"] || 0;
    if (Jcount > 0) {
      const otherChars = str.match(/[^J]/g);
      if (otherChars?.some((char) => charCounts[char] + Jcount > 2)) {
        return 3;
      }
    }
  },
  // two pairs
  (str) => {
    const check = (str) => {
      const charCounts = str.split("").reduce((acc, char) => {
        acc[char] = acc[char] ? acc[char] + 1 : 1;
        return acc;
      }, {});
      if (Object.values(charCounts).filter((x) => x === 2).length === 2) {
        return true;
      }
    };
    if (check(str)) {
      return 2;
    }
    const hasJ = /J/g.test(str);
    if (hasJ) {
      const otherChars = str.match(/[^J]/g);
      if (otherChars?.some((char) => check(str.replace(/J/g, char)))) {
        return 2;
      }
    }
  },
  // pair
  (str) => {
    const charCounts = str.split("").reduce((acc, char) => {
      acc[char] = acc[char] ? acc[char] + 1 : 1;
      return acc;
    }, {});
    if (Object.values(charCounts).includes(2)) {
      return 1;
    }
    if (/J/g.test(str)) {
      return 1;
    }
  },
];

const rankEqualities = (rankArray) => {
  // Assign a score to each hand :
  // There are 13 cards so we consider a base 13 sitution, with the card position being each new 13th unit
  // So 32222 will have 1 * 13^4 (A) + 0 * 13^3 (2) + 0 * 13^2 (2) + 0 * 13^1 (2) + 0 * 13^0 (2) = 28 561
  // While 2AAAA will have 0 * 13^4 + 12 * 13^3 + 12 * 13^2 + 12 * 13^1 + 12 * 13^0 = 28 560

  for (let i = 0; i < rankArray.length; i++) {
    let score = 0;
    const rank = rankArray[i];
    for (let j = 0; j < 5; j++) {
      score +=
        cardOrder.indexOf(rank.hand[j]) * Math.pow(cardOrder.length, 4 - j);
    }
    rank.score = score;
  }
  return rankArray.sort((a, b) => a.score - b.score);
};

const orderHands = (handsAndBids) => {
  const rankedHands = [
    [], // high card
    [], // pair
    [], // 2 pairs
    [], // brelang
    [], // full
    [], // carré
    [], // five
  ];
  for (let i = 0; i < handsAndBids.length; i++) {
    const handAndBid = handsAndBids[i];
    let index;
    const found = rankChecks.find((check) => {
      index = check(handAndBid.hand);
      return index !== undefined;
    });
    if (!found) {
      index = 0;
    }
    rankedHands[index].push(handAndBid);
  }
  console.log(rankedHands.map((x) => rankEqualities(x)));
  return rankedHands.flatMap((rankedHand) => rankEqualities(rankedHand));
};

export function computeAnswer() {
  const handsAndBids = input.split("\n").map((x) => {
    const [hand, bid] = x.split(" ");
    return { hand, bid };
  });
  const orderedRanks = orderHands(handsAndBids);
  let total = 0;
  for (let i = 0; i < orderedRanks.length; i++) {
    total += +orderedRanks[i].bid * (i + 1);
  }
  return total;
}
