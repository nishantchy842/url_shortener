/* eslint-disable prettier/prettier */
import { Logger } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Url } from 'src/url/entities/url.entity';

export const OrmConfig: TypeOrmModuleAsyncOptions = {
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('POSTGRES_HOST'),
        port: configService.get('POSTGRES_PORT'),
        username: configService.get('POSTGRES_USER'),
        password: configService.get('POSTGRES_PASSWORD'),
        database: configService.get('POSTGRES_DATABASE'),
        entities: [User, Url],
        synchronize: true,
        autoLoadEntities: true,
    }),
    dataSourceFactory: async (options) => {
        const dataSource = await new DataSource(options).initialize();

        if (dataSource) {
            Logger.verbose('🌨️  data base is connected');
        } else {
            Logger.error('Failed to connect database');
        }

        return dataSource;
    },
};

