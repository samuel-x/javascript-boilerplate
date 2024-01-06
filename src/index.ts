type UnitAttributes = {
    hpCount: number; // total hp that can only go down
    baseMana: number; // total mana
    unitName: string; // the unit's name
    abilityName: string; // just the ability name
    abilityDmg: number; // ability dmg value
    manaCount: number; // every unit starts with 0 mana
    attackMana: number; // every unit gains mana for aa
    attackDmg: number; // every unit deals physical damage
}

class Unit {
    public hpCount: number; // total hp that can only go down
    public baseMana: number; // total mana
    public unitName: string = ""; // the unit's name
    public abilityName: string = ""; // just the ability name
    public abilityDmg: number; // ability dmg value
    public manaCount: number = 0; // every unit starts with 0 mana
    public attackMana: number; // every unit gains mana for aa
    public attackDmg: number; // every unit deals physical damage

//  public constructor (newHp: number, newMana: number, newUnitName: string, newAbilityName: string, newAbilityDmg:number, newAttackMana: number, newAttackDmg: number) {
//         this.hpCount = newHp;
//         this.baseMana = newMana;
//         this.unitName = newUnitName;
//         this.abilityName = newAbilityName;
//         this.abilityDmg = newAbilityDmg;
//         this.attackMana = newAttackMana;
//         this.attackDmg = newAttackDmg;
//     } 

    public constructor (unitAttributes: UnitAttributes) {
        this.hpCount = unitAttributes.hpCount;
        this.baseMana = unitAttributes.baseMana;
        this.unitName = unitAttributes.unitName;
        this.abilityName = unitAttributes.abilityName;
        this.abilityDmg = unitAttributes.abilityDmg;
        this.attackMana = unitAttributes.attackMana;
        this.attackDmg = unitAttributes.attackDmg;
        this.manaCount = 0;
    }

    public damageCount(damage: number) { // hp go down when hit
        this.hpCount -= damage;
        console.log(`${this.unitName} ${this.hpCount} has took ${damage} damage`); 
        if (this.hpCount <= 0) {
            console.log(`${this.unitName} has ${this.hpCount} hp and is deadge!`); 
        }
    }

    public manaGain(mGain: number) { // mana go up when aa
        this.manaCount += mGain;
    }

    public attackUnits(other: Unit) { 
        this.manaGain(this.attackMana);
        if (this.manaCount >= this.baseMana) {
            this.manaCount = 0;
            console.log(`${this.unitName} casts ${this.abilityName}!`);
            other.damageCount(this.abilityDmg); // when ability is cast, damage dealt to other unit?
        }
        other.damageCount(this.attackDmg); // only concerned about other unit taking damage
    }
}

const zedAttributes: UnitAttributes = {
    hpCount: 100,
    baseMana: 60,
    unitName: "Zed",
    abilityName: "Stabby Thing",
    abilityDmg: 10,
    manaCount: 10,
    attackMana: 20,
    attackDmg: 5
} 


const nami = new Unit({
    hpCount: 100,
    baseMana: 60,
    unitName: "Nami",
    abilityName: "Wave",
    abilityDmg: 10,
    manaCount: 10,
    attackMana: 20,
    attackDmg: 5
});

const zed = new Unit(zedAttributes);

while(nami.hpCount > 0 && zed.hpCount > 0) {
    nami.attackUnits(zed);
    zed.attackUnits(nami);
    console.log('----------');
}
