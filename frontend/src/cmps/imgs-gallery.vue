<template>
  <section class="imgs-gallery-container">
    <ul class="imgs-gallery-roll">
      <li
        v-for="(img, idx) in imgList"
        @click="selectImg(idx)"
        :key="idx"
        class="imgs-gallery-roll-item"
        :style="style(idx, false)"
      ></li>
    </ul>
    <div class="imgs-gallery-selected" :style="style(selectedImgIdx, true)">
      <!-- <div class="imgs-gallery-controls">
        <span class="imgs-gallery-controls-prev" @click="changePic(-1)">
          <font-awesome-icon :icon="['far', 'arrow-alt-circle-left']" />
        </span>

        <span class="imgs-gallery-controls-next" @click="changePic(1)">
          <font-awesome-icon :icon="['far', 'arrow-alt-circle-right']" />
        </span>
      </div> -->
    </div>
  </section>
</template>

<script>
export default {
  name: "imgs-display",
  props: {
    imgList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      selectedImgIdx: 0
    };
  },
  methods: {
    isSelected(idx) {
      return idx === this.selectedImgIdx;
    },
    selectImg(idx) {
      this.selectedImgIdx = idx;
    },
    changePic(diff) {
      if (this.selectedImgIdx + diff > this.imgList.length - 1) {
        this.selectedImgIdx = 0;
      } else if (this.selectedImgIdx + diff < 0) {
        this.selectedImgIdx = this.imgList.length - 1;
      } else {
        this.selectedImgIdx += diff;
      }
    },
    style(idx, isPrimary) {
      let style = {};
      if (isPrimary) {
        // style.background = `linear-gradient(90deg, rgba(255, 255, 255, 0) 70%, rgba(255,255,255,0.8) 100%), linear-gradient(270deg, rgba(247,247,247,0) 90%, rgba(255,255,255,0.8) 100%)`;
        style.backgroundImage = ` url(${this.imgList[idx]}) `;
      } else {
        style.backgroundImage = `url(${this.imgList[idx]}) `;
      }
      if (idx === this.selectedImgIdx && !isPrimary) {
        style.border = `1px solid #173e77`;
      }
      return style;
    }
  }
};
</script>

<style>
/* section {
  display: flex;
  flex-direction: column;
  position: relative;
}
.selected-img {
  border-radius: 4px;
  min-height: 450px;
  min-width: 350px;
}
.tour-details-map-search-list {
  display: flex;
  flex-direction: row;
}

.tour-details-map-search-list .singl-img-container {
  min-height: 200px;
  min-width: 250px;
  margin-right: 20px;
  border-radius: 4px;
}

.img-roll {
  display: flex;
  flex-direction: row;
  justify-content: center;
}
ul {
  list-style: none;
}
.btn-container {
  display: flex;
  justify-content: space-between;
}

.next {
  position: absolute;
  margin-top: 220px;
  right: 0;
  height: 25px;
}
.prev {
  position: absolute;
  margin-top: 220px;
  height: 25px;
} */
</style>
