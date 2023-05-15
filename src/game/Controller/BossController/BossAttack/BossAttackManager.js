import DestinedDeath from "./patterns/DestinedDeath/DestinedDeath.js";
import BloodMoon from "./patterns/BloodMoon/BloodMoon.js";
import CrimsonRain from "./patterns/CrimsonRain/CrimsonRain.js";
import FestivalOfBlood from "./patterns/FestivalOfBlood/FestivalOfBlood.js";
import NoAttack from "./patterns/NoAttack.js";

class BossAttackManager {
    constructor(boss, player) {
        this.boss = boss;
        this.theme = boss.theme;
        this.player = player;

        this.attackPatterns = [
            [[FestivalOfBlood.construct], 36.5],
            [[BloodMoon.construct, CrimsonRain.construct], 51.7],
            [[FestivalOfBlood.customConstruct(300, 100, 4, 5)], 67.5],
            [[
                BloodMoon.construct, NoAttack.constructWithTimeout(415), BloodMoon.construct, NoAttack.constructWithTimeout(415),
                BloodMoon.construct, NoAttack.constructWithTimeout(415), BloodMoon.construct, NoAttack.constructWithTimeout(415), 
                BloodMoon.construct, NoAttack.constructWithTimeout(415), BloodMoon.construct, NoAttack.constructWithTimeout(415), 
                BloodMoon.construct,  NoAttack.constructWithTimeout(415), BloodMoon.construct, NoAttack.constructWithTimeout(415),
                BloodMoon.construct, NoAttack.constructWithTimeout(415), BloodMoon.construct, NoAttack.constructWithTimeout(415), 
                BloodMoon.construct, NoAttack.constructWithTimeout(415), BloodMoon.construct, NoAttack.constructWithTimeout(415),
                BloodMoon.construct, NoAttack.constructWithTimeout(415), BloodMoon.construct, NoAttack.constructWithTimeout(415),
                BloodMoon.construct, NoAttack.constructWithTimeout(415), BloodMoon.construct, NoAttack.constructWithTimeout(415), 
                BloodMoon.construct, NoAttack.constructWithTimeout(415), BloodMoon.construct, NoAttack.constructWithTimeout(415), 
                BloodMoon.construct,  NoAttack.constructWithTimeout(415), BloodMoon.construct, NoAttack.constructWithTimeout(415),
                BloodMoon.construct, NoAttack.constructWithTimeout(415), BloodMoon.construct, NoAttack.constructWithTimeout(415), 
                BloodMoon.construct, NoAttack.constructWithTimeout(415), BloodMoon.construct, NoAttack.constructWithTimeout(415),
                BloodMoon.construct, NoAttack.constructWithTimeout(415), BloodMoon.construct, NoAttack.constructWithTimeout(415),
                BloodMoon.construct, NoAttack.constructWithTimeout(415), BloodMoon.construct, NoAttack.constructWithTimeout(415), 
                BloodMoon.construct, NoAttack.constructWithTimeout(415), BloodMoon.construct, NoAttack.constructWithTimeout(415), 
                BloodMoon.construct,  NoAttack.constructWithTimeout(415), BloodMoon.construct, NoAttack.constructWithTimeout(415),
                BloodMoon.construct,
            ], 97.6],
            [[FestivalOfBlood.customConstruct(500, 300, 8, 100)], 109.7],
            [[BloodMoon.construct, FestivalOfBlood.customConstruct(50, 49, 1.2, 100)], 140.6],
            [[
                BloodMoon.construct, NoAttack.constructWithTimeout(415), BloodMoon.construct, NoAttack.constructWithTimeout(415),
                BloodMoon.construct, NoAttack.constructWithTimeout(415), BloodMoon.construct, NoAttack.constructWithTimeout(415), 
                BloodMoon.construct, NoAttack.constructWithTimeout(415), BloodMoon.construct, NoAttack.constructWithTimeout(415), 
                BloodMoon.construct,  NoAttack.constructWithTimeout(415), BloodMoon.construct, NoAttack.constructWithTimeout(415),
                BloodMoon.construct, NoAttack.constructWithTimeout(415), BloodMoon.construct, NoAttack.constructWithTimeout(415), 
                BloodMoon.construct, NoAttack.constructWithTimeout(415), BloodMoon.construct, NoAttack.constructWithTimeout(415),
                BloodMoon.construct, NoAttack.constructWithTimeout(415), BloodMoon.construct, NoAttack.constructWithTimeout(415),
                BloodMoon.construct, NoAttack.constructWithTimeout(415), BloodMoon.construct, NoAttack.constructWithTimeout(415), 
                BloodMoon.construct, NoAttack.constructWithTimeout(415), BloodMoon.construct, NoAttack.constructWithTimeout(415), 
                BloodMoon.construct,  NoAttack.constructWithTimeout(415), BloodMoon.construct, NoAttack.constructWithTimeout(415),
                BloodMoon.construct, NoAttack.constructWithTimeout(415), BloodMoon.construct, NoAttack.constructWithTimeout(415), 
                BloodMoon.construct, NoAttack.constructWithTimeout(415), BloodMoon.construct, NoAttack.constructWithTimeout(415),
                BloodMoon.construct, NoAttack.constructWithTimeout(415), BloodMoon.construct, NoAttack.constructWithTimeout(415),
                BloodMoon.construct, NoAttack.constructWithTimeout(415), BloodMoon.construct, NoAttack.constructWithTimeout(415), 
                BloodMoon.construct, NoAttack.constructWithTimeout(415), BloodMoon.construct, NoAttack.constructWithTimeout(415), 
                BloodMoon.construct,  NoAttack.construct,
            ], 183.5],
            [[DestinedDeath.construct], 10000]
        ]
        this.patternCounter = 0;
        this.attackCounter = 0;
        this.currentAttack = null;

    }

    update() {
        let currentPattern = this.attackPatterns[this.patternCounter];
        if(this.theme.currentTime > currentPattern[1]) {
            currentPattern = this.attackPatterns[++this.patternCounter];
            this.attackCounter = 0;
            this.currentAttack.stop();
            this.currentAttack = null;
        }

        if(this.currentAttack == null || this.currentAttack.isDone) {
            let temp = currentPattern[0][this.attackCounter++];

            if(temp === undefined) {
                this.currentAttack = NoAttack.construct();
            } else {
                this.currentAttack = temp(this.boss)
            }
            // this.currentAttack = temp(this.boss);
        }

        this.currentAttack.mainLoop();
    }
}

export default BossAttackManager;