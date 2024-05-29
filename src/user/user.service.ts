import {  Injectable } from "@nestjs/common";
import { createUserDto } from "./dto/create-user.dto";
import { updateUserDto } from "./dto/update-user";
import { PrismaService } from "src/prisma/prisma.service";
import * as bcrypt from 'bcrypt';
import { HttpException } from "@nestjs/common";

@Injectable()
export class UserService{

    constructor(private prismaService: PrismaService){}

    async create(user: createUserDto) {
        if(await this.verificaEmail(user.email)){
            throw new HttpException('Email já cadastrado', 400);
        }
        let data = user;
        data.password = await bcrypt.hash(data.password, 10);
        try {
            return this.prismaService.user.create({
                data
            });
        } catch (error) {
            return error;
        }
    }

    update(user: updateUserDto, id: number) {
       let data = user;
         try {
              return this.prismaService.user.update({
                where: {id},
                data
              });
         } catch (error) {
              return error;
         }
    }

    findAll() {
        try {
            return this.prismaService.user.findMany();
        } catch (error) {
            return error;
        }
    }

    findOne(id: number) {
        try {
            return this.prismaService.user.findUnique({
                where: {id: id},
            });
        } catch (error) {
            return error;
        }
    }
    
    remove(id: number) {
        try {
            return this.prismaService.user.delete({
                where: {id}
            });
        } catch (error) {
            return error;
        }
    }

    private async verificaEmail(email: string) {
        return await this.prismaService.user.findUnique({
            where: {email}
        });
    }
}