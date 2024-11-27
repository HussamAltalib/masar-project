import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArticleModule } from './article/article.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { ConfigModule } from '@nestjs/config';
import { FollowersModule } from './followers/followers.module';




@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true, // This makes the configuration available globally
  }),
  TypeOrmModule.forRoot({
    type: 'postgres',
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT, 10),
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    autoLoadEntities: true,
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    migrations: [__dirname + './src/migrations/'], 
    migrationsRun: true, // Run migrations automatically on startup (not recommended for production)
    synchronize: false,
    logging: false,
  }), ArticleModule, UserModule, AuthenticationModule, FollowersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
