import input from "./input.js";

const cardOrder = "23456789TJQKA";

// prettier-ignore
const rankRegexes = [
  /(.)(?:\1){4}/,                            // five of a kind
  /(.)(?:.*\1){3}/,                          // four of a kind
  /(?=.*(.)(?:.*\1){2})(?=.*((?!\1).).*\2)/, // full house
  /(.)(?:.*\1){2}/,                          // three of a kind
  /(?=.*(.).*\1)(?=.*((?!\1).).*\2)/,        // two pairs
  /(.).*\1/,                                 // pair
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
    const rank = rankRegexes.find((regex) => regex.test(handAndBid.hand));
    let index = rankRegexes.indexOf(rank);
    if (index === -1) {
      index = 0;
    } else {
      index = 6 - index;
    }

    rankedHands[index].push(handAndBid);
  }
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
