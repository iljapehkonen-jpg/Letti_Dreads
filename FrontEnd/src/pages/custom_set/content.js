const INSTAGRAM_URL = "https://www.instagram.com/letti_dreads/";
const CONTACTS_URL = "/contacts";

const copy = {
  en: {
    navLabel: "Create your set",
    homeBadge: "Custom design",
    homeTitle: "Create your own unique set",
    homeText:
      "We can create a custom set just for you. Send us a photo, an inspiring reference or an exact palette, and we will help shape a set that feels truly yours.",
    homeCta: "Create your unique set",
    pageTitle: "Create your own unique set",
    pageIntro:
      "A custom order is perfect when you already have a vision in mind. We can recreate the mood from a reference photo, build a palette around your favourite tones and refine the final result together with you.",
    pageButton: "Contact us to create your unique set",
    instagramButton: "Write to us on Instagram",
    contactsButton: "Open contact page",
    processTitle: "How we build a custom set",
    processSteps: [
      "Send us a reference photo, screenshot or inspiration image.",
      "Tell us the shades, mood and details you want to keep.",
      "We prepare a personalised set proposal and guide you to the final order.",
    ],
    cards: [
      {
        title: "From your photo",
        text: "If you send us a photo, we can create a set inspired by its shape, tone and overall feeling.",
        image: "/homNav/Rastat.jpg",
      },
      {
        title: "From an exact palette",
        text: "If colour matters most, we can build your set around a precise palette and matching transitions.",
        image: "/homNav/Kiharat.jpg",
      },
      {
        title: "With your own details",
        text: "We can also combine lengths, texture and decorative ideas so the result feels personal and unique.",
        image: "/homNav/Letit.jpg",
      },
    ],
  },
  fi: {
    navLabel: "Luo oma setti",
    homeBadge: "Uniikki suunnittelu",
    homeTitle: "Tee oma uniikki settisi",
    homeText:
      "Voimme luoda sinulle täysin yksilöllisen setin. Lähetä meille kuva, inspiraatioreferenssi tai tarkka väripaletti, niin suunnittelemme kokonaisuuden juuri sinulle.",
    homeCta: "Luo oma uniikki settisi",
    pageTitle: "Tee oma uniikki settisi",
    pageIntro:
      "Yksilöllinen tilaus sopii täydellisesti silloin, kun sinulla on jo oma visio mielessä. Voimme rakentaa setin referenssikuvan tunnelman, tarkan väripaletin tai omien toiveidesi pohjalta ja viimeistellä kokonaisuuden yhdessä kanssasi.",
    pageButton: "Ota yhteyttä ja luodaan sinulle uniikki setti",
    instagramButton: "Kirjoita meille Instagramissa",
    contactsButton: "Avaa yhteystiedot",
    processTitle: "Näin uniikki setti rakennetaan",
    processSteps: [
      "Lähetä meille referenssikuva, kuvakaappaus tai inspiraatiokuva.",
      "Kerro meille haluamasi sävyt, tunnelma ja tärkeät yksityiskohdat.",
      "Valmistamme sinulle henkilökohtaisen ehdotuksen ja ohjaamme sinut lopulliseen tilaukseen.",
    ],
    cards: [
      {
        title: "Setti kuvan perusteella",
        text: "Jos lähetät meille kuvan, voimme suunnitella sen tunnelmaa, muotoa ja värimaailmaa vastaavan setin.",
        image: "/homNav/Rastat.jpg",
      },
      {
        title: "Setti tarkan paletin mukaan",
        text: "Jos värit ovat tärkein osa, voimme rakentaa setin tarkan paletin ja pehmeiden sävyvaihtelujen ympärille.",
        image: "/homNav/Kiharat.jpg",
      },
      {
        title: "Omat yksityiskohdat mukaan",
        text: "Voimme yhdistää pituuden, tekstuurin ja koristeelliset ideat, jotta lopputulos tuntuu aidosti omalta.",
        image: "/homNav/Letit.jpg",
      },
    ],
  },
  ru: {
    navLabel: "Создать свой комплект",
    homeBadge: "Индивидуальный дизайн",
    homeTitle: "Создай свой уникальный комплект",
    homeText:
      "Мы можем создать для вас полностью индивидуальный комплект. Пришлите нам фотографию, референс или точную палитру, и мы соберём вариант именно под вашу идею.",
    homeCta: "Создать свой уникальный комплект",
    pageTitle: "Создай свой уникальный комплект",
    pageIntro:
      "Индивидуальный заказ подходит, если у вас уже есть идея или конкретное вдохновение. Мы можем собрать комплект по фотографии, по нужной палитре или по вашим пожеланиям к длине, фактуре и настроению образа.",
    pageButton: "Свяжитесь с нами, чтобы мы создали ваш уникальный комплект",
    instagramButton: "Написать нам в Instagram",
    contactsButton: "Открыть страницу контактов",
    processTitle: "Как мы создаём индивидуальный комплект",
    processSteps: [
      "Пришлите нам фотографию, скриншот или пример, который вам нравится.",
      "Расскажите, какие оттенки, настроение и детали для вас особенно важны.",
      "Мы подготовим персональное предложение и поможем перейти к оформлению вашего комплекта.",
    ],
    cards: [
      {
        title: "Комплект по вашей фотографии",
        text: "Если вы пришлёте нам фотографию, мы сможем создать комплект по её настроению, форме и цветовой идее.",
        image: "/homNav/Rastat.jpg",
      },
      {
        title: "Комплект по точной палитре",
        text: "Если для вас важнее всего цвет, мы можем собрать комплект по точной палитре и нужным переходам оттенков.",
        image: "/homNav/Kiharat.jpg",
      },
      {
        title: "Комплект с вашими деталями",
        text: "Мы можем учесть длину, фактуру и декоративные акценты, чтобы результат получился действительно вашим.",
        image: "/homNav/Letit.jpg",
      },
    ],
  },
  de: {
    navLabel: "Eigenes Set erstellen",
    homeBadge: "Individuelles Design",
    homeTitle: "Erstelle dein eigenes einzigartiges Set",
    homeText:
      "Wir können ein individuelles Set nur für dich erstellen. Schicke uns ein Foto, eine Referenz oder eine genaue Farbpalette, und wir gestalten ein Set nach deiner Idee.",
    homeCta: "Eigenes einzigartiges Set erstellen",
    pageTitle: "Erstelle dein eigenes einzigartiges Set",
    pageIntro:
      "Eine individuelle Bestellung ist ideal, wenn du bereits eine klare Vorstellung hast. Wir können die Stimmung eines Referenzfotos aufgreifen, eine genaue Farbpalette umsetzen und das Ergebnis gemeinsam mit dir verfeinern.",
    pageButton: "Kontaktiere uns, damit wir dein einzigartiges Set erstellen",
    instagramButton: "Schreibe uns auf Instagram",
    contactsButton: "Kontaktseite öffnen",
    processTitle: "So entsteht dein individuelles Set",
    processSteps: [
      "Sende uns ein Referenzfoto, einen Screenshot oder ein Inspirationsbild.",
      "Erzähle uns, welche Farben, Stimmung und Details dir wichtig sind.",
      "Wir erstellen einen persönlichen Vorschlag und begleiten dich bis zur finalen Bestellung.",
    ],
    cards: [
      {
        title: "Set nach deinem Foto",
        text: "Wenn du uns ein Foto schickst, können wir ein Set nach seiner Form, Stimmung und Farbidee gestalten.",
        image: "/homNav/Rastat.jpg",
      },
      {
        title: "Set nach genauer Palette",
        text: "Wenn Farbe das Wichtigste ist, können wir dein Set nach einer genauen Palette und passenden Übergängen aufbauen.",
        image: "/homNav/Kiharat.jpg",
      },
      {
        title: "Set mit deinen Details",
        text: "Wir können Länge, Textur und dekorative Details kombinieren, damit das Ergebnis wirklich persönlich wirkt.",
        image: "/homNav/Letit.jpg",
      },
    ],
  },
  fr: {
    navLabel: "Créer ton set",
    homeBadge: "Design personnalisé",
    homeTitle: "Crée ton set unique",
    homeText:
      "Nous pouvons créer un set entièrement personnalisé pour toi. Envoie-nous une photo, une référence ou une palette précise, et nous concevrons un set selon ton idée.",
    homeCta: "Créer ton set unique",
    pageTitle: "Crée ton set unique",
    pageIntro:
      "Une commande personnalisée est parfaite si tu as déjà une vision claire. Nous pouvons recréer l'ambiance d'une photo de référence, construire une palette précise et finaliser le résultat avec toi.",
    pageButton: "Contacte-nous pour créer ton set unique",
    instagramButton: "Écris-nous sur Instagram",
    contactsButton: "Ouvrir la page contact",
    processTitle: "Comment nous créons un set personnalisé",
    processSteps: [
      "Envoie-nous une photo de référence, une capture d'écran ou une image d'inspiration.",
      "Dis-nous quelles teintes, quelle ambiance et quels détails tu veux garder.",
      "Nous préparons une proposition personnalisée et t'accompagnons jusqu'à la commande finale.",
    ],
    cards: [
      {
        title: "Set d'après ta photo",
        text: "Si tu nous envoies une photo, nous pouvons créer un set inspiré par sa forme, son ambiance et son idée de couleur.",
        image: "/homNav/Rastat.jpg",
      },
      {
        title: "Set selon une palette précise",
        text: "Si la couleur est l'élément principal, nous pouvons créer ton set autour d'une palette exacte et de transitions harmonieuses.",
        image: "/homNav/Kiharat.jpg",
      },
      {
        title: "Set avec tes détails",
        text: "Nous pouvons combiner longueur, texture et détails décoratifs pour un résultat vraiment personnel.",
        image: "/homNav/Letit.jpg",
      },
    ],
  },
  it: {
    navLabel: "Crea il tuo set",
    homeBadge: "Design personalizzato",
    homeTitle: "Crea il tuo set unico",
    homeText:
      "Possiamo creare un set completamente personalizzato per te. Inviaci una foto, un riferimento o una palette precisa e realizzeremo un set basato sulla tua idea.",
    homeCta: "Crea il tuo set unico",
    pageTitle: "Crea il tuo set unico",
    pageIntro:
      "Un ordine personalizzato è perfetto se hai già una visione chiara. Possiamo ricreare l'atmosfera di una foto di riferimento, costruire una palette precisa e rifinire il risultato insieme a te.",
    pageButton: "Contattaci per creare il tuo set unico",
    instagramButton: "Scrivici su Instagram",
    contactsButton: "Apri la pagina contatti",
    processTitle: "Come creiamo un set personalizzato",
    processSteps: [
      "Inviaci una foto di riferimento, uno screenshot o un'immagine di ispirazione.",
      "Dicci quali tonalità, atmosfera e dettagli vuoi mantenere.",
      "Prepariamo una proposta personalizzata e ti guidiamo fino all'ordine finale.",
    ],
    cards: [
      {
        title: "Set dalla tua foto",
        text: "Se ci invii una foto, possiamo creare un set ispirato alla sua forma, al tono e all'atmosfera generale.",
        image: "/homNav/Rastat.jpg",
      },
      {
        title: "Set da una palette precisa",
        text: "Se il colore è la cosa più importante, possiamo costruire il tuo set attorno a una palette precisa e a transizioni armoniose.",
        image: "/homNav/Kiharat.jpg",
      },
      {
        title: "Set con i tuoi dettagli",
        text: "Possiamo combinare lunghezza, texture e dettagli decorativi per un risultato davvero personale.",
        image: "/homNav/Letit.jpg",
      },
    ],
  },
  el: {
    navLabel: "Δημιούργησε το σετ σου",
    homeBadge: "Προσωποποιημένο σχέδιο",
    homeTitle: "Δημιούργησε το δικό σου μοναδικό σετ",
    homeText:
      "Μπορούμε να δημιουργήσουμε ένα πλήρως εξατομικευμένο σετ για εσένα. Στείλε μας μια φωτογραφία, μια αναφορά ή μια ακριβή παλέτα και θα το σχεδιάσουμε σύμφωνα με την ιδέα σου.",
    homeCta: "Δημιούργησε το μοναδικό σου σετ",
    pageTitle: "Δημιούργησε το δικό σου μοναδικό σετ",
    pageIntro:
      "Μια εξατομικευμένη παραγγελία είναι ιδανική όταν έχεις ήδη μια σαφή ιδέα. Μπορούμε να αναπαράγουμε την αίσθηση μιας φωτογραφίας αναφοράς, να χτίσουμε μια ακριβή παλέτα και να τελειοποιήσουμε το αποτέλεσμα μαζί σου.",
    pageButton: "Επικοινώνησε μαζί μας για να δημιουργήσουμε το μοναδικό σου σετ",
    instagramButton: "Στείλε μας μήνυμα στο Instagram",
    contactsButton: "Άνοιγμα σελίδας επικοινωνίας",
    processTitle: "Πώς δημιουργούμε ένα εξατομικευμένο σετ",
    processSteps: [
      "Στείλε μας μια φωτογραφία αναφοράς, ένα screenshot ή μια εικόνα έμπνευσης.",
      "Πες μας ποιες αποχρώσεις, ποια αίσθηση και ποιες λεπτομέρειες θέλεις να κρατήσεις.",
      "Ετοιμάζουμε μια προσωπική πρόταση και σε καθοδηγούμε μέχρι την τελική παραγγελία.",
    ],
    cards: [
      {
        title: "Σετ από τη φωτογραφία σου",
        text: "Αν μας στείλεις μια φωτογραφία, μπορούμε να δημιουργήσουμε ένα σετ βασισμένο στο σχήμα, την αίσθηση και την ιδέα του χρώματος.",
        image: "/homNav/Rastat.jpg",
      },
      {
        title: "Σετ από ακριβή παλέτα",
        text: "Αν το χρώμα είναι το πιο σημαντικό, μπορούμε να φτιάξουμε το σετ σου γύρω από μια ακριβή παλέτα και ομαλές μεταβάσεις.",
        image: "/homNav/Kiharat.jpg",
      },
      {
        title: "Σετ με τις δικές σου λεπτομέρειες",
        text: "Μπορούμε να συνδυάσουμε μήκος, υφή και διακοσμητικές λεπτομέρειες ώστε το αποτέλεσμα να είναι πραγματικά δικό σου.",
        image: "/homNav/Letit.jpg",
      },
    ],
  },
  es: {
    navLabel: "Crea tu set",
    homeBadge: "Diseño personalizado",
    homeTitle: "Crea tu set único",
    homeText:
      "Podemos crear un set totalmente personalizado para ti. Envíanos una foto, una referencia o una paleta exacta y diseñaremos un set según tu idea.",
    homeCta: "Crear tu set único",
    pageTitle: "Crea tu set único",
    pageIntro:
      "Un pedido personalizado es perfecto si ya tienes una visión clara. Podemos recrear el ambiente de una foto de referencia, construir una paleta precisa y pulir el resultado contigo.",
    pageButton: "Contáctanos para crear tu set único",
    instagramButton: "Escríbenos en Instagram",
    contactsButton: "Abrir página de contacto",
    processTitle: "Cómo creamos un set personalizado",
    processSteps: [
      "Envíanos una foto de referencia, una captura o una imagen de inspiración.",
      "Cuéntanos qué tonos, qué ambiente y qué detalles quieres conservar.",
      "Preparamos una propuesta personalizada y te guiamos hasta el pedido final.",
    ],
    cards: [
      {
        title: "Set a partir de tu foto",
        text: "Si nos envías una foto, podemos crear un set inspirado en su forma, su tono y su sensación general.",
        image: "/homNav/Rastat.jpg",
      },
      {
        title: "Set a partir de una paleta exacta",
        text: "Si el color es lo más importante, podemos construir tu set alrededor de una paleta precisa y transiciones suaves.",
        image: "/homNav/Kiharat.jpg",
      },
      {
        title: "Set con tus propios detalles",
        text: "También podemos combinar longitud, textura y detalles decorativos para que el resultado se sienta realmente personal.",
        image: "/homNav/Letit.jpg",
      },
    ],
  },
  et: {
    navLabel: "Loo oma komplekt",
    homeBadge: "Isikupärane disain",
    homeTitle: "Loo oma unikaalne komplekt",
    homeText:
      "Saame luua sulle täiesti isikupärase komplekti. Saada meile foto, viide või täpne värvipalett ja kujundame komplekti sinu idee järgi.",
    homeCta: "Loo oma unikaalne komplekt",
    pageTitle: "Loo oma unikaalne komplekt",
    pageIntro:
      "Isikupärane tellimus sobib ideaalselt siis, kui sul on juba kindel visioon. Saame luua komplekti viitefoto meeleolu, täpse paleti või sinu soovitud detailide järgi.",
    pageButton: "Võta meiega ühendust, et luua sinu unikaalne komplekt",
    instagramButton: "Kirjuta meile Instagramis",
    contactsButton: "Ava kontaktileht",
    processTitle: "Kuidas valmib isikupärane komplekt",
    processSteps: [
      "Saada meile viitefoto, ekraanipilt või inspiratsioonipilt.",
      "Kirjelda, millised toonid, meeleolu ja detailid on sulle olulised.",
      "Koostame isikliku ettepaneku ja juhendame sind lõpliku tellimuseni.",
    ],
    cards: [
      {
        title: "Komplekt sinu foto järgi",
        text: "Kui saadad meile foto, saame luua komplekti selle vormi, meeleolu ja värviidee põhjal.",
        image: "/homNav/Rastat.jpg",
      },
      {
        title: "Komplekt täpse paleti järgi",
        text: "Kui värv on kõige tähtsam, saame ehitada sinu komplekti täpse paleti ja sujuvate üleminekute ümber.",
        image: "/homNav/Kiharat.jpg",
      },
      {
        title: "Komplekt sinu detailidega",
        text: "Saame ühendada pikkuse, tekstuuri ja dekoratiivsed detailid, et tulemus oleks tõeliselt sinu oma.",
        image: "/homNav/Letit.jpg",
      },
    ],
  },
  lv: {
    navLabel: "Izveido savu komplektu",
    homeBadge: "Individuāls dizains",
    homeTitle: "Izveido savu unikālo komplektu",
    homeText:
      "Mēs varam izveidot tev pilnībā individuālu komplektu. Atsūti mums foto, atsauci vai precīzu krāsu paleti, un mēs izveidosim komplektu pēc tavas idejas.",
    homeCta: "Izveido savu unikālo komplektu",
    pageTitle: "Izveido savu unikālo komplektu",
    pageIntro:
      "Individuāls pasūtījums ir ideāls, ja tev jau ir sava vīzija. Mēs varam atdarināt atsauces foto noskaņu, izveidot precīzu paleti un pilnveidot rezultātu kopā ar tevi.",
    pageButton: "Sazinies ar mums, lai izveidotu tavu unikālo komplektu",
    instagramButton: "Raksti mums Instagram",
    contactsButton: "Atvērt kontaktu lapu",
    processTitle: "Kā top individuāls komplekts",
    processSteps: [
      "Atsūti mums atsauces foto, ekrānattēlu vai iedvesmas attēlu.",
      "Pastāsti, kādi toņi, noskaņa un detaļas tev ir svarīgas.",
      "Mēs sagatavojam personīgu piedāvājumu un palīdzam līdz galīgajam pasūtījumam.",
    ],
    cards: [
      {
        title: "Komplekts pēc tavas fotogrāfijas",
        text: "Ja atsūti mums foto, mēs varam izveidot komplektu pēc tā formas, noskaņas un krāsu idejas.",
        image: "/homNav/Rastat.jpg",
      },
      {
        title: "Komplekts pēc precīzas paletes",
        text: "Ja svarīgākā ir krāsa, mēs varam veidot komplektu pēc precīzas paletes un atbilstošām pārejām.",
        image: "/homNav/Kiharat.jpg",
      },
      {
        title: "Komplekts ar tavām detaļām",
        text: "Mēs varam apvienot garumu, tekstūru un dekoratīvas detaļas, lai rezultāts būtu patiesi personīgs.",
        image: "/homNav/Letit.jpg",
      },
    ],
  },
  lt: {
    navLabel: "Sukurk savo rinkinį",
    homeBadge: "Individualus dizainas",
    homeTitle: "Sukurk savo unikalų rinkinį",
    homeText:
      "Galime sukurti tau visiškai individualų rinkinį. Atsiųsk mums nuotrauką, pavyzdį ar tikslią spalvų paletę, ir sukursime rinkinį pagal tavo idėją.",
    homeCta: "Sukurti savo unikalų rinkinį",
    pageTitle: "Sukurk savo unikalų rinkinį",
    pageIntro:
      "Individualus užsakymas puikiai tinka, jei jau turi aiškią viziją. Galime atkurti nuorodos nuotraukos nuotaiką, sukurti tikslią paletę ir kartu su tavimi ištobulinti rezultatą.",
    pageButton: "Susisiek su mumis, kad sukurtume tavo unikalų rinkinį",
    instagramButton: "Parašyk mums į Instagram",
    contactsButton: "Atidaryti kontaktų puslapį",
    processTitle: "Kaip kuriame individualų rinkinį",
    processSteps: [
      "Atsiųsk mums nuorodos nuotrauką, ekrano kopiją ar įkvėpimo paveikslą.",
      "Papasakok, kokie atspalviai, nuotaika ir detalės tau svarbiausi.",
      "Paruošiame asmeninį pasiūlymą ir palydime iki galutinio užsakymo.",
    ],
    cards: [
      {
        title: "Rinkinys pagal tavo nuotrauką",
        text: "Jei atsiųsi mums nuotrauką, galėsime sukurti rinkinį pagal jos formą, nuotaiką ir spalvinę idėją.",
        image: "/homNav/Rastat.jpg",
      },
      {
        title: "Rinkinys pagal tikslią paletę",
        text: "Jei svarbiausia spalva, galime kurti tavo rinkinį pagal tikslią paletę ir švelnius perėjimus.",
        image: "/homNav/Kiharat.jpg",
      },
      {
        title: "Rinkinys su tavo detalėmis",
        text: "Galime derinti ilgį, tekstūrą ir dekoratyvias detales, kad rezultatas būtų tikrai tavo.",
        image: "/homNav/Letit.jpg",
      },
    ],
  },
  pl: {
    navLabel: "Stwórz swój zestaw",
    homeBadge: "Indywidualny projekt",
    homeTitle: "Stwórz swój unikalny zestaw",
    homeText:
      "Możemy stworzyć dla Ciebie w pełni indywidualny zestaw. Wyślij nam zdjęcie, inspirację lub dokładną paletę kolorów, a przygotujemy zestaw zgodny z Twoją wizją.",
    homeCta: "Stwórz swój unikalny zestaw",
    pageTitle: "Stwórz swój unikalny zestaw",
    pageIntro:
      "Indywidualne zamówienie jest idealne, jeśli masz już własną wizję. Możemy odtworzyć klimat zdjęcia referencyjnego, zbudować dokładną paletę i dopracować efekt razem z Tobą.",
    pageButton: "Skontaktuj się z nami, aby stworzyć swój unikalny zestaw",
    instagramButton: "Napisz do nas na Instagramie",
    contactsButton: "Otwórz stronę kontaktową",
    processTitle: "Jak tworzymy indywidualny zestaw",
    processSteps: [
      "Wyślij nam zdjęcie referencyjne, zrzut ekranu lub inspirację.",
      "Powiedz nam, jakie odcienie, klimat i detale są dla Ciebie ważne.",
      "Przygotujemy spersonalizowaną propozycję i poprowadzimy Cię do finalnego zamówienia.",
    ],
    cards: [
      {
        title: "Zestaw na podstawie Twojego zdjęcia",
        text: "Jeśli wyślesz nam zdjęcie, możemy stworzyć zestaw inspirowany jego kształtem, klimatem i pomysłem kolorystycznym.",
        image: "/homNav/Rastat.jpg",
      },
      {
        title: "Zestaw według dokładnej palety",
        text: "Jeśli najważniejszy jest kolor, możemy zbudować Twój zestaw wokół dokładnej palety i płynnych przejść.",
        image: "/homNav/Kiharat.jpg",
      },
      {
        title: "Zestaw z Twoimi detalami",
        text: "Możemy połączyć długość, teksturę i dekoracyjne detale, aby efekt był naprawdę osobisty.",
        image: "/homNav/Letit.jpg",
      },
    ],
  },
};

export const getCustomSetContent = (language) => copy[language] || copy.en;

export const customSetLinks = {
  instagram: INSTAGRAM_URL,
  contacts: CONTACTS_URL,
};
