/* =====================================
   页面初始化 / Page Initialization
===================================== */
document.addEventListener("DOMContentLoaded", () => {
  drawIntakeChart();
  drawShelterStatsCharts();
  initScrollEffects();
  initRevealOnScroll();
  initHeroParallax();
});

/* =====================================
   Reveal on Scroll
===================================== */
function initRevealOnScroll() {

  const revealElements =
    document.querySelectorAll(".reveal-on-scroll");

  if (!revealElements.length) return;

  const observer = new IntersectionObserver(

    (entries) => {

      entries.forEach((entry) => {

        if (entry.isIntersecting) {
          entry.target.classList.add("active");
        } else {
          entry.target.classList.remove("active");
        }

      });

    },

    {
      threshold: 0.2
    }
  );

  revealElements.forEach((el) => observer.observe(el));
}

/* =====================================
   Hero Mouse Parallax
===================================== */
function initHeroParallax() {

  if (window.innerWidth <= 768) return;

  const scene =
    document.querySelector(".parallax-scene");

  const layers =
    document.querySelectorAll(
      ".parallax-layer, .parallax-dog"
    );

  if (!scene || !layers.length) return;

  let currentX = 0;
  let currentY = 0;

  let targetX = 0;
  let targetY = 0;

  function updateParallax() {

    currentX += (targetX - currentX) * 0.08;
    currentY += (targetY - currentY) * 0.08;

    layers.forEach((layer) => {

      const speed =
        Number(layer.dataset.speed || 10);

      const moveX = currentX / speed;
      const moveY = currentY / speed;

      if (
        layer.classList.contains("parallax-dog")
      ) {

        layer.style.transform =
          `translate(${moveX}px, ${-10 + moveY}px)`;

      } else {

        layer.style.transform =
          `translate(${moveX}px, ${moveY}px)`;

      }

    });

    requestAnimationFrame(updateParallax);
  }

  scene.addEventListener("mousemove", (e) => {

    const rect =
      scene.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    targetX =
      (x - rect.width / 2) / 8;

    targetY =
      (y - rect.height / 2) / 8;

  });

  scene.addEventListener("mouseleave", () => {

    targetX = 0;
    targetY = 0;

  });

  updateParallax();
}

/* =====================================
   Intake Chart
===================================== */
function drawIntakeChart() {

  const canvas =
    document.getElementById("intakeChart");

  if (!canvas || typeof Chart === "undefined") return;

  new Chart(canvas, {

    type: "line",

    data: {

      labels: [
        "JAN", "FEB", "MAR", "APR",
        "MAY", "JUN", "JUL", "AUG",
        "SEPT", "OCT", "NOV", "DEC"
      ],

      datasets: [
        {

          label: "2019",

          data: [
            480000, 430000, 505000, 545000,
            635000, 632000, 618000, 615000,
            560000, 575000, 495000, 450000
          ],

          borderColor: "#1f8eea",

          backgroundColor:
            "rgba(31, 142, 234, 0.12)",

          pointBackgroundColor: "#1f8eea",

          pointBorderColor: "#ffffff",

          pointRadius: 4,

          pointHoverRadius: 6,

          borderWidth: 4,

          fill: true,

          tension: 0.35
        }
      ]
    },

    options: {

      responsive: true,

      plugins: {

        legend: {

          labels: {

            usePointStyle: false,

            boxWidth: 46,

            boxHeight: 4,

            padding: 24,

            font: {
              size: 14,
              family: "Inter"
            },

            color: "#555"
          }
        }
      },

      scales: {

        y: {

          beginAtZero: false,

          ticks: {

            callback: function(value) {
              return value / 1000 + "k";
            }

          },

          grid: {
            color: "rgba(0,0,0,0.05)"
          }
        },

        x: {

          grid: {
            display: false
          }
        }
      }
    }
  });
}

