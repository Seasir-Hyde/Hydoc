---
# 文档的URL路径标识符
slug: SDK

# 文档标题，显示在页面顶部
title: SDK示例

# 发布日期，用于时间排序
date: 2024-10-06

# 作者名称
# authors: Hyde

# 最后更新日期，用于时间排序
last_update:
  date: 2024/10/06

# 文章标签，帮助分类
tags: [SaleSmartly, JavaScript, SDK]

#关键词，用于SEO优化
keywords: [SaleSmartly, JavaScript, SDK]

# 文档的简要描述
description: 基于Vue3 构建的SDK示例组件

# 文章的封面图片
image: https://resource.helplook.net/docker_production/4lsamm/icon/icon.png?rand=17935696

#置顶级别，决定文章在列表中的位置
sticky: 4
---

基于Vue3 构建的JavaScript-Sdk示例组件

<!-- truncate -->



## 打开/关闭聊天窗口组件

### TS代码

```ts
#SaleSmartly_Button.vue

<script setup lang="ts">
import { ref } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';

// 显示确认对话框
const showConfirmDialog = (message: string, title: string) => {
  return ElMessageBox.confirm(message, title, {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
    draggable: true
  });
};

// 显示信息消息
const showInfoMessage = (message: string) => {
  ElMessage({
    type: 'info',
    message
  });
};

// 显示成功消息
const showSuccessMessage = (message: string) => {
  ElMessage({
    type: 'success',
    message
  });
};

// 用于控制点击频率的变量
const isProcessing = ref(false); // 控制按钮是否处于处理状态
const lastClickTime = ref(0); // 记录上一次点击的时间戳
const cooldownTime = 3000; // 设置冷却时间为3秒
// 封装防抖逻辑的函数
const handleDebounce = () => {
  const now = Date.now();

  // 判断是否在冷却时间内重复点击
  if (now - lastClickTime.value < cooldownTime) {
    ElMessage.error('点击太快啦，休息下叭~');
    return true;
  }

  // 更新最后一次点击的时间
  lastClickTime.value = now;
  return false;
};

// 打开聊天窗口
const openChat = async () => {
  if (handleDebounce()) {
    return;
  }
  try {
    isProcessing.value = true; // 设置处理状态为真，防止重复操作
    await showConfirmDialog('确定要打开聊天窗口吗？', '确认');
    if (typeof window.ssq !== 'undefined' && typeof window.ssq.push === 'function') {
      window.ssq.push('chatOpen');
      console.log('聊天窗口已打开');
      showSuccessMessage('聊天窗口已打开');
    } else {
      console.error('ssq 未定义或者未声明--打开聊天窗口');
    }
  } catch {
    showInfoMessage('操作已取消');
    console.log('用户已取消打开聊天窗口');
  }
};

// 关闭聊天窗口
const chatClose = async () => {
  if (handleDebounce()) {
    return;
  }

  try {
    isProcessing.value = true; // 设置处理状态为真，防止重复操作

    // 弹出确认对话框
    await ElMessageBox.confirm('确定要关闭聊天窗口吗？', '确认', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
      draggable: true
    });

    // 显示初始提示
    showInfoMessage('聊天窗口将在3秒后关闭');

    let countdown = 3; // 初始倒计时秒数
    const interval = setInterval(() => {
      countdown -= 1; // 替代 countdown--
      if (countdown > 0) {
        showInfoMessage(`聊天窗口将在${countdown}秒后关闭`);
      } else if (countdown === 0) {
        clearInterval(interval);

        // 在倒计时结束后延迟关闭聊天窗口
        setTimeout(() => {
          if (typeof window.ssq !== 'undefined' && typeof window.ssq.push === 'function') {
            window.ssq.push('chatClose');
            console.log('聊天窗口已关闭');
            showSuccessMessage('聊天窗口已成功关闭');
          } else {
            console.error('ssq 未定义或者未声明--关闭聊天窗口');
          }

          isProcessing.value = false; // 处理完成后重置处理状态
        }, 1000); // 延迟1秒后关闭聊天窗口并显示成功消息
      }
    }, 1000); // 每秒更新一次
  } catch {
    showInfoMessage('操作已取消');
    isProcessing.value = false; // 处理完成后重置处理状态
  }
};

// 定义函数时指定参数的类型为 string
const confirmNavigation = (url: string, linkName: string) => {
  if (handleDebounce()) {
    return;
  }

  ElMessageBox.confirm(`您确定要跳转到专属链接${linkName}吗？`, '确认跳转', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(() => {
      // 用户点击确定后的操作，跳转到指定的链接
      window.open(url, '_blank'); // 在新标签页打开链接
      ElMessage({
        type: 'success',
        message: `已跳转到专属链接${linkName}`
      });
    })
    .catch(() => {
      // 用户点击取消后的操作
      ElMessage({
        type: 'info',
        message: '操作已取消'
      });
    });
};
</script>
```

