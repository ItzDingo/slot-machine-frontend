// API Configuration
const API_BASE_URL = 'https://slot-machine-backend-34lg.onrender.com';

// Game Configuration
const CONFIG = {
    spinCost: 15,
    lootboxCost: 50,
    symbols: [
        { name: '7', img: 'assets/7.png' },
        { name: 'dollar', img: 'assets/dollar.png' },
        { name: 'bell', img: 'assets/bell.png' },
        { name: 'diamond', img: 'assets/diamond.png' },
        { name: 'cherry', img: 'assets/cherry.png' },
        { name: 'coin', img: 'assets/coin.png' },
        { name: '1', img: 'assets/1.png' },
        { name: '0', img: 'assets/0.png' },
        { name: 'lemon', img: 'assets/lemon.png' },
        { name: 'card', img: 'assets/card.png' },
        { name: 'star', img: 'assets/star.png' },
        { name: 'clover', img: 'assets/clover.png' }
    ],
    lootboxCases: [
        {
            id: 'case1',
            name: 'Dreams & Nightmares Case',
            img: 'spins/case1.png',
            cost: 50,
            limitedTime: false, // Add this
            startTime: '2025-08-01T00:00:00', // Add start time (optional)
            endTime: '2025-08-15T23:59:59', // Add end time
            playVideo: false, // Add this
            video: 'spins/video1.mp4', // Add this
            mythicVideo: true,  // Set to true for cases that should play video for mythic items
            mythicVideoFile: 'spins/limited1.mp4',  // Path to the video file
            items: [
                { name: 'MP7 Abyssal Apparition', img: 'spins/MP7-Abyssal-Apparition.png', rarity: 'legendary', chance: 0.8, value: 3600 },
                { name: 'SCAR20 Poultrygeist', img: 'spins/SCAR-20-Poultrygeist-Skin.png', rarity: 'common', chance: 30, value: 15 },
                { name: 'M4A1-S Night Terror', img: 'spins/M4A1-S-Night-Terror.png', rarity: 'epic', chance: 2.5, value: 500 },
                { name: 'P2000 Lifted Spirits', img: 'spins/P2000-Lifted-Spirits.png', rarity: 'common', chance: 30, value: 5 },
                { name: 'USP-S Ticket to Hell', img: 'spins/USP-Ticket-to-Hell-Skin.png', rarity: 'epic', chance: 2.5, value: 225 },
                { name: 'MAG-7 Foresight', img: 'spins/MAG-7-Foresight-Skin.png', rarity: 'common', chance: 14.28, value: 45 },
                { name: 'G3SG1 Dream Glade', img: 'spins/G3SG1-Dream-Glade-Skin.png', rarity: 'uncommon', chance: 10, value: 55 },
                { name: 'AK-47 Nightwish', img: 'spins/AK-47-Nightwish-Skin.png', rarity: 'legendary', chance: 0.3, value: 4000 },
                { name: 'XM1014 Zombie Offensive', img: 'spins/XM1014-Zombie-Offensive-Skin.png', rarity: 'uncommon', chance: 10, value: 100 },
                { name: 'MP9 Starlight Protector', img: 'spins/MP9-Starlight-Protector-Skin.png', rarity: 'legendary', chance: 0.3, value: 2000 },
                { name: 'PP-Bizon Space Cat', img: 'spins/PP-Bizon-Space-Cat-Skin.png', rarity: 'uncommon', chance: 10, value: 47 },
                { name: 'Dual Berettas Melondrama', img: 'spins/Dual-Berettas-Melondrama-Skin.png', rarity: 'legendary', chance: 0.3, value: 1900 },
                { name: 'Five SeveN Scrawl', img: 'spins/Five-SeveN-Scrawl-Skin.png', rarity: 'common', chance: 30, value: 50 },
                { name: 'FAMAS Rapid Eye Movement', img: 'spins/FAMAS-Rapid-Eye-Movement-Skin.png', rarity: 'legendary', chance: 0.3, value: 1600 },
                { name: 'MAC-10 Ensnared', img: 'spins/MAC-10-Ensnared-Skin.png', rarity: 'common', chance: 30, value: 1 },
                { name: 'MP5-SD Necro Jr', img: 'spins/MP5-SD-Necro-Jr-Skin.png', rarity: 'common', chance: 30, value: 3 },
                { name: 'Sawed Off Spirit Board', img: 'spins/Sawed-Off-Spirit-Board-Skin.png', rarity: 'uncommon', chance: 10, value: 75 },
                { name: 'Special Item', img: 'spins/gold.png', rarity: 'mythic', chance: 0.1, value: 0 }
            ],
            knifes: [
                { name: 'Butterfly Knife Black Laminate', img: 'spins/Butterfly-Knife-Black-Laminate-Skin.png', rarity: 'mythic', chance: 0.000567, value: 15000 },
                { name: 'Huntsman Knife Black Laminate', img: 'spins/Huntsman-Knife-Black-Laminate-Skin.png', rarity: 'mythic', chance: 0.000567, value: 17000 },
                { name: 'Bowie Knife Bright Water', img: 'spins/Bowie-Knife-Bright-Water-Skin.png', rarity: 'mythic', chance: 0.000567, value: 14000 },
                { name: 'Butterfly Knife Lore', img: 'spins/Butterfly-Knife-Lore-Skin.png', rarity: 'mythic', chance: 0.000567, value: 35000 },
                { name: 'Huntsman Knife Freehand', img: 'spins/Huntsman-Knife-Freehand-Skin.png', rarity: 'mythic', chance: 0.000567, value: 20000 },
                { name: 'Huntsman Knife Lore', img: 'spins/Huntsman-Knife-Lore-Skin.png', rarity: 'mythic', chance: 0.000567, value: 21000 },
                { name: 'Butterfly Knife Autotronic', img: 'spins/Butterfly-Knife-Autotronic-Skin.png', rarity: 'mythic', chance: 0.000567, value: 17000 },
                { name: 'Huntsman Knife Bright Water', img: 'spins/Huntsman-Knife-Bright-Water-Skin.png', rarity: 'mythic', chance: 0.000567, value: 16000 },
                { name: 'Butterfly Knife Freehand', img: 'spins/Butterfly-Knife-Freehand-Skin.png', rarity: 'mythic', chance: 0.000567, value: 21000 },
                { name: 'Shadow Daggers Freehand', img: 'spins/Shadow-Daggers-Freehand-Skin.png', rarity: 'mythic', chance: 0.000567, value: 45000 },
                { name: 'Huntsman Knife Gamma Doppler', img: 'spins/Huntsman-Knife-Gamma-Doppler-Skin.png', rarity: 'mythic', chance: 0.000567, value: 19000 },
                { name: 'Butterfly Knife Gamma Doppler', img: 'spins/Butterfly-Knife-Gamma-Doppler-Skin.png', rarity: 'mythic', chance: 0.000567, value: 70000 },
                { name: 'Bowie Knife Gamma Doppler', img: 'spins/Bowie-Knife-Gamma-Doppler-Skin.png', rarity: 'mythic', chance: 0.000567, value: 35000 },
                { name: 'Shadow Daggers Gamma Doppler', img: 'spins/Shadow-Daggers-Gamma-Doppler-Skin.png', rarity: 'mythic', chance: 0.000567, value: 55555 },
                { name: 'Falchion Knife Gamma Doppler', img: 'spins/Falchion-Knife-Gamma-Doppler-Skin.png', rarity: 'mythic', chance: 0.000567, value: 24000 },
                { name: 'Bowie Knife Lore', img: 'spins/Bowie-Knife-Lore-Skin.png', rarity: 'mythic', chance: 0.000567, value: 15555 },
                { name: 'Bowie Knife Black Laminate', img: 'spins/Bowie-Knife-Black-Laminate-Skin.png', rarity: 'mythic', chance: 0.000567, value: 8000 },
                { name: 'Falchion Knife Autotronic', img: 'spins/Falchion-Knife-Autotronic-Skin.png', rarity: 'mythic', chance: 0.000567, value: 15000 },
                { name: 'Bowie Knife Autotronic', img: 'spins/Bowie-Knife-Autotronic-Skin.png', rarity: 'mythic', chance: 0.000567, value: 15600 },
                { name: 'Bowie Knife Freehand', img: 'spins/Bowie-Knife-Freehand-Skin.png', rarity: 'mythic', chance: 0.000567, value: 13000 },
                { name: 'Falchion Knife Black Laminate', img: 'spins/Falchion-Knife-Black-Laminate-Skin.png', rarity: 'mythic', chance: 0.000567, value: 11000 }
            ]
        },
        {
            id: 'case2',
            name: 'Recoil Case',
            img: 'spins/case2.png',
            cost: 75,
            limitedTime: false, // Add this
            startTime: '2025-07-30T00:00:00', // Add start time (optional)
            endTime: '2025-08-01T02:00:00', // Add end time
            playVideo: false, // Add this
            video: 'spins/video2.mp4', // Add this
            mythicVideo: true,  // Set to true for cases that should play video for mythic items
            mythicVideoFile: 'spins/limited1.mp4',
            items: [
                { name: 'P90 Vent Rush', img: 'spins/P90-Vent-Rush.png', rarity: 'epic', chance: 2.5, value: 450 },
                { name: 'SG-553 DragonTech', img: 'spins/SG-553-Dragon-Tech.png', rarity: 'epic', chance: 2.5, value: 300 },
                { name: 'UMP-45 Roadblock', img: 'spins/UMP-45-Roadblock.png', rarity: 'common', chance: 30, value: 0.5 },
                { name: 'R8 Revolver Crazy 8', img: 'spins/R8-Revolver-Crazy-8.png', rarity: 'epic', chance: 2.5, value: 300 },
                { name: 'M249 Downtown', img: 'spins/M249-Downtown.png', rarity: 'uncommon', chance: 10, value: 60 },
                { name: 'Dual Berettas Flora Carnivora', img: 'spins/Dual-Berettas-Flora-Carnivora.png', rarity: 'epic', chance: 2.5, value: 595 },
                { name: 'USP-S Printstream', img: 'spins/USP-S-Printstream.png', rarity: 'legendary', chance: 0.8, value: 3000 },
                { name: 'M4A4 Poly Mag', img: 'spins/M4A4-Poly-Mag.png', rarity: 'uncommon', chance: 10, value: 75 },
                { name: 'Negev Drop Me', img: 'spins/Negev-Drop-Me.png', rarity: 'common', chance: 30, value: 50 },
                { name: 'AWP Chromatic Aberration', img: 'spins/AWP-Chromatic-Aberration.png', rarity: 'legendary', chance: 0.8, value: 4000 },
                { name: 'Glock-18 Winterized', img: 'spins/Glock-18-Winterized.png', rarity: 'uncommon', chance: 10, value: 80 },
                { name: 'FAMAS Meow-36', img: 'spins/FAMAS-Meow-36.png', rarity: 'common', chance: 30, value: 43 },
                { name: 'AK-47 Ice Coaled', img: 'spins/AK-47-Ice-Coaled.png', rarity: 'epic', chance: 2.5, value: 120 },
                { name: 'Galil AR Destroyer', img: 'spins/Galil-AR-Destroyer.png', rarity: 'common', chance: 30, value: 7 },
                { name: 'MAC-10 Monkeyflage', img: 'spins/MAC-10-Monkeyflage.png', rarity: 'common', chance: 30, value: 20 },
                { name: 'Sawed Off Kiss♥Love', img: 'spins/Sawed-Off-Kiss-Love.png', rarity: 'epic', chance: 2.5, value: 240 },
                { name: 'P250 Visions', img: 'spins/P250-Visions.png', rarity: 'epic', chance: 2.5, value: 260 },
                { name: 'Special Item', img: 'spins/gold.png', rarity: 'mythic', chance: 0.1, value: 0 }
            ],
            knifes: [
                { name: 'Driver Gloves Snow Leopard', img: 'spins/Driver-Gloves-Snow-Leopard.png', rarity: 'mythic', chance: 0.000567, value: 95000 },
                { name: 'Specialist Gloves Field Agent', img: 'spins/Specialist-Gloves-Field-Agent.png', rarity: 'mythic', chance: 0.000567, value: 21000 },
                { name: 'Driver Gloves Black Tie', img: 'spins/Driver-Gloves-Black-Tie.png', rarity: 'mythic', chance: 0.000567, value: 20000 },
                { name: 'Sport Gloves Scarlet Shamagh', img: 'spins/Sport-Gloves-Scarlet-Shamagh.png', rarity: 'mythic', chance: 0.000567, value: 20000 },
                { name: 'Hand Wraps CAUTION', img: 'spins/Hand-Wraps-CAUTION.png', rarity: 'mythic', chance: 0.000567, value: 17000 },
                { name: 'Specialist Gloves Lt Commander', img: 'spins/Specialist-Gloves-Lt-Commander.png', rarity: 'mythic', chance: 0.000567, value: 23000 },
                { name: 'Sport Gloves Slingshot', img: 'spins/Sport-Gloves-Slingshot.png', rarity: 'mythic', chance: 0.000567, value: 60000 },
                { name: 'Broken Fang Gloves Yellow banded', img: 'spins/Broken-Fang-Gloves-Yellow-banded.png', rarity: 'mythic', chance: 0.000567, value: 24800 },
                { name: 'Hand Wraps Constrictor', img: 'spins/Hand-Wraps-Constrictor.png', rarity: 'mythic', chance: 0.000567, value: 18210 },
                { name: 'Specialist Gloves Marble Fade', img: 'spins/Specialist-Gloves-Marble-Fade.png', rarity: 'mythic', chance: 0.000567, value: 30000 },
                { name: 'Moto Gloves Finish Line', img: 'spins/Moto-Gloves-Finish-Line.png', rarity: 'mythic', chance: 0.000567, value: 18880 },
                { name: 'Moto Gloves Blood Pressure', img: 'spins/Moto-Gloves-Blood-Pressure.png', rarity: 'mythic', chance: 0.000567, value: 19800 },
                { name: 'Hand Wraps Desert Shamagh', img: 'spins/Hand-Wraps-Desert-Shamagh.png', rarity: 'mythic', chance: 0.000567, value: 14000 },
                { name: 'Specialist Gloves Tiger Strike', img: 'spins/Specialist-Gloves-Tiger-Strike.png', rarity: 'mythic', chance: 0.000567, value: 27000 },
                { name: 'Broken Fang Gloves Jade', img: 'spins/Broken-Fang-Gloves-Jade.png', rarity: 'mythic', chance: 0.000567, value: 19999 },
                { name: 'Driver Gloves Rezan the Red', img: 'spins/Driver-Gloves-Rezan-the-Red.png', rarity: 'mythic', chance: 0.000567, value: 18700 },
                { name: 'Hand Wraps Giraffe', img: 'spins/Hand-Wraps-Giraffe.png', rarity: 'mythic', chance: 0.000567, value: 15000 },
                { name: 'Sport Gloves Big Game', img: 'spins/Sport-Gloves-Big-Game.png', rarity: 'mythic', chance: 0.000567, value: 19000 },
                { name: 'Broken Fang Gloves Needle Point', img: 'spins/Broken-Fang-Gloves-Needle-Point.png', rarity: 'mythic', chance: 0.000567, value: 17999 },
                { name: 'Driver Gloves Queen Jaguar', img: 'spins/Driver-Gloves-Queen-Jaguar.png', rarity: 'mythic', chance: 0.000567, value: 25000 },
                { name: 'Moto Gloves 3rd Commando Company', img: 'spins/Moto-Gloves-3rd-Commando-Company.png', rarity: 'mythic', chance: 0.000567, value: 17000 },
                { name: 'Sport Gloves Nocts', img: 'spins/Sport-Gloves-Nocts.png', rarity: 'mythic', chance: 0.000567, value: 45000 },
                { name: 'Broken Fang Gloves Unhinged', img: 'spins/Broken-Fang-Gloves-Unhinged.png', rarity: 'mythic', chance: 0.000567, value: 18400 },
                { name: 'Moto Gloves Smoke Out', img: 'spins/Moto-Gloves-Smoke-Out.png', rarity: 'mythic', chance: 0.000567, value: 18600 }
            ]
        },
        {
            id: 'case3',
            name: 'Kilowatt/Huntsman Case',
            img: 'spins/case4.png',
            cost: 100,
            limitedTime: false, // Add this
            startTime: '2025-07-30T00:00:00', // Add start time (optional)
            endTime: '2025-08-01T02:00:00', // Add end time
            playVideo: false, // Add this
            video: 'spins/video3.mp4', // Add this
            mythicVideo: true,  // Set to true for cases that should play video for mythic items
            mythicVideoFile: 'spins/limited1.mp4',
            items: [
                { name: 'AK-47 Inheritance', img: 'spins/AK-47 Inheritance.png', rarity: 'legendary', chance: 0.8, value: 5000 },
                { name: 'AWP Chrome Cannon', img: 'spins/AWP Chrome Cannon.png', rarity: 'legendary', chance: 0.8, value: 3800 },
                { name: 'M4A1-S Black Lotus', img: 'spins/M4A1-S Black Lotus.png', rarity: 'epic', chance: 2.5, value: 400 },
                { name: 'USP-S Jawbreaker', img: 'spins/USP-S Jawbreaker.png', rarity: 'epic', chance: 2.5, value: 500 },
                { name: 'Zeus x27 Olympus', img: 'spins/Zeus x27 Olympus.png', rarity: 'epic', chance: 2.5, value: 300 },
                { name: 'M4A4 Etch Lord', img: 'spins/M4A4 Etch Lord.png', rarity: 'uncommon', chance: 10, value: 70 },
                { name: 'Glock-18 Block-18', img: 'spins/Glock-18 Block-18 Skin.png', rarity: 'uncommon', chance: 10, value: 120 },
                { name: 'MP7 Just Smile', img: 'spins/MP7 Just Smile Skin.png', rarity: 'epic', chance: 2.5, value: 320 },
                { name: 'Five-SeveN Hybrid', img: 'spins/Five-SeveN Hybrid.png', rarity: 'uncommon', chance: 10, value: 70 },
                { name: 'Sawed-Off Analog Input', img: 'spins/Sawed-Off Analog Input.png', rarity: 'uncommon', chance: 10, value: 150 },
                { name: 'MAC-10 Light Box', img: 'spins/MAC-10 Light Box.png', rarity: 'common', chance: 30, value: 20 },
                { name: 'SSG 08 Dezastre', img: 'spins/SSG 08 Dezastre.png', rarity: 'common', chance: 30, value: 5 },
                { name: 'UMP-45 Motorized', img: 'spins/UMP-45 Motorized.png', rarity: 'common', chance: 30, value: 27 },
                { name: 'Tec-9 Slag', img: 'spins/Tec-9 Slag.png', rarity: 'epic', chance: 2.5, value: 270 },
                { name: 'Nova Dark Sigil', img: 'spins/Nova Dark Sigil.png', rarity: 'common', chance: 30, value: 55 },
                { name: 'Dual Berettas Hideout', img: 'spins/Dual Berettas Hideout.png', rarity: 'common', chance: 30, value: 17 },
                { name: 'M4A4 Desert-Strike', img: 'spins/M4A4 Desert-Strike.png', rarity: 'legendary', chance: 0.8, value: 3200 },
                { name: 'M4A1-S Atomic Alloy', img: 'spins/M4A1-S Atomic Alloy.png', rarity: 'epic', chance: 2.5, value: 570 },
                { name: 'USP-S Caiman', img: 'spins/USP-S Caiman.png', rarity: 'epic', chance: 2.5, value: 700 },
                { name: 'PP-Bizon Antique', img: 'spins/PP-Bizon Antique.png', rarity: 'epic', chance: 2.5, value: 450 },
                { name: 'MAC-10 Tatter', img: 'spins/MAC-10 Tatter.png', rarity: 'uncommon', chance: 10, value: 60 },
                { name: 'AUG Torque', img: 'spins/AUG Torque.png', rarity: 'common', chance: 30, value: 44 },
                { name: 'P90 Module', img: 'spins/P90 Module.png', rarity: 'common', chance: 30, value: 14 },
                { name: 'CZ75-Auto Twist', img: 'spins/CZ75-Auto Twist.png', rarity: 'uncommon', chance: 10, value: 1 },
                { name: 'Tec-9 Isaac', img: 'spins/Tec-9 Isaac.png', rarity: 'epic', chance: 2, value: 600 },
                { name: 'SSG 08 Slashed', img: 'spins/SSG 08 Slashed.png', rarity: 'common', chance: 30, value: 0.3 },
                { name: 'Special Item', img: 'spins/gold.png', rarity: 'mythic', chance: 0.5, value: 0 }
            ],
            knifes: [
                { name: 'Kukri Knife Urban Masked', img: 'spins/Kukri Knife Urban Masked.png', rarity: 'mythic', chance: 0.000567, value: 25000 },
                { name: 'Huntsman Knife Case Hardened', img: 'spins/Huntsman Knife Case Hardened.png', rarity: 'mythic', chance: 0.000567, value: 21000 },
                { name: 'Kukri Knife Blue Steel', img: 'spins/Kukri Knife Blue Steel.png', rarity: 'mythic', chance: 0.000567, value: 22000 },
                { name: 'Kukri Knife Fade', img: 'spins/Kukri Knife Fade.png', rarity: 'mythic', chance: 0.000567, value: 80000 },
                { name: 'Huntsman Knife Crimson Web', img: 'spins/Huntsman Knife Crimson Web.png', rarity: 'mythic', chance: 0.000567, value: 30000 },
                { name: 'Kukri Knife Boreal Forest', img: 'spins/Kukri Knife Boreal Forest.png', rarity: 'mythic', chance: 0.000567, value: 15000 },
                { name: 'Kukri Knife Crimson Web', img: 'spins/Kukri Knife Crimson Web.png', rarity: 'mythic', chance: 0.000567, value: 20000 },
                { name: 'Huntsman Knife Night', img: 'spins/Huntsman Knife Night.png', rarity: 'mythic', chance: 0.000567, value: 35000 },
                { name: 'Kukri Knife Scorched', img: 'spins/Kukri Knife Scorched.png', rarity: 'mythic', chance: 0.000567, value: 29000 },
                { name: 'Huntsman Knife Slaughter', img: 'spins/Huntsman Knife Slaughter.png', rarity: 'mythic', chance: 0.000567, value: 40000 },
                { name: 'Kukri Knife ★ (Vanilla)', img: 'spins/Kukri Knife Vanilla.png', rarity: 'mythic', chance: 0.000567, value: 50000 },
                { name: 'Huntsman Knife Fade', img: 'spins/Huntsman Knife Fade.png', rarity: 'mythic', chance: 0.000567, value: 65000 }
            ]
        },
        {
            id: 'case4',
            name: '???',
            img: 'spins/nun.png',
            cost: 0,
            limitedTime: true, // Add this
            startTime: '2025-08-08T15:00:00', // Add start time (optional)
            endTime: '2025-08-10T15:00:00', // Add end time
            playVideo: false, // Add this
            video: 'spins/video4.mp4', // Add this
            mythicVideo: false,  // Set to true for cases that should play video for mythic items
            mythicVideoFile: 'spins/limited4.mp4',
            items: [
                { name: 'Nothing You Bitch', img: 'spins/default.png', rarity: 'epic', chance: 2.5, value: 0 }
            ],
            knifes: [
                { name: 'Y3tek 3sba', img: 'spins/default.png', rarity: 'mythic', chance: 0.1, value: 0 }
            ]
        },
        {
            id: 'case5',
            name: 'Predatory Cobra [LIMITED]',
            img: 'spins/case3.png',
            cost: 100,
            limitedTime: true, // Add this
            startTime: '2025-08-02T16:00:00.000Z', // Full ISO format with milliseconds
            endTime: '2025-12-04T15:00:00.000Z',
            playVideo: true, // Add this
            video: 'spins/video5.mp4', // Add this
            mythicVideo: false,  // Set to true for cases that should play video for mythic items
            mythicVideoFile: 'spins/limited5.mp4',
            items: [
                { name: 'Evolution Stone', img: 'spins/Evolution_Stone.png', rarity: 'exclusive', chance: 0.1, value: 5000 },
                { name: 'Golden Coin Case', img: 'spins/Golden_Coin.png', rarity: 'common', chance: 20, value: 50 },
                { name: 'Golden Ticket', img: 'spins/GoldRV.png', rarity: 'common', chance: 20, value: 50 },    
                { name: 'Name Change Card', img: 'spins/Name_Change_Card.png', rarity: 'epic', chance: 2, value: 2500 },
                { name: 'Venomous Fang Upgrade Token', img: 'spins/Venomous_Fang.png', rarity: 'uncommon', chance: 10, value: 100 },
                { name: 'Magic Cube Fragment', img: 'spins/Cube_Fragment.png', rarity: 'epic', chance: 2, value: 2500 },
                { name: 'Elite Pass Access', img: 'spins/Elite_Pass.png', rarity: 'exclusive', chance: 0.5, value: 5000 },
                { name: 'Limited Item', img: 'spins/congratulations.png', rarity: 'mythic', chance: 0.01, value: 0 }
            ],
            knifes: [
                { name: 'Motor Bike Cobra Skin', img: 'spins/Motor_BikeCobra.png', rarity: 'limited', chance: 0.001, value: 30000 },
                { name: 'Cobra Guardian Backpack Skin', img: 'spins/Cobra_Guardian.png', rarity: 'limited', chance: 0.1, value: 15000 },
                { name: 'Predatory Cobra', img: 'spins/case3.png', rarity: 'limited', chance: 0.0001, value: 75000 }
            ]
        }
    ],
    payouts: {
        '7-7-7': 100000,
        'diamond-diamond-diamond': 50000,
        'coin-coin-coin': 30000,
        'bell-bell-bell': 15000,
        'cherry-cherry-cherry': 10000,
        'card-card-card': 3000,
        'clover-clover-clover': 1000,
        'ANY_TWO_MATCH': 100
    },
    mines: {
        minBet: 0.1,
        maxBet: 10000000000000000000000000000000,
        minMines: 1,
        maxMines: 10,
        magnifier: {
            chance: 0.50, // 15% chance to spawn a magnifier in 10-mine games
            img: 'spins/Magnifier.png'
        },
        getGridSize: function(minesCount) {
            if (minesCount <= 6) return 5;
            if (minesCount <= 9) return 5;
            return 5;
        },
        getMultiplier: function(minesCount, revealedCells) {
            const baseMultipliers = {
                1: 1.04,
                2: 1.07,
                3: 1.10,
                4: 1.15,
                5: 1.18,
                6: 1.23,
                7: 1.30,
                8: 1.45,
                9: 1.65,
                10: 2
            };
            
            const growthFactors = {
                1: 0.02,
                2: 0.03,
                3: 0.04,
                4: 0.05,
                5: 0.06,
                6: 0.08,
                7: 0.10,
                8: 0.13,
                9: 0.16,
                10: 0.20
            };
            
            const base = baseMultipliers[minesCount] || 1.0;
            const growth = growthFactors[minesCount] || 0.05;
            
            const rawMultiplier = base * Math.pow(1 + growth, revealedCells);
            
            const withHouseEdge = rawMultiplier * (1 - this.houseEdge);
            return parseFloat(withHouseEdge.toFixed(4));
        },
        houseEdge: 0.03
    },
    cupGame: {
        minBet: 1,
        maxBet: 10000000000000000000000000000000,
        minCups: 3,
        maxCups: 5,
        multipliers: {
            3: 1.5,    // 3 cups = 1.5x multiplier
            4: 2,    // 4 cups = 2x multiplier
            5: 3     // 5 cups = 3x multiplier
        },
        houseEdge: 0.01 // 1% house edge
    }
};

