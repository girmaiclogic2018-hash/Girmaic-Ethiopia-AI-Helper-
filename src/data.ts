import { Language, Category, GuidePreset, LanguageCode } from "./types";

export const LANGUAGES: Language[] = [
  { code: "am", name: "Amharic", nativeName: "አማርኛ" },
  { code: "om", name: "Afaan Oromoo", nativeName: "Afaan Oromoo" },
  { code: "so", name: "Somali", nativeName: "Soomaali" },
  { code: "ti", name: "Tigrinya", nativeName: "ትግርኛ" },
  { code: "en", name: "English", nativeName: "English" }
];

export const CATEGORIES: Category[] = [
  {
    id: "jobs",
    icon: "Briefcase",
    title: {
      am: "የAI ስራ እና ከሪየር አሰልጣኝ (AI Career Coach)",
      om: "AI Gorsa Hojii (AI Career Coach)",
      so: "AI Hagaha Shaqada (AI Career Coach)",
      ti: "ናይ AI ስራሕን ሞያን መምህር",
      en: "AI Career Coach"
    },
    description: {
      am: "በኢትዮጵያ ውስጥ ስራዎችን መፈለግ፣ ሙያዊ የCV አጻጻፍ እና የDereja/Ethiojobs አጠቃቀም።",
      om: "Akkaataa biyya Itiyoophiyaa keessatti hojii barbaaddan, CV qopheessanii fi Dereja/Ethiojobs itti fayyadaman.",
      so: "Sida shaqo looga raadiyo Itoobiya, qorista CV-ga iyo isticmaalka Dereja/Ethiojobs.",
      ti: "ኣብ ኢትዮጵያ ስራሕ ምርካብ፣ ኣጸሓሕፋ CVን ኣጠቓቕማ Dereja/Ethiojobsን።",
      en: "Standard formatting of CVs, job portals matching, work opportunities advice, and building local/global footprints."
    }
  },
  {
    id: "small_business",
    icon: "Store",
    title: {
      am: "የAI ንግድ አማካሪ (AI Business Advisor)",
      om: "AI Gorsa Daldalaa (AI Business Advisor)",
      so: "AI Lataliyaha Ganacsiga (AI Business Advisor)",
      ti: "ናይ AI ንግዲ መማኸሪ",
      en: "AI Business Advisor"
    },
    description: {
      am: "የንግድ እቅድ ማውጣት፣ ፈቃድ፣ የግብር ከፋይ መለያ ቁጥር (TIN) ማግኘት እና የTelebirr Merchant አጠቃቀም።",
      om: "Akkaataa hayyama daldalaa, TIN gubbaa fudhatanii fi sirna Telebirr Merchant itti diriysan.",
      so: "Sida loo helo Shatiga Ganacsiga, aqoonsiga cashuur-bixiyaha (TIN) iyo isticmaalka Telebirr Merchant.",
      ti: "ኣብ ኢትዮጵያ ፍቓድ ንግዲ፣ መለለዪ ቁጽሪ ግብሪ (TIN) ምርካብን ኣጠቓቕማ Telebirr Merchantን።",
      en: "Register sole proprietorships, secure a TIN, set up Telebirr Merchant, and organize small funding business plans."
    }
  },
  {
    id: "agriculture",
    icon: "Sprout",
    title: {
      am: "የAI ግብርና ረዳት (AI Farmer Assistant)",
      om: "AI Gargaaraa Qonnaa (AI Farmer Assistant)",
      so: "AI Caawiyaha Beeraha (AI Farmer Assistant)",
      ti: "ናይ AI ሕርሻ ሓጋዚ",
      en: "AI Farmer Assistant"
    },
    description: {
      am: "የማዳበሪያ እና የተሻሻሉ ምርጥ ዘሮች አቅርቦት፣ የሰብል ጥበቃ እና የወረዳ ግብርና ባለሙያዎች እገዛ።",
      om: "Xaa’oo fi sanyii filatamaa argachuu, akkasumas gorsa ogeeyyii qonnaa aanaa.",
      so: "Helitaanka digada (xaa'ada), iniinyaha la wanaajiyey iyo caawinaadda khubarada beeraha ee Degmada.",
      ti: "ምርካብ ማዳበርያን ዝተመሓየሹ ዘርእታትን ሓገዝ ክኢላታት ሕርሻ ወረዳን።",
      en: "Access fertilizers (NPS/Urea), improved seeds from unions, crop productivity, and apply local modern farming advice."
    }
  },
  {
    id: "government",
    icon: "FileText",
    title: {
      am: "የAI መንግስት አገልግሎት መመሪያ (AI Government Guide)",
      om: "AI Kara-agarsiistuu Mootummaa (AI Government Guide)",
      so: "AI Hagaha Adeegyada Dawladda (AI Gov Guide)",
      ti: "ናይ AI ኣገልግሎት መንግስቲ መምርሒ",
      en: "AI Government Guide"
    },
    description: {
      am: "የቀበሌ መታወቂያ፣ የፋይዳ (Fayda) ዲጂታል መታወቂያ፣ ፓስፖርት እና የስራ ፍቃድ መንገዶች።",
      om: "Waraqaa eenyummaa gandaa, eenyummaa dijiitala Fayda, paaspoortii fi hayyama hojii.",
      so: "Waraaqda aqoonsiga Kebele-ka, Fayda Digital ID, baasaboorka iyo shatiyada dawladda.",
      ti: "ወረቐት መንነት ቀበሌ፣ ፈይዳ (Fayda) ዲጂታል መንነት፣ ፓስፖርትን ፍቓድ ስራሕን።",
      en: "Secure Kebele IDs, register for Fayda (Digital ID), request passports on online portals, and navigate public offices."
    }
  },
  {
    id: "education",
    icon: "GraduationCap",
    title: {
      am: "የAI አስተማሪ / መምህር (AI Teacher)",
      om: "AI Barsiisaa (AI Teacher)",
      so: "AI Macallinka (AI Teacher)",
      ti: "ናይ AI ኣስተማሪ / መምህር",
      en: "AI Teacher"
    },
    description: {
      am: "የ12ኛ ክፍል ውጤቶች መረጃ፣ ትምህርቶች ማብራሪያ፣ የTVET የሙያ ማሰልጠኛዎች እና የዩኒቨርሲቲ ምደባ።",
      om: "Ooduu qabxii kutaa 12ffaa, leenjii ogummaa TVET sanyii fi ramaddii yuunivarsiitii.",
      so: "Natiijooyinka fasalka 12-aad, Kulliyadaha Farsamada (TVET) iyo meelaynta jaamacaddaha.",
      ti: "ሓበሬታ ውጽኢት ክፍሊ 12፣ ሞያዊ ስልጠናታት (TVET)ን ምደባ ዩኒቨርሲታትን።",
      en: "Explaining curriculum lessons, TVET vocational skills paths, exam preparations, and public university registries."
    }
  },
  {
    id: "technology",
    icon: "Cpu",
    title: {
      am: "የAI ቴክኖሎጂ አጋር (AI Technology Partner)",
      om: "AI Hiriyya Teeknoolojii (AI Technology Partner)",
      so: "AI Caawiyaha Tiknoolajiyada (AI Tech Partner)",
      ti: "ናይ AI ቴክኖሎጂ መማኽርቲ",
      en: "AI Technology Partner"
    },
    description: {
      am: "የኢንተርኔት ጥቅሎችን በብቃት መጠቀም፣ ALX/Gebeya ስልጠናዎች እና የዲጂታል ክፍያ መተግበሪያዎች።",
      om: "Pakeejii interneetii sirnaan fayyadamuu, leenjii ALX/Gebeya fi kaffaltii dijiitalaa.",
      so: "Isticmaalka xirmooyinka internetka, tababarada ALX/Gebeya iyo adeegsiga lacag bixinta dhijitalka.",
      ti: "ኣጠቓቕማ ኢንተርኔት፣ ስልጠናታት ALX/Gebeyaን ዲጂታል ኣከፋፍላ ቴክኖሎጂን።",
      en: "Optimize Ethio / Safaricom data packages, request software bootcamps (ALX, Gebeya), and access web developer resources."
    }
  },
  {
    id: "cv_builder",
    icon: "FileCheck",
    title: {
      am: "የAI CV አውቶማቲክ ፈጣሪ (AI CV Builder)",
      om: "AI CV Qopheessituu (AI CV Builder)",
      so: "AI Sameeyaha CV-ga (AI CV Builder)",
      ti: "ናይ AI CV መዳለዊ ሓጋዚ",
      en: "AI CV Builder"
    },
    description: {
      am: "በባለሙያ ደረጃ የኢትዮጵያ ስታንዳርድ የያዘ ዝግጁ CV እና የሽፋን ደብዳቤ (Cover Letter) መፍጠሪያ።",
      om: "CV qulqullina qabu sirna jaallatamaa biyyaalessaan qopheessuu.",
      so: "Diyaarinta CV-yo xirfad leh oo waafaqsan suuqa Itoobiya maanta.",
      ti: "ኣብ ልዑል ደረጃ ዘለዎ ናይ ስራሕ CVን ናይ ምስጋና ደብዳቤን መዳልዊ።",
      en: "Instantly draft ready-to-copy, standard formatted professional CVs and targeted Cover Letters tailored for Ethiopian employers."
    }
  },
  {
    id: "interview_coach",
    icon: "UserCheck",
    title: {
      am: "የAI ቃለ-መጠይቅ አሰልጣኝ (AI Interview Coach)",
      om: "AI Leenjisaa Gaafannoo Hojii (AI Interview Coach)",
      so: "AI Macallinka Wareysiga (AI Interview Coach)",
      ti: "ናይ AI ስራሕ ቃለ-መሕትት መማኸሪ",
      en: "AI Interview Coach"
    },
    description: {
      am: "ለስራ ቃለ-መጠይቆች መዘጋጀት፣ የተለመዱ ጥያቄዎች እና መልሶች፣ እና በራስ መተማመንን ማዳበሪያ።",
      om: "Marii fi gaaffannoo hojii (Interview) of qopheessuu fi shaakallii deebii.",
      so: "Isku diyaarinta wareysiyada shaqo ee shirkadaha Itoobiya iyo caalamiga ah.",
      ti: "ንቃለ-መሕትት ስራሕ መዳልዊን ንርእሰ ምትእምማን ዘዕብዩ ስልጠናታትን።",
      en: "Simulate interviews, practice answers for common sector questions, and master confidence tricks."
    }
  },
  {
    id: "business_plan",
    icon: "TrendingUp",
    title: {
      am: "የAI የንግድ እቅድ አውጪ (AI Business Plan Generator)",
      om: "AI Karoorsitoota Daldalaa (AI Business Plan Generator)",
      so: "AI Qoraaga Qorshe Ganacsi (AI Business Plan Gen)",
      ti: "ናይ AI ንግዲ ፕላን መዳልዊ",
      en: "AI Business Plan Generator"
    },
    description: {
      am: "ዝርዝር የንግድ እቅድ፣ ገበያ ጥናት፣ ካፒታል ፍላጎት በብር (ETB) እና የበጀት ትንበያ መስሪያ።",
      om: "Karoora daldalaa qorannoo gabaa fi baajata birriin ta'e guutuun uumuu.",
      so: "Helitaanka qorshe ganacsi oo faahfaahsan, bajadka Birta Itoobiya iyo saadaal dakhli.",
      ti: "ዝርዝር ናይ ንግዲ ዕቅድ፣ መፅናዕቲ ዕዳጋን ናይ መጀመሪ ካፒታል ቀመርን መዳልዊ።",
      en: "Generate comprehensive structured business plans with market models, budget requirements in ETB, and operational workflows."
    }
  },
  {
    id: "startup_advisor",
    icon: "Rocket",
    title: {
      am: "የAI ስታርትአፕ አማካሪ (AI Startup Advisor)",
      om: "AI Gorsa Startups (AI Startup Advisor)",
      so: "AI Lataliyaha Shirkadaha Cusub (AI Startup Advisor)",
      ti: "ናይ AI ስታርትኣፕ ወይ ሓደስቲ ስራሕቲ መጣየሺ ሓጋዚ",
      en: "AI Startup Advisor"
    },
    description: {
      am: "ጀማሪ የቴክኖሎጂም ሆነ የፈጠራ ስራዎችን ወደ ስኬት ማድረሻ፣ ፈንድ ማግኘት እና የTelebirr ክፍያ ማቀናጃ ምክሮች።",
      om: "Gorsa hojiilee gara guddinaa, invastimentii fi kaffaltii dijiitalaa galchuuf.",
      so: "Tababarada dhisidda shirkadaha yar yar iyo sidii maalgelin loogu heli lahaa.",
      ti: "ሓደስቲ ፈጠራዊ ስራሕቲ (Startups) ናብ ስኬት ንምብጻሕን ናይ ፋይናንስ ኣማራጺታት ንምርካብን።",
      en: "Incubate initial technology or innovation venture ideas, navigate modern funding routes, and scale operations."
    }
  },
  {
    id: "tourism_guide",
    icon: "Compass",
    title: {
      am: "የAI አስጎብኚ እና የባህል መመሪያ (AI Tourism Guide)",
      om: "AI Kara-agarsiistuu Turizimii (AI Tourism Guide)",
      so: "AI Hagaha Dalxiiska & Dhaqanka (AI Tourism Guide)",
      ti: "ናይ AI ቱሪዝምን ባህልን መመሪያ",
      en: "AI Tourism Guide"
    },
    description: {
      am: "የኢትዮጵያ ታሪካዊ ቦታዎች፣ ቅርስ፣ ባህላዊ እሴቶች እና የቱሪዝም መስህቦች መረጃ ምንጭ።",
      om: "Odeeffannoo bakkeewwan seena qabeeyyii fi dalxiisa Itiyoophiyaa.",
      so: "Sogootinta goobaha taariikhiga ah ee Itoobiya iyo dhiirigelinta dalxiiska hidaha.",
      ti: "ናይ ኢትዮጵያ ታሪካዊ ቦታታት፣ ሓድግታትን ባህላዊ ጸጋታትን ዘላለማዊ መብርሂ።",
      en: "Explore historical Ethiopian heritage sites, cultural destinations, regional itineraries, and traditional arts."
    }
  },
  {
    id: "translator",
    icon: "Languages",
    title: {
      am: "የAI ባለብዙ-ቋንቋ ተርጓሚ (AI Translator)",
      om: "AI Hiikaa Afaanotaa (AI Translator)",
      so: "AI Turjumaanka (AI Translator)",
      ti: "ናይ AI ተርጓሚ",
      en: "AI Translator"
    },
    description: {
      am: "በአማርኛ, ኦሮምኛ, ሶማሊኛ, ትግርኛ እና እንግሊዝኛ መካከል ትክክለኛ እና ሰዋሰዋዊ ትርጉም።",
      om: "Hiikkaa sirrii afaanota Itiyoophiyaa garagaraa fi ingiliffaa gidduutti.",
      so: "Turjumista dabiiciga ah ee u dhaxaysa Af-Itoobiyaanka iyo Af-Ingiriisiga.",
      ti: "ኣብ መንጎ ሓሙሽተ ዓበይቲ ቋንቋታት ርትዓዊ ሰዋሰዋዊ ምትርጓም።",
      en: "Get fluent, culturally aware context translations between Amharic, Afaan Oromo, Somali, Tigrinya, and English."
    }
  },
  {
    id: "idea_generator",
    icon: "Lightbulb",
    title: {
      am: "የAI የንግድ እና የስራ ፈጠራ አመንጪ (AI Idea Generator)",
      om: "AI Maddisiisa Hojii (AI Idea Generator)",
      so: "AI Keenaha Fikradaha Cusub (AI Idea Generator)",
      ti: "ናይ AI ሓደስቲ ሓሳባት መመንጨዊ",
      en: "AI Idea Generator"
    },
    description: {
      am: "እንደየአካባቢዎ ካፒታል፣ ፍላጎት እና እውቀት በመነሳት በቀላሉ የሚሰሩ አዳዲስ ትርፋማ ሀሳቦችን ማፍለቂያ።",
      om: "Fakkeenya hojii bu'aa qabu akkaataa kaapitaala keessaniin argachuu.",
      so: "Soo saarista fikrado ganacsi oo dakhli fican ku keenaya caasimada iyo gobolada.",
      ti: "ከም ዓቕሚ ካፒታልኩምን ክእለትኩምን ብምብጋስ ትርፋማ ዝኾኑ ሓደስቲ ሓሳባት ንምውላድ።",
      en: "Brainstorm high-yield, low-capital local business and product concepts tailored to specific regions or towns."
    }
  },
  {
    id: "research_assistant",
    icon: "BookOpen",
    title: {
      am: "የAI የምርምር እና ጽሑፍ ረዳት (AI Research Assistant)",
      om: "AI Gargaaraa Qorannoo (AI Research Assistant)",
      so: "AI Caawiyaha Cilmi-baarista (AI Research Assistant)",
      ti: "ናይ AI መፅናዕትን ምርምርን ሓጋዚ",
      en: "AI Research Assistant"
    },
    description: {
      am: "የትምህርት ምርምሮችን፣ ሃሳቦችን ማደራጀት፣ የሪፖርት አጻጻፍ እና የሳይንሳዊ ንድፈ-ሃሳቦችን ማብራሪያ ማግኛ።",
      om: "Qorannoo barnootaa, gabaasa barreessuu fi ibsa saayinsawaa argachuuf.",
      so: "Caawinta qorista cilmi-baarisyada dugsiga ama mashaariicda waxbarashada jaamacadda.",
      ti: "ናይ ትምህርቲ መፅናዕትታትን ምርምርን ፅሑፋት ንምስናድን ንምብራህይን።",
      en: "Format academic papers, outline structured essays, and translate heavy research theories into plain text."
    }
  },
  {
    id: "freelancer_assistant",
    icon: "Globe",
    title: {
      am: "የAI ፍሪላንሰር ረዳት (AI Freelancer Assistant)",
      om: "AI Gargaaraa Freelance (AI Freelancer Assistant)",
      so: "AI Caawiyaha Iskiis-u-shaqeystaha (AI Freelancer Assistant)",
      ti: "ናይ AI ፍሪላንሰር (ነጻ ስራሕ ፈጣሪ) ሓጋዚ",
      en: "AI Freelancer Assistant"
    },
    description: {
      am: "በኦንላይን ስራዎች እንደ Upwork/Fiverr ገቢ ማግኘት፣ ፕሮፖዛል አጻጻፍ፣ እና ዲጂታል ክፍያ በኢትዮጵያ መቀበያ መንገዶች።",
      om: "Akkaataa hojii bilisaa (freelance) gabaa addunyaa irra hojjetanii fi kaffaltii fudhatan.",
      so: "Sida dakhli looga helo internetka iyo helitaanka macaamiil caalami ah.",
      ti: "ኣብ ኦንላይን መድረኻት (Upwork, Fiverr) ስራሕቲ ንምውሳድን ፕሮፖዛል ንምፅሓፍን ዝድግፍ።",
      en: "Apply for online remote contracts on Upwork, write winning client proposals, and set up international payout accounts."
    }
  },
  {
    id: "innovation_hub",
    icon: "Sparkles",
    title: {
      am: "የAI የቴክኖሎጂ ፈጠራ ማዕከል (AI Innovation Hub)",
      om: "AI Giddu-gala Kalaqaa (AI Innovation Hub)",
      so: "AI Xiddigaha Hal-abuurka (AI Innovation Hub)",
      ti: "ናይ AI ተክኖሎጂ ፈጠራ ማእከል",
      en: "AI Innovation Hub"
    },
    description: {
      am: "የቅርብ ጊዜ የኤአይ ቴክኖሎጂዎች፣ ፕሮግራሚንግ መማር፣ አዳዲስ ምህዞች እና የምህንድስና እገዛዎችን ማግኛ።",
      om: "Odeeffannoo kalaqa saayinsii, koodingii fi teeknoolojii AI haaraa irratti.",
      so: "Helitaanka fikradaha injineernimada, barashada koodka iyo tiknoolajiyada ugu dambeysa.",
      ti: "ሓደስቲ ናይ ቴክኖሎጂ ምህዞታትን ኮዲንግ ስልጠናታትን ዘተባብዕ መማኸሪ።",
      en: "Access emerging AI framework knowledge, software engineering logic, coding bug-fixes, and digital prototyping."
    }
  }
];

