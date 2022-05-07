import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeWords: [null, null, null, null, null, null, null, null, null],
  isFlipped: [false, false, false, false, false, false, false, false, false],
  typed: "",
  life: 3,
  playing: false,
  mode: undefined,
  score: 0,
  missed: 0,
  wrong: 0,
  language: "English",
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setWord(state, action) {
      if (state.activeWords.includes(null)) {
        state.activeWords[action.payload.id] = action.payload.word;
      }
    },

    removeWord(state, action) {
      const index = state.activeWords.indexOf(action.payload);
      state.activeWords[index] = null;
    },

    removeWordById(state, action) {
      state.activeWords[action.payload] = null;
    },

    setTyped(state, action) {
      if (state.typed.length < 10) {
        state.typed += action.payload;
        return;
      }
    },

    setTypedBackspace(state) {
      state.typed = state.typed.slice(0, -1);
    },

    resetTyped(state) {
      state.typed = "";
    },

    setPlaying(state, action) {
      state.playing = action.payload;
    },

    setMode(state, action) {
      state.mode = action.payload;
    },

    gainLife(state) {
      if (state.mode === "normal" && state.life < 10) state.life++;
      if (state.mode === "easy") state.life++;
      state.score++;
    },

    loseLife(state) {
      state.life--;
    },

    setMissed(state) {
      state.missed++;
    },

    setWrong(state) {
      state.wrong++;
    },

    setIsFlipped(state, action) {
      if (!isNaN(action.payload.id)) {
        state.isFlipped[action.payload.id] = action.payload.flipped;
      }
      if (action.payload.id === "all") {
        state.isFlipped = state.isFlipped.map(
          (flip) => (flip = action.payload.flipped)
        );
      }
    },

    resetStore(state) {
      const lng = state.language;
      return (state = { ...initialState, language: lng });
    },

    setLanguage(state, action) {
      state.language = action.payload;
    },
  },
});

export const {
  setWord,
  removeWord,
  removeWordById,
  setTyped,
  setTypedBackspace,
  resetTyped,
  setPlaying,
  gainLife,
  loseLife,
  setIsFlipped,
  setMode,
  setMissed,
  setWrong,
  resetStore,
  setLanguage,
} = gameSlice.actions;

export default gameSlice.reducer;
