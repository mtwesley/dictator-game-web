<template>
  <div v-if="$store.state.board.id !== 0" @keydown="handleArrowPress" class="board-container" @mousedown="startDrag" @mouseup="stopDrag" @mouseleave="stopDrag" @mousemove="dragBoard">
    <div class="tiles" :style="tilesStyle">
      <div v-for="tile in $store.state.board.tiles" :key="tile.id" class="tile" :class="{ 'bracket': tile.coins > 0 }" @mouseover="showCoordinates(tile.position)">
          <img class="coins" v-if="tile.coins > 0" :src="getCoinImage(tile.coins)" alt="Coins">
          <span v-if="tile.coins > 0" class="badge">{{ tile.coins }}</span>
          <img v-if="tile.position.x === playerPosition.x && tile.position.y === playerPosition.y" src="/src/assets/images/player.png" alt="Player" class="player">
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
      },
      playerPosition: {
        x: 0,
        y: 0
      },
    };
  },
  computed: {
    boardId() {
      return this.$store.state.board.id || 0;
    },
    playerStyle() {
      const tileSize = 100;
      return {
        position: 'absolute',
        left: `${this.playerPosition.x * tileSize}px`,
        top: `${this.playerPosition.y * tileSize}px`,
        transition: 'all 3s ease-in-out'
      };
    }
  },
  methods: {
    getCoinImage(coins) {
      if (coins <= 20) {
        return '/src/assets/images/one_coins.png';
      } else if (coins <= 50) {
        return '/src/assets/images/two_coins.png';
      } else {
        return '/src/assets/images/three_coins.png';
      }
    },
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
    },
    handleArrowPress(event) {
      const direction = event.key;
      let newX = this.playerPosition.x;
      let newY = this.playerPosition.y;

      console.log(newX, newY);

      switch(direction) {
        case 'ArrowUp': newY--; break;
        case 'ArrowDown': newY++; break;
        case 'ArrowLeft': newX--; break;
        case 'ArrowRight': newX++; break;
      }

      const newTile = this.$store.state.board.tiles.find(tile => tile.position.x === newX && tile.position.y === newY);
      if (newTile && !newTile.coins) {
        this.playerPosition.x = newX;
        this.playerPosition.y = newY;
      }
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
  mounted() {
    window.addEventListener('keydown', this.handleArrowPress);
  },
  beforeDestroy() {
    window.removeEventListener('keydown', this.handleArrowPress);
  }
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
  grid-template-columns: repeat(30, 100px);
  grid-auto-rows: 100px;
  gap: 0;
}

.tile {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ccc;
  background-image: url('/src/assets/images/stone_tile.png');
  background-size: cover;
  background-repeat: no-repeat;
}

.tile img.coins {}

.tile.bracket {
  background-image: url('/src/assets/images/stone_tile_bracket.png');
}

.badge {
  position: absolute;
  top: 25px;
  right: 25px;
  background-color: black;
  color: white;
  border-radius: 50%;
  padding: 2px 5px;
  font-size: 12px;
  font-weight: bold;
  min-width: 20px;
  text-align: center;
}


</style>
