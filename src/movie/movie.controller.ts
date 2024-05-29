import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards } from "@nestjs/common";
import { MovieService } from "./movie.service";
import { createMovieDto } from "./dto/create-movie.dto";
import { updateMovieDto } from "./dto/update-movie.dto";
import { AuthGuard } from "src/guards/auth.guard";
import { CacheKey, CacheTTL } from "@nestjs/cache-manager";

@UseGuards(AuthGuard)
@Controller("movie")
@CacheTTL(60)
@CacheKey("movie")
export class MovieController {

    constructor(private readonly movieService: MovieService){}

    @Get('')
    findAll() {
        return this.movieService.findAll();
    }

    @Get('/:id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.movieService.findOne(id);
    }

    @Post('')
    create(@Body() body: createMovieDto) {
        return this.movieService.create(body);
    }

    @Put('/:id')
    async update(@Body() body: updateMovieDto, @Param('id', ParseIntPipe) id: number) { 
      return this.movieService.update(body, id);
    }

    @Delete('/:id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.movieService.remove(id); 
    }
}