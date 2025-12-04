document.addEventListener("DOMContentLoaded", () => {
    // Kleurenpallet van jouw wallpaper
    const neonColors = [
        "#e879f9", // neon paars
        "#f778ba", // roze
        "#ff7ac6", // fel roze
        "#ffa8e1", // zacht roze
        "#ff9e5c", // oranje
        "#ffd17a", // zacht oranje
        "#c084fc", // lila
        "#a78bff"  // violet
    ];

    const qrCode = new QRCodeStyling({
        width: 300,
        height: 300,
        data: "https://example.com",
        margin: 10,
        qrOptions: { typeNumber: 0, mode: undefined, errorCorrectionLevel: "H" }, // H = beste foutcorrectie voor kleuren
        dotsOptions: { type: "rounded" },
        cornersSquareOptions: { type: "extra-rounded" },
        cornersDotOptions: { type: "dot" },
        backgroundOptions: { color: "#0d0a1a" }
    });

    const canvasContainer = document.getElementById("qrCanvas");
    qrCode.append(canvasContainer);

    const darkModeToggle = document.getElementById("darkModeToggle");

    if (localStorage.getItem("darkMode") === "enabled") {
        document.body.classList.add("dark");
        darkModeToggle.checked = true;
    }

    const generateQR = () => {
        const text = document.getElementById("text").value.trim();
        const size = parseInt(document.getElementById("size").value, 10);
        const isDark = document.body.classList.contains("dark");

        if (!text) {
            alert("Please enter some text!");
            return;
        }

        if (isDark) {
            // KLEURRIJK IN DARK MODE
            qrCode.update({
                width: size,
                height: size,
                data: text,
                qrOptions: { errorCorrectionLevel: "H" },
                dotsOptions: {
                    type: "rounded",
                    color: neonColors[Math.floor(Math.random() * neonColors.length)]
                },
                cornersSquareOptions: { color: "#e879f9" },
                cornersDotOptions: { color: "#ff7ac6" },
                backgroundOptions: { color: "#0d0a1a" },
                // BELANGRIJK: elke module een willekeurige kleur!
                imageOptions: { hideBackgroundDots: true },
                dotsOptionsHelper: {
                    colorType: { gradient: { type: "radial", rotation: 0, colorStops: [
                        { offset: 0, color: "#e879f9" },
                        { offset: 0.3, color: "#f778ba" },
                        { offset: 0.6, color: "#ff9e5c" },
                        { offset: 1, color: "#a78bff" }
                    ]}}
                }
            });
        } else {
            // Klassiek zwart-wit in light mode
            qrCode.update({
                width: size,
                height: size,
                data: text,
                dotsOptions: { color: "#000000" },
                cornersSquareOptions: { color: "#000000" },
                cornersDotOptions: { color: "#000000" },
                backgroundOptions: { color: "#ffffff" }
            });
        }
    };

    darkModeToggle.addEventListener("change", () => {
        if (darkModeToggle.checked) {
            document.body.classList.add("dark");
            localStorage.setItem("darkMode", "enabled");
        } else {
            document.body.classList.remove("dark");
            localStorage.setItem("darkMode", "disabled");
        }
        generateQR();
    });

    document.getElementById("generateBtn").addEventListener("click", generateQR);
    document.getElementById("downloadBtn").addEventListener("click", () => {
        qrCode.download({ name: "qrcode-color", extension: "png" });
    });

    generateQR();
});
