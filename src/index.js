import ModalBaJS from "./js/modal";

export default function modal(payload = {}) {
  return new ModalBaJS(payload);
}

// const _modal = new ModalBaJS({
//   content: "<div>Lorem</div>",
// });
// _modal.show();
