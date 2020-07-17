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

  this.app = undefined;
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
  const classContainer = this.classContainer ? this.classContainer : '';
  
  const el = `
    <div class="rtbsn-wrap ${clsClosable} ${clsMask} rtbsn-ani-${clsAnimation} ${classContainer}">
        <div class="rtbsn-container" style="max-width: ${this.maxWidth};">
            <div class="rtbsn-body">
                <div class="rtbsn-close" data="rtbsn-close"><div class="rtbsn-close-icon">&times;</div></div>
                <div class="rtbsn-main">${this.content}</div>
            </div>
        </div>
    </div>
  `;

  const div = document.createElement("div");
  div.classList.add('rtbns-modal');

  div.insertAdjacentHTML('beforeend', el);

  const elBody = document.querySelector('body');
  const elBanner = document.getElementById('rtbsn');
  if (elBanner) return;
  elBody.insertAdjacentElement('beforeend', div);
  this.app = div;

  // init methods
  this.bindEventClose();
  this.bindEventKey();
  this.bindStatusTransition();

  callback && callback();
};

RTBanner.prototype.setContent = function (content = null, callback) {
  if (!this.app) this.init();
  const elMain = this.app.querySelector(".rtbsn-main");
  if (!elMain) return;
  this.content = content;
  elMain.innerHTML = content;
  callback && callback();
};

RTBanner.prototype.update = function (config = {}, callback) {
  if (!this.app) this.init();
  const elMain = this.app.querySelector(".rtbsn-main");
  if (!elMain) return;
  const keysRTBanner = Object.keys(this);
  Object.entries(config).forEach(([key, value]) => {
    if (keysRTBanner.includes(key)) {
      Object.assign(this, { [key]: value });
    }
  });

  this.app.remove();
  this.init(function () {
    callback && callback();
  });
};

RTBanner.prototype.show = function () {
  document.querySelector("body").classList.add("rtbsn-active");
  const elBanner = this.app;
  if (!elBanner) return;
  elBanner.classList.add("rtbsn-open");

  const elBajs = elBanner.querySelector(".bajs-body");
  const elContainer = elBanner.querySelector(".rtbsn-container");
  elContainer.style.width = elBajs ? "100%" : "initial";
};

RTBanner.prototype.hide = function () {
  const elBanner = this.app;
  if (!elBanner) return;

  const elsModal = document.querySelectorAll(".rtbsn-open");
  if (elsModal.length === 1) {
    document.querySelector("body").classList.remove("rtbsn-active");
  }

  elBanner.classList.remove("rtbsn-open");
};

RTBanner.prototype.bindStatusTransition = function () {
  const elBanner = this.app;
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
  if (!this.app) return;

  const elsClose = this.app.querySelectorAll('[data="rtbsn-close"');
  [...elsClose].forEach((item) =>
    item.addEventListener("click", function () {
      self.hide();
    })
  );

  if (self.mask && self.maskClosable) {
    const mask = this.app.querySelector(".rtbsn-mask");
    if (mask) {
      this.app.addEventListener("click", function (e) {
        const el = e.target;
        const elMask = !el.closest(".rtbsn-main");
        elMask && self.hide();
        console.log(e.target);
      });
    }
  }
};

RTBanner.prototype.bindEventKey = function () {
  const self = this;
  if (!this.app) return;

  window.addEventListener("keyup", function (e) {
    switch (e.keyCode) {
      case 27:
        self.escClosable && self.hide();
        break;
    }
  });
};
