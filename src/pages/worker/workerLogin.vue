<template>
  <!-- ✅ 스플래시 화면 -->
  <div id="splash" class="w-[390px] h-[650px] m-auto bg-gray-800 flex items-center justify-center">
    <div class="w-[350px] h-[600px] flex justify-center items-center">
      <img
        src="/public/images/yr/delivery/logoMain.png"
        alt="로고"
        class="h-10" />
    </div>
  </div>

  <!-- ✅ 로그인 화면 -->
  <div
    id="login"
    class="hidden w-[390px] h-[650px] bg-gray-800 flex items-center justify-center mx-auto">
    <div class="w-[280px] flex flex-col items-center gap-4">
      <!-- 로고 -->
      <div class="flex flex-col items-center mb-4">
        <img
          src="/public/images/yr/delivery/logoMain.png"
          alt="가방도 로고"
          class="h-10" />
      </div>

      <!-- 입력폼 -->
      <input
        type="text"
        placeholder="아이디를 입력해주세요"
        class="w-full p-2 rounded bg-white text-black text-sm" />
      <input
        type="password"
        placeholder="비밀번호를 입력해주세요"
        class="w-full p-2 rounded bg-white text-black text-sm" />
      <button
        class="w-full p-2 rounded bg-blue-500 text-white font-bold text-sm">
        로그인
      </button>

      <!-- 하단 링크 -->
      <div class="w-[230px] flex justify-between text-xs text-white mt-2">
        <a href="#">아이디찾기</a>
        <span>|</span>
        <a href="#">비밀번호찾기</a>
        <span>|</span>
        <a href="#">회원가입</a>
      </div>
    </div>
  </div>
</template>

<script setup>
// 2초 후 스플래시 숨기고 로그인 보이기
setTimeout(() => {
  document.getElementById("splash").classList.add("hidden")
  document.getElementById("login").classList.remove("hidden")
}, 2000)
</script>
