// src/followers/entities/follower.entity.ts

import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('followers')
export class Follower {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  followerId: number; // The user who is following

  @Column()
  followedId: number; // The user being followed
}
