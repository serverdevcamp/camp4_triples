import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from "typeorm";
import { Users } from "./Users";
import { Posts } from "./Posts";

@Index("fk_comments_1_idx", ["usersIdx"], {})
@Index("fk_comments_2_idx", ["postsIdx"], {})
@Entity("comments", { schema: "yoyo" })
export class Comments {
  @PrimaryGeneratedColumn({ type: "int", name: "idx" })
  idx: number;

  @Column("varchar", { name: "contents", length: 225 })
  contents: string;

  @Column("int", { name: "users_idx" })
  usersIdx: number;

  @Column("int", { name: "posts_idx" })
  postsIdx: number;

  @Column("datetime", { name: "created_dt" })
  createdDt: Date;

  @ManyToOne(
    () => Users,
    users => users.comments,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "users_idx", referencedColumnName: "idx" }])
  usersIdx2: Users;

  @ManyToOne(
    () => Posts,
    posts => posts.comments,
    { onDelete: "CASCADE", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "posts_idx", referencedColumnName: "idx" }])
  postsIdx2: Posts;
}
