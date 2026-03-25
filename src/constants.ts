export interface Fortune {
  zh: string;
  en: string;
}

export type CookieType = 'classic' | 'matcha' | 'strawberry' | 'chocolate' | 'charcoal';

export const FORTUNE_CATEGORIES: Record<CookieType, Fortune[]> = {
  classic: [
    { zh: "如果你餘生只能吃一種食物，你會選擇什麼？", en: "If you could only eat one type of food for the rest of your life, what would it be?" },
    { zh: "你童年記憶中最深刻的味道是什麼？", en: "What is the most vivid taste from your childhood memories?" },
    { zh: "如果你可以邀請任何一位歷史人物共進晚餐，你會選誰？", en: "If you could have dinner with any historical figure, who would it be?" },
    { zh: "你心目中完美的週六應該是如何度過的？", en: "How would your perfect Saturday be spent?" },
    { zh: "你最喜欢的早餐是什麼？", en: "What is your favorite breakfast?" },
    { zh: "你最擅長烹飪的一道菜是什麼？", en: "What is one dish you are best at cooking?" },
    { zh: "你最喜欢的零食是什麼？", en: "What is your favorite snack?" },
    { zh: "你更喜欢甜食還是鹹食？", en: "Do you prefer sweet or savory foods?" },
    { zh: "你最喜欢的餐廳是哪一家？", en: "What is your favorite restaurant?" },
    { zh: "你認為最好喝的飲料是什麼？", en: "What do you think is the best drink?" }
  ],
  matcha: [
    { zh: "你最近去過的一個讓你感到平靜的地方是哪裡？", en: "Where is a place you visited recently that made you feel at peace?" },
    { zh: "你最喜欢的季節是什麼？那個季節裡你最喜欢做的事是什麼？", en: "What is your favorite season, and what is your favorite thing to do during it?" },
    { zh: "你認為大自然中最美麗的顏色是什麼？", en: "What do you think is the most beautiful color in nature?" },
    { zh: "如果你可以變成一種植物，你會是什麼？", en: "If you could be any plant, what would you be?" },
    { zh: "你最喜欢聽的自然聲音是什麼（雨聲、浪聲等）？", en: "What is your favorite natural sound (rain, waves, etc.)?" },
    { zh: "你上一次看日出或日落是什麼時候？", en: "When was the last time you watched a sunrise or sunset?" },
    { zh: "你最喜欢的花是什麼？", en: "What is your favorite flower?" },
    { zh: "你更喜欢森林還是大海？", en: "Do you prefer the forest or the ocean?" },
    { zh: "你覺得最治癒的自然景觀是什麼？", en: "What natural landscape do you find most healing?" },
    { zh: "如果你可以住在一個樹屋裡，你會去哪裡住？", en: "If you could live in a treehouse, where would you live?" }
  ],
  strawberry: [
    { zh: "你認為一個人身上最迷人的品質是什麼？", en: "What do you think is the most charming quality a person can have?" },
    { zh: "你最近嘗試過的一件讓你感到驚喜的新事物是什麼？", en: "What is something new you tried recently that surprised you?" },
    { zh: "你最喜欢的關於‘愛’的電影或書是什麼？", en: "What is your favorite movie or book about 'love'?" },
    { zh: "如果你可以給世界增加一種顏色，那會是什麼？", en: "If you could add one color to the world, what would it be?" },
    { zh: "你收到的最好的禮物是什麼？", en: "What is the best gift you have ever received?" },
    { zh: "你最喜欢的一個讚美是什麼？", en: "What is one compliment you especially love to receive?" },
    { zh: "你最喜欢的浪漫瞬間是什麼？", en: "What is your favorite romantic moment?" },
    { zh: "你認為友誼中最重要的特質是什麼？", en: "What do you think is the most important trait in a friendship?" },
    { zh: "你最喜欢的香水味或氣味是什麼？", en: "What is your favorite perfume or scent?" },
    { zh: "如果你可以為某人寫一首歌，你會寫給誰？", en: "If you could write a song for someone, who would it be for?" }
  ],
  chocolate: [
    { zh: "如果你有一種超能力，你希望是什麼？", en: "If you had one superpower, what would it be?" },
    { zh: "如果你可以立刻瞬移到世界上任何一個地方，你會去哪？", en: "If you could teleport to anywhere in the world right now, where would you go?" },
    { zh: "你最想掌握的一項新技能是什麼？", en: "What is one new skill you most want to master?" },
    { zh: "如果你可以和動物說話，你最想問它們什麼？", en: "If you could talk to animals, what would you ask them?" },
    { zh: "如果你可以穿越到未來，你最想看什麼？", en: "If you could travel to the future, what would you most want to see?" },
    { zh: "你最喜欢的虛構角色是誰？", en: "Who is your favorite fictional character?" },
    { zh: "如果你可以發明一個機器人，它會幫你做什麼？", en: "If you could invent a robot, what would it do for you?" },
    { zh: "你最想去哪顆行星旅行？", en: "Which planet would you most like to travel to?" },
    { zh: "如果你可以生活在任何一個虛構世界裡，你會選哪個？", en: "If you could live in any fictional world, which one would you choose?" },
    { zh: "你最喜欢的科幻發明是什麼？", en: "What is your favorite sci-fi invention?" }
  ],
  charcoal: [
    { zh: "如果你可以回到過去給十年前的自己一個建議，你會說什麼？", en: "If you could go back and give your 10-year-old self one piece of advice, what would it be?" },
    { zh: "你最近讀過或看過的一本/一部讓你深受啟發的書或電影是什麼？", en: "What is a book or movie you recently read or watched that deeply inspired you?" },
    { zh: "你最想改掉的一個小習慣是什麼？", en: "What is one small habit you most want to change?" },
    { zh: "你認為‘成功’的定義是什麼？", en: "What is your definition of 'success'?" },
    { zh: "你最自豪的一項成就是什麼？", en: "What is one achievement you are most proud of?" },
    { zh: "你理想中的退休生活是什麼樣的？", en: "What does your ideal retirement life look like?" },
    { zh: "你認為生活中最重要的一課是什麼？", en: "What is the most important lesson you've learned in life?" },
    { zh: "你最欣賞的公眾人物是誰？", en: "Who is a public figure you most admire?" },
    { zh: "你希望別人如何記住你？", en: "How do you want people to remember you?" },
    { zh: "你目前最大的夢想是什麼？", en: "What is your biggest dream right now?" }
  ]
};

export const COOKIE_STYLES: Record<CookieType, { fill: string; stroke: string; label: string }> = {
  classic: { fill: "#f3e5ab", stroke: "#8b7355", label: "Classic" },
  matcha: { fill: "#9dc183", stroke: "#4f7942", label: "Matcha" },
  strawberry: { fill: "#ffb7c5", stroke: "#c71585", label: "Berry" },
  chocolate: { fill: "#7b3f00", stroke: "#3d1f00", label: "Cocoa" },
  charcoal: { fill: "#36454f", stroke: "#000000", label: "Zen" }
};
