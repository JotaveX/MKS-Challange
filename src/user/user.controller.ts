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

    @ApiAcceptedResponse({ description: 'The user has been successfully found.' })
    @Get('')
    findAll() {
        return this.userService.findAll();
    }

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

    @ApiAcceptedResponse({ description: 'The user has been successfully updated.' })
    @ApiBadRequestResponse({ description: 'The user does not exist.' })
    @ApiParam({ name: 'id', description: 'The user id' })
    @Put('/:id')
    async update(@Body() body: updateUserDto, @Param('id', ParseIntPipe) id: number) { 
      return this.userService.update(body, id);
    }

    @ApiAcceptedResponse({ description: 'The user has been successfully removed.' })
    @ApiBadRequestResponse({ description: 'The user does not exist.' })
    @ApiParam({ name: 'id', description: 'The user id' })
    @Delete('/:id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.userService.remove(id); 
    }
}