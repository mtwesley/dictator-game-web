export default {
  state: {
    board: {},
  },
  mutations: {
    SET_BOARD(state, board) {
      state.board = board;
    },
  },
  actions: {
    fetchBoard({ commit }, boardId) {
      return gameService.getBoard(boardId).then((response) => {
        commit("SET_BOARD", response.data);
      });
    },
    createGame({ commit }, gameData) {
      return gameService.createGame(gameData).then((response) => {
        commit("SET_GAME", response.data);
      });
    },
  },
};
