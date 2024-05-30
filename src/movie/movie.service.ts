import { HttpException, Inject, Injectable, Logger, OnModuleInit } from "@nestjs/common";
import { createMovieDto } from "./dto/create-movie.dto";
import { updateMovieDto } from "./dto/update-movie.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { CACHE_MANAGER, CacheKey, CacheTTL } from "@nestjs/cache-manager";
import { Cache } from "cache-manager";

@Injectable()
export class MovieService {

    constructor(private prismaService: PrismaService,
        @Inject(CACHE_MANAGER) private cacheManager: Cache
    ) {}

    async create(movie: createMovieDto) {
        let data = movie;
        try {
            let movieDb = await this.prismaService.movie.create({data});
            await this.cacheManager.del('movies');
            return movieDb;
        } catch (error) {
            throw new HttpException("Erro ao criar o filme.", 404);
        }
    }

    async update(movie: updateMovieDto, id: number) {
       let data = movie;
         try {
            let movie = await this.prismaService.movie.findUnique({
                where: {id}
            });

            if (!movie) {
                throw new HttpException("Filme não encontrado.", 404);
            }
            let updatedUser = this.prismaService.movie.update({
                where: {id},
                data
            });
            await this.cacheManager.set(`movie:${id}`, updatedUser);
            await this.cacheManager.del('movies');
            return updatedUser;
         } catch (error) {
              throw new HttpException("Erro ao atualizar o filme.", 404);
         }
    }

    @CacheKey('movies')
    @CacheTTL(60) // Cache por 60 segundos
    findAll() {
        try {
            const movieCached = this.cacheManager.get('movies');
            if (movieCached) {
                return movieCached;
            }
            console.log("entrou");
            const movies = this.prismaService.movie.findMany();
            this.cacheManager.set('movies', movies);
        } catch (error) {
            throw new HttpException("Erro ao buscar os filmes.", 404);
        }
    }

    async findOne(id: number) {
        try {
            const cachedMovie = await this.cacheManager.get(`movie:${id}`);
            if (cachedMovie) {
                return cachedMovie;
            }
            const movie = await this.prismaService.movie.findUnique({
                where: {id},
            });
            this.cacheManager.set(`movie:${id}`, movie);
            return movie;
        } catch (error) {
            throw new HttpException("Erro ao buscar o filme.", 404);
        }
    }
    
    async remove(id: number) {
        try {
            let movie = await this.prismaService.movie.findUnique({
                where: {id}
            });

            if (!movie) {
                throw new HttpException("Filme não encontrado.", 404);
            }
            await this.cacheManager.del(`movie:${id}`);
            return this.prismaService.movie.delete({
                where: {id}
            });
        } catch (error) {
            throw new HttpException("Erro ao deletar o filme.", 404);
        }
    }
}