<script>
const wrapper = document.querySelector('.testimonials-wrapper');
let isDown = false;
let startX;
let scrollLeft;

// 🖱 Mouse drag
wrapper.addEventListener('mousedown', e => {
  isDown = true;
  wrapper.classList.add('dragging');
  startX = e.pageX - wrapper.offsetLeft;
  scrollLeft = wrapper.scrollLeft;
});

wrapper.addEventListener('mouseleave', () => {
  isDown = false;
  wrapper.classList.remove('dragging');
});

wrapper.addEventListener('mouseup', () => {
  isDown = false;
  wrapper.classList.remove('dragging');
});

wrapper.addEventListener('mousemove', e => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - wrapper.offsetLeft;
  const walk = (x - startX) * 1.5;
  wrapper.scrollLeft = scrollLeft - walk;
});

// 📱 Touch drag (for mobile)
let startTouchX = 0;
let scrollStart = 0;

wrapper.addEventListener('touchstart', e => {
  wrapper.classList.add('dragging');
  startTouchX = e.touches[0].pageX;
  scrollStart = wrapper.scrollLeft;
}, { passive: true });

wrapper.addEventListener('touchmove', e => {
  const x = e.touches[0].pageX;
  const walk = (x - startTouchX) * 1.5;
  wrapper.scrollLeft = scrollStart - walk;
}, { passive: true });

wrapper.addEventListener('touchend', () => {
  wrapper.classList.remove('dragging');
});
</script>
