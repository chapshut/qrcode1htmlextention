document.addEventListener("DOMContentLoaded", () => {
    const qrCode = new QRCodeStyling({
        width: 280,
        height: 280,
        data: "https://example.com",
        margin: 10,
        qrOptions: { errorCorrectionLevel: "H" },
        dotsOptions: { type: "rounded", color: "#000000" },           // ZWARTE dots
        cornersSquareOptions: { type: "extra-rounded", color: "#0008ff" },
        cornersDotOptions: { type: "dot", color: "#0008ff" },
        backgroundOptions: { color: "#ffffff" }                        // Altijd wit
    });
    qrCode.append(document.getElementById("qrCanvas"));

    const toggle = document.getElementById("darkModeToggle");
    if (localStorage.getItem("darkMode") === "enabled") {
        document.body.classList.add("dark");
        toggle.checked = true;
    }

    const generate = () => {
        const text = document.getElementById("text").value.trim() || "https://example.com";
        const size = parseInt(document.getElementById("size").value);
        qrCode.update({ width: size, height: size, data: text });
    };

    toggle.addEventListener("change", () => {
        document.body.classList.toggle("dark");
        localStorage.setItem("darkMode", toggle.checked ? "enabled" : "disabled");
    });

    document.getElementById("generateBtn").addEventListener("click", generate);
    document.getElementById("downloadBtn").addEventListener("click", () => {
        qrCode.download({ name: "qr", extension: "png" });
    });

    generate();
});
