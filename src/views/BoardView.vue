<template>
  <div v-if="$store.state.board.id !== 0" class="board-container" @mousedown="startDrag" @mouseup="stopDrag" @mouseleave="stopDrag" @mousemove="dragBoard">
    <div class="tiles" :style="tilesStyle">
      <div
        v-for="tile in $store.state.board.tiles"
        :key="tile.id"
        class="tile"
        :style="{ top: `${tile.position.y * 30}px`, left: `${tile.position.x * 30}px` }"
        @mouseover="showCoordinates(tile.position)"
      >
        {{ tile.coins > 0 ? `${tile.coins} Coins` : '' }}
      </div>
    </div>
  </div>
</template>

<script>

import BoardService from '../api/boardService.js';

export default {
  data() {
    return {
      startX: 0,
      startY: 0,
      dragging: false,
      tilesStyle: {
        position: 'relative',
        cursor: 'grab',
        width: '100%', 
        height: '100%',
        transform: 'translate(0px, 0px)'
      }
    };
  },
  computed: {
    boardId() {
      return this.board.id || 0;
    }
  },
  methods: {
    startDrag(event) {
      this.dragging = true;
      this.startX = event.clientX;
      this.startY = event.clientY;
    },
    stopDrag() {
      this.dragging = false;
    },
    dragBoard(event) {
      if (!this.dragging) return;
      const dx = event.clientX - this.startX;
      const dy = event.clientY - this.startY;
      this.tilesStyle.transform = `translate(${dx}px, ${dy}px)`;
    },
    showCoordinates(position) {
      console.log(`Tile at (${position.x}, ${position.y})`);
    }
  },
  created() {
    BoardService.getDefaultBoard().then(response => {
      if (response.status == 200) {
        const board = response.data;
        BoardService.getTilesByBoardId(board.id).then(response => {
          if (response.status) {
            const tiles = response.data;
            this.$store.dispatch("initializeBoard", { board, tiles})
          }
        })
      }
    });
  },
};
</script>

<style scoped>
.board-container {
  overflow: hidden;
  width: 100%;
  height: 100%;
  position: relative;
}

.tiles {
  display: flex;
  flex-wrap: wrap;
}

.tile {
  width: 30px;
  height: 30px;
  border: 1px solid #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f0f0f0;
}
</style>