<template>
  <div v-if="$store.state.board.id !== 0" class="board-container" :style="boardContainerStyle"
      @keydown="handleArrowPress"
      @resize="handleResize"
      @mousedown="startDrag" 
      @mouseup="stopDrag" 
      @mouseleave="stopDrag" 
      @mousemove="dragBoard">
    <div class="tiles" :style="tilesStyle">
      <div v-for="tile in $store.state.board.tiles" :key="tile.id" class="tile" :class="{ 'bracket': tile.coins > 0, 'has-coins': tile.coins > 0 }" @mouseover="showCoordinates(tile.position)">
          <div class="coins" v-if="tile.coins > 0">
            <img class="coins" v-if="tile.coins <= 40" src="/src/assets/images/one_coins.png" alt="Coins">
            <img class="coins" v-else-if="tile.coins <=90" src="/src/assets/images/two_coins.png" alt="Coins">
            <img class="coins" v-else="tile.coins > 150" src="/src/assets/images/three_coins.png" alt="Coins">
          </div>  
          <span v-if="tile.coins > 0" class="badge">{{ tile.coins }}</span>
          <div class="player" v-if="tile.position.x === playerPosition.x && tile.position.y === playerPosition.y">
            <img src="/src/assets/images/player.png" alt="Player">
          </div>
      </div>
    </div>
  </div>

</template>

<script>

import BoardService from '../api/boardService.js';

export default {
  data() {
    return {
      windowX: window.innerWidth,
      startX: 0,
      startY: 0,
      newX: 0,
      newY: 0,
      lastX: 0,
      lastY: 0,
      dragging: false,
      tilesStyle: {
          cursor: 'grab',
          position: 'relative',
          width: '100%', 
          height: '100%',
          transform: 'translate(0px, 0px)' // This will be updated dynamically
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
    },
    boardContainerStyle() {
      const baseHeight = this.$store.state.isMenuActive && this.windowX <= 1024 ? '155px' : '58px';
      return {
        height: `calc(100vh - ${baseHeight})`
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
    showCoordinates(position) {
      // console.log(`Tile at (${position.x}, ${position.y})`);
    },
    startDrag(event) {
      this.dragging = true;
      this.startX = event.clientX;
      this.startY = event.clientY;
    },
    stopDrag(event) {
      this.dragging = false;
      this.lastX = this.newX < 0 ? this.lastX + event.clientX - this.startX : 0;
      this.lastY = this.newY < 0 ? this.lastY + event.clientY - this.startY : 0;
    },
    dragBoard(event) {
      if (!this.dragging) {
        return;
      }
      const dx = event.clientX - this.startX;
      const dy = event.clientY - this.startY;
      const newX = this.lastX + dx;
      const newY = this.lastY + dy;
      this.newX = newX < 0 ? newX : 0;
      this.newY = newY < 0 ? newY : 0;
      this.tilesStyle.transform = `translate(${this.newX}px, ${this.newY}px)`;
    },
    handleResize() {
      this.windowX = window.innerWidth;
    },
    handleArrowPress(event) {
      const direction = event.key;
      let newX = this.playerPosition.x;
      let newY = this.playerPosition.y;

      // console.log(newX, newY);

      switch(direction) {
        case 'ArrowUp': newY--; break;
        case 'ArrowDown': newY++; break;
        case 'ArrowLeft': newX--; break;
        case 'ArrowRight': newX++; break;
      }

      const newTile = this.$store.state.board.tiles.find(tile => tile.position.x === newX && tile.position.y === newY);
      // if (newTile && !newTile.coins) {
      if (newTile) {
        this.playerPosition.x = newX;
        this.playerPosition.y = newY;
      }
    }
  },
  created() {
    // this.$Progress.start();
    BoardService.getDefaultBoard().then(response => {
      if (response.status === 200) {
        const board = response.data;
        BoardService.getTilesByBoardId(board.id).then(response => {
          if (response.status === 200) {
            const tiles = response.data;
            this.$store.dispatch("initializeBoard", { board, tiles });
          }
        })
      }
    })
  },
  mounted() {
    window.addEventListener('keydown', this.handleArrowPress);
    window.addEventListener('resize', this.handleResize);
  },
  beforeDestroy() {
    window.removeEventListener('keydown', this.handleArrowPress);
    window.removeEventListener('resize', this.handleResize);
  }
};

</script>

<style scoped>
.board-container {
  overflow: hidden;
  width: 100vw;
}

.tiles {
  display: grid;
  grid-template-columns: repeat(30, 100px);
  grid-auto-rows: 100px;
  gap: 0;
}

.tile {
  z-index: 0;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ccc;
  background-image: url('/src/assets/images/stone_tile.png');
  background-size: cover;
  background-repeat: no-repeat;
}

.tile, .coins, .badge, .player {
  display: relative;
  -webkit-user-select: none;
  -moz-user-select: none; 
  -ms-user-select: none; 
  user-select: none;
}

.tile.bracket {
  background-image: url('/src/assets/images/stone_tile_bracket.png');
}

.coins {
  z-index: 5;
  position: absolute;
}

.coins img {
  position: relative;
}

.badge {
  z-index: 10;
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

.player {
  z-index: 50;
}

.tile.has-coins .player {
  position: absolute;
  top: 18px;
  left: 14px;
  width: 36px;
}

</style>
