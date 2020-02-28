import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("weekly_chart", { schema: "yoyo" })
export class WeeklyChart {
  @PrimaryGeneratedColumn({ type: "int", name: "idx" })
  idx: number;

  @Column("datetime", { name: "created_dt" })
  createdDt: Date;

  @Column("varchar", { name: "ranked_set", nullable: true, length: 225 })
  rankedSet: string | null;
}
