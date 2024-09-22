import { readFile, writeFile } from "fs/promises";

export interface Entity<T> {
    new(data): T
}

export class FileRepository<T> {
    static create<U>(path: string, entity: Entity<U>) {
        return new FileRepository(path, entity)
    }
    constructor(private path: string, private entity: Entity<T>) { }

    data?: T[];

    async load() {
        if (this.data) return;
        const json = await readFile(this.path, 'utf-8');
        this.data = JSON.parse(json).map(data => new this.entity(data));
    }

    async findAll() {
        await this.load();
        return this.data;
    }

    async findBy(where: Partial<T>) {
        await this.load();
        return this.data.find((d: any) => {
            return Object.keys(where).every(key => d[key] === where[key]);
        });
    }

    async create(data: T) {
        await this.load();
        this.data.push(new this.entity(data));
        await this.save();
        return data;
    }

    async save() {
        const json = JSON.stringify(this.data, null, 2);
        await writeFile(this.path, json);
    }

    async update(where: Partial<T>, newData: Partial<T>) {
        await this.load();
        const index = this.data.findIndex((d: any) => {
            return Object.keys(where).every(key => d[key] === where[key]);
        });
        if (index === -1) return null;

        this.data[index] = new this.entity({
            ...this.data[index],
            ...this.#cleanEntity(newData)
        });
        // console.log(this.data[index]); 
        await this.save();
        return this.data[index];
    }

    async deleteOne(where: Partial<T>) {
        await this.load();
        const index = this.data.findIndex((d: any) => {
            return Object.keys(where).every(key => d[key] === where[key]);
        });
        console.log(index, this.data[index]);
        if (index === -1) return null;
        const deleted = this.data.splice(index, 1);
        await this.save();
        return deleted[0];
    }

    #cleanEntity(entity) {
        const cleanEntity = new this.entity(entity);
        Object.keys(cleanEntity).forEach(key => cleanEntity[key] === undefined ? delete cleanEntity[key] : {});
        console.log('clean entity',cleanEntity);
        return cleanEntity;
    }
}

