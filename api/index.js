import express from "express";
import "dotenv/config";
import cors from "cors";

const datas = [
  {
    title: "Doa Sebelum Makan",
    arabic:
      "اَللّٰهُمَّ بَارِكْ لَنَا فِيمَا رَزَقْتَنَا وَقِنَا عَذَابَ النَّارِ",
    latin: "Alloohumma barik lanaa fiimaa razatanaa waqinaa 'adzaa bannar",
    translation:
      "Ya Allah, berkahilah kami dalam rezeki yang telah Engkau berikan kepada kami dan peliharalah kami dari siksa api neraka",
  },
  {
    title: "Doa Sesudah Makan",
    arabic:
      "اَلْحَمْدُ ِللهِ الَّذِىْ اَطْعَمَنَا وَسَقَانَا وَجَعَلَنَا مُسْلِمِينَ",
    latin:
      "Alhamdu lillaahil ladzii ath'amanaa wa saqoonaa wa ja'alnaa muslimiin",
    translation:
      "Segala puji bagi Allah yang telah memberi makan kami dan minuman kami, serta menjadikan kami sebagai orang-orang islam",
  },
  {
    title: "Doa Sesudah Minum",
    arabic:
      "اَلْحَمْدُ ِللهِ الَّذِىْ جَعَلَهُ عَذْبًا فُرَاتًا بِرَحْمَتِهِ وَلَمْ يَجْعَلْهُ مِلْحًا اُجَاجًا بِذُنُوْبِنَا",
    latin:
      "Alhamdu lillaahil ladzi ja'alahuu 'adzbam furootam birohmatihii wa lamyaj'alhu milhan ujaajam bidzunuubinaa",
    translation:
      "Segala puji bagi Allah yang telah menjadikan air ini (minuman) segar dan menggiatkan dengan rahmat-Nya dan tidak menjadikan air ini (minuman) asin lagi pahit karena dosa-dosa kami",
  },
  {
    title: "Doa Ketika Makan Lupa Membaca Doa",
    arabic: "بِسْمِ اللهِ فِي أَوَّلِهِ وَآخِرِهِ",
    latin: "Bismillaahi fii awwalihi wa aakhirihi",
    translation: "Dengan menyebut nama Allah pada awal dan akhirnya",
  },
  {
    title: "Doa Sebelum Tidur",
    arabic: "بِسْمِكَ اللّٰهُمَّ اَحْيَا وَأَمُوتُ",
    latin: "Bismikallohumma ahya wa amuutu",
    translation: "Dengan menyebut nama-Mu ya Allah, aku hidup dan aku mati",
  },
  {
    title: "Doa Ketika Mimpi Buruk",
    arabic:
      "اَللّٰهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ عَمَلِ الشَّيْطَانِ وَسَيِّئَاتِ الْأَحْلاَمِ",
    latin:
      "Allaahumma innii a'uudzubika min 'amalisy syaithaani wa sayyiaatil ahlami",
    translation:
      "Ya Allah, sesungguhnya aku mohon perlindungan kepada Engkau dari perbuatan setan dan dari mimpi-mimpi yang buruk",
  },
  {
    title: "Doa Ketika Mendapat Mimpi Baik",
    arabic: "اَلْحَمْدُ ِللهِ الَّذِي قَطَعَ الْحَاجَةَ",
    latin: "Alhamdulillahil ladzii qatoza haajaati",
    translation: "Segala puji bagi Allah yang telah memberi hajatku",
  },
  {
    title: "Doa Bangun Tidur",
    arabic:
      "اَلْحَمْدُ ِللهِ الَّذِىْ اَحْيَانَا بَعْدَمَآ اَمَاتَنَا وَإِلَيْهِ النُّشُورُ",
    latin:
      "Alhamdu lillahil ladzii ahyaanaa ba'da maa amaa tanaa wa ilahin nusyuuru",
    translation:
      "Segala puji bagi Allah yang telah menghidupkan kami sesudah kami mati (membangunkan dari tidur) dan hanya kepada-Nya kami dikembalikan",
  },
  {
    title: "Doa Masuk Kamar Mandi Atau Toilet",
    arabic: "اَللّٰهُمَّ إِنِّيْ أَعُوذُ بِكَ مِنَ الْخُبُثِ وَالْخَبَائِثِ",
    latin: "Alloohumma innii a'uudzubika minal khubutsi wal khoaaitsi",
    translation:
      "Ya Allah, aku berlindung pada-Mu dari godaan syetan laki-laki dan setan perempuan",
  },
  {
    title: "Doa Istinja",
    arabic:
      "اَللّٰهُمَّ حَسِّنْ فَرْجِي مِنَ الْفَوَاحِشِ وَظَهِّرْ قَلْبِي مِنَ النِّفَاقِ",
    latin:
      "Alloohumma thahhir qolbii minan nifaaqi wa hashshin fajrii minal fawaahisyi",
    translation:
      "Wahai Tuhanku, sucikanlah hatiku dari sifat kepura-puraan (munafiq) serta peliharalah kemaluanku dari perbuatan keji",
  },
  {
    title: "Doa Keluar Kamar Mandi Atau Toilet",
    arabic:
      "غُفْرَانَكَ الْحَمْدُ ِللهِ الَّذِىْ اَذْهَبَ عَنِّي الْأَذَى وَعَافَانِي",
    latin:
      "Ghufraanaka. Alhamdulillaahil ladzii adzhaba ‘annji al adzaa wa’aafaanii",
    translation:
      "Dengan mengharap ampunanMu, segala puji milik Allah yang telah menghilangkan kotoran dari badanku dan yang telah menyejahterakan",
  },
  {
    title: "Doa Menjelang Sholat Shubuh",
    arabic:
      "اَللّٰهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ ضِيْقِ الدُّنْيَا وَضِيْقِ يَوْمِ الْقِيَامَةِ",
    latin:
      "Alloohumma inni a'udzubika min dzhiiqid-dunyaa wa dzhiiqi yaumal-qiyaamati",
    translation:
      "Ya Allah, Sesungguhnya aku berlindung kepada-Mu dari kesempitan dunia dan kesempitan hari kiamat",
  },
  {
    title: "Doa Menyambut Pagi Hari",
    arabic:
      "اَللّٰهُمَّ بِكَ أَصْبَحْنَا وَبِكَ أَمْسَيْنَا وَبِكَ نَحْيَا وَبِكَ نَمُوتُ وَإِلَيْكَ النُّشُورُ",
    latin:
      "Alloohumma bika ashbahnaa wa bika amsainaa wa bika nahyaa wa bika namuutu wa ilaikan nusyuuru",
    translation:
      "Ya Allah, karena Engkau kami mengalami waktu pagi dan waktu petang, dan karena Engkau kami hidup dan mati dan kepada-Mu juga kami akan kembali",
  },
  {
    title: "Doa Menyambut Sore Hari",
    arabic:
      "اَللّٰهُمَّ بِكَ أَمْسَيْنَا وَبِكَ أَصْبَحْنَا وَبِكَ نَحْيَا وَبِكَ نَمُوتُ وَإِلَيْكَ الْمَصِيرُ",
    latin:
      "Alloohumma bika amsainaa wa bika ashbahnaa wa bika nahyaa wa bika namuutu wa ilaikal mashiir",
    translation:
      "Ya Allah, karena Engkau kami mengalami waktu petang dan waktu pagi, karena Engkau kami hidup dan mati dan kepada-Mu juga kami akan kembali",
  },
  {
    title: "Doa Ketika Bercermin",
    arabic: "اَلْحَمْدُ ِللهِ كَمَا حَسَّنْتَ خَلْقِي فَحَسِّنْ خُلُقِي",
    latin: "Alhamdulillaahi kamaa hassanta kholqii fahassin khuluqii",
    translation:
      "Segala puji bagi Allah, baguskanlah budi pekertiku seperti Engkau telah memperindah bentuk tubuhku",
  },
  {
    title: "Doa Masuk Rumah",
    arabic:
      "اَللّٰهُمَّ اِنّىْ اَسْأَلُكَ خَيْرَالْمَوْلِجِ وَخَيْرَالْمَخْرَجِ بِسْمِ اللهِ وَلَجْنَا وَبِسْمِ اللهِ خَرَجْنَا وَعَلَى اللهِ رَبّنَا تَوَكَّلْنَا",
    latin:
      "Alloohumma innii as-aluka khayral maulaji wa khayral makhraaji. Bismillaahi wallajnaa wa bismillaahi kharajnaa wa 'alaa Allaahi rabbinaa tawakkalnaa",
    translation:
      "Ya Allah, aku memohon kepada-Mu kebaikan saat masuk dan kebaikan saat keluar. Dengan nama Allah kami masuk dan dengan nama Allah kami keluar, dan hanya kepada Allah Tuhan kami kami bertawakal",
  },
  {
    title: "Doa Ketika Mengenakan Pakaian",
    arabic:
      "بِسْمِ اللهِ الَّذِيْ لَبِسْتُهُ وَالْحَمْدُ ِللهِ الَّذِيْ كَسَانِي مَا أَسْتُرُ بِهِ عَوْرَتِي",
    latin:
      "Bismillaahi alladzii labistu wa alhamdu lillaahi alladzii kasaanii maa asturu bihi 'awraatii",
    translation:
      "Dengan nama Allah yang telah aku pakai dan segala puji bagi Allah yang telah memberikan pakaian kepadaku untuk menutupi auratku",
  },
  {
    title: "Doa Ketika Mengenakan Pakaian Baru",
    arabic:
      "اَللَّهُمَّ لَكَ الْحَمْدُ أَنْتَ كَسَوْتَنِيْهِ، أَسْأَلُكَ مِنْ خَيْرِهِ وَخَيْرِ مَا صُنِعَ لَهُ، وَأَعُوْذُ بِكَ مِنْ شَرِّهِ وَشَرِّ مَا صُنِعَ لَهُ",
    latin:
      "Allaahumma lakal hamdu anta kasautaniihi, as-aluka min khoirihi wa khoiri maa shuni'a lahu, wa a'uudzu bika min syarrihi wa syarri maa shuni'a lah",
    translation:
      "Ya Allah, hanya milikMu segala puji, Engkaulah yang memberi pakaian ini kepadaku. Aku mohon kepadaMu untuk memperoleh kebaikannya dan kebaikan yang ia diciptakan karenanya. Aku berlindung kepadaMu dari kejahatannya dan kejahatan yang ia diciptakan karenanya",
  },
  {
    title: "Doa Ketika Melepas Pakaian",
    arabic: "بِسْمِ اللهِ الَّذِيْ كَسَانِي هَذَا الْكِسَاءِ",
    latin: "Bismillaahi alladzii kasaanii haadhaal kisaa'i",
    translation: "Dengan nama Allah yang telah memberiku pakaian ini",
  },
  {
    title: "Doa Ketika Pergi Dalam Perjalanan",
    arabic:
      "بِسْمِ اللهِ وَالْحَمْدُ ِللهِ سُبْحَانَ الَّذِي سَخَّرَنَا لِنَفْعَتِنَا وَإِنَّا إِلَىٰ رَبِّنَا لَمُنْقَلِبُونَ",
    latin:
      "Bismillaahi walhamdu lillaahi subhaanalladzii sakhkhara lanaa linafa'tinaa wa innaa ilaa rabbinaa lamunqalibuun",
    translation:
      "Dengan nama Allah, segala puji bagi Allah, Maha Suci Allah yang telah menundukkan kendaraan ini untuk keperluanku dan sesungguhnya kami akan kembali kepada Tuhan kami",
  },
  {
    title: "Doa Memohon Ilmu Yang Bermanfaat",
    arabic:
      "اَللّٰهُمَّ اِنِّى اَسْأَلُكَ عِلْمًا نَافِعًا وَرِزْقًا طَيِّبًا وَعَمَلاً مُتَقَبَّلاً",
    latin:
      "Alloohumma innii as-aluka 'ilmaan naafi'aan wa rizqoon thoyyibaan wa 'amalaan mutaqobbalaan",
    translation:
      "Ya Allah, sesungguhnya aku mohon kepada-Mu ilmu yang berguna, rezki yang baik dan amal yang baik diterima. (H.R. Ibnu Majah)",
  },
  {
    title: "Doa Sebelum Belajar",
    arabic: "يَارَبِّ زِدْنِىْ عِلْمًا وَارْزُقْنِىْ فَهْمًا",
    latin: "Yaa robbi zidnii 'ilman warzuqnii fahmaa",
    translation:
      "Ya Allah, tambahkanlah aku ilmu dan berikanlah aku rizqi akan kepahaman",
  },
  {
    title: "Doa Sesudah Belajar",
    arabic:
      "اَللّٰهُمَّ اِنِّى اِسْتَوْدِعُكَ مَاعَلَّمْتَنِيْهِ فَارْدُدْهُ اِلَىَّ عِنْدَ حَاجَتِىْ وَلاَ تَنْسَنِيْهِ يَارَبَّ الْعَالَمِيْنَ",
    latin:
      "Allaahumma innii astaudi'uka maa 'allamtaniihi fardud-hu ilayya 'inda haajatii wa laa tansaniihi yaa robbal 'alamiin",
    translation:
      "Ya Allah, sesungguhnya aku menitipkan kepada Engkau ilmu-ilmu yang telah Engkau ajarkan kepadaku, dan kembalikanlah kepadaku sewaktu aku butuh kembali dan janganlah Engkau lupakan aku kepada ilmu itu wahai Tuhan seru sekalian alam",
  },
  {
    title: "Doa Berpergian",
    arabic:
      "اَللّٰهُمَّ هَوِّنْ عَلَيْنَا سَفَرَنَا هَذَا وَاطْوِعَنَّابُعْدَهُ اَللّٰهُمَّ اَنْتَ الصَّاحِبُ فِى السَّفَرِوَالْخَلِيْفَةُفِى الْاَهْلِ",
    latin:
      "Alloohumma hawwin 'alainaa safaranaa hadzaa waatwi 'annaa bu'dahu. Alloohumma antashookhibu fiissafari walkholiifatu fiil ahli",
    translation:
      "Ya Allah, mudahkanlah kami berpergian ini, dan dekatkanlah kejauhannya. Ya Allah yang menemani dalam berpergian, dan Engkau pula yang melindungi keluarga",
  },
  {
    title: "Doa Setelah Kembali dari Bepergian",
    arabic:
      "اَللَّهُ أَكْبَرُ، اَللَّهُ أَكْبَرُ، اَللَّهُ أَكْبَرُ، (سُبْحَانَ الَّذِيْ سَخَّرَ لَنَا هَـٰذَا وَمَا كُنَّا لَهُ مُقْرِنِيْنَ. وَإِنَّا إِلَى رَبِّنَا لَمُنْقَلِبُوْنَ) اَللَّهُمَّ إِنَّا نَسْأَلُكَ فِيْ سَفَرِنَا هَـٰذَا الْبِرَّ وَالتَّقْوَى، وَمِنَ الْعَمَلِ مَا تَرْضَى، اَللَّهُمَّ هَوِّنْ عَلَيْنَا سَفَرَنَا هَـٰذَا وَاطْوِ عَنَّا بُعْدَهُ، اَللَّهُمَّ أَنْتَ الصَّاحِبُ فِي السَّفَرِ وَالْخَلِيْفَةُ فِي اْلأَهْلِ، اَللَّهُمَّ إِنِّيْ أَعُوْذُ بِكَ مِنْ وَعْثَاءِ السَّفَرِ وَكَآبَةِ الْمَنْظَرِ وَسُوْءِ الْمُنْقَلَبِ فِي الْمَالِ وَاْلأَهْلِ آيِبُوْنَ تَائِبُوْنَ عَابِدُوْنَ لِرَبِّنَا حَامِدُوْنَ",
    latin:
      "Allaahu akbar (3x), (subhaanal-ladzii sakh-khoro lanaa haadzaa wa maa kunnaa lahu muqriniin. Wa innaa ilaa robbinaa lamunqolibuun), allaahumma innaa nas-aluka fii safarinaa haadzal birro wat-taqwaa, wa minal 'amali maa tardhoo, allaahumma hawwin 'alainaa safaronaa haadzaa wathwi 'annaa bu'dah, allaahumma antash-shoohibu fis-safari wal kholiifatu fil ahli, allaahumma innii a'uudzu bika min wa'tsaa-is-safari wa ka-aabatil manzhori wa suu-il munqolabi fil maali wal ahli. Aayibuuna taa-ibuuna 'aabiduuna lirobbinaa haamiduun",
    translation:
      "Allah Maha Besar (3x). (Maha Suci Tuhan yang menundukkan kendaraan ini untuk kami, padahal kami sebelumnya tidak mampu menguasainya. Dan sesungguhnya kami akan kembali kepada Tuhan kami (di hari Kiamat)). Ya Allah, sesungguhnya kami memohon kebaikan dan taqwa dalam bepergian ini, kami mohon perbuatan yang meridhakanMu. Ya Allah, permudahlah perjalanan kami ini, dan dekatkan jaraknya bagi kami. Ya Allah, Engkaulah teman dalam bepergian dan yang mengurusi keluarga(ku). Ya Allah, sesungguhnya aku berlindung kepada-Mu dari kelelahan dalam bepergian, pemandangan yang menyedihkan dan kepulangan yang jelek dalam harta dan keluarga. Kami kembali dengan bertaubat, tetap beribadah dan selalu memuji kepada Tuhan kami",
  },
  {
    title: "Doa Naik Kendaraan",
    arabic:
      "سُبْحَانَ الَّذِىْ سَخَّرَلَنَا هَذَا وَمَاكُنَّالَهُ مُقْرِنِيْنَ وَاِنَّآ اِلَى رَبِّنَا لَمُنْقَلِبُوْنَ",
    latin:
      "Subhaanalladzii sakkhara lanaa hadza wama kunna lahu muqriniin wa-inna ilaa rabbina lamunqalibuun.",
    translation:
      "Maha suci Allah yang telah menundukkan untuk kami (kendaraan) ini. Padahal sebelumnya kami tidak mampu untuk menguasainya, dan hanya kepada-Mu lah kami akan kembali",
  },
  {
    title: "Doa Naik Kapal",
    arabic:
      "بِسْمِ اللهِ مَجْرَهَا وَمُرْسَهَآاِنَّ رَبِّىْ لَغَفُوْرٌرَّحِيْمٌ",
    latin: "Bismillaahi majrahaa wa mursaahaa inna robbii laghofuurur rohiim",
    translation:
      "Dengan nama Allah yang menjalankan kendaraan ini berlayar dan berlabuh, sesungguhnya Tuhanku benar-benar Maha Pengampun lagi Maha Penyayang",
  },
  {
    title: "Doa Ketika Sampai di Tempat Tujuan",
    arabic:
      "اَلْحَمْدُ ِللهِ الَّذِى سَلَمَنِى وَالَّذِى اَوَنِى وَالَّذِى جَمَعَ الشَّمْلَ بِ",
    latin:
      "Alhamdulillahil ladzi sallamani wal ladzi awani wal ladzi jama’asy syamla bi",
    translation:
      "Segala puji bagi Allah, yang telah menyelamatkan akau dan yang telah melindungiku dan yang mengumpulkanku dengan keluargaku",
  },
  {
    title: "Doa Ketika Menuju Masjid",
    arabic:
      "اَللّٰهُمَّ اجْعَلْ فِىْ قَلْبِى نُوْرًا وَفِى لِسَانِىْ نُوْرًا وَفِىْ بَصَرِىْ نُوْرًا وَفِىْ سَمْعِىْ نُوْرًا وَعَنْ يَسَارِىْ نُوْرًا وَعَنْ يَمِيْنِىْ نُوْرًا وَفَوْقِىْ نُوْرًا وَتَحْتِىْ نُوْرًا وَاَمَامِىْ نُوْرًا وَخَلْفِىْ نُوْرًا وَاجْعَلْ لِّىْ نُوْرًا",
    latin:
      "Alloohummaj-'al fii qolbhii nuuroon wa fii lisaanii nuuroon wa fii bashorii nuuroon wa fii sam'ii nuuroon wa'an yamiinii nuuroon wa'an yasaarii nuuroon wa fauqii nuuroo wa tahtii nuuroo wa amaamii nuuroon wa khofii nuuroon waj-'al lii nuuroon",
    translation:
      "Ya Allah, jadikanlah dihatiku cahaya, pada lisanku cahaya, dalam pandanganku cahaya, dalam pendengaranku cahaya, dari kananku cahaya, dari kiriku cahaya, dari atasku cahaya, dari bawahku cahaya, dari depanku cahaya, belakangku cahaya, dan jadikanlah untukku cahaya (H.R. Bukhari dan Muslim)",
  },
  {
    title: "Doa Masuk Masjid",
    arabic: "اَللّٰهُمَّ افْتَحْ لِيْ اَبْوَابَ رَحْمَتِكَ",
    latin: "Allahummaf tahlii abwaaba rohmatik",
    translation: "Ya Allah, bukalah untukku pintu-pintu rahmat-Mu",
  },
  {
    title: "Doa Keluar Masjid",
    arabic: "اَللّٰهُمَّ اِنِّى اَسْأَلُكَ مِنْ فَضْلِكَ",
    latin: "Allahumma innii asaluka min fadlik",
    translation: "Ya Allah, sesungguhnya aku memohon keutamaan dari-Mu",
  },
  {
    title: "Doa Akan Membaca Al-Qur'an",
    arabic:
      "اَللّٰهُمَّ افْتَحْ عَلَىَّ حِكْمَتَكَ وَانْشُرْ عَلَىَّ رَحْمَتَكَ وَذَكِّرْنِىْ مَانَسِيْتُ يَاذَاالْجَلاَلِ وَاْلاِكْرَامِ",
    latin:
      "Alloohummaftah 'alayya hikmataka wansyur 'alayya rohmataka wa dzakkirnii maanasiitu yaa dzal jalaali wal ikhroomi",
    translation:
      "Ya Allah bukakanlah hikmahMu padaku, bentangkanlah rahmatMu padaku dan ingatkanlah aku terhadap apa yang aku lupa, wahai Dzat yang memiliki keagungan dan kemuliaan",
  },
  {
    title: "Doa Setelah Membaca Al-Qur'an",
    arabic:
      "اَللّٰهُمَّ ارْحَمْنِىْ بِالْقُرْآنِ. وَاجْعَلْهُ لِىْ اِمَامًا وَنُوْرًا وَّهُدًى وَّرَحْمَةً. اَللّٰهُمَّ ذَكِّرْنِىْ مِنْهُ مَانَسِيْتُ وَعَلِّمْنِىْ مِنْهُ مَاجَهِلْتُ. وَارْزُقْنِىْ تِلاَ وَتَهُ آنَآءَ اللَّيْلِ وَاَطْرَافَ النَّهَارٍ. وَاجْعَلْهُ لِىْ حُجَّةً يَارَبَّ الْعَالَمِيْنَ",
    latin:
      "Allahummarhamnii bil qur'aani. waj'alhu lii imaaman wa nuuran wa hudan wa rohman. Allahumma dzakkirnii minhu maa nasiitu wa'allimnii minhu maa jahiltu. wazuqnii tilaa watahu aanaa-al laili wa athroofan nahaari. waj'alhu lii hujjatan yaa robbal 'aalamiina.",
    translation:
      "Ya Allah, rahmatilah aku dengan Al-Quran yang agung, jadikanlah ia bagiku ikutan cahaya petunjuk rahmat. Ya Allah, ingatkanlah apa yang telah aku lupa dan ajarkan kepadaku apa yang tidak aku ketahui darinya, anugerahkanlah padaku kesempatan membacanya pada sebagian malam dan siang, jadikanlah ia hujjah yang kuat bagiku, wahai Tuhan seru sekalian alam",
  },
  {
    title: "Doa Niat Wudhu",
    arabic:
      "نَوَيْتُ الْوُضُوْءَ لِرَفْعِ الْحَدَثِ اْلاَصْغَرِ فَرْضًا لِلّٰهِ تَعَالَى",
    latin:
      "Nawaitul whudu-a lirof'il hadatsii ashghori fardhon lillaahi ta'aalaa",
    translation:
      "Saya niat berwudhu untuk menghilangkan hadast kecil fardu (wajib) karena Allah ta'ala",
  },
  {
    title: "Doa Setelah Wudhu",
    arabic:
      "اَشْهَدُ اَنْ لاَّاِلَهَ اِلاَّاللهُ وَحْدَهُ لاَشَرِيْكَ لَهُ وَاَشْهَدُ اَنَّ مُحَمَّدًاعَبْدُهُ وَرَسُوْلُهُ. اَللّٰهُمَّ اجْعَلْنِىْ مِنَ التَّوَّابِيْنَ وَاجْعَلْنِىْ مِنَ الْمُتَطَهِّرِيْنَ، وَجْعَلْنِيْ مِنْ عِبَادِكَ الصَّالِحِيْنَ",
    latin:
      "Asyhadu allaa ilaaha illalloohu wahdahuu laa syariika lahu wa asyhadu anna muhammadan ‘abduhuuwa rosuuluhuu, alloohummaj’alnii minat tawwaabiina waj’alnii minal mutathohhiriina, waj’alnii min 'ibadikash shaalihiina",
    translation:
      "Aku bersaksi, tidak ada Tuhan selain Allah Yang Maha Esa, tidak ada sekutu bagi-Nya, dan aku mengaku bahwa Nabi Muhammad itu adalah hamba dan Utusan Allah. Ya Allah, jadikanlah aku dari golongan orang-orang yang bertaubat dan jadikanlah aku dari golongan orang-orang yang suci dan jadikanlah aku dari golongan hamba-hamba Mu yang shaleh",
  },
  {
    title: "Doa Akan Mandi",
    arabic:
      "اَللّٰهُمَّ اغْفِرْلِى ذَنْبِى وَوَسِّعْ لِى فِىْ دَارِىْ وَبَارِكْ لِىْ فِىْ رِزْقِىْ",
    latin:
      "Alloohummaghfirlii dzambii wa wassi'lii fii daarii wa baarik lii fii rizqii",
    translation:
      "Ya Allah ampunilah dosa kesalahanku dan berilah keluasaan di rumahku serta berkahilah pada rezekiku",
  },
  {
    title: "Doa Masuk Rumah Ketika Kosong atau Sepi",
    arabic: "َاَلسَّلَامُ عَلَيْنَا وَعَلَى عِبَادِ اللَّهِ الصَّالِحِيْنَ",
    latin: "As-salaamu 'alainaa wa 'alaa 'ibaadillaahish-shoolihiin",
    translation:
      "Semoga keselamatan atas kami dan hamba-hamba Allah yang shalih",
  },
  {
    title: "Doa Setelah Adzan",
    arabic:
      "اَللَّهُمَّ رَبَّ هَـٰذِهِ الدَّعْوَةِ التَّامَّةِ، وَالصَّلاَةِ الْقَائِمَةِ، آتِ مُحَمَّدًا الْوَسِيْلَةَ وَالْفَضِيْلَةَ، وَابْعَثْهُ مَقَامًا مَحْمُوْدًا الَّذِيْ وَعَدْتَهُ",
    latin:
      "Allaahumma robba haadzihid-da'watit-taammah, wash-sholaatil qoo-imah, aati muhammadanil wasiilata wal fadhiilah, wab'ats-hu maqooman mahmuudanil-ladzii wa 'adtah",
    translation:
      "Ya Allah, Tuhan Pemilik panggilan yang sempurna (adzan) ini dan shalat (wajib) yang didirikan. Berilah Al-Wasilah (derajat di Surga, yang tidak akan diberikan selain kepada Nabi) dan fadhilah kepada Muhammad. Dan bangkitkan beliau sehingga bisa menempati maqam terpuji yang telah Engkau janjikan",
  },
  {
    title: "Doa Berbuka Puasa",
    arabic:
      "ذَهَبَ الظَّمَأُ، وَابْتَلَّتِ الْعُرُوْقُ، وَثَبَتَ اْلأَجْرُ، إِنْ شَاءَ اللَّهُ",
    latin:
      "Dzahabazh-zhoma-u, wabtallatil 'uruuqu, watsabatal ajru, in syaa-allaah",
    translation:
      "Telah hilang dahaga, dan urat-urat telah basah, dan telah tetap pahala, insya Allah",
  },
  {
    title: "Doa Malam Lailatul Qadar",
    arabic: "اَللَّهُمَّ إِنَّكَ عَفُوٌّ، تُحِبُّ العَفْوَ فَاعْفُ عَنِّي",
    latin: "Allaahumma innaka 'afuwwun, tuhibbul 'afwa fa'fu 'annii",
    translation:
      "Ya Allah, sesungguhnya Engkau Maha Pemaaf, menyukai permintaan maaf, maka maafkanlah aku",
  },
  {
    title: "Doa Ketika Angin Ribut/Bertiup Kencang",
    arabic:
      "سُبْحَانَ الَّذِيْ يُسَبِّحُ الرَّعْدُ بِحَمْدِهِ، وَالْمَلاَئِكَةُ مِنْ خِيْفَتِهِ",
    latin:
      "Subhaanal-ladzii yusabbihur-ro'du bihamdihi, wal malaaikatu min khiifatih",
    translation:
      "Maha Suci Allah yang halilintar bertasbih dengan memuji-Nya, begitu juga para malaikat, karena takut kepada-Nya",
  },
  {
    title: "Doa Bila Mendengar Halilintar/Petir",
    arabic:
      "اَللّٰهُمَّ اغْفِرْلِى ذَنْبِى وَوَسِّعْ لِى فِىْ دَارِىْ وَبَارِكْ لِىْ فِىْ رِزْقِىْ",
    latin:
      "Alloohummaghfirlii dzambii wa wassi'lii fii daarii wa baarik lii fii rizqii",
    translation:
      "Ya Allah ampunilah dosa kesalahanku dan berilah keluasaan di rumahku serta berkahilah pada rezekiku",
  },
  {
    title: "Doa Minta Hujan",
    arabic:
      "اَللَّهُمَّ اسْقِنَا غَيْثًا مُغِيْثًا، مَرِيْئًا، مَرِيْعًا، نَافِعًا غَيْرَ ضَارٍّ، عَاجِلًا غَيْرَ آجِلٍ",
    latin:
      "Allaahummas-qinaa ghoitsan mughiitsan, marii-an, marii'an, naafi'an ghoiro dhorrin, 'aajilan ghoiro aajilin",
    translation:
      "Ya Allah, berilah kami hujan yang merata, menyegarkan tubuh, menyuburkan tanaman, bermanfaat, tidak membahayakan, secepatnya, tidak ditunda-tunda",
  },
  {
    title: "Doa Ketika Turun Hujan",
    arabic: "اَللَّهُمَّ صَيِّبًا نَافِعًا",
    latin: "Allaahumma shoyyiban naafi'an",
    translation:
      "Ya Allah, turunkanlah hujan yang bermanfaat (untuk manusia, tanaman, dan binatang)",
  },
  {
    title: "Doa Ketika Hujan Lebat, Atau Agar Hujan Berhenti",
    arabic: "اَللَّهُمَّ حَوَالَيْنَا وَلَا عَلَيْنَا",
    latin: "Allaahumma hawaalainaa wa laa 'alainaa",
    translation:
      "Ya Allah, turunkanlah hujan di sekitar kami, bukan yang merusak kami",
  },
  {
    title: "Doa Setelah Hujan Berhenti",
    arabic: "مُطِرْنَا بِفَضْلِ اللَّهِ وَرَحْمَتِهِ",
    latin: "Muthirnaa bifadhlillaahi wa rohmatih",
    translation: "Kita diberi hujan karena karunia dan rahmat Allah",
  },
  {
    title: "Doa Kepada Pengantin",
    arabic:
      "بَارَكَ اللَّهُ لَكَ وَبَارَكَ عَلَيْكَ وَجَمَعَ بَيْنَكُمَا فِيْ خَيْرٍ",
    latin:
      "Baarokallaahu laka wa baaroka 'alaika wa jama'a bainakumaa fii khoirin",
    translation:
      "Semoga Allah memberkahimu di waktu bahagia dan memberkahimu di waktu susah, dan semoga Allah menyatukan kalian berdua dalam kebaikan",
  },
  {
    title: "Doa Ketika Sakit ",
    arabic:
      "اَللَّهُمَّ رَبَّ النَّاسِ، أَذْهِبِ البَاسَ، اِشْفِ، أَنْتَ الشَّافِي، لاَ شِفَاءَ إِلاَّ شِفَاؤُكَ، شِفَاءً لاَ يُغَادِرُ سَقَمًا",
    latin:
      "Allaahumma robban-naas, adz-hibil baas, isyfi, antasy-syaafii, laa syifaa-a illaa syifaa-uka, syifaa-an laa yughoodiru saqoman",
    translation:
      "Ya Allah, Tuhan seluruh manusia, hilangkanlah sakit ini, sembuhkanlah, Engkaulah As-Syafi (Sang Penyembuh), tidak ada kesembuhan kecuali kesembuhan dari-Mu, kesembuhan yang tidak meninggalkan penyakit",
  },
  {
    title: "Doa Kepada Orang Sakit",
    arabic: "لاَ بَأْسَ طَهُوْرٌ إِنْ شَاءَ اللَّهُ",
    latin: "Laa ba'sa, thohuurun in syaa-allaah",
    translation:
      "Tidak apa-apa (jangan terlalu bersedih dengan sakit ini), menjadi pembersih dosa, insya Allah",
  },
  {
    title: "Doa Ketika Sakit Menjelang Kematian/Tanpa Harapan Hidup",
    arabic:
      "اَللَّهُمَّ أَحْيِنِي مَا كَانَتِ الحَيَاةُ خَيْرًا لِي، وَتَوَفَّنِي إِذَا كَانَتِ الوَفَاةُ خَيْرًا لِي",
    latin:
      "Allaahumma ahyinii maa kaanatil hayaatu khoiron lii, wa tawaffanii idzaa kaanatil wafaatu khoiron lii",
    translation:
      "Ya Allah, panjangkan usiaku jika hidup itu lebih baik bagiku atau wafatkanlah aku, jika mati itu lebih baik bagiku",
  },
  {
    title: "Doa Talqin",
    arabic: "لاَ إِلَـٰهَ إِلاَّ اللَّهُ",
    latin: "Laa ilaaha illallaah",
    translation: "Tidak ada sesembahan yang berhak disembah kecuali Allah",
  },
  {
    title: "Doa Memejamkan Mata Jenazah",
    arabic:
      "اَللَّهُمَّ اغْفِرْ لِفُلاَنٍ (بِاسْمِهِ) وَارْفَعْ دَرَجَتَهُ فِي الْمَهْدِيِّيْنَ، وَاخْلُفْهُ فِيْ عَقِبِهِ فِي الْغَابِرِيْنَ، وَاغْفِرْ لَنَا وَلَهُ يَا رَبَّ الْعَالَمِيْنَ، وَافْسَحْ لَهُ فِيْ قَبْرِهِ وَنَوِّرْ لَهُ فِيْهِ",
    latin:
      "Allaahummaghfir lifulaan (bismihi), warfa' darojatahu fiil mahdiyyiin, wakhlufhu fii 'aqibihi fiil ghoobiriin, waghfir lanaa wa lahu, yaa robbal 'aalamiin, wafsah lahu fii qobrihi wa nawwir lahu fiihi",
    translation:
      "Ya Allah, ampunilah si Fulan (hendaklah menyebut namanya), angkatlah derajatnya bersama orang-orang yang mendapat petunjuk, berilah penggantinya bagi orang-orang yang ditinggalkan sesudahnya. Dan ampunilah kami dan dia, wahai Tuhan seru sekalian alam. Lebarkan kuburannya dan berilah penerangan di dalamnya",
  },
  {
    title: "Doa Belasungkawa (Takziyah)",
    arabic:
      "إِنَّ لِلَّهِ مَا أَخَذَ، وَلَهُ مَا أَعْطَى وَكُلُّ شَيْءٍ عِنْدَهُ بِأَجَلٍ مُسَمًّى، فَلْتَصْبِرْ وَلْتَحْتَسِبْ",
    latin:
      "Inna lillaahi maa akhodza, wa lahu maa a'thoo wa kullu syai-in 'indahu bi-ajalin musamman, faltashbir wal tahtasib",
    translation:
      "Sesungguhnya hak Allah adalah mengambil sesuatu dan memberikan sesuatu. Segala sesuatu yang di sisi-Nya dibatasi dengan ajal yang ditentukan. Oleh karena itu, bersabarlah dan carilah ridha Allah",
  },
  {
    title: "Doa Memasukkan Jenazah Ke Liang Kubur",
    arabic: "بِسْمِ اللَّهِ وَعَلَى سُنَّةِ رَسُوْلِ اللَّهِ",
    latin: "Bismillaahi wa 'alaa sunnati rosuulillaah",
    translation: "Dengan nama Allah dan sesuai petunjuk Rasulullah",
  },
  {
    title: "Doa Setelah Jenazah Dimakamkan",
    arabic: "اَللَّهُمَّ اغْفِرْ لَهُ اَللَّهُمَّ ثَبِّتْهُ",
    latin: "Allaahummaghfir lahu, allaahumma tsabbit-hu",
    translation:
      "Ya Allah ampunilah dia, Ya Allah teguhkanlah dia (untuk menjawab pertanyaan malaikat)",
  },
  {
    title: "Doa Ziarah Kubur",
    arabic:
      "اَلسَّلَامُ عَلَيْكُمْ دَارَ قَوْمٍ مُؤْمِنِينَ، وَإِنَّا إِنْ شَاءَ اللَّهُ بِكُمْ لَاحِقُونَ",
    latin:
      "As-salaamu 'alaikum daaro qoumin mu'miniin, wa innaa in syaa-allaahu bikum laa hiquun",
    translation:
      "Semoga keselamatan atas kalian, wahai penghuni rumah kaum mukminin. Kami insya Allah akan menyusul kalian",
  },
  {
    title: "Doa Ketika Sedih, Gundah Atau Galau",
    arabic:
      "اَللَّهُمَّ إِنِّيْ عَبْدُكَ، وَابْنُ عَبْدِكَ، وَابْنُ أَمَتِكَ، نَاصِيَتِيْ بِيَدِكَ، مَاضٍ فِيَّ حُكْمُكَ، عَدْلٌ فِيَّ قَضَاؤُكَ، أَسْأَلُكَ بِكُلِّ اسْمٍ هُوَ لَكَ، سَمَّيْتَ بِهِ نَفْسَكَ، أَوْ أَنْزَلْتَهُ فِيْ كِتَابِكَ، أَوْ عَلَّمْتَهُ أَحَدًا مِنْ خَلْقِكَ، أَوِ اسْتَأْثَرْتَ بِهِ فِيْ عِلْمِ الْغَيْبِ عِنْدَكَ، أَنْ تَجْعَلَ الْقُرْآنَ رَبِيْعَ قَلْبِيْ، وَنُوْرَ صَدْرِيْ، وَجَلاَءَ حُزْنِيْ، وَذَهَابَ هَمِّيْ",
    latin:
      "Allaahumma innii 'abduka, wabnu 'abdika, wabnu amatika, naashiyatii biyadika, maadhin fiyya hukmuka, 'adlun fiyya qodhoo-uka, as-aluka bikullismin huwa laka, sammaita bihi nafsaka, au anzaltahu fii kitaabika, au 'allamtahu ahadan min kholqika, awista'tsarta bihi fii 'ilmil ghoibi 'indaka, an taj'alal qur-aana robii'a qolbii, wa nuuro shodrii, wa jalaa-a huznii, wa dzahaaba hammii",
    translation:
      "Ya Allah, sesungguhnya aku adalah hambaMu, anak hambaMu (Adam), dan anak hamba perempuanMu (Hawa), ubun-ubunku berada di tanganMu, hukumMu berlaku terhadap diriku, dan ketetapanMu adil pada diriku. Aku memohon kepadaMu dengan segala Nama yang menjadi milikMu, yang Engkau namai diriMu dengannya, atau yang Engkau turunkan di dalam kitabMu, atau yang Engkau ajarkan kepada seseorang dari makhlukMu, atau yang Engkau rahasiakan dalam ilmu ghaib yang ada di sisiMu, maka aku mohon dengan itu agar Engkau jadikan Al-Qur'an sebagai penyejuk hatiku, cahaya bagi dadaku, pelipur kesedihanku, dan penghilang bagi kesusahanku",
  },
  {
    title: "Doa Ketika Mengalami Kesulitan",
    arabic:
      "لاَ إِلَـٰهَ إِلاَّ اللَّهُ الْعَظِيْمُ الْحَلِيْمُ، لاَ إِلَـٰهَ إِلاَّ اللَّهُ رَبُّ الْعَرْشِ الْعَظِيْمِ، لاَ إِلَـٰهَ إِلاَّ اللَّهُ رَبُّ السَّمَاوَاتِ وَرَبُّ اْلأَرْضِ وَرَبُّ الْعَرْشِ الْكَرِيْمِ",
    latin:
      "Laa ilaaha illallaahul 'azhiimul haliim, laa ilaaha illallaahu robbul 'arsyil 'azhiim, laa ilaaha illallaahu robbus-samaawaati wa robbul ardhi wa robbul 'arsyil kariim",
    translation:
      "Tidak ada sesembahan yang berhak disembah kecuali Allah Yang Maha Agung dan Maha Lembut. Tidak ada sesembahan yang berhak disembah kecuali Allah, Tuhan yang menguasai arasy, yang Maha Agung. Tidak ada sesembahan yang berhak disembah kecuali Allah, Tuhan yang menguasai langit dan bumi. Tuhan Yang menguasai arasy, lagi Maha Mulia",
  },
  {
    title: "Doa Bila Tertimpa Sesuatu Yang Tidak Disenangi/Musibah",
    arabic: "قَدَرُ اللَّهِ وَمَا شَاءَ فَعَلَ",
    latin: "Qoddarollaahu wa maa syaa-a fa'ala",
    translation:
      "Allah telah mentaqdirkannya, dan apa yang Dia kehendaki, Dia lakukan",
  },
  {
    title: "Doa Bila Tertimpa Musibah",
    arabic:
      "إِنَّا لِلَّهِ وَإِنَّا إِلَيْهِ رَاجِعُوْنَ، اَللَّهُمَّ أُجُرْنِيْ فِيْ مُصِيْبَتِيْ وَأَخْلِفْ لِيْ خَيْرًا مِنْهَا",
    latin:
      "Innaa lillaahi wa innaa ilaihi rooji'uun, allaahumma ujurnii fii mushiibatii wa akhlif lii khoiron minhaa",
    translation:
      "Sesungguhnya kami milik Allah dan kepadaNya kami akan kembali (di hari Kiamat). Ya Allah, berilah pahala kepadaku dan gantilah untukku dengan yang lebih baik (dari musibahku)",
  },
  {
    title: "Doa Bila Ada Sesuatu Yang Menyenangkan",
    arabic: "اَلْحَمْدُ لِلَّهِ الَّذِي بِنِعْمَتِهِ تَتِمُّ الصَّالِحَاتُ",
    latin: "Alhamdulillaahil-ladzii bini'matihi tatimmush-shoolihaat",
    translation:
      "Segala puji bagi Allah yang dengan nikmat-Nya segala amal shalih sempurna",
  },
  {
    title: "Doa Bila Ada Sesuatu Yang Menyusahkan atau Tidak Menyenangkan",
    arabic: "اَلْحَمْدُ لِلَّهِ عَلَى كُلِّ حَالٍ",
    latin: "Alhamdulillaahi 'alaa kulli haal",
    translation: "Segala puji bagi Allah atas segala keadaan",
  },
  {
    title: "Doa Agar Terbebas/Bisa Melunasi/Membayar Hutang",
    arabic: "اَللَّهُمَّ إِنِّى أَعُوْذُ بِكَ مِنَ الْمَأْثَمِ وَالْمَغْرَمِ",
    latin: "Allaahumma innii a'uudzu bika minal ma'tsami wal maghrom",
    translation:
      "Ya Allah, aku berlindung kepada-Mu dari berbuat dosa dan sulitnya utang",
  },
  {
    title: "Doa Kepada Orang Yang Menawarkan Hartanya Untukmu",
    arabic: "بَارَكَ اللَّهُ لَكَ فِيْ أَهْلِكَ وَمَالِكَ",
    latin: "Baarokallaahu laka fii ahlika wa maalika",
    translation: "Semoga Allah memberkahimu dalam keluarga dan hartamu",
  },
  {
    title: "Doa Kepada Orang Yang Meminjami Uang Ketika Membayar Hutang",
    arabic:
      "بَارَكَ اللَّهُ لَكَ فِيْ أَهْلِكَ وَمَالِكَ، إِنَّمَا جَزَاءُ السَّلَفِ الْحَمْدُ وَاْلأَدَاءُ",
    latin:
      "Baarokallaahu laka fii ahlika wa maalika, innamaa jazaa-us-salafil hamdu wal adaa-u",
    translation:
      "Semoga Allah memberikan berkah kepadamu dalam keluarga dan hartamu. Sesungguhnya balasan meminjami adalah pujian dan pembayaran.",
  },
  {
    title: "Doa Musafir Kepada Orang Yang Ditinggalkan",
    arabic: "أَسْتَوْدِعُكُمُ اللَّهَ الَّذِيْ لاَ تَضِيْعُ وَدَائِعُهُ",
    latin: "Astaudi'ukumullaahal-ladzii laa tadhii'u wa daa-i'uh",
    translation:
      "Aku menitipkan kamu kepada Allah yang tidak akan hilang titipan-Nya",
  },
  {
    title: "Doa Orang Mukim Kepada Musafir",
    arabic:
      "أَسْتَوْدِعُ اللَّهَ دِيْنَكَ وَأَمَانَتَكَ وَخَوَاتِيْمَ عَمَلِكَ",
    latin: "Astaudi'ullaaha diinaka wa amaanataka wa khowaatiima 'amalik",
    translation:
      "Aku menitipkan agamamu, amanatmu dan penutup amalmu kepada Allah",
  },
  {
    title: "Doa Singgah di Suatu Tempat, Baik Dalam Bepergian Ataupun Tidak",
    arabic: "أَعُوْذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ",
    latin: "A'uudzu bikalimaatillaahit-taammaati min syarri maa kholaq",
    translation:
      "Aku berlindung dengan kalimat-kalimat Allah yang sempurna, dari kejahatan apa yang diciptakan-Nya",
  },
  {
    title: "Doa Berlindung/Menghilangkan Gangguan Setan",
    arabic: "أَعُوْذُ بِاللَّهِ مِنَ الشَّيْطَانِ الرَّجِيْمِ",
    latin: "A'uudzu billaahi minasy-syaithoonir-rojiim",
    translation:
      "Aku berlindung kepada Allah dari godaan syaitan yang terkutuk",
  },
  {
    title: "Doa Memohon Surga Dan Berlindung Dari Neraka",
    arabic:
      "اَللَّهُمَّ إِنِّيْ أَسْأَلُكَ الْجَنَّةَ، وَأَعُوْذُ بِكَ مِنَ النَّارِ",
    latin: "Allaahumma innii as-alukal jannah, wa a'uudzu bika minan-naar",
    translation:
      "Ya Allah, aku mohon kepada-Mu surga, dan aku berlindung kepada-Mu dari neraka",
  },
  {
    title: "Doa Memohon Akhlak Mulia",
    arabic: "اَللَّهُمَّ أَحْسَنْتَ خَلْقِي فَأَحْسِنْ خُلُقِي",
    latin: "Allaahumma ahsanta kholqii, fa-ahsin khuluqii",
    translation:
      "Ya Allah, Engkau telah memperbagus penciptaanku, maka baguskanlah akhlakku",
  },
  {
    title: "Doa Berlindung Dari Kemungkaran Akhlak, Amal Dan Hawa Nafsu",
    arabic:
      "اَللَّهُمَّ إِنِّيْ أَعُوْذُ بِكَ مِنْ مُنْكَرَاتِ الْأَخْلَاقِ، وَالْأَعْمَالِ، وَالْأَهْوَاءِ",
    latin:
      "Allaahumma innii a'uudzu bika min munkarootil akhlaaq, wal a'maal, wal ahwaa'",
    translation:
      "Ya Allah, sesungguhnya aku berlindung kepada-Mu dari kemungkaran akhlak, amal dan hawa nafsu",
  },
  {
    title:
      "Doa Memohon Ampun Untuk Diri Sendiri, Orang Tua Dan Kaum Mukminin (Doa Nabi Ibrahim)",
    arabic:
      "رَبَّنَا اغْفِرْ لِي وَلِوَالِدَيَّ وَلِلْمُؤْمِنِينَ يَوْمَ يَقُومُ الْحِسَابُ",
    latin:
      "Robbanagh-fir lii wa liwaalidayya wa lil mu'miniina yauma yaquumul hisaab",
    translation:
      "Ya Tuhan kami, beri ampunlah aku dan kedua ibu bapakku dan sekalian orang-orang mukmin pada hari terjadinya hisab (hari kiamat)",
  },
  {
    title:
      "Doa Memohon Ampun Untuk Diri Sendiri, Orang Tua Dan Kaum Mukminin (Doa Nabi Nuh)",
    arabic:
      "رَّبِّ اغْفِرْ لِي وَلِوَالِدَيَّ وَلِمَن دَخَلَ بَيْتِيَ مُؤْمِنًا وَلِلْمُؤْمِنِينَ وَالْمُؤْمِنَاتِ وَلَا تَزِدِ الظَّالِمِينَ إِلَّا تَبَارًا",
    latin:
      "Robbigh-fir lii wa liwaalidayya wa liman dakhola baitiya mu'minan wa lil mu'miniina wal mu'minaati wa laa tazidizh-zhoolimiina illaa tabaaroo",
    translation:
      "Ya Tuhanku! Ampunilah aku, ibu bapakku, orang yang masuk ke rumahku dengan beriman dan semua orang yang beriman laki-laki dan perempuan. Dan janganlah Engkau tambahkan bagi orang-orang yang zalim itu selain kebinasaan",
  },
  {
    title: "Doa Memohon Kasih Sayang Untuk Orang Tua",
    arabic: "رَّبِّ ارْحَمْهُمَا كَمَا رَبَّيَانِي صَغِيرًا",
    latin: "Robbir-hamhumaa kamaa robbayaanii shoghiiroo",
    translation:
      "Wahai Tuhanku, kasihilah mereka keduanya, sebagaimana mereka berdua telah mendidik aku waktu kecil",
  },
  {
    title:
      "Doa Agar Menjadi Hamba Yang Bersyukur, Agar Bisa Beramal Shaleh Dan Minta Anak Shaleh",
    arabic:
      "رَبِّ أَوْزِعْنِي أَنْ أَشْكُرَ نِعْمَتَكَ الَّتِي أَنْعَمْتَ عَلَيَّ وَعَلَى وَالِدَيَّ وَأَنْ أَعْمَلَ صَالِحًا تَرْضَاهُ وَأَصْلِحْ لِي فِي ذُرِّيَّتِي إِنِّي تُبْتُ إِلَيْكَ وَإِنِّي مِنَ الْمُسْلِمِينَ",
    latin:
      "Robbi auzi'nii an asykuro ni'matakallatii an'amta 'alayya wa 'alaa waalidayya wa an a'mala shoolihan tardhoohu, wa ashlih lii fii dzurriyyatii, innii tubtu ilaika wa innii minal muslimiin",
    translation:
      "Ya Rabbku, tunjukilah aku untuk mensyukuri nikmat-Mu yang telah Engkau berikan kepadaku dan kepada ibu bapakku, dan supaya aku dapat berbuat amal shaleh yang Engkau ridhai. Berilah kebaikan kepadaku dengan (memberi kebaikan) kepada anak cucuku. Sesungguhnya aku bertaubat kepada-Mu dan sesungguhnya aku termasuk orang-orang yang berserah diri",
  },
  {
    title: "Doa Agar Anak Terjaga Dari Zina",
    arabic:
      "اَللَّهُمَّ اغْفِرْ ذَنْبَهُ، وَطَهِّرْ قَلْبَهُ، وَحَصِّنْ فَرْجَهُ",
    latin:
      "Allaahummagh-fir dzanbahu, wa thohhir qolbahu, wa hash-shin farjahu",
    translation:
      "Ya Allah, ampunilah dosanya, sucikanlah hatinya, dan jagalah kemaluannya",
  },
  {
    title: "Doa Memohon Keteguhan Hati",
    arabic:
      "اَللَّهُمَّ مُصَرِّفَ الْقُلُوبِ، صَرِّفْ قُلُوبَنَا عَلَى طَاعَتِكَ",
    latin: "Allaahumma mushorrifal quluub, shorrif quluubanaa 'alaa thoo'atik",
    translation:
      "Ya Allah, Dzat yang memalingkan hati, palingkanlah hati kami kepada ketaatan beribadah kepada-Mu",
  },
  {
    title: "Doa Memohon Ampun Dan Rahmat",
    arabic:
      "رَبَّنَا آمَنَّا فَاغْفِرْ لَنَا وَارْحَمْنَا وَأَنْتَ خَيْرُ الرَّاحِمِينَ",
    latin:
      "Robbanaa, aamannaa, fagh-fir lanaa warhamnaa, wa anta khoirur-roohimiin",
    translation:
      "Ya Tuhan kami, kami telah beriman, maka ampunilah kami dan berilah kami rahmat, dan Engkau adalah Pemberi rahmat Yang Paling Baik",
  },
  {
    title: "Doa Memohon Ampun Pada Hari Pembalasan",
    arabic: "رَبِّ اغْفِرْ لِي خَطِيئَتِي يَوْمَ الدِّينِ",
    latin: "Robbigh-fir lii khothii-atii yaumad-diin",
    translation: "Ya Rabbi, ampunilah kesalahanku pada hari Pembalasan",
  },
  {
    title: "Doa Agar Tidak Terpedaya Kenikmatan Dan Kemewahan Dunia",
    arabic: "اَللَّهُمَّ لَا عَيْشَ إِلَّا عَيْشُ الْآخِرَةِ",
    latin: "Allaahumma laa 'aisya illaa 'aisyul aakhiroh",
    translation:
      "Ya Allah, tidak ada kehidupan yang hakiki kecuali kehidupan akhirat",
  },
  {
    title:
      "Doa Memohon Kesabaran, Teguh Pendirian Dan Pertolongan Terhadap Orang Kafir",
    arabic:
      "رَبَّنَا أَفْرِغْ عَلَيْنَا صَبْرًا وَثَبِّتْ أَقْدَامَنَا وَانْصُرْنَا عَلَى الْقَوْمِ الْكَافِرِينَ",
    latin:
      "Robbanaa afrigh 'alainaa shobron, wa tsabbit aqdaamanaa, wan-shurnaa 'alal qoumil kaafiriin",
    translation:
      "Ya Rabb kami, limpahkanlah kesabaran atas diri kami, dan teguhkanlah pendirian kami, dan tolonglah kami terhadap orang-orang kafir",
  },
];

const app = express();

app.use(cors());
app.use(express.json());

const router = express.Router();
app.use("/api", router);

router.get("/datas", (_req, res) => {
  res.json(datas);
});

app.listen(process.env.API_PORT, () =>
  console.log("Server berhasil dijalankan.")
);
