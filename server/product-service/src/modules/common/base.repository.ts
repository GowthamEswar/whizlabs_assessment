// modules/common/base.repository.ts
import { Document, Model, FilterQuery, UpdateQuery } from 'mongoose';

abstract class BaseRepository<T extends Document> {
    protected readonly model: Model<T>;

    constructor(model: Model<T>) {
        this.model = model;
    }

    async create(data: Partial<T>): Promise<T> {
        return await this.model.create(data);
    }

    async findById(id: string): Promise<T | null> {
        return await this.model.findById(id).exec();
    }

    async update(id: string, data: UpdateQuery<T>): Promise<T | null> {
        return await this.model.findByIdAndUpdate(id, data, { new: true }).exec();
    }

    async delete(id: string): Promise<T | null> {
        return await this.model.findByIdAndDelete(id).exec();
    }

    async findAll(filter?: FilterQuery<T>): Promise<T[]> {
        return await this.model.find(filter || {}).exec();
    }

    async findAllByField(field: keyof T, value: any): Promise<T[]> {
        const filter: FilterQuery<T> = {};
        filter[field] = value;
        return await this.model.find(filter).exec();
    }
}

export default BaseRepository;