### Template部分

```vue
<template>
  <!-- 按钮容器 -->
  <div class="button-container">
    <ElButton type="primary" @click="openChat">咨询客服</ElButton>
    <ElButton type="danger" @click="chatClose">关闭咨询</ElButton>
    <ElButton type="primary" plain @click="confirmNavigation('http://test.seasir.top/', 'A')">专属链接A</ElButton>
    <ElButton type="success" plain @click="confirmNavigation('http://test.nicoo.ltd/', 'B')">专属链接B</ElButton>
  </div>
</template>
```

### CSS样式

```scss
<style lang="scss" scoped>
.button-container {
  display: flex;
  justify-content: flex-end; /* 保持 PC 端按钮居右对齐 */
  border-radius: 8px;
  height: 40px;
  align-items: center;
  display: grid;
  grid-template-columns: 1fr 1fr; /* 定义2列布局 */
  gap: 20px; /* 按钮之间的间距 */
}

.button-container .el-button {
  margin-left: 10px;
}

// 按钮移动端媒体查询
@media (max-width: 768px) {
  /* 移动端屏幕宽度小于等于 768px 时 */
  .button-container {
    justify-content: center; /* 移动端按钮居中 */
    flex-wrap: wrap;
    height: auto;
    padding: 0px; /* 增加内边距 */
  }

  .button-container .el-button {
    flex: 0 0 calc(50% - 20px); /* 每个按钮占据一半宽度减去一定的间距 */
    margin: 10px; /* 上下左右都有间距 */
    height: 38px; /* 增加按钮高度 */
  }
}

@media (max-width: 768px) {
  .button-container {
    grid-template-columns: 2fr; /* 在移动设备上改为1列 */
  }
}
</style>
```

## 清理用户登录信息

### TS代码

```ts
#header-banner.vue

import InformationCard from './InformationCard.vue'; // 信息卡片
import SaleSmartlyButton from './SaleSmartly/SaleSmartly_Button.vue'; // 咨询客服/专属按钮

// 清理用户信息并切换到访客模式的函数
function clearUserInfo() {
  if (window.ssq) {
    window.ssq.push('clearUser');
    console.log('用户信息已清除，已切换到访客模式。');
  } else {
    console.error('ssq 对象不可用');
  }
}

// 退出登录函数
function logout() {
  window.$dialog?.info({
    title: $t('common.tip'),
    content: $t('common.logoutConfirm'),
    positiveText: $t('common.confirm'),
    negativeText: $t('common.cancel'),
    onPositiveClick: () => {
      authStore.resetStore(); // 重置认证存储
      clearUserInfo(); // 在这里调用清理用户信息的函数
    }
  });
}

function handleDropdown(key: DropdownKey) {
  if (key === 'logout') {
    logout();
  } else {
    routerPushByKey(key);
  }
}
```

### Template部分

```vue
<template>
  <NCard :bordered="false" class="card-wrapper">
    <NGrid :x-gap="gap" :y-gap="16" responsive="screen" item-responsive>
      <NGi span="24 s:24 m:18">
        <div class="flex-y-center">
          <div class="size-72px shrink-0 overflow-hidden rd-1/2">
            <img src="@/assets/imgs/soybean.jpg" class="size-full" />
          </div>
          <div class="pl-12px">
            <h3 class="text-18px font-semibold">
              {{ $t('page.home.greeting', { userName: authStore.userInfo.userName }) }}
            </h3>
            <!-- <p class="text-#999 leading-30px">{{ $t('page.home.weatherDesc') }}</p> -->
          </div>
        </div>
        <!-- 信息卡片 -->
        <InformationCard />
      </NGi>

      <NGi span="24 s:24 m:6">
        <NSpace :size="24" justify="end">
          <NStatistic v-for="item in statisticData" :key="item.id" class="whitespace-nowrap" v-bind="item" />
        </NSpace>
        <!-- 咨询客服/专属按钮 -->
        <SaleSmartlyButton />
      </NGi>
    </NGrid>
  </NCard>
</template>
```



## 二次元壁纸组件

### TS代码

