import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from "typeorm";
import { Users } from "./Users";
import { Rooms } from "./Rooms";

@Index("fk_messages_1_idx", ["senderIdx"], {})
@Index("fk_messages_2_idx", ["receiverIdx"], {})
@Index("fk_messages_3_idx", ["roomIdx"], {})
@Entity("messages", { schema: "yoyo" })
export class Messages {
  @PrimaryGeneratedColumn({ type: "int", name: "idx" })
  idx: number;

  @Column("text", { name: "contents" })
  contents: string;

  @Column("int", { name: "sender_idx" })
  senderIdx: number;

  @Column("int", { name: "receiver_idx" })
  receiverIdx: number;

  @Column("int", { name: "room_idx" })
  roomIdx: number;

  @Column("datetime", { name: "created_dt" })
  createdDt: Date;

  @ManyToOne(
    () => Users,
    users => users.messages,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "sender_idx", referencedColumnName: "idx" }])
  senderIdx2: Users;

  @ManyToOne(
    () => Users,
    users => users.messages2,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "receiver_idx", referencedColumnName: "idx" }])
  receiverIdx2: Users;

  @ManyToOne(
    () => Rooms,
    rooms => rooms.messages,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "room_idx", referencedColumnName: "idx" }])
  roomIdx2: Rooms;
}