// Game State
let gameState = {
    autoSellEnabled: true,
    instantSpinLimit: 25,
    instantSpinsUsed: 0,
    lastRefillTime: null,
    chips: 0,
    dice: 0,
    isSpinning: false,
    spinningReels: 0,
    currentSymbols: [],
    winAmount: 0,
    winCombo: null,
    userId: null,
    authChecked: false,
    currentGame: null,
    cupGame: {
        betAmount: 0,
        cupsCount: 0,
        multiplier: 1.0,
        coinPosition: null,
        revealedCups: [],
        gameActive: false,
        currentWin: 0
    },
    minesGame: {
        betAmount: 0,
        minesCount: 0,
        multiplier: 1.0,
        revealedCells: 0,
        totalCells: 25,
        minePositions: [],
        currentWin: 0,
        gameActive: false,
        magnifierPosition: null,
        revealedMines: []
    },
    minesStats: {
        totalGames: 0,
        wins: 0,
        totalWins: 0,
        totalGamesPlayed: 0
    },
    lootboxGame: {
        isSpinning: false,
        currentItem: null,
        currentCase: CONFIG.lootboxCases[0] // Default to first case
    },
    inventory: []
    

};

// Loot Box Variables
let lootboxItems = [];
let isLootboxSpinning = false;
let spinAnimation = null;

// Inventory Variables
let currentSellingItem = null;

