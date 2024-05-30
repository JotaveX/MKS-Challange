import { HttpException, Inject, Injectable, Logger, OnModuleInit } from "@nestjs/common";
import { createMovieDto } from "./dto/create-movie.dto";
import { updateMovieDto } from "./dto/update-movie.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { CacheKey, CacheTTL } from "@nestjs/cache-manager";

@Injectable()
export class MovieService {

    constructor(private prismaService: PrismaService) {}

    async create(movie: createMovieDto) {
        let data = movie;
        try {
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

              return this.prismaService.movie.update({
                where: {id},
                data
              });
         } catch (error) {
              throw new HttpException("Erro ao atualizar o filme.", 404);
         }
    }

    @CacheKey('movies')
    @CacheTTL(60) // Cache por 60 segundos
    findAll() {
        try {
            console.log("entrou")
            return this.prismaService.movie.findMany();
        } catch (error) {
            throw new HttpException("Erro ao buscar os filmes.", 404);
        }
    }

    async findOne(id: number) {
        try {
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

            return this.prismaService.movie.delete({
                where: {id}
            });
        } catch (error) {
            throw new HttpException("Erro ao deletar o filme.", 404);
        }
    }
}