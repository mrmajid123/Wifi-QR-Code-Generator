document.addEventListener('DOMContentLoaded', () => {
    const ssidInput = document.getElementById('ssid');
    const passwordInput = document.getElementById('password');
    const securitySelect = document.getElementById('security');
    const generateBtn = document.getElementById('generate-btn');
    const qrCodeContainer = document.getElementById('qrcode');
    const downloadBtn = document.getElementById('download-btn');

    let qrCodeInstance = null; // To hold the QRCode.js instance

    generateBtn.addEventListener('click', () => {
        const ssid = ssidInput.value.trim();
        const password = passwordInput.value;
        const security = securitySelect.value;

        // Basic validation
        if (!ssid) {
            alert("Wi-Fi Name (SSID) cannot be empty!");
            return;
        }

        // Clear previous QR code
        qrCodeContainer.innerHTML = '';
        downloadBtn.style.display = 'none';

        // Format the Wi-Fi connection string
        // Note: Special characters like ;,",\,$ need to be escaped with a backslash.
        const escapedSsid = ssid.replace(/([;,"\\])/g, '\\$1');
        const escapedPassword = password.replace(/([;,"\\])/g, '\\$1');
        
        let qrString = '';
        if (security === 'nopass') {
            qrString = `WIFI:T:nopass;S:${escapedSsid};;`;
        } else {
            qrString = `WIFI:T:${security};S:${escapedSsid};P:${escapedPassword};;`;
        }

        // Generate new QR code
        qrCodeInstance = new QRCode(qrCodeContainer, {
            text: qrString,
            width: 256,
            height: 256,
            colorDark: "#000000",
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.H
        });
        
        // Show the download button
        setTimeout(prepareDownload, 100); // Delay to allow QR code rendering
    });

    function prepareDownload() {
        const qrCanvas = qrCodeContainer.querySelector('canvas');
        const qrImage = qrCodeContainer.querySelector('img');

        if (qrCanvas) {
            // If qrcode.js rendered a canvas, convert it to a data URL
            downloadBtn.href = qrCanvas.toDataURL('image/png');
        } else if (qrImage) {
            // If it rendered an image (fallback), use its src
            downloadBtn.href = qrImage.src;
        } else {
            return; // No QR code to download
        }

        downloadBtn.download = `wifi-qr-${ssidInput.value.trim()}.png`;
        downloadBtn.style.display = 'block';
    }
}); 