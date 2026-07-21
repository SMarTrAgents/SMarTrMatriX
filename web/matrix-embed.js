/*!
 * SMarTrMatriX — smartragents.ai matrix rain, Embed-Version für beliebige Webseiten.
 * SMarTrAgents.ai by ₳K₳ŦØŇǤƗɆ with Fable 5 (Anthropic). MIT license.
 * Kein Framework, keine Abhängigkeiten. Einbau siehe EINBAU.md.
 *
 * Minimal:
 *   <div id="matrix"></div>
 *   <script src="matrix-embed.js"></script>
 *   <script>SmartrMatrix.mount('#matrix');</script>
 *
 * Optionen (alle optional):
 *   SmartrMatrix.mount('#matrix', {
 *     glitchTexts: ['smartragents.ai', '₳K₳ŦØŇǤƗɆ'], // Cyan-Glitches (≥1 s sichtbar)
 *     glitchLink: 'https://www.smartragents.ai',       // Klick auf Glitch/QR → dieses Ziel
 *     glitchFullscreen: true,                          // vor der Navigation Vollbild anfordern
 *     clickFullscreen: true,                           // Klick neben Glitch/QR = Vollbild-Toggle
 *     qrImage: 'https://www.smartragents.ai/qr/homepage-matrix.png', // false = QR-Einblendung aus
 *     qrEveryMs: 60000,                                // QR einmal pro Minute …
 *     qrVisibleMs: 10000,                              // … für 10 s, …
 *     rabbitVisibleMs: 6000,                           // … Hase sitzt die ersten 6 s daneben
 *     fontSize: 18,
 *   });
 */
