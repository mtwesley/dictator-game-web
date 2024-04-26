<template>
  <div v-if="$store.state.board.id !== 0" class="board-container" @mousedown="startDrag" @mouseup="stopDrag" @mouseleave="stopDrag" @mousemove="dragBoard">
    <div class="tiles" :style="tilesStyle">
      <div
        v-for="tile in $store.state.board.tiles"
        :key="tile.id"
        class="tile"
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
        cursor: 'grab',
        position: 'relative',
        width: '100%', 
        height: '100%',
        transform: 'translate(0px, 0px)'
      }
    };
  },
  computed: {
    boardId() {
      return this.$store.state.board.id || 0;
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
      // console.log(`Tile at (${position.x}, ${position.y})`);
    }
  },
  created() {
    BoardService.getDefaultBoard().then(response => {
      if (response.status === 200) {
        const board = response.data;
        BoardService.getTilesByBoardId(board.id).then(response => {
          if (response.status === 200) {
            const tiles = response.data;
            this.$store.dispatch("initializeBoard", { board, tiles });
          }
        }).catch(error => {
          console.error('Error fetching tiles:', error);
        });
      }
    }).catch(error => {
      console.error('Error fetching board:', error);
    });
  },
};

</script>

<style scoped>
.board-container {
  overflow: hidden;
  width: 100vw;
  height: calc(100vh - 80px);
}

.tiles {
  display: grid;
  grid-template-columns: repeat(auto-fill, 100px);
  grid-auto-rows: 100px;
  gap: 10px;
}

.tile {
  border: 1px solid #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f0f0f0;
}
</style>
