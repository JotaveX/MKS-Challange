import { HttpException, Inject, Injectable, Logger, OnModuleInit } from "@nestjs/common";
import { createMovieDto } from "./dto/create-movie.dto";
import { updateMovieDto } from "./dto/update-movie.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { CACHE_MANAGER, CacheKey, CacheTTL } from "@nestjs/cache-manager";
import { RedisService } from "src/config/redis";
import { Cache } from 'cache-manager';

@Injectable()
export class MovieService {

    constructor(private prismaService: PrismaService,
            @Inject(CACHE_MANAGER) private cacheManager: Cache,
    ) {}

    async create(movie: createMovieDto) {
        let data = movie;
        try {
            await this.cacheManager.del('movies');
            let movieDb = await this.prismaService.movie.create({data});
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

              let movieUpdated = this.prismaService.movie.update({
                where: {id},
                data
              });
              await this.cacheManager.del('movies');
              await this.cacheManager.set(`movie:${id}`, movieUpdated);
         } catch (error) {
              throw new HttpException("Erro ao atualizar o filme.", 404);
         }
    }

    async findAll() {
        try {
            await this.cacheManager.del('movies');
            await this.cacheManager.set('movies', this.prismaService.movie.findMany());
            return this.prismaService.movie.findMany();
        } catch (error) {
            throw new HttpException("Erro ao buscar os filmes.", 404);
        }
    }

    async findOne(id: number) {
        try {
            if (await this.cacheManager.get(`movie:${id}`)) {
                return await this.cacheManager.get(`movie:${id}`);
            }
            await this.cacheManager.set(`movie:${id}`, this.prismaService.movie.findUnique({where: id}));
            return this.prismaService.movie.findUnique({
                where: {id: id},
            });
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
            await this.cacheManager.del('movies');
            return this.prismaService.movie.delete({
                where: {id}
            });
        } catch (error) {
            throw new HttpException("Erro ao deletar o filme.", 404);
        }
    }
}