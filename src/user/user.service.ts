import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { FileRepository } from 'src/utils/file-repository';
import { User } from './user.entity';
import { UserUpdateDto } from './dto/user-update.dto';
import { hashPassword } from 'src/utils/password';
import { UserCreateDto } from './dto/user-create.dto';

const REPO_PATH = './data/users.json'

@Injectable()
export class UserService {
    private repo = FileRepository.create(REPO_PATH, User);

    findAll() {
        return this.repo.findAll();
    }

    async search(query: string) {
        const all = await this.findAll();
        return all.filter(user => {
            return Object.values(user).some(value => {
                return String(value).includes(query);
            });
        });
    }

    findByEmail(email) {
        return this.repo.findBy({ email });
    }

    findById(id: number) {
        return this.repo.findBy({ id });
    }

    async createUser(createDto: UserCreateDto) {
        await this.#validateExisting(createDto.email);
        let password = await hashPassword(createDto.password);
        const id = Date.now();
        return this.repo.create({
            id,
            ...createDto,
            password
        });
    }
    async #validateExisting(email: string, ignoreId?: number) {
        const existing = await this.repo.findBy({ email });
        if (existing && existing.id !== ignoreId) {
            throw new HttpException('Other user with that email already exists', HttpStatus.BAD_REQUEST);
        }
    }

    async updateById(id: number, updateDto: UserUpdateDto) {
        let password;
        if (updateDto.password) {
            password = await hashPassword(updateDto.password);
        }
        await this.#validateExisting(updateDto.email, id);
        return this.repo.update({ id }, {
            ...updateDto,
            password
        });
    }

    deleteById(id: number) {
        return this.repo.deleteOne({ id })
    }
}