```ts
#SaleSmartly_Button.vue

<script setup lang="ts">
// 定义响应式数据
const wallpaperUrl = ref('');
const loading = ref(false);
const error = ref<string | null>(null);

// 定义获取壁纸的函数
const fetchWallpaper = async () => {
  loading.value = true;
  error.value = null;
  try {
    const response = await fetch('https://api.vvhan.com/api/wallpaper/acg?type=json');
    const data = await response.json();
    if (data.success && data.url) {
      wallpaperUrl.value = data.url;
    } else {
      throw new Error('获取壁纸失败');
    }
  } catch (err) {
    // 进行类型检查，确保 err 是对象且有 message 属性
    if (err instanceof Error) {
      error.value = err.message;
    } else {
      error.value = 'An unknown error occurred';
    }
  } finally {
    loading.value = false;
  }
};

fetchWallpaper();
</script>
```

### Template部分

```vue
<template>
  <!-- 壁纸容器 -->
  <div class="wallpaper-container">
    <!-- 提示信息 -->
    <ElButton v-if="loading" class="loading-text" type="primary" loading>壁纸加载中...</ElButton>
    <!-- 获取壁纸失败时显示错误信息 -->
    <ElButton v-if="error">{{ error }}</ElButton>

    <!-- 成功获取时显示图片 -->
    <div v-if="wallpaperUrl">
      <img :src="wallpaperUrl" alt="ACG Wallpaper" class="wallpaper-image" @click="openChat" />
    </div>

    <!-- 刷新壁纸按钮 -->
    <ElButton type="primary" @click="fetchWallpaper">刷新壁纸</ElButton>
  </div>
</template>
```

### CSS样式

```scss
<style lang="scss" scoped>
// 获取壁纸样式
.wallpaper-container {
  text-align: center;
  margin: 10px;
  margin-top: 60px;
}

.wallpaper-image {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  margin-top: 10px;
  margin-bottom: 10px;
  cursor: pointer; /* 鼠标放上去时显示手指光标 */
}

.loading-text {
  color: #ffffff;
}
</style>
```

## 信息卡片组件

### TS代码

```ts
#InformationCard.vue

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { ElMessage } from 'element-plus'; // 引入ElMessage组件

// 天气数据
const weatherData = ref({
  city: '',
  temperature: '',
  type: '',
  date: '',
  week: ''
});

// 获取天气信息的函数
const error = ref(false);
const loading = ref(false); // 控制加载中状态
// 获取天气信息的函数
const getWeatherInfo = async () => {
  loading.value = true; // 开始加载
  try {
    const response = await fetch('https://api.vvhan.com/api/weather');
    const data = await response.json();
    if (data.success) {
      weatherData.value = {
        city: data.city,
        temperature: `${data.data.low}-${data.data.high}`,
        type: data.data.type,
        date: data.data.date,
        week: data.data.week
      };
    } else {
      error.value = true;
      ElMessage.error('获取天气信息失败，请检查网络或者关闭代理'); // 显示错误提示
    }
  } catch (err) {
    console.error('获取天气信息失败', err);
  } finally {
    loading.value = false; // 加载结束
  }
};

// 储存舔狗日记内容
const diaryContent = ref('');

// 获取舔狗日记的函数
const getDiary = async () => {
  try {
    const response = await fetch('https://api.vvhan.com/api/text/dog?type=json');
    const data = await response.json();

    if (data.success) {
      diaryContent.value = data.data.content; // 获取内容
    } else {
      console.error('获取舔狗日记失败:', data.message);
    }
  } catch (fetchError) {
    console.error('获取舔狗日记失败', fetchError);
  }
};

const init = async () => {
  await getWeatherInfo(); // 获取天气信息
  await getDiary(); // 获取舔狗信息
};

// 新增：控制显示选项
const isConfigOpen = ref(false);
const showFPS = ref(true);
const showWeather = ref(true);
const showDate = ref(true);
const showTemperature = ref(true);
const showWeek = ref(true);
const showgetDiary = ref(true);

// 新增：FPS计算
const fps = ref(0);
let frameCount = 0;
let lastTime = 0;

const updateFPS = (time: DOMHighResTimeStamp) => {
  if (lastTime === 0) {
    lastTime = time;
    requestAnimationFrame(updateFPS);
    return;
  }

  const delta = time - lastTime;
  frameCount += 1;

  if (delta > 1000) {
    fps.value = Math.round((frameCount * 1000) / delta);
    frameCount = 0;
    lastTime = time;
  }

  requestAnimationFrame(updateFPS);
};

onMounted(async () => {
  await init();
  requestAnimationFrame(updateFPS);
});

onMounted(() => {
  getWeatherInfo();
});
</script>
```

### Template部分

