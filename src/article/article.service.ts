import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { Article } from './entities/article.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { faker } from '@faker-js/faker'; // Import Faker
import { User } from 'src/user/entities/user.entity';



@Injectable()
export class ArticleService {


  constructor(
    @InjectRepository(Article)
    private articleRepository: Repository<Article>,
  ) {}

  async create(createArticleDto: CreateArticleDto, userId: number): Promise<Article> {
    const newArticle = this.articleRepository.create({
      ...createArticleDto,
      userId, // Set userId instead of user relationship
    });
    return await this.articleRepository.save(newArticle);
  }
  



  async findAll(page: number, pageSize: number, search?: string): Promise<{ data: Article[]; total: number }> {
    // Calculate pagination details
    const skip = (page - 1) * pageSize;

    // Build the query with pagination and optional search
    const queryBuilder = this.articleRepository.createQueryBuilder('article');

    if (search) {
      queryBuilder.where('article.title LIKE :search OR article.body LIKE :search', { search: `%${search}%` });
    }

    queryBuilder.skip(skip).take(pageSize);

    const [data, total] = await queryBuilder.getManyAndCount();

    return { data, total };
  }


  async findOne(id: number): Promise<Article> {
    if (isNaN(id) || id <= 0) {
      throw new BadRequestException('Invalid ID provided');
    }
    return await this.articleRepository.findOne({ where: { id } });
  }
  
  


  async update(id: number, updateArticleDto: UpdateArticleDto): Promise<Article> {
    const article = await this.articleRepository.findOneBy({ id });

    if (!article) {
      throw new NotFoundException(`Article with ID ${id} not found`);
    }

    await this.articleRepository.update(id, updateArticleDto);
    return await this.articleRepository.findOneBy({ id });
  }

  async generateArticles(): Promise<void> {
    const articles = [];
  
    for (let i = 0; i < 1000; i++) {
      const title = faker.lorem.sentence(); // Generate a random title
      const body = faker.lorem.paragraphs(3); // Generate random paragraphs
  
      // Use create method to initialize the entity
      const article = this.articleRepository.create({
        title,
        body,
      });
  
      articles.push(article);
    }
  
    // Save all articles in one go
    await this.articleRepository.save(articles);
    console.log('1000 articles generated and saved successfully');
    
  }
  

  

  remove(id: number) {
    return `This action removes a #${id} article`;
  }
}
