document.addEventListener("DOMContentLoaded", () => {
  const image = document.getElementById("boot-image");
  const text  = document.getElementById("boot-text");
  const sound = document.getElementById("startupSound");
  const bar   = document.getElementById("config-bar");
  const label = document.getElementById("config-label");

  if (!image || !text || !sound || !bar || !label) {
    console.error("Boot elements missing — check your HTML IDs.");
    return;
  }

  // Play startup sound, fall back to next user interaction if blocked
  const tryPlay = () => sound.play().catch(() => {
    document.addEventListener("click", () => sound.play(), { once: true });
  });
  tryPlay();

  // Fade everything in after 2s using double rAF to guarantee a paint cycle
  setTimeout(() => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        image.style.opacity = "1";
        text.style.opacity  = "1";
        bar.style.opacity   = "1";
        label.style.opacity = "1";
      });
    });

    // Hold for 9s then fade out
    setTimeout(() => {
      image.style.opacity = "0";
      text.style.opacity  = "0";
      bar.style.opacity   = "0";
      label.style.opacity = "0";

      // Redirect after fade-out transition completes (2s)
      setTimeout(() => {
        window.location.href = "lockscreenv2.html";
      }, 2000);

    }, 9000);
  }, 2000);
});
