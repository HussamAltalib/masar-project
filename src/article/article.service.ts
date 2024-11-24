import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { Article } from './entities/article.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';


@Injectable()
export class ArticleService {


  constructor(
    @InjectRepository(Article)
    private articleRepository: Repository<Article>,
  ) {}

  async create(createArticleDto: CreateArticleDto): Promise<Article> {
    const newArticle = this.articleRepository.create(createArticleDto);
    return await this.articleRepository.save(newArticle);
  }



  findAll(): Promise<Article[]> {
    return this.articleRepository.find();
  }

  async findOne(id: number): Promise<Article> {
    return await this.articleRepository.findOneBy({ id });
  }
  


  async update(id: number, updateArticleDto: UpdateArticleDto): Promise<Article> {
    const article = await this.articleRepository.findOneBy({ id });

    if (!article) {
      throw new NotFoundException(`Article with ID ${id} not found`);
    }

    await this.articleRepository.update(id, updateArticleDto);
    return await this.articleRepository.findOneBy({ id });
  }

  

  remove(id: number) {
    return `This action removes a #${id} article`;
  }
}
