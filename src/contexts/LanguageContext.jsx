import React, { createContext, useState, useContext } from 'react';

const LanguageContext = createContext();

export const translations = {
  en: {
    nav: {
      history: 'History',
      details: 'Details',
      events: 'Events',
      management: 'Management',
      gallery: 'Gallery',
      contact: 'Contact'
    },
    hero: {
      title: 'Sridevi Bhoodevi Sametha Sri Prasanna Venkateswara Swamy Devasthanam',
      subtitle: 'Toorpu Tirumala - Balabhadrapuram'
    },
    history: {
      title: 'Temple History',
      timeline: 'Temple Development Timeline',
      year2012: '2012: Construction of Venkateswara temple began',
      year2014: '2014: Temple consecration (pranapratishta on 5 May 2014 at 9:57 AM)',
      year2014_2026: '2014-2026: Regular worship and local festivals (annadanam each Saturday)',
      details: 'The main structure is the modern Venkateswara Swamy temple, featuring an 81-foot gopuram and a Swamy Pushkarini (temple tank). The inner sanctum houses a 9.17-foot statue of Lord Venkateswara. The complex also contains a Varaha Swamy sub-temple and a function hall.',
      nickname: 'The temple is nicknamed "Toorpu Tirumala" (Eastern Tirumala) in local tradition. It was built adjacent to the famous Sai Baba temple (Andhra Shirdi).'
    },
    details: {
      title: 'Key Details',
      location: 'Location',
      locationVal: 'Balabhadrapuram village, Biccavolu mandal, East Godavari district, Andhra Pradesh, India. (PIN 533343)',
      coords: 'Coordinates',
      coordsVal: 'Approx. 16°57′30″ N, 82°00′20″ E',
      transport: 'Transport Links',
      transportVal: 'Road: Connected to NH16 via Biccavolu. State-run APSRTC buses serve nearby Balabhadrapuram from Rajahmundry and Kakinada. Nearest major railway station is Rajahmundry (~30 km away). Nearest airport is Rajahmundry Airport (~30 km NW).',
      geography: 'Geography & Demographics',
      geographyVal: 'Flat Godavari delta plain. Balabhadrapuram village population was about 14,000. The region is predominantly agricultural.',
      admin: 'Administrative Hierarchy',
      adminVal: 'Country: India, State: Andhra Pradesh, District: East Godavari, Mandal: Biccavolu'
    },
    events: {
      title: 'Events & Celebrations',
      recentUpcoming: 'Recent & Upcoming Events',
      eventsText: 'Annual celebrations are performed with grand devotion. Every Saturday, a divine Annadanam Karyakram (holy community feast) is organized for devotees. Devotees reportedly walk long distances across 7 Saturdays for divine blessings.',
      facilities: 'Temple Facilities',
      facilitiesText: 'The temple premises feature ample parking space and a dedicated hall for Saturday Annadanam. The site is open daily during designated hours, adhering to standard temple decorum and dress code.',
      noEvents: 'No upcoming events scheduled at the moment.',
      saturdayBadge: 'Every Saturday · Annadanam Karyakram',
      festivalsBadge: 'Annual Grand Festivals'
    },
    gallery: {
      title: 'Sacred Gallery',
      subtitle: 'Glimpses of divine celebrations & sacred moments',
      teluguTag: 'ఆలయ చిత్రమాలిక'
    },
    contact: {
      heading: 'Contact & Location',
      mapLabel: 'Map Location:',
      address: 'Sridevi Bhoodevi Sametha Sri Prasanna Venkateswara Swamy Devasthanam (Toorpu Tirumala), Balabhadrapuram village, Biccavolu mandal, East Godavari district, Andhra Pradesh, India. PIN: 533343'
    },
    management: {
      title: 'Temple Management Committee',
      role: 'Committee Member'
    },
    footer: {
      copyright: 'Sridevi Bhoodevi Sametha Sri Prasanna Venkateswara Swamy Devasthanam, Balabhadrapuram. All rights reserved.'
    },
    donate: {
      buttonLabel: 'Donate Now',
      modalTitle: 'Temple Donation',
      modalSubtitle: "Support our temple's growth and sacred activities",
      fullName: 'Full Name',
      namePlaceholder: 'Enter your name',
      mobile: 'Mobile Number',
      mobilePlaceholder: '10-digit mobile number',
      amount: 'Amount (₹)',
      amountPlaceholder: 'Enter amount',
      processing: 'Processing...',
      continuePay: 'Continue to Pay',
      scanPay: 'Scan & Pay via Any UPI App',
      amountLabel: 'Amount',
      saveQr: 'Save QR to Photos / Gallery',
      qrInstructions: 'Scan this QR using PhonePe, Google Pay, Paytm, or BHIM.',
      galleryTip: 'On Mobile: Save QR ➔ Open your UPI App ➔ Scan from Gallery',
      orCopyUpi: 'Or Pay Directly to UPI ID',
      copyUpiBtn: 'Copy UPI ID',
      templeUpi: 'Temple Official UPI ID',
      done: 'Done',
      successMsg: 'Details saved! Please scan the QR or copy UPI ID to pay.',
      failMsg: 'Failed to process. Please try again.'
    }
  },
  te: {
    nav: {
      history: 'చరిత్ర',
      details: 'వివరాలు',
      events: 'కార్యక్రమాలు',
      management: 'పాలక మండలి',
      gallery: 'చిత్రమాలిక',
      contact: 'సంప్రదించండి'
    },
    hero: {
      title: 'శ్రీదేవి భూదేవి సమేత శ్రీ ప్రసన్న వేంకటేశ్వర స్వామి దేవస్థానం',
      subtitle: 'తూర్పు తిరుమల - బలభద్రపురం'
    },
    history: {
      title: 'ఆలయ చరిత్ర',
      timeline: 'ఆలయ అభివృద్ధి ఘట్టాలు',
      year2012: '2012: వేంకటేశ్వర స్వామి ఆలయ నిర్మాణం ప్రారంభమైంది',
      year2014: '2014: ఆలయ ప్రాణప్రతిష్ఠ (5 మే 2014 ఉదయం 9:57 గంటలకు)',
      year2014_2026: '2014-2026: నిత్య పూజలు మరియు విశేష ఉత్సవాలు (ప్రతి శనివారం అన్నదానం)',
      details: 'ప్రధాన నిర్మాణం ఆధునిక వేంకటేశ్వర స్వామి ఆలయం, ఇది 81 అడుగుల గోపురం మరియు స్వామి పుష్కరిణి (ఆలయ కోనేరు) కలిగి ఉంది. గర్భగుడిలో 9.17 అడుగుల వేంకటేశ్వర స్వామి దివ్య మంగళ విగ్రహం కలదు. ఈ సముదాయంలో వరాహ స్వామి ఉప ఆలయం మరియు కళ్యాణ మండపం కూడా ఉన్నాయి.',
      nickname: 'స్థానిక సంప్రదాయంలో ఈ ఆలయాన్ని "తూర్పు తిరుమల" అని పిలుస్తారు. ఇది ప్రసిద్ధ సాయిబాబా ఆలయం (ఆంధ్ర షిర్డీ) సమీపంలో నిర్మించబడింది.'
    },
    details: {
      title: 'ఆలయ ప్రధాన వివరాలు',
      location: 'స్థాన వివరాలు',
      locationVal: 'బలభద్రపురం గ్రామం, బిక్కవోలు మండలం, తూర్పు గోదావరి జిల్లా, ఆంధ్రప్రదేశ్, భారతదేశం. (పిన్ 533343)',
      coords: 'అక్షాంశ రేఖాంశాలు',
      coordsVal: 'సుమారుగా 16°57′30″ ఉత్తరం, 82°00′20″ తూర్పు',
      transport: 'రవాణా మార్గాలు',
      transportVal: 'రోడ్డు మార్గం: బిక్కవోలు మీదుగా NH16కి అనుసంధానించబడింది. రాజమండ్రి మరియు కాకినాడ నుండి బలభద్రపురానికి APSRTC బస్సులు నిరంతరం అందుబాటులో ఉంటాయి. సమీప ప్రధాన రైల్వే స్టేషన్: రాజమండ్రి (~30 కి.మీ). సమీప విమానాశ్రయం: రాజమండ్రి విమానాశ్రయం (~30 కి.మీ).',
      geography: 'భౌగోళిక & జనాభా వివరాలు',
      geographyVal: 'సారవంతమైన గోదావరి డెల్టా మైదాన ప్రాంతం. బలభద్రపురం గ్రామ జనాభా సుమారు 14,000. ఈ ప్రాంతం ప్రధానంగా వ్యవసాయ ఆధారితమైనది.',
      admin: 'పరిపాలనా వివరాలు',
      adminVal: 'దేశం: భారతదేశం, రాష్ట్రం: ఆంధ్రప్రదేశ్, జిల్లా: తూర్పు గోదావరి, మండలం: బిక్కవోలు'
    },
    events: {
      title: 'విశేష కార్యక్రమాలు & వేడుకలు',
      recentUpcoming: 'తాజా & రాబోయే కార్యక్రమాలు',
      eventsText: 'ఆలయంలో ప్రతి సంవత్సరం వార్షిక ఉత్సవాలు అత్యంత వైభవంగా జరుగుతాయి. ప్రతి శనివారం భక్తుల కోసం పవిత్ర అన్నదాన కార్యక్రమం నిర్వహించబడుతుంది. స్వామివారి దివ్య ఆశీస్సుల కోసం భక్తులు 7 శనివారాలు నడకదారిన వచ్చి స్వామివారిని దర్శించుకుంటారు.',
      facilities: 'ఆలయ సౌకర్యాలు',
      facilitiesText: 'ఆలయ ప్రాంగణంలో విశాలమైన పార్కింగ్ స్థలం మరియు శనివారపు అన్నదానం కోసం ప్రత్యేక హాల్ సౌకర్యం ఉంది. ఆలయం నిర్ణీత సమయాల్లో భక్తుల దర్శనం కోసం తెరిచి ఉంటుంది మరియు సంప్రదాయ వస్త్రధారణ నియమాలు వర్తిస్తాయి.',
      noEvents: 'ప్రస్తుతం ఏ కార్యక్రమాలు నిర్ణయించబడలేదు.',
      saturdayBadge: 'ప్రతి శనివారం · అన్నదాన కార్యక్రమం',
      festivalsBadge: 'వార్షిక మహోత్సవాలు'
    },
    gallery: {
      title: 'దివ్య చిత్రమాలిక',
      subtitle: 'ఆలయ శోభ, విశేష ఉత్సవాలు & పవిత్ర ఘట్టాలు',
      teluguTag: 'ఆలయ చిత్రమాలిక'
    },
    contact: {
      heading: 'సంప్రదింపు వివరాలు & స్థానం',
      mapLabel: 'మ్యాప్ స్థానం:',
      address: 'శ్రీదేవి భూదేవి సమేత శ్రీ ప్రసన్న వేంకటేశ్వర స్వామి దేవస్థానం (తూర్పు తిరుమల), బలభద్రపురం గ్రామం, బిక్కవోలు మండలం, తూర్పు గోదావరి జిల్లా, ఆంధ్రప్రదేశ్, భారతదేశం. పిన్: 533343'
    },
    management: {
      title: 'ఆలయ పాలక మండలి',
      role: 'కమిటీ సభ్యుడు'
    },
    footer: {
      copyright: 'శ్రీదేవి భూదేవి సమేత శ్రీ ప్రసన్న వేంకటేశ్వర స్వామి దేవస్థానం, బలభద్రపురం. సర్వహక్కులూ ప్రత్యేకించబడ్డాయి.'
    },
    donate: {
      buttonLabel: 'విరాళం ఇవ్వండి',
      modalTitle: 'దేవాలయ విరాళం',
      modalSubtitle: 'మా దేవాలయ అభివృద్ధికి మరియు పవిత్ర సేవలకు మద్దతు ఇవ్వండి',
      fullName: 'పూర్తి పేరు',
      namePlaceholder: 'మీ పేరు నమోదు చేయండి',
      mobile: 'మొబైల్ నంబర్',
      mobilePlaceholder: '10 అంకెల మొబైల్ నంబర్',
      amount: 'విరాళం మొత్తం (₹)',
      amountPlaceholder: 'మొత్తం నమోదు చేయండి',
      processing: 'ప్రాసెస్ అవుతోంది...',
      continuePay: 'చెల్లింపుకు కొనసాగండి',
      scanPay: 'ఏదైనా UPI యాప్‌తో స్కాన్ చేసి చెల్లించండి',
      amountLabel: 'మొత్తం',
      saveQr: 'QR కోడ్‌ను గ్యాలరీలో సేవ్ చేయండి',
      qrInstructions: 'PhonePe, Google Pay, Paytm లేదా BHIM ద్వారా ఈ QR కోడ్‌ను స్కాన్ చేయండి.',
      galleryTip: '💡 మొబైల్ సూచన: QR సేవ్ చేయండి ➔ మీ UPI యాప్ తెరవండి ➔ Scan నొక్కి గ్యాలరీ నుండి ఎంచుకోండి',
      orCopyUpi: 'లేదా నేరుగా UPI IDకి చెల్లించండి',
      copyUpiBtn: 'UPI ID కాపీ చేయండి',
      templeUpi: 'ఆలయ అధికారిక UPI ID',
      done: 'పూర్తయింది',
      successMsg: 'వివరాలు భద్రపరచబడ్డాయి! దయచేసి QR స్కాన్ చేసి లేదా UPI IDతో చెల్లించండి.',
      failMsg: 'ప్రయత్నం విఫలమైంది. దయచేసి మళ్లీ ప్రయత్నించండి.'
    }
  }
};

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState('en');

  const toggleLang = () => {
    setLang(prev => prev === 'en' ? 'te' : 'en');
  };

  const t = translations[lang];

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