// DOM Elements
const elements = {
    loginScreen: document.getElementById('login-screen'),
    gameScreen: document.getElementById('game-screen'),
    tokenInput: document.getElementById('token-input'),
    loginBtn: document.getElementById('login-btn'),
    logoutBtn: document.getElementById('logout-btn'),
    minesLogoutBtn: document.getElementById('mines-logout-btn'),
    lootboxLogoutBtn: document.getElementById('lootbox-logout-btn'),
    inventoryLogoutBtn: document.getElementById('inventory-logout-btn'),
    usernameDisplay: document.getElementById('username'),
    userAvatar: document.getElementById('user-avatar'),
    lootboxUsername: document.getElementById('lootbox-username'),
    lootboxAvatar: document.getElementById('lootbox-avatar'),
    inventoryUsername: document.getElementById('inventory-username'),
    inventoryAvatar: document.getElementById('inventory-avatar'),
    chipsDisplay: document.getElementById('chips'),
    diceDisplay: document.getElementById('dice'),
    lootboxChips: document.getElementById('lootbox-chips'),
    lootboxDice: document.getElementById('lootbox-dice'),
    inventoryChips: document.getElementById('inventory-chips'),
    inventoryDice: document.getElementById('inventory-dice'),
    spinBtn: document.getElementById('spin-btn'),
    reels: [
        document.getElementById('reel1'),
        document.getElementById('reel2'),
        document.getElementById('reel3')
    ],
    winPopup: document.getElementById('win-popup'),
    winComboDisplay: document.getElementById('win-combo'),
    winAmountDisplay: document.getElementById('win-amount'),
    claimBtn: document.getElementById('claim-btn'),
    gameSelectScreen: document.getElementById('game-select-screen'),
    slotMachineBtn: document.getElementById('slot-machine-btn'),
    minesGameBtn: document.getElementById('mines-game-btn'),
    lootboxBtn: document.getElementById('lootbox-btn'),
    inventoryBtn: document.getElementById('inventory-btn'),
    minesGameScreen: document.getElementById('mines-game-screen'),
    lootboxScreen: document.getElementById('lootbox-screen'),
    inventoryScreen: document.getElementById('inventory-screen'),
    minesBetInput: document.getElementById('mines-bet-input'),
    minesCountInput: document.getElementById('mines-count-input'),
    minesStartBtn: document.getElementById('mines-start-btn'),
    minesGrid: document.getElementById('mines-grid'),
    minesCurrentWin: document.getElementById('mines-current-win'),
    minesMultiplier: document.getElementById('mines-multiplier'),
    minesCashoutBtn: document.getElementById('mines-cashout-btn'),
    minesGameOverPopup: document.getElementById('mines-game-over-popup'),
    minesGameOverMessage: document.getElementById('mines-game-over-message'),
    minesGameOverAmount: document.getElementById('mines-game-over-amount'),
    minesUsername: document.getElementById('mines-username'),
    minesAvatar: document.getElementById('mines-avatar'),
    minesChips: document.getElementById('mines-chips'),
    minesDice: document.getElementById('mines-dice'),
    backToMenuBtn: document.getElementById('back-to-menu-btn'),
    minesBackToMenuBtn: document.getElementById('mines-back-to-menu-btn'),
    lootboxBackToMenuBtn: document.getElementById('lootbox-back-to-menu-btn'),
    inventoryBackToMenuBtn: document.getElementById('inventory-back-to-menu-btn'),
    minesWinsCounter: document.getElementById('mines-wins-counter'),
    minesWinRate: document.getElementById('mines-win-rate'),
    lootboxSpinBtn: document.getElementById('lootbox-spin-btn'),
    lootboxItemsTrack: document.getElementById('lootbox-items-track'),
    lootboxPopup: document.getElementById('lootbox-popup'),
    lootboxItemWon: document.getElementById('lootbox-item-won'),
    lootboxItemName: document.getElementById('lootbox-item-name'),
    lootboxRarity: document.getElementById('lootbox-rarity'),
    lootboxClaimBtn: document.getElementById('lootbox-claim-btn'),
    inventoryItems: document.getElementById('inventory-items'),
    inventoryTotalItems: document.getElementById('inventory-total-items'),
    inventorySellPanel: document.getElementById('inventory-sell-panel'),
    inventorySellImg: document.getElementById('inventory-sell-img'),
    inventorySellName: document.getElementById('inventory-sell-name'),
    inventorySellValue: document.getElementById('inventory-sell-value'),
    inventorySellInput: document.getElementById('inventory-sell-input'),
    inventorySellMax: document.getElementById('inventory-sell-max'),
    inventorySellBtn: document.getElementById('inventory-sell-btn'),
    inventorySellTotal: document.getElementById('inventory-sell-total'),
    inventorySellClose: document.querySelector('.inventory-sell-close'),
    lootboxCaseSelectScreen: document.getElementById('lootbox-case-select-screen'),
    lootboxCasesContainer: document.getElementById('lootbox-cases-container'),
    lootboxSelectAvatar: document.getElementById('lootbox-select-avatar'),
    lootboxSelectUsername: document.getElementById('lootbox-select-username'),
    lootboxSelectChips: document.getElementById('lootbox-select-chips'),
    lootboxSelectDice: document.getElementById('lootbox-select-dice'),
    lootboxSelectLogoutBtn: document.getElementById('lootbox-select-logout-btn'),
    lootboxCaseSelectBackBtn: document.getElementById('lootbox-case-select-back-btn'),
    lootboxChangeCaseBtn: document.getElementById('lootbox-change-case-btn'),
    cupGameScreen: document.getElementById('cup-game-screen'),
    cupGameBtn: document.getElementById('cup-game-btn'),
    cupGameBackToMenuBtn: document.getElementById('cup-game-back-to-menu-btn'),
    cupGameLogoutBtn: document.getElementById('cup-game-logout-btn'),
    cupGameUsername: document.getElementById('cup-game-username'),
    cupGameAvatar: document.getElementById('cup-game-avatar'),
    cupGameChips: document.getElementById('cup-game-chips'),
    cupGameDice: document.getElementById('cup-game-dice'),
    cupGameBetInput: document.getElementById('cup-game-bet-input'),
    cupGameCupsInput: document.getElementById('cup-game-cups-input'),
    cupGameStartBtn: document.getElementById('cup-game-start-btn'),
    cupGameGrid: document.getElementById('cup-game-grid'),
    cupGameGameOverPopup: document.getElementById('cup-game-game-over-popup'),
    cupGameGameOverMessage: document.getElementById('cup-game-game-over-message'),
    cupGameGameOverAmount: document.getElementById('cup-game-game-over-amount'),
    cupGameGameOverClose: document.getElementById('cup-game-game-over-close')
};

const TimerManager = {
    interval: null,
    
    start: function() {
        this.stop(); // Clear any existing interval
        this.interval = setInterval(() => {
            // Only update if on case select screen
            if (elements.lootboxCaseSelectScreen && 
                elements.lootboxCaseSelectScreen.style.display === 'block') {
                updateCaseTimers();
            }
        }, 1000);
        // Force immediate update
        updateCaseTimers();
    },
    
    stop: function() {
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }
    }
};

// Helper Functions
const spinSound = new Audio('spins/spin.mp3');
const openSound = new Audio('spins/open.mp3');

function checkAutoSell(rarity) {
    if (!gameState.autoSellEnabled) return false;
    const checkbox = document.getElementById(`auto-sell-${rarity}`);
    return checkbox ? checkbox.checked : false;
}

async function checkItemAvailable(itemName) {
    try {
        const response = await fetch(`${API_BASE_URL}/api/items/check-availability?itemName=${encodeURIComponent(itemName)}`);
        const data = await response.json();
        return data.available;
    } catch (error) {
        console.error("Availability check failed:", error);
        return true; // Default to available if check fails
    }
}

function playCaseVideo(videoSrc) {
    return new Promise((resolve) => {
        const videoContainer = document.createElement('div');
        videoContainer.className = 'video-container';
        videoContainer.style.position = 'fixed';
        videoContainer.style.top = '0';
        videoContainer.style.left = '0';
        videoContainer.style.width = '100%';
        videoContainer.style.height = '100%';
        videoContainer.style.backgroundColor = 'black';
        videoContainer.style.zIndex = '1000';
        videoContainer.style.display = 'flex';
        videoContainer.style.justifyContent = 'center';
        videoContainer.style.alignItems = 'center';
        
        const video = document.createElement('video');
        video.src = videoSrc;
        video.style.maxWidth = '100%';
        video.style.maxHeight = '100%';
        video.controls = false; // Explicitly disable controls
        video.autoplay = true;
        video.muted = false; // Ensure video plays without requiring user interaction
        video.playsInline = true; // For iOS compatibility
        video.setAttribute('playsinline', ''); // Alternative for older iOS
        video.setAttribute('webkit-playsinline', ''); // For some older browsers
        
        // Exit fullscreen and resolve when video ends or is clicked
        const handleEnd = () => {
            videoContainer.remove();
            resolve();
        };
        
        video.addEventListener('ended', handleEnd);
        videoContainer.addEventListener('click', handleEnd);
        
        videoContainer.appendChild(video);
        document.body.appendChild(videoContainer);
        
        // Try to enter fullscreen (may not work without user gesture)
        if (video.requestFullscreen) {
            video.requestFullscreen().catch(err => {
                console.log('Fullscreen error:', err);
            });
        }
        
        // Ensure video plays even if autoplay is blocked
        const playPromise = video.play();
        if (playPromise !== undefined) {
            playPromise.catch(error => {
                // Autoplay was prevented, mute and try again
                video.muted = true;
                video.play();
            });
        }
    });
}

function playMythicVideo(videoSrc) {
    return new Promise((resolve) => {
        const videoContainer = document.createElement('div');
        videoContainer.className = 'mythic-video-container';
        
        const video = document.createElement('video');
        video.src = videoSrc;
        video.autoplay = true;
        video.muted = false;
        video.playsInline = true;
        video.setAttribute('playsinline', '');
        video.setAttribute('webkit-playsinline', '');
        
        // Disable all controls
        video.controls = false;
        video.disablePictureInPicture = true;
        video.disableRemotePlayback = true;
        
        // Style the video to fill the container
        video.style.width = '100%';
        video.style.height = '100%';
        video.style.objectFit = 'contain';
        
        // Handle video end
        const handleEnd = () => {
            videoContainer.remove();
            resolve();
        };
        
        video.addEventListener('ended', handleEnd);
        
        // Prevent any right-click menu
        videoContainer.addEventListener('contextmenu', (e) => e.preventDefault());
        
        videoContainer.appendChild(video);
        document.body.appendChild(videoContainer);
        
        // Try to play the video
        const playPromise = video.play();
        if (playPromise !== undefined) {
            playPromise.catch(error => {
                // If autoplay fails, mute and try again
                video.muted = true;
                video.play();
            });
        }
    });
}

function isCaseAvailable(caseItem) {
    if (!caseItem.limitedTime) return true;
    
    const now = new Date();
    const startTime = caseItem.startTime ? new Date(caseItem.startTime) : new Date(0);
    const endTime = new Date(caseItem.endTime);
    
    return now >= startTime && now < endTime;
}

async function validateCaseWithServer(caseItem) {
    try {
        const response = await fetch(`${API_BASE_URL}/api/cases/validate`);
        if (!response.ok) return false;
        
        const data = await response.json();
        const serverTime = new Date(data.serverTime);
        const caseData = data.cases.find(c => c.caseId === caseItem.id);
        
        return caseData?.isActive || false;
    } catch (error) {
        console.error('Case validation error:', error);
        return false;
    }
}

// Add this with your helper functions
function formatTimeRemaining(ms) {
    const days = Math.floor(ms / (1000 * 60 * 60 * 24));
    const hours = Math.floor((ms % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((ms % (1000 * 60)) / 1000);
    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
}

function getTimeRemaining(caseItem) {
    if (!caseItem.limitedTime) return '';
    
    const now = new Date();
    const startTime = caseItem.startTime ? new Date(caseItem.startTime) : new Date(0);
    const endTime = new Date(caseItem.endTime);
    
    if (now < startTime) {
        const diff = startTime - now;
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        return `Starts in ${days}d ${hours}h`;
    }
    
    if (now >= endTime) return "Expired";
    
    const diff = endTime - now;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    return `Ends in ${days}d ${hours}h ${minutes}m ${seconds}s`;
}

let lastCaseUpdateTime = 0;

async function updateCaseTimers() {
    if (!elements.lootboxCasesContainer || 
        !elements.lootboxCaseSelectScreen || 
        elements.lootboxCaseSelectScreen.style.display !== 'block') {
        return;
    }

    try {
        // Get server time for consistency
        const now = new Date();
        
        // Debug output
        console.log('Current time:', now.toISOString());
        
        const caseElements = elements.lootboxCasesContainer.querySelectorAll('.lootbox-case');
        
        caseElements.forEach((caseElement, index) => {
            const caseData = CONFIG.lootboxCases[index];
            if (!caseData || !caseData.limitedTime) return;
            
            const timerElement = caseElement.querySelector('.case-timer');
            if (!timerElement) return;

            // Parse dates as UTC
            const startTime = new Date(caseData.startTime);
            const endTime = new Date(caseData.endTime);
            
            // Debug output
            console.log(`Case ${caseData.id}:`, {
                startTime: startTime.toISOString(),
                endTime: endTime.toISOString(),
                now: now.toISOString()
            });

            // Clear existing classes
            caseElement.classList.remove('disabled-case');
            timerElement.className = 'case-timer';
            
            if (now < startTime) {
                // Case hasn't started yet
                const timeUntilStart = startTime - now;
                timerElement.innerHTML = `
                    <div>Starts in</div>
                    <div class="start-countdown">${formatTimeRemaining(timeUntilStart)}</div>
                `;
                timerElement.classList.add('not-started');
                caseElement.style.opacity = '0.6';
                caseElement.style.pointerEvents = 'none';
            } 
            else if (now < endTime) {
                // Case is active
                const timeRemaining = endTime - now;
                timerElement.innerHTML = `
                    <div>Available Now</div>
                    <div class="end-countdown">Ends in ${formatTimeRemaining(timeRemaining)}</div>
                `;
                timerElement.classList.add('active');
                caseElement.style.opacity = '1';
                caseElement.style.pointerEvents = 'auto';
            } 
            else {
                // Case has expired
                timerElement.innerHTML = '<div>Expired</div>';
                timerElement.classList.add('expired');
                caseElement.style.opacity = '0.6';
                caseElement.style.pointerEvents = 'none';
            }
        });
    } catch (error) {
        console.error('Error updating case timers:', error);
    }
}

// ----------------------------------
function loadAutoSellPreferences() {
    const rarities = ['common', 'uncommon', 'epic', 'legendary', 'mythic'];
    rarities.forEach(rarity => {
        const savedValue = localStorage.getItem(`autoSell_${rarity}`);
        if (savedValue !== null) {
            const checkbox = document.getElementById(`auto-sell-${rarity}`);
            if (checkbox) {
                checkbox.checked = savedValue === 'true';
            }
        }
    });
}

function setupAutoSellListeners() {
    const rarities = ['common', 'uncommon', 'epic', 'legendary', 'mythic'];
    rarities.forEach(rarity => {
        const checkbox = document.getElementById(`auto-sell-${rarity}`);
        if (checkbox) {
            checkbox.addEventListener('change', (e) => {
                localStorage.setItem(`autoSell_${rarity}`, e.target.checked);
            });
        }
    });
}

function setAutoSellEnabled(enabled) {
    gameState.autoSellEnabled = enabled;
    const container = document.getElementById('auto-sell-container');
    const overlay = document.getElementById('auto-sell-overlay');
    const instantSpinBtn = document.getElementById('lootbox-instant-spin-btn');
    
    if (container && overlay) {
        if (enabled) {
            container.classList.remove('broken');
            overlay.classList.add('hidden');
        } else {
            container.classList.add('broken');
            overlay.classList.remove('hidden');
        }
    }
}


// ----------------------------------

function setLootboxButtonsDisabled(disabled) {
    if (elements.lootboxChangeCaseBtn) elements.lootboxChangeCaseBtn.disabled = disabled;
    if (elements.lootboxBackToMenuBtn) elements.lootboxBackToMenuBtn.disabled = disabled;
}

function getRandomSymbol() {
    return CONFIG.symbols[Math.floor(Math.random() * CONFIG.symbols.length)];
}


async function getRandomLootboxItem(caseItems) {
    // First filter out items that have reached their global limit
    const availableItems = [];
    
    for (const item of caseItems) {
        if (item.quantity) {
            try {
                const response = await fetch(`${API_BASE_URL}/api/items/check-availability?itemName=${encodeURIComponent(item.name)}`);
                const data = await response.json();
                
                if (data.available) {
                    availableItems.push(item);
                }
            } catch (error) {
                console.error('Error checking item availability:', error);
                availableItems.push(item);
            }
        } else {
            availableItems.push(item);
        }
    }
    
    if (availableItems.length === 0) {
        throw new Error('All limited items in this case are maxed out');
}
    
    const totalWeight = availableItems.reduce((sum, item) => sum + item.chance, 0);
    const random = Math.random() * totalWeight;
    let cumulativeWeight = 0;
    
    for (const item of availableItems) {
        cumulativeWeight += item.chance;
        if (random <= cumulativeWeight) {
            return item;
        }
    }
    
    return availableItems[0];
}

function getRandomKnife(knives) {
    if (!knives || knives.length === 0) {
        return { name: 'Default Knife', img: 'spins/default-knife.png', rarity: 'legendary', value: 1000 };
    }
    
    const totalWeight = knives.reduce((sum, knife) => sum + knife.chance, 0);
    const random = Math.random() * totalWeight;
    let cumulativeWeight = 0;
    
    for (const knife of knives) {
        cumulativeWeight += knife.chance;
        if (random <= cumulativeWeight) {
            return knife;
        }
    }
    
    return knives[0];
}

function initializeLootboxItems() {
    const track = document.getElementById('lootbox-items-track');
    if (!track) return;
    
    track.innerHTML = '';
    
    const caseItems = gameState.lootboxGame.currentCase.items;
    const itemsPool = [];
    
    caseItems.forEach(item => {
        const count = Math.max(1, Math.floor(item.chance * 10));
        for (let i = 0; i < count; i++) {
            itemsPool.push(item);
        }
    });
    
    for (let i = itemsPool.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [itemsPool[i], itemsPool[j]] = [itemsPool[j], itemsPool[i]];
    }
    
    const singleLoop = itemsPool.slice(0, 50);
    for (let loop = 0; loop < 3; loop++) {
        singleLoop.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = `lootbox-item ${item.rarity}`;
            itemElement.innerHTML = `<img src="${item.img}" alt="${item.name}" style="width: 100%; height: 100%; object-fit: contain;">`;
            itemElement.dataset.itemName = item.name;
            itemElement.style.minWidth = '120px';
            itemElement.style.minHeight = '120px';
            track.appendChild(itemElement);
        });
    }
    
    track.style.transform = 'translateX(0px)';
    track.style.transition = 'none';
    track.style.opacity = '1';
}

