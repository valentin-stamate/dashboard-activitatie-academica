import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";

/** Activitatea științifică a conducatorului de doctorat */
@Entity()
export class CoordinatorScientificActivityModel {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({nullable: false})
    fullName!: string;
    @Column({nullable: false})
    publicationNumberWebOfScience!: string;
    @Column({nullable: false})
    committees!: string;
    @Column({nullable: false})
    conferences!: string;
    @Column({nullable: false})
    reportYear!: number;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    createdAt!: Date;
    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    updatedAt!: Date;

    static fromObject(object: any): CoordinatorScientificActivityModel {
        const model = new CoordinatorScientificActivityModel();

        model.fullName = object.fullName ?? '';
        model.publicationNumberWebOfScience = object.publicationNumberWebOfScience ?? '';
        model.committees = object.committees ?? '';
        model.conferences = object.conferences ?? '';
        model.reportYear = object.reportYear ?? '';

        return model;
    }

    update(object: any) {
        this.fullName = object.fullName ?? this.fullName;
        this.publicationNumberWebOfScience = object.publicationNumberWebOfScience ?? this.publicationNumberWebOfScience;
        this.committees = object.committees ?? this.committees;
        this.conferences = object.conferences ?? this.conferences;
        this.reportYear = object.reportYear ?? this.reportYear;
    }
}

/** Activitatea referențială a conducătorului de doctorat/abilitat de la IOSU-UAIC */
@Entity()
export class CoordinatorReferentialActivityModel {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({nullable: false})
    fullName!: string;
    @Column({nullable: false})
    thesisDomain!: string;
    @Column({nullable: false})
    thesisReference!: string;
    @Column({nullable: false})
    IOSUD!: string;
    @Column({nullable: false})
    reportYear!: number;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    createdAt!: Date;
    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    updatedAt!: Date;

    static fromObject(object: any): CoordinatorReferentialActivityModel {
        const model = new CoordinatorReferentialActivityModel();

        model.fullName = object.fullName ?? '';
        model.thesisDomain = object.thesisDomain ?? '';
        model.thesisReference = object.thesisReference ?? '';
        model.IOSUD = object.IOSUD ?? '';
        model.reportYear = object.reportYear ?? '';

        return model;
    }

    update(object: any) {
        this.fullName = object.fullName ?? this.fullName;
        this.thesisDomain = object.thesisDomain ?? this.thesisDomain;
        this.thesisReference = object.thesisReference ?? this.thesisReference;
        this.IOSUD = object.IOSUD ?? this.IOSUD;
        this.reportYear = object.reportYear ?? this.reportYear;
    }
}