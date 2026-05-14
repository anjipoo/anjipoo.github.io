// ============================================
// ASCII.JS — Image to ASCII Art Converter
// Pure browser JS, canvas-based
// ============================================

(function () {
  'use strict';

  const ASCII_CHARS_DENSE  = '@%#*+=-:. ';
  const ASCII_CHARS_SIMPLE = '@#S%?*+;:,. ';
  const ASCII_CHARS_BLOCKS = '█▓▒░ ';
  const ASCII_CHARS_HATCHING = 'Ñ@#W$9876543210?!abc;:+=-,._ ';

  let uploadedImage = null;

  const uploadZone  = document.getElementById('ascii-upload-zone');
  const fileInput   = document.getElementById('ascii-file-input');
  const widthRange  = document.getElementById('ascii-width');
  const widthVal    = document.getElementById('ascii-width-val');
  const charsetSel  = document.getElementById('ascii-charset');
  const invertCheck = document.getElementById('ascii-invert');
  const convertBtn  = document.getElementById('ascii-convert-btn');
  const outputDiv   = document.getElementById('ascii-output');
  const placeholder = document.getElementById('ascii-placeholder');
  const outputPre   = document.getElementById('ascii-pre');
  const copyBtn     = document.getElementById('ascii-copy-btn');
  const canvas      = document.getElementById('ascii-canvas');
  const ctx         = canvas ? canvas.getContext('2d') : null;

  if (!uploadZone || !canvas) return;

  // Width range display
  widthRange.addEventListener('input', () => {
    widthVal.textContent = widthRange.value;
  });

  // Drag & drop
  uploadZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadZone.classList.add('drag-over');
  });
  uploadZone.addEventListener('dragleave', () => uploadZone.classList.remove('drag-over'));
  uploadZone.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadZone.classList.remove('drag-over');
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) loadImage(file);
  });

  // File input
  fileInput.addEventListener('change', () => {
    if (fileInput.files[0]) loadImage(fileInput.files[0]);
  });

  function loadImage(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        uploadedImage = img;
        const name = file.name.length > 24 ? file.name.slice(0, 21) + '...' : file.name;
        uploadZone.querySelector('.upload-text').innerHTML =
          `<strong>${name}</strong> loaded`;
        uploadZone.querySelector('.upload-subtext').textContent = 'Ready to convert ↓';
        convertBtn.disabled = false;
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }

  convertBtn.addEventListener('click', () => {
    if (!uploadedImage) return;
    convertToASCII();
  });

  function getCharset() {
    const val = charsetSel.value;
    if (val === 'simple')   return ASCII_CHARS_SIMPLE;
    if (val === 'blocks')   return ASCII_CHARS_BLOCKS;
    if (val === 'hatching') return ASCII_CHARS_HATCHING;
    return ASCII_CHARS_DENSE;
  }

  function convertToASCII() {
    const cols = parseInt(widthRange.value);
    const charset = getCharset();
    const invert = invertCheck.checked;

    // Compute rows to maintain aspect ratio (chars are ~2x taller than wide)
    const aspect = uploadedImage.height / uploadedImage.width;
    const rows = Math.floor(cols * aspect * 0.45);

    canvas.width  = cols;
    canvas.height = rows;
    ctx.drawImage(uploadedImage, 0, 0, cols, rows);

    const imageData = ctx.getImageData(0, 0, cols, rows);
    const pixels = imageData.data;

    let asciiStr = '';
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const idx = (r * cols + c) * 4;
        const R = pixels[idx], G = pixels[idx+1], B = pixels[idx+2];
        // Luma-weighted grayscale
        const gray = (0.299 * R + 0.587 * G + 0.114 * B) / 255;
        const brightness = invert ? 1 - gray : gray;
        const charIdx = Math.floor(brightness * (charset.length - 1));
        asciiStr += charset[charIdx];
      }
      asciiStr += '\n';
    }

    // Display
    placeholder.style.display = 'none';
    outputPre.textContent = asciiStr;
    outputPre.style.display = 'block';
    copyBtn.style.display = 'block';
    outputDiv.scrollTop = 0;
  }

  copyBtn.addEventListener('click', () => {
    if (!outputPre.textContent) return;
    navigator.clipboard.writeText(outputPre.textContent).then(() => {
      copyBtn.textContent = 'copied!';
      setTimeout(() => { copyBtn.textContent = 'copy'; }, 1800);
    });
  });

})();
