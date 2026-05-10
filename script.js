document.addEventListener("DOMContentLoaded", () => {

    /* ===== BURGER MENU ===== */
    const menuIcon = document.querySelector("#menu-icon");
    const navbar = document.querySelector("nav");

    if (menuIcon && navbar) {

        menuIcon.addEventListener("click", (e) => {
            e.stopPropagation();
            navbar.classList.toggle("active");
        });

        document.addEventListener("click", (e) => {

            if (
                !navbar.contains(e.target) &&
                !menuIcon.contains(e.target)
            ) {
                navbar.classList.remove("active");
            }

        });

    }

    /* ===== ACTIVE NAVBAR ===== */
    const currentPage =
    window.location.pathname.split("/").pop();

    document.querySelectorAll(".navbar a").forEach(link => {

        const linkPage = link.getAttribute("href");

        if (linkPage === currentPage) {
            link.classList.add("active");
        }

    });

    /* ===== LIGHTBOX ===== */
    const images =
    document.querySelectorAll(".gallery-card img");

    const lightbox =
    document.getElementById("lightbox");

    const lightboxImg =
    document.getElementById("lightbox-img");

    const closeBtn =
    document.querySelector(".lightbox .close");

    const nextBtn =
    document.querySelector(".lightbox .next");

    const prevBtn =
    document.querySelector(".lightbox .prev");

    if (
        images.length &&
        lightbox &&
        lightboxImg &&
        closeBtn &&
        nextBtn &&
        prevBtn
    ) {

        let currentIndex = 0;
        let scale = 1;

        /* OPEN */
        images.forEach((img, index) => {

            img.addEventListener("click", () => {

                currentIndex = index;
                openLightbox();

            });

        });

        function openLightbox() {

            lightbox.classList.add("active");

            lightboxImg.src =
            images[currentIndex].src;

            scale = 1;

            lightboxImg.style.transform =
            `scale(${scale})`;

        }

        /* CLOSE */
        closeBtn.addEventListener("click", () => {

            lightbox.classList.remove("active");

        });

        /* NEXT */
        nextBtn.addEventListener("click", () => {

            currentIndex =
            (currentIndex + 1) % images.length;

            openLightbox();

        });

        /* PREV */
        prevBtn.addEventListener("click", () => {

            currentIndex =
            (currentIndex - 1 + images.length)
            % images.length;

            openLightbox();

        });

        /* CLICK BACKGROUND */
        lightbox.addEventListener("click", (e) => {

            if (e.target === lightbox) {
                lightbox.classList.remove("active");
            }

        });

        /* ESC CLOSE */
        document.addEventListener("keydown", (e) => {

            if (e.key === "Escape") {
                lightbox.classList.remove("active");
            }

        });

        /* ZOOM */
        lightboxImg.addEventListener("wheel", (e) => {

            e.preventDefault();

            scale += e.deltaY * -0.001;

            scale =
            Math.min(Math.max(1, scale), 3);

            lightboxImg.style.transform =
            `scale(${scale})`;

        });

        /* SWIPE MOBILE */
        let startX = 0;

        lightboxImg.addEventListener(
            "touchstart",
            (e) => {

                startX =
                e.touches[0].clientX;

            }
        );

        lightboxImg.addEventListener(
            "touchend",
            (e) => {

                let endX =
                e.changedTouches[0].clientX;

                if (startX - endX > 50) {
                    nextBtn.click();
                }

                if (endX - startX > 50) {
                    prevBtn.click();
                }

            }
        );

    }

    /* ===== PAGE TRANSITION ===== */
    document.querySelectorAll("a").forEach(link => {

        if (
            link.hostname ===
            window.location.hostname
        ) {

            link.addEventListener("click", e => {

                const href =
                link.getAttribute("href");

                if (
                    !href ||
                    href.startsWith("#")
                ) return;

                e.preventDefault();

                document.body.classList.add(
                    "fade-out"
                );

                setTimeout(() => {

                    window.location.href = href;

                }, 400);

            });

        }

    });

});

/* ===== CONTACT WHATSAPP ===== */
function sendWhatsApp() {

    const name =
    document.getElementById("name").value;

    const email =
    document.getElementById("email").value;

    const message =
    document.getElementById("message").value;

    const text =
`Nama: ${name}
Email: ${email}
Pesan: ${message}`;

    const url =
    "https://wa.me/6282198118274?text=" +
    encodeURIComponent(text);

    window.open(url, "_blank");

}