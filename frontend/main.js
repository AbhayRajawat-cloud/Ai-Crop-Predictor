(function() {
  const yearSpan = document.getElementById('year');
  if (yearSpan) yearSpan.textContent = String(new Date().getFullYear());

  // Simple i18n dictionary
  const translations = {
    en: {
      'nav.home': 'Home',
      'nav.about': 'About Us',
      'nav.success': 'Success Stories',
      'nav.weather': 'Weather Report',
      'nav.getStarted': 'Get Started',
      'nav.login': 'Login',
      'home.title': 'Predict crop yields. Grow smarter.',
      'home.subtitle': 'AI-powered insights using historical data, weather, and soil health to boost productivity by 10%+.',
      'cta.getStarted': 'Get Started',
      'cta.learnMore': 'Learn More',
      'home.card1': 'Yield Prediction',
      'home.card2': 'Smart Irrigation',
      'home.card3': 'Soil Health',
      'home.card4': 'Weather Alerts',
      'home.featuresTitle': 'Platform Features',
      'features.yield': 'Accurate Yield Forecasts',
      'features.yieldDesc': 'Regression and neural models trained on open datasets tailor predictions to your crop and region.',
      'features.irrigation': 'Irrigation Optimization',
      'features.irrigationDesc': 'Daily watering plans using evapotranspiration and rainfall forecasts reduce water usage.',
      'features.fertilization': 'Fertilization Guidance',
      'features.fertilizationDesc': 'Soil metrics inform N-P-K schedules to maximize yield and minimize waste.',
      'features.pest': 'Pest & Disease Alerts',
      'features.pestDesc': 'Weather patterns and reported outbreaks trigger early warnings and mitigations.',
      'home.ctaBand': "Ready to boost your farm's productivity?",
      'cta.startFree': 'Start Free',
      'footer.tag': 'Data-driven farming for everyone.',
      'footer.company': 'Company',
      'footer.careers': 'Careers',
      'footer.contact': 'Contact',
      'footer.legal': 'Legal',
      'footer.privacy': 'Privacy Policy',
      'footer.terms': 'Terms of Service',
      'about.title': 'About AgriYield AI',
      'about.mission': 'Our mission is to empower small-scale farmers with AI-driven insights that increase productivity and sustainability.',
      'about.how': 'How it works',
      'about.point1': 'Ingest historical agricultural datasets and local records.',
      'about.point2': 'Combine real-time weather and soil metrics via APIs.',
      'about.point3': 'Predict yields and recommend irrigation, fertilization, and pest control.',
      'about.point4': 'Support for multiple regional languages for accessibility.',
      'about.values': 'Our values',
      'about.valuesDesc': 'Accessibility, data privacy, and measurable impact for farmers.',
      'success.title': 'Success Stories',
      'success.intro': 'Real farmers, real results. Here are a few stories from the field.',
      'success.s1.title': 'Rainfed wheat farm in Rajasthan',
      'success.s1.body': 'Using irrigation timing and fertilization guidance, yields increased by 14% in one season.',
      'success.s2.title': 'Rice paddy in West Bengal',
      'success.s2.body': 'Weather alerts reduced pest damage, saving 9% costs and improving quality.',
      'success.s3.title': 'Vegetable plot in Tamil Nadu',
      'success.s3.body': 'Soil-informed N-P-K plan boosted produce size and consistency across cycles.',
      'weather.title': 'Weather Report',
      'weather.subtitle': 'Enter your location to view forecasts tailored for your crops.',
      'weather.check': 'Check Weather',
      'weather.temp': 'Temperature',
      'weather.rain': 'Rainfall',
      'weather.humidity': 'Humidity',
      'weather.advice': 'Irrigation & Pest Advice',
      'login.title': 'Welcome back',
      'login.email': 'Email',
      'login.password': 'Password',
      'login.signIn': 'Sign In',
      'login.note': 'Use demo credentials in a prototype environment.',
      'get.title': 'Get Started',
      'get.step1': 'Create your account or sign in.',
      'get.step2': 'Add your farm location and crops.',
      'get.step3': 'Connect weather and soil data sources.',
      'get.step4': 'View yield predictions and recommendations.',
      'get.cta': 'Continue'
    },
    hi: {
      'nav.home': 'मुखपृष्ठ',
      'nav.about': 'हमारे बारे में',
      'nav.success': 'सफलता की कहानियाँ',
      'nav.weather': 'मौसम रिपोर्ट',
      'nav.getStarted': 'शुरू करें',
      'nav.login': 'लॉगिन',
      'home.title': 'फसल उत्पादन का पूर्वानुमान। समझदारी से खेती करें।',
      'home.subtitle': 'एआई आधारित जानकारियाँ जो ऐतिहासिक डेटा, मौसम और मिट्टी के स्वास्थ्य का उपयोग करती हैं।',
      'cta.getStarted': 'शुरू करें',
      'cta.learnMore': 'और जानें',
      'home.card1': 'उत्पादन पूर्वानुमान',
      'home.card2': 'स्मार्ट सिंचाई',
      'home.card3': 'मिट्टी स्वास्थ्य',
      'home.card4': 'मौसम चेतावनी',
      'home.featuresTitle': 'प्लेटफॉर्म विशेषताएँ',
      'features.yield': 'सटीक उत्पादन पूर्वानुमान',
      'features.yieldDesc': 'खुले डेटा पर प्रशिक्षित मॉडल आपके क्षेत्र और फसल के अनुरूप।',
      'features.irrigation': 'सिंचाई अनुकूलन',
      'features.irrigationDesc': 'ET और वर्षा पूर्वानुमान के आधार पर दैनिक योजना।',
      'features.fertilization': 'उर्वरीकरण मार्गदर्शन',
      'features.fertilizationDesc': 'मिट्टी मेट्रिक्स से N-P-K समय-सारणी।',
      'features.pest': 'कीट और रोग चेतावनी',
      'features.pestDesc': 'मौसम पैटर्न से शुरुआती चेतावनियाँ।',
      'home.ctaBand': 'क्या आप अपनी उत्पादकता बढ़ाने के लिए तैयार हैं?',
      'cta.startFree': 'मुफ़्त शुरू करें',
      'footer.tag': 'सभी के लिए डेटा-आधारित खेती।',
      'footer.company': 'कंपनी',
      'footer.careers': 'करियर',
      'footer.contact': 'संपर्क',
      'footer.legal': 'कानूनी',
      'footer.privacy': 'गोपनीयता नीति',
      'footer.terms': 'सेवा की शर्तें',
      'about.title': 'एग्रीयील्ड एआई के बारे में',
      'about.mission': 'हमारा लक्ष्य छोटे किसानों की उत्पादकता बढ़ाना है।',
      'about.how': 'यह कैसे काम करता है',
      'about.point1': 'ऐतिहासिक कृषि डेटा को एकत्र करना।',
      'about.point2': 'वास्तविक समय मौसम और मिट्टी डेटा जोड़ना।',
      'about.point3': 'उत्पादन और सिफारिशें प्रदान करना।',
      'about.point4': 'क्षेत्रीय भाषाओं का समर्थन।',
      'about.values': 'हमारे मूल्य',
      'about.valuesDesc': 'पहुँच, गोपनीयता, और प्रभाव।',
      'success.title': 'सफलता की कहानियाँ',
      'success.intro': 'वास्तविक किसान, वास्तविक परिणाम।',
      'success.s1.title': 'राजस्थान में वर्षा-आधारित गेहूं',
      'success.s1.body': '14% तक बढ़ोतरी।',
      'success.s2.title': 'पश्चिम बंगाल में धान',
      'success.s2.body': '9% लागत बचत।',
      'success.s3.title': 'तमिलनाडु में सब्ज़ियाँ',
      'success.s3.body': 'आकार और गुणवत्ता में सुधार।',
      'weather.title': 'मौसम रिपोर्ट',
      'weather.subtitle': 'अपना स्थान दर्ज करें।',
      'weather.check': 'मौसम देखें',
      'weather.temp': 'तापमान',
      'weather.rain': 'वर्षा',
      'weather.humidity': 'नमी',
      'weather.advice': 'सिंचाई और कीट सलाह',
      'login.title': 'वापस स्वागत है',
      'login.email': 'ईमेल',
      'login.password': 'पासवर्ड',
      'login.signIn': 'साइन इन',
      'login.note': 'डेमो क्रेडेंशियल्स का उपयोग करें।',
      'get.title': 'शुरू करें',
      'get.step1': 'खाता बनाएँ या साइन इन करें।',
      'get.step2': 'अपना खेत और फसल जोड़ें।',
      'get.step3': 'मौसम और मिट्टी डेटा जोड़ें।',
      'get.step4': 'भविष्यवाणियाँ देखें।',
      'get.cta': 'जारी रखें'
    },
    bn: {
      'nav.home': 'হোম',
      'nav.about': 'আমাদের সম্পর্কে',
      'nav.success': 'সাফল্যের গল্প',
      'nav.weather': 'আবহাওয়া রিপোর্ট',
      'nav.getStarted': 'শুরু করুন',
      'nav.login': 'লগইন',
      'home.title': 'ফসল ফলনের পূর্বাভাস। স্মার্টভাবে চাষ করুন।',
      'home.subtitle': 'এআই-চালিত অন্তর্দৃষ্টি যা ইতিহাস, আবহাওয়া এবং মাটির ডেটা ব্যবহার করে।',
      'cta.getStarted': 'শুরু করুন',
      'cta.learnMore': 'আরও জানুন',
      'home.card1': 'ফলন পূর্বাভাস',
      'home.card2': 'স্মার্ট সেচ',
      'home.card3': 'মাটির স্বাস্থ্য',
      'home.card4': 'আবহাওয়া সতর্কতা',
      'home.featuresTitle': 'প্ল্যাটফর্ম ফিচার',
      'features.yield': 'সঠিক ফলন পূর্বাভাস',
      'features.yieldDesc': 'ক্রপ ও অঞ্চলের উপর ভিত্তি করে।',
      'features.irrigation': 'সেচ অপ্টিমাইজেশন',
      'features.irrigationDesc': 'দৈনিক পরিকল্পনা।',
      'features.fertilization': 'সার ব্যবস্থাপনা',
      'features.fertilizationDesc': 'মাটির ডেটা ভিত্তিক N-P-K।',
      'features.pest': 'পোকা ও রোগ সতর্কতা',
      'features.pestDesc': 'আবহাওয়া প্যাটার্নের ভিত্তিতে।',
      'home.ctaBand': 'প্রস্তুত?',
      'cta.startFree': 'ফ্রি শুরু করুন',
      'footer.tag': 'সবার জন্য ডেটা-চালিত কৃষি।',
      'footer.company': 'কোম্পানি',
      'footer.careers': 'ক্যারিয়ার',
      'footer.contact': 'যোগাযোগ',
      'footer.legal': 'আইনগত',
      'footer.privacy': 'গোপনীয়তা নীতি',
      'footer.terms': 'সেবার শর্তাবলী',
      'about.title': 'এগ্রিইল্ড এআই সম্পর্কে',
      'about.mission': 'ছোট কৃষকদের ক্ষমতায়ন।',
      'about.how': 'কাজের ধারা',
      'about.point1': 'ইতিহাসভিত্তিক ডেটা গ্রহণ।',
      'about.point2': 'রিয়েল-টাইম আবহাওয়া ও মাটি।',
      'about.point3': 'ফলন ও সুপারিশ।',
      'about.point4': 'আঞ্চলিক ভাষা সমর্থন।',
      'about.values': 'আমাদের মূল্যবোধ',
      'about.valuesDesc': 'অ্যাক্সেসিবিলিটি, গোপনীয়তা, প্রভাব।',
      'success.title': 'সাফল্যের গল্প',
      'success.intro': 'প্রকৃত কৃষকদের অভিজ্ঞতা।',
      'success.s1.title': 'রাজস্থানের গম',
      'success.s1.body': '১৪% বৃদ্ধি।',
      'success.s2.title': 'পশ্চিমবঙ্গের ধান',
      'success.s2.body': '৯% খরচ সাশ্রয়।',
      'success.s3.title': 'তামিলনাড়ুর সবজি',
      'success.s3.body': 'উন্নত মান।',
      'weather.title': 'আবহাওয়া রিপোর্ট',
      'weather.subtitle': 'আপনার অবস্থান লিখুন।',
      'weather.check': 'আবহাওয়া দেখুন',
      'weather.temp': 'তাপমাত্রা',
      'weather.rain': 'বৃষ্টিপাত',
      'weather.humidity': 'আর্দ্রতা',
      'weather.advice': 'সেচ ও পোকা পরামর্শ',
      'login.title': 'ফিরে আসার জন্য স্বাগতম',
      'login.email': 'ইমেইল',
      'login.password': 'পাসওয়ার্ড',
      'login.signIn': 'সাইন ইন',
      'login.note': 'ডেমো ক্রেডেনশিয়াল ব্যবহার করুন।',
      'get.title': 'শুরু করুন',
      'get.step1': 'অ্যাকাউন্ট তৈরি বা সাইন ইন।',
      'get.step2': 'খামার ও ফসল যোগ করুন।',
      'get.step3': 'আবহাওয়া ও মাটি ডেটা যোগ করুন।',
      'get.step4': 'পূর্বাভাস দেখুন।',
      'get.cta': 'চালিয়ে যান'
    },
    ta: {
      'nav.home': 'முகப்பு',
      'nav.about': 'எங்களை பற்றி',
      'nav.success': 'வெற்றி கதைகள்',
      'nav.weather': 'வானிலை அறிக்கை',
      'nav.getStarted': 'தொடங்குங்கள்',
      'nav.login': 'உள்நுழை',
      'home.title': 'பயிர் விளைச்சலை கணிக்கவும். புத்திசாலித்தனமாக வளர்க்கவும்.',
      'home.subtitle': 'வரலாறு, வானிலை, மண் தரவைப் பயன்படுத்தும் எஐ அறிவு.',
      'cta.getStarted': 'தொடங்குங்கள்',
      'cta.learnMore': 'மேலும் அறிக',
      'home.card1': 'விளைச்சல் கணிப்பு',
      'home.card2': 'ஸ்மார்ட் பாசனம்',
      'home.card3': 'மண் ஆரோக்கியம்',
      'home.card4': 'வானிலை எச்சரிக்கை',
      'home.featuresTitle': 'தள அம்சங்கள்',
      'features.yield': 'துல்லியமான விளைச்சல் கணிப்பு',
      'features.yieldDesc': 'பகுதி மற்றும் பயிருக்கு ஏற்ப.',
      'features.irrigation': 'பாசன மேம்பாடு',
      'features.irrigationDesc': 'தினசரி திட்டம்.',
      'features.fertilization': 'உர வழிகாட்டுதல்',
      'features.fertilizationDesc': 'மண் தரவின் அடிப்படையில் N-P-K.',
      'features.pest': 'பூச்சி/நோய் எச்சரிக்கை',
      'features.pestDesc': 'வானிலை முறைகள் அடிப்படையில்.',
      'home.ctaBand': 'தயாரா?',
      'cta.startFree': 'இலவசமாக தொடங்குங்கள்',
      'footer.tag': 'அனைவருக்கும் தரவுசார் விவசாயம்.',
      'footer.company': 'நிறுவனம்',
      'footer.careers': 'வேலைவாய்ப்பு',
      'footer.contact': 'தொடர்பு',
      'footer.legal': 'சட்டம்',
      'footer.privacy': 'தனியுரிமைக் கொள்கை',
      'footer.terms': 'சேவை விதிமுறைகள்',
      'about.title': 'அக்ரியீல்ட் எஐ பற்றி',
      'about.mission': 'சிறு விவசாயிகளை சக்திவாய்த்தவர்களாக்குதல்.',
      'about.how': 'எப்படி வேலை செய்கிறது',
      'about.point1': 'வரலாற்று தரவுகளை இணைத்தல்.',
      'about.point2': 'நேரடி வானிலை/மண் தரவு.',
      'about.point3': 'விளைச்சல்/பரிந்துரை.',
      'about.point4': 'மொழி ஆதரவு.',
      'about.values': 'எங்கள் மதிப்புகள்',
      'about.valuesDesc': 'அணுகல், தனியுரிமை, தாக்கம்.',
      'success.title': 'வெற்றி கதைகள்',
      'success.intro': 'உண்மையான விவசாயிகள், உண்மையான முடிவுகள்.',
      'success.s1.title': 'ராஜஸ்தான் கோதுமை',
      'success.s1.body': '14% உயர்வு.',
      'success.s2.title': 'மேற்கு வங்கம் நெல்',
      'success.s2.body': '9% செலவு சேமிப்பு.',
      'success.s3.title': 'தமிழ்நாடு காய்கறி',
      'success.s3.body': 'மேம்பட்ட தரம்.',
      'weather.title': 'வானிலை அறிக்கை',
      'weather.subtitle': 'உங்கள் இடத்தை உள்ளிடவும்.',
      'weather.check': 'வானிலை பார்க்க',
      'weather.temp': 'வெப்பநிலை',
      'weather.rain': 'மழை',
      'weather.humidity': 'ஈரப்பதம்',
      'weather.advice': 'பாசனம்/பூச்சி ஆலோசனை',
      'login.title': 'மீண்டும் வருக',
      'login.email': 'மின்னஞ்சல்',
      'login.password': 'கடவுச்சொல்',
      'login.signIn': 'உள்நுழை',
      'login.note': 'டெமோ சான்றுகளை பயன்படுத்தவும்.',
      'get.title': 'தொடங்குங்கள்',
      'get.step1': 'உங்கள் கணக்கை உருவாக்கவும்.',
      'get.step2': 'பண்ணை/பயிர் சேர்க்கவும்.',
      'get.step3': 'வானிலை/மண் தரவு இணைக்கவும்.',
      'get.step4': 'கணிப்புகளைப் பாருங்கள்.',
      'get.cta': 'தொடரவும்'
    }
  };

  function applyLanguage(lang) {
    const dict = translations[lang] || translations.en;
    document.querySelectorAll('[data-i18n]').forEach(function(el) {
      const key = el.getAttribute('data-i18n');
      if (key && dict[key]) {
        el.textContent = dict[key];
      }
    });
    try { localStorage.setItem('lang', lang); } catch (_) {}
  }

  const langSelect = document.getElementById('languageSelect');
  const savedLang = (function() { try { return localStorage.getItem('lang'); } catch (_) { return null; } })();
  const defaultLang = savedLang || 'en';
  if (langSelect) {
    langSelect.value = defaultLang;
    langSelect.addEventListener('change', function() { applyLanguage(langSelect.value); });
  }
  applyLanguage(defaultLang);

  // Weather form demo logic (placeholder)
  const weatherForm = document.getElementById('weatherForm');
  if (weatherForm) {
    weatherForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const locationInput = document.getElementById('locationInput');
      const location = locationInput ? locationInput.value.trim() : '';
      const result = document.getElementById('weatherResult');
      if (!result) return;
      result.classList.remove('hidden');

      // Mock values; real app would fetch from an API
      var tempC = (25 + Math.random() * 10).toFixed(1) + '°C';
      var rainMm = (Math.random() * 15).toFixed(1) + ' mm';
      var humidity = (50 + Math.random() * 40).toFixed(0) + '%';
      document.getElementById('tempVal').textContent = tempC;
      document.getElementById('rainVal').textContent = rainMm;
      document.getElementById('humidityVal').textContent = humidity;

      const adviceList = document.getElementById('adviceList');
      if (adviceList) {
        adviceList.innerHTML = '';
        var tips = [
          'Schedule irrigation in early morning to reduce evaporation.',
          'Consider pest scouting after consecutive humid days.',
          'Adjust nitrogen application if heavy rainfall is forecast.'
        ];
        tips.forEach(function(tip) {
          var li = document.createElement('li');
          li.textContent = tip + (location ? ' (' + location + ')' : '');
          adviceList.appendChild(li);
        });
      }
    });
  }

  // Simple login handler (demo only)
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
      e.preventDefault();
      alert('Demo login successful!');
      window.location.href = '/workspace/frontend/get-started.html';
    });
  }
})();

