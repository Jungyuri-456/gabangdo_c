<template>
  <div class="widthAllBg">
    <div class="blockgr">
    </div>
    <div class="inner">
    <!-- 그라데이션 구분 -->

      <div class="title">
        <h2>가방도 이래서 좋아요</h2>
      </div>
      <swiper
        :slides-per-view="3.5"
        :space-between="30"
        :modules="[Pagination]"
        class="mySwiper">
        <!-- 리뷰카드1 -->
        <swiper-slide>
          <div class="Reviews">
            <!-- 사진 -->
            <div class="cardImg">
              <img src="/public/images/carrier2.png" alt="" />
            </div>
            <!-- 이름 -->
            <div class="name">
              <p>김 * *</p>
            </div>
            <!-- 후기 -->
            <div class="Review">
              <p>출장길 짐때문에 이동이 번거로울 뻔했는데</p>
              <p>지인의 추천으로 써보니 좋았습니다.</p>
            </div>
          </div>
        </swiper-slide>
        <!-- 리뷰카드2 -->
        <swiper-slide>
          <div class="Reviews">
            <!-- 사진 -->
            <div class="cardImg">
              <img src="/public/images/carrier3.png" alt="" />
            </div>
            <!-- 이름 -->
            <div class="name">
              <p>하 * *</p>
            </div>
            <!-- 후기 -->
            <div class="Review">
              <p>부모님 데리고 가족여행을 대구로 왔는데</p>
              <p>짐이 너무 많은거에요!! 덕분에 짐 덜었습니다ㅎㅎ</p>
            </div>
          </div>
        </swiper-slide>
        <!-- 리뷰카드3 -->
        <swiper-slide>
          <div class="Reviews">
            <!-- 사진 -->
            <div class="cardImg">
              <img src="/public/images/carrier5.png" alt="" />
            </div>
            <!-- 이름 -->
            <div class="name">
              <p>권 * *</p>
            </div>
            <!-- 후기 -->
            <div class="Review">
              <p>이번 여행때 차가없어서 고민이 많았는데</p>
              <p>
                친구의 추천으로 알게되었습니다. 한번씩 가벼운 여행을 하고 싶을때
                추천드립니다.
              </p>
            </div>
          </div>
        </swiper-slide>
        <!-- 리뷰카드4 -->
        <swiper-slide>
          <div class="Reviews">
            <!-- 사진 -->
            <div class="cardImg">
              <img src="/public/images/carrier6.png" alt="" />
            </div>
            <!-- 이름 -->
            <div class="name">
              <p>하 * *</p>
            </div>
            <!-- 후기 -->
            <div class="Review">
              <p>부모님 데리고 가족여행을 대구로 왔는데</p>
              <p>짐이 너무 많은거에요!! 덕분에 짐 덜었습니다ㅎ</p>
            </div>
          </div>
        </swiper-slide>
        <!-- 리뷰카드5 -->
        <swiper-slide>
          <div class="Reviews">
            <!-- 사진 -->
            <div class="cardImg">
              <img src="/public/images/carrier4.png" alt="" />
            </div>
            <!-- 이름 -->
            <div class="name">
              <p>우 * *</p>
            </div>
            <!-- 후기 -->
            <div class="Review">
              <p>즐거운여행!!</p>
              <p>가벼운 여행!!</p>
            </div>
          </div>
        </swiper-slide>
        <!-- 리뷰카드6 -->
        <swiper-slide>
          <div class="Reviews">
            <!-- 사진 -->
            <div class="cardImg">
              <img src="/public/images/carrier1.png" alt="" />
            </div>
            <!-- 이름 -->
            <div class="name">
              <p>나 * *</p>
            </div>
            <!-- 후기 -->
            <div class="Review">
              <p>대구 여행길 짐이 많아 고민이었는데</p>
              <p>덕분에 편하게 여행했습니다.</p>
            </div>
          </div>
        </swiper-slide>
      </swiper>

      <!-- 스타벅스 커피이벤트 -->
      <div class="ReviewEvent">
        <div class="title2">
          <h2>리뷰쓰고 커피받자!</h2>
          <p>인스타 리뷰작성시 스타벅스 커피지급</p>
        </div>
        <div class="instaAll">
          <!-- 말풍선1 -->
          <div class="ballon1">
            <img src="/public/images/yr/center/balloon1.png" alt="" />
          </div>
          <!-- 인스타게시글 -->
          <div class="instaReview">
            <div class="instabg">
              <!-- 인스타상단 -->
              <div class="instaTop">
                <div class="profile">
                  <img src="/public/images/profile_insta.png" alt="" />
                </div>
                <p>Doyongdal</p>
              </div>
              <!-- 용달가족놀러 -->
              <div class="instaMiddle">
                <img src="/images/gh/ma_visual/mavisual.gif" alt="메인비쥬얼" />
              </div>
              <!-- 인스타아이콘들 -->
              <div class="instaIcons">
                <img src="/public/images/yr/center/instaIcon1.png" alt="" />
                <img src="/public/images/yr/center/instaIcon2.png" alt="" />
                <img src="/public/images/yr/center/instaIcon3.png" alt="" />
              </div>
              <!-- 인스타 태그 -->
              <div class="instTag">
                <p class="like">좋아요 999</p>
                <p>#가방도#짐운송#짐운반#가벼운이동</p>
                <p>#83타워#금호강#수성못#오리배</p>
                <p>#행복해#용달가족#나들이#날씨좋아</p>
              </div>
            </div>
          </div>
          <!-- 스벅커피 -->
          <div class="starBucksCoffee">
            <img src="/public/images/yr/center/coffee.png" alt="">
          </div>
          <!-- 말풍선2 -->
          <div class="ballon2">
            <img src="/public/images/yr/center/balloon2.png" alt="" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/pagination";
