import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { createUserDto } from "./dto/create-user.dto";
import { updateUserDto } from "./dto/update-user";
import { AuthGuard } from "src/guards/auth.guard";

@UseGuards(AuthGuard)
@Controller("user")
export class UserController {

    constructor(private readonly userService: UserService){}

    @Get('')
    findAll() {
        return this.userService.findAll();
    }

    @Get('/:id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.userService.findOne(id);
    }

    @Post('')
    create(@Body() body: createUserDto) {
        return this.userService.create(body);
    }

    @Put('/:id')
    async update(@Body() body: updateUserDto, @Param('id', ParseIntPipe) id: number) { 
      return this.userService.update(body, id);
    }

    @Delete('/:id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.userService.remove(id); 
    }
}