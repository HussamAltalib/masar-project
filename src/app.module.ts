import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArticleModule } from './article/article.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AuthenticationModule } from './authentication/authentication.module';



@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '',
    database: 'masar-project',
    autoLoadEntities: true,
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    migrations: [__dirname + './src/migrations/'], 
    migrationsRun: true, // Run migrations automatically on startup (not recommended for production)
    synchronize: false,
    logging: false,
  }), ArticleModule, UserModule, AuthenticationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