function updateCaseLimitedItemStatus(caseItem) {
    if (!elements.lootboxScreen) return;
    
    const statusContainer = document.createElement('div');
    statusContainer.className = 'limited-item-status';
    statusContainer.style.margin = '10px 0';
    statusContainer.style.padding = '10px';
    statusContainer.style.backgroundColor = '#ff000033';
    statusContainer.style.borderRadius = '5px';
    statusContainer.style.textAlign = 'center';
    
    // Check all limited items in this case
    const limitedItems = caseItem.items.filter(item => item.quantity);
    
    if (limitedItems.length === 0) {
        return; // No limited items in this case
    }
    
    // Check availability for each limited item
    limitedItems.forEach(async (item) => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/items/check-availability?itemName=${encodeURIComponent(item.name)}`);
            const data = await response.json();
            
            if (!data.available) {
                const itemStatus = document.createElement('div');
                itemStatus.textContent = `Maximum quantity of ${item.name} (${data.currentQuantity}/${item.quantity}) reached`;
                statusContainer.appendChild(itemStatus);
            }
        } catch (error) {
            console.error('Error checking item status:', error);
        }
    });
    
    // Only add container if we have status messages
    if (statusContainer.children.length > 0) {
        const existingStatus = document.querySelector('.limited-item-status');
        if (existingStatus) existingStatus.remove();
        
        const lootboxContainer = document.querySelector('.lootbox-container');
        if (lootboxContainer) {
            lootboxContainer.insertBefore(statusContainer, lootboxContainer.firstChild);
        }
    }
}

// Modify the claimLootboxWin function to look like this:
async function claimLootboxWin() {
    if (elements.lootboxPopup) elements.lootboxPopup.style.display = 'none';
    
    const track = document.getElementById('lootbox-items-track');
    if (track) {
        track.style.opacity = '1';
    }

    if (gameState.lootboxGame.currentItem) {
        const shouldAutoSell = checkAutoSell(gameState.lootboxGame.currentItem.rarity);

        if (shouldAutoSell) {
            await autoSellItem(gameState.lootboxGame.currentItem);
            showNotification(
                `Auto-sold ${gameState.lootboxGame.currentItem.name} for ${gameState.lootboxGame.currentItem.value} chips`, 
                true
            );
        } else {
            try {
                const response = await fetch(`${API_BASE_URL}/api/inventory/add`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify({
                        userId: gameState.userId,
                        item: gameState.lootboxGame.currentItem
                    }),
                    credentials: 'include'
                });

                if (!response.ok) throw new Error('Failed to add item to inventory');

                const data = await response.json();
                gameState.inventory = data.inventory;

                if (gameState.currentGame === 'inventory') {
                    updateInventoryDisplay();
                }
            } catch (error) {
                console.error('Error adding item to inventory:', error);
                showNotification('Failed to save item to inventory', false);
            }
        }

        // ✅ Set display rarity name
        const rarityNames = {
            mythic: 'Special item',
            legendary: 'Covert',
            epic: 'Classified',
            uncommon: 'Restricted',
            common: 'Mil-Spec',
            exclusive: 'Exclusive', // New
            limited: 'Limited', // New
            garbage: 'Garbage' // New
        };

        if (elements.lootboxRarity) {
            elements.lootboxRarity.innerText = rarityNames[gameState.lootboxGame.currentItem.rarity] 
                || gameState.lootboxGame.currentItem.rarity;
        }
    }
}


function resetReel(reel, centerSymbol) {
    if (!reel) return;
    
    reel.innerHTML = '';
    for (let i = -1; i <= 1; i++) {
        const symbol = i === 0 ? centerSymbol : getRandomSymbol();
        const symbolElement = document.createElement('div');
        symbolElement.className = 'symbol';
        symbolElement.innerHTML = `<img src="${symbol.img}" alt="${symbol.name}">`;
        symbolElement.style.transform = `translateY(${i * 100}%)`;
        reel.appendChild(symbolElement);
    }
}

function updateCurrencyDisplay() {
    if (elements.chipsDisplay) elements.chipsDisplay.textContent = gameState.chips.toFixed(2);
    if (elements.diceDisplay) elements.diceDisplay.textContent = gameState.dice;
    if (elements.minesChips) elements.minesChips.textContent = gameState.chips.toFixed(2);
    if (elements.minesDice) elements.minesDice.textContent = gameState.dice;
    if (elements.lootboxChips) elements.lootboxChips.textContent = gameState.chips.toFixed(2);
    if (elements.lootboxDice) elements.lootboxDice.textContent = gameState.dice;
    if (elements.inventoryChips) elements.inventoryChips.textContent = gameState.chips.toFixed(2);
    if (elements.inventoryDice) elements.inventoryDice.textContent = gameState.dice;
    if (elements.lootboxSelectChips) elements.lootboxSelectChips.textContent = gameState.chips.toFixed(2);
    if (elements.lootboxSelectDice) elements.lootboxSelectDice.textContent = gameState.dice;
if (elements.cupGameChipsDisplay) {
    elements.cupGameChipsDisplay.textContent = gameState.chips.toFixed(2);
}
if (elements.cupGameDiceDisplay) {
    elements.cupGameDiceDisplay.textContent = gameState.dice.toFixed(2);
}

updateCupGameCurrencyDisplay();
}

function showNotification(message, isSuccess) {
    const notification = document.createElement('div');
    notification.className = `notification ${isSuccess ? 'success' : 'error'}`;
    notification.textContent = message;
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 3000);
}


function showRefillPopup() {
    const refillCost = Math.floor(gameState.chips * 0.1);
    document.getElementById('refill-cost').textContent = refillCost.toLocaleString();
    document.getElementById('refill-popup').style.display = 'flex';
}

async function refillInstantSpins() {
    const refillCost = Math.floor(gameState.chips * 0.1);
    
    if (refillCost > gameState.chips) {
        showNotification("Not enough chips to refill!", false);
        return false;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/api/instant-spins/refill`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                userId: gameState.userId,
                cost: refillCost
            }),
            credentials: 'include'
        });

        if (!response.ok) throw new Error('Refill failed');
        
        const data = await response.json();
        gameState.chips = data.newBalance;
        gameState.instantSpins = data.instantSpins;
        
        updateCurrencyDisplay();
        updateInstantSpinDisplay();
        document.getElementById('refill-popup').style.display = 'none';
        
        showNotification(`Instant spins refilled! Cost: ${refillCost} chips`, true);
        return true;
    } catch (error) {
        console.error('Refill error:', error);
        showNotification('Failed to refill instant spins', false);
        return false;
    }
}

function updateInstantSpinDisplay(showPopup = false) {
    const instantSpinBtn = document.getElementById('lootbox-instant-spin-btn');
    const instantSpinCounter = instantSpinBtn ? instantSpinBtn.querySelector('.instant-spin-counter') : null;
    
    if (!instantSpinCounter) return;

    // Get the current remaining spins
    let remaining;
    if (gameState.instantSpins && typeof gameState.instantSpins.remaining !== 'undefined') {
        remaining = gameState.instantSpins.remaining;
    } else {
        remaining = gameState.instantSpinLimit - gameState.instantSpinsUsed;
    }

    remaining = Math.max(0, remaining);
    
    // Update only the instant spin counter
    instantSpinCounter.textContent = `(${remaining}/${gameState.instantSpinLimit})`;
    
    // Update button state
    if (remaining <= 0) {
        instantSpinBtn.classList.add('disabled');
        if (showPopup) {
            showRefillPopup();
        }
    } else {
        instantSpinBtn.classList.remove('disabled');
    }
}

function initializeCupGameUserData() {
    // Update avatar
    if (elements.cupGameAvatar) {
        elements.cupGameAvatar.src = gameState.avatarUrl || 'default-avatar.png';
    }
    
    // Update username
    if (elements.cupGameUsername) {
        elements.cupGameUsername.textContent = gameState.username || 'Guest';
    }
    
    // Update currency displays
    updateCupGameCurrencyDisplay();
}


// Show Cup Game Screen
function startCupGame() {
    if (!gameState.userId) {
        showLoginScreen();
        return;
    }
    
    gameState.currentGame = 'cup';
    hideAllScreens();
    
    // Initialize user data before showing the screen
    initializeCupGameUserData();
    
    if (elements.cupGameScreen) elements.cupGameScreen.style.display = 'block';
    setupCupGameUI();
}

function updateCupGameCurrencyDisplay() {
    if (elements.cupGameChipsDisplay) {
        elements.cupGameChipsDisplay.textContent = gameState.chips?.toFixed(2) || '0.00';
    }
    if (elements.cupGameDiceDisplay) {
        elements.cupGameDiceDisplay.textContent = gameState.dice?.toFixed(2) || '0.00';
    }
}

// Setup Cup Game UI
function setupCupGameUI() {
    gameState.cupGame = {
        betAmount: 0,
        cupsCount: 0,
        multiplier: 1.0,
        coinPosition: null,
        revealedCups: [],
        gameActive: false,
        currentWin: 0
    };
    
    // Make sure inputs are reset
    if (elements.cupGameBetInput) {
        elements.cupGameBetInput.disabled = false;
        elements.cupGameBetInput.value = '';
    }
    
    if (elements.cupGameCupsInput) {
        elements.cupGameCupsInput.disabled = false;
        elements.cupGameCupsInput.value = '';
    }
    
    if (elements.cupGameStartBtn) {
        elements.cupGameStartBtn.disabled = false;
        elements.cupGameStartBtn.textContent = 'START GAME';
    }
    
    if (elements.cupGameGrid) {
        elements.cupGameGrid.innerHTML = '';
    }
    
    // Update currency display again in case it changed
    updateCupGameCurrencyDisplay();
}


// Start New Cup Game
async function startNewCupGame() {
    const betAmount = parseFloat(elements.cupGameBetInput?.value);
    const cupsCount = parseInt(elements.cupGameCupsInput?.value);
    
    // Validate inputs
    if (isNaN(betAmount) || betAmount <= 0) {
        showNotification("Please enter a valid bet amount", false);
        return;
    }
    
    if (betAmount < CONFIG.cupGame.minBet || betAmount > CONFIG.cupGame.maxBet) {
        showNotification(`Bet amount must be between ${CONFIG.cupGame.minBet} and ${CONFIG.cupGame.maxBet}`, false);
        return;
    }
    
    if (isNaN(cupsCount) || cupsCount < CONFIG.cupGame.minCups || cupsCount > CONFIG.cupGame.maxCups) {
        showNotification(`Number of cups must be between ${CONFIG.cupGame.minCups} and ${CONFIG.cupGame.maxCups}`, false);
        return;
    }
    
    if (betAmount > gameState.chips) {
        showNotification("Not enough chips for this bet", false);
        return;
    }
    
    // Disable inputs and start button
    if (elements.cupGameBetInput) elements.cupGameBetInput.disabled = true;
    if (elements.cupGameCupsInput) elements.cupGameCupsInput.disabled = true;
    if (elements.cupGameStartBtn) elements.cupGameStartBtn.disabled = true;
    
    // Set game state
    gameState.cupGame.betAmount = betAmount;
    gameState.cupGame.cupsCount = cupsCount;
    gameState.cupGame.multiplier = CONFIG.cupGame.multipliers[cupsCount];
    gameState.cupGame.gameActive = true;
    
    // Create cups grid
    createCupsGrid(cupsCount);
    
    // Place coin under random cup
    gameState.cupGame.coinPosition = Math.floor(Math.random() * cupsCount);
    gameState.cupGame.revealedCups = [];
}

// Create Cups Grid
function createCupsGrid(cupsCount) {
    if (!elements.cupGameGrid) return;
    
    elements.cupGameGrid.innerHTML = '';
    elements.cupGameGrid.style.gridTemplateColumns = `repeat(${cupsCount}, 1fr)`;
    
    for (let i = 0; i < cupsCount; i++) {
        const cup = document.createElement('div');
        cup.className = 'cup-game-cup';
        cup.dataset.index = i;
        cup.innerHTML = `<img src="spins/cup.png" alt="Cup">`;
        cup.addEventListener('click', () => revealCup(i));
        elements.cupGameGrid.appendChild(cup);
    }
}

// Reveal Cup
async function revealCup(index) {
    if (!gameState.cupGame.gameActive || gameState.cupGame.revealedCups.includes(index)) {
        return;
    }
    
    const cup = elements.cupGameGrid.children[index];
    if (!cup) return;
    
    // Add to revealed cups
    gameState.cupGame.revealedCups.push(index);
    
    if (index === gameState.cupGame.coinPosition) {
        // Player found the coin - they win!
        cup.innerHTML = `<img src="spins/coinflip.png" alt="Coin">`;
        cup.classList.add('win');
        
        const winAmount = gameState.cupGame.betAmount * gameState.cupGame.multiplier;
        gameState.cupGame.currentWin = winAmount;
        
        try {
            const response = await fetch(`${API_BASE_URL}/api/win`, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    userId: gameState.userId,
                    amount: winAmount
                }),
                credentials: 'include'
            });
            
            if (response.ok) {
                const data = await response.json();
                gameState.chips = data.newBalance;
                updateCurrencyDisplay();
                
                // Show win popup
                if (elements.cupGameGameOverMessage) elements.cupGameGameOverMessage.textContent = "You Won!";
                if (elements.cupGameGameOverAmount) {
                    elements.cupGameGameOverAmount.textContent = `+${winAmount.toFixed(2)}`;
                }
                if (elements.cupGameGameOverPopup) elements.cupGameGameOverPopup.style.display = 'flex';
            }
        } catch (error) {
            console.error('Win claim error:', error);
            showNotification('Failed to claim win', false);
        }
    } else {
        // Player picked wrong cup - they lose
        cup.innerHTML = `<img src="spins/cup.png" alt="Empty Cup">`;
        cup.classList.add('empty');
        
        // Calculate loss (99% of bet)
        const lossAmount = gameState.cupGame.betAmount * 0.99;
        const returnedAmount = gameState.cupGame.betAmount * 0.01;
        
        try {
            const response = await fetch(`${API_BASE_URL}/api/spin`, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    userId: gameState.userId,
                    cost: lossAmount
                }),
                credentials: 'include'
            });

            if (response.ok) {
                const data = await response.json();
                gameState.chips = data.newBalance;
                updateCurrencyDisplay();
                
                // Show loss popup
                if (elements.cupGameGameOverMessage) elements.cupGameGameOverMessage.textContent = "Game Over!";
                if (elements.cupGameGameOverAmount) {
                    elements.cupGameGameOverAmount.textContent = `-${lossAmount.toFixed(2)} (returned ${returnedAmount.toFixed(2)})`;
                }
                if (elements.cupGameGameOverPopup) elements.cupGameGameOverPopup.style.display = 'flex';
            }
        } catch (error) {
            console.error('Loss deduction error:', error);
            showNotification('Failed to process loss', false);
        }
    }
    
    // End the game
    gameState.cupGame.gameActive = false;
    
    // Reveal the coin position if not already found
    if (index !== gameState.cupGame.coinPosition) {
        const coinCup = elements.cupGameGrid.children[gameState.cupGame.coinPosition];
        if (coinCup) {
            setTimeout(() => {
                coinCup.innerHTML = `<img src="spins/coinflip.png" alt="Coin">`;
                coinCup.classList.add('win');
            }, 500);
        }
    }
}

// Close Cup Game Over Popup
function closeCupGameOverPopup() {
    if (elements.cupGameGameOverPopup) elements.cupGameGameOverPopup.style.display = 'none';
    setupCupGameUI();
}

