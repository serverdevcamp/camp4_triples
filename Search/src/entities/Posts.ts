import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from "typeorm";
import { Comments } from "./Comments";
import { Likes } from "./Likes";
import { Users } from "./Users";
import { Tracks } from "./Tracks";

@Index("fk_posts_1_idx", ["usersIdx"], {})
@Index("fk_posts_2_idx", ["trackIdx"], {})
@Entity("posts", { schema: "yoyo" })
export class Posts {
  @PrimaryGeneratedColumn({ type: "int", name: "idx" })
  idx: number;

  @Column("varchar", { name: "contents", length: 500 })
  contents: string;

  @Column("int", { name: "users_idx" })
  usersIdx: number;

  @Column("datetime", { name: "created_dt" })
  createdDt: Date;

  @Column("int", { name: "track_idx", nullable: true })
  trackIdx: number | null;

  @Column("varchar", { name: "tags", nullable: true, length: 255 })
  tags: string | null;

  @Column("int", {
    name: "comments_count",
    nullable: false,
    default: () => "'0'"
  })
  commentsCount: number;

  @Column("int", { name: "likes_count", nullable: false, default: () => "'0'" })
  likesCount: number;

  @Column("datetime", { name: "updated_dt", nullable: true })
  updatedDt: Date | null;

  @OneToMany(
    () => Comments,
    comments => comments.postsIdx2
  )
  comments: Comments[];

  @OneToMany(
    () => Likes,
    likes => likes.postsIdx2
  )
  likes: Likes[];

  @ManyToOne(
    () => Users,
    users => users.posts,
    { onDelete: "CASCADE", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "users_idx", referencedColumnName: "idx" }])
  usersIdx2: Users;

  @ManyToOne(
    () => Tracks,
    tracks => tracks.posts,
    { onDelete: "CASCADE", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "track_idx", referencedColumnName: "idx" }])
  trackIdx2: Tracks;
}
