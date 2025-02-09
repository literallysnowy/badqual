document.addEventListener('DOMContentLoaded', () => {
  const svg = document.getElementById('visualizer');
  const barCount = 32;
  for (let i = 0; i < barCount; i++) {
    const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    rect.setAttribute("class", "vis-bar");
    rect.setAttribute("x", i * 10 + 1);
    rect.setAttribute("y", "150");
    rect.setAttribute("width", "8");
    rect.setAttribute("height", "0");
    svg.appendChild(rect);
  }
});

function updateVisualizer() {
  if (typeof analyser !== "undefined" && analyser instanceof AnalyserNode) {
    const freqData = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteFrequencyData(freqData);
    const bars = document.querySelectorAll('.vis-bar');
    bars.forEach((bar, index) => {
      const value = freqData[index];
      const barHeight = (value / 255) * 150;
      bar.setAttribute("height", barHeight);
      bar.setAttribute("y", 150 - barHeight);
    });
  }
  requestAnimationFrame(updateVisualizer);
}

updateVisualizer();