// import '@/style.css';
import { Pagination } from "swiper/modules";
</script>
<style lang="scss" scoped>
@use "/src/assets/Variables" as *;
.widthAllBg {
  .blockgr{
        background: linear-gradient(to bottom, #f2f2f2, #ffffff);
        height: 70px; // 필요에 따라 조정
        margin-top: 90px;
      }
  // background: linear-gradient(
  //   to bottom,
  //   #f3f3f3,
  //   #fff
  // ); // 회색(#ccc) → 하얀색(#fff)
  // height: 100vh;
  
  .inner {
    max-width: 1300px;
    margin: 0 auto;

    .title {
      width: 100%;
      h2 {
        font-size: 60px;
        text-align: center;
        font-family: $font-ownglyph;
        padding-top: 120px;
        padding-bottom: 120px;
      }
    }

    .Reviews {
      width: 100%;
      // background-color: #f0f0f0;
      border: 3px solid #f0f0f0;

      padding: 5%;
      border-radius: 15px;
      .cardImg {
        img {
          width: 100%;
          border-radius: 5px;
        }
      }
      .name {
        font-size: 28px;
        margin-top: 10px;
        margin-bottom: 10px;
      }
      .Review {
        font-size: 20px;
        p {
          margin-bottom: 3px;
          font-family: $font-ownglyph;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
    }

    .ReviewEvent {
      width: 100%;
      // height: 100vh;
      padding-top: 120px;
      padding-bottom: 120px;
      .title2 {
        text-align: center;
        font-family: $font-ownglyph;
        h2 {
          font-size: 60px;
          margin-bottom: 10px;
        }
        p {
          font-size: 25px;
        }
      }
      .instaAll{
        display: flex;
        // 인스타 풍선1
        .ballon1{
          margin-top: 150px;
        }

      // 인스타 페이지
      .instaReview {
        position: relative;
        margin-top: 50px !important;
        width: 50%;
        background-color: #fff;
        border: 3px solid #f0f0f0;
        margin: 0 auto;
        padding: 2%;
        .instabg {
          .instaTop {
            display: flex;
            p {
              font-size: 19px;
              line-height: 30px;
              padding-top: 5px;
              padding-left: 7px;
            }
          }
          .instaMiddle {
            img {
              width: 600px;
            }
          }
          .instaIcons {
            display: flex;
            gap: 2%;
            margin-bottom: 3%;
          }
          .instTag {
            .like {
              color: #000;
              margin-bottom: 3%;
              font-size: 20px;
            }
            p {
              color: #c7c7c7;
              font-size: 18px;
              margin-bottom: 1%;
            }
          }
        }
      }
      .starBucksCoffee{
        position: absolute;
        top: 3950px;
        left: 1200px;
        img{
          transform: rotate(12deg);
          transform-origin: top left; /* 왼쪽 위 기준으로 회전 */
        }
      }
      .ballon2{
          margin-top: 450px;
        }
    }
    }
  }
}
</style>
