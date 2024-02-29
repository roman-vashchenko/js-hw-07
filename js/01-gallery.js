import { galleryItems } from "./gallery-items.js";
// Change code below this line
let instance;

const gallery = document.querySelector(".gallery");

function createGalleryMarkup(items) {
  return items
    .map(
      ({ preview, original, description }) =>
        `<li class="gallery__item">
    <a class="gallery__link" href="${original}">
     <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>`
    )
    .join("");
}

gallery.innerHTML = createGalleryMarkup(galleryItems);

gallery.addEventListener("click", onGalleryClick);

function onGalleryClick(e) {
  e.preventDefault();

  if (e.target.nodeName !== "IMG") return;

  instance = basicLightbox.create(`
    <img src="${e.target.dataset.source}" width="800" height="600">
`);

  instance.show();
  document.addEventListener("keydown", onDocumentKeydown);
  instance.element().addEventListener("click", () => {
    document.removeEventListener("keydown", onDocumentKeydown);
  });
}

function onDocumentKeydown(e) {
  if (e.code === "Escape") {
    instance.close();
    document.removeEventListener("keydown", onDocumentKeydown);
  }
}
