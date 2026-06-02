// Cursor
const cursor = document.getElementById('cursor');
const follower = document.getElementById('follower');
let mx = 0, my = 0, fx = 0, fy = 0;
document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
function animateCursor() {
  cursor.style.transform = `translate(${mx - 6}px, ${my - 6}px)`;
  fx += (mx - fx) * 0.12; fy += (my - fy) * 0.12;
  follower.style.transform = `translate(${fx - 18}px, ${fy - 18}px)`;
  requestAnimationFrame(animateCursor);
}
animateCursor();
document.querySelectorAll('a, button').forEach(el => {
  el.addEventListener('mouseenter', () => { cursor.style.transform += ' scale(1.6)'; follower.style.opacity = '0.15'; });
  el.addEventListener('mouseleave', () => { cursor.style.transform = cursor.style.transform.replace(' scale(1.6)', ''); follower.style.opacity = '0.4'; });
});

// Intersection Observer for fade-in
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.12 });
document.querySelectorAll('.fade-in').forEach(el => obs.observe(el));

// Stagger children on fade-in
document.querySelectorAll('.fade-in').forEach((el, i) => {
  el.style.transitionDelay = (i % 3) * 0.08 + 's';
});