(function (global) {
  'use strict';

  var CHARS = ('ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ' +
    'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$+-*/=%"\'#&_(),.;:?!\\|{}<>[]^~').split('');
  var GREEN_SHADES = ['#0b7a0b', '#15b515', '#2aff2a'];
  var DEFAULTS = {
    glitchTexts: ['smartragents.ai', '₳K₳ŦØŇǤƗɆ'],
    glitchLink: 'https://www.smartragents.ai',
    glitchFullscreen: true,
    clickFullscreen: true,
    fontSize: 18,
    frameMs: 75,
    maxAgents: 3,
    refreshMs: 4 * 60 * 1000,
    glitchChance: 0.012,
    glitchFramesMin: 22, // × 75 ms ≈ 1,65 s — Vorgabe: mindestens 1 s
    qrImage: 'https://www.smartragents.ai/qr/homepage-matrix.png',
    qrEveryMs: 60 * 1000,
    qrVisibleMs: 10 * 1000,
    rabbitVisibleMs: 6 * 1000,
    qrFirstDelayMs: 10 * 1000,
  };
  var RABBIT_LINES = ['(\\_/)', '(o.o)', '(> <)'];

  function mount(target, options) {
    var host = typeof target === 'string' ? document.querySelector(target) : target;
    if (!host) throw new Error('SmartrMatrix: Ziel-Element nicht gefunden: ' + target);
    var opts = Object.assign({}, DEFAULTS, options || {});

    var canvas = document.createElement('canvas');
    canvas.style.cssText = 'display:block;width:100%;height:100%;background:#000;';
    if (!host.style.position) host.style.position = 'relative';
    host.appendChild(canvas);
    var ctx = canvas.getContext('2d');

    var FS = opts.fontSize;
    var width, height, cols, rows, drops, tails, shade, agents, glitch, qr;
    var nextQrAt = performance.now() + opts.qrFirstDelayMs;
    var qrImg = null, qrReady = false;
    if (opts.qrImage) {
      qrImg = new Image();
      qrImg.onload = function () { qrReady = true; };
      qrImg.src = opts.qrImage;
    }

    function setFont() {
      ctx.font = FS + 'px "Courier New", monospace';
      ctx.textBaseline = 'top';
    }

    function init() {
      width = canvas.width = host.clientWidth;
      height = canvas.height = host.clientHeight;
      cols = Math.max(1, Math.floor(width / FS));
      rows = Math.max(1, Math.floor(height / FS));
      drops = []; tails = []; shade = []; agents = []; glitch = null; qr = null;
      for (var i = 0; i < cols; i++) {
        drops[i] = Math.floor(Math.random() * -rows);
        tails[i] = 10 + Math.floor(Math.random() * 20);
        shade[i] = GREEN_SHADES[Math.floor(Math.random() * GREEN_SHADES.length)];
      }
      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, width, height);
      setFont();
    }

    function cell(c, r, ch, color) {
      ctx.fillStyle = '#000';
      ctx.fillRect(c * FS, r * FS, FS, FS);
      ctx.fillStyle = color;
      ctx.fillText(ch, c * FS, r * FS);
    }

    function draw() {
      for (var i = 0; i < cols; i++) {
        var y = drops[i];
        var isAgent = agents.indexOf(i) !== -1;
        if (y >= 0 && y < rows) {
          cell(i, y, CHARS[(Math.random() * CHARS.length) | 0], isAgent ? '#ff4545' : '#f5fff5');
        }
        if (y - 1 >= 0 && y - 1 < rows) {
          cell(i, y - 1, CHARS[(Math.random() * CHARS.length) | 0], isAgent ? '#a31212' : shade[i]);
        }
        var tailY = y - tails[i];
        if (tailY >= 0 && tailY < rows) {
          ctx.fillStyle = '#000';
          ctx.fillRect(i * FS, tailY * FS, FS, FS);
        }
        if (y > rows + tails[i] && Math.random() > 0.95) {
          drops[i] = 0;
          tails[i] = 10 + Math.floor(Math.random() * 20);
          shade[i] = GREEN_SHADES[(Math.random() * GREEN_SHADES.length) | 0];
          if (isAgent) agents = agents.filter(function (a) { return a !== i; });
        } else {
          drops[i]++;
        }
      }

      if (!glitch && Math.random() < opts.glitchChance && opts.glitchTexts.length) {
        var text = opts.glitchTexts[(Math.random() * opts.glitchTexts.length) | 0];
        var textW = ctx.measureText(text).width;
        if (width >= textW + 2 * FS) {
          var maxCol = Math.floor((width - textW) / FS) - 1;
          var col = 1 + ((Math.random() * Math.max(1, maxCol)) | 0);
          var row = 1 + ((Math.random() * Math.max(1, rows - 3)) | 0);
          glitch = {
            text: text, row: row, col: col,
            framesLeft: opts.glitchFramesMin + ((Math.random() * 10) | 0),
            rect: { x: col * FS - 6, y: row * FS - 6, w: textW + 12, h: FS + 12 },
          };
        }
      }
      if (agents.length < opts.maxAgents && Math.random() < 0.01) {
        var c = (Math.random() * cols) | 0;
        if (agents.indexOf(c) === -1) agents.push(c);
      }

      if (glitch) {
        ctx.fillStyle = '#000';
        ctx.fillRect(glitch.rect.x, glitch.rect.y, glitch.rect.w, glitch.rect.h);
        ctx.fillStyle = '#00e5ff';
        ctx.fillText(glitch.text, glitch.col * FS, glitch.row * FS);
        if (--glitch.framesLeft <= 0) {
          ctx.fillStyle = '#000';
          ctx.fillRect(glitch.rect.x, glitch.rect.y, glitch.rect.w, glitch.rect.h);
          glitch = null;
        }
      }

      drawQr();
    }

    function rabbitPos(q) {
      return {
        x: q.rabbitLeft ? q.rect.x - 6 * FS - 8 : q.rect.x + q.rect.w + 8,
        y: q.y + ((q.size / 2) | 0) - (((RABBIT_LINES.length * FS) / 2) | 0),
      };
    }

    function drawQr() {
      if (!qrImg) return;
      var now = performance.now();
      if (!qr) {
        if (now >= nextQrAt && qrReady) {
          var size = Math.min(10 * FS, (Math.min(width, height) * 0.4) | 0);
          var rabbitW = 7 * FS, pad = 8;
          if (width < size + rabbitW + 4 * FS || height < size + 4 * FS) { nextQrAt = now + opts.qrEveryMs; return; }
          var x = FS + ((Math.random() * (width - size - rabbitW - 3 * FS)) | 0);
          var y = FS + ((Math.random() * (height - size - 2 * FS)) | 0);
          qr = {
            x: x, y: y, size: size,
            until: now + opts.qrVisibleMs,
            rabbitUntil: now + opts.rabbitVisibleMs,
            rabbitErased: false,
            rabbitLeft: x + size + pad + rabbitW > width,
            rect: { x: x - pad, y: y - pad, w: size + 2 * pad, h: size + 2 * pad },
          };
          nextQrAt = now + opts.qrEveryMs;
        }
        return;
      }
      if (now > qr.until) {
        ctx.fillStyle = '#000';
        ctx.fillRect(qr.rect.x - 8 * FS, qr.rect.y, qr.rect.w + 16 * FS, qr.rect.h);
        qr = null;
        return;
      }
      ctx.fillStyle = '#000';
      ctx.fillRect(qr.rect.x, qr.rect.y, qr.rect.w, qr.rect.h);
      ctx.drawImage(qrImg, qr.x, qr.y, qr.size, qr.size);
      ctx.strokeStyle = 'rgba(42,255,42,0.4)';
      ctx.strokeRect(qr.rect.x + 0.5, qr.rect.y + 0.5, qr.rect.w - 1, qr.rect.h - 1);
      var rp = rabbitPos(qr);
      if (now < qr.rabbitUntil) {
        ctx.fillStyle = '#000';
        ctx.fillRect(rp.x - 4, rp.y - 4, 6 * FS, RABBIT_LINES.length * FS + 8);
        ctx.fillStyle = '#f5fff5';
        for (var li = 0; li < RABBIT_LINES.length; li++) {
          ctx.fillText(RABBIT_LINES[li], rp.x, rp.y + li * FS);
        }
      } else if (!qr.rabbitErased) {
        ctx.fillStyle = '#000';
        ctx.fillRect(rp.x - 4, rp.y - 4, 6 * FS, RABBIT_LINES.length * FS + 8);
        qr.rabbitErased = true;
      }
    }

    function hitTarget(e) {
      var r = canvas.getBoundingClientRect();
      var x = e.clientX - r.left, y = e.clientY - r.top;
      function inRect(rc) {
        return x >= rc.x && x <= rc.x + rc.w && y >= rc.y && y <= rc.y + rc.h;
      }
      if (glitch && inRect(glitch.rect)) return true;
      if (qr && inRect(qr.rect)) return true;
      return false;
    }

    function requestFs() {
      var el = document.documentElement;
      if (el.requestFullscreen) el.requestFullscreen({ navigationUI: 'hide' }).catch(function () {});
    }

    canvas.addEventListener('click', function (e) {
      if (hitTarget(e)) {
        if (opts.glitchFullscreen) requestFs();
        if (opts.glitchLink) window.location.href = opts.glitchLink;
        return;
      }
      if (!opts.clickFullscreen) return;
      if (document.fullscreenElement) {
        if (document.exitFullscreen) document.exitFullscreen().catch(function () {});
      } else {
        requestFs();
      }
    });
    canvas.addEventListener('mousemove', function (e) {
      canvas.style.cursor = hitTarget(e) ? 'pointer' : 'default';
    });

    init();
    var interval = setInterval(draw, opts.frameMs);
    var loopTimer = setInterval(init, opts.refreshMs);
    window.addEventListener('resize', init);

    return {
      destroy: function () {
        clearInterval(interval);
        clearInterval(loopTimer);
        window.removeEventListener('resize', init);
        canvas.remove();
      },
    };
  }

  global.SmartrMatrix = { mount: mount };
})(window);
