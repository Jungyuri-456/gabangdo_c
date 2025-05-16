<template>
  <div class="widthAllBg">
    <div class="inner">
      <Swiper
        :pagination="{ dynamicBullets: true }"
        :modules="[Pagination]"
        class="mySwiper">
        <SwiperSlide>
          <div class="bg_all">
            <!-- 왼쪽글 -->
            <div class="rightLetter">
              <p>무거운 가방?</p>
              <p>이리도 내가 들게</p>
              <p>대구 전지역 어디든지!</p>
              <p class="mainLetter">가방도</p>
              <!-- 예약버튼 -->
              <div class="reservationBtn">
                <button>예약하기</button>
              </div>
            </div>
            <!-- 오른쪽 용달 -->
            <div class="leftLetter">
              <img src="/images/yongdal1.png" alt="용달이미지" />
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>Slide 2</SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide>
        <SwiperSlide>Slide 4</SwiperSlide>
        <SwiperSlide>Slide 5</SwiperSlide>
        <SwiperSlide>Slide 6</SwiperSlide>
        <SwiperSlide>Slide 7</SwiperSlide>
        <SwiperSlide>Slide 8</SwiperSlide>
        <SwiperSlide>Slide 9</SwiperSlide>
      </Swiper>
    </div>
  </div>
</template>

<script setup>
// Swiper 컴포넌트와 모듈 import
import { Swiper, SwiperSlide } from "swiper/vue";
import { Pagination } from "swiper/modules";

// Swiper 스타일 import
import "swiper/css";
import "swiper/css/pagination";
</script>

<style lang="scss" scoped>
@use "/src/assets/Variables" as *;

.widthAllBg {
  background-color: rgb(247, 247, 247);

  .inner {
    max-width: 1200px;
    margin: 0 auto;

    .mySwiper {
      width: 100%;
      height: 100vh;

      .swiper-slide {
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }

    .bg_all {
      width: 100%;
      height: 100vh;
      display: flex;
      padding-top: 150px;
      justify-content: space-between;

      .rightLetter {
        margin-top: 110px;

        p {
          font-size: 35px;
          margin-bottom: 15px;
        }

        .mainLetter {
          font-size: 150px;
          color: #279bf3;
          margin-top: 25px;
          font-weight: 510;
        }
      }

      .leftLetter {
        img {
          width: 460px;
          height: 600px;
        }
      }

      .reservationBtn {
        margin-top: 30px;

        button {
          border: 3px solid #279bf3;
          background-color: #fff;
          color: #279bf3;
          border-radius: 30px;
          padding: 2% 5%;
          font-size: 30px;
          font-weight: 530;
          box-shadow: 2px 2px 5px 0px rgba(37, 37, 37, 0.3);
          cursor: pointer;
        }
      }
    }
  }
}
</style>
