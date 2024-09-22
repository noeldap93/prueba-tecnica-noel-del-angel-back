import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Inject, Param, Post, Put, Query, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { Public } from 'src/auth/jwt-auth.guard';
import { UserCreateDto } from './dto/user-create.dto';
import { UserUpdateDto } from './dto/user-update.dto';
import { AdminsOnly } from 'src/auth/jwt-admin.guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('user')
@Controller('user')
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
    @Inject() userService: UserService;

    // @Public()
    @Get()
    getUsers() {
        return this.userService.findAll();
    }

    @Get('search')
    searchUsers(@Query('query') query: string) {
        return this.userService.search(query);
    }

    @Get('count')
    async getUserCount() {
        const users = await this.userService.findAll();
        return {
            count: users.length,
        }
    }

    @AdminsOnly()
    @Post()
    createUser(@Body() body: UserCreateDto) {
        return this.userService.createUser(body);
    }
    
    @Get(':id')
    getUser(@Param('id') id: number) {
        console.log('id', id, typeof id);
        return this.userService.findById(id);
    }
    
    @AdminsOnly()
    @Put(':id')
    updateUser(@Param('id') id: number, @Body() body: UserUpdateDto) {
        return this.userService.updateById(id, body);
    }
    
    @AdminsOnly()
    @Delete(':id')
    deleteUser(@Param('id') id: number) {
        return this.userService.deleteById(id);
    }
}
