// 滚动动画触发
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      }
    });
  },
  { threshold: 0.1 },
);

document.querySelectorAll(".reveal-text, .reveal-up").forEach((el) => {
  observer.observe(el);
});

// 作品分类筛选
const filterButtons = document.querySelectorAll(".gallery-filters span");
const galleryItems = document.querySelectorAll(".gallery-item");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    // 切换激活状态
    filterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    const filter = button.getAttribute("data-filter");

    galleryItems.forEach((item) => {
      if (filter === "all" || item.getAttribute("data-category") === filter) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    });
  });
});

// 作品模态框逻辑
const modal = document.getElementById("projectModal");
const modalMedia = document.getElementById("modalMedia");
const modalTitle = document.getElementById("modalTitle");
const modalDesc = document.getElementById("modalDesc");
const closeModal = document.querySelector(".close-modal");

// 关闭模态框
closeModal.addEventListener("click", () => {
  modal.style.display = "none";
  modalMedia.innerHTML = "";
  // 停止视频播放
  const videos = modalMedia.querySelectorAll("video");
  videos.forEach((video) => video.pause());
});

// 点击空白处关闭模态框
window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
    modalMedia.innerHTML = "";
    const videos = modalMedia.querySelectorAll("video");
    videos.forEach((video) => video.pause());
  }
});

// 作品卡片点击事件
galleryItems.forEach((item) => {
  item.addEventListener("click", () => {
    const title = item.querySelector("h3").textContent;
    const desc = item.getAttribute("data-desc");
    const images = item.getAttribute("data-images");
    const video = item.getAttribute("data-video");

    modalTitle.textContent = title;
    modalDesc.textContent = desc;
    modalMedia.innerHTML = "";

    // 处理视频
    if (video) {
      const videoEl = document.createElement("video");
      videoEl.src = video;
      videoEl.controls = true;
      videoEl.autoplay = true;
      modalMedia.appendChild(videoEl);
    }

    // 处理图片
    if (images) {
      const imageList = JSON.parse(images);
      imageList.forEach((imgSrc) => {
        const imgEl = document.createElement("img");
        imgEl.src = imgSrc;
        imgEl.alt = title;
        modalMedia.appendChild(imgEl);
      });
    }

    modal.style.display = "block";
  });
});

// 简历图片点击全屏查看逻辑
const resumeImage = document.getElementById("resumeImage");
if (resumeImage) {
  resumeImage.addEventListener("click", () => {
    const imgSrc = resumeImage.src;
    modalTitle.textContent = "个人简历";
    modalDesc.textContent = "";
    modalMedia.innerHTML = "";

    const imgEl = document.createElement("img");
    imgEl.src = imgSrc;
    imgEl.alt = "个人简历";
    modalMedia.appendChild(imgEl);

    modal.style.display = "block";
  });
}

// 视差效果
window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;
  const parallaxText = document.querySelector(".parallax-text");
  if (parallaxText) {
    parallaxText.style.transform = `translateY(${scrollY * 0.3}px)`;
  }
});