/* =====================================
   Shelter Statistics Charts
===================================== */
function drawShelterStatsCharts() {

  const outcomeCanvas =
    document.getElementById(
      "animalOutcomeChart"
    );

  const rateCanvas =
    document.getElementById(
      "euthanasiaRateChart"
    );

  if (
    !outcomeCanvas ||
    !rateCanvas ||
    typeof Chart === "undefined"
  ) return;

  /* Dogs vs Cats */
  new Chart(outcomeCanvas, {

    type: "bar",

    data: {

      labels: [
        "Adopted",
        "Returned",
        "Euthanized",
        "Transferred"
      ],

      datasets: [

        {
          label: "Dogs",

          data: [
            2000000,
            554000,
            334000,
            524000
          ],

          backgroundColor: "#1f8eea",

          borderRadius: 12
        },

        {
          label: "Cats",

          data: [
            2200000,
            362000,
            273000,
            369000
          ],

          backgroundColor: "#f6d66b",

          borderRadius: 12
        }
      ]
    },

    options: {

      responsive: true,

      plugins: {

        title: {

          display: true,

          text:
            "2024 Shelter Outcomes: Dogs vs Cats",

          font: {
            size: 20,
            family: "Fredoka"
          },

          padding: {
            bottom: 18
          }
        },

        legend: {

          position: "top",

          labels: {

            font: {
              size: 14,
              family: "Inter"
            }
          }
        },

        tooltip: {

          callbacks: {

            label: function(context) {

              return (
                context.dataset.label +
                ": " +
                context.raw.toLocaleString()
              );

            }
          }
        }
      },

      scales: {

        y: {

          beginAtZero: true,

          ticks: {

            callback: function(value) {
              return value / 1000000 + "M";
            }
          },

          grid: {
            color: "rgba(0,0,0,0.05)"
          }
        },

        x: {

          grid: {
            display: false
          }
        }
      }
    }
  });

  /* Euthanasia Rate */
  new Chart(rateCanvas, {

    type: "polarArea",

    data: {

      labels: [
        "2019 • 13%",
        "2024 • 8%"
      ],

      datasets: [
        {

          data: [13, 8],

          backgroundColor: [
            "rgba(246, 214, 107, 0.88)",
            "rgba(76, 175, 80, 0.82)"
          ],

          borderWidth: 0
        }
      ]
    },

    options: {

      responsive: true,

      plugins: {

        title: {

          display: true,

          text:
            "Shelter Euthanasia Rates Improved",

          font: {
            size: 20,
            family: "Fredoka"
          },

          padding: {
            bottom: 20
          }
        },

        legend: {

          position: "bottom",

          labels: {

            padding: 20,

            font: {
              size: 15,
              family: "Inter"
            }
          }
        },

        tooltip: {

          callbacks: {

            label: function(context) {
              return context.label;
            }

          }
        }
      },

      scales: {

        r: {

          ticks: {
            display: false
          },

          grid: {
            color:
              "rgba(0,0,0,0.06)"
          }
        }
      }
    }
  });
}

/* =====================================
   Scroll Fade Effect
===================================== */
function initScrollEffects() {

  const chartSection =
    document.querySelector(".chart-section");

  if (!chartSection) return;

  function updateChartFade() {

    const rect =
      chartSection.getBoundingClientRect();

    const windowHeight =
      window.innerHeight;

    const fadeStart =
      windowHeight * 0.2;

    const fadeDistance = 300;

    let opacity = 1;
    let translateY = 0;

    if (rect.top < fadeStart) {

      const progress = Math.min(
        (fadeStart - rect.top) / fadeDistance,
        1
      );

      opacity =
        1 - progress * 0.8;

      translateY =
        progress * 25;
    }

    chartSection.style.opacity =
      opacity;

    chartSection.style.transform =
      `translateY(${translateY}px)`;
  }

  window.addEventListener(
    "scroll",
    updateChartFade
  );

  updateChartFade();
}