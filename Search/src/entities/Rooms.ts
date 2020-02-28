import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from "typeorm";
import { Messages } from "./Messages";
import { Users } from "./Users";

@Index("fk_rooms_1_idx", ["usersIdx_1"], {})
@Index("fk_roooms_2_idx", ["usersIdx_2"], {})
@Entity("rooms", { schema: "yoyo" })
export class Rooms {
  @PrimaryGeneratedColumn({ type: "int", name: "idx" })
  idx: number;

  @Column("int", { name: "users_idx_1" })
  usersIdx_1: number;

  @Column("int", { name: "users_idx_2" })
  usersIdx_2: number;

  @Column("text", { name: "last_message" })
  lastMessage: string;

  @Column("datetime", { name: "created_dt" })
  createdDt: Date;

  @Column("datetime", { name: "updated_dt", nullable: true })
  updatedDt: Date | null;

  @OneToMany(
    () => Messages,
    messages => messages.roomIdx2
  )
  messages: Messages[];

  @ManyToOne(
    () => Users,
    users => users.rooms,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "users_idx_1", referencedColumnName: "idx" }])
  usersIdx: Users;

  @ManyToOne(
    () => Users,
    users => users.rooms2,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "users_idx_2", referencedColumnName: "idx" }])
  usersIdx_3: Users;
}
