import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArticleModule } from './article/article.module';
import { TypeOrmModule } from '@nestjs/typeorm';


const entitiesPath = __dirname + '/**/*.entity{.ts,.js}';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '',
    database: 'masar-project',
    autoLoadEntities: true,
    entities: [entitiesPath],
    synchronize: false,
    logging: false,
  }), ArticleModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
// /Users/7ossam/Documents/Masar/masar-project/src/article/entities/article.entity.ts