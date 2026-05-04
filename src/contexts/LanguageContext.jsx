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
      geographyVal: 'Flat Godavari delta plain. Balabhadrapuram village population was about 14,000 (2014). The region is predominantly agricultural.',
      admin: 'Administrative Hierarchy',
      adminVal: 'Country: India, State: Andhra Pradesh, District: East Godavari, Mandal: Biccavolu'
    },
    events: {
      title: 'Events & Facilities',
      eventsText: 'There are annual celebrations, especially on Saturdays, including annadanam (community meals) every week. Devotees reportedly walk long distances (7 Saturdays) for blessings.',
      facilities: 'Facilities',
      facilitiesText: 'The temple has parking and a hall for annadanam on Saturdays. The site is open to the public during stated hours and standard temple norms (dress code) apply. No commercial businesses are noted on-site.'
    }
  },
  te: {
    nav: {
      history: 'చరిత్ర',
      details: 'వివరాలు',
      events: 'కార్యక్రమాలు',
      management: 'ఆడಳಿತ మಂಡలి',
      gallery: 'గ్యాలరీ',
      contact: 'సంప్రదించండి'
    },
    hero: {
      title: 'శ్రీదేవి భూదేవి సమేత శ్రీ ప్రసన్న వేంకటేశ్వర స్వామి దేవస్థానం',
      subtitle: 'తూర్పు తిరుమల - బలభద్రపురం'
    },
    history: {
      title: 'ఆలయ చరిత్ర',
      timeline: 'ఆలయ అభివృద్ధి సమయపాలన',
      year2012: '2012: వేంకటేశ్వర స్వామి ఆలయ నిర్మాణం ప్రారంభమైంది',
      year2014: '2014: ఆలయ ప్రాణప్రతిష్ఠ (5 మే 2014 ఉదయం 9:57 గంటలకు)',
      year2014_2026: '2014-2026: నిత్య పూజలు మరియు స్థానిక ఉత్సవాలు (ప్రతి శనివారం అన్నదానం)',
      details: 'ప్రధాన నిర్మాణం ఆధునిక వేంకటేశ్వర స్వామి ఆలయం, ఇది 81 అడుగుల గోపురం మరియు స్వామి పుష్కరిణి (ఆలయ కోనేరు) కలిగి ఉంది. గర్భగుడిలో 9.17 అడుగుల వేంకటేశ్వర స్వామి విగ్రహం ఉంది. ఈ సముదాయంలో వరాహ స్వామి ఉప ఆలయం మరియు ఫంక్షన్ హాల్ కూడా ఉన్నాయి.',
      nickname: 'స్థానిక సంప్రదాయంలో ఈ ఆలయాన్ని "తూర్పు తిరుమల" అని పిలుస్తారు. ఇది ప్రసిద్ధ సాయిబాబా ఆలయం (ఆంధ్ర షిర్డీ) పక్కన నిర్మించబడింది.'
    },
    details: {
      title: 'ప్రధాన వివరాలు',
      location: 'స్థానం',
      locationVal: 'బలభద్రపురం గ్రామం, బిక్కవోలు మండలం, తూర్పు గోదావరి జిల్లా, ఆంధ్రప్రదేశ్, భారతదేశం. (PIN 533343)',
      coords: 'అక్షాంశ రేఖాంశాలు',
      coordsVal: 'సుమారుగా 16°57′30″ N, 82°00′20″ E',
      transport: 'రవాణా సౌకర్యాలు',
      transportVal: 'రోడ్డు: బిక్కవోలు మీదుగా NH16 కి అనుసంధానించబడింది. రాజమండ్రి మరియు కాకినాడ నుండి ఏపీఎస్‌ఆర్టీసీ బస్సులు అందుబాటులో ఉన్నాయి. సమీప ప్రధాన రైల్వే స్టేషన్ రాజమండ్రి (~30 కి.మీ దూరంలో). సమీప విమానాశ్రయం రాజమండ్రి విమానాశ్రయం (~30 కి.మీ వాయువ్యంగా).',
      geography: 'భౌగోళిక & జనాభా',
      geographyVal: 'చదునైన గోదావరి డెల్టా మైదానం. బలభద్రపురం గ్రామ జనాభా సుమారు 14,000 (2014). ఈ ప్రాంతం ప్రధానంగా వ్యవసాయ ఆధారితమైనది.',
      admin: 'పరిపాలనా సోపానక్రమం',
      adminVal: 'దేశం: భారతదేశం, రాష్ట్రం: ఆంధ్రప్రదేశ్, జిల్లా: తూర్పు గోదావరి, మండలం: బిక్కవోలు'
    },
    events: {
      title: 'కార్యక్రమాలు & సౌకర్యాలు',
      eventsText: 'ముఖ్యంగా శనివారాలలో వార్షిక ఉత్సవాలు జరుగుతాయి, ప్రతి వారం అన్నదానం ఉంటుంది. భక్తులు ఆశీర్వాదాల కోసం (7 శనివారాలు) కాలినడకన వస్తారు.',
      facilities: 'సౌకర్యాలు',
      facilitiesText: 'ఆలయంలో శనివారాల్లో అన్నదానం కోసం హాల్ మరియు పార్కింగ్ ఉంది. ఆలయం నిర్ణీత వేళల్లో ప్రజలకు తెరచి ఉంటుంది, సాంప్రదాయ దుస్తుల నియమాలు వర్తిస్తాయి.'
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
