
const translations = {
    ar: {
        title: 'مولد رمز QR',
        placeholder: 'أدخل رابط هنا',
        button: 'إنشاء رمز QR',
        error: 'الرجاء إدخال رابط'
    },
    en: {
        title: 'QR Code Generator',
        placeholder: 'Enter URL here',
        button: 'Generate QR Code',
        error: 'Please enter a URL'
    },
    fr: {
        title: 'Générateur de Code QR',
        placeholder: 'Entrez l\'URL ici',
        button: 'Générer le Code QR',
        error: 'Veuillez entrer une URL'
    }
};

function changeLanguage(lang) {
    document.documentElement.setAttribute('lang', lang);
    document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
    
    document.getElementById('title').textContent = translations[lang].title;
    document.getElementById('imageUrl').placeholder = translations[lang].placeholder;
    document.getElementById('generateBtn').textContent = translations[lang].button;
}

async function generateQR() {
    const imageUrl = document.getElementById('imageUrl').value;
    const currentLang = document.documentElement.getAttribute('lang') || 'ar';
    
    if (!imageUrl) {
        alert(translations[currentLang].error);
        return;
    }

    try {
        const response = await fetch('/generate-qr', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ url: imageUrl })
        });

        const data = await response.json();
        const qrImage = document.getElementById('qrImage');
        qrImage.src = `data:image/png;base64,${data.qr_code}`;
        qrImage.style.display = 'block';
    } catch (error) {
        alert(translations[currentLang].error);
        console.error(error);
    }
}
