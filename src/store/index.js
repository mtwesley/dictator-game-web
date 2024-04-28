import { createStore } from "vuex";

const emptyBoard = () => ({
  id: null,
  width: 0,
  height: 0,
  tiles: [],
  players: [],
  isMenuActive: false,
});

export default createStore({
  state: {
    board: emptyBoard(),
    tileIndexMap: new Map()
  },
  mutations: {
    TOGGLE_MENU(state) {
      state.isMenuActive = !state.isMenuActive;
    },
    SET_BOARD(state, board) {
      const { id, width, height } = board;
      state.board = { ...emptyBoard(), id, width, height };
    },
    UNSET_BOARD(state) {
      state.board = emptyBoard();
      state.tileIndexMap = new Map();
    },
    SET_TILES(state, tiles) {
      state.board.tiles = tiles;
      state.tileIndexMap.clear();

      tiles.forEach((tile, index) => {
        state.tileIndexMap.set(tile.id, index);
      });
    },
    UNSET_TILES(state) {
      state.board.tiles = [];
      state.tileIndexMap = new Map();
    },
    UPDATE_TILES(state, tiles) {
      tiles.forEach(newTile => {
        const index = state.tileIndexMap.get(newTile.id);
        if (index !== undefined) {
          state.board.tiles[index] = newTile;
        }
      });
    }
  },
  actions: {
    initializeBoard({ commit }, { board, tiles, players }) {
      commit("SET_BOARD", board);
      commit("SET_TILES", tiles);
    }
  }
});
