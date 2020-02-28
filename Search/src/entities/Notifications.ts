import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from "typeorm";
import { Users } from "./Users";

@Index("fk_notifications_1_idx", ["usersIdx"], {})
@Entity("notifications", { schema: "yoyo" })
export class Notifications {
  @PrimaryGeneratedColumn({ type: "int", name: "idx" })
  idx: number;

  @Column("int", { name: "users_idx" })
  usersIdx: number;

  @Column("varchar", { name: "contents", length: 225 })
  contents: string;

  @Column("varchar", { name: "url", length: 225 })
  url: string;

  @Column("tinyint", { name: "flag", default: () => "'0'" })
  flag: number;

  @Column("datetime", { name: "created_dt" })
  createdDt: Date;

  @ManyToOne(
    () => Users,
    users => users.notifications,
    { onDelete: "CASCADE", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "users_idx", referencedColumnName: "idx" }])
  usersIdx2: Users;
}
