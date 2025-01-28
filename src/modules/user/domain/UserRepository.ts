import { UserEntity } from './UserEntity';

export interface UserRepository {
    create(user: UserEntity): Promise<UserEntity>;
    findById(id: string): Promise<UserEntity | null>;
    findByEmail(email: string): Promise<UserEntity | null>;
    update(user: UserEntity): Promise<void>;
    delete(id: string): Promise<void>;
}
