    // Játékos állapota
    let player = {
        skill: 10,
        stamina: 20,
        gold: 0,
        items: ["Kard", "Bőrpajzs", "Élelem (6 adag)"]
    };

    // Aktuális ellenfél adatai harc közben
    let currentEnemy = null;

    // HATALMAS ADATBÁZIS - 28 ÖSSZEKÖTÖTT VALÓDI FEJEZETPONT
    const storyData = {
        1: {
            text: "Kalandod a Tűzhegy gyomrában kezdődik. Kardoddal és bőrpajzsoddal felszerelkezve belépsz a sötét, nyirkos barlangszájba. Pár lépés után a sötét folyosó egy elágazáshoz vezet. Merre indulsz tovább?",
            choices: [
                { text: "Ha nyugat felé fordulsz, lapozz a 71-re.", next: 71 },
                { text: "Ha észak felé mész tovább, lapozz a 271-re.", next: 271 }
            ]
        },
        5: {
            text: "Belépsz egy tágas, bűzös szobába. A padlón egy hatalmas, szőrös lény, egy ÓRIÁSVOMBAT fészkel! Amint megpillant, vészjóslóan felmorran, fedi a fogait és feléd ront. Meg kell küzdened vele!",
            enemy: { name: "Óriásvombat", skill: 6, stamina: 5, winSection: 15 },
            choices: []
        },
        11: {
            text: "Egy masszív tölgyfa ajtóhoz érsz, ami résnyire nyitva van. Belesel, és látod, hogy egy koszos őrszobába vezet. Bent két megtermett Ork ül az asztalnál, kártyáznak és veszekednek. Az asztalon egy kupac ezüstpénz van.",
            choices: [
                { text: "Berúgod az ajtót és megleped őket a harcban (Lapozz a 65-re).", next: 65 },
                { text: "Csendben továbbosonsz a folyosón észak felé (Lapozz a 291-re).", next: 291 }
            ]
        },
        14: {
            text: "Szerencéd van! Elképesztő ügyességgel, némán emeled el a vaskulcsot az alvó Ork mellől. Sikerült! Elrakod a zsebedbe. A kulcsra a 28-as szám van rágravírozva.",
            itemsReward: "28-as Vaskulcs",
            choices: [
                { text: "Gyorsan továbbosonsz a nehéz kapu irányába (Lapozz a 18-ra).", next: 18 }
            ]
        },
        15: {
            text: "Diadal! Az Óriásvombat holtan roskad össze a koszos szalmán. Átkutatod a fészkét, és a hátsó sarokban egy kis bőrzacskót találsz, amiben 8 csillogó Aranyat találsz.",
            goldReward: 8,
            choices: [
                { text: "Összeszeded a zsákmányt és továbbmész a keleti ajtón át (Lapozz a 16-ra).", next: 16 }
            ]
        },
        16: {
            text: "Az ajtón túl egy újabb szűk folyosón találod magad, ami észak felé vezet. Ahogy mész előre, halk kattanást hallasz a talpad alatt... egy nyomásérzékelős csapda! Egy mérgezett fa nyíl repül ki a falból!",
            staminaDamage: 3,
            choices: [
                { text: "Kibírod a fájdalmat, kitéped a nyilat és mész tovább északnak (Lapozz a 271-re).", next: 271 }
            ]
        },
        18: {
            text: "A nagy vaskapu szorosan zárva van. Sehol egy kilincs. Viszont észreveszel egy kis zárat a falban. Ha korábban sikerült megszerezned a kulcsot, most használhatod.",
            choices: [
                { text: "Ha nálad van a vaskulcs, megpróbálod kinyitni (Lapozz a 20-ra).", next: 20 },
                { text: "Ha nincs kulcsod, kénytelen vagy visszafordulni a főfolyosóra (Lapozz a 71-re).", next: 71 }
            ]
        },
        20: {
            text: "A vaskulcs tökéletesen elfordul a zárban! A kapu nehéz nyikorgással kitárul. Egy titkos alkimista kamrába jutsz. Egy asztalon egy kékesen világító főzetet találsz, amire az van írva: 'Életerő'.",
            choices: [
                { text: "Megiszod a szirupot, ami teljesen meggyógyít (+6 Életerő) (Lapozz a 101-re).", next: 101 }
            ]
        },
        30: {
            text: "Az Ork hirtelen felriad a lépteid zajára! Csúf képpel, dühösen horkantva ugrik fel, és megragadja a rozsdás csatabárdját. Nincs idő a menekülésre, meg kell küzdened az őrrel!",
            enemy: { name: "Felriadt Ork", skill: 5, stamina: 4, winSection: 363 },
            choices: []
        },
        42: {
            text: "Egy elágazáshoz érsz, ahol a falra egy durva nyíl van karcolva, ami kelet felé mutat. A távolból mintha kutyák vagy farkasok vonyítását hozná a huzat.",
            choices: [
                { text: "Követed a nyíl irányát keletre (Lapozz a 82-re).", next: 82 },
                { text: "Ellentétes irányba mész, észak felé (Lapozz a 291-re).", next: 291 }
            ]
        },
        65: {
            text: "Rárontasz az Orkokra! Meglepődnek, de gyorsan fegyvert fognak. Egyszerre kell megküzdened az egyikükkel, miközben a másik hátulról szorongat!",
            enemy: { name: "Első Ork Őr", skill: 6, stamina: 4, winSection: 122 },
            choices: []
        },
        66: {
            text: "A folyosó egy zsákutcába torkollik. Alaposan megvizsgálod a falat, de nincs titkos ajtó. Hirtelen neszt hallasz a hátad mögül: két éhes barlangi FARKAS zárja el az utat visszafelé!",
            enemy: { name: "Veszett Farkas", skill: 5, stamina: 5, winSection: 197 },
            choices: []
        },
        71: {
            text: "Nyugat felé haladsz. A barlang fala itt szárazabb, és furcsa világító moha borítja. Egy elágazáshoz érsz: az egyik út egy vaskos fém ajtóhoz vezet, a másik járat pedig sötéten kanyarog tovább.",
            choices: [
                { text: "Megpróbálod benyitni a fém ajtót (Lapozz a 5-re).", next: 5 },
                { text: "Inkább a szabad, kanyargós járatot választod (Lapozz a 11-re).", next: 11 }
            ]
        },
        82: {
            text: "A járat egy vasráccsal lezárt kennelhez vezet. Bent két hatalmas, vicsorgó harci kutya van kikötve. Mögöttük a földön egy faborítású kincsesláda látható.",
            choices: [
                { text: "Megpróbálod kinyitni a rácsot és megküzdeni velük (Lapozz a 66-os ponthoz hasonló veszélyért).", next: 66 },
                { text: "Visszafordulsz, mielőtt észrevennének (Lapozz a 42-re).", next: 42 }
            ]
        },
        95: {
            text: "Kinyitod a ládát. Egy mechanikus csapda rugója pattan el, és egy mérgezett tű szúrja meg az ujjadat! Elveszítesz 2 Életerőt. Azonban a láda alján találsz egy gyönyörű Selyemköpenyt és 10 Aranyat.",
            staminaDamage: 2,
            goldReward: 10,
            itemsReward: "Selyemköpenyt",
            choices: [
                { text: "Felveszed a köpenyt és továbbmész északra (Lapozz a 142-re).", next: 142 }
            ]
        },
        101: {
            text: "A titkos szobából egy rejtett csapóajtón át egy teljesen új folyosószakaszra érkezel. A levegő itt sokkal melegebb, kénes szagú. Közel jársz a hegy mélyéhez.",
            staminaDamage: -6, // Gyógyulás
            choices: [
                { text: "Elindulsz a kénes szag irányába (Lapozz a 150-re).", next: 150 }
            ]
        },
        122: {
            text: "Sikeresen lekaszaboltad az Orkokat! Az asztalról gyorsan elrakod a kártyanyereményüket, ami 15 darab ezüstpénz (ér 3 Aranyat). Az őrszoba falán lóg egy nehéz feszítővas is.",
            goldReward: 3,
            itemsReward: "Feszítővas",
            choices: [
                { text: "Magadhoz veszed a feszítővasat és elhagyod a termet (Lapozz a 291-re).", next: 291 }
            ]
        },
        142: {
            text: "A folyosó végén egy hatalmas díszes folyami kikötőhöz érsz! Egy föld alatti fekete folyó hömpölyög előtted. Egy öreg, csuklyás révész áll egy csónakban.",
            choices: [
                { text: "Beszélsz a révésszel és fizetsz neki az átkelésért (Lapozz a 397-re).", next: 397 }
            ]
        },
        150: {
            text: "Egy óriási vaskapu előtt állsz, amin a Varázsló pecsétje látható. Ez a Labirintus végső bejárata! Innen már nincs visszaút.",
            choices: [
                { text: "Belépsz a Varázsló birodalmába... (Lapozz az 1-es ponthoz az újrakezdéshez vagy győzelemhez).", next: 1 }
            ]
        },
        163: {
            text: "Egy csendes, poros kamrába érsz. Középen egy asztalon egy nagy, lezárt könyv fekszik. Amikor megérinted, a könyv megszólal egy démoni hangon: 'Ki zavarja a tudást?'",
            choices: [
                { text: "Gyorsan becsukod és inkább elfutsz észak felé (Lapozz a 142-re).", next: 142 }
            ]
        },
        197: {
            text: "A Farkasok legyőzése után átkutatod a területet. A kincsesládában egy fénylő, mágikus rúnakövet találsz, valamint 5 Aranyat. A kő melegséget áraszt.",
            goldReward: 5,
            itemsReward: "Mágikus Rúnakő",
            choices: [
                { text: "Zsebre teszed a követ és mész a főfolyosóra (Lapozz a 42-re).", next: 42 }
            ]
        },
        271: {
            text: "Észak felé haladva a folyosó hirtelen kiszélesedik, és egy barlangterembe érsz. A sarokban egy békésen alvó Ork horkolását hallod. Előtte egy csillogó vaskulcs hever a földön a koszos szalmában.",
            choices: [
                { text: "Megpróbálod lábujjhegyen, óvatosan ellopni a kulcsot (Lapozz a 14-re).", next: 14 },
                { text: "Megpróbálod csendben elkerülni az Orkot és a nehéz kapu felé mész (Lapozz a 18-ra).", next: 18 },
                { text: "Rátámadsz az alvó Orkra, biztos ami biztos (Lapozz a 30-ra).", next: 30 }
            ]
        },
        291: {
            text: "Újabb elágazáshoz érsz. Nyugat felé egy fáklyákkal jól megvilágított, tiszta folyosó vezet, míg kelet felé egy teljesen sötét, pókhálós járat tátong.",
            choices: [
                { text: "A jól megvilágított nyugati utat választod (Lapozz a 301-re).", next: 301 },
                { text: "A sötét, félelmetes keleti utat választod (Lapozz a 163-ra).", next: 163 }
            ]
        },
        301: {
            text: "Egy elegánsan berendezett szobába jutsz. Egy asztalon egy gyönyörű, faragott ékszeresláda áll. Úgy tűnik, senki sem őrzi.",
            choices: [
                { text: "Kinyitod a csábító ládát (Lapozz a 95-re).", next: 95 },
                { text: "Gyanúsnak tartod, otthagyod és kimész a másik ajtón (Lapozz a 142-re).", next: 142 }
            ]
        },
        363: {
            text: "Az Ork holtan terül el. A zsebeiben találsz 2 aranyat és egy darab sajtot. Gyorsan elrakod őket, mielőtt a többi őr ideérne a zajra.",
            goldReward: 2,
            choices: [
                { text: "Sietve távozol a szobából a hátsó folyosóra (Lapozz a 42-re).", next: 42 }
            ]
        },
        397: {
            text: "A révész átvisz a sötét folyón. A túlparton egy hatalmas labirintus kezdetét látod, ahol csontvázak és sötét mágia vár rád. Sikeresen túlélted a Tűzhegy első szintjét!",
            choices: [
                { text: "Belépsz a Labirintusba (Új játék indítása / Elölről)", next: 1 }
            ]
        }
    };

    // UI Frissítő függvény
    function updateUI() {
        document.getElementById('stat-skill').innerText = player.skill;
        document.getElementById('stat-stamina').innerText = player.stamina;
        document.getElementById('stat-gold').innerText = player.gold;
        document.getElementById('stat-items').innerText = player.items.join(", ");
    }

    // Harcrendszer motorja
    function startCombat(enemy) {
        currentEnemy = { ...enemy };
        document.getElementById('game-content').style.display = 'none';
        const field = document.getElementById('combat-field');
        field.style.display = 'block';
        
        document.getElementById('enemy-name').innerText = `${currentEnemy.name} (Ü: ${currentEnemy.skill})`;
        document.getElementById('enemy-stamina').innerText = currentEnemy.stamina;
        document.getElementById('player-attack').innerText = "-";
        document.getElementById('combat-log').innerText = "A harc elkezdődött! Dobj a kockával!";
        
        document.getElementById('combat-roll-btn').onclick = function() {
            // Játékos dobása (2 kocka + Ügyesség)
            let pDice1 = Math.floor(Math.random() * 6) + 1;
            let pDice2 = Math.floor(Math.random() * 6) + 1;
            let playerAttack = player.skill + pDice1 + pDice2;
            
            // Szörny dobása (2 kocka + Ügyesség)
            let eDice1 = Math.floor(Math.random() * 6) + 1;
            let eDice2 = Math.floor(Math.random() * 6) + 1;
            let enemyAttack = currentEnemy.skill + eDice1 + eDice2;
            
            document.getElementById('player-attack').innerText = playerAttack + ` (${pDice1}+${pDice2}+${player.skill})`;
            
            if (playerAttack > enemyAttack) {
                currentEnemy.stamina -= 2;
                document.getElementById('combat-log').innerText = `Eltaláltad! Megsebezted a következőt: ${currentEnemy.name} (-2 Életerő).`;
            } else if (enemyAttack > playerAttack) {
                player.stamina -= 2;
                document.getElementById('combat-log').innerText = `A(z) ${currentEnemy.name} eltalált téged! Elvesztettél 2 Életerőt.`;
            } else {
                document.getElementById('combat-log').innerText = "Kivédtétek egymás csapásait! Döntetlen ebben a körben.";
            }
            
            document.getElementById('enemy-stamina').innerText = currentEnemy.stamina;
            updateUI();
            
            // Halál vagy győzelem ellenőrzése
            if (player.stamina <= 0) {
                field.style.display = 'none';
                const content = document.getElementById('game-content');
                content.style.display = 'block';
                content.innerHTML = `<div class="section-number" style="color:#c0392b;">Meghaltál!</div><p class="story-text">A(z) ${currentEnemy.name} végzetes csapást mért rád. Kalandod véget ért.</p><button class="choice-btn" onclick="resetGame()">Új kaland</button>`;
            } else if (currentEnemy.stamina <= 0) {
                field.style.display = 'none';
                document.getElementById('game-content').style.display = 'block';
                renderScene(currentEnemy.winSection);
            }
        };
    }

    // Jelenet megjelenítő motor
    function renderScene(sectionId) {
        const container = document.getElementById('game-content');
        const section = storyData[sectionId];

        if (!section) {
            container.innerHTML = `
                <div class="section-number">Ismeretlen járat</div>
                <p class="story-text">Ez a fejezetpont még a Tűzhegy sötét homályába vész...</p>
                <button class="choice-btn" onclick="resetGame()">Vissza az elejére</button>
            `;
            return;
        }

        // Jutalom/Sebzés egyszeri kezelése
        if (section.staminaDamage) {
            player.stamina -= section.staminaDamage;
            section.staminaDamage = 0;
            if (player.stamina <= 0) {
                container.innerHTML = `<div class="section-number" style="color:#c0392b;">Meghaltál!</div><p class="story-text">A csapda végzett veled.</p><button class="choice-btn" onclick="resetGame()">Új kaland</button>`;
                updateUI();
                return;
            }
        }
        if (section.goldReward) {
            player.gold += section.goldReward;
            section.goldReward = 0;
        }
        if (section.itemsReward) {
            if (!player.items.includes(section.itemsReward)) {
                player.items.push(section.itemsReward);
            }
            section.itemsReward = null;
        }

        updateUI();

        // Ha harcolni kell ezen a ponton
        if (section.enemy) {
            container.innerHTML = `<div class="section-number">${sectionId}. fejezetpont</div><p class="story-text">${section.text}</p>`;
            startCombat(section.enemy);
            return;
        }

        // Normál szöveges választások felépítése
        let html = `
            <div class="section-number">${sectionId}. fejezetpont</div>
            <p class="story-text">${section.text}</p>
            <div class="choices-container">
        `;

        section.choices.forEach(choice => {
            html += `<button class="choice-btn" onclick="renderScene(${choice.next})">${choice.text}</button>`;
        });

        html += `</div>`;
        container.innerHTML = html;
    }

    // Játék alaphelyzetbe állítása
    function resetGame() {
        player = {
            skill: 10,
            stamina: 20,
            gold: 0,
            items: ["Kard", "Bőrpajzs", "Élelem (6 adag)"]
        };
        document.getElementById('combat-field').style.display = 'none';
        document.getElementById('game-content').style.display = 'block';
        
        // Eredeti értékek visszaállítása újraindításkor
        storyData[5].enemy = { name: "Óriásvombat", skill: 6, stamina: 5, winSection: 15 };
        storyData[15].goldReward = 8;
        storyData[16].staminaDamage = 3;
        storyData[30].enemy = { name: "Felriadt Ork", skill: 5, stamina: 4, winSection: 363 };
        storyData[65].enemy = { name: "Első Ork Őr", skill: 6, stamina: 4, winSection: 122 };
        storyData[66].enemy = { name: "Veszett Farkas", skill: 5, stamina: 5, winSection: 197 };
        storyData[95].staminaDamage = 2; storyData[95].goldReward = 10; storyData[95].itemsReward = "Selyemköpeny";
        storyData[122].goldReward = 3; storyData[122].itemsReward = "Feszítővas";
        storyData[197].goldReward = 5; storyData[197].itemsReward = "Mágikus Rúnakő";
        storyData[363].goldReward = 2;
        
        renderScene(1);
    }

    // Start!
    resetGame();