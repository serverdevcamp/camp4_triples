import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from "typeorm";
import { Users } from "./Users";

@Index("fk_friends_1_idx", ["senderIdx"], {})
@Index("fk_friends_2_idx", ["receiverIdx"], {})
@Entity("friends", { schema: "yoyo" })
export class Friends {
  @PrimaryGeneratedColumn({ type: "int", name: "idx" })
  idx: number;

  @Column("int", { name: "sender_idx" })
  senderIdx: number;

  @Column("int", { name: "receiver_idx" })
  receiverIdx: number;

  @Column("datetime", { name: "created_dt" })
  createdDt: Date;

  @ManyToOne(
    () => Users,
    users => users.friends,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "sender_idx", referencedColumnName: "idx" }])
  senderIdx2: Users;

  @ManyToOne(
    () => Users,
    users => users.friends2,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "receiver_idx", referencedColumnName: "idx" }])
  receiverIdx2: Users;
}
