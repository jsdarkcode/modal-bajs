import "./modal.scss";

("use strict");

/**
 * @namespace Retentation
 * @namespace Retentation.banner
 */

/**
 * Function init banner
 * @memberof Retentation.banner
 * @param {Object} config
 * @param {String} config.animation
 * @param {Boolean} config.mask - Tấm nền mờ màu đen
 * @param {String} config.content - content hiển thị trong modal
 * @param {Boolean} config.closable - ẩn/hiện icon close(x)
 * @param {Boolean} config.maskClosable - Cho phép click vào "mask" để tắt modal
 * @param {Boolean} config.escClosable- Sử dụng phím Esc để tắt modal
 * @example
 * import RTBanner from '@Src/Modules/Retentation/Containers/BannerSettings/RTBanner';
 * _Banner = new RTBanner({
            animation = 'popup', // popup | sideup
            mask = true,
            content = null,
            closable = true,
            maskClosable = true,
            escClosable = true
        });
 */

export default function RTBanner(config = {}) {
  const {
    animation = "popup", // popup | sideup
    mask = true,
    content = null,
    closable = true,
    maskClosable = true,
    escClosable = true,
    maxWidth = null,
    classContainer = "",
  } = config;

  this.mask = mask;
  this.maskClosable = maskClosable;
  this.escClosable = escClosable;
  this.animation = animation;
  this.content = content;
  this.closable = closable;
  this.maxWidth = maxWidth;
  this.classContainer = classContainer;

  this.init();
}

// prettier-ignore
RTBanner.prototype.init = function(callback) {
  const clsMask = this.mask ? 'rtbsn-mask' : '';
  const clsAnimation = this.animation ? this.animation : '';
  const clsClosable = this.closable ? '' : 'rtbsn-unclosable';
  const classContainer = this.classContainer ? '' : '';

  const el = `
      <div id="rtbsn" class="rtbsn-wrap ${clsClosable} ${clsMask} rtbsn-ani-${clsAnimation} ${classContainer}">
          <div class="rtbsn-container" style="max-width: ${this.maxWidth};">
              <div class="rtbsn-body">
                  <div class="rtbsn-close" data="rtbsn-close"><div class="rtbsn-close-icon">&times;</div></div>
                  <div class="rtbsn-main" id="rtbsn-main">${this.content}</div>
              </div>
          </div>
      </div>
  `;

  const elBody = document.querySelector('body');
  const elBanner = document.getElementById('rtbsn');
  if (elBanner) return;
  elBody.insertAdjacentHTML('beforeend', el);

  // init methods
  this.bindEventClose();
  this.bindEventKey();
  this.bindStatusTransition();

  callback && callback();
};

RTBanner.prototype.setContent = function (content = null, callback) {
  const elBanner = document.getElementById("rtbsn");
  if (!elBanner) this.init();
  const elMain = document.getElementById("rtbsn-main");
  if (!elMain) return;
  this.content = content;
  elMain.innerHTML = content;
  callback && callback();
};

RTBanner.prototype.update = function (config = {}, callback) {
  const elBanner = document.getElementById("rtbsn");
  if (!elBanner) this.init();
  const elMain = document.getElementById("rtbsn-main");
  if (!elMain) return;
  const keysRTBanner = Object.keys(this);
  Object.entries(config).forEach(([key, value]) => {
    if (keysRTBanner.includes(key)) {
      Object.assign(this, { [key]: value });
    }
  });

  elBanner.remove();
  this.init(function () {
    callback && callback();
  });
};

RTBanner.prototype.show = function () {
  document.querySelector("body").classList.add("rtbsn-active");
  const elBanner = document.getElementById("rtbsn");
  if (!elBanner) return;
  elBanner.classList.add("rtbsn-open");

  const elBajs = elBanner.querySelector(".bajs-body");
  const elContainer = elBanner.querySelector(".rtbsn-container");
  elContainer.style.width = elBajs ? "100%" : "initial";
};

RTBanner.prototype.hide = function () {
  const elBanner = document.getElementById("rtbsn");
  if (!elBanner) return;
  elBanner.classList.remove("rtbsn-open");
  document.querySelector("body").classList.remove("rtbsn-active");
};

RTBanner.prototype.bindStatusTransition = function () {
  const elBanner = document.getElementById("rtbsn");
  if (!elBanner) return;

  elBanner.addEventListener("transitionend", function () {
    const isBannerShow = elBanner.classList.contains("rtbsn-open");

    if (isBannerShow) {
      // show
    } else {
      // hided
    }
  });
};

RTBanner.prototype.bindEventClose = function () {
  const self = this;
  const elBanner = document.getElementById("rtbsn");
  if (!elBanner) return;

  // prettier-ignore
  window.addEventListener("click", function(e) {
      const el = e.target;
      const attrClose = el.getAttribute("data", "");
      const isMaskClosable = self.mask && self.maskClosable && !el.closest(".rtbsn-main")
      // const isMaskClosable = self.mask && self.maskClosable && el.classList && el.classList.contains("rtbsn-wrap")

      if (attrClose === "rtbsn-close" || isMaskClosable) {
          self.hide();
      }
  });
};

RTBanner.prototype.bindEventKey = function () {
  const self = this;
  const elBanner = document.getElementById("rtbsn");
  if (!elBanner) return;

  window.addEventListener("keyup", function (e) {
    switch (e.keyCode) {
      case 27:
        self.escClosable && self.hide();
        break;
    }
  });
};