function hideAllScreens() {
    if (elements.loginScreen) elements.loginScreen.style.display = 'none';
    if (elements.gameScreen) elements.gameScreen.style.display = 'none';
    if (elements.gameSelectScreen) elements.gameSelectScreen.style.display = 'none';
    if (elements.minesGameScreen) elements.minesGameScreen.style.display = 'none';
    if (elements.lootboxScreen) elements.lootboxScreen.style.display = 'none';
    if (elements.inventoryScreen) elements.inventoryScreen.style.display = 'none';
    if (elements.lootboxCaseSelectScreen) elements.lootboxCaseSelectScreen.style.display = 'none';
    if (elements.cupGameScreen) elements.cupGameScreen.style.display = 'none';
}

// Slot Machine Functions
async function startSpin() {
    if (gameState.isSpinning || gameState.chips < CONFIG.spinCost) {
        if (gameState.chips < CONFIG.spinCost) {
            showNotification("Not enough chips!", false);
        }
        return;
    }

    initSpinState();
    const targetSymbols = elements.reels.map(() => getRandomSymbol());
    startEnhancedSpinAnimation(targetSymbols);
    
    try {
        const response = await fetch(`${API_BASE_URL}/api/spin`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                userId: gameState.userId,
                cost: CONFIG.spinCost
            }),
            credentials: 'include'
        });

        if (!response.ok) throw new Error('Spin failed');

        const data = await response.json();
        gameState.chips = data.newBalance;
        updateCurrencyDisplay();
    } catch (error) {
        console.error('Spin error:', error);
        showNotification('Failed to process spin. Please try again.', false);
        resetSpinState();
        elements.reels.forEach((reel, index) => {
            const symbol = getRandomSymbol();
            resetReel(reel, symbol);
            gameState.currentSymbols[index] = symbol.name;
        });
    }
}

function initSpinState() {
    gameState.isSpinning = true;
    gameState.spinningReels = elements.reels.length;
    gameState.winAmount = 0;
    gameState.winCombo = null;
    if (elements.spinBtn) elements.spinBtn.disabled = true;
    if (elements.winPopup) elements.winPopup.style.display = 'none';
}

function startEnhancedSpinAnimation(targetSymbols) {
    gameState.currentSymbols = targetSymbols.map(s => s.name);
    const baseDuration = 2000;
    const spinCycles = 4;
    
    elements.reels.forEach((reel, index) => {
        if (!reel) return;
        const duration = baseDuration + (index * 400);
        enhancedSpinReel(reel, targetSymbols[index], duration, spinCycles);
    });
}

function enhancedSpinReel(reel, targetSymbol, duration, cycles) {
    const symbols = CONFIG.symbols;
    let startTime = null;
    const symbolHeight = 100;
    const totalSymbols = 5;

    const symbolElements = [];
    for (let i = 0; i < totalSymbols; i++) {
        const symbolElement = document.createElement('div');
        symbolElement.className = 'symbol';
        reel.appendChild(symbolElement);
        symbolElements.push(symbolElement);
    }

    function animateSpin(timestamp) {
        if (!startTime) startTime = timestamp;
        const progress = timestamp - startTime;
        const spinProgress = Math.min(progress / duration, 1);
        
        const easedProgress = spinProgress;

        if (spinProgress < 1) {
            const basePosition = -easedProgress * (symbolHeight * cycles * symbols.length);
            
            symbolElements.forEach((element, i) => {
                const position = basePosition + (i * symbolHeight);
                const symbolIndex = Math.floor(-basePosition / symbolHeight) + i;
                const symbol = symbols[symbolIndex % symbols.length];
                
                element.innerHTML = `<img src="${symbol.img}" alt="${symbol.name}">`;
                element.style.transform = `translateY(${position}%)`;
            });
            
            requestAnimationFrame(animateSpin);
        } else {
            reel.innerHTML = '';
            resetReel(reel, targetSymbol);
            
            const centerSymbol = reel.querySelector('.symbol:nth-child(2)');
            if (centerSymbol) centerSymbol.style.animation = 'landingBounce 0.5s ease-out';
            
            gameState.spinningReels--;
            
            if (gameState.spinningReels === 0) {
                completeSpin();
            }
        }
    }

    requestAnimationFrame(animateSpin);
}

function completeSpin() {
    resetSpinState();
    checkWin();
    highlightWinningSymbols();
}

function resetSpinState() {
    gameState.isSpinning = false;
    if (elements.spinBtn) elements.spinBtn.disabled = false;
}

function highlightWinningSymbols() {
    if (!gameState.winCombo) return;
    
    elements.reels.forEach((reel, index) => {
        if (!reel) return;
        const symbols = reel.querySelectorAll('.symbol');
        if (symbols[1] && (gameState.winCombo === 'ANY_TWO_MATCH' || 
            gameState.currentSymbols.filter(s => s === gameState.currentSymbols[index]).length >= 2)) {
            symbols[1].classList.add('win-highlight');
        }
    });
}

async function checkWin() {
    const combo = gameState.currentSymbols.join('-');
    let winAmount = 0;
    let winCombo = null;
    
    if (CONFIG.payouts[combo]) {
        winAmount = CONFIG.payouts[combo];
        winCombo = combo;
    } else if (hasTwoMatchingSymbols()) {
        winAmount = CONFIG.payouts['ANY_TWO_MATCH'];
        winCombo = 'ANY_TWO_MATCH';
    }

    if (winAmount > 0) {
        try {
            const response = await fetch(`${API_BASE_URL}/api/win`, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    userId: gameState.userId,
                    amount: winAmount
                }),
                credentials: 'include'
            });

            if (response.ok) {
                const data = await response.json();
                updateGameStateAfterWin(data, winAmount, winCombo);
                showWinPopup(winCombo, winAmount);
            }
        } catch (error) {
            console.error('Win claim error:', error);
        }
    }
}

function hasTwoMatchingSymbols() {
    const [a, b, c] = gameState.currentSymbols;
    return a === b || b === c || a === c;
}

function updateGameStateAfterWin(data, amount, combo) {
    gameState.chips = data.newBalance;
    gameState.winAmount = amount;
    gameState.winCombo = combo;
    updateCurrencyDisplay();
}

function showWinPopup(combo, amount) {
    if (!elements.winComboDisplay || !elements.winAmountDisplay || !elements.winPopup) return;
    
    const comboDisplay = combo === 'ANY_TWO_MATCH' 
        ? 'Two Matching Symbols' 
        : createComboSymbolsDisplay(combo);
    
    elements.winComboDisplay.innerHTML = comboDisplay;
    elements.winAmountDisplay.textContent = `+${amount}`;
    elements.winPopup.style.display = 'flex';
}

function createComboSymbolsDisplay(combo) {
    const symbols = combo.split('-').map(name => {
        const symbol = CONFIG.symbols.find(s => s.name === name);
        return symbol ? `<img src="${symbol.img}" alt="${symbol.name}" class="combo-symbol">` : '';
    });
    return `<div class="combo-symbols">${symbols.join('')}</div>`;
}

async function claimWin() {
    gameState.winAmount = 0;
    gameState.winCombo = null;
    if (elements.winPopup) elements.winPopup.style.display = 'none';
}

// Loot Box Functions
function showLootboxCaseSelectScreen() {
    if (!gameState.userId) {
        showLoginScreen();
        return;
    }
    
    // Hide other screens
    if (elements.gameScreen) elements.gameScreen.style.display = 'none';
    if (elements.gameSelectScreen) elements.gameSelectScreen.style.display = 'none';
    if (elements.lootboxScreen) elements.lootboxScreen.style.display = 'none';
    
    // Show case select screen
    if (elements.lootboxCaseSelectScreen) {
        elements.lootboxCaseSelectScreen.style.display = 'block';
        populateLootboxCases();
        TimerManager.start();
    }
}

function hideLootboxCaseSelectScreen() {
    if (elements.lootboxCaseSelectScreen) {
        elements.lootboxCaseSelectScreen.style.display = 'none';
    }
    TimerManager.stop();
}

function populateLootboxCases() {
    if (!elements.lootboxCasesContainer) return;
    
    elements.lootboxCasesContainer.innerHTML = '';
    
    const now = new Date();
    
    CONFIG.lootboxCases.forEach(lootboxCase => {
        const startTime = lootboxCase.startTime ? new Date(lootboxCase.startTime) : new Date(0);
        const endTime = new Date(lootboxCase.endTime);
        const isAvailable = !lootboxCase.limitedTime || 
                          (now >= startTime && now < endTime);
        const hasNotStarted = now < startTime;
        
        const caseElement = document.createElement('div');
        caseElement.className = `lootbox-case ${!isAvailable && lootboxCase.limitedTime ? 'disabled-case' : ''}`;
        
        let timerHtml = '';
        if (lootboxCase.limitedTime) {
            if (isAvailable) {
                // Active case
                const timeRemaining = endTime - now;
                const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
                const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);
                
                timerHtml = `
                    <div class="case-timer active">
                        <div>Available Now</div>
                        <div class="end-countdown">Ends in ${days}d ${hours}h ${minutes}m ${seconds}s</div>
                    </div>
                `;
            } else if (hasNotStarted) {
                // Not started yet
                const timeUntilStart = startTime - now;
                const days = Math.floor(timeUntilStart / (1000 * 60 * 60 * 24));
                const hours = Math.floor((timeUntilStart % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((timeUntilStart % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((timeUntilStart % (1000 * 60)) / 1000);
                
                timerHtml = `
                    <div class="case-timer not-started">
                        <div>Starts in</div>
                        <div class="start-countdown">${days}d ${hours}h ${minutes}m ${seconds}s</div>
                    </div>
                `;
            } else {
                // Expired
                timerHtml = '<div class="case-timer expired">Expired</div>';
            }
        }
        
        caseElement.innerHTML = `
            <img src="${lootboxCase.img}" alt="${lootboxCase.name}" class="lootbox-case-img">
            <div class="lootbox-case-name">${lootboxCase.name}</div>
            <div class="lootbox-case-price">${lootboxCase.cost} chips</div>
            ${timerHtml}
        `;
        
        if (isAvailable) {
            caseElement.style.opacity = '1';
            caseElement.style.pointerEvents = 'auto';
            caseElement.addEventListener('click', () => selectLootboxCase(lootboxCase));
        } else {
            caseElement.style.opacity = '0.6';
            caseElement.style.pointerEvents = 'none';
        }
        
        elements.lootboxCasesContainer.appendChild(caseElement);
    });
    
    setTimeout(updateCaseTimers, 0);
}

async function selectLootboxCase(selectedCase) {
    gameState.lootboxGame.currentCase = selectedCase;
    
    if (selectedCase.playVideo && selectedCase.video) {
        try {
            await playCaseVideo(selectedCase.video);
        } catch (error) {
            console.error('Video playback error:', error);
        }
    }
    
    if (elements.lootboxCaseSelectScreen) elements.lootboxCaseSelectScreen.style.display = 'none';
    if (elements.lootboxScreen) elements.lootboxScreen.style.display = 'block';
    
    initializeLootboxItems();
    updateCaseLimitedItemStatus(selectedCase); // Add this
}

async function startLootboxSpin() {
    // 0. Prevent multiple simultaneous spins
    if (isLootboxSpinning) return;
    isLootboxSpinning = true;
    
    // 1. Client-side availability check
    const caseItem = gameState.lootboxGame.currentCase;
    const now = new Date();
    
    // Only validate time for limited cases
    if (caseItem.limitedTime) {
        const startTime = caseItem.startTime ? new Date(caseItem.startTime) : new Date(0);
        const endTime = new Date(caseItem.endTime);
        
        if (now < startTime) {
            showNotification("This case hasn't started yet!", false);
            resetLootboxSpinState();
            return;
        }
        
        if (now >= endTime) {
            showNotification("This case is no longer available!", false);
            resetLootboxSpinState();
            return;
        }
    }

    // 2. Set loading state
    setLootboxButtonsDisabled(true);
    if (elements.lootboxSpinBtn) {
        elements.lootboxSpinBtn.disabled = true;
        elements.lootboxSpinBtn.textContent = "Validating...";
    }

    try {
        // 3. Server-side validation (only for limited cases)
        if (caseItem.limitedTime) {
            const validationResponse = await fetch(`${API_BASE_URL}/api/cases/validate-spin`, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    userId: gameState.userId,
                    caseId: caseItem.id
                }),
                credentials: 'include'
            });

            if (!validationResponse.ok) {
                throw new Error(`Validation failed: ${validationResponse.status}`);
            }

            const validationData = await validationResponse.json();
            
            if (!validationData.valid) {
                showNotification("Server validation failed - case unavailable", false);
                return;
            }
        }

        // 4. Deduct cost and start spin
        const spinResponse = await fetch(`${API_BASE_URL}/api/spin`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                userId: gameState.userId,
                cost: caseItem.cost
            }),
            credentials: 'include'
        });

        if (!spinResponse.ok) throw new Error('Spin deduction failed');
        
        const spinData = await spinResponse.json();
        gameState.chips = spinData.newBalance;
        updateCurrencyDisplay();

        // 5. Start spin animation
        if (elements.lootboxSpinBtn) elements.lootboxSpinBtn.textContent = "Spinning...";

        if (spinSound) {
            spinSound.currentTime = 0;
            spinSound.play().catch(e => console.warn('Spin sound error:', e));
        }

        const track = document.getElementById('lootbox-items-track');
        const container = track.parentElement;
        
        // Determine result item with validation
        const resultItem = await getRandomLootboxItem(caseItem.items);
        if (!resultItem || !resultItem.name || !resultItem.img) {
            throw new Error('Invalid result item selected');
        }
        console.log('Target item:', resultItem.name, 'Rarity:', resultItem.rarity);
        
        // Build item track with validation
        track.innerHTML = '';
        const itemsPool = [];
        
        // Filter out invalid items before creating the pool
        const validItems = caseItem.items.filter(item => 
            item && item.name && item.img && item.rarity
        );
        
        if (validItems.length === 0) {
            throw new Error('Case contains no valid items');
        }
        
        // Create weighted pool only with valid items
        validItems.forEach(item => {
            const count = Math.max(1, Math.floor(item.chance * 10));
            for (let i = 0; i < count; i++) {
                itemsPool.push(item);
            }
        });

        // Shuffle items
        for (let i = itemsPool.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [itemsPool[i], itemsPool[j]] = [itemsPool[j], itemsPool[i]];
        }

        // Create 3 loops with target in middle
        const singleLoop = itemsPool.slice(0, 50);
        if (!singleLoop.some(item => item.name === resultItem.name)) {
            singleLoop[Math.floor(Math.random() * singleLoop.length)] = resultItem;
        }

        // Create the spinning display with additional validation
        for (let loop = 0; loop < 3; loop++) {
            singleLoop.forEach(item => {
                // Skip if item is invalid
                if (!item || !item.name || !item.img) return;
                
                const itemElement = document.createElement('div');
                itemElement.className = `lootbox-item ${item.rarity || 'common'}`;
                itemElement.innerHTML = `<img src="${item.img}" alt="${item.name}">`;
                itemElement.dataset.itemName = item.name;
                itemElement.style.minWidth = '120px';
                itemElement.style.minHeight = '120px';
                track.appendChild(itemElement);
            });
        }

        track.style.transform = 'translateX(0px)';
        track.style.transition = 'none';
        track.style.opacity = '1';

        // Animation logic
        const allItems = track.querySelectorAll('.lootbox-item');
        const itemsPerLoop = allItems.length / 3;
        const middleStart = Math.floor(itemsPerLoop);
        const middleEnd = Math.floor(itemsPerLoop * 2);
        
        let targetIndex = -1;
        for (let i = middleStart; i < middleEnd && targetIndex === -1; i++) {
            const itemName = allItems[i].dataset.itemName || allItems[i].querySelector('img').alt;
            if (itemName === resultItem.name) targetIndex = i;
        }

        // Fallback if target not found
        if (targetIndex === -1) {
            targetIndex = middleStart + Math.floor(Math.random() * (middleEnd - middleStart));
        }

        const itemWidth = 140;
        const containerCenter = container.offsetWidth / 2;
        const loopWidth = itemsPerLoop * itemWidth;
        let currentPosition = Math.random() * loopWidth;
        
        let velocity = 8;
        const maxVelocity = 25;
        const acceleration = 1.1;
        const minVelocity = 0.3;
        
        let phase = 'accelerating';
        let spinTime = 0;
        const targetSpinTime = 4500 + Math.random() * 1000;

        function animate() {
            spinTime += 16;
            
            if (phase === 'accelerating' && spinTime > targetSpinTime * 0.3) {
                phase = 'decelerating';
            }
            
            velocity = phase === 'accelerating' 
                ? Math.min(velocity * acceleration, maxVelocity) 
                : velocity * 0.985;
            
            currentPosition += velocity;
            while (currentPosition >= loopWidth) currentPosition -= loopWidth;
            
            track.style.transform = `translateX(${-currentPosition}px)`;
            track.style.transition = 'none';
            
            if (spinTime >= targetSpinTime && velocity <= minVelocity) {
                const centerPos = currentPosition + containerCenter - 65;
                const nearestIdx = Math.round(centerPos / itemWidth) % itemsPerLoop + middleStart;
                const finalItem = allItems[nearestIdx >= allItems.length ? middleStart : nearestIdx];
                const itemName = finalItem?.dataset.itemName || finalItem?.querySelector('img').alt;
                
                let finalReward = caseItem.items.find(i => i.name === itemName) || resultItem;
                if (!finalReward || !finalReward.name) {
                    finalReward = resultItem; // Fallback to the original result
                }
                
                if (finalReward.rarity === 'mythic') {
                    const knife = getRandomKnife(caseItem.knifes);
                    if (knife && knife.name) {
                        finalReward = knife;
                    }
                }

                setTimeout(() => {
                    if (checkAutoSell(finalReward.rarity)) {
                        autoSellItem(finalReward).then(() => {
                            showNotification(`Auto-sold ${finalReward.name} for ${finalReward.value} chips`, true);
                            resetLootboxSpinState();
                        });
                    } else {
                        showLootboxPopup(finalReward);
                        resetLootboxSpinState();
                    }
                }, 200);
                return;
            }
            
            if (isLootboxSpinning) requestAnimationFrame(animate);
        }
        
        requestAnimationFrame(animate);

    } catch (error) {
        console.error('Spin error:', error);
        showNotification(`Spin failed: ${error.message}`, false);
        resetLootboxSpinState();
    }
}

