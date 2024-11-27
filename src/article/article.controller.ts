import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, UseGuards, Query, Request, ConsoleLogger} from '@nestjs/common';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { Article } from './entities/article.entity';
import { JwtAuthGuard } from '../authentication/guards/jwt-auth.guard';



@Controller('articles')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createArticleDto: CreateArticleDto, @Request() req) {
    console.log("User Info:", req.user); // Should log userId and username correctly
    return this.articleService.create(createArticleDto, req.user.userId);
  }
  

  @Get()
  findAll(
    @Query('page') page: string,
    @Query('pageSize') pageSize: string,
    @Query('search') search?: string,
  ) {
    const pageNumber = parseInt(page, 10) || 1;
    const pageSizeNumber = parseInt(pageSize, 10) || 10;
    return this.articleService.findAll(pageNumber, pageSizeNumber, search);
  }


  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async update(
  @Param('id') id: string,
  @Body() updateArticleDto: UpdateArticleDto,
  @Request() req
  ): Promise<Article> {
    console.log("Controller - userId from JWT: ", req.user.userId);
    return await this.articleService.update(+id, updateArticleDto, req.user.userId);
  }


  // Endpoint to generate articles
  @Get('generate')
  async generateArticles() {
    await this.articleService.generateArticles();
    return { message: '1000 articles generated successfully!' };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const article = await this.articleService.findOne(+id);
    if (!article) {
      throw new NotFoundException(`Article with ID ${id} not found`);
    }
    return this.articleService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    console.log("Controller - userId from JWT: ", req.user.userId);
    return this.articleService.remove(+id, req.user.userId);
}

}
