/* In this module, create three classes: Play, Act, and Scene. */

export class Scene {
    constructure(name,title,stageDirection,speeches) {
        this.name = name;
        this.title = title;
        this.stageDirection = stageDirection;
        this.speeches = speeches;
    }
}

export class Play {
    constructor(name,scenes) {
        this.name = name;
        this.scenes =scenes;
    }
}

export class Play {
    constructor(title,short,persona,acts) {
        this.title =title;
        this.short = short;
        this.persona = persona;
        this.scts = acts;
    }
}