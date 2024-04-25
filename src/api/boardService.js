import api from ".";

const getDefaultBoard = () => {
  return api.get("/boards/default");
};

const getTilesByDefaultBoard = () => {
  return api.get("/boards/default/tiles");
};

const getBoardById = boardId => {
  return api.get(`/boards/${boardId}`);
};

const getTilesByBoardId = boardId => {
  return api.get(`/boards/${boardId}/tiles`);
};

export default {
  getDefaultBoard,
  getTilesByDefaultBoard,
  getBoardById,
  getTilesByBoardId
};