async function instantLootboxSpin() {
    // Prevent multiple simultaneous spins
    if (gameState.isSpinning) {
        console.log("Spin already in progress");
        return;
    }
    
    gameState.isSpinning = true;
    const caseItem = gameState.lootboxGame.currentCase;
    let spinSuccess = false;
    
    try {
        // 1. Validate case exists
        if (!caseItem) {
            throw new Error("No case selected");
        }

        // 2. Check spins remaining
        const spinsLeft = gameState.instantSpins?.remaining ?? 
                        (gameState.instantSpinLimit - (gameState.instantSpinsUsed || 0));
        
        if (spinsLeft <= 0) {
            updateInstantSpinDisplay(true);
            return;
        }

        // 3. Skip validation for permanent cases (limitedTime: false)
        if (caseItem.limitedTime) {
            try {
                const validationResponse = await fetch(`${API_BASE_URL}/api/cases/validate-spin`, {
                    method: 'POST',
                    headers: { 
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify({
                        caseId: caseItem.id
                    }),
                    credentials: 'include',
                    signal: AbortSignal.timeout(5000) // 5 second timeout for validation
                });

                if (!validationResponse.ok) {
                    const errorData = await validationResponse.json().catch(() => ({}));
                    throw new Error(errorData.error || "Case validation failed");
                }

                const validationData = await validationResponse.json();
                if (!validationData.valid) {
                    throw new Error(validationData.error || "This case is not currently available");
                }
            } catch (error) {
                console.error("Case validation error:", error);
                throw new Error("Failed to validate case availability");
            }
        }

        // 4. Check item availability (only for limited quantity items)
        const availableItems = [];
        for (const item of caseItem.items) {
            if (!item.quantity) {
                availableItems.push(item); // No quantity limit
            } else {
                try {
                    const isAvailable = await checkItemAvailable(item.name);
                    if (isAvailable) {
                        availableItems.push(item);
                    }
                } catch (error) {
                    console.warn(`Availability check failed for ${item.name}:`, error);
                    // Include item anyway if check fails
                    availableItems.push(item);
                }
            }
        }
        
        if (availableItems.length === 0) {
            throw new Error("No available items in this case");
        }

        // 5. Process spin
        const spinCost = caseItem.cost || CONFIG.lootboxCost;
        
        if (gameState.chips < spinCost) {
            throw new Error("Not enough chips");
        }

        const spinResponse = await fetch(`${API_BASE_URL}/api/spin`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                userId: gameState.userId,
                cost: spinCost,
                isInstantSpin: true,
                caseId: caseItem.id,
                isLimitedCase: caseItem.limitedTime || false
            }),
            credentials: 'include',
            signal: AbortSignal.timeout(10000) // 10 second timeout
        });

        if (!spinResponse.ok) {
            const errorData = await spinResponse.json().catch(() => ({}));
            throw new Error(errorData.error || 'Spin failed');
        }

        const spinData = await spinResponse.json();
        gameState.chips = spinData.newBalance;
        spinSuccess = true;
        
        // Update instant spins
        if (typeof spinData.instantSpins === 'object') {
            gameState.instantSpins = spinData.instantSpins;
        } else {
            gameState.instantSpinsUsed = (gameState.instantSpinsUsed || 0) + 1;
        }
        
        updateCurrencyDisplay();
        updateInstantSpinDisplay();

        // 6. Get random item from available items
        const resultItem = await getRandomLootboxItem(availableItems);
        if (!resultItem || !resultItem.name) {
            throw new Error("Failed to select a valid item");
        }

        let finalReward = resultItem;
        
        // Handle mythic items (knives)
        if (resultItem.rarity === 'mythic' && caseItem.knifes?.length > 0) {
            try {
                const knife = getRandomKnife(caseItem.knifes);
                if (knife && knife.name) {
                    finalReward = knife;
                }
            } catch (error) {
                console.error("Knife selection error:", error);
            }
        }

        // 7. Handle reward
        if (checkAutoSell(finalReward.rarity)) {
            const sellSuccess = await autoSellItem(finalReward);
            if (sellSuccess) {
                showNotification(`Auto-sold ${finalReward.name} for ${finalReward.value} chips`, true);
            } else {
                // If auto-sell fails, add to inventory instead
                await addToInventory(finalReward);
                showNotification(`${finalReward.name} added to inventory`, true);
            }
        } else {
            // Play mythic video if applicable
            // Play mythic video if applicable
if (finalReward.rarity === 'mythic' && caseItem.mythicVideo && caseItem.mythicVideoFile) {
    try {
        await playMythicVideo(caseItem.mythicVideoFile);
    } catch (error) {
        console.error("Mythic video playback error:", error);
    }
}

            
            // Show the reward popup
            await showLootboxPopup(finalReward);
            
            // Add to inventory
            try {
                await addToInventory(finalReward);
            } catch (error) {
                console.error("Failed to add item to inventory:", error);
                showNotification("Failed to save item to inventory", false);
            }
            
            // Play sound effect
            if (openSound) {
                try {
                    openSound.currentTime = 0;
                    await openSound.play();
                } catch (error) {
                    console.warn('Sound playback error:', error);
                    // Fallback to muted playback
                    openSound.muted = true;
                    openSound.play().catch(e => console.warn('Muted playback failed:', e));
                }
            }
        }
    } catch (error) {
        console.error('Instant spin error:', error);
        
        // Only show error notification if we didn't successfully complete the spin
        if (!spinSuccess) {
            showNotification(error.message || 'Failed to process instant spin', false);
        }
    } finally {
        gameState.isSpinning = false;
        updateInstantSpinDisplay();
        
        // Update UI elements
        const instantSpinBtn = document.getElementById('lootbox-instant-spin-btn');
        if (instantSpinBtn) {
            instantSpinBtn.disabled = false;
            const counter = instantSpinBtn.querySelector('.instant-spin-counter');
            if (counter) {
                const remaining = gameState.instantSpins?.remaining ?? 
                                (gameState.instantSpinLimit - (gameState.instantSpinsUsed || 0));
                counter.textContent = `(${Math.max(0, remaining)}/${gameState.instantSpinLimit})`;
            }
        }
    }
}

// Add this helper function if not already present
function isCaseAvailable(caseItem) {
    if (!caseItem.limitedTime) return true;
    
    const now = new Date();
    const startTime = caseItem.startTime ? new Date(caseItem.startTime) : new Date(0);
    const endTime = new Date(caseItem.endTime);
    
    return now >= startTime && now < endTime;
}

// Add this function to handle auto-selling
async function autoSellItem(item) {
    try {
        const response = await fetch(`${API_BASE_URL}/api/win`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                userId: gameState.userId,
                amount: item.value || 0
            }),
            credentials: 'include'
        });

        if (!response.ok) throw new Error('Auto-sell failed');
        
        const data = await response.json();
        gameState.chips = data.newBalance;
        updateCurrencyDisplay();
        
        return true;
    } catch (error) {
        console.error('Auto-sell error:', error);
        return false;
    }
}

function resetLootboxSpinState() {
    isLootboxSpinning = false;
    gameState.lootboxGame.isSpinning = false;
    
    if (elements.lootboxSpinBtn) {
        elements.lootboxSpinBtn.disabled = false;
        elements.lootboxSpinBtn.textContent = "SPIN";
    }
    
    if (spinAnimation) {
        cancelAnimationFrame(spinAnimation);
        spinAnimation = null;
    }
    
    setLootboxButtonsDisabled(false);
    console.log('Lootbox spin state fully reset');
}

async function showLootboxPopup(item) {
    if (!elements.lootboxPopup || !elements.lootboxItemWon || !elements.lootboxItemName || !elements.lootboxRarity) return;
    
    // Check if this is a mythic item and case has mythic video enabled
    const currentCase = gameState.lootboxGame.currentCase;
    if (item.rarity === 'mythic' && currentCase.mythicVideo && currentCase.mythicVideoFile) {
        try {
            // Create loading indicator
            const loadingContainer = document.createElement('div');
            loadingContainer.className = 'video-loading-container';
            loadingContainer.innerHTML = `
                <div class="video-loading-spinner"></div>
                <div class="video-loading-text">Loading special reward...</div>
            `;
            document.body.appendChild(loadingContainer);
            
            // Play the video and wait for it to finish
            await playMythicVideo(currentCase.mythicVideoFile);
            
            // Remove loading indicator
            loadingContainer.remove();
        } catch (error) {
            console.error('Mythic video playback error:', error);
            // Remove loading indicator if it exists
            const loadingContainer = document.querySelector('.video-loading-container');
            if (loadingContainer) loadingContainer.remove();
        }
    }
    
    
    // Set up the popup content
    elements.lootboxItemWon.innerHTML = `<img src="${item.img}" alt="${item.name}">`;
    elements.lootboxItemName.textContent = item.name;
    
    // Rarity name mapping
    const nameMap = {
        common: "MIL-SPEC",
        uncommon: "RESTRICTED",
        epic: "CLASSIFIED",
        legendary: "COVERT",
        exclusive: "EXCLUSIVE",
        mythic: "SPECIAL ITEM",
        limited: "LIMITED"
    };
    
    // Set rarity display text and classes
    elements.lootboxRarity.textContent = nameMap[item.rarity] || item.rarity.toUpperCase();
    elements.lootboxItemWon.className = 'lootbox-item-won';
    elements.lootboxItemWon.classList.add(item.rarity);
    elements.lootboxRarity.className = 'lootbox-rarity';
    elements.lootboxRarity.classList.add(item.rarity);
    
    // Store the current item in game state
    gameState.lootboxGame.currentItem = {
        name: item.name,
        img: item.img,
        rarity: item.rarity,
        value: item.value || 0
    };
    
    // Handle sound effects
    if (spinSound && !spinSound.paused) {
        spinSound.pause();
        spinSound.currentTime = 0;
    }
    
    if (openSound) {
        try {
            openSound.currentTime = 0;
            await openSound.play();
        } catch (error) {
            console.warn('Open sound error:', error);
            // Fallback to muted playback if autoplay fails
            openSound.muted = true;
            openSound.play().catch(e => console.warn('Muted open sound error:', e));
        }
    }
    
    // Add special animation for mythic items
    if (item.rarity === 'mythic') {
        elements.lootboxItemWon.style.animation = 'mythicGlow 2s infinite alternate';
    } else {
        elements.lootboxItemWon.style.animation = '';
    }
    
    // Show the popup
    elements.lootboxPopup.style.display = 'flex';
    
    // Add a subtle entrance animation
    elements.lootboxPopup.style.animation = 'popIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    
    // Add a backdrop blur effect
    const backdrop = document.createElement('div');
    backdrop.className = 'popup-backdrop';
    elements.lootboxPopup.parentNode.insertBefore(backdrop, elements.lootboxPopup);
    
    // Close backdrop when clicked
    backdrop.addEventListener('click', () => {
        elements.lootboxPopup.style.display = 'none';
        backdrop.remove();
    });
}

// Inventory Functions
function updateInventoryDisplay() {
    if (!elements.inventoryItems) return;

    const container = elements.inventoryItems;
    container.innerHTML = '';

    if (gameState.inventory.length === 0) {
        container.innerHTML = '<div class="inventory-empty">Your inventory is empty</div>';
        elements.inventoryTotalItems.textContent = '0 items';
        return;
    }

    // Filter out garbage items from display
    const filteredInventory = gameState.inventory.filter(item => item.rarity !== 'garbage');
    elements.inventoryTotalItems.textContent = `${filteredInventory.length} items`;

    const rarityOrder = ['limited', 'mythic', 'exclusive', 'legendary', 'epic', 'uncommon', 'common'];

    const rarityNames = {
        limited: 'Limited',
        mythic: 'Special item',
        exclusive: 'Exclusive',
        legendary: 'Covert',
        epic: 'Classified',
        uncommon: 'Restricted',
        common: 'Mil-Spec',
        garbage: 'Garbage'
    };

    const sortedInventory = [...filteredInventory].sort((a, b) => {
        return rarityOrder.indexOf(a.rarity) - rarityOrder.indexOf(b.rarity);
    });

    sortedInventory.forEach(item => {
        const itemElement = document.createElement('div');
itemElement.className = `inventory-item ${item.rarity}`;
itemElement.innerHTML = `
    <img src="${item.img}" alt="${item.name}" class="inventory-item-img">
    <div class="inventory-item-name">${item.name}</div>
    <div class="inventory-item-rarity ${item.rarity}">${rarityNames[item.rarity] || item.rarity}</div>
    ${item.quantity ? `<div class="inventory-item-count">${item.quantity}</div>` : ''}
`;
        itemElement.addEventListener('click', () => showSellPanel(item));
        container.appendChild(itemElement);
    });
}



function showSellPanel(item) {
    if (!elements.inventorySellPanel) return;
    
    currentSellingItem = item;
    
    elements.inventorySellImg.src = item.img;
    elements.inventorySellImg.alt = item.name;
    elements.inventorySellName.textContent = item.name;
    elements.inventorySellValue.textContent = `Value: ${item.value} chips each`;
    elements.inventorySellInput.value = 1;
    elements.inventorySellInput.max = item.quantity;
    elements.inventorySellMax.textContent = `/ ${item.quantity}`;
    elements.inventorySellTotal.textContent = `Total: ${item.value} chips`;
    
    elements.inventorySellPanel.style.display = 'block';
}

function updateSellTotal() {
    if (!currentSellingItem || !elements.inventorySellInput) return;
    
    const quantity = parseInt(elements.inventorySellInput.value) || 0;
    const maxQuantity = currentSellingItem.quantity;
    const value = currentSellingItem.value;
    
    if (quantity < 1) {
        elements.inventorySellInput.value = 1;
    } else if (quantity > maxQuantity) {
        elements.inventorySellInput.value = maxQuantity;
    }
    
    const validQuantity = parseInt(elements.inventorySellInput.value);
    const total = validQuantity * value;
    
    if (elements.inventorySellTotal) {
        elements.inventorySellTotal.textContent = `Total: ${total} chips`;
    }
}

