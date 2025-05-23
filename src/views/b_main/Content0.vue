<template>
  <div class="wrap">
    <!-- 페이드 슬라이드 배경 -->
    <div class="slider">
      <div
        v-for="(img, index) in images"
        :key="index"
        class="slide"
        :class="{ active: index === currentIndex }"
        :style="{ backgroundImage: `url(${img})` }"></div>

      <!-- 배경 위 글씨 -->
      <div class="inner">
        <div class="container1">
          <div class="contain1">
            <div class="charHead">
              <img src="/public/images/yr/mainImg/yongdalHead.png" alt="" />
            </div>
            <div class="sLetter">
              <p>무거운 가방?</p>
              <p>이리도 내가 들게</p>
            </div>
          </div>

          <div class="contain2">
            <p>가방도</p>
          </div>
          <div class="contain3">
            <p>대구 짐옮김이 전문 No.1</p>
          </div>
          <router-link to="/yeyak">
            <div class="contain4">
              <button>예약하기</button>
            </div>
          </router-link>
        </div>
      </div>
    </div>

    <!-- container2 등 다른 섹션은 여기 아래에 이어서 -->
    <!-- 컨테인2 -->
    <div class="container2">
      <div class="inner">
        <div class="section1">
          <!-- 이미지 -->
          <div class="section1-1">
            <img src="/public/images/yongdal1.png" alt="" />
          </div>
          <!-- 텍스트 -->
          <div class="section1-2">
            <p>쉽고 가벼운 여행도</p>
            <span>원하는 곳에 짐맡기고<br />편하게 이동하자</span>
          </div>
        </div>
      </div>
    </div>
    <!-- 컨테인3 -->
    <div class="container3">
      <div class="inner">
        <div class="section3">
          <!-- 왼쪽 텍스트 -->
          <div class="section3-1">
            <p>짐보관도 부담없이</p>
            <span>지하철, 기차, 공항<br />어디든지 짐 맡기자</span>
          </div>
          <!-- 오른쪽 이미지 -->
          <div class="section3-2">
            <img src="/public/images/yongdal3.png" alt="" />
          </div>
        </div>
      </div>
    </div>

    <!-- 컨테인4 -->
    <div class="container4">
      <div class="inner">
        <div class="section4">
          <!-- 이미지 -->
          <div class="section4-1">
            <img src="/public/images/yongdal4.png" alt="" />
          </div>
          <!-- 텍스트 -->
          <div class="section4-2">
            <p>실시간 배송조회도</p>
            <span>짐이 어디있는지 한눈에<br />실시간 확인하기</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 배너 및 메뉴 이동 섹션 -->
    <div class="banner-section">
      <div class="inner-container">
        <!-- 왼쪽 배너 이미지 -->
        <div class="banner-image">
          <img src="/public/images/yr/mainImg/banner1.png" alt="가방도 배너" />
        </div>

        <!-- 오른쪽 메뉴 이동 및 예약 버튼 -->
        <div class="menu-box">
          <!-- 2x2 메뉴 -->
          <div class="menu-grid">
            <router-link to="/bangbeob2">
              <div class="menu-item">
                <p class="menu-title">이용안내</p>
                <p class="menu-desc">짐운송, 짐안내 이용안내 확인하기</p>
              </div>
            </router-link>
            <router-link to="/yogeum">
              <div class="menu-item">
                <p class="menu-title">이용요금</p>
                <p class="menu-desc">짐운송 이용요금 확인하기</p>
              </div>
            </router-link>
            <router-link to="/sotong2">
              <div class="menu-item">
                <p class="menu-title">이용후기</p>
                <p class="menu-desc">고객 이용후기 확인하기</p>
              </div>
            </router-link>
            <router-link to="/yh_festival">
              <div class="menu-item">
                <p class="menu-title">축제안내</p>
                <p class="menu-desc">대구시 축제 확인하기</p>
              </div>
            </router-link>
          </div>

          <!-- 예약 버튼 -->
          <router-link to="/yeyak">
            <button class="reserve-button">예약하기</button>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const images = [
  "/public/images/yr/mainImg/attraction1.png",
  "/public/images/yr/mainImg/attraction2.jpg",
  "/public/images/yr/mainImg/attraction3.jpg",
  "/public/images/yr/mainImg/attraction4.jpg",
  "/public/images/yr/mainImg/attraction5.jpg",
  "/public/images/yr/mainImg/attraction6.jpg",
];

const currentIndex = ref(0);

onMounted(() => {
  setInterval(() => {
    currentIndex.value = (currentIndex.value + 1) % images.length;
  }, 4000); // 4초마다 이미지 전환
});
</script>

