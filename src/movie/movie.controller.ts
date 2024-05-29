import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards } from "@nestjs/common";
import { MovieService } from "./movie.service";
import { createMovieDto } from "./dto/create-movie.dto";
import { updateMovieDto } from "./dto/update-movie.dto";
import { AuthGuard } from "src/guards/auth.guard";
import { CacheKey, CacheTTL } from "@nestjs/cache-manager";
import { ApiAcceptedResponse, ApiBadRequestResponse, ApiParam, ApiUnauthorizedResponse } from "@nestjs/swagger";

@ApiUnauthorizedResponse({ description: 'Unauthorized' })
@UseGuards(AuthGuard)
@Controller("movie")
@CacheTTL(60)
@CacheKey("movie")
export class MovieController {

    constructor(private readonly movieService: MovieService){}

    @ApiAcceptedResponse({ description: 'The movie has been successfully found.' })
    @Get('')
    findAll() {
        return this.movieService.findAll();
    }

    @ApiAcceptedResponse({ description: 'The movie has been successfully found.' })
    @ApiParam({ description: 'The movie id', name: 'id' })
    @Get('/:id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.movieService.findOne(id);
    }

    @ApiAcceptedResponse({ description: 'The movie has successfully created'})
    @Post('')
    create(@Body() body: createMovieDto) {
        return this.movieService.create(body);
    }

    @ApiAcceptedResponse({ description: 'The movie has been successfully updated.' })
    @ApiParam({ description: 'The movie id', name: 'id' })
    @ApiBadRequestResponse({ description: 'The movie does not exist.' })
    @Put('/:id')
    async update(@Body() body: updateMovieDto, @Param('id', ParseIntPipe) id: number) { 
      return this.movieService.update(body, id);
    }

    @ApiAcceptedResponse({ description: 'The movie has been successfully deleted.' })
    @ApiParam({ description: 'The movie id', name: 'id' })
    @ApiBadRequestResponse({ description: 'The movie does not exist.' })
    @Delete('/:id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.movieService.remove(id); 
    }
}