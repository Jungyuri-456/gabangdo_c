<template>
  <!-- 컨텐츠1 -->
  <div class="widthAllBg">
    <div class="inner">
      <div class="bg_all">
        <!-- 왼쪽 용다리 -->
        <div class="leftImg">
          <img src="/public/images/yongdal2.png" alt="" />
        </div>
        <!-- 오른쪽 글씨 -->
        <div class="rightLetter">
          <h2>쉽고 가벼운 여행도!</h2>
          <p>원하는 곳에 짐 맡기고</p>
          <p>편하게 이동하자</p>
        </div>
      </div>
    </div>
  </div>
  <!-- 컨텐츠2 -->
  <div class="widthAllBg bgColor">
    <div class="inner">
      <div class="bg_all">
        <!-- 왼쪽 용다리 -->
        <div class="rightLetter">
          <h2>짐보관도 부담없이!</h2>
          <p>지하철, 기차, 공항</p>
          <p>어디든지 짐 맡기자</p>
        </div>
        <!-- 오른쪽 글씨 -->

        <div class="leftImg">
          <img src="/public/images/yongdal3.png" alt="" />
        </div>
      </div>
    </div>
  </div>

  <!-- 컨텐츠3 -->
  <div class="widthAllBg">
    <div class="inner">
      <div class="bg_all">
        <!-- 왼쪽 용다리 -->
        <div class="leftImg">
          <img src="/public/images/yongdal4.png" alt="" />
        </div>
        <!-- 오른쪽 글씨 -->
        <div class="rightLetter">
          <h2 class="more">실시간 배송조회도!</h2>
          <p>짐이 어디있는지 한눈에!</p>
          <p>실시간 확인하기</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup></script>
<style lang="scss" scoped>
@use "/src/assets/_Variables" as *;
.bgColor{
  background-color: rgb(255, 255, 255) !important;
}
.widthAllBg {
  background-color: rgb(255, 255, 255);
  .inner {
    max-width: 1200px;
    margin: 0 auto;

    .bg_all {
      width: 100%;
      height: 50vh;
      display: flex;
      padding-top: 70px;
      justify-content: space-between;

      .leftImg {
        text-align: center;
        line-height: 300px;
      }
      .rightLetter {
        h2 {
          font-size: 80px;
          margin-top: 70px;
          margin-bottom: 40px;
          font-weight: 520;
        }
        .more{
          margin-top: 80px;
        }
        p {
          font-size: 45px;
          margin-bottom: 8px;
          font-family: $font-ownglyph;
          color: #494949;
        }
      }
    }
  }
}
</style>
