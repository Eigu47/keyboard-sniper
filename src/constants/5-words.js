const WORDS5 = [
  "ABUSE",
  "ADULT",
  "AGENT",
  "ANGER",
  "APPLE",
  "AWARD",
  "BASIS",
  "BEACH",
  "BIRTH",
  "BLOCK",
  "BLOOD",
  "BOARD",
  "BRAIN",
  "BREAD",
  "BREAK",
  "BROWN",
  "BUYER",
  "CAUSE",
  "CHAIN",
  "CHAIR",
  "CHEST",
  "CHIEF",
  "CHILD",
  "CHINA",
  "CLAIM",
  "CLASS",
  "CLOCK",
  "COACH",
  "COAST",
  "COURT",
  "COVER",
  "CREAM",
  "CRIME",
  "CROSS",
  "CROWD",
  "CROWN",
  "CYCLE",
  "DANCE",
  "DEATH",
  "DEPTH",
  "DOUBT",
  "DRAFT",
  "DRAMA",
  "DREAM",
  "DRESS",
  "DRINK",
  "DRIVE",
  "EARTH",
  "ENEMY",
  "ENTRY",
  "ERROR",
  "EVENT",
  "FAITH",
  "FAULT",
  "FIELD",
  "FIGHT",
  "FINAL",
  "FLOOR",
  "FOCUS",
  "FORCE",
  "FRAME",
  "FRANK",
  "FRONT",
  "FRUIT",
  "GLASS",
  "GRANT",
  "GRASS",
  "GREEN",
  "GROUP",
  "GUIDE",
  "HEART",
  "HENRY",
  "HORSE",
  "HOTEL",
  "HOUSE",
  "IMAGE",
  "INDEX",
  "INPUT",
  "ISSUE",
  "JAPAN",
  "JONES",
  "JUDGE",
  "KNIFE",
  "LAURA",
  "LAYER",
  "LEVEL",
  "LEWIS",
  "LIGHT",
  "LIMIT",
  "LUNCH",
  "MAJOR",
  "MARCH",
  "MATCH",
  "METAL",
  "MODEL",
  "MONEY",
  "MONTH",
  "MOTOR",
  "MOUTH",
  "MUSIC",
  "NIGHT",
  "NOISE",
  "NORTH",
  "NOVEL",
  "NURSE",
  "OFFER",
  "ORDER",
  "OTHER",
  "OWNER",
  "PANEL",
  "PAPER",
  "PARTY",
  "PEACE",
  "PETER",
  "PHASE",
  "PHONE",
  "PIECE",
  "PILOT",
  "PITCH",
  "PLACE",
  "PLANE",
  "PLANT",
  "PLATE",
  "POINT",
  "POUND",
  "POWER",
  "PRESS",
  "PRICE",
  "PRIDE",
  "PRIZE",
  "PROOF",
  "QUEEN",
  "RADIO",
  "RANGE",
  "RATIO",
  "REPLY",
  "RIGHT",
  "RIVER",
  "ROUND",
  "ROUTE",
  "RUGBY",
  "SCALE",
  "SCENE",
  "SCOPE",
  "SCORE",
  "SENSE",
  "SHAPE",
  "SHARE",
  "SHEEP",
  "SHEET",
  "SHIFT",
  "SHIRT",
  "SHOCK",
  "SIGHT",
  "SIMON",
  "SKILL",
  "SLEEP",
  "SMILE",
  "SMITH",
  "SMOKE",
  "SOUND",
  "SOUTH",
  "SPACE",
  "SPEED",
  "SPITE",
  "SPORT",
  "SQUAD",
  "STAFF",
  "STAGE",
  "START",
  "STATE",
  "STEAM",
  "STEEL",
  "STOCK",
  "STONE",
  "STORE",
  "STUDY",
  "STUFF",
  "STYLE",
  "SUGAR",
  "TABLE",
  "TASTE",
  "TERRY",
  "THEME",
  "THING",
  "TITLE",
  "TOTAL",
  "TOUCH",
  "TOWER",
  "TRACK",
  "TRADE",
  "TRAIN",
  "TREND",
  "TRIAL",
  "TRUST",
  "TRUTH",
  "UNCLE",
  "UNION",
  "UNITY",
  "VALUE",
  "VIDEO",
  "VISIT",
  "VOICE",
  "WASTE",
  "WATCH",
  "WATER",
  "WHILE",
  "WHITE",
  "WHOLE",
  "WOMAN",
  "WORLD",
  "YOUTH",
  "ALCON",
  "AUGHT",
  "HELLA",
  "OUGHT",
  "THAME",
  "THERE",
  "THINE",
  "WHERE",
  "WHICH",
  "WHOSE",
  "WHOSO",
  "YOURS",
  "ADMIT",
  "ADOPT",
  "AGREE",
  "ALLOW",
  "ALTER",
  "APPLY",
  "ARGUE",
  "ARISE",
  "AVOID",
  "BEGIN",
  "BLAME",
  "BRING",
  "BUILD",
  "BURST",
  "CARRY",
  "CATCH",
  "CHECK",
  "CLEAN",
  "CLEAR",
  "CLIMB",
  "CLOSE",
  "COUNT",
  "ENJOY",
  "ENTER",
  "EXIST",
  "GUESS",
  "IMPLY",
  "LAUGH",
  "LEARN",
  "LEAVE",
  "MARRY",
  "OCCUR",
  "PROVE",
  "RAISE",
  "REACH",
  "REFER",
  "RELAX",
  "SERVE",
  "SHALL",
  "SHOOT",
  "SOLVE",
  "SPEAK",
  "SPEND",
  "SPLIT",
  "STAND",
  "STICK",
  "TEACH",
  "THANK",
  "THINK",
  "THROW",
  "TREAT",
  "WORRY",
  "WOULD",
  "WRITE",
  "ABOVE",
  "ACUTE",
  "ALIVE",
  "ALONE",
  "ANGRY",
  "AWARE",
  "AWFUL",
  "BASIC",
  "BLACK",
  "BLIND",
  "BRAVE",
  "BRIEF",
  "BROAD",
  "CHEAP",
  "CIVIL",
  "CRAZY",
  "DAILY",
  "DIRTY",
  "EARLY",
  "EMPTY",
  "EQUAL",
  "EXACT",
  "EXTRA",
  "FAINT",
  "FALSE",
  "FIFTH",
  "FIRST",
  "FRESH",
  "FUNNY",
  "GIANT",
  "GRAND",
  "GREAT",
  "GROSS",
  "HAPPY",
  "HARSH",
  "HEAVY",
  "HUMAN",
  "IDEAL",
  "INNER",
  "JOINT",
  "LARGE",
  "LEGAL",
  "LOCAL",
  "LOOSE",
  "LUCKY",
  "MAGIC",
  "MINOR",
  "MORAL",
  "NAKED",
  "NASTY",
  "NAVAL",
  "OUTER",
  "PLAIN",
  "PRIME",
  "PRIOR",
  "PROUD",
  "QUICK",
  "QUIET",
  "RAPID",
  "READY",
  "ROMAN",
  "ROUGH",
  "ROYAL",
  "RURAL",
  "SHARP",
  "SHEER",
  "SHORT",
  "SILLY",
  "SIXTH",
  "SMALL",
  "SMART",
  "SOLID",
  "SORRY",
  "SPARE",
  "STEEP",
  "STILL",
  "SUPER",
  "SWEET",
  "THICK",
  "THIRD",
  "TIGHT",
  "TOUGH",
  "UPPER",
  "UPSET",
  "URBAN",
  "USUAL",
  "VAGUE",
  "VALID",
  "VITAL",
  "WRONG",
  "YOUNG",
  "AFORE",
  "AFTER",
  "BOTHE",
  "SINCE",
  "SLASH",
  "UNTIL",
  "ABACK",
  "ABAFT",
  "ABOON",
  "ABOUT",
  "ACCEL",
  "ADOWN",
  "AFOOT",
  "AFOUL",
  "AGAIN",
  "AGAPE",
  "AGOGO",
  "AGONE",
  "AHEAD",
  "AHULL",
  "ALIFE",
  "ALIKE",
  "ALINE",
  "ALOFT",
  "ALONG",
  "ALOOF",
  "ALOUD",
  "AMISS",
  "AMPLY",
  "AMUCK",
  "APACE",
  "APART",
  "APTLY",
  "AREAR",
  "ASIDE",
  "ASKEW",
  "BADLY",
  "BALLY",
  "BELOW",
  "CANNY",
  "COYLY",
  "DIMLY",
  "DITTO",
  "DRILY",
  "DRYLY",
  "DULLY",
  "FATLY",
  "FEYLY",
  "FITLY",
  "FORTE",
  "FORTH",
  "FULLY",
  "GAILY",
  "GAYLY",
  "GODLY",
  "HAPLY",
  "HENCE",
  "HOTLY",
  "ICILY",
  "INFRA",
  "JILDI",
  "JOLLY",
  "LAXLY",
  "LENTO",
  "LOWLY",
  "MADLY",
  "MAYBE",
  "NEVER",
  "NEWLY",
  "NOBLY",
  "ODDLY",
  "OFTEN",
  "PIANO",
  "PLONK",
  "PLUMB",
  "QUEER",
  "QUITE",
  "RAMEN",
  "REDLY",
  "SADLY",
  "SECUS",
  "SELLY",
  "SHILY",
  "SHYLY",
  "SLEEK",
  "SLYLY",
  "SPANG",
  "SRSLY",
  "STARK",
  "STOUR",
  "TALLY",
  "TANTO",
  "TODAY",
  "TOMOZ",
  "TRULY",
  "TWICE",
  "UNDER",
  "UTTER",
  "VERRY",
  "WANLY",
  "WETLY",
  "WRYLY",
  "AMONG",
  "CIRCA",
  "FURTH",
  "MINUS",
  "NEATH",
  "AARGH",
  "ADIEU",
  "ADIOS",
  "ALACK",
  "ALOHA",
  "AVAST",
  "BAKAW",
  "BASTA",
  "BEGAD",
  "BLESS",
  "BLIGE",
  "BRAVA",
  "BRAVO",
  "CHOOK",
  "DAMME",
  "DILDO",
  "FRICK",
  "FUDGE",
  "GOLLY",
  "GRATZ",
  "HALLO",
  "HASTA",
  "HAVOC",
  "HELLO",
  "HOWAY",
  "HOWDY",
  "HULLO",
  "HUZZA",
  "JESUS",
  "KAPOW",
  "LORDY",
  "MERCY",
  "PSYCH",
  "SALVE",
  "SKOAL",
  "SNIFF",
  "SOOEY",
  "THIAM",
  "THWAP",
  "TWIRP",
  "VIOLA",
  "VIVAT",
  "WACKO",
  "WAHEY",
  "WHIST",
  "WILMA",
  "WIRRA",
  "WOOPS",
  "WOWIE",
  "YECCH",
  "YEEHA",
  "YEESH",
  "YOWCH",
  "ZOWIE",
];

export default WORDS5;