async function sellInventoryItem() {
    if (!currentSellingItem || !elements.inventorySellInput) return;
    
    const quantity = parseInt(elements.inventorySellInput.value) || 0;
    const maxQuantity = currentSellingItem.quantity;
    const value = currentSellingItem.value;
    
    if (quantity < 1 || quantity > maxQuantity) {
        showNotification('Invalid quantity', false);
        return;
    }
    
    try {
        const response = await fetch(`${API_BASE_URL}/api/inventory/sell`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                userId: gameState.userId,
                itemName: currentSellingItem.name,
                quantity: quantity,
                totalValue: quantity * value
            }),
            credentials: 'include'
        });

        if (!response.ok) throw new Error('Failed to sell item');
        
        const data = await response.json();
        gameState.chips = data.newBalance;
        gameState.inventory = data.inventory;
        updateCurrencyDisplay();
        
        showNotification(`Sold ${quantity} ${currentSellingItem.name} for ${quantity * value} chips`, true);
        
        updateInventoryDisplay();
        closeSellPanel();
    } catch (error) {
        console.error('Sell error:', error);
        showNotification('Failed to sell item', false);
    }
}

function closeSellPanel() {
    if (elements.inventorySellPanel) {
        elements.inventorySellPanel.style.display = 'none';
    }
    currentSellingItem = null;
}

async function loadInventory() {
    try {
        const response = await fetch(`${API_BASE_URL}/api/inventory?userId=${gameState.userId}`, {
            credentials: 'include'
        });
        
        if (response.ok) {
            const data = await response.json();
            gameState.inventory = data.items || [];
            updateInventoryDisplay();
        } else {
            throw new Error('Failed to load inventory');
        }
    } catch (error) {
        console.error('Failed to load inventory:', error);
        showNotification('Failed to load inventory', false);
    }
}

// Mines Game Functions
function showGameSelectScreen() {
    if (!gameState.userId) {
        showLoginScreen();
        return;
    }
    if (elements.loginScreen) elements.loginScreen.style.display = 'none';
    if (elements.gameScreen) elements.gameScreen.style.display = 'none';
    if (elements.minesGameScreen) elements.minesGameScreen.style.display = 'none';
    if (elements.lootboxScreen) elements.lootboxScreen.style.display = 'none';
    if (elements.inventoryScreen) elements.inventoryScreen.style.display = 'none';
    if (elements.lootboxCaseSelectScreen) elements.lootboxCaseSelectScreen.style.display = 'none';
    if (elements.gameSelectScreen) elements.gameSelectScreen.style.display = 'block';
    updateCurrencyDisplay();
}

function startSlotMachineGame() {
    if (!gameState.userId) {
        showLoginScreen();
        return;
    }
    gameState.currentGame = 'slots';
    if (elements.loginScreen) elements.loginScreen.style.display = 'none';
    if (elements.gameSelectScreen) elements.gameSelectScreen.style.display = 'none';
    if (elements.minesGameScreen) elements.minesGameScreen.style.display = 'none';
    if (elements.lootboxScreen) elements.lootboxScreen.style.display = 'none';
    if (elements.inventoryScreen) elements.inventoryScreen.style.display = 'none';
    if (elements.lootboxCaseSelectScreen) elements.lootboxCaseSelectScreen.style.display = 'none';
    if (elements.gameScreen) elements.gameScreen.style.display = 'block';
}

function startMinesGame() {
    if (!gameState.userId) {
        showLoginScreen();
        return;
    }
    gameState.currentGame = 'mines';
    if (elements.loginScreen) elements.loginScreen.style.display = 'none';
    if (elements.gameSelectScreen) elements.gameSelectScreen.style.display = 'none';
    if (elements.gameScreen) elements.gameScreen.style.display = 'none';
    if (elements.lootboxScreen) elements.lootboxScreen.style.display = 'none';
    if (elements.inventoryScreen) elements.inventoryScreen.style.display = 'none';
    if (elements.lootboxCaseSelectScreen) elements.lootboxCaseSelectScreen.style.display = 'none';
    if (elements.minesGameScreen) elements.minesGameScreen.style.display = 'block';
    setupMinesGameUI();
}

function startLootboxGame() {
    if (!gameState.userId) {
        showLoginScreen();
        return;
    }
    gameState.currentGame = 'lootbox';
    showLootboxCaseSelectScreen();
}

function startInventoryScreen() {
    if (!gameState.userId) {
        showLoginScreen();
        return;
    }
    gameState.currentGame = 'inventory';
    if (elements.loginScreen) elements.loginScreen.style.display = 'none';
    if (elements.gameSelectScreen) elements.gameSelectScreen.style.display = 'none';
    if (elements.gameScreen) elements.gameScreen.style.display = 'none';
    if (elements.minesGameScreen) elements.minesGameScreen.style.display = 'none';
    if (elements.lootboxScreen) elements.lootboxScreen.style.display = 'none';
    if (elements.lootboxCaseSelectScreen) elements.lootboxCaseSelectScreen.style.display = 'none';
    if (elements.inventoryScreen) elements.inventoryScreen.style.display = 'block';
    
    loadInventory();
}

async function setupMinesGameUI() {
    // Reset all game state including magnifier-related properties
    gameState.minesGame = {
        betAmount: 0,
        minesCount: 0,
        multiplier: 1.0,
        revealedCells: 0,
        totalCells: 25,
        minePositions: [],
        currentWin: 0,
        gameActive: false,
        magnifierPosition: null,       // Track magnifier cell
        revealedMines: [],             // Track mines revealed by magnifier
        magnifierUsed: false           // Track if magnifier was used this game
    };
    
    // Reset UI displays
    if (elements.minesCurrentWin) elements.minesCurrentWin.textContent = '0.00';
    if (elements.minesMultiplier) elements.minesMultiplier.textContent = '1.0000x';
    if (elements.minesGrid) elements.minesGrid.innerHTML = '';
    
    // Enable input fields
    if (elements.minesBetInput) {
        elements.minesBetInput.disabled = false;
        elements.minesBetInput.value = '';
        elements.minesBetInput.focus();
    }
    if (elements.minesCountInput) {
        elements.minesCountInput.disabled = false;
        elements.minesCountInput.value = '';
    }
    
    // Set button states
    if (elements.minesStartBtn) {
        elements.minesStartBtn.disabled = false;
        elements.minesStartBtn.textContent = 'START GAME';
    }
    if (elements.minesCashoutBtn) {
        elements.minesCashoutBtn.disabled = true;
        elements.minesCashoutBtn.classList.add('disabled');
        elements.minesCashoutBtn.textContent = 'CASHOUT';
    }
    
    // Load player stats
    try {
        const response = await fetch(`${API_BASE_URL}/api/mines/stats?userId=${gameState.userId}`, {
            credentials: 'include'
        });
        
        if (response.ok) {
            const data = await response.json();
            gameState.minesStats = {
                totalGames: data.totalGames || 0,
                wins: data.wins || 0,
                totalWins: data.totalWins || 0,
                totalGamesPlayed: data.totalGamesPlayed || 0,
                magnifiersFound: data.magnifiersFound || 0  // Track magnifier finds
            };
        }
    } catch (error) {
        console.error('Failed to load mines stats:', error);
        // Initialize empty stats if load fails
        gameState.minesStats = {
            totalGames: 0,
            wins: 0,
            totalWins: 0,
            totalGamesPlayed: 0,
            magnifiersFound: 0
        };
    }
    
    updateMinesStats();
}

function updateMinesStats() {
    if (elements.minesWinsCounter) elements.minesWinsCounter.textContent = gameState.minesStats.wins;
    const winRate = gameState.minesStats.totalGames > 0 
        ? Math.round((gameState.minesStats.wins / gameState.minesStats.totalGames) * 100)
        : 0;
    if (elements.minesWinRate) elements.minesWinRate.textContent = `${winRate}%`;
}

async function startNewMinesGame() {
    if (!gameState.userId) {
        showLoginScreen();
        return;
    }

    const betAmount = parseFloat(elements.minesBetInput?.value);
    const minesCount = parseInt(elements.minesCountInput?.value);
    
    if (isNaN(betAmount) || betAmount <= 0) {
        showNotification("Please enter a valid bet amount", false);
        return;
    }
    
    if (betAmount < CONFIG.mines.minBet || betAmount > CONFIG.mines.maxBet) {
        showNotification(`Bet amount must be between ${CONFIG.mines.minBet} and ${CONFIG.mines.maxBet}`, false);
        return;
    }
    
    if (isNaN(minesCount)) {
        showNotification("Please select number of mines", false);
        return;
    }
    
    if (minesCount < CONFIG.mines.minMines || minesCount > CONFIG.mines.maxMines) {
        showNotification(`Number of mines must be between ${CONFIG.mines.minMines} and ${CONFIG.mines.maxMines}`, false);
        return;
    }
    
    if (betAmount > gameState.chips) {
        showNotification("Not enough chips for this bet", false);
        return;
    }
    
    if (elements.minesBetInput) elements.minesBetInput.disabled = true;
    if (elements.minesCountInput) elements.minesCountInput.disabled = true;
    if (elements.minesStartBtn) elements.minesStartBtn.disabled = true;
    if (elements.minesCashoutBtn) elements.minesCashoutBtn.disabled = false;
    
    gameState.minesStats.totalGames++;
    updateMinesStats();
        
        gameState.minesGame.betAmount = betAmount;
        gameState.minesGame.minesCount = minesCount;
        gameState.minesGame.multiplier = 1.0;
        gameState.minesGame.currentWin = betAmount;
        gameState.minesGame.gameActive = true;
        
        createMinesGrid();
        placeMines(minesCount);

        await fetch(`${API_BASE_URL}/api/mines/start`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                userId: gameState.userId,
                betAmount,
                minesCount
            }),
            credentials: 'include'
        });
}

function createMinesGrid() {
    if (!elements.minesGrid) return;
    
    const gridSize = CONFIG.mines.getGridSize(gameState.minesGame.minesCount);
    gameState.minesGame.totalCells = gridSize * gridSize;
    
    elements.minesGrid.innerHTML = '';
    elements.minesGrid.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
    
    for (let i = 0; i < gameState.minesGame.totalCells; i++) {
        const cell = document.createElement('div');
        cell.className = 'mines-cell';
        cell.dataset.index = i;
        cell.addEventListener('click', () => revealMineCell(i));
        elements.minesGrid.appendChild(cell);
    }
}

function placeMines(minesCount) {
    const gridSize = CONFIG.mines.getGridSize(minesCount);
    const totalCells = gridSize * gridSize;
    gameState.minesGame.minePositions = [];
    gameState.minesGame.magnifierPosition = null;
    gameState.minesGame.revealedMines = [];
    
    // Create danger zones (both center and edges)
    const dangerZones = [];
    const center = Math.floor(gridSize / 2);
    
    // 1. Center cluster (3x3 area)
    for (let r = center - 1; r <= center + 1; r++) {
        for (let c = center - 1; c <= center + 1; c++) {
            if (r >= 0 && r < gridSize && c >= 0 && c < gridSize) {
                dangerZones.push(r * gridSize + c);
            }
        }
    }
    
    // 2. Edge rings (outer 2 layers)
    for (let i = 0; i < gridSize; i++) {
        // Top and bottom rows
        for (let offset = 0; offset < 2; offset++) {
            dangerZones.push(offset * gridSize + i); // Top
            dangerZones.push((gridSize - 1 - offset) * gridSize + i); // Bottom
        }
        
        // Left and right columns (skip corners we already added)
        if (i > 0 && i < gridSize - 1) {
            for (let offset = 0; offset < 2; offset++) {
                dangerZones.push(i * gridSize + offset); // Left
                dangerZones.push(i * gridSize + (gridSize - 1 - offset)); // Right
            }
        }
    }
    
    // 3. Create probability map with danger zones weighted higher
    const probabilityMap = [];
    const dangerWeight = 3.5; // How much more likely danger zones are
    const safeWeight = 0.3;  // How much less likely safe areas are
    
    for (let i = 0; i < totalCells; i++) {
        const isDangerZone = dangerZones.includes(i);
        probabilityMap.push({
            index: i,
            weight: isDangerZone ? dangerWeight : safeWeight
        });
    }
    
    // 4. Select mines using weighted probabilities
    const selectedIndices = [];
    let minesToPlace = minesCount;
    
    while (minesToPlace > 0 && probabilityMap.length > 0) {
        // Calculate total weight
        const totalWeight = probabilityMap.reduce((sum, cell) => sum + cell.weight, 0);
        
        // Select random position weighted by probability
        let random = Math.random() * totalWeight;
        let weightSum = 0;
        let selectedIndex = -1;
        
        for (let i = 0; i < probabilityMap.length; i++) {
            weightSum += probabilityMap[i].weight;
            if (random <= weightSum) {
                selectedIndex = i;
                break;
            }
        }
        
        if (selectedIndex >= 0) {
            // Add the selected cell to mines
            selectedIndices.push(probabilityMap[selectedIndex].index);
            
            // Remove selected cell from probability map
            probabilityMap.splice(selectedIndex, 1);
            
            // Reduce weight of adjacent cells to create some safe clusters
            const index = selectedIndices[selectedIndices.length - 1];
            const row = Math.floor(index / gridSize);
            const col = index % gridSize;
            
            for (let r = Math.max(0, row - 1); r <= Math.min(gridSize - 1, row + 1); r++) {
                for (let c = Math.max(0, col - 1); c <= Math.min(gridSize - 1, col + 1); c++) {
                    const adjIndex = r * gridSize + c;
                    const adjCell = probabilityMap.find(cell => cell.index === adjIndex);
                    if (adjCell) {
                        adjCell.weight = Math.max(0.1, adjCell.weight * 0.7);
                    }
                }
            }
            
            minesToPlace--;
        }
    }
    
    gameState.minesGame.minePositions = selectedIndices;
    
    // Place magnifier in 10-mine games (15% chance)
    if (minesCount === 10 && Math.random() < CONFIG.mines.magnifier.chance) {
        placeMagnifier(gridSize, selectedIndices);
    }
    
    // Debug visualization
    if (CONFIG.debug) {
        visualizeMines(gridSize, selectedIndices, gameState.minesGame.magnifierPosition);
    }
}

function placeMagnifier(gridSize, minePositions) {
    const safeCells = [];
    const totalCells = gridSize * gridSize;
    
    // Find all cells that don't contain mines and aren't in danger zones
    for (let i = 0; i < totalCells; i++) {
        if (!minePositions.includes(i)) {
            safeCells.push(i);
        }
    }
    
    // Randomly select a safe cell for magnifier
    if (safeCells.length > 0) {
        const randomIndex = Math.floor(Math.random() * safeCells.length);
        gameState.minesGame.magnifierPosition = safeCells[randomIndex];
    }
}

