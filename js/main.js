// 核心修改：GridMotion倾斜网格无限滚动动画初始化 - 替换为30张指定命名图片
document.addEventListener("DOMContentLoaded", () => {
  const gridTrack = document.getElementById("gridMotionTrack");
  const totalImages = 30; // 固定30张照片
  const duplicateCount = 2; // 两组内容实现无缝循环无断层

  // 生成网格卡片 - 替换为指定命名的图片
  function generateGridCards() {
    if (!gridTrack) return;
    gridTrack.innerHTML = "";

    // 生成两组完全相同的内容，实现无缝滚动
    for (let loop = 0; loop < duplicateCount; loop++) {
      for (let i = 0; i < totalImages; i++) {
        const card = document.createElement("div");
        card.className = "grid-motion-card";
        const img = document.createElement("img");
        // 严格匹配命名规则：00000.png、00000(1).png、00000(2).png...00000(29).png
        const imgFileName = i === 0 ? "00000.png" : `00000(${i}).png`;
        img.src = `assets/images/${imgFileName}`;
        img.alt = `Grid Image ${i + 1}`;
        img.loading = "lazy"; // 懒加载优化性能
        card.appendChild(img);
        gridTrack.appendChild(card);
      }
    }
  }

  // 窗口resize适配（完全保留）
  function handleGridResize() {
    generateGridCards();
  }

  // 初始化GridMotion
  generateGridCards();
  window.addEventListener("resize", handleGridResize);

  // 原有Hero副标题逻辑（完全保留）
  const heroSubtitle = document.querySelector(".hero-subtitle");
  if (heroSubtitle) {
    heroSubtitle.classList.add("active");
  }
});

// Reveal 动画 IntersectionObserver 逻辑（完全保留）
const observerOptions = {
  root: null,
  rootMargin: "0px",
  threshold: 0.1,
};

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("active");
      revealObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll(".reveal-text, .reveal-up").forEach((el) => {
  revealObserver.observe(el);
});

// 作品分类筛选（完全保留）
const filterButtons = document.querySelectorAll(".gallery-filters span");
const galleryItemsAll = document.querySelectorAll(".gallery-item");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    const filter = button.getAttribute("data-filter");

    galleryItemsAll.forEach((item) => {
      if (filter === "all" || item.getAttribute("data-category") === filter) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    });
  });
});

// 作品模态框逻辑（完全保留）
const modal = document.getElementById("projectModal");
const modalMedia = document.getElementById("modalMedia");
const modalTitle = document.getElementById("modalTitle");
const modalDesc = document.getElementById("modalDesc");
const closeModal = document.querySelector(".close-modal");

closeModal.addEventListener("click", () => {
  modal.style.display = "none";
  modalMedia.innerHTML = "";
  const videos = modalMedia.querySelectorAll("video");
  videos.forEach((video) => video.pause());
});

window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
    modalMedia.innerHTML = "";
    const videos = modalMedia.querySelectorAll("video");
    videos.forEach((video) => video.pause());
  }
});

galleryItemsAll.forEach((item) => {
  item.addEventListener("click", () => {
    const title = item.querySelector("h3").textContent;
    const desc = item.getAttribute("data-desc");
    const images = item.getAttribute("data-images");
    const video = item.getAttribute("data-video");

    modalTitle.textContent = title;
    modalDesc.textContent = desc;
    modalMedia.innerHTML = "";

    if (video) {
      const videoEl = document.createElement("video");
      videoEl.src = video;
      videoEl.controls = true;
      videoEl.autoplay = true;
      modalMedia.appendChild(videoEl);
    }

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

// 简历图片点击全屏查看逻辑（完全保留）
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

// 视差效果（完全保留）
window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;
  const parallaxText = document.querySelector(".parallax-text");
  if (parallaxText) {
    parallaxText.style.transform = `translateY(${scrollY * 0.3}px)`;
  }
});
