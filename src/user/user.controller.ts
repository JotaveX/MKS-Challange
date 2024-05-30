import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { createUserDto } from "./dto/create-user.dto";
import { updateUserDto } from "./dto/update-user";
import { AuthGuard } from "src/guards/auth.guard";
import { ApiAcceptedResponse, ApiBadRequestResponse, ApiParam, ApiUnauthorizedResponse } from "@nestjs/swagger";

@ApiUnauthorizedResponse({ description: 'Unauthorized' })
@UseGuards(AuthGuard)
@Controller("user")
export class UserController {

    constructor(private readonly userService: UserService){}

    @ApiAcceptedResponse({ description: 'The user has been successfully'})
    @ApiParam({ name: 'id', description: 'The user id' })
    @Get('/:id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.userService.findOne(id);
    }

    @ApiAcceptedResponse({ description: 'The user has successfully created'})
    @ApiBadRequestResponse({ description: 'The email is already in use.' })
    @Post('')
    create(@Body() body: createUserDto) {
        return this.userService.create(body);
    }
}