export const GUIDE_PRESETS: GuidePreset[] = [
  // Jobs
  {
    id: "preset_cv",
    categoryId: "jobs",
    title: {
      am: "ኢትዮጵያ ውስጥ ተቀባይነት ያለው CV አዘገጃጀት",
      om: "Akkaataa CV Itiyoophiyaa keessatti fudhatama qabu qopheessan",
      so: "Sida loo qoro CV laga aqbali karo Itoobiya dhexdeeda",
      ti: "ኣብ ኢትዮጵያ ተቐባልነት ዘለዎ ኣሰራርዓ CV",
      en: "Standard formatting of a CV for Ethiopian employers"
    },
    question: {
      am: "የመጀመሪያ ደረጃ ምሩቅ ነኝ። በኢትዮጵያ የስራ ገበያ ውስጥ ተቀባይነት ያለው CV እንዴት ማዘጋጀት እችላለሁ? ምን ምን መረጃዎችን ማካተት አለብኝ?",
      om: "Eebbifamaa haaraadha. Akkaataa CV gaarii gabaa hojii Itiyoophiyaa keessatti fudhatama qabu itti qopheessu danda'u naaf ibsi?",
      so: "Waxaan ahay arday hadda qalin-jabiyey. Sida ugu habboon ee aan u diyaarsan karo CV laga aqbalo suuqyada Itoobiya maxay tahay?",
      ti: "ሓድሽ ተመረቐ እየ። ኣብ ናይ ኢትዮጵያ ዕዳጋ ስራሕ ተቐባልነት ዘለዎ CV ከመይ ገይረ ከዳልው ይኽእል? እንታይ ሓበሬታታት ከካትት ኣለኒ?",
      en: "I am a fresh graduate. How should I prepare a standard structural CV that meets the expectations of companies in Ethiopia, and what are the key sections?"
    }
  },
  // Small Business
  {
    id: "preset_tin_license",
    categoryId: "small_business",
    title: {
      am: "TIN እና የንግድ ፈቃድ ማውጫ መንገዶች",
      om: "Akkaataa waraqaa TIN fi hayyama daldalaa fudhatan",
      so: "Sida loo helo lambarka TIN iyo Shatiga Ganacsiga",
      ti: "TINን ፍቓድ ንግድን መውጽኢ ስጉምትታት",
      en: "Getting TIN & Sole Proprietorship Trade License"
    },
    question: {
      am: "በራሴ ትንሽ የንግድ ስራ መጀመር እፈልጋለሁ። የግብር ከፋይ መለያ ቁጥር (TIN) እና የንግድ ፈቃድ ለማውጣት ምን ምን ሰነዶች ያስፈልጋሉ? የት ነው መሄድ ያለብኝ?",
      om: "Hojii daldalaa xiqqaas jalqabuun barbaada. Waraqaa TIN dhunfata fi hayyama daldalaa baafachuuf ragaalee akkamii barbaachisu? Eessa deemuun qaba?",
      so: "Waxaan rabaa in aan bilaabo ganacsi yar. Waa maxay dukumentiyada loo baahan yahay si aan u helo lambarka TIN iyo shatiga ganacsiga, halkeenna tagayaa?",
      ti: "ናይ በይነይ ንኡስ ንግዲ ክጅምር ደልየ። መለለዪ ቑፅሪ ግብሪ (TIN) ን ፍቓድ ንግድን ንምውጻእ እንታይ ሰነዳት የድልዩኒ? ኣበይ ክኸይድ ኣለኒ?",
      en: "I want to start a sole proprietorship micro-business. What are the step-by-step actions to get a TIN and a retail Trade License in Ethiopia, and what are the office locations and fees?"
    }
  },
  // Agriculture
  {
    id: "preset_fertilizer_coop",
    categoryId: "agriculture",
    title: {
      am: "ከተባበሩት ማህበራት ማዳበሪያ እና ዘር መግዛት",
      om: "Akkaataa xaa’oo fi sanyii filatamaa waldaalee irraa bitatan",
      so: "Sida Iskaashatada looga iibsado digada iyo iniinyaha",
      ti: "ካብ ሕብረት ስራሕ ማሕበራት ማዳበርያን ዘርእን ምዕዳግ",
      en: "Purchasing fertilizer & seeds from local unions"
    },
    question: {
      am: "በአካባቢዬ ካሉ የህብረት ስራ ማህበራት (Cooperatives Union) ማዳበሪያ (NPS/Urea) እና የተሻሻሉ ምርጥ ዘሮችን በቅናሽ ዋጋ ለመግዛት ምን ማድረግ አለብኝ?",
      om: "Xaa’oo (NPS/Urea) fi sanyii filatamaa waldaalee hojii gamtaa (union) irraa gatii gadi bu’aadhaan argachuuf maalan gochuu qaba?",
      so: "Sida aan uga iibsan karo digada (NPS iyo Urea) iyo iniinyaha la horumariyey iskaashatada beeraha (Cooperatives Union) ee deegaankeyga?",
      ti: "ኣብ ከባቢይ ካብ ዘለዉ ሕብረት ስራሕ ማሕበራት (Cooperatives Union) ማዳበርያ (NPS/Urea)ን ዝተመሓየሹ ዘርእታትን ብሕሱር ዋጋ ንምዕዳግ እንታይ ክገብር ኣለኒ?",
      en: "How do I register with and purchase subsidized chemical fertilizers (NPS, Urea) and high-yield seeds from the local primary cooperative or Woreda Agricultural union?"
    }
  },
  // Government
  {
    id: "preset_digital_id",
    categoryId: "government",
    title: {
      am: "የቀበሌ እና የፋይዳ (Fayda) መታወቂያ",
      om: "Eenyummaa Gandaa fi waraqaa Fayda digital",
      so: "Sida loo helo Aqoonsiga Kebele-ka iyo Fayda ID",
      ti: "መንነት ወረቐት ቀበሌን ፈይዳ (Fayda) ዲጂታል መንነትን",
      en: "Guidelines for Resident Kebele ID & Fayda Digital ID"
    },
    question: {
      am: "የቀበሌ ነዋሪነት መታወቂያ ለማውጣት እንዲሁም በአዲሱ ብሔራዊ የፋይዳ (Fayda ID) ዲጂታል መታወቂያ ላይ ለመመዝገብ ምን ያህል ጊዜ ይፈጃል? ምንስ ያስፈልጋል?",
      om: "Waraqaa eenyummaa gandaa baasuuf, akkasumas eenyummaa dijiitala biyyoolessaa Fayda gubbaa yaa'uuf sanadoon akkamii barbaachisu? Maal gochuun qaba?",
      so: "In aan helo aqoonsiga degganaanshaha Kebele-ga iyo diiwaan-gelinta Fayda Digital ID cusub maxaa loo baahan yahay, inteese ayay qaadataa?",
      ti: "ወረቐት መንነት ቀበሌ ንምውጻእን ኣብቲ ሓድሽ ሃገራዊ ፌዴራል ፈይዳ (Fayda ID) ንምምዝጋብን እንታይ የድሊ? ክንደይ ግዜ ይወስድ?",
      en: "What are the rules, documents (e.g., landlord letters, birth certificates), and registration centers for obtaining a resident Kebele ID and registering for the Fayda National Digital ID?"
    }
  },
  // Education
  {
    id: "preset_tvet_skills",
    categoryId: "education",
    title: {
      am: "በTVET የሙያ ስልጠናዎች መመዝገብ",
      om: "Akkaataa leenjii ogummaa TVET galmaayan",
      so: "Sida loogu qoromo kulliyadaha farsamada (TVET)",
      ti: "ኣብ TVET ሞያዊ ስልጠናታት ምምዝጋብ",
      en: "Enrolling in TVET vocational skills programs"
    },
    question: {
      am: "የ12ኛ ክፍል የስብስብ ውጤት ለዩኒቨርሲቲ ባያልፈኝም በTVET የሙያ ማሰልጠኛዎች (ፖሊቴክኒክ) ገብቼ ጠቃሚ የቴክኒክ ክህሎት ለመማር ምን ማድረግ አለብኝ? ምዝገባው እንዴት ነው?",
      om: "Qabxiin kutaa 12ffaa koo yuunivarsiitiif yoo naaf dabarsuu baates, leenjii ogummaa teeknikaa TVET (polytechnic) seenee barachuuf galmeen isaa akkamitti raawwatama?",
      so: "Haddii natiijadeeda fasalka 12-aad aysan ii saamaxin jaamacad, sideen u codsan karaa kulliyadaha farsamada gacanta (TVET) ee farsamada barata, sideese diiwaan-gelintu u dhacdaa?",
      ti: "ውጽኢት ክፍሊ 12 ናብ ዩኒቨርሲቲ ዘይሕልፈኒ እንተኾይኑ፣ ኣብ TVET ሞያዊ ስልጠናታት (ፖሊቴክኒክ) ኣትየ ቴክኒካዊ ክእለት ንምምሃር እንታይ ክገብር ኣለኒ?",
      en: "Since my Grade 12 results didn't pass the regular university cut-off, how do I apply for technical diploma courses at public TVET / Polytechnic colleges, and what fields are in high demand?"
    }
  },
  // Technology
  {
    id: "preset_telebirr_merchant",
    categoryId: "technology",
    title: {
      am: "የTelebirr Merchant / Partner አካውንት አከፋፈት",
      om: "Kaffaltii Telebirr Merchant akkamitti diriysu",
      so: "Diiwaan gelinta Telebirr Merchant/Partner",
      ti: "ኣከፋፍላ ሒሳብ Telebirr Merchant / Partner",
      en: "Setting up a Telebirr Partner merchant account"
    },
    question: {
      am: "ለጀመርኩት አነስተኛ የንግድ ሱቅ ደንበኞቼ በTelebirr በቀላሉ እንዲከፍሉኝ 'Telebirr Merchant' አካውንት በነጻ መክፈት እፈልጋለሁ። ሂደቱና ጥቅሞቹ ምንድን ናቸው?",
      om: "Hojii koo daldala xiqqaaf kaffaltii Telebirr Merchant saaquun barbaada, namoonni akka salphatti naaf kaffalaniif. Adeemsi isaa fi faayidaan isaa maali?",
      so: "Ganacsigeyga yar waxaan rabaa in aan u sameeyo 'Telebirr Merchant' si macaamiishu si fudud ugu bixiyaan lacagta. Maxay yihiin shuruudaha iyo faa'iidooyinku?",
      ti: "ንዝረኸብክዎ ንኡስ ሹቕ ዓማዊለይ ብTelebirr ክኸፍሉኒ 'Telebirr Merchant/Partner' ክኸፍት ደልየ። መስርሑን ረብሓታቱን እንታይ እዮም?",
      en: "I want to receive digital payments from customers using Telebirr. What is the process for a small business owner to set up a Telebirr Merchant payment tier or Telebirr Partner account?"
    }
  },
  {
    id: "preset_cv_builder",
    categoryId: "cv_builder",
    title: {
      am: "የIT እና የሶፍትዌር ባለሙያ CV ማዘጋጀት",
      om: "Akkaataa IT CV Itiyoophiyaa keessatti qopheessan",
      so: "Sida loo qoro CV-ga IT ee Itoobiya",
      ti: "ናይ IT ሞያዊ CV ኣሰራርዓ",
      en: "Technical/IT CV Draft for tech firms"
    },
    question: {
      am: "እኔ በኮምፒውተር ሳይንስ የተመረቅኩ ባለሙያ ነኝ። ለኢትዮጵያ የቴክኖሎጂ ስራ ገበያ (እንደ Safaricom/Ethio Telecom) የሚስማማ የIT CV በምሳሌ አሳይኝ።",
      om: "Barataa kompiutara sayinsii eebbifame. Akkaataa CV gaarii gabaa tech Itiyoophiyaa keessatti fudhatama qabu qopheessu danda'u naaf ibsi?",
      so: "Waxaan ahay arday bartay cilmiga ICT-ga. Sideen u qoraa CV tiknoolajiyadeed oo u qalma shirkadaha isgaarsiinta Itoobiya?",
      ti: "ኣብ ኮምፒውተር ሳይንስ ዝተመረቕኩ እየ። ንናይ ኢትዮጵያ ዕዳጋ ቴክኖሎጂ ዝበቅዕ CV ብምሳሌ ኣርእየኒ።",
      en: "Draft a high-quality ready-to-use Computer Science and Software Engineering CV tailored for entry-level applicants targeting tech giants or fintechs in Ethiopia."
    }
  },
  {
    id: "preset_interview_coach",
    categoryId: "interview_coach",
    title: {
      am: "የባንክ ሰራተኛ (Teller) ቃለ-መጠይቅ ዝግጅት",
      om: "Gaafannoo Hojii Baankii (CBE Teller Preparation)",
      so: "Isku diyaarinta Wareysiga Bangiga (CBE)",
      ti: "ናይ ባንክ ሰራሕተኛ ቃለ-መሕትት ምድላው",
      en: "CBE & private banks customer service prep"
    },
    question: {
      am: "ለንግድ ባንክ (CBE) ወይም ለሌላ የግል ባንክ የደንበኞች አገልግሎት ሰራተኛ (Teller/Customer Service) ቃለ-መጠይቅ ለማለፍ ዋና ዋና ጥያቄዎችን ከነመልሶቹ ያዘጋጁልኝ።",
      om: "Hojii baankii (CBE Teller) seenuuf gaaffilee interview dursa akka naaf qopheessitun barbaada deebii saanii waliin.",
      so: "Waxaan u sharaxan ahay shaqo bangi (CBE Teller). Fadlan ii diyaari su'aalaha ugu muhiimsan ee la weydiiyo iyo jawaabahooda habboon.",
      ti: "ንባንክ ንግዲ (CBE) ወይ ብሕታዊ ባንክ ንእሽቶ ቃለ-መሕትት ንምሕላፍ ዘድልዩ ሕቶታትን መልስታትን ክትምህሩኒ።",
      en: "What are the top 5 interview questions and key answers for a Graduate Trainee Teller or Customer Service Agent position at Commercial Bank of Ethiopia (CBE)?"
    }
  },
  {
    id: "preset_business_plan",
    categoryId: "business_plan",
    title: {
      am: "የቡና ምርት ኤክስፖርት (ላኪ) ንግድ እቅድ",
      om: "Karoora Daldala Buna Eergitootaa (Coffee Export Plan)",
      so: "Qorshe Shirkad Dhoofisa Qaxwada Itoobiya",
      ti: "ናይ ቡና ዝሙት ኤክስፖርት ንግዲ ፕላን",
      en: "Detailed Coffee Export business blueprint"
    },
    question: {
      am: "በኢትዮጵያ ውስጥ የቡና ኤክስፖርት (Export) ንግድ ለመጀመር የሚያስችል በብር የተሰላ የተሟላ የንግድ እቅድ፣ ካፒታል እና የገበያ ጥናት አዘጋጅልኝ።",
      om: "Biyya Itiyoophiyaa keessatti daldala buna eergitootaa jalqabuuf karoora daldalaa baajata birriin ta'e guutuun uumuu naaf ibsi.",
      so: "Maadaama Itoobiya caanka ku tahay qaxwaha, ii qor qorshe ganacsi oo ku saabsan sida loo unko shirkad qaxwo dhoofisa oo leh miisaaniyada Birta Itoobiya.",
      ti: "ኣብ ኢትዮጵያ ናይ ቡና ኤክስፖርት ንግዲ ንምጅማር ዝድግፍ ዝርዝር ዕቅድ ንግዲ፣ ካፒታልን መፅናዕቲ ዕዳጋን ሓገዝ።",
      en: "Provide a comprehensive coffee export business plan in Ethiopia, covering global buyers search, auction registries at ECX, licensing, and a detailed capital budgeting in Birr."
    }
  },
  {
    id: "preset_startup_advisor",
    categoryId: "startup_advisor",
    title: {
      am: "ጀማሪ የአግሮ-ቴክኖሎጂ ስታርትአፕ ምዝገባ",
      om: "Akkaataa Agro-tech Startup galmeessan",
      so: "Diiwaan-gelinta Shirkadaha beeraha e Agro-tech",
      ti: "ሓድሽ ኣግሮ-ተክኖሎጂ ስታርትኣፕ ምምዝጋብ",
      en: "Registering an Agro-tech Venture locally"
    },
    question: {
      am: "በግብርና ላይ ያተኮረ የቴክኖሎጂ ፈጠራ ስራ (Agrotech Startup) በኢትዮጵያ አዲሱ የስታርትአፕ አዋጅ መሰረት እንዴት መመዝገብ፣ መሰየም እና የመነሻ በጀት ማግኘት እችላለሁ?",
      om: "Kalaqa teeknoolojii qonnaa irratti xiyyeeffate (Agrotech) akkamitti labsii haaraa jalatti galmeessanii fi maallaqa argachuun danda'ama?",
      so: "Sideen u diiwaan-gelin karaa shirkad yar oo tiknoolajiyada beeraha adeegsata (Agro-tech) si waafaqsan shuruucda cusub ee Itoobiya?",
      ti: "ኣብ ሕርሻ ዝተመርኮሰ ናይ ቴክኖሎጂ ፈጠራ ስራሕ (Agrotech Startup) ከመይ ጌርና ክነመዝግብን ክነሳልጦን ንኽእል?",
      en: "What is the process to legally register and license an innovative agricultural tech startup (Agro-tech) in Addis Ababa under the modern Ministry of Innovation and Technology framework?"
    }
  },
  {
    id: "preset_tourism_guide",
    categoryId: "tourism_guide",
    title: {
      am: "የሰሜን ኢትዮጵያ ታሪካዊ ቦታዎች ጉዞ",
      om: "Gorsa Turizimii Bakkeewwan Kaaba Itiyoophiyaa",
      so: "Hagaha Safarka ee Lalibela iyo Gondar",
      ti: "ናይ ሰሜን ኢትዮጵያ ታሪካዊ ክሊታት ጉዞ",
      en: "Northern Historic Route Guide (Lalibela/Gondar)"
    },
    question: {
      am: "ወደ ላሊበላ ውቅር አብያተ ክርስቲያናት እና ወደ ጎንደር ፋሲለደስ ግንብ ለሚሄድ የውጭ ዜጋም ሆነ የአገር ውስጥ ጎብኚ የሚሆን ታሪካዊ መረጃ እና የላቀ የጉዞ መርሃግብር አዘጋጅ።",
      om: "Bakkeewwan seena qabeeyyii kaaba Itiyoophiyaa (Lalibela fi Gondar) daawwachuuf karoora safaraa fi seenaa isaanii gaggabaabsanii naaf ibsi.",
      so: "Fadlan ii sameey diyaar-garow buuxa oo lagu tagayo goobaha taariikhiga ah ee Lalibela iyo madaxtooyada Gondar, adoo faahfaahinaya asalka taariikheed.",
      ti: "ናብ ታሪካዊ ቦታታት ላሊበላን ጎንደርን ንዝግበር ዑደት ዝኸውን ባህላዊ መግለጺን ዝርዝር መገሻን መምርሒ።",
      en: "Generate a descriptive 3-day itinerary for exploring the Rock-Hewn Churches of Lalibela and the Fasil Ghebbi royal enclosure in Gondar, with cultural highlights."
    }
  },
  {
    id: "preset_translator",
    categoryId: "translator",
    title: {
      am: "የውል ስምምነት ሰነዶችን የመተርጎም ዘዴ",
      om: "Akkaataa Sanadoota Seeraa Hiikan (Translation)",
      so: "Sida loo turjumo heshiisyada rasmiga ah",
      ti: "ናይ ውዕል ሰነዳት ናይ ምትርጓም እስትራቴጂ",
      en: "Contract Agreement high-fidelity translation"
    },
    question: {
      am: "ኦፊሴላዊ የኪራይ ወይም የስራ ውል ስምምነት ሰነድ ከእንግሊዝኛ ወደ አማርኛ፣ ኦሮምኛ ወይም ትግርኛ በታማኝነት ስንተረጉም ምን መከተል አለብን? የትርጉም ምሳሌዎች ስጠኝ።",
      om: "Sanada seeraa kireeffannoo ykn hojii afaan ingiliffaa irraa gara afaanota Itiyoophiyaatti sirnaan hiikuuf maaltu barbaachisa? Fakkeenya waliin naaf ibsi.",
      so: "Marka aan turjumeyno dukumentiyada heshiisyada ganacsi ee rasmiga ah ee u dhexeeya Af-Ingiriisiga iyo Af-Soomaaliga, qaabkee ugu badbaado badan oo loo qoro?",
      ti: "ወግዓዊ ናይ ውዕል ሰነዳት ፅሑፍ ካብ ኢንግሊሽ ናብ ውሽጣዊ ቋንቋታት ክንትርጉም ከለና እንታይ ሕግታት ክንክተል ኣለና? ኣብነት ሃቡኒ።",
      en: "Provide professional rules and context validation samples for translating standard business contracts and corporate leases between English and local languages."
    }
  },
  {
    id: "preset_idea_generator",
    categoryId: "idea_generator",
    title: {
      am: "በማዳበሪያና ሰብል እሴት-ጨማሪ ስራዎች",
      om: "Kalaqa Oomisha Qonnaa (Value addition)",
      so: "Fikradda Kordhinta Qiimaha Dalagyada",
      ti: "ኣብ ፍርያት ፅሬት ወይ መወሳኺ ዋጋ ምውሳኽ",
      en: "Teff & agricultural value-addition concepts"
    },
    question: {
      am: "በኢትዮጵያ ውስጥ ባነሰ ካፒታል በግብርና ምርቶች ላይ እሴት በመጨመር (Value Addition) ለምሳሌ ጤፍን ፈጭቶ በማሸግ ወይም የቅመማ ቅመም ምርቶች ላይ ወደ ገበያ መግቢያ የሃሳብ ዝርዝር አቅርብ።",
      om: "Oomishaalee qonnaa gabaadhaaf dhiyeessuf ulaagaalee dabalataa (Value Addition) uumuu gaggabaabsanii naaf ibsi, fakkeenya teff argachuu.",
      so: "Fadlan soo saar fikrado lagu kordhinayo qiimaha dalagyada maxaliga ah sida teff ee la warshadeeyo laguna iibiyo magaalada Addis Ababa.",
      ti: "ኣብ ፍርያት ሕርሻ (ንኣብነት ፃዕዳ ጤፍ) መሸገታትን ምጽራይን ብምግባር ተረባሒ ንምዃን ዘድልዩ ዝርዝር ሓሳባት ፈጠራ።",
      en: "Propose 3 highly creative business ideas based on agricultural value-addition (e.g., packaged organic Teff flour, clean spice mixes) for domestic and regional delivery."
    }
  },
  {
    id: "preset_research_assistant",
    categoryId: "research_assistant",
    title: {
      am: "የምግብ ዋጋ ግሽበት (Inflation) ምርምር",
      om: "Qorannoo Gabaasa Hidhata Gatiin (Inflation Research)",
      so: "Daraasadda Sicir bararka Raashinka ee Itoobiya",
      ti: "ናይ ምግቢ ዋጋ ወሰኽ (ግሽበት) ምርምር",
      en: "Socio-economic research on Food Inflation"
    },
    question: {
      am: "በባለፉት ዓመታት በኢትዮጵያ ከተሞች የነበረውን የምግብ ዋጋ ግሽበት (Food Inflation) መንስዔዎች እና መፍትሔዎች የሚያጠና የጥናት ጽሑፍ ንድፍ (Research Proposal Outline) አዘጋጅ።",
      om: "Waraqaa qorannoo dhimma hidhata gatii nyaataa magaalaalee Itiyoophiyaa keessatti mul'atu irratti outline naaf qopheessi.",
      so: "Diyaari qaab-dhismeedka cilmi-baaris (Research Proposal Outline) oo lagu baarayo sicir-bararka culeyska ku haya dadka ku nool magaalooyinka Itoobiya.",
      ti: "ኣብ ከተማታት ኢትዮጵያ ዘሎ ዝተጋደደ ናይ ምግቢ ዋጋ ወሰኽ (ግሽበት) መፍትሒ ዝምርምር ውፅኢታዊ መደብ መፅናዕቲ ኣርእስትታት ኣዳሉ።",
      en: "Outline a complete socio-economic research proposal studying the leading drivers of food supply chain inflation in urban hubs of Ethiopia."
    }
  },
  {
    id: "preset_freelancer_assistant",
    categoryId: "freelancer_assistant",
    title: {
      am: "ውጭ አገር ካሉ ደንበኞች ክፍያ የመቀበያ መንገዶች",
      om: "Akkaataa Kaffaltii Freelance Biyya Alaa Fudhatan",
      so: "Hababka Lacagaha Caalamiga ah loo qaato",
      ti: "ካብ ወፃኢ ደንበኛታት ክፍሊት ምቕባል መገድታት",
      en: "International payments integration for freelancers"
    },
    question: {
      am: "በUpwork ወይም በሌሎች ድረገጾች ለሚሰሩ የኢትዮጵያ ፍሪላንሰሮች ከውጭ አገር ደንበኞች ክፍያዎችን በቀላል ሰነዶች ወደ CBE ወይም ቴሌብር ለማስተላለፍ ምን የተሻሉ መንገዶች አሉ?",
      om: "Kaffaltii hojii freelance biyya alaa irraa dhufe akkamitti gara CBE fi Telebirr salphatti akka daddabarsuf karaan jiru maali?",
      so: "Sida ugu habboon ee dadka iskiis u shaqeysta (Freelancers) ee Itoobiya jooga ay lacag loogu soo diri karo, loona waafajin karo bangiyada maxaliga ah?",
      ti: "ኣብ ፍሪላንስ መድረኻት ንዝሰርሑ ሰባት ካብ ወፃኢ ደንበኛታት ዝመፅእ ሒሳብ ብቐሊሉ ናብ ባንክ ንምእታው እንታይ ኣማራጺታት ኣለዉ?",
      en: "What are the legal compliance steps, intermediary digital wallets, and banking channels for Ethiopian freelancers to receive international contracting revenues directly into CBE or Telebirr?"
    }
  },
  {
    id: "preset_innovation_hub",
    categoryId: "innovation_hub",
    title: {
      am: "የቴሌብር ኤፒአይ (Telebirr API) ኮድ አቀናጃጀት",
      om: "Koodingii Telebirr API Integration",
      so: "Ku darista Telebirr API e Koodka Node.js",
      ti: "ናይ ቴሌብር API ኣጠቓቕማ ኮዲንግ",
      en: "Node.js Telebirr Merchant SDK Integration"
    },
    question: {
      am: "የቴሌብር ክፍያ መቀበያ ሲስተም (Telebirr Merchant Integration API) በ Express.js ድረ-ገጽ ላይ ለመገንባት የሚያስችል ዝግጁ የጃቫስክሪፕት ኮድ (Javascript Sample) እና መማሪያ ስጠኝ።",
      om: "Koodii sirna kaffaltii Telebirr Merchant API sassaabu danda'u Node.js Express fageessuun naaf kenni.",
      so: "Fadlan ii qor tusaale koodh Node.js oo lagu samaynayo diyaarinta lacag la bixinta qaabka Telebirr Merchant API.",
      ti: "ናይ ቴሌብር ክፍሊት መቀበሊ API ን Express.js መርበብ ሓበሬታ ከመይ ጌርና ከነተዓራርቖ ንኽእል? መተግበሪ ረብሓ ሓበሬታ ሃቡኒ።",
      en: "Provide a secure Express.js routes controller sample demonstrating how to construct request payloads to the Telebirr API and verify decryption webhook signatures."
    }
  }
];

