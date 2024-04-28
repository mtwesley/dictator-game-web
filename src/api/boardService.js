import api from ".";

export default {
  getDefaultBoard() {
    return api.get("/boards/default");
  },

  getTilesByDefaultBoard() {
    return api.get("/boards/default/tiles");
  },

  getBoardById(boardId) {
    return api.get(`/boards/${boardId}`);
  },

  getTilesByBoardId(boardId) {
    return api.get(`/boards/${boardId}/tiles`);
  }
}