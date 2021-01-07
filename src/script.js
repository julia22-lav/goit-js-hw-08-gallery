import galleryItems from "./gallery-items.js";
// console.log(galleryItems[4].preview);
let activeIndex = 0;

const galleryImages = galleryItems.map((item, index) =>
  createGalleryItem(item, index)
);

const listRef = document.querySelector(".js-gallery");
const lightboxRef = document.querySelector(".js-lightbox");
const lightboxImgRef = document.querySelector(".lightbox__image");
const btnModalCloseRef = document.querySelector(
  'button[data-action="close-lightbox"]'
);
const lightboxOverlayRef = document.querySelector(".lightbox__overlay");

listRef.append(...galleryImages);

listRef.addEventListener("click", openModal);
btnModalCloseRef.addEventListener("click", closeModal);
lightboxOverlayRef.addEventListener("click", closeModal);

function createGalleryItem(imgObject, index) {
  const listItemRef = document.createElement("li");
  const linkRef = document.createElement("a");
  const imgRef = document.createElement("img");

  listItemRef.classList.add("gallery__item");
  linkRef.classList.add("gallery__link");
  imgRef.classList.add("gallery__image");

  linkRef.setAttribute("href", imgObject.original);
  imgRef.setAttribute("src", imgObject.preview);
  imgRef.setAttribute("data-source", imgObject.original);
  imgRef.setAttribute("data-index", index);
  imgRef.setAttribute("alt", imgObject.description);

  linkRef.appendChild(imgRef);
  listItemRef.appendChild(linkRef);

  return listItemRef;
}

function openModal(event) {
  if (event.target.nodeName !== "IMG") {
    return;
  }
  event.preventDefault();

  lightboxRef.classList.add("is-open");
  lightboxImgRef.setAttribute("src", event.target.dataset.source);
  activeIndex = Number(event.target.dataset.index);
  window.addEventListener("keydown", pressKey);
}

function closeModal() {
  lightboxRef.classList.remove("is-open");
  lightboxImgRef.setAttribute("src", "");
  window.removeEventListener("keydown", pressKey);
}

function pressKey(event) {
  if (event.code === "Escape") {
    closeModal();
  }

  if (event.code === "ArrowRight") {
    if (activeIndex < galleryItems.length - 1) {
      const nextImg = galleryItems[activeIndex + 1];
      lightboxImgRef.src = nextImg.original;
      activeIndex += 1;
    }
  }

  if (event.code === "ArrowLeft") {
    if (activeIndex >= 1) {
      const previousImg = galleryItems[activeIndex - 1];
      lightboxImgRef.src = previousImg.original;
      activeIndex -= 1;
    }
  }
}
