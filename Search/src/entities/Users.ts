import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn
} from "typeorm";
import { Comments } from "./Comments";
import { Friends } from "./Friends";
import { Likes } from "./Likes";
import { Messages } from "./Messages";
import { Notifications } from "./Notifications";
import { Posts } from "./Posts";
import { Rooms } from "./Rooms";
import { UsersHasTracks } from "./UsersHasTracks";

@Index("id_UNIQUE", ["userId"], { unique: true })
@Entity("users", { schema: "yoyo" })
export class Users {
  @PrimaryGeneratedColumn({ type: "int", name: "idx" })
  idx: number;

  @Column("varchar", { name: "user_id", unique: true, length: 45 })
  userId: string;

  @Column("varchar", { name: "pw", length: 80 })
  pw: string;

  @Column("varchar", { name: "nickname", nullable: true, length: 45 })
  nickname: string | null;

  @Column("varchar", { name: "email", length: 45 })
  email: string;

  @Column("varchar", { name: "profile", nullable: false, length: 500 })
  profile: string;

  @Column("varchar", { name: "salt", length: 64 })
  salt: string;

  @Column("int", {
    name: "follower_count",
    nullable: true,
    default: () => "'0'"
  })
  followerCount: number;

  @Column("int", {
    name: "following_count",
    nullable: false,
    default: () => "'0'"
  })
  followingCount: number;

  @Column("int", { name: "tracks_count", nullable: true, default: () => "'0'" })
  tracksCount: number | null;

  @Column("tinyint", { name: "grade", default: () => "'0'" })
  grade: number;

  @Column("tinyint", { name: "status", default: () => "'0'" })
  status: number;

  @Column("datetime", { name: "created_dt" })
  createdDt: Date;

  @Column("datetime", { name: "access_dt", nullable: true })
  accessDt: Date | null;

  @Column("datetime", { name: "updated_dt", nullable: true })
  updatedDt: Date | null;

  @Column("varchar", { name: "refresh_token", nullable: true, length: 225 })
  refreshToken: string | null;

  @OneToMany(
    () => Comments,
    comments => comments.usersIdx2
  )
  comments: Comments[];

  @OneToMany(
    () => Friends,
    friends => friends.senderIdx2
  )
  friends: Friends[];

  @OneToMany(
    () => Friends,
    friends => friends.receiverIdx2
  )
  friends2: Friends[];

  @OneToMany(
    () => Likes,
    likes => likes.usersIdx2
  )
  likes: Likes[];

  @OneToMany(
    () => Messages,
    messages => messages.senderIdx2
  )
  messages: Messages[];

  @OneToMany(
    () => Messages,
    messages => messages.receiverIdx2
  )
  messages2: Messages[];

  @OneToMany(
    () => Notifications,
    notifications => notifications.usersIdx2
  )
  notifications: Notifications[];

  @OneToMany(
    () => Posts,
    posts => posts.usersIdx2
  )
  posts: Posts[];

  @OneToMany(
    () => Rooms,
    rooms => rooms.usersIdx
  )
  rooms: Rooms[];

  @OneToMany(
    () => Rooms,
    rooms => rooms.usersIdx_3
  )
  rooms2: Rooms[];

  @OneToMany(
    () => UsersHasTracks,
    usersHasTracks => usersHasTracks.usersIdx2
  )
  usersHasTracks: UsersHasTracks[];
}
