import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Url {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    shortUrl: string;

    @Column()
    originalUrl: string;
}