function revealMineCell(index) {
    // Check if game is active and elements exist
    if (!gameState.minesGame.gameActive || !elements.minesGrid) return;
    
    const cell = elements.minesGrid.children[index];
    if (!cell || cell.classList.contains('revealed')) return;
    
    // Check if this is the magnifier cell
    if (index === gameState.minesGame.magnifierPosition) {
        revealMagnifier(index);
        return;
    }
    
    // Check if cell contains a mine
    if (gameState.minesGame.minePositions.includes(index)) {
        cell.innerHTML = '<img src="assets/mine.png" alt="Mine">';
        cell.classList.add('mine');
        endMinesGame(false);
        return;
    }
    
    // Reveal safe cell
    cell.classList.add('revealed');
    cell.innerHTML = '<div class="safe-cell"></div>';
    gameState.minesGame.revealedCells++;
    
    // Update multiplier and current win (showing only profit)
    gameState.minesGame.multiplier = CONFIG.mines.getMultiplier(
        gameState.minesGame.minesCount,
        gameState.minesGame.revealedCells
    );
    
    gameState.minesGame.currentWin = parseFloat(
        (gameState.minesGame.betAmount * (gameState.minesGame.multiplier - 1)).toFixed(4)
    );
    
    // Update UI displays
    if (elements.minesCurrentWin) {
        elements.minesCurrentWin.textContent = gameState.minesGame.currentWin.toFixed(4);
    }
    if (elements.minesMultiplier) {
        elements.minesMultiplier.textContent = `${(gameState.minesGame.multiplier - 1).toFixed(4)}x`;
    }
    
    // Enable cashout button after 2+ revealed cells
    if (gameState.minesGame.revealedCells >= 2 && elements.minesCashoutBtn) {
        elements.minesCashoutBtn.disabled = false;
        elements.minesCashoutBtn.classList.remove('disabled');
    } else {
        elements.minesCashoutBtn.disabled = true;
        elements.minesCashoutBtn.classList.add('disabled');
    }
    
    // Show growth percentage temporarily
    const growthPercentage = (CONFIG.mines.growthFactors[gameState.minesGame.minesCount] * 100).toFixed(0);
    cell.querySelector('.safe-cell').textContent = `+${growthPercentage}%`;
    setTimeout(() => {
        if (cell.querySelector('.safe-cell')) {
            cell.querySelector('.safe-cell').textContent = '';
        }
    }, 1000);
    
    // Check for win condition (all safe cells revealed)
    const safeCells = gameState.minesGame.totalCells - gameState.minesGame.minesCount;
    if (gameState.minesGame.revealedCells === safeCells) {
        endMinesGame(true);
    }
}

function revealMagnifier(index) {
    const cell = elements.minesGrid.children[index];
    cell.classList.add('revealed');
    cell.innerHTML = `<img src="${CONFIG.mines.magnifier.img}" alt="Magnifier" class="magnifier-icon">`;
    
    // Find all hidden mines (not already revealed)
    const hiddenMines = gameState.minesGame.minePositions.filter(
        pos => !gameState.minesGame.revealedMines.includes(pos)
    );
    
    if (hiddenMines.length > 0) {
        // Select a random hidden mine to reveal
        const mineToReveal = hiddenMines[Math.floor(Math.random() * hiddenMines.length)];
        gameState.minesGame.revealedMines.push(mineToReveal);
        
        // Highlight the revealed mine (without ending game)
        const mineCell = elements.minesGrid.children[mineToReveal];
        mineCell.classList.add('mine-hint');
        mineCell.innerHTML = '<img src="assets/mine.png" alt="Mine" class="hinted-mine">';
        
        // Play reveal sound if available
        if (window.mineRevealSound) {
            window.mineRevealSound.currentTime = 0;
            window.mineRevealSound.play().catch(e => console.log("Sound play failed:", e));
        }
        
        showNotification("Magnifier revealed a mine location!", true);
    } else {
        showNotification("Magnifier found but all mines are already visible", false);
    }
}

function cashoutMinesGame() {
    if (gameState.minesGame.revealedCells < 2) {
        showNotification("You need to reveal at least 2 cells to cashout", false);
        return;
    }
    
    if (!gameState.minesGame.gameActive || gameState.minesGame.revealedCells === 0) {
        showNotification("You need to reveal at least one cell to cashout", false);
        return;
    }
    
    // Calculate and show the net profit before ending the game
    const netProfit = gameState.minesGame.currentWin - gameState.minesGame.betAmount;
    showNotification(`Cashing out with ${netProfit.toFixed(4)} profit!`, true);
    
    endMinesGame(true);
}

async function endMinesGame(isWin) {
    gameState.minesGame.gameActive = false;
    if (elements.minesCashoutBtn) elements.minesCashoutBtn.disabled = true;
    
    if (elements.minesGrid) {
        gameState.minesGame.minePositions.forEach(pos => {
            const cell = elements.minesGrid.children[pos];
            if (cell && !cell.classList.contains('revealed')) {
                cell.innerHTML = '<img src="assets/mine.png" alt="Mine">';
                cell.classList.add('mine');
            }
        });
    }
    
    if (isWin) {
        gameState.minesStats.wins++;
        gameState.minesStats.totalWins += gameState.minesGame.currentWin;
        
        try {
            // Now currentWin is already just the profit
            const response = await fetch(`${API_BASE_URL}/api/win`, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    userId: gameState.userId,
                    amount: gameState.minesGame.currentWin
                }),
                credentials: 'include'
            });
            
            const data = await response.json();
            gameState.chips = data.newBalance;
            updateCurrencyDisplay();
            
            if (elements.minesGameOverMessage) elements.minesGameOverMessage.textContent = "You Won!";
            if (elements.minesGameOverAmount) {
                elements.minesGameOverAmount.textContent = `+${gameState.minesGame.currentWin.toFixed(4)}`;
            }
            if (elements.minesGameOverPopup) elements.minesGameOverPopup.style.display = 'flex';
        } catch (error) {
            console.error('Win claim error:', error);
            showNotification('Failed to claim win', false);
        }
    } else {
        // When losing, only take 99% of the bet
        const lossAmount = gameState.minesGame.betAmount * 0.99;
        const returnedAmount = gameState.minesGame.betAmount * 0.01;
        
        try {
            const response = await fetch(`${API_BASE_URL}/api/spin`, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    userId: gameState.userId,
                    cost: lossAmount
                }),
                credentials: 'include'
            });

            const data = await response.json();
            gameState.chips = data.newBalance;
            updateCurrencyDisplay();
            
            gameState.minesStats.totalGamesPlayed++;
            
            if (elements.minesGameOverMessage) elements.minesGameOverMessage.textContent = "Game Over!";
            if (elements.minesGameOverAmount) {
                elements.minesGameOverAmount.textContent = `-${lossAmount.toFixed(4)} (returned ${returnedAmount.toFixed(4)})`;
            }
            if (elements.minesGameOverPopup) elements.minesGameOverPopup.style.display = 'flex';
        } catch (error) {
            console.error('Loss deduction error:', error);
            showNotification('Failed to process loss', false);
        }
    }
}

function closeMinesGameOverPopup() {
    if (elements.minesGameOverPopup) elements.minesGameOverPopup.style.display = 'none';
    setupMinesGameUI();
}

// Authentication Functions
async function loginWithToken(token) {
    try {
        if (elements.loginBtn) elements.loginBtn.disabled = true;
        const response = await fetch(`${API_BASE_URL}/auth/token`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ token }),
            credentials: 'include'
        });

        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
            const text = await response.text();
            throw new Error(`Invalid response: ${text.substring(0, 100)}`);
        }

        const data = await response.json();
        
        if (response.ok) {
            handleSuccessfulLogin(data);
            showNotification('Login successful!', true);
            return true;
        } else {
            throw new Error(data.error || 'Login failed');
        }
    } catch (error) {
        console.error('Login error:', error);
        showNotification(`Login failed: ${error.message}`, false);
        return false;
    } finally {
        if (elements.loginBtn) elements.loginBtn.disabled = false;
    }
}

async function logout() {
    try {
        const response = await fetch(`${API_BASE_URL}/auth/logout`, {
            method: 'POST',
            credentials: 'include'
        });

        if (response.ok) {
            showLoginScreen();
            showNotification('Logged out successfully', true);
        } else {
            throw new Error('Logout failed');
        }
    } catch (error) {
        console.error('Logout error:', error);
        showNotification('Failed to logout. Please try again.', false);
    }
}

function handleSuccessfulLogin(user) {
    gameState.userId = user.id;
    gameState.chips = user.chips;
    gameState.dice = user.dice;
    gameState.inventory = user.inventory || [];
    gameState.instantSpins = user.instantSpins || {
        remaining: 25,
        lastRefill: new Date()
    };
    gameState.instantSpinLimit = 25;
    gameState.instantSpinsUsed = 0;
    
    // Rest of your existing code...
    updateInstantSpinDisplay(false);

    const avatarSrc = user.avatar || 'assets/default-avatar.png';
    
    if (elements.usernameDisplay) elements.usernameDisplay.textContent = user.username;
    if (elements.userAvatar) elements.userAvatar.src = user.avatar || 'assets/default-avatar.png';
    if (elements.minesUsername) elements.minesUsername.textContent = user.username;
    if (elements.minesAvatar) elements.minesAvatar.src = user.avatar || 'assets/default-avatar.png';
    if (elements.lootboxUsername) elements.lootboxUsername.textContent = user.username;
    if (elements.lootboxAvatar) elements.lootboxAvatar.src = user.avatar || 'assets/default-avatar.png';
    if (elements.inventoryUsername) elements.inventoryUsername.textContent = user.username;
    if (elements.inventoryAvatar) elements.inventoryAvatar.src = user.avatar || 'assets/default-avatar.png';
    if (elements.lootboxSelectUsername) elements.lootboxSelectUsername.textContent = user.username;
    if (elements.lootboxSelectAvatar) elements.lootboxSelectAvatar.src = avatarSrc;

    setAutoSellEnabled(gameState.autoSellEnabled);
    
    if (elements.loginScreen) elements.loginScreen.style.display = 'none';
    showGameSelectScreen();
    updateCurrencyDisplay();
    
    elements.reels.forEach((reel, index) => {
        if (!reel) return;
        const symbol = getRandomSymbol();
        gameState.currentSymbols[index] = symbol.name;
        resetReel(reel, symbol);
    });
    
    if (gameState.currentGame === 'mines') {
        setupMinesGameUI();
    } else if (gameState.currentGame === 'lootbox') {
        startLootboxGame();
    } else if (gameState.currentGame === 'inventory') {
        startInventoryScreen();
    }
}

function showLoginScreen() {
    if (elements.loginScreen) elements.loginScreen.style.display = 'block';
    if (elements.gameScreen) elements.gameScreen.style.display = 'none';
    if (elements.gameSelectScreen) elements.gameSelectScreen.style.display = 'none';
    if (elements.minesGameScreen) elements.minesGameScreen.style.display = 'none';
    if (elements.lootboxScreen) elements.lootboxScreen.style.display = 'none';
    if (elements.inventoryScreen) elements.inventoryScreen.style.display = 'none';
    if (elements.lootboxCaseSelectScreen) elements.lootboxCaseSelectScreen.style.display = 'none';
    gameState.userId = null;
    if (elements.tokenInput) elements.tokenInput.value = '';
}

async function checkAuthStatus() {
    try {
        const response = await fetch(`${API_BASE_URL}/auth/user`, {
            credentials: 'include'
        });
        
        if (response.ok) {
            const user = await response.json();
            handleSuccessfulLogin(user);
            return true;
        } else {
            showLoginScreen();
            return false;
        }
    } catch (error) {
        console.error('Auth check error:', error);
        showLoginScreen();
        return false;
    }
}

// Add CSS animation for landing bounce
const style = document.createElement('style');
style.textContent = `
    @keyframes landingBounce {
        0% { transform: translateY(0%) scale(1); }
        50% { transform: translateY(-20%) scale(1.1); }
        100% { transform: translateY(0%) scale(1); }
    }
`;
document.head.appendChild(style);

// Event Listeners
if (elements.loginBtn) {
    elements.loginBtn.addEventListener('click', async () => {
        const token = elements.tokenInput?.value.trim();
        if (token) {
            await loginWithToken(token);
        } else {
            showNotification('Please enter your token', false);
        }
    });
}

if (elements.logoutBtn) elements.logoutBtn.addEventListener('click', logout);
if (elements.minesLogoutBtn) elements.minesLogoutBtn.addEventListener('click', logout);
if (elements.lootboxLogoutBtn) elements.lootboxLogoutBtn.addEventListener('click', logout);
if (elements.inventoryLogoutBtn) elements.inventoryLogoutBtn.addEventListener('click', logout);
if (elements.spinBtn) elements.spinBtn.addEventListener('click', startSpin);
if (elements.claimBtn) elements.claimBtn.addEventListener('click', claimWin);
if (elements.lootboxClaimBtn) elements.lootboxClaimBtn.addEventListener('click', claimLootboxWin);


if (elements.slotMachineBtn) elements.slotMachineBtn.addEventListener('click', startSlotMachineGame);
if (elements.minesGameBtn) elements.minesGameBtn.addEventListener('click', startMinesGame);
if (elements.lootboxBtn) elements.lootboxBtn.addEventListener('click', startLootboxGame);
if (document.getElementById('lootbox-instant-spin-btn')) {
    document.getElementById('lootbox-instant-spin-btn').addEventListener('click', instantLootboxSpin);
}

if (elements.cupGameBtn) elements.cupGameBtn.addEventListener('click', startCupGame);
if (elements.cupGameBackToMenuBtn) elements.cupGameBackToMenuBtn.addEventListener('click', showGameSelectScreen);
if (elements.cupGameLogoutBtn) elements.cupGameLogoutBtn.addEventListener('click', logout);
if (elements.cupGameStartBtn) elements.cupGameStartBtn.addEventListener('click', startNewCupGame);
if (elements.cupGameGameOverClose) elements.cupGameGameOverClose.addEventListener('click', closeCupGameOverPopup);
if (elements.cupGameBackToMenuBtn) {
    elements.cupGameBackToMenuBtn.addEventListener('click', () => {
        hideAllScreens();
        if (elements.gameSelectScreen) elements.gameSelectScreen.style.display = 'block';
    });
}

if (elements.inventoryBtn) elements.inventoryBtn.addEventListener('click', startInventoryScreen);
if (elements.minesStartBtn) elements.minesStartBtn.addEventListener('click', startNewMinesGame);
if (elements.minesCashoutBtn) elements.minesCashoutBtn.addEventListener('click', cashoutMinesGame);
if (elements.lootboxSpinBtn) elements.lootboxSpinBtn.addEventListener('click', startLootboxSpin);
if (document.getElementById('mines-game-over-close')) {
    document.getElementById('mines-game-over-close').addEventListener('click', closeMinesGameOverPopup);
}
if (elements.backToMenuBtn) elements.backToMenuBtn.addEventListener('click', () => {
    hideLootboxCaseSelectScreen();
    showGameSelectScreen();
});
if (elements.minesBackToMenuBtn) elements.minesBackToMenuBtn.addEventListener('click', showGameSelectScreen);
if (elements.lootboxBackToMenuBtn) elements.lootboxBackToMenuBtn.addEventListener('click', showGameSelectScreen);
if (elements.inventoryBackToMenuBtn) elements.inventoryBackToMenuBtn.addEventListener('click', showGameSelectScreen);
if (elements.lootboxCaseSelectBackBtn) elements.lootboxCaseSelectBackBtn.addEventListener('click', () => {
    hideLootboxCaseSelectScreen();
    showGameSelectScreen();
});
if (elements.lootboxChangeCaseBtn) elements.lootboxChangeCaseBtn.addEventListener('click', showLootboxCaseSelectScreen);

document.getElementById('confirm-refill-btn')?.addEventListener('click', refillInstantSpins);
document.getElementById('cancel-refill-btn')?.addEventListener('click', () => {
    document.getElementById('refill-popup').style.display = 'none';
});





// Inventory event listeners
if (elements.inventorySellInput) {
    elements.inventorySellInput.addEventListener('input', updateSellTotal);
}

if (elements.inventorySellBtn) {
    elements.inventorySellBtn.addEventListener('click', sellInventoryItem);
}

if (elements.inventorySellClose) {
    elements.inventorySellClose.addEventListener('click', closeSellPanel);
}





// Initialize Game
async function initGame() {
    try {
        const authCheck = await checkAuthStatus();
        if (authCheck && !gameState.authChecked) {
            gameState.authChecked = true;
            
            // Check if it's a new day for spin reset
            const today = new Date().toDateString();
            if (!gameState.lastRefillTime || gameState.lastRefillTime.toDateString() !== today) {
                gameState.instantSpinsUsed = 0;
                gameState.lastRefillTime = new Date();
            }
            
            updateInstantSpinDisplay();
        }

        setAutoSellEnabled(gameState.autoSellEnabled);
        
        // Initialize but don't start timer yet
        TimerManager.stop();
        
        // Clean up on page unload
        window.addEventListener('beforeunload', () => {
            TimerManager.stop();
        });
        
    } catch (error) {
        console.error('Initialization error:', error);
    }
}

document.addEventListener('DOMContentLoaded', initGame);





