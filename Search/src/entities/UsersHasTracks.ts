import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from "typeorm";
import { Users } from "./Users";
import { Tracks } from "./Tracks";

@Index("fk_users_has_tracks_1_idx", ["usersIdx"], {})
@Index("fk_users_has_tracks_2_idx", ["tracksIdx"], {})
@Entity("users_has_tracks", { schema: "yoyo" })
export class UsersHasTracks {
  @PrimaryGeneratedColumn({ type: "int", name: "idx" })
  idx: number;

  @Column("int", { name: "users_idx" })
  usersIdx: number;

  @Column("int", { name: "tracks_idx" })
  tracksIdx: number;

  @Column("datetime", { name: "created_dt" })
  createdDt: Date;

  @ManyToOne(
    () => Users,
    users => users.usersHasTracks,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "users_idx", referencedColumnName: "idx" }])
  usersIdx2: Users;

  @ManyToOne(
    () => Tracks,
    tracks => tracks.usersHasTracks,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "tracks_idx", referencedColumnName: "idx" }])
  tracksIdx2: Tracks;
}
