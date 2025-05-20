<template>
  <!-- 상단 상태표시 -->
  <div class="w-[390px] bg-gray-900 text-white p-4">
    <!-- 이너 -->
    <div class="w-[350px] mx-auto">
      <!-- 헤더 -->
      <div class="flex justify-between items-center mb-4">
        <div class="logo">
          <img src="/public/images/logo_delivery.png" alt="로고" />
        </div>
        <div class="flex gap-2">
          <img
            src="/public/images/yr/delivery/check_icon.png"
            alt="체크"
            class="w-[20px] h-[20px]" />
          <img
            src="/public/images/yr/delivery/alert.png"
            alt="알림"
            class="w-[20px] h-[20px]" />
        </div>
      </div>

      <!-- 프로필 -->
      <div class="flex items-center mb-4">
        <div class="w-12 h-12 bg-gray-700 rounded-full mr-3">
          <img
            src="/public/images/yr/delivery/profile.png"
            alt="프로필"
            class="w-full h-full rounded-full object-cover" />
        </div>
        <div>
          <p class="text-lg font-semibold">홍길동 기사님</p>
          <p class="text-sm text-gray-300">오늘도 안전 운행 하세요!</p>
        </div>
      </div>

      <!-- 작업 대시보드 -->
      <div class="bg-white rounded-xl text-black p-4 space-y-3">
        <div class="flex justify-between text-sm">
          <span>총 작업수</span>
          <span>5 / 15건</span>
        </div>
        <div class="flex justify-between text-sm">
          <span>완료율</span>
          <span class="text-blue-500">33.3%</span>
        </div>
        <!-- 진행 바 -->
        <div class="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <div class="h-full bg-orange-400" style="width: 33.3%"></div>
        </div>
        <!-- 수령금액 -->
        <div class="flex justify-between text-sm font-semibold">
          <span>수령금액</span>
          <span class="text-red-500">40,000원</span>
        </div>
      </div>

      <!-- 지도 보기 버튼 -->
      <button
        class="w-full bg-blue-500 hover:bg-blue-600 text-white text-sm mt-4 py-2 rounded-lg flex justify-center items-center gap-1">
        <img
          src="/public/images/yr/delivery/map_icon.png"
          alt="지도 아이콘"
          class="w-4 h-4" />지도 보기
      </button>
    </div>
  </div>

  <!-- 버튼필터 -->
  <div class="w-[390px] bg-gray-800 text-white py-4">
    <!-- 내부 콘텐츠 wrapper (350px 고정) -->
    <div class="w-[350px] mx-auto">
      <!-- 상단 상태 탭 -->
      <div
        class="flex justify-between text-sm font-semibold text-gray-400 mb-4">
        <button class="text-blue-500 border-b-2 border-blue-500 pb-1">
          전체
        </button>
        <button class="border-b-2 border-gray-800 pb-1">진행중</button>
        <button class="border-b-2 border-gray-800 pb-1">대기중</button>
        <button class="border-b-2 border-gray-800 pb-1">완료</button>
      </div>

      <!-- 위치/필터 버튼 영역 -->
      <div class="flex justify-center items-center">
        <!-- 위치 버튼들 -->
        <div class="flex gap-2">
          <button
            class="border border-blue-400 text-blue-500 bg-white rounded-lg px-[20px] py-[10px] text-sm font-semibold shadow">
            공항
          </button>
          <button
            class="border border-gray-300 text-gray-500 bg-white rounded-lg px-[15px] py-[10px] text-sm font-semibold shadow">
            기차역
          </button>
          <button
            class="border border-gray-300 text-gray-500 bg-white rounded-lg px-[20px] py-[10px] text-sm font-semibold shadow mr-[15px]">
            숙소
          </button>
        </div>

        <!-- 필터 아이콘 버튼들 -->
        <div class="flex gap-2">
          <button class="bg-green-500 rounded-md p-2">
            <img
              src="/public/images/yr/delivery/clock_icon.png"
              alt="시계"
              class="w-4 h-4" />
          </button>
          <button class="bg-blue-400 rounded-md p-2">
            <img
              src="/public/images/yr/delivery/asc_icon.png"
              alt="정렬"
              class="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- 카드내용 -->
  <div class="w-[390px] bg-gray-800 text-sm py-4">
    <!-- 내부 콘텐츠 wrapper (350px 고정) -->

    <!-- 카드1 -->
    <div class="w-[350px] mx-auto flex flex-col gap-3 mb-2">
      <!-- 카드구조 -->
      <div
        class="card w-[350px] bg-white rounded-lg shadow flex items-center px-2 py-1 gap-3">
        <!-- 시간 -->
        <div
          class="time text-red-500 text-sm font-medium w-[50px] ml-2 font-semibold">
          17:00
        </div>

        <!-- 상세내용 -->
        <div class="detailContent flex flex-col gap-1 w-full">
          <!-- detail1: 상태 원 + 이름 -->
          <div class="detail1 flex items-center gap-2">
            <!-- 동그라미 상태표시 -->
            <div class="circle w-2 h-2 bg-green-500 rounded-full"></div>
            <!-- 이름 -->
            <div class="name text-[15px] font-semibold">홍길동</div>
          </div>

          <!-- detail2: 사이즈 -->
          <div class="detail2 text-[13px] text-blue-500">s사이즈 / 3개</div>

          <!-- detail3: 아이콘 + 주소 -->
          <div class="detail3 flex items-center text-xs text-black-700 gap-1">
            <div class="iconState">
              <img
                src="/public/images/yr/delivery/home_icon.png"
                alt="집아이콘"
                class="w-4 h-4 text-green-600" />
            </div>
            <p class="truncate pt-1">대구 중구 국채보상로 2길 121..</p>
          </div>
        </div>

        <!-- 오른쪽버튼 -->
        <div class="rightButton flex items-center gap-3">
          <!-- 전화버튼 -->
          <div class="callbuttuon w-[35px] h-[90px] pt-[30px]">
            <img src="/public/images/yr/delivery/phone_icon.png" alt="전화" />
          </div>

          <!-- 시작버튼 -->
          <div
            class="startButton bg-red-500 text-white text-sm w-[50px] h-[80px] rounded font-semibold flex items-center justify-center">
            <p class="text">시작</p>
          </div>
        </div>
      </div>
    </div>
    <!-- 카드1 -->
    <div class="w-[350px] mx-auto flex flex-col gap-3 mb-2">
      <!-- 카드구조 -->
      <div
        class="card w-[350px] bg-white rounded-lg shadow flex items-center px-2 py-1 gap-3">
        <!-- 시간 -->
        <div
          class="time text-red-500 text-sm font-medium w-[50px] ml-2 font-semibold">
          17:00
        </div>

        <!-- 상세내용 -->
        <div class="detailContent flex flex-col gap-1 w-full">
          <!-- detail1: 상태 원 + 이름 -->
          <div class="detail1 flex items-center gap-2">
            <!-- 동그라미 상태표시 -->
            <div class="circle w-2 h-2 bg-green-500 rounded-full"></div>
            <!-- 이름 -->
            <div class="name text-[15px] font-semibold">홍길동</div>
          </div>

          <!-- detail2: 사이즈 -->
          <div class="detail2 text-[13px] text-blue-500">s사이즈 / 3개</div>

          <!-- detail3: 아이콘 + 주소 -->
          <div class="detail3 flex items-center text-xs text-black-700 gap-1">
            <div class="iconState">
              <img
                src="/public/images/yr/delivery/home_icon.png"
                alt="집아이콘"
                class="w-4 h-4 text-green-600" />
            </div>
            <p class="truncate pt-1">대구 중구 국채보상로 2길 121..</p>
          </div>
        </div>

        <!-- 오른쪽버튼 -->
        <div class="rightButton flex items-center gap-3">
          <!-- 전화버튼 -->
          <div class="callbuttuon w-[35px] h-[90px] pt-[30px]">
            <img src="/public/images/yr/delivery/phone_icon.png" alt="전화" />
          </div>

          <!-- 시작버튼 -->
          <div
            class="startButton bg-red-500 text-white text-sm w-[50px] h-[80px] rounded font-semibold flex items-center justify-center">
            <p class="text">시작</p>
          </div>
        </div>
      </div>
    </div>
    <!-- 카드1 -->
    <div class="w-[350px] mx-auto flex flex-col gap-3 mb-2">
      <!-- 카드구조 -->
      <div
        class="card w-[350px] bg-white rounded-lg shadow flex items-center px-2 py-1 gap-3">
        <!-- 시간 -->
        <div
          class="time text-red-500 text-sm font-medium w-[50px] ml-2 font-semibold">
          17:00
        </div>

        <!-- 상세내용 -->
        <div class="detailContent flex flex-col gap-1 w-full">
          <!-- detail1: 상태 원 + 이름 -->
          <div class="detail1 flex items-center gap-2">
            <!-- 동그라미 상태표시 -->
            <div class="circle w-2 h-2 bg-green-500 rounded-full"></div>
            <!-- 이름 -->
            <div class="name text-[15px] font-semibold">홍길동</div>
          </div>

          <!-- detail2: 사이즈 -->
          <div class="detail2 text-[13px] text-blue-500">s사이즈 / 3개</div>

          <!-- detail3: 아이콘 + 주소 -->
          <div class="detail3 flex items-center text-xs text-black-700 gap-1">
            <div class="iconState">
              <img
                src="/public/images/yr/delivery/home_icon.png"
                alt="집아이콘"
                class="w-4 h-4 text-green-600" />
            </div>
            <p class="truncate pt-1">대구 중구 국채보상로 2길 121..</p>
          </div>
        </div>

        <!-- 오른쪽버튼 -->
        <div class="rightButton flex items-center gap-3">
          <!-- 전화버튼 -->
          <div class="callbuttuon w-[35px] h-[90px] pt-[30px]">
            <img src="/public/images/yr/delivery/phone_icon.png" alt="전화" />
          </div>

          <!-- 시작버튼 -->
          <div
            class="startButton bg-red-500 text-white text-sm w-[50px] h-[80px] rounded font-semibold flex items-center justify-center">
            <p class="text">시작</p>
          </div>
        </div>
      </div>
    </div>
    <!-- 카드1 -->
    <div class="w-[350px] mx-auto flex flex-col gap-3 mb-2">
      <!-- 카드구조 -->
      <div
        class="card w-[350px] bg-white rounded-lg shadow flex items-center px-2 py-1 gap-3">
        <!-- 시간 -->
        <div
          class="time text-red-500 text-sm font-medium w-[50px] ml-2 font-semibold">
          17:00
        </div>

        <!-- 상세내용 -->
        <div class="detailContent flex flex-col gap-1 w-full">
          <!-- detail1: 상태 원 + 이름 -->
          <div class="detail1 flex items-center gap-2">
            <!-- 동그라미 상태표시 -->
            <div class="circle w-2 h-2 bg-green-500 rounded-full"></div>
            <!-- 이름 -->
            <div class="name text-[15px] font-semibold">홍길동</div>
          </div>

          <!-- detail2: 사이즈 -->
          <div class="detail2 text-[13px] text-blue-500">s사이즈 / 3개</div>

          <!-- detail3: 아이콘 + 주소 -->
          <div class="detail3 flex items-center text-xs text-black-700 gap-1">
            <div class="iconState">
              <img
                src="/public/images/yr/delivery/home_icon.png"
                alt="집아이콘"
                class="w-4 h-4 text-green-600" />
            </div>
            <p class="truncate pt-1">대구 중구 국채보상로 2길 121..</p>
          </div>
        </div>

        <!-- 오른쪽버튼 -->
        <div class="rightButton flex items-center gap-3">
          <!-- 전화버튼 -->
          <div class="callbuttuon w-[35px] h-[90px] pt-[30px]">
            <img src="/public/images/yr/delivery/phone_icon.png" alt="전화" />
          </div>

          <!-- 시작버튼 -->
          <div
            class="startButton bg-red-500 text-white text-sm w-[50px] h-[80px] rounded font-semibold flex items-center justify-center">
            <p class="text">시작</p>
          </div>
        </div>
      </div>
    </div>
    <!-- 카드1 -->
    <div class="w-[350px] mx-auto flex flex-col gap-3 mb-2">
      <!-- 카드구조 -->
      <div
        class="card w-[350px] bg-white rounded-lg shadow flex items-center px-2 py-1 gap-3">
        <!-- 시간 -->
        <div
          class="time text-red-500 text-sm font-medium w-[50px] ml-2 font-semibold">
          17:00
        </div>

        <!-- 상세내용 -->
        <div class="detailContent flex flex-col gap-1 w-full">
          <!-- detail1: 상태 원 + 이름 -->
          <div class="detail1 flex items-center gap-2">
            <!-- 동그라미 상태표시 -->
            <div class="circle w-2 h-2 bg-green-500 rounded-full"></div>
            <!-- 이름 -->
            <div class="name text-[15px] font-semibold">홍길동</div>
          </div>

          <!-- detail2: 사이즈 -->
          <div class="detail2 text-[13px] text-blue-500">s사이즈 / 3개</div>

          <!-- detail3: 아이콘 + 주소 -->
          <div class="detail3 flex items-center text-xs text-black-700 gap-1">
            <div class="iconState">
              <img
                src="/public/images/yr/delivery/home_icon.png"
                alt="집아이콘"
                class="w-4 h-4 text-green-600" />
            </div>
            <p class="truncate pt-1">대구 중구 국채보상로 2길 121..</p>
          </div>
        </div>

        <!-- 오른쪽버튼 -->
        <div class="rightButton flex items-center gap-3">
          <!-- 전화버튼 -->
          <div class="callbuttuon w-[35px] h-[90px] pt-[30px]">
            <img src="/public/images/yr/delivery/phone_icon.png" alt="전화" />
          </div>

          <!-- 시작버튼 -->
          <div
            class="startButton bg-red-500 text-white text-sm w-[50px] h-[80px] rounded font-semibold flex items-center justify-center">
            <p class="text">시작</p>
          </div>
        </div>
      </div>
    </div>
    <!-- 카드1 -->
    <div class="w-[350px] mx-auto flex flex-col gap-3 mb-2">
      <!-- 카드구조 -->
      <div
        class="card w-[350px] bg-white rounded-lg shadow flex items-center px-2 py-1 gap-3">
        <!-- 시간 -->
        <div
          class="time text-red-500 text-sm font-medium w-[50px] ml-2 font-semibold">
          17:00
        </div>

        <!-- 상세내용 -->
        <div class="detailContent flex flex-col gap-1 w-full">
          <!-- detail1: 상태 원 + 이름 -->
          <div class="detail1 flex items-center gap-2">
            <!-- 동그라미 상태표시 -->
            <div class="circle w-2 h-2 bg-green-500 rounded-full"></div>
            <!-- 이름 -->
            <div class="name text-[15px] font-semibold">홍길동</div>
          </div>

          <!-- detail2: 사이즈 -->
          <div class="detail2 text-[13px] text-blue-500">s사이즈 / 3개</div>

          <!-- detail3: 아이콘 + 주소 -->
          <div class="detail3 flex items-center text-xs text-black-700 gap-1">
            <div class="iconState">
              <img
                src="/public/images/yr/delivery/home_icon.png"
                alt="집아이콘"
                class="w-4 h-4 text-green-600" />
            </div>
            <p class="truncate pt-1">대구 중구 국채보상로 2길 121..</p>
          </div>
        </div>

        <!-- 오른쪽버튼 -->
        <div class="rightButton flex items-center gap-3">
          <!-- 전화버튼 -->
          <div class="callbuttuon w-[35px] h-[90px] pt-[30px]">
            <img src="/public/images/yr/delivery/phone_icon.png" alt="전화" />
          </div>

          <!-- 시작버튼 -->
          <div
            class="startButton bg-red-500 text-white text-sm w-[50px] h-[80px] rounded font-semibold flex items-center justify-center">
            <p class="text">시작</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