export const INTERFACE_TEXTS: Record<string, Record<LanguageCode, string>> = {
  specializedAiModules: {
    am: "ልዩ የፈጠራ AI ረዳት ሞጁሎች",
    om: "Mootorota Gargaaraa AI Speshala",
    so: "Aaladaha Gaarka ah ee AI",
    ti: "ናይ AI ፍሉያት ፈጠራዊ ሓገዝቲ",
    en: "Specialized AI Modules"
  },
  headerTitle: {
    am: "ግርማዊክ የኢትዮጵያ AI ረዳት",
    om: "GIRMAIC Gargaaraa AI Itiyoophiyaa",
    so: "GIRMAIC Caawiyaha AI ee Itoobiya",
    ti: "ግርማዊክ ናይ ኢትዮጵያ AI ረዳት",
    en: "GIRMAIC Ethiopia AI Helper"
  },
  headerSubtitle: {
    am: "ለኢትዮጵያውያን የዕለት ተዕለት ችግሮች መፍትሄ — በ5 ቋንቋዎች",
    om: "Furmaata rakkoolee guyya guyyaa Hawaasa Itiyoophiyaaf — Afaanota 5n",
    so: "Xalka caqabadaha maalinla ah ee Itoobiyaanka — 5 Luuqadood",
    ti: "ንኢትዮጵያውያን መፍትሒ ናይ ዕለት ተዕለት ጸገማት — ብ5 ቋንቋታት",
    en: "Solving daily challenges for Ethiopians — structured solutions in 5 languages"
  },
  introCardTitle: {
    am: "እንኳን ደህና መጡ! እኔ ግርማዊክ ነኝ",
    om: "Baga Nagaan Duftan! Ani GIRMAIC dha",
    so: "Ku soo dhowow! Anigu waa GIRMAIC",
    ti: "እንቋዕ ብደሓን መጻእኩም! ኣነ ግርማዊክ እየ",
    en: "Welcome! I am GIRMAIC, your companion"
  },
  introCardBody: {
    am: "በስራ፣ በትምህርት፣ በግብርና፣ በንግድ እና በመንግስት አገልግሎቶች ዙሪያ ያሉዎትን ማንኛውንም ጥያቄዎች ይጠይቁኝ። ዝርዝር እቅዶችን፣ ሰነዶችን እና አማራጭ መንገዶችን አዘጋጅቼ አግዝዎታለሁ።",
    om: "Hojii, Barnoota, Qonnaa, Daldalaa fi tajaajila mootummaa gubbaa gaaffii qabdan hunda na gaafadhaa. Sanadoota barbaachisanii fi karaan dabalataa siif qopheessa.",
    so: "I weydii su'aal kasta oo ku saabsan shaqooyinka, waxbarashada, beeraha, ganacsiga ama adeegyada dawladda. Waxaan kuu diyaarin doonaa tillaabooyin cad, dukumentiyo iyo xalal beddel ah.",
    ti: "ኣብ ስራሕ፣ ትምህርቲ፣ ሕርሻ፣ ንግድን ኣገልግሎት መንግስትን ዘለኩም ዝኾነ ሕቶታት ሕተቱኒ። ዝርዝር ሰነዳትን ኣማራጺ መገድታትን ኣዳልየ ክሕግዘኩም እየ።",
    en: "Ask me anything about jobs, education, agriculture, small businesses, or public administration in Ethiopia. I will generate step-by-step practical steps, document requirements, and local advice."
  },
  selectLanguage: {
    am: "ቋንቋ ይምረጡ / Select Language",
    om: "Afaan Filadhu / Select Language",
    so: "Dooro Luuqadda / Select Language",
    ti: "ቋንቋ ይምረጡ / Select Language",
    en: "Choose Language / Select Language"
  },
  selectCategory: {
    am: "የጥያቄዎን ዘርፍ ይምረጡ",
    om: "Zonii gaaffii keessanii filadhaa",
    so: "Dooro Qaybta Gaaffigaaga",
    ti: "ዓውዲ ሕቶኹም ይምረጡ",
    en: "Select information category"
  },
  askAQuestion: {
    am: "ጥያቄዎን እዚህ ይጻፉ",
    om: "Gaaffii keessan asitti barreessaa",
    so: "Ku qor su'aashaada halkan",
    ti: "ሕቶኹም ኣብዚ ጽሓፉ",
    en: "Write your question here"
  },
  placeholderInput: {
    am: "ለምሳሌ፡- የቀበሌ መታወቂያ እንዴት ማውጣት እችላለሁ?...",
    om: "Fakkeenyaaf: Akkamittan waraqaa eenyummaa gandaa baasuu danda'a?...",
    so: "Tusaale: Sideen u heli karaa kaarka aqoonsiga Kebele-ka?...",
    ti: "ንኣብነት፡- መንነት ወረቐት ቀበሌ ከመይ ገይረ ከውጽእ ይኽእል?...",
    en: "e.g., How can I register for a business license in Addis Ababa?..."
  },
  btnSubmit: {
    am: "AI ረዳቱን ጠይቅ",
    om: "GIRMAIC Gaafadhu",
    so: "Weydii GIRMAIC",
    ti: "ንGIRMAIC ሕተቱ",
    en: "Ask GIRMAIC AI"
  },
  btnSubmitting: {
    am: "በመፈለግ ላይ...",
    om: "Barbaadaa jira...",
    so: "Raadinaya...",
    ti: "ኣብ ምድላይ...",
    en: "Analyzing with AI..."
  },
  requiredDocs: {
    am: "የሚያስፈልጉ ሰነዶች እና መያዣዎች",
    om: "Sanadoota fi ragaalee barbaachisan",
    so: "Dokumentiyada la rabo & Agabka",
    ti: "ዘድልዩ ሰነዳትን ቀረባትን",
    en: "Required Documents or Materials"
  },
  stepsGuide: {
    am: "ደረጃ በደረጃ መመሪያ",
    om: "Tarkaanfii tarkaanfitti gorsa",
    so: "Tillaabo-tillaabo hagidda",
    ti: "ደረጃ ብደረጃ መምርሒ",
    en: "Step-by-Step Guidance"
  },
  nextActions: {
    am: "ተግባራዊ ቀጣይ እርምጃዎች",
    om: "Tarkaanfilee qabatamaa itti aanan",
    so: "Tillaabooyinka ficilka ah ee xiga",
    ti: "ተግባራዊ ቅልጡፍ ስጉምትታት",
    en: "Practical Next Actions"
  },
  alternatives: {
    am: "አማራጭ መፍትሄዎች",
    om: "Karaalee furmaataa dabalataa",
    so: "Xalal beddelka ah oo jira",
    ti: "ኣማራጺ መፍትሒታት",
    en: "Alternative Solutions"
  },
  followUpTitle: {
    am: "የሚቀጥሉ ተዛማጅ ጥያቄዎች",
    om: "Gaaffilee dabalataa deebii fidan",
    so: "Su'aalaha kale ee la xiriira",
    ti: "ተዛመድቲ ተኸታተልቲ ሕቶታት",
    en: "Suggested Follow-up Questions"
  },
  presetHeading: {
    am: "የተለመዱ አብነታዊ ጥያቄዎች",
    om: "Gaaffilee baramoof fakkeenya",
    so: "Su'aalaha caanka ah ee tusaalaha ah",
    ti: "ብተደጋጋሚ ዝሕተቱ ኣብነታዊ ሕቶታት",
    en: "Common Featured Topics in Ethiopia"
  },
  clearedChat: {
    am: "ውይይቱን አዲስ ጀምር",
    om: "Waliin hasaa haaraa eegali",
    so: "Nadiifi Wadahadalka",
    ti: "ውይይት ሓድሽ ጀምር",
    en: "Reset Consultation"
  },
  disclaimer: {
    am: "ማሳሰቢያ፡- ይህ የGIRMAIC AI ረዳት ነው። መረጃዎቹ በአገር ውስጥ ህጎችና አሰራሮች ላይ ተመስርተው የሚዘጋጁ ቢሆንም፣ ወሳኝ ውሳኔዎችን ከመወሰንዎ በፊት የሚመለከተውን የመንግስት አካል ይጠይቁ።",
    om: "Hubachiisa: Kun gargaaraa GIRMAIC AI dha. Odeeffannoon isaa labsii fi sirna biyyaalessaa irratti hundaa'us, murtee raawwachuun dura bilisaan ogeessa gaafadhaa.",
    so: "Fidmo: Caawiyahan waa GIRMAIC AI. Inkastoo aad loogu kalsoonaan karo habraacyada Itoobiya, fadlan had iyo jeer la xiriir xafiisyada rasmiga ah kahor go'aamada muhiimka ah.",
    ti: "መተሓሳሰቢ፡- እዚ ናይ GIRMAIC AI ረዳት እዩ። ሓበሬታታት ኣብ ውሽጢ ሃገር ሕግታትን ኣሰራርሓን ዝተመርኮሱ ክኾኑ ከለዉ፣ ቅድሚ ወሳኒ ስጉምቲ ምውሳድኩም ነቲ ዝምልከቶ ሃገራዊ ኣካል ኣረጋግጹ።",
    en: "Disclaimer: This is the official GIRMAIC AI assistant. While advice is tailored to local realities, please consult corresponding authorities before undertaking critical legal or financial actions."
  },
  chatHistoryHeader: {
    am: "የውይይት ታሪክ",
    om: "Seenaa marii",
    so: "Taariikhda Wadahadalka",
    ti: "ታሪክ ጉዕዞ ውይይት",
    en: "Consultation Log"
  },
  noResultText: {
    am: "ጥያቄዎን ከላይ በመምረጥ ወይም በመጻፍ ስራዎችን፣ የንግድ አሰራሮችን፣ የመንግስት ሰነዶችን እና በርካታ መረጃዎችን ደረጃ በደረጃ ያግኙ።",
    om: "Gaaffii keessan gubbaatti barreessuun hojii, daldalaa fi tajaajila mootummaa tarkaanfii guutuun asitti argadhaa.",
    so: "Ku weydii su'aashaada xagga sare si aad halkan uga hesho tillaabooyin faahfaahsan, dukumentiyada loo baahan yahay iyo xalalka rasmiga ah.",
    ti: "ሕቶኹም ኣብ ላዕሊ ብምጽሓፍ ዝርዝር ስራሕቲ፣ ሰነዳት መንግስትን ኣማራጺ መገድታትን ደረጃ ብደረጃ ኣብዚ ምርካብ ይከኣል።",
    en: "Enter or select a topic above to generate step-by-step guidance, required documents, alternative solutions, and clear guidance tailored for Ethiopia."
  },
  explanationTitle: {
    am: "GIRMAIC's ቀላል ማብራሪያ",
    om: "Ibsa salphaa GIRMAIC",
    so: "Sharaxaadda fudud ee GIRMAIC",
    ti: "ናይ GIRMAIC ቀሊል መብርሂ",
    en: "GIRMAIC's Simplified Breakdown"
  },
  voiceInputTooltip: {
    am: "በድምፅ ለመጠየቅ ይጫኑ",
    om: "Sagaleen gaafachuuf cuqaasi",
    so: "Girigiri si aad cod ugu weydiso",
    ti: "ብድምጺ ንምሕታት ነዚ ጠውቑ",
    en: "Speak with Voice"
  },
  voiceListening: {
    am: "እያዳመጥኩ ነው... ይናገሩ",
    om: "Dhaggeeffachaa jira... dubbadhu",
    so: "Waan dhageysanayaa... hadal",
    ti: "ኣብ ምስማዕ እዩ... ይዛረቡ",
    en: "Listening... speak now"
  },
  voiceUnsupported: {
    am: "የድምፅ ግብዓት በእርስዎ ማሰሻ ውስጥ አልተደገፈም።",
    om: "Sagaleen brawusariin keessan hin deeggaramu.",
    so: "Cod-galka laguma taageerayo birawsarkaan.",
    ti: "ብድምጺ ምሕታት ኣብዚ መዳሰሲ ኣይሰርሕን እዩ።",
    en: "Speech input not supported/allowed in this browser."
  },
  listenButton: {
    am: "በድምፅ ያዳምጡ",
    om: "Sagaleen dhaggeeffadhu",
    so: "Cod ku dhageyso",
    ti: "ብድምጺ ስምዑ",
    en: "Listen to Response"
  },
  stopListenButton: {
    am: "ድምፅ ያቁሙ",
    om: "Sagalee dhaabi",
    so: "Codka jooji",
    ti: "ድምጺ ኣቋርጽ",
    en: "Stop Audio"
  },
  speechSettings: {
    am: "የድምፅ ቅንብሮች",
    om: "Sajaa'aa Sagalee",
    so: "Hagaajinta Codka",
    ti: "ናይ ድምጺ ምድላዋት",
    en: "Voice Control Hub"
  },
  speechSpeed: {
    am: "የድምፅ ፍጥነት",
    om: "Saffisa Sagalee",
    so: "Xawaaraha Codka",
    ti: "ናይ ድምጺ ቅልጣፈ",
    en: "Reading Speed"
  },
  speedSlow: {
    am: "ቀስ ያለ",
    om: "Suuta",
    so: "Yabis",
    ti: "ዝሑል (ቀስ)",
    en: "Slow Voice"
  },
  speedNormal: {
    am: "መደበኛ",
    om: "Idilee",
    so: "Caadi",
    ti: "ስሩዕ",
    en: "Normal Voice"
  },
  autoReadText: {
    am: "ሁልጊዜ መልሱን በድምፅ አንብብልኝ",
    om: "Yeroo hunda deebii sagaleen dubbisi",
    so: "Had iyo jeer cod ku akhri jawaabta",
    ti: "ኩሉ ግዜ መልሲ ብድምጺ ኣንብበለይ",
    en: "Auto-read new responses"
  }
};
