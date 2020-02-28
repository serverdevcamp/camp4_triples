import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Tracks } from "./Tracks";

@Entity("track_types", { schema: "yoyo" })
export class TrackTypes {
  @PrimaryGeneratedColumn({ type: "int", name: "idx" })
  idx: number;

  @Column("varchar", { name: "name", length: 45 })
  name: string;

  @OneToMany(
    () => Tracks,
    tracks => tracks.typeIdx2
  )
  tracks: Tracks[];
}
