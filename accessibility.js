document.addEventListener('DOMContentLoaded', function () {
  const panel = document.createElement('div');
  panel.id = 'accessibility-panel';
  panel.innerHTML = `
    <button id="acc-toggle" title="תפריט נגישות">♿</button>
    <div id="acc-menu">
      <button data-action="increase">הגדל טקסט</button>
      <button data-action="decrease">הקטן טקסט</button>
      <button data-action="contrast">ניגודיות גבוהה</button>
      <button data-action="links">הדגש קישורים</button>
      <button data-action="reset">אפס</button>
    </div>
  `;
  document.body.appendChild(panel);

  const menu = document.getElementById('acc-menu');
  const toggle = document.getElementById('acc-toggle');
  let contrast = false, links = false, fontSize = 100;

  toggle.onclick = () => menu.classList.toggle('open');

  menu.addEventListener('click', e => {
    const action = e.target.dataset.action;
    if (!action) return;

    switch (action) {
      case 'increase':
        fontSize += 10;
        document.body.style.fontSize = fontSize + '%';
        break;
      case 'decrease':
        fontSize = Math.max(80, fontSize - 10);
        document.body.style.fontSize = fontSize + '%';
        break;
      case 'contrast':
        contrast = !contrast;
        document.body.classList.toggle('high-contrast', contrast);
        break;
      case 'links':
        links = !links;
        document.body.classList.toggle('highlight-links', links);
        break;
      case 'reset':
        contrast = false; links = false; fontSize = 100;
        document.body.classList.remove('high-contrast', 'highlight-links');
        document.body.style.fontSize = '100%';
        break;
    }
  });
});
