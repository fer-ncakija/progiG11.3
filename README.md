# Programsko inženjerstvo

> Ime projekta u naslovu ima cilj opisati namjenu projekta te pomoći u podizanju početnog interesa za projekt prezentirajući osnovnu svrhu projekta.
> Isključivo ovisi o Vama!
> 
> Naravno, nijedan predložak nije idealan za sve projekte jer su potrebe i ciljevi različiti. Ne bojte se naglasiti Vaš cilj u ovoj početnoj stranici projekta, podržat ćemo ga bez obzira usredotočili se Vi više na tenologiju ili marketing.
> 
> Zašto ovaj dokument? Samo manji dio timova je do sada propoznao potrebu (a i meni je lakše pratiti Vaš rad).  

# Opis projekta
Ovaj projekt je reultat timskog rada u sklopu projeknog zadatka kolegija [Programsko inženjerstvo](https://www.fer.unizg.hr/predmet/proinz) na Fakultetu elektrotehnike i računarstva Sveučilišta u Zagrebu. 

Cilj našeg projekta je razviti aplikaciju koja će olakšati upravljanje zajedničkim stambenim zgradama, posebno za predstavnike suvlasnika. Motivacija za ovaj projekt proizlazi iz potrebe za efikasnijom komunikacijom među suvlasnicima, smanjenjem nesporazuma i boljom organizacijom zajedničkih aktivnosti i odluka. Problem koji rješavamo odnosi se na izazove koordinacije u zgradama s većim brojem suvlasnika, gdje dosadašnje metode poput oglasnih ploča ili e-mail komunikacije nisu dovoljno učinkovite. Naša aplikacija pruža digitalno rješenje za organizaciju sastanaka, praćenje zaključaka i bolju transparentnost. Time se olakšava donošenje odluka i održavanje zgrada.

# Funkcijski zahtjevi
>Administrator mora imati mogućnost kreiranja svih korisničkih računa unutar aplikacije i dodjeljivanja inicijalnih lozinki​<br />
>Korisnici moraju moći promijeniti inicijalnu lozinku nakon prve prijave<br />
>Predstavnik suvlasnika mora imati mogućnost zakazivanja sastanaka, definiranja dnevnog reda i upravljanja zaključcima​<br />
>Aplikacija mora omogućiti prijavu korisnika putem vanjskog servisa za autentifikaciju Oauth 2.0<br />
>Suvlasnici moraju imati mogućnost prijave, pregleda zakazanih sastanaka i označavanje sudjelovanja na sastanku<br />
>Predstavnik mora moći kreirati nove sastanke sa definiranim dnevnim redom i točkama koje mogu, ali i ne moraju imati pravni učinak<br />
>Predstavnik kreaira sastanak koji se nalazi u stanju 'Planiran' sve dok se ne navede naslov, mjesto, vrijeme i sažetak<br />
>Kada je sastanak u potpunosti kreiran, on prelazi u stanje 'Objavljen', kada postaje vidljiv svim suvlasnicima, a aplikacija automatski šalje obavijest putem e-maila​<br />
>Aplikacija mora automatski slati podsjetnike korisnicima za nadolazeće sastanke nekoliko dana unaprijed<br />
>Suvlasnici mogu pregledavati točke dnevnog reda sastanka dok je u stanju 'Objavljen'​<br />
>Suvlasnici mogu označiti da će sudjelovati na sastanku putem aplikacije<br />
>Nakon što je sastanak završio, on prelazi u stanje 'Obavljen'<br />
>Predstavnik može dodavati zaključke za svaku točku dnevnog reda nakon što je sastanak prešao u stanje 'Obavljen'<br />
>Točke dnevnog reda s pravnim učinkom moraju imati zaključak prije arhiviranja sastanka​<br />
>Nakon obrade zaključaka, sastanak prelazi u stanje 'Arhiviran', a suvlasnici primaju obavijest putem e-maila<br />
>Nakon arhiviranja, sadržaj sastanka i zaključci se više ne mogu mijenjati​<br />
>Aplikacija mora omogućiti povezivanje točaka dnevnog reda sa specifičnim diskusijama na aplikaciji StanBlog<br />
>Suvlasnici moraju moći pregledavati povijest sastanaka i njihovih zaključaka nakon što su arhivirani​<br />
>Aplikacija mora moći mijenjati status sastanka, od "Planiran" do "Objavljen", a kasnije i "Obavljen" i "Arhiviran"<br />

# Nefunkcijski zahtjevi
>Aplikacija mora imati zaštitu za korisničke podatake, poput lozinki i osobnih informacija<br />
>Administrator mora moći upravljati ulogama korisnika, poput dodjeljivanja ili oduzimanja ovlasti suvlasnicima i predstavnicima<br />
>Aplikacija mora biti kompatibilna s različitim uređajima (desktop, pametni telefoni)<br />
>Aplikacija mora biti jednostavna za korištenje, s intuitivnim korisničkim sučeljem koje ne zahtijeva posebnu obuku<br />

# Mogući funkcijski zahtjevi
>Predstavnik suvlasnika mora moći kreirati glasanje za određene točke dnevnog reda koje zahtijevaju donošenje odluke<br />
>Sustav mora bilježiti rezultate glasanja i automatski prikazivati zaključke kao "Izglasano" ili "Odbijeno"<br />
>Nakon završetka glasanja, sustav mora prikazati rezultate (broj glasova za, protiv i suzdržanih) svim korisnicima<br />
>Tijekom glasanja, korisnici moraju moći vidjeti koliko je osoba već glasalo<br />

# Mogući nefunkcijski zahtjevi
>Sustav mora automatski provjeriti i potvrditi da je postignut potreban kvorum za valjanost glasa<br />
>Sustav mora osigurati da samo ovlašteni suvlasnici mogu sudjelovati u glasanju i da svaki suvlasnik može glasati samo jednom<br />

# Tehnologije
>Frontend - React<br />
>Backend - .NET

# Članovi tima
>Nina Čakija - nina.cakija@fer.hr<br />
>Borna Kučić - borna.kucic@fer.hr<br />
>Petar Rihtarec - petar.rihtarec@fer.hr<br />
>Ema Bradić - ema.bradic@fer.hr<br />
>Dorotea Požega - dorotea.pozega@fer.hr<br />
>Borna Elez - borna.elez@fer.hr<br />
>Nikola Špehar - nikola.spehar@fer.hr<br />

# Kontribucije
>Pravila ovise o organizaciji tima i su često izdvojena u CONTRIBUTING.md



# 📝 Kodeks ponašanja [![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-2.1-4baaaa.svg)](CODE_OF_CONDUCT.md)
Kao studenti sigurno ste upoznati s minimumom prihvatljivog ponašanja definiran u [KODEKS PONAŠANJA STUDENATA FAKULTETA ELEKTROTEHNIKE I RAČUNARSTVA SVEUČILIŠTA U ZAGREBU](https://www.fer.hr/_download/repository/Kodeks_ponasanja_studenata_FER-a_procisceni_tekst_2016%5B1%5D.pdf), te dodatnim naputcima za timski rad na predmetu [Programsko inženjerstvo](https://wwww.fer.hr).
Očekujemo da ćete poštovati [etički kodeks IEEE-a](https://www.ieee.org/about/corporate/governance/p7-8.html) koji ima važnu obrazovnu funkciju sa svrhom postavljanja najviših standarda integriteta, odgovornog ponašanja i etičkog ponašanja u profesionalnim aktivnosti. Time profesionalna zajednica programskih inženjera definira opća načela koja definiranju  moralni karakter, donošenje važnih poslovnih odluka i uspostavljanje jasnih moralnih očekivanja za sve pripadnike zajenice.

Kodeks ponašanja skup je provedivih pravila koja služe za jasnu komunikaciju očekivanja i zahtjeva za rad zajednice/tima. Njime se jasno definiraju obaveze, prava, neprihvatljiva ponašanja te  odgovarajuće posljedice (za razliku od etičkog kodeksa). U ovom repozitoriju dan je jedan od široko prihvačenih kodeks ponašanja za rad u zajednici otvorenog koda.
>### Poboljšajte funkcioniranje tima:
>* definirajte načina na koji će rad biti podijeljen među članovima grupe
>* dogovorite kako će grupa međusobno komunicirati.
>* ne gubite vrijeme na dogovore na koji će grupa rješavati sporove primjenite standarde!
>* implicitno podrazmijevamo da će svi članovi grupe slijediti kodeks ponašanja.
 
>###  Prijava problema
>Najgore što se može dogoditi je da netko šuti kad postoje problemi. Postoji nekoliko stvari koje možete učiniti kako biste najbolje riješili sukobe i probleme:
>* Obratite mi se izravno [e-pošta](mailto:vlado.sruk@fer.hr) i  učinit ćemo sve što je u našoj moći da u punom povjerenju saznamo koje korake trebamo poduzeti kako bismo riješili problem.
>* Razgovarajte s vašim asistentom jer ima najbolji uvid u dinamiku tima. Zajedno ćete saznati kako riješiti sukob i kako izbjeći daljnje utjecanje u vašem radu.
>* Ako se osjećate ugodno neposredno razgovarajte o problemu. Manje incidente trebalo bi rješavati izravno. Odvojite vrijeme i privatno razgovarajte s pogođenim članom tima te vjerujte u iskrenost.

# 📝 Licenca
Važeča (1)
[![CC BY-NC-SA 4.0][cc-by-nc-sa-shield]][cc-by-nc-sa]

Ovaj repozitorij sadrži otvoreni obrazovni sadržaji (eng. Open Educational Resources)  i licenciran je prema pravilima Creative Commons licencije koja omogućava da preuzmete djelo, podijelite ga s drugima uz 
uvjet da navođenja autora, ne upotrebljavate ga u komercijalne svrhe te dijelite pod istim uvjetima [Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License HR][cc-by-nc-sa].
>
> ### Napomena:
>
> Svi paketi distribuiraju se pod vlastitim licencama.
> Svi upotrijebleni materijali  (slike, modeli, animacije, ...) distribuiraju se pod vlastitim licencama.

[![CC BY-NC-SA 4.0][cc-by-nc-sa-image]][cc-by-nc-sa]

[cc-by-nc-sa]: https://creativecommons.org/licenses/by-nc/4.0/deed.hr 
[cc-by-nc-sa-image]: https://licensebuttons.net/l/by-nc-sa/4.0/88x31.png
[cc-by-nc-sa-shield]: https://img.shields.io/badge/License-CC%20BY--NC--SA%204.0-lightgrey.svg

Orginal [![cc0-1.0][cc0-1.0-shield]][cc0-1.0]
>
>COPYING: All the content within this repository is dedicated to the public domain under the CC0 1.0 Universal (CC0 1.0) Public Domain Dedication.
>
[![CC0-1.0][cc0-1.0-image]][cc0-1.0]

[cc0-1.0]: https://creativecommons.org/licenses/by/1.0/deed.en
[cc0-1.0-image]: https://licensebuttons.net/l/by/1.0/88x31.png
[cc0-1.0-shield]: https://img.shields.io/badge/License-CC0--1.0-lightgrey.svg

### Reference na licenciranje repozitorija