```vue
<template>
  <!-- 修改：欢迎卡片，包含天气信息和新功能 -->
  <ElCard class="info-card animate__animated animate__fadeIn welcome-card mobile-card" shadow="hover">
    <div class="welcome-content">
      <!-- 新增：FPS显示 -->
      <div v-if="showFPS" class="fps-display">FPS: {{ fps }}</div>

      <!-- 新增：配置开关 -->
      <ElSwitch v-model="isConfigOpen" class="config-switch" active-color="#13ce66" inactive-color="#ff4949"></ElSwitch>

      <!-- 配置面板 -->
      <div v-if="isConfigOpen" class="config-panel">
        <ElCheckbox v-model="showFPS">显示 FPS</ElCheckbox>
        <ElCheckbox v-model="showWeather">显示天气</ElCheckbox>
        <ElCheckbox v-model="showDate">显示日期</ElCheckbox>
        <ElCheckbox v-model="showTemperature">显示温度</ElCheckbox>
        <ElCheckbox v-model="showWeek">显示星期</ElCheckbox>
        <ElCheckbox v-model="showgetDiary">显示舔狗</ElCheckbox>
      </div>

      <!-- 欢迎信息 -->
      <template v-else>
        <h2 v-if="!error && weatherData.city" class="greeting">
          欢迎来自
          <span class="highlight">{{ weatherData.city }}</span>
          的小伙伴！🎉🎉🎉
        </h2>
        <div class="info-container">
          <div v-if="showTemperature" class="info-item">
            <i class="el-icon-sunny"></i>
            <span v-if="!error && weatherData.city">
              今日温度：
              <span class="highlight">{{ weatherData.temperature }}</span>
            </span>
          </div>
          <div v-if="showWeather" class="info-item">
            <i class="el-icon-cloudy"></i>
            <span v-if="!error && weatherData.city">
              天气：
              <span class="highlight">{{ weatherData.type }}</span>
            </span>
          </div>
          <div v-if="showDate" class="info-item">
            <i class="el-icon-date"></i>
            <span v-if="!error && weatherData.city">
              日期：
              <span class="highlight">{{ weatherData.date }}</span>
            </span>
          </div>
          <div v-if="showWeek" class="info-item">
            <i class="el-icon-calendar"></i>
            <span v-if="!error && weatherData.city">
              星期：
              <span class="highlight">{{ weatherData.week }}</span>
            </span>
          </div>
          <div v-if="showgetDiary" class="info-item">
            <i class="el-icon-calendar"></i>
            <h1 class="vertical-title">舔狗日记：</h1>
            <p v-if="diaryContent" class="diary-content">{{ diaryContent }}</p>
            <p v-else class="diary-content">加载中...</p>
          </div>
        </div>
      </template>
    </div>
  </ElCard>
</template>
```

### CSS样式

```scss
<style lang="scss" scoped>
.welcome-card {
  margin: 4px;
  padding: 1.5rem;
  border-radius: 12px;
  text-align: center;
  font-size: 1.1rem;
  transition: all 0.3s ease;
  background: var(--day-bg);
  color: var(--day-text);
  box-shadow: 0 4px 6px var(--day-shadow);
  transform: translateY(0);
  position: relative;
  border: 1px solid rgba(255, 255, 255, 0); /* 完全透明的边框 */

  &.night-mode {
    background: var(--night-bg);
    color: var(--night-text);
    box-shadow: 0 4px 6px var(--night-shadow);

    &:hover {
      box-shadow: 0 10px 20px var(--night-shadow);
    }

    .highlight {
      color: red;
    }
  }

  .welcome-content {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .greeting {
    font-size: 1.5rem;
    margin: 0;
    font-weight: bold;
  }

  .highlight {
    color: red;
  }

  .info-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1rem;
  }

  .info-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;

    i {
      font-size: 1.2rem;
    }
  }

  .fps-display {
    position: absolute;
    top: 0.5rem;
    left: 0.5rem;
    font-size: 0.9rem;
    font-weight: bold;
  }

  .config-switch {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
  }

  .config-panel {
    display: flex;
    flex-wrap: wrap; /* 自动换行 */
    justify-content: center; /* 水平居中对齐 */
    align-items: center; /* 垂直居中对齐 */
  }

  .config-panel .el-checkbox {
    width: 15%; /* 每个元素占据 15% 宽度，PC保持1列 */
    margin: 5px; /* 元素间距 */
    display: flex;
    justify-content: center; /* 文字与复选框居中 */
    align-items: center;
  }

  @media (max-width: 768px) {
    .config-panel .el-checkbox {
      width: 40%; /* 如果屏幕更小，双列显示 */
    }
  }
}
</style>
```

