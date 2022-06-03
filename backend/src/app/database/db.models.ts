import {Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import {
    AcademyMemberModel,
    AwardAndNominationModel,
    CitationModel, DidacticActivityModel, EditorialMemberModel,
    ISIProceedingModel, OrganizedEventModel,
    PatentModel,
    ResearchContractModel,
    ScientificArticleBDIModel,
    ScientificArticleISIModel,
    ScientificBookModel,
    ScientificCommunicationModel,
    TranslationModel, WithoutActivityModel
} from "./forms/db.student.form.models";
import {CoordinatorReferentialActivityModel, CoordinatorScientificActivityModel} from "./forms/db.coordinator.forms";
import sha256 from "crypto-js/sha256";
import {CryptoUtil} from "../services/crypto.util";

@Entity()
export class AllowedStudentModel {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({nullable: false})
    fullName!: string;
    @Column({nullable: false, unique: true})
    identifier!: string;
    @Column({nullable: false})
    attendanceYear!: number;
    @Column({nullable: false})
    coordinatorName!: string;
    @Column({nullable: false})
    coordinatorFunction!: string;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    createdAt!: Date;
    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    updatedAt!: Date;

    static fromObject(object: any): AllowedStudentModel {
        const model = new AllowedStudentModel();

        model.fullName = object.fullName || '';
        model.identifier = object.identifier || '';
        model.attendanceYear = object.attendanceYear || '';
        model.coordinatorName = object.coordinatorName || '';
        model.coordinatorFunction = object.coordinatorFunction || '';

        return model;
    }
}

@Entity()
export class StudentModel {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({nullable: false, unique: true})
    identifier!: string;
    @Column({nullable: false})
    fullName!: string;
    @Column({nullable: false, unique: true})
    email!: string;
    @Column({nullable: false, unique: true})
    alternativeEmail!: string;
    @Column({nullable: false})
    attendanceYear!: number;
    @Column({nullable: false})
    coordinatorName!: string;
    @Column({nullable: false})
    coordinatorFunction!: string;
    @Column({nullable: false})
    isActive!: boolean;

    @OneToMany(() => ScientificArticleISIModel, relation => relation.student)
    scientificArticleISI?: ScientificArticleISIModel[];
    @OneToMany(() => ISIProceedingModel, relation => relation.student)
    isiProceeding?: ISIProceedingModel[];
    @OneToMany(() => ScientificArticleBDIModel, relation => relation.student)
    scientificArticleBDI?: ScientificArticleBDIModel[];
    @OneToMany(() => ScientificBookModel, relation => relation.student)
    scientificBook?: ScientificBookModel[];
    @OneToMany(() => TranslationModel, relation => relation.student)
    translation?: TranslationModel[];
    @OneToMany(() => ScientificCommunicationModel, relation => relation.student)
    scientificCommunication?: ScientificCommunicationModel[];
    @OneToMany(() => PatentModel, relation => relation.student)
    patent?: PatentModel[];
    @OneToMany(() => ResearchContractModel, relation => relation.student)
    researchContract?: ResearchContractModel[];
    @OneToMany(() => CitationModel, relation => relation.student)
    citation?: CitationModel[];
    @OneToMany(() => AwardAndNominationModel, relation => relation.student)
    awardAndNomination?: AwardAndNominationModel[];
    @OneToMany(() => AcademyMemberModel, relation => relation.student)
    academyMember?: AcademyMemberModel[];
    @OneToMany(() => EditorialMemberModel, relation => relation.student)
    editorialMember?: EditorialMemberModel[];
    @OneToMany(() => OrganizedEventModel, relation => relation.student)
    organizedEvent?: OrganizedEventModel[];
    @OneToMany(() => WithoutActivityModel, relation => relation.student)
    withoutActivity?: WithoutActivityModel[];
    @OneToMany(() => DidacticActivityModel, relation => relation.student)
    didacticActivity?: DidacticActivityModel[];

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    createdAt!: Date;
    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    updatedAt!: Date;

    static fromObject(object: any): StudentModel {
        const model = new StudentModel();

        model.identifier = object.identifier || '';
        model.fullName = object.fullName || '';
        model.email = object.email || '';
        model.alternativeEmail = object.alternativeEmail || '';
        model.attendanceYear = object.attendanceYear || '';
        model.coordinatorName = object.coordinatorName || '';
        model.coordinatorFunction = object.coordinatorFunction || '';
        model.isActive = object.isActive || true;

        return model;
    }
}

/* Remember. The links between coordinator and student are soft. */
@Entity()
export class CoordinatorModel {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({nullable: false, unique: true})
    name!: string;
    @Column({nullable: false})
    function!: string;
    @Column({nullable: false, unique: true})
    email!: string;
    @Column({nullable: false})
    password!: string;

    @OneToOne(() => CoordinatorScientificActivityModel)
    @JoinColumn()
    scientificActivity!: CoordinatorScientificActivityModel;
    @OneToOne(() => CoordinatorReferentialActivityModel)
    @JoinColumn()
    referentialActivity!: CoordinatorReferentialActivityModel;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    createdAt!: Date;
    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    updatedAt!: Date;

    static fromObject(object: any): CoordinatorModel {
        const model = new CoordinatorModel();

        model.name = object.name || '';
        model.function = object.function || '';
        model.email = object.email || '';
        model.password = sha256(CryptoUtil.scufflePassword(object.password)).toString();

        return model;
    }
}

@Entity()
export class AdminModel {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({nullable: false, unique: true})
    username!: string;
    @Column({nullable: false, unique: true})
    email!: string;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    createdAt!: Date;
    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    updatedAt!: Date;

    static fromObject(object: any): AdminModel {
        const model = new AdminModel();

        model.username = object.username || '';
        model.email = object.email || '';

        return model;
    }
}

/* TODO: The logic can be improved. */
@Entity()
export class AuthorizationKeyModel {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({nullable: false, unique: true})
    key!: string;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    createdAt!: Date;
    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    updatedAt!: Date;

    static fromObject(object: any): AuthorizationKeyModel {
        const model = new AuthorizationKeyModel();

        model.key = object.key;

        return model;
    }
}