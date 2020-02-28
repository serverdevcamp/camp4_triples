import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from "typeorm";
import { Posts } from "./Posts";
import { TrackGenres } from "./TrackGenres";
import { TrackTypes } from "./TrackTypes";
import { UsersHasTracks } from "./UsersHasTracks";

@Index("fk_tracks_2_idx", ["genreIdx"], {})
@Index("fk_tracks_3_idx", ["typeIdx"], {})
@Index("idx_UNIQUE", ["idx"], { unique: true })
@Entity("tracks", { schema: "yoyo" })
export class Tracks {
  @PrimaryGeneratedColumn({ type: "int", name: "idx" })
  idx: number;

  @Column("varchar", { name: "title", nullable: true, length: 45 })
  title: string | null;

  @Column("int", { name: "genre_idx", nullable: true })
  genreIdx: number | null;

  @Column("int", { name: "type_idx", nullable: true })
  typeIdx: number | null;

  @Column("varchar", { name: "track_source", nullable: true, length: 80 })
  trackSource: string | null;

  @Column("varchar", { name: "image", nullable: true, length: 225 })
  image: string | null;

  @Column("tinyint", { name: "flag", nullable: true })
  flag: number | null;

  @Column("varchar", { name: "users_idx", length: 255 })
  usersIdx: string;

  @Column("datetime", { name: "created_dt" })
  createdDt: Date;

  @Column("int", { name: "played_count", nullable: false, default: () => "'0'" })
  playedCount: number;

  @Column("varchar", { name: "moods", nullable: true, length: 255 })
  moods: string | null;

  @OneToMany(
    () => Posts,
    posts => posts.trackIdx2
  )
  posts: Posts[];

  @ManyToOne(
    () => TrackGenres,
    trackGenres => trackGenres.tracks,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "genre_idx", referencedColumnName: "idx" }])
  genreIdx2: TrackGenres;

  @ManyToOne(
    () => TrackTypes,
    trackTypes => trackTypes.tracks,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "type_idx", referencedColumnName: "idx" }])
  typeIdx2: TrackTypes;

  @OneToMany(
    () => UsersHasTracks,
    usersHasTracks => usersHasTracks.tracksIdx2
  )
  usersHasTracks: UsersHasTracks[];
}