<style scoped lang="scss">
.wrap {
  margin-top: 70px;
  .slider {
    position: relative;
    width: 100%;
    height: 100vh;
    overflow: hidden;

    .slide {
      position: absolute;
      width: 100%;
      height: 100%;
      background-size: cover;
      background-position: center;
      opacity: 0;
      transition: opacity 1s ease-in-out;
    }

    .slide.active {
      opacity: 1;
      z-index: 1;
    }
    &::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.4); // 검정색, 투명도 조절 가능
      z-index: 1;
      pointer-events: none;
    }

    .inner {
      position: relative;
      z-index: 2; // 텍스트가 배경 위에 보이도록
      max-width: 1300px;
      margin: 200px auto;

      .container1 {
        position: relative;
        width: 100%;
        display: flex;
        flex-direction: column;

        .contain1 {
          display: flex;

          gap: 10px;

          img {
            width: 80px;
            height: 80px;
          }
          p {
            color: #fff;
            font-size: 30px;
            line-height: 1.25;
          }
        }

        .contain2 {
          p {
            color: #279bf3;
            font-size: 150px;
            font-weight: 600;
            padding-bottom: 30px;
            line-height: 1;
          }
        }

        .contain3 {
          color: #fff;
          font-size: 18px;
          padding-bottom: 18px;
          line-height: 1.25;
        }

        .contain4 {
          color: #fff;
          font-size: 30px;

          button {
            background: none;
            border: 1px solid #fff;
            padding-left: 20px;
            padding-right: 20px;
            padding-top: 5px;
            padding-bottom: 5px;
            border-radius: 30px;
            color: #fff;
            font-size: inherit;
            cursor: pointer;
          }
        }
        .contain4 button:hover{
          color: #279bf3;
          border: 1px solid #279bf3;
          background-color: #fff;
        }
      }
    }
  }
  .container2 {
    width: 100%;
    background-color: #fff;
    .inner {
      max-width: 1300px;
      margin: 0 auto;
      .section1 {
        padding-top: 10%;
        display: flex;
        .section1-1 {
          background-color: #f0f0f0;
          width: 20%;
          border-radius: 300px;
          padding: 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          img {
            width: 70%;
          }
        }
        .section1-2 {
          padding-left: 5%;
          padding-top: 2%;
          p {
            color: #279bf3;
            font-size: 45px;
            padding-bottom: 3%;
            font-weight: 500;
          }
          span {
            color: #6f6f6f;
            font-size: 25px;
          }
        }
      }
    }
  }
  .container3 {
    width: 100%;
    .inner {
      max-width: 1300px;
      margin: 0 auto;

      .section3 {
        padding-top: 5%;
        display: flex;
        justify-content: flex-end; // inner 내에서 맨 오른쪽 정렬

        .section3-1 {
          width: 40%;
          padding-right: 5%;
          text-align: right;

          p {
            color: #279bf3;
            font-size: 45px;
            padding-bottom: 3%;
            font-weight: 500;
          }
          span {
            color: #6f6f6f;
            font-size: 25px;
          }
        }

        .section3-2 {
          width: 20%;
          background-color: #f0f0f0;
          border-radius: 300px;
          display: flex;
          flex-direction: column;
          align-items: center;
          border-radius: 300px;
          padding: 20px;

          img {
            width: 80%;
          }
        }
      }
    }
  }
  .container4 {
    width: 100%;
    background-color: #fff;
    margin-bottom: 150px;
    .inner {
      max-width: 1300px;
      margin: 0 auto;
      .section4 {
        display: flex;
        .section4-1 {
          background-color: #f0f0f0;
          width: 20%;
          border-radius: 300px;
          padding: 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          img {
            width: 70%;
          }
        }
        .section4-2 {
          padding-left: 5%;
          padding-top: 2%;
          p {
            color: #279bf3;
            font-size: 45px;
            padding-bottom: 3%;
            font-weight: 500;
          }
          span {
            color: #6f6f6f;
            font-size: 25px;
          }
        }
      }
    }
  }

  // 배너 및 메뉴 이동 섹션
  .banner-section {
    background-color: #ffffff;
    width: 100%;
  }

  .inner-container {
    max-width: 1300px;
    margin: 0 auto;
    display: flex;
    // flex-wrap: wrap;
    justify-content: center;
    align-items: flex-start;
    gap: 10px;
  }

  .banner-image {
    flex: 1 1 50%;
    // max-width: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .banner-image img {
    display: block;
    width: 100%;
    object-fit: cover;

    border-radius: 12px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }

  // 오른쪽 메뉴 이동 및 예약 버튼
  .menu-box {
    flex: 1 1 50%;
    // max-width: 50%;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .menu-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }

  .menu-item {
    background-color: #e9e9e9;
    border-radius: 8px;
    padding-top: 20px;
    padding-left: 30px;
    padding-right: 40px;
    padding-bottom: 50px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  }

  .menu-item:hover {
    background-color: #c6c6c6;
  }

  .menu-title {
    font-weight: 600;
    margin-bottom: 4px;
    color: #222;
    font-size: 25px;
  }

  .menu-desc {
    font-size: 14px;
    color: #666;
  }

  .reserve-button {
    background-color: #279bf3;
    color: #ffffff;
    font-size: 30px;
    font-weight: bold;
    padding: 35px;
    border-radius: 10px;
    cursor: pointer;
    transition: background-color 0.2s;
    width: 100%;
    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.15);
  }

  .reserve-button:hover {
    background-color: #357acc;
  }
}
</style>
