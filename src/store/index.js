import { createStore } from "vuex";

const emptyBoard = () => ({
  id: null,
  width: 0,
  height: 0,
  tiles: [],
  players: [],
  isMenuActive: false,
});

const emptyPlayer = () => ({
  id: null,
  name: 0,
  username: 0,
});

export default createStore({
  state: {
    token: localStorage.getItem('userToken') || '',
    player: emptyPlayer(),
    board: emptyBoard(),
    tileIndexMap: new Map()
  },
  mutations: {
    TOGGLE_MENU(state) {
      state.isMenuActive = !state.isMenuActive;
    },
    SET_TOKEN(state, token) {
      state.token = token;
    },
    UNSET_TOKEN(state) {
      state.token = '';
    },
    SET_BOARD(state, board) {
      const { id, width, height } = board;
      state.board = { ...emptyBoard(), id, width, height };
      state.tileIndexMap = new Map();
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
    },
    SET_PLAYER(state, player) {
      const { id, name, username } = player;
      state.player = { ...emptyPlayer(), id, name, username };
    },
    UNSET_PLAYER(state) {
      state.player = emptyPlayer();
    },
  },
  actions: {
    initializePlayer({ commit }, player) {
      commit('SET_PLAYER', player);
    },
    initializeBoard({ commit }, { board, tiles, players }) {
      commit("SET_BOARD", board);
      commit("SET_TILES", tiles);
    },
    login({ commit }, token) {
      commit('SET_TOKEN', token || localStorage.getItem('token')); 
      localStorage.setItem('token', token);
    },
    logout({ commit }) {
      commit('UNSET_TOKEN');
      commit('UNSET_PLAYER');
      commit('UNSET_BOARD');
      localStorage.removeItem('token');
    },
  },
  getters: {
    isAuthenticated: state => !!state.token,
  }
});
