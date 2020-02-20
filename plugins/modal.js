Element.prototype.appendAfter = function (element) {
  element.parentNode.insertBefore(this, element.nextSibling);
};

function noop() {}

function _createModalFooter(buttons = []) {
  if (buttons.length === 0) return false;
  
  const wrap = document.createElement('div');
  wrap.classList.add('modal-footer');
  
  buttons.forEach(btn => {
    const $btn = document.createElement('button');
    $btn.textContent = btn.text;
    $btn.classList.add('btn');
    $btn.classList.add(`btn-${btn.type || 'secondary'}`);
    $btn.onclick = btn.handler || noop;
    
    wrap.append($btn);
  });
  
  return wrap;
}

function _createModal(options) {
  const modal = document.createElement('div');
  modal.classList.add('vmodal');
  modal.insertAdjacentHTML('afterbegin', `
  <div class="modal-overlay" data-close = "true">
      <div class="modal-window">
        <div class="modal-header">
          <span class="modal-title">${options.title || 'Modal'}</span>
          ${options.closable ? '<span class="modal-close" data-close = "true">&times;</span>' : ''}
        </div>
        <div class="modal-body" data-content>
          ${options.content || ''}
        </div>
      </div>
  </div>
  `);
  modal.style.width = options.width || '400px';
  const footer = _createModalFooter(options.footerButtons);
  footer.appendAfter(modal.querySelector("[data-content]"));
  document.body.append(modal);
  return modal;
}

$.modal = function (options) {
  const ANIMATION_SPEED = 200;
  const $modal = _createModal(options);
  let closing = false;
  
  const modal = {
    open() {
      !closing && $modal.classList.add('open');
    },
    close() {
      closing = true;
      $modal.classList.remove('open');
      $modal.classList.add('hide');
      setTimeout(() => {
        $modal.classList.remove('hide');
        closing = false;
      }, ANIMATION_SPEED);
    }
  };
  
  const listener = e => {
    if (e.target.dataset.close) {
      modal.close();
    }
  };
  
  $modal.addEventListener('click', listener);
  
  return Object.assign(modal, {
    destroy() {
      $modal.removeEventListener('click', listener);
      $modal.remove();
    },
    setContent(html) {
      $modal.querySelector('[data-content]').innerHTML = html;
    }
  })
